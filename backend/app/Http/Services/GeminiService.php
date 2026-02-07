<?php

namespace App\Http\Services;

// Model
use App\Models\AI_Response;
// Log
use Illuminate\Support\Facades\Log;
// Exception
use Exception;
// Gemini
use Gemini\Enums\ModelVariation;
use Gemini\GeminiHelper;
use Gemini;



class GeminiService
{
    private const PROMPT_TEMPLATE = "
    あなたはHitonicHiのユーザーに対して共感力の高いカウンセラーです。
    投稿内容を読んで、ユーザーの気持ちに寄り添った返信をしてください。
    否定的な言葉は絶対にやめてください。
    文章は100文字程度で、わかりやすくしてください。
    最後はまたいつでも投稿してくださいね。と締めくくってください。

    ユーザーの投稿内容
    ";

    /**
     * Generate response from Gemini API
     * @param string $content
     * @param int $dairy_id
     * @return string
     */
    public function generateResponse(string $content,int $dairy_id): string {
        // apiキーを取得
        $apikey = env('GEMINI_API_KEY');
        // モデル名を取得
        $model = env('GEMINI_MODEL');
        // Geminiクライアントを初期化
        $client = Gemini::client($apikey);
        try {
            // Gemini APIを呼び出し
            $result = $client->generativeModel($model)->generateContent(self::PROMPT_TEMPLATE . $content);
            // 結果を保存
            $response = AI_Response::create([
                'user_id' => auth()->id(),
                'dairy_id' => $dairy_id,
                'content' => $result->text(),
            ]);
            return $response->content;
        } catch (Exception $e) {
            // エラーログを出力
            Log::error($e->getMessage());
            // エラーメッセージを返す
            return "今日は私の調子が悪いみたいです・・・ でも、こうして気持ちを吐き出してくれてありがとうございます。またいつでも投稿してくださいね。";
        }
    }
}