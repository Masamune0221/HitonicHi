<?php

namespace App\Http\Services;

// Model
use App\Models\AI_Response;
use App\Models\AiCharacter;
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
    文章は100〜200文字程度で、わかりやすくしてください。
    ポジティブな言葉を使いましょう。
    最後はまたいつでも投稿してくださいね。と締めくくってください。
    ";

    /**
     * Generate response from Gemini API
     * @param string $content
     * @param int $dairy_id
     * @return string
     */
    public function generateResponse(string $content,int $dairy_id): array {
        // apiキーを取得
        $apikey = env('GEMINI_API_KEY');
        // モデル名を取得
        $model = env('GEMINI_MODEL');
        // Geminiクライアントを初期化
        $client = Gemini::client($apikey);
        
        // キャラクターをランダムに取得
        $aiCharacter = AiCharacter::inRandomOrder()->first();

        // キャラクターがまだ登録されていない場合の対策（念のため）
        if (!$aiCharacter) {
             return [
                'content' => "キャラクターが見つかりませんでした。",
                'character_name' => 'System',
                'character_tone' => 'Default',
             ];
        }
        try {
            // プロンプトを作成（キャラの設定を埋め込む）
            $prompt = self::PROMPT_TEMPLATE . "
            【重要】あなたは以下のキャラクターになりきって答えてください。
            キャラクター名: {$aiCharacter->name}
            話し方・口調: {$aiCharacter->tone}
            ユーザーの投稿内容: " . $content;

            // Gemini APIを呼び出し
            $result = $client->generativeModel($model)->generateContent($prompt);
            
            // 結果を保存
            $response = AI_Response::create([
                'user_id' => auth()->id(),
                'dairy_id' => $dairy_id,
                'ai_character_id' => $aiCharacter->id,
                'content' => $result->text(),
            ]);
            
            return [
                'content' => $response->content,
                'character_name' => $aiCharacter->name,
                'character_tone' => $aiCharacter->tone,
            ];

        } catch (Exception $e) {
            // エラーログを出力
            Log::error($e->getMessage());
            // エラーメッセージを返す
            return [
                'content' => "今日は私の調子が悪いみたいです・・・ でも、こうして気持ちを吐き出してくれてありがとうございます。またいつでも投稿してくださいね。",
                'character_name' => 'System',
                'character_tone' => 'Default',
            ];
        }
    }
}