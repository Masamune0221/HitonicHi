<?php

namespace App\Http\Services;

use App\Models\Dairy;
use App\Models\AI_Response;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use App\Http\Services\GeminiService;

class DairyService{
    private $geminiService;
    // GeminiServiceをコンストラクタで受け取る
    public function __construct(GeminiService $geminiService){
        $this->geminiService = $geminiService;
    }

    /**
     * 今日の日記を取得する(Service)
     * @return Dairy
     */
    public function today():bool{
        try{
            $dairy = Dairy::where('user_id', auth()->id())->whereDate('created_at', now()->toDateString())->first();
            return $dairy ? true : false;
        }catch(Exception $e){
            throw $e;
        }
    }
    /**
     * 日記を作成する(Service)
     * @param array $data
     * @return array
     */
    public function dairyCreate($data):array{
        try{
            // 日記を作成
            $dairy = Dairy::create($data);
            // AIに返信を生成させる
            $response = $this->geminiService->generateResponse($data['content'], $dairy->id);
            // 日記とAIの返信を返す
            return ['dairy' => $dairy, 'ai_response' => $response];
        }catch(Exception $e){
            throw $e;
        }
    }

    /**
     * 日記一覧を取得する(Service)
     * @param int $userId
     * @return array
     */
    public function getDairies($userId){
        try{
            $dairies = Dairy::where('user_id', $userId)
                ->with('aiResponses.character')
                ->orderBy('created_at', 'desc')
                ->get()
                ->groupBy(function($dairy) {
                    return $dairy->created_at->format('Y-m');
                })
                ->map(function($group) {
                    return $group->map(function($dairy) {
                        return [
                            'id' => $dairy->id,
                            'content' => $dairy->content,
                            'ai_responses' => $dairy->aiResponses->map(function($response) {
                                return [
                                    'content' => $response->content,
                                    'character_name' => $response->character->name ?? 'Unknown',
                                    'character_tone' => $response->character->tone ?? '',
                                ];
                            }),
                            'date' => $dairy->created_at->format('Y-m-d'),
                            'created_at' => $dairy->created_at->toISOString(),
                        ];
                    });
                });
            
            return $dairies;
        }catch(Exception $e){
            throw $e;
        }
    }
}