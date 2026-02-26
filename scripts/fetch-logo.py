import urllib.request
import urllib.parse
import re
import os

BASE_URL = "https://grandfoods.co.jp"
OUTPUT_DIR = "/vercel/share/v0-project/public/images"

headers = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}

def fetch_html(url):
    req = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(req, timeout=15) as res:
        return res.read().decode("utf-8", errors="replace")

def download(url, dest):
    req = urllib.request.Request(url, headers={**headers, "Referer": BASE_URL})
    try:
        with urllib.request.urlopen(req, timeout=15) as res:
            data = res.read()
        with open(dest, "wb") as f:
            f.write(data)
        print(f"[v0] 保存: {dest} ({len(data)} bytes)")
        return True
    except Exception as e:
        print(f"[v0] 失敗: {url} -> {e}")
        return False

html = fetch_html(BASE_URL)
print(f"[v0] HTML取得完了 ({len(html)} chars)")

# 画像パスを全て抽出
patterns = [
    r'src=["\']([^"\']*?(?:logo|Logo)[^"\']*?\.(?:png|jpg|jpeg|webp|svg)[^"\']*?)["\']',
    r'src=["\']([^"\']*?\.(?:png|jpg|jpeg|webp|svg)[^"\']*?)["\']',
]

found = set()
for pat in patterns:
    for m in re.finditer(pat, html):
        found.add(m.group(1))

print(f"[v0] 検出した画像パス数: {len(found)}")
for p in sorted(found):
    print(f"  - {p}")

# まずロゴらしいものだけ試す
logo_candidates = [p for p in found if "logo" in p.lower() or "Logo" in p]
print(f"\n[v0] ロゴ候補: {logo_candidates}")

all_candidates = logo_candidates if logo_candidates else sorted(found)

saved = 0
for raw in all_candidates:
    if raw.startswith("data:"):
        continue
    if raw.startswith("http"):
        abs_url = raw
    elif raw.startswith("//"):
        abs_url = "https:" + raw
    elif raw.startswith("/"):
        abs_url = BASE_URL + raw
    else:
        abs_url = BASE_URL + "/" + raw

    fname = os.path.basename(raw.split("?")[0])
    if not fname or len(fname) < 3:
        continue
    dest = os.path.join(OUTPUT_DIR, fname)
    if download(abs_url, dest):
        saved += 1

print(f"\n[v0] 完了: {saved}枚を保存しました")
print(f"[v0] 出力先フォルダの内容:")
for f in os.listdir(OUTPUT_DIR):
    print(f"  {f}")
