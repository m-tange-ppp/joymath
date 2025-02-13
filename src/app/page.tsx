import Link from "next/link";
// import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-blue-50">
      {/* ヒーローセクション */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center text-center space-y-8">
            <div className="animate-bounce text-6xl mb-2">🎯</div>
            <h1 className="text-5xl md:text-6xl font-bold">
              <span className="text-gray-800">数学を</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                楽しく
              </span>
              <span className="text-gray-800">学ぼう</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-2xl leading-relaxed">
              分からないところは質問、分かるところは教え合い。
              <br className="hidden md:inline" />
              みんなで一緒に成長する新しい学び方。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Link
                href="/problems"
                className="group relative px-8 py-4 text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:scale-105 transition-transform duration-200 shadow-lg hover:shadow-xl"
              >
                問題を探す
                <span className="absolute -right-2 -top-2 bg-red-500 text-white text-sm px-2 py-1 rounded-full animate-pulse">
                  New!
                </span>
              </Link>
              <Link
                href="/auth"
                className="px-8 py-4 text-lg font-semibold bg-white text-blue-600 rounded-xl border-2 border-blue-600 hover:bg-blue-50 transition-colors duration-200"
              >
                無料で始める
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 特徴セクション */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              JoyMath
            </span>
            の特徴
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              title="問題を解く"
              description="テスト対策から入試問題まで。自分のペースで楽しく解こう！"
              icon="📝"
              color="from-pink-500 to-rose-500"
            />
            <FeatureCard
              title="教え合う"
              description="分からない時は質問、分かる時は解説。みんなで高め合おう！"
              icon="🤝"
              color="from-blue-500 to-cyan-500"
            />
            <FeatureCard
              title="成長する"
              description="教えるとポイントGET！レベルアップして特典をゲット！"
              icon="🎮"
              color="from-green-500 to-emerald-500"
            />
          </div>
        </div>
      </section>

      {/* CTAセクション */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            さぁ、新しい数学の世界へ！
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            仲間と一緒に楽しく学ぼう。登録は完全無料！
          </p>
          <Link
            href="/auth"
            className="inline-block px-8 py-4 text-lg font-semibold bg-white text-blue-600 rounded-xl hover:scale-105 transition-transform duration-200 shadow-lg"
          >
            今すぐスタート！
          </Link>
        </div>
      </section>
    </main>
  );
}

// 特徴カードコンポーネント
function FeatureCard({
  title,
  description,
  icon,
  color,
}: {
  title: string;
  description: string;
  icon: string;
  color: string;
}) {
  return (
    <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-200">
      <div
        className={`text-5xl mb-6 bg-gradient-to-r ${color} text-transparent bg-clip-text group-hover:scale-110 transition-transform duration-200`}
      >
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}
