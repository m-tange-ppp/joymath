"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/client";
import Link from "next/link";

type UserStats = {
  solvedProblems: number;
  contributions: number;
  currentStreak: number;
  level: number;
  exp: number;
};

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState<string>("");
  const [stats, setStats] = useState<UserStats>({
    solvedProblems: 0,
    contributions: 0,
    currentStreak: 0,
    level: 1,
    exp: 0,
  });

  useEffect(() => {
    checkUser();
    // 仮のデータを設定
    setStats({
      solvedProblems: 42,
      contributions: 15,
      currentStreak: 3,
      level: 5,
      exp: 2480,
    });
  }, []);

  const checkUser = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user?.user_metadata?.full_name) {
        setUserName(user.user_metadata.full_name);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* ヘッダー */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {userName ? userName[0].toUpperCase() : "J"}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                ようこそ、{userName || "数学好き"}さん！
              </h1>
              <p className="text-gray-600">
                今日も一緒に数学を楽しみましょう！
              </p>
            </div>
          </div>
        </div>

        {/* 統計カード */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="解いた問題"
            value={stats.solvedProblems}
            unit="問"
            icon="📝"
          />
          <StatCard
            title="貢献度"
            value={stats.contributions}
            unit="回"
            icon="🤝"
          />
          <StatCard
            title="継続日数"
            value={stats.currentStreak}
            unit="日"
            icon="🔥"
          />
          <StatCard
            title="レベル"
            value={stats.level}
            subValue={`${stats.exp}/3000 EXP`}
            icon="⭐"
          />
        </div>

        {/* アクションカード */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ActionCard
            title="問題を解く"
            description="様々な難易度の問題に挑戦しよう"
            icon="🎯"
            link="/problems"
            color="from-blue-500 to-indigo-500"
          />
          <ActionCard
            title="質問する"
            description="分からないところを質問してみよう"
            icon="❓"
            link="/questions"
            color="from-green-500 to-emerald-500"
          />
        </div>
      </div>
    </main>
  );
}

function StatCard({
  title,
  value,
  unit,
  subValue,
  icon,
}: {
  title: string;
  value: number;
  unit?: string;
  subValue?: string;
  icon: string;
}) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-600 font-medium">{title}</h3>
        <span className="text-2xl">{icon}</span>
      </div>
      <div className="flex items-baseline">
        <span className="text-3xl font-bold text-gray-900">{value}</span>
        {unit && <span className="ml-1 text-gray-600">{unit}</span>}
      </div>
      {subValue && <div className="mt-2 text-sm text-gray-500">{subValue}</div>}
    </div>
  );
}

function ActionCard({
  title,
  description,
  icon,
  link,
  color,
}: {
  title: string;
  description: string;
  icon: string;
  link: string;
  color: string;
}) {
  return (
    <Link
      href={link}
      className={`block bg-gradient-to-r ${color} rounded-xl shadow-lg p-6 text-white hover:scale-[1.02] transition-transform duration-200`}
    >
      <div className="flex items-center gap-4">
        <span className="text-4xl">{icon}</span>
        <div>
          <h3 className="text-xl font-bold mb-1">{title}</h3>
          <p className="text-white/90">{description}</p>
        </div>
      </div>
    </Link>
  );
}
