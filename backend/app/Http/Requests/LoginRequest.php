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
            'email' => ['required', 'string', 'email'],
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
            'email.email' => 'メールアドレスの形式で登録する必要があります。',
            'name.max.string' => 'ユーザ名は255文字以内です。',

        ];
    }
}
