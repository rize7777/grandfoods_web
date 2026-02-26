import fs from "fs"
import path from "path"

const BASE_URL = "https://grandfoods.co.jp"
const OUTPUT_DIR = "/vercel/share/v0-project/public/images"

async function fetchHTML() {
  const res = await fetch(BASE_URL, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    },
  })
  if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`)
  return res.text()
}

function extractImagePaths(html) {
  const paths = new Set()

  const srcRegex = /src=["']([^"']*(?:\.jpg|\.jpeg|\.png|\.webp|\.gif|\.svg)[^"']*?)["']/gi
  let m
  while ((m = srcRegex.exec(html)) !== null) {
    paths.add(m[1])
  }

  const urlRegex = /url\(["']?([^"')]*(?:\.jpg|\.jpeg|\.png|\.webp|\.gif|\.svg)[^"')]*?)["']?\)/gi
  while ((m = urlRegex.exec(html)) !== null) {
    paths.add(m[1])
  }

  const nextImgRegex = /_next\/image\?url=([^&"'\s]+)/gi
  while ((m = nextImgRegex.exec(html)) !== null) {
    try {
      paths.add(decodeURIComponent(m[1]))
    } catch (_) {}
  }

  return [...paths]
}

function toAbsoluteURL(src) {
  if (src.startsWith("http://") || src.startsWith("https://")) return src
  if (src.startsWith("//")) return "https:" + src
  if (src.startsWith("/")) return BASE_URL + src
  return BASE_URL + "/" + src
}

function toLocalFilename(src) {
  let p = src
  try {
    const u = new URL(src.startsWith("http") ? src : BASE_URL + src)
    p = u.pathname
  } catch (_) {}
  return path.basename(p)
}

async function downloadImage(url, destPath) {
  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      Referer: BASE_URL,
    },
  })
  if (!res.ok) {
    console.log(`[v0] スキップ (${res.status}): ${url}`)
    return false
  }
  const buf = Buffer.from(await res.arrayBuffer())
  fs.writeFileSync(destPath, buf)
  console.log(`[v0] 保存: ${destPath} (${buf.length} bytes)`)
  return true
}

async function main() {
  // フォルダが存在しない場合は絶対パスで確認
  if (!fs.existsSync(OUTPUT_DIR)) {
    console.log(`[v0] フォルダが存在しません: ${OUTPUT_DIR}`)
    process.exit(1)
  }
  console.log(`[v0] 出力先: ${OUTPUT_DIR}`)

  console.log("[v0] HTMLを取得中:", BASE_URL)
  const html = await fetchHTML()
  console.log("[v0] HTML取得完了, 長さ:", html.length)

  const rawPaths = extractImagePaths(html)
  console.log("[v0] 検出した画像パス数:", rawPaths.length)
  rawPaths.forEach((p) => console.log("  -", p))

  const toDownload = rawPaths.filter((p) => {
    if (p.startsWith("data:")) return false
    if (p.includes("googletagmanager") || p.includes("google-analytics")) return false
    return true
  })

  let count = 0
  for (const rawPath of toDownload) {
    const absURL = toAbsoluteURL(rawPath)
    const filename = toLocalFilename(rawPath)
    if (!filename || filename.length < 3) continue
    const destPath = OUTPUT_DIR + "/" + filename
    const ok = await downloadImage(absURL, destPath)
    if (ok) count++
  }

  console.log(`[v0] 完了: ${count}枚の画像をダウンロードしました`)
}

main().catch((err) => {
  console.error("[v0] エラー:", err.message)
  process.exit(1)
})
