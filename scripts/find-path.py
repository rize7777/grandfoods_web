import os, subprocess

print("[v0] cwd:", os.getcwd())
print("[v0] __file__:", __file__)

# 上位ディレクトリを探索
for root, dirs, files in os.walk("/vercel"):
    level = root.replace("/vercel", "").count(os.sep)
    if level > 4:
        continue
    indent = " " * 2 * level
    print(f"{indent}{root}/")
    subindent = " " * 2 * (level + 1)
    for f in files[:5]:
        print(f"{subindent}{f}")
