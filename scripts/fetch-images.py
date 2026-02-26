import os
import urllib.request
import urllib.parse
import re

BASE_URL = "https://grandfoods.co.jp"
OUTPUT_DIR = "/vercel/share/v0-project/public/images"

headers = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}

def fetch_html(url):
    req = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(req) as res:
        return res.read().decode("utf-8", errors="replace")

def extract_image_paths(html):
    paths = set()
    # src=" patterns
    for m in re.finditer(r'src=["\']([^"\']*\.(?:jpg|jpeg|png|webp|gif|svg)[^"\']*?)["\']', html, re.IGNORECASE):
        paths.add(m.group(1))
    # url() patterns
    for m in re.finditer(r'url\(["\']?([^"\')\s]*\.(?:jpg|jpeg|png|webp|gif|svg)[^"\')\s]*?)["\']?\)', html, re.IGNORECASE):
        paths.add(m.group(1))
    return list(paths)

def to_absolute_url(src):
    if src.startswith("http://") or src.startswith("https://"):
        return src
    if src.startswith("//"):
        return "https:" + src
    if src.startswith("/"):
        return BASE_URL + src
    return BASE_URL + "/" + src

def to_local_filename(src):
    try:
        parsed = urllib.parse.urlparse(src if src.startswith("http") else BASE_URL + "/" + src)
        return os.path.basename(parsed.path)
    except Exception:
        return os.path.basename(src)

def download_image(url, dest_path):
    try:
        req = urllib.request.Request(url, headers={**headers, "Referer": BASE_URL})
        with urllib.request.urlopen(req) as res:
            data = res.read()
        with open(dest_path, "wb") as f:
            f.write(data)
        print(f"[v0] 保存: {dest_path} ({len(data)} bytes)")
        return True
    except Exception as e:
        print(f"[v0] スキップ: {url} -> {e}")
        return False

def main():
    print(f"[v0] 出力先を確認: {OUTPUT_DIR}")
    print(f"[v0] 存在チェック: {os.path.exists(OUTPUT_DIR)}")
    print(f"[v0] /vercel 存在: {os.path.exists('/vercel')}")
    print(f"[v0] /vercel/share 存在: {os.path.exists('/vercel/share')}")
    print(f"[v0] /vercel/share/v0-project 存在: {os.path.exists('/vercel/share/v0-project')}")

    # フォルダが存在しない場合は作成を試みる
    if not os.path.exists(OUTPUT_DIR):
        try:
            os.makedirs(OUTPUT_DIR, exist_ok=True)
            print(f"[v0] フォルダを作成しました: {OUTPUT_DIR}")
        except Exception as e:
            print(f"[v0] フォルダ作成エラー: {e}")
            return

    print(f"[v0] HTMLを取得中: {BASE_URL}")
    html = fetch_html(BASE_URL)
    print(f"[v0] HTML取得完了, 長さ: {len(html)}")

    raw_paths = extract_image_paths(html)
    print(f"[v0] 検出した画像パス数: {len(raw_paths)}")
    for p in raw_paths:
        print(f"  - {p}")

    count = 0
    for raw_path in raw_paths:
        if raw_path.startswith("data:"):
            continue
        abs_url = to_absolute_url(raw_path)
        filename = to_local_filename(raw_path)
        if not filename or len(filename) < 3:
            continue
        dest_path = os.path.join(OUTPUT_DIR, filename)
        if download_image(abs_url, dest_path):
            count += 1

    print(f"[v0] 完了: {count}枚の画像をダウンロードしました")

main()
