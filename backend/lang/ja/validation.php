<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | 以下の言語行はバリデータクラスで使用されるデフォルトのエラーメッセージです。
    | これらのルールの一部には複数のバージョンがあり、サイズルールに
    | そのようにしてください。ここでこれらのメッセージを自由に調整できます。
    |
    */

    'accepted' => ':attribute を承認してください。',
    'accepted_if' => ':other が :value のとき、:attribute を承認してください。',
    'active_url' => ':attribute には有効な URL を指定してください。',
    'after' => ':attribute には、:date より後の日付を指定してください。',
    'after_or_equal' => ':attribute には、:date 以降の日付を指定してください。',
    'alpha' => ':attribute にはアルファベットのみ使用できます。',
    'alpha_dash' => ':attribute には英数字、ハイフン、アンダースコアのみ使用できます。',
    'alpha_num' => ':attribute には英数字のみ使用できます。',
    'any_of' => ':attribute が無効です。',
    'array' => ':attribute には配列を指定してください。',
    'ascii' => ':attribute には半角の英数字と記号のみ使用できます。',
    'before' => ':attribute には、:date より前の日付を指定してください。',
    'before_or_equal' => ':attribute には、:date 以前の日付を指定してください。',
    'between' => [
        'array' => ':attribute には :min から :max 個の項目を含めてください。',
        'file' => ':attribute には :min KB から :max KB までのファイルを指定してください。',
        'numeric' => ':attribute には :min から :max までの数字を指定してください。',
        'string' => ':attribute は :min 文字から :max 文字にしてください。',
    ],
    'boolean' => ':attribute には true か false を指定してください。',
    'can' => ':attribute に不正な値が含まれています。',
    'confirmed' => ':attribute と確認用入力が一致しません。',
    'contains' => ':attribute に必要な値が欠けています。',
    'current_password' => '現在のパスワードが正しくありません。',
    'date' => ':attribute には有効な日付を指定してください。',
    'date_equals' => ':attribute には :date と同じ日付を指定してください。',
    'date_format' => ':attribute の形式が :format と一致しません。',
    'decimal' => ':attribute には :decimal 桁の小数を指定してください。',
    'declined' => ':attribute は拒否してください。',
    'declined_if' => ':other が :value のとき、:attribute は拒否してください。',
    'different' => ':attribute と :other には異なる値を指定してください。',
    'digits' => ':attribute は :digits 桁で入力してください。',
    'digits_between' => ':attribute は :min 桁から :max 桁で入力してください。',
    'dimensions' => ':attribute の画像サイズが無効です。',
    'distinct' => ':attribute に重複した値があります。',
    'doesnt_contain' => ':attribute に次のいずれの値も含めないでください: :values。',
    'doesnt_end_with' => ':attribute は次のいずれかで終わってはいけません: :values。',
    'doesnt_start_with' => ':attribute は次のいずれかで始まってはいけません: :values。',
    'email' => ':attribute には有効なメールアドレスを指定してください。',
    'encoding' => ':attribute は :encoding でエンコードしてください。',
    'ends_with' => ':attribute は次のいずれかで終わらなければなりません: :values。',
    'enum' => '選択された :attribute は無効です。',
    'exists' => '選択された :attribute は存在しません。',
    'extensions' => ':attribute の拡張子は次のいずれかにしてください: :values。',
    'file' => ':attribute にはファイルを指定してください。',
    'filled' => ':attribute は必須です。',
    'gt' => [
        'array' => ':attribute には :value 個より多くの項目を含めてください。',
        'file' => ':attribute には :value KB より大きいファイルを指定してください。',
        'numeric' => ':attribute には :value より大きい値を指定してください。',
        'string' => ':attribute は :value 文字より長くしてください。',
    ],
    'gte' => [
        'array' => ':attribute には :value 個以上の項目を含めてください。',
        'file' => ':attribute には :value KB 以上のファイルを指定してください。',
        'numeric' => ':attribute には :value 以上の値を指定してください。',
        'string' => ':attribute は :value 文字以上にしてください。',
    ],
    'hex_color' => ':attribute は有効な16進数の色を指定してください。',
    'image' => ':attribute には画像ファイルを指定してください。',
    'in' => '選択された :attribute は無効です。',
    'in_array' => ':attribute には :other のいずれかを指定してください。',
    'in_array_keys' => ':attribute には次のキーのうち少なくとも1つを含めてください: :values。',
    'integer' => ':attribute には整数を指定してください。',
    'ip' => ':attribute には有効な IP アドレスを指定してください。',
    'ipv4' => ':attribute には有効な IPv4 アドレスを指定してください。',
    'ipv6' => ':attribute には有効な IPv6 アドレスを指定してください。',
    'json' => ':attribute には有効な JSON 文字列を指定してください。',
    'list' => ':attribute はリスト形式にしてください。',
    'lowercase' => ':attribute は小文字にしてください。',
    'lt' => [
        'array' => ':attribute には :value 個より少ない項目を含めてください。',
        'file' => ':attribute には :value KB より小さいファイルを指定してください。',
        'numeric' => ':attribute には :value より小さい値を指定してください。',
        'string' => ':attribute は :value 文字より短くしてください。',
    ],
    'lte' => [
        'array' => ':attribute には :value 個より多い項目を含めないでください。',
        'file' => ':attribute には :value KB 以下のファイルを指定してください。',
        'numeric' => ':attribute には :value 以下の値を指定してください。',
        'string' => ':attribute は :value 文字以下にしてください。',
    ],
    'mac_address' => ':attribute は有効な MAC アドレスを指定してください。',
    'max' => [
        'array' => ':attribute には :max 個を超える項目を含めないでください。',
        'file' => ':attribute には :max KB 以下のファイルを指定してください。',
        'numeric' => ':attribute には :max 以下の値を指定してください。',
        'string' => ':attribute は :max 文字以下にしてください。',
    ],
    'max_digits' => ':attribute は :max 桁以下で指定してください。',
    'mimes' => ':attribute には次のタイプのファイルを指定してください: :values。',
    'mimetypes' => ':attribute には次のタイプのファイルを指定してください: :values。',
    'min' => [
        'array' => ':attribute には :min 個以上の項目を含めてください。',
        'file' => ':attribute には :min KB 以上のファイルを指定してください。',
        'numeric' => ':attribute には :min 以上の値を指定してください。',
        'string' => ':attribute は :min 文字以上にしてください。',
    ],
    'min_digits' => ':attribute は :min 桁以上で指定してください。',
    'missing' => ':attribute が存在してはいけません。',
    'missing_if' => ':other が :value のとき、:attribute が存在してはいけません。',
    'missing_unless' => ':other が :value でない限り、:attribute が存在してはいけません。',
    'missing_with' => ':values が存在するとき、:attribute が存在してはいけません。',
    'missing_with_all' => ':values がすべて存在するとき、:attribute が存在してはいけません。',
    'multiple_of' => ':attribute には :value の倍数を指定してください。',
    'not_in' => '選択された :attribute は無効です。',
    'not_regex' => ':attribute の形式が無効です。',
    'numeric' => ':attribute には数字を指定してください。',
    'password' => [
        'letters' => ':attribute には少なくとも1つの文字を含めてください。',
        'mixed' => ':attribute には大文字と小文字をそれぞれ1文字以上含めてください。',
        'numbers' => ':attribute には少なくとも1つの数字を含めてください。',
        'symbols' => ':attribute には少なくとも1つの記号を含めてください。',
        'uncompromised' => '指定された :attribute は漏洩が確認されています。別の :attribute を使用してください。',
    ],
    'present' => ':attribute は必須です。',
    'present_if' => ':other が :value のとき、:attribute は必須です。',
    'present_unless' => ':other が :value でない限り、:attribute は必須です。',
    'present_with' => ':values が存在するとき、:attribute は必須です。',
    'present_with_all' => ':values がすべて存在するとき、:attribute は必須です。',
    'prohibited' => ':attribute は入力できません。',
    'prohibited_if' => ':other が :value のとき、:attribute は入力できません。',
    'prohibited_if_accepted' => ':other が承認されている場合、:attribute は入力できません。',
    'prohibited_if_declined' => ':other が拒否されている場合、:attribute は入力できません。',
    'prohibited_unless' => ':other が :values に含まれていない限り、:attribute は入力できません。',
    'prohibits' => ':attribute は :other が存在することを禁止しています。',
    'regex' => ':attribute の形式が正しくありません。',
    'required' => ':attribute は必須です。',
    'required_array_keys' => ':attribute には次を含めてください: :values。',
    'required_if' => ':other が :value のとき、:attribute は必須です。',
    'required_if_accepted' => ':other が承認されているとき、:attribute は必須です。',
    'required_if_declined' => ':other が拒否されているとき、:attribute は必須です。',
    'required_unless' => ':other が :values に含まれていない限り、:attribute は必須です。',
    'required_with' => ':values が存在するとき、:attribute は必須です。',
    'required_with_all' => ':values がすべて存在するとき、:attribute は必須です。',
    'required_without' => ':values が存在しないとき、:attribute は必須です。',
    'required_without_all' => ':values が一つも存在しないとき、:attribute は必須です。',
    'same' => ':attribute と :other が一致しません。',
    'size' => [
        'array' => ':attribute には :size 個の項目を含めてください。',
        'file' => ':attribute には :size KB のファイルを指定してください。',
        'numeric' => ':attribute には :size を指定してください。',
        'string' => ':attribute は :size 文字にしてください。',
    ],
    'starts_with' => ':attribute は次のいずれかで始まらなければなりません: :values。',
    'string' => ':attribute には文字列を指定してください。',
    'timezone' => ':attribute には有効なタイムゾーンを指定してください。',
    'unique' => ':attribute は既に使用されています。',
    'uploaded' => ':attribute のアップロードに失敗しました。',
    'uppercase' => ':attribute は大文字にしてください。',
    'url' => ':attribute には有効な URL を指定してください。',
    'ulid' => ':attribute には有効な ULID を指定してください。',
    'uuid' => ':attribute には有効な UUID を指定してください。',

    /*
    |--------------------------------------------------------------------------
    | Custom Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | ここでは「attribute.rule」の規約を使用して属性に対するカスタム検証
    | メッセージを指定できます。これにより、特定の属性ルール用の
    | 特定のカスタム言語行を素早く指定できます。
    |
    */

    'custom' => [
        'attribute-name' => [
            'rule-name' => 'custom-message',
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Custom Validation Attributes
    |--------------------------------------------------------------------------
    |
    | 以下の言語行を使用して、属性プレースホルダーを「E-Mail Address」などの
    | よりわかりやすいものに置き換えます。これによりメッセージを
    | より表現豊かにすることができます。
    |
    */

    'attributes' => [],

];
