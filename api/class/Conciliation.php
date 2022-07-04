<?php

require_once(dirname(__FILE__) . "/../db/Select.class.php");
require_once(dirname(__FILE__) . "/../utils/Message.php");
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
        }
    }

    public function get_all()
    {
        $serverside = new ServerSide($_GET);

        $sLimit   = $serverside->paging();
        $sOrder   = $serverside->ordering();
        $sWhere   = $serverside->filtering();
        $aColumns = $serverside->get_columns_name();

        $select = new Select();

        $select->from_table($this->_main_table);
        $select->columns($aColumns);
        $select->where($sWhere);
        $select->order_by($sOrder);
        $select->limit($sLimit);
        $result = $select->go();
        $total  = $select->count();

        $dispatch = $serverside->dispatch($result["data"], $total["data"][0]->total);

        exit($dispatch);
    }
}
