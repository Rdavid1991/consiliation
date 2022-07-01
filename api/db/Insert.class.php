<?php

require_once(dirname(__FILE__) . "/management.php");

class Insert extends ManagementDB
{

    protected $_table;
    protected $_columns;
    protected $_values;
    protected $_insert = "INSERT INTO [dbo].[__table__](__columns__)VALUES(__values__)";

    function __construct()
    {
        parent::__construct();
    }

    function __destruct()
    {
        parent::__destruct();
    }

    public function into_table(string $table)
    {
        $this->_table = $table;
    }

    public function in_columns(array $columns)
    {
        $this->_columns = $columns;
    }

    public function values(array $values)
    {
        $this->_values = $values;
    }

    public function go()
    {

        $array_values_symbol = array_pad([], sizeof($this->_values), "?");
        $array_values = $this->_values;

        $str_table = $this->_table;
        $str_columns = "[" . join("],[", $this->_columns) . "]";
        $str_values_symbol = join(",", $array_values_symbol);


        $sql = str_replace(
            [
                "__table__",
                "__columns__",
                "__values__",
            ],
            [
                $str_table,
                $str_columns,
                $str_values_symbol
            ],
            $this->_insert
        );

        parent::insert_query($sql, $array_values);
    }
}