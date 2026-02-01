<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LoginRequest extends FormRequest
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
            'name' => ['required', 'string'],
            'password' => ['required',
                'string',
                'min:8',
                'regex:/[A-Z]/',      // 大文字を含む
                'regex:/[a-z]/',      // 小文字を含む
                'regex:/[0-9]/',      // 数字を含む
                'regex:/[!@#$%^&*(),.?":{}|<>-]/', // 記号を含む
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'ユーザー名は必須です。',
            'password.required' => 'パスワードは必須です。',
        ];
    }
}
