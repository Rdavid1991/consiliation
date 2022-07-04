<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

if (isset($_GET["route"])) {
    require_once(dirname(__FILE__) . "/routes/index.php");
}

// require_once(dirname(__FILE__) . "/db/management.php");
// require_once(dirname(__FILE__) . "/db/Select.class.php");
// require_once(dirname(__FILE__) . "/db/Insert.class.php");
// require_once(dirname(__FILE__) . "/db/ServerSide.class.php");

// class Addressee extends ManagementDB
// {
//     function __construct()
//     {
//         parent::__construct();
//     }

//     function __destruct()
//     {
//         parent::__destruct();
//     }

//     public function save_addressee()
//     {
//         $insert = new Insert();
//         $insert->into_table("conciliations");
//         $insert->in_columns(array_keys($_POST));
//         $insert->values(array_values($_POST));
//         $insert->go();
//     }

//     public function select_conciliation()
//     {

//         $serverside = new ServerSide($_GET);

//         $sLimit   = $serverside->paging();
//         $sOrder   = $serverside->ordering();
//         $sWhere   = $serverside->filtering();
//         $aColumns = $serverside->get_columns_name();
    
//         $select = new Select();

//         $select->from_table("conciliations");
//         $select->columns($aColumns);
//         $select->where($sWhere);
//         $select->order_by($sOrder);
//         $select->limit($sLimit);
//         $result = $select->go();
//         $total  = $select->count();

//         $serverside->dispatch($result["data"], $total["data"][0]->total);

//     }
// }

// $add = new Addressee();


// //$add->save_addressee();
// $add->select_conciliation();
