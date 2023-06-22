<?php
//----------------------------------------------
//MUDE O NOME DO Nometabela.PHP para o nome da sua tabela
//----------------------------------------------
//base do banco que usei para fazer essa revisão
// create database teste;

// use teste;

// create table nometabela (
// id int auto_increment primary key,
// variavel1 varchar(255) not null,
// variavel2 varchar(255) not null,
// variavel3 varchar(255) not null
// );

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if($_SERVER['REQUEST_METHOD'] === 'OPTIONS'){
    exit;   
}

include 'conexao.php';

if($_SERVER['REQUEST_METHOD'] === 'GET'){
    $stmt = $conn->prepare("SELECT * FROM nomeTabela");//mudar o nomeTabela para o nome da sua tabela
    $stmt->execute();
    $nomeTabela = $stmt->fetchAll(PDO::FETCH_ASSOC);//mudar o nome da tabela para o noma da tabela
    echo json_encode($nomeTabela);//mudar o nome da tabela para o noma da tabela
}

//Rota para criar
if ($_SERVER ['REQUEST_METHOD'] === 'POST'){
    //adicionar nome das variaveis de acordo com o banco de dados
    $variavel1 = $_POST['variavel1'];
    $variavel2 = $_POST['variavel2'];
    $variavel3 = $_POST['variavel3'];



    //mude o nomeTabela para o nome da sua tabela e as variaveis para as variavel iguais a do banco
    $stmt = $conn->prepare("INSERT INTO nomeTabela (variavel1, variavel2, variavel3) VALUES (:variavel1, :variavel2, :variavel3)");

    //mude o nome das variaveis para as mesmas do banco
    $stmt->bindParam(":variavel1", $variavel1);
    $stmt->bindParam(":variavel2",$variavel2);
    $stmt->bindParam(":variavel3", $variavel3);
    //Outros bindParams ...


    if($stmt->execute()){
        echo "criado com sucesso!!";
    }else{
        echo "error ao criar!!";
    }
}

//rota para excluir
if($_SERVER['REQUEST_METHOD'] === 'DELETE' && isset($_GET['id'])){
    $id = $_GET['id'];
    $stmt = $conn->prepare("DELETE FROM nomeTabela WHERE id = :id");
    $stmt->bindParam(':id', $id);

    if($stmt->execute()){
        echo "excluido com sucesso!!";
    } else {
        echo"erro ao excluir";
    }
}

//Rota para editar
if($_SERVER['REQUEST_METHOD'] === 'PUT' && isset($_GET['id'])){
    parse_str(file_get_contents("php://input"), $_PUT);

    $id = $_GET['id'];
    //mude o nome das variaveis para as mesmas do banco
    $variavel1 = $_PUT['variavel1'];
    $variavel2 = $_PUT['variavel2'];
    $variavel3 = $_PUT['variavel3'];



    $stmt = $conn->prepare("UPDATE nomeTabela SET variavel1 = :variavel1, variavel2 = :variavel2, variavel3 = :variavel3 WHERE id = :id");
    $stmt->bindParam(":variavel1", $variavel1);
    $stmt->bindParam(":variavel2",$variavel2);
    $stmt->bindParam(":variavel3", $variavel3);
    $stmt->bindParam(':id', $id);

    if($stmt->execute()){
        echo "atualizado com sucesso!";
    } else {
        echo"erro ao atualizar";
    }

}


