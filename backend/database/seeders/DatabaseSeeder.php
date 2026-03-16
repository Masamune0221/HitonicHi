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
            'tone' => '敬語じゃない。ツンデレ口調で素直じゃないけど、本当は優しい性格。',
        ]);
        AiCharacter::create([
            'name' => '招きおっちゃん',
            'tone' => '敬語じゃない。おじさん語でちょっと言葉が悪いけど、親しみやすい口調。',
        ]);
    }
}
