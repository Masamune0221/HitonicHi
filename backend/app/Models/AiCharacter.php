<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AiCharacter extends Model
{
    //
    protected $table = 'ai_charachers';

    protected $fillable = [
        'id',
        'name',
        'tone',
    ];

    public function aiResponse()
    {
        return $this->hasMany(AiResponse::class);
    }
}
