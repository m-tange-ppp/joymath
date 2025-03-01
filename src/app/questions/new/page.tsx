"use client";

import { useState } from "react";
import { supabase } from "@/utils/supabase/client";
import Link from "next/link";
import Image from "next/image";

type Difficulty = "easy" | "medium" | "hard";
type Category = "algebra" | "geometry" | "calculus" | "other";

export default function NewQuestionPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [files, setFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    difficulty: "medium" as Difficulty,
    category: "other" as Category,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles([...files, ...newFiles]);

      // プレビューURL生成
      newFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewUrls((prev) => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      // ユーザー情報取得
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("ログインが必要です");

      // 画像のアップロード
      const imageUrls = [];
      for (const file of files) {
        const fileExt = file.name.split(".").pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `questions/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("problem_images")
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage
          .from("problem_images")
          .getPublicUrl(filePath);

        imageUrls.push(data.publicUrl);
      }

      // 質問データの保存
      const { error: insertError } = await supabase.from("problems").insert([
        {
          title: formData.title,
          text_content: formData.content,
          image_urls: imageUrls,
          difficulty: formData.difficulty,
          category: formData.category,
          created_by: user.id,
        },
      ]);

      if (insertError) throw insertError;

      // 成功時はリダイレクト
      window.location.href = "/questions";
    } catch (err) {
      setError(err instanceof Error ? err.message : "投稿に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">
              新しい質問を投稿
            </h1>
            <p className="text-gray-600">
              分からないところを質問してみましょう
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* タイトル */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                タイトル
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="例：二次方程式の解き方について"
                required
              />
            </div>

            {/* 内容 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                質問内容
              </label>
              <textarea
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-40"
                placeholder="質問の詳細を書いてください"
                required
              />
            </div>

            {/* 難易度 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                難易度
              </label>
              <select
                value={formData.difficulty}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    difficulty: e.target.value as Difficulty,
                  })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="easy">かんたん</option>
                <option value="medium">ふつう</option>
                <option value="hard">むずかしい</option>
              </select>
            </div>

            {/* カテゴリ */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                カテゴリ
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    category: e.target.value as Category,
                  })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="algebra">代数</option>
                <option value="geometry">幾何</option>
                <option value="calculus">微積分</option>
                <option value="other">その他</option>
              </select>
            </div>

            {/* 画像アップロード */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                画像を追加
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                className="w-full"
              />
              {/* プレビュー */}
              {previewUrls.length > 0 && (
                <div className="mt-4 grid grid-cols-2 gap-4">
                  {previewUrls.map((url, index) => (
                    <div key={index} className="relative">
                      <Image
                        src={url}
                        alt={`Preview ${index + 1}`}
                        width={300}
                        height={200}
                        className="rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setFiles(files.filter((_, i) => i !== index));
                          setPreviewUrls(
                            previewUrls.filter((_, i) => i !== index)
                          );
                        }}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* エラーメッセージ */}
            {error && <div className="text-red-500 text-sm">{error}</div>}

            {/* 送信ボタン */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 disabled:bg-gray-400 transition-colors duration-200"
              >
                {loading ? "投稿中..." : "質問を投稿する"}
              </button>
              <Link
                href="/questions"
                className="px-6 py-3 border-2 border-gray-300 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors duration-200"
              >
                キャンセル
              </Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
