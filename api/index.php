<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

if (isset($_GET["route"])) {
    require_once(dirname(__FILE__) . "/routes/index.php");
}


