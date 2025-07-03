<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

// Dine Pusher-nøkler
$app_key = "c92aa76da8acb9cdf46f";
$app_secret = "a0cabfc3924039063189";
$app_id = "1985537";

// Håndter POST-data
$postData = file_get_contents('php://input');
$data = json_decode($postData, true);

if (!$data || !isset($data['socket_id']) {
    http_response_code(400);
    echo json_encode(['error' => 'Bad request']);
    exit;
}

$socket_id = $data['socket_id'];
$channel_name = $data['channel_name'];
$username = isset($data['username']) ? $data['username'] : 'Guest_'.rand(1000,9999);

// Generer auth-signature
$string_to_sign = $socket_id . ':' . $channel_name;
$auth = $app_key . ':' . hash_hmac('sha256', $string_to_sign, $app_secret);

// Svar til klienten
echo json_encode([
    'auth' => $auth,
    'channel_data' => json_encode([
        'user_id' => 'user_'.uniqid(),
        'user_info' => [
            'name' => $username,
            'isReady' => true
        ]
    ])
]);
?>