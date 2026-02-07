<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AI_Response extends Model
{
    protected $table = "ai_response";

    protected $fillable = [
        'user_id',
        'dairy_id',
        'content',
    ];

    // ユーザーIDとのリレーション
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    // 日記IDとのリレーション
    public function dairy()
    {
        return $this->belongsTo(Dairy::class);
    }
}
