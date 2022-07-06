<?php


if (str_contains($_GET["route"], "credit")) {

    require_once(dirname(__FILE__) . "/../class/Credit.php");

    $option = explode("_", $_GET["route"], 2);

    try {

        $credit = new Credit();

        switch ($option[1]) {
            case 'save':
                $credit->save();
                break;

            case 'get_all':
                $credit->get_all();
                break;

            case "get_from_month":
                $credit->get_from_month();
                break;

            default:
                # code...
                break;
        };
    } catch (Throwable $th) {
        $message = Message::errorServer("A ocurrido un error: conciliación");
        Response::code_500($message);
        exit();
    }
}
