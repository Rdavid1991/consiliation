<?php

require_once(dirname(__FILE__) . "/../db/Select.class.php");
require_once(dirname(__FILE__) . "/../db/Insert.class.php");
require_once(dirname(__FILE__) . "/../db/ServerSide.class.php");

class Conciliation
{

    private $_main_table = "conciliations";

    public function save()
    {
        $insert = new Insert();
        $insert->into_table($this->_main_table);
        $insert->in_columns(array_keys($_POST));
        $insert->values(array_values($_POST));
        $result = $insert->go();

        if ($result["isSuccess"]) {
            $message = Message::successServer("Conciliación creada correctamente");
            Response::code_201($message);
            exit();
        } else {
            $message = Message::errorServer($result["error"]);
            Response::code_500($message);
            exit();
        }
    }

    public function get_all()
    {
        $constant_filtering = [];
        $serverside = new ServerSide($_GET);

        $aColumns = $serverside->get_columns_name();
        $aOptions_columns = $serverside->get_columns_options();

        $month =  ($aOptions_columns[0]["search"]["value"] === "") ? '0' : $aOptions_columns[0]["search"]["value"];

        $constant_filtering = [
            "MONTH([$aColumns[0]]) = '" . $month ."'"
        ];

        $sLimit   = $serverside->paging();
        $sOrder   = $serverside->ordering();
        $sWhere   = $serverside->filtering();
        $sWhere   = $serverside->constant_filtering($sWhere, $constant_filtering);

        $select = new Select();

        $select->from_table($this->_main_table);
        $select->columns($aColumns);
        $select->where($sWhere);
        $select->order_by($sOrder);
        $select->limit($sLimit);
        $result = $select->go();
        $total  = $select->count($constant_filtering);

        $dispatch = $serverside->dispatch($result["data"], $total["data"][0]->total);

        exit($dispatch);
    }
}
