<?php

require_once(dirname(__FILE__) . "/../db/Select.class.php");
require_once(dirname(__FILE__) . "/../db/Insert.class.php");
require_once(dirname(__FILE__) . "/../db/Update.class.php");

class Credit
{

    private $_main_table = "conciliation_credits";
    private $_secondary_table = "conciliation_credits_totals";


    protected function calculate()
    {
        $select = new Select();

        $select->from_table($this->_secondary_table);
        $select->where("WHERE [month]=?");
        $select->params([$_POST["month"]]);
        $result = $select->go();

        $columns = [
            "amount",
            "month",
            "remaining"
        ];

        if (sizeof($result["data"]) > 0) {

            $previousRemaining = floatval($result["data"][0]->remaining);
            $previousAmount = floatval($result["data"][0]->amount);
            $newAmount = floatval($_POST["credit"]);


            $totalAmount = $previousAmount + $newAmount;
            $totalRemaining = $previousRemaining + $newAmount;

            $params = [
                $totalAmount,
                $result["data"][0]->month,
                $totalRemaining 
            ];

            $update = new Update();
            $update->table($this->_secondary_table);
            $update->columns($columns);
            $update->params($params);
            $update->where("WHERE [$columns[1]]= '" . $result["data"][0]->month . "'");
            return $update->go();
        } else {

            $values = [
                $_POST["credit"],
                $_POST["month"],
                $_POST["credit"]
            ];

            $insert = new Insert();
            $insert->into_table($this->_secondary_table);
            $insert->in_columns($columns);
            $insert->values($values);
            return $insert->go();
        }
    }

    public function save()
    {

        $insert = new Insert();
        $insert->into_table($this->_main_table);
        $insert->in_columns(array_keys($_POST));
        $insert->values(array_values($_POST));
        $result = $insert->go();

        if ($result["isSuccess"]) {

            $result = $this->calculate();

            if ($result["isSuccess"]) {
                $message = Message::successServer("Crédito agregado correctamente");
                Response::code_201($message);
                exit();
            }
        }
        $message = Message::errorServer($result["error"]);
        Response::code_500($message);
        exit();
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

    public function get_from_month(){
        $select = new Select();

        $select->from_table($this->_secondary_table);
        $select->where("WHERE [month]=?");
        $select->params([$_GET["month"]]);
        $result = $select->go();

        exit(json_encode($result));
    }
}
