<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class DairyRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'content' => 'required|string|max:5000',
        ];
    }

    public function messages(): array
    {
        return [
            'content.required' => '日記の内容を入力してください',
            'content.string' => '日記の内容は文字列で入力してください',
            'content.max' => '日記の内容は5000文字以内で入力してください',
        ];
    }
}
