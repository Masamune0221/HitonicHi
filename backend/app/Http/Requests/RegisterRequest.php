<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
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
            'name' => ['required', 'string', 'max:255', 'unique:users'],
            'password' => [
                'required',
                'string',
                'confirmed',
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
            'name.unique' => 'このユーザー名は既に使用されています。',
            'password.required' => 'パスワードは必須です。',
            'password.confirmed' => 'パスワードが一致しません。',
            'password.min' => 'パスワードは8文字以上である必要があります。',
            'password.regex' => 'パスワードは大文字、小文字、数字、記号をそれぞれ1文字以上含める必要があります。',
        ];
    }
}
