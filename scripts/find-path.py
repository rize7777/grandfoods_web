import os, urllib.request

OUTPUT_DIR = "/vercel/share/v0-project/public/images"

print("[v0] cwd:", os.getcwd())
print("[v0] OUTPUT_DIR exists:", os.path.exists(OUTPUT_DIR))
print("[v0] OUTPUT_DIR contents:", os.listdir(OUTPUT_DIR) if os.path.exists(OUTPUT_DIR) else "N/A")

# サイトのHTMLを取得して画像URLを探す
BASE_URL = "https://grandfoods.co.jp"
req = urllib.request.Request(BASE_URL, headers={"User-Agent": "Mozilla/5.0"})
with urllib.request.urlopen(req) as resp:
    html = resp.read().decode("utf-8", errors="replace")

print("[v0] HTML length:", len(html))

# logo/image パスを探す
import re
imgs = re.findall(r'(?:src|href)=["\']([^"\']*(?:logo|hero|main|top|kv)[^"\']*\.(?:png|jpg|jpeg|webp|svg))["\']', html, re.IGNORECASE)
print("[v0] Found logo/hero images:", imgs)

# _next/image も探す
next_imgs = re.findall(r'_next/image\?url=([^&"\'\\s]+)', html)
print("[v0] Found _next/image URLs:", next_imgs[:10])

# すべての img src を出力
all_imgs = re.findall(r'src=["\']([^"\']+\.(?:png|jpg|jpeg|webp|svg))["\']', html, re.IGNORECASE)
print("[v0] All img srcs:", all_imgs[:20])
