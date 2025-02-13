"use client";

import { useState } from "react";
import { supabase } from "@/utils/supabase/client";
import Link from "next/link";

export default function AuthPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setError("");
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      });
      if (error) throw error;
    } catch (err) {
      setError(err instanceof Error ? err.message : "ログインに失敗しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-blue-50 py-20 px-4">
      <div className="max-w-md mx-auto">
        {/* カード */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* ヘッダー */}
          <div className="text-center mb-8">
            <Link
              href="/"
              className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600"
            >
              JoyMath
            </Link>
            <h1 className="text-2xl font-bold mt-6 mb-2">アカウント作成</h1>
            <p className="text-gray-600">数学の新しい学び方を始めよう！</p>
          </div>

          {/* ソーシャルログインボタン */}
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full bg-white border-2 border-gray-200 text-gray-800 px-6 py-3 rounded-xl 
                     hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center gap-3 mb-4"
          >
            <GoogleIcon />
            <span className="font-medium">Googleでログイン</span>
          </button>

          {/* エラーメッセージ */}
          {error && (
            <div className="text-red-500 text-sm text-center mt-4">{error}</div>
          )}

          {/* 利用規約など */}
          <div className="mt-8 text-center text-sm text-gray-500">
            <p>
              登録することで、
              <Link href="/terms" className="text-blue-600 hover:underline">
                利用規約
              </Link>
              と
              <Link href="/privacy" className="text-blue-600 hover:underline">
                プライバシーポリシー
              </Link>
              に同意したことになります。
            </p>
          </div>
        </div>

        {/* 既存ユーザー向け */}
        <div className="text-center mt-8">
          <p className="text-gray-600">
            すでにアカウントをお持ちの方は
            <button
              onClick={handleGoogleLogin}
              className="text-blue-600 hover:underline ml-1"
            >
              ログイン
            </button>
          </p>
        </div>
      </div>
    </main>
  );
}

// Googleアイコンコンポーネント
function GoogleIcon() {
  return (
    <svg
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M23.766 12.2764C23.766 11.4607 23.6999 10.6406 23.5588 9.83807H12.24V14.4591H18.7217C18.4528 15.9494 17.5885 17.2678 16.323 18.1056V21.1039H20.19C22.4608 19.0139 23.766 15.9274 23.766 12.2764Z"
        fill="#4285F4"
      />
      <path
        d="M12.24 24.0008C15.4764 24.0008 18.2058 22.9382 20.1944 21.1039L16.3274 18.1055C15.2516 18.8375 13.8626 19.252 12.24 19.252C9.07106 19.252 6.40935 17.1399 5.4635 14.3003H1.45386V17.3912C3.51785 21.4434 7.71026 24.0008 12.24 24.0008Z"
        fill="#34A853"
      />
      <path
        d="M5.4635 14.3003C5.23662 13.5721 5.10906 12.7952 5.10906 12C5.10906 11.2048 5.23662 10.4279 5.4635 9.69977V6.60889H1.45386C0.52895 8.22579 0 10.0623 0 12C0 13.9377 0.52895 15.7742 1.45386 17.3912L5.4635 14.3003Z"
        fill="#FBBC04"
      />
      <path
        d="M12.24 4.74966C14.0217 4.74966 15.6257 5.36715 16.8581 6.54066L20.2764 3.12234C18.2058 1.18807 15.4764 0 12.24 0C7.71026 0 3.51785 2.55733 1.45386 6.60889L5.4635 9.69977C6.40935 6.86018 9.07106 4.74966 12.24 4.74966Z"
        fill="#EA4335"
      />
    </svg>
  );
}
