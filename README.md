# JoyMath - 数学を楽しく学ぼう

JoyMath は、中高生向けの新しい数学学習プラットフォームです。問題を解いて、教えあって、みんなで成長する環境を提供します。

## 主な機能

### 🎯 問題を解く

- 様々な難易度の問題に挑戦
- テスト対策から入試問題まで幅広く対応
- 自分のペースで学習可能

### 🤝 教え合う

- 分からない問題は質問
- 分かる問題は解説
- コミュニティで互いに高め合う

### 📈 成長する

- 教えることでポイント獲得
- レベルアップシステム
- 継続的な学習をサポート

## 技術スタック

- **フロントエンド**: Next.js 14, React 18, TypeScript
- **スタイリング**: TailwindCSS
- **バックエンド**: Supabase
- **認証**: Google OAuth
- **画像ストレージ**: Supabase Storage
- **数式表示**: KaTeX

## 開発環境のセットアップ

```bash
# リポジトリのクローン
git clone https://github.com/yourusername/joymath.git
cd joymath

# 依存関係のインストール
npm install

# 環境変数の設定
cp .env.example .env.local
# .env.localに必要な環境変数を設定

# 開発サーバーの起動
npm run dev
```

## 環境変数

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## デプロイ

このプロジェクトは[Vercel](https://vercel.com)でのデプロイを推奨します。

```bash
npm run build
```

## ライセンス

このプロジェクトは MIT ライセンスの下で公開されています。

## コントリビューション

バグ報告や機能要望は[Issues](https://github.com/yourusername/joymath/issues)にお願いします。
プルリクエストも歓迎です！
