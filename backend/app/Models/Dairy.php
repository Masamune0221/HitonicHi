<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Dairy extends Model
{
    protected $table ="dairies";
    protected $fillable = [
        'user_id',
        'content',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function aiResponses()
    {
        return $this->hasMany(AiResponse::class);
    }
}
