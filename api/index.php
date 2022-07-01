<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

require_once(dirname(__FILE__) . "/db/management.php");
require_once(dirname(__FILE__) . "/db/Select.class.php");
require_once(dirname(__FILE__) . "/db/ServerSide.class.php");

class Addressee extends ManagementDB
{
    function __construct()
    {
        parent::__construct();
    }

    function __destruct()
    {
        parent::__destruct();
    }

    public function save_addressee()
    {
        $insert = new Insert();
        $insert->into_table("conciliations");
        $insert->in_columns(array_keys($_POST));
        $insert->values(array_values($_POST));
        $insert->go();
    }

    public function select_conciliation()
    {

        $aColumns = array();

        $columns = json_decode($_GET["columns"]);
        $draw = json_decode($_GET["draw"]);
        $order = json_decode($_GET["order"]);
        $start = json_decode($_GET["start"]);
        $start = json_decode($_GET["length"]);
        $length = json_decode($_GET["length"]);
        $search = json_decode($_GET["search"]);
        
        foreach ($columns as $key => $value) {
            array_push($aColumns, $value->data);
        }
        
        


        $serverside = new ServerSide();

        $sLimit = $serverside->paging($start, $length);
        $sOrder = $serverside->ordering($order, $columns, $aColumns);
        $sWhere  = $serverside->filtering($search, $aColumns);
    

        $select = new Select();

        $select->from_table("conciliations");
        $select->columns($aColumns);
        $select->where($sWhere);
        $select->order_by($sOrder);
        $select->limit($sLimit);
        $result = $select->go();
        $total = $select->count();

        $output = array(
            "draw" => $draw,
            "recordsTotal" => $total["data"][0]->total,
            "recordsFiltered" => sizeof($result["data"], COUNT_NORMAL),
            "data" => $result["data"]
        );

        echo json_encode($output);
    }
}

$add = new Addressee();
$add->select_conciliation();
