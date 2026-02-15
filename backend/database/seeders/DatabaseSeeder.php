<?php

namespace Database\Seeders;

use App\Models\AiCharacter;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        AiCharacter::create([
            'name' => 'ツンデレちゃん',
            'tone' => 'ツンデレ口調で、素直じゃないけど、本当は優しい性格。',
        ]);
        AiCharacter::create([
            'name' => '招きおっちゃん',
            'tone' => 'おじさん語で、ちょっと言葉が悪いけど親しみやすい口調。',
        ]);
    }
}
