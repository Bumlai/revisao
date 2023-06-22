<?php
//conexao.php
//coloque os dados do banco de dados
$host = 'localhost';
$dbname = 'teste';
$username = 'root';
$password = '';

try{
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $conn -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $error){
    echo "erro na conexão: " . $error->getMessage();
    die();
}