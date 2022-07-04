<?php

class Message
{

    public static function successServer(string $message)
    {
        return json_encode((object) array(
            "title" => "Hecho",
            "text" => $message,
            "icon" => "success"
        ));
    }

    public static function errorServer(string $error)
    {
        return json_encode((object) array(
            "title" => "Error",
            "text" =>  $error,
            "icon" => "error"
        ));
    }
}