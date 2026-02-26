# 山田食品 - 静的 HTML/CSS/JavaScript 版

Next.js プロジェクトを静的 HTML・CSS・JavaScript に変換したバージョンです。

## 使い方

1. **画像の配置**  
   元プロジェクトの `public/images/` にある画像を、このフォルダ内の `images/` にコピーしてください。

   必要な画像:
   - `hero.jpg` - ヒーロー背景
   - `about.jpg` - 私たちについて
   - `parallax-field.jpg` - パララックス1
   - `product-1.jpg`, `product-2.jpg`, `product-3.jpg` - 商品

   ```bash
   mkdir -p images
   cp ../public/images/* images/
   ```

2. **表示**  
   `index.html` をブラウザで開くか、XAMPP の htdocs にこのフォルダを置いて `http://localhost/aaa/html-version/` でアクセスできます。

## 構成

- `index.html` - 1ページの全セクション
- `css/style.css` - デザイントークン・レイアウト・コンポーネント
- `js/main.js` - ヘッダースクロール、モバイルメニュー、パララックス、スクロール表示アニメーション

## 含まれる機能

- 固定ヘッダー（スクロールで背景・影の変化）
- モバイル用ハンバーガーメニュー
- ヒーロー・パララックス区切りのパララックス効果
- セクション表示時のフェードイン・スライドイン（Intersection Observer）
- フォント: Google Fonts（Noto Sans JP, Noto Serif JP）
