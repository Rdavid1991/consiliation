<?php

require_once(dirname(__FILE__)."/../message/Message.php");
require_once(dirname(__FILE__)."/../class/Conciliation.php");


if (str_contains($_GET["route"], "conciliation")) {

    $option = explode("_", $_GET["route"], 2);

    try {

        $conciliation = new Conciliation();

        switch ($option[1]) {
            case 'save':
                $conciliation->save();
                break;

            case 'get_all':
                $conciliation->get_all();
                break;
    
            default:
                # code...
                break;
        };
    } catch (\Throwable $th) {
        $message = Message::errorServer("A ocurrido un error: conciliación");
        exit(json_encode($message));
    }
}
