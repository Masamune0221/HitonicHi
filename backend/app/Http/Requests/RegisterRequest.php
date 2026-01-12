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
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
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
            //
        ];

    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'email.unique' => 'このメールアドレスは既に使用されています。',
            'password.regex' => 'パスワードは大文字、小文字、数字、記号をそれぞれ1文字以上含める必要があります。',
            'email.email' => 'メールアドレスの形式で登録する必要があります。',
            'name.max.string' => 'ユーザ名は255文字以内です。',

        ];
    }
}
