<?php

require_once(dirname(__FILE__) . "/management.php");

class Update extends ManagementDB
{

    protected $_params = [];
    protected $_table;
    protected $_columns = "*";
    protected $_values;
    protected $_where = "";
    protected $_insert = "UPDATE [dbo].[__table__] SET __columns__ __where__;";

    function __construct()
    {
        parent::__construct();
    }

    function __destruct()
    {
        parent::__destruct();
    }

    protected function clear_attr()
    {
        $this->_where = "";
    }

    public function table(string $table)
    {
        $this->_table = $table;
    }

    public function columns(array $columns)
    {
        $this->_columns = $columns;
    }

    public function go()
    {

        $str_table = $this->_table;
        $str_where = $this->_where;

        $str_columns = is_string($this->_columns)
            ? $this->_columns
            : "[" . join("]=?,[", $this->_columns) . "]=?";

        $sql = str_replace(
            [
                "__table__",
                "__columns__",
                "__where__",
            ],
            [
                $str_table,
                $str_columns,
                $str_where,
            ],
            $this->_insert
        );

        $this->clear_attr();

        return parent::insert_query($sql, $this->_params);
    }

    public function where(string $where_query)
    {
        $this->_where = $where_query;
    }

    public function params(array $params)
    {
        $this->_params = $params;
    }
}
