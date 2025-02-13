"use client";

import { useState } from "react";
import { supabase } from "@/utils/supabase/client";
import Image from "next/image";

export default function TestPage() {
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError("ファイルを選択してください");
      return;
    }

    try {
      setLoading(true);
      setError("");

      // ファイル名をユニークにする
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `test/${fileName}`;

      console.log("Uploading file:", filePath); // アップロード開始ログ

      const { error: uploadError, data: uploadData } = await supabase.storage
        .from("problem_images")
        .upload(filePath, file);

      if (uploadError) {
        console.error("Upload error:", uploadError); // アップロードエラーログ
        throw uploadError;
      }

      console.log("Upload success:", uploadData); // アップロード成功ログ

      // アップロード成功後、公開URLを取得
      const { data: urlData } = supabase.storage
        .from("problem_images")
        .getPublicUrl(filePath);

      console.log("URL data:", urlData); // URL取得データログ
      console.log("Public URL:", urlData.publicUrl); // 最終的なURL

      setImageUrl(urlData.publicUrl);
    } catch (err) {
      console.error("Full error:", err); // 詳細なエラーログ
      setError(err instanceof Error ? err.message : "エラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  const handleAuth = async () => {
    try {
      setLoading(true);
      setError("");
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
      });
      if (error) throw error;
    } catch (err) {
      setError(err instanceof Error ? err.message : "認証エラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Supabase 接続テスト</h1>

      {/* 認証テスト */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">認証テスト</h2>
        <button
          onClick={handleAuth}
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          Googleでログイン
        </button>
      </div>

      {/* 画像アップロードテスト */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">画像アップロードテスト</h2>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="mb-4"
        />
        <button
          onClick={handleUpload}
          disabled={loading || !file}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:bg-gray-400"
        >
          アップロード
        </button>
      </div>

      {/* 結果表示 */}
      {error && <div className="text-red-500 mb-4">エラー: {error}</div>}

      {imageUrl && (
        <div className="mb-4">
          <h3 className="font-semibold mb-2">アップロードされた画像:</h3>
          <Image
            src={imageUrl}
            alt="Uploaded"
            width={500}
            height={300}
            className="max-w-md"
          />
        </div>
      )}

      {loading && <div>処理中...</div>}
    </div>
  );
}
