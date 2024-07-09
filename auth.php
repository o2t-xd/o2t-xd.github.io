<?php

function checkTelegramAuthorization($auth_data) {
    $check_hash = $auth_data['hash'];
    unset($auth_data['hash']);
    $data_check_arr = [];
    foreach ($auth_data as $key => $value) {
        $data_check_arr[] = $key . '=' . $value;
    }
    sort($data_check_arr);
    $data_check_string = implode("\n", $data_check_arr);
    $secret_key = hash('sha256', "7432914928:AAHtE9im8wbrr-D0_I27tK1VA43FiFFKz7g", true);
    $hash = hash_hmac('sha256', $data_check_string, $secret_key);
    return hash_equals($hash, $check_hash);
}

$auth_data = $_GET;
if (checkTelegramAuthorization($auth_data)) {
    // Успешная авторизация
    // Здесь вы можете создать сессию пользователя или выполнить другие действия
    header("Location: https://t.me/PizzaTsunamiBot");
} else {
    // Ошибка авторизации
    echo 'Ошибка авторизации.';
}
?>
