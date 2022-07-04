<?php

require_once(dirname(__FILE__)."/../utils/Message.php");
require_once(dirname(__FILE__)."/../utils/Response_code.class.php");

define(
    "CONNECTION_INFO",
    array(
        'Database' => 'db_conciliations',
        "UID" => "sa",
        "PWD" => "Abcd1234.",
        'CharacterSet' => 'UTF-8',
        'ReturnDatesAsStrings' => TRUE,
        "LoginTimeout" => 5
    )
);

define("SERVER", "localhost");


class Connection
{
    protected $_db;
    public $_connected;

    function __construct()
    {
        $dbc = sqlsrv_connect(SERVER, CONNECTION_INFO);
        if ($dbc) {
            $this->_db = $dbc;
            $this->_connected = true;
        } else {
            $arrayError = sqlsrv_errors();
            $error = "No se pudo conectar a la base de datos: ".$arrayError[0]["message"];
            $message = Message::errorServer($error);
            Response::code_500($message);
            exit();
        }
    }

    function __destruct()
    {
        if ($this->_connected) {
            sqlsrv_close($this->_db);
        }
    }
}
?>