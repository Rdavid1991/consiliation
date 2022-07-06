<?php

require_once(dirname(__FILE__) . "/management.php");

class Select extends ManagementDB
{

    protected $_params=[];
    protected $_table;
    protected $_columns = "*";
    protected $_values;
    protected $_order_by = "";
    protected $_limit = "";
    protected $_where = "";
    protected $_insert = "SELECT __columns__ FROM [dbo].[__table__] __where__ __order__ __limit__;";

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
        $this->_order_by = "";
        $this->_limit = "";
        $this->_where = "";
    }

    public function from_table(string $table)
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
        $str_order = $this->_order_by;
        $str_limit = $this->_limit;
        $str_columns = is_string($this->_columns)
            ? $this->_columns
            : "[" . join("],[", $this->_columns) . "]";

        $sql = str_replace(
            [
                "__table__",
                "__columns__",
                "__where__",
                "__order__",
                "__limit__"
            ],
            [
                $str_table,
                $str_columns,
                $str_where,
                $str_order,
                $str_limit
            ],
            $this->_insert
        );

        $this->clear_attr();

        return parent::select_query($sql, $this->_params);
    }

    public function count()
    {

        $str_table = $this->_table;
        $str_where = $this->_where;
        $str_order = $this->_order_by;
        $str_limit = $this->_limit;
        $sql = str_replace(
            [
                "__table__",
                "__columns__",
                "__where__",
                "__order__",
                "__limit__"
            ],
            [
                $str_table,
                "COUNT(*) AS total",
                $str_where,
                $str_order,
                $str_limit
            ],
            $this->_insert
        );

        return parent::select_query($sql);
    }

    /**
     * @param string $order_query Query off order 
     * @example $order_query "ORDER BY <COLUMN> ASC | DES"
     */
    public function order_by(string $order_query)
    {
        $this->_order_by = $order_query;
    }

    /**
     * @param string $order_query Query off order 
     * @example $order_query "ORDER BY <COLUMN> ASC | DES"
     */
    public function limit(string $limit_query)
    {
        $this->_limit = $limit_query;
    }

    public function where(string $where_query)
    {
        $this->_where = $where_query;
    }

    public function params(array $params){
        $this->_params = $params;
    }
}
