<?php

namespace App\Http\Services;

use App\Models\Dairy;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;

class DairyService{

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
     * @return Dairy
     */
    public function dairyCreate($data){
        try{
            $dairy = Dairy::create($data);
            return $dairy;
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