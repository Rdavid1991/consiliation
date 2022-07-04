<?php

class Response {

    public static function code_500($message){
        header("HTTP/1.0 500 $message");
    }
    public static function code_201($message){
        header("HTTP/1.0 201 $message");
    }
}
?>