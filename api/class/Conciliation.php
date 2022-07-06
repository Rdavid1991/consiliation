<?php

require_once(dirname(__FILE__) . "/../db/Select.class.php");
require_once(dirname(__FILE__) . "/../db/Insert.class.php");  
require_once(dirname(__FILE__) . "/../db/Update.class.php");  
require_once(dirname(__FILE__) . "/../db/ServerSide.class.php");

class Conciliation
{

    private $_main_table = "conciliations";
    private $_credit_totals_table = "conciliation_credits_totals";

    public function save()
    {

        $date = new DateTime($_POST["date"]);

        $month = floatval($date->format("m"));

        $select = new Select();
        $select->from_table($this->_credit_totals_table);
        $select->where("WHERE [month]=?");
        $select->params([$month]);
        $result = $select->go();

        $columns = array_keys($_POST);
        $values = array_values($_POST);

        $remaining = floatval($result["data"][0]->remaining);

        $debit = floatval($_POST["debit_mides"]) + floatval($_POST["debit_bnp"]);
        $balance = $remaining - $debit ;

        array_push($columns, ...["balance", "credit"]);
        array_push($values, ...[$balance, $remaining]);

        $update = new Update();
        $update->table($this->_credit_totals_table);
        $update->columns(["remaining"]);
        $update->where("WHERE [month]=?");
        $update->params([$balance, $month ]);
        $update->go();

        $insert = new Insert();
        $insert->into_table($this->_main_table);
        $insert->in_columns($columns);
        $insert->values($values);
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
            "MONTH([$aColumns[0]]) = '" . $month . "'"
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
