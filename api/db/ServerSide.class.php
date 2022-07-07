<?php
class ServerSide
{

    protected $_columns;
    protected $_draw;
    protected $_order;
    protected $_start;
    protected $_length = '-1';
    protected $_search = "";
    protected $_aColumns = array();

    function __construct(array $request)
    {

        $this->_columns =  (array) (is_string($request["columns"]) ? json_decode($request["columns"], true) : $request["columns"]);
        $this->_search  =  (array) (is_string($request["search"])  ? json_decode($request["search"], true)  : $request["search"]);
        $this->_order   =  (array) (is_string($request["order"])   ? json_decode($request["order"], true)   : $request["order"]);
        $this->_draw    = intval($request["draw"]);
        $this->_start   = intval($request["start"]);
        $this->_length  = intval($request["length"]);

        $this->_aColumns  = array_column($this->_columns, "data");
    }

    public function get_columns_name()
    {
        return $this->_aColumns;
    }

    public function get_columns_options()
    {
        return $this->_columns;
    }

    public function get_draw()
    {
        return $this->_draw;
    }

    function paging()
    {
        $limit = "OFFSET __start__ ROWS FETCH NEXT __length__ ROWS ONLY";

        return ($this->_length != '-1')
            ? str_replace(
                [
                    "__start__",
                    "__length__"
                ],
                [
                    intval($this->_start),
                    intval($this->_length)
                ],
                $limit
            )
            : "";
    }

    function ordering()
    {

        $sOrder = "";
        $aOrder = array();
        $sColumn_order = "__column__ __order__";

        $sOrder = "ORDER BY __column_order__";
        for ($i = 0; $i < sizeof($this->_order); $i++) {
            if ($this->_columns[$i]["orderable"]) {

                $sColumn_order = str_replace(
                    [
                        "__column__",
                        "__order__"
                    ],
                    [
                        $this->_aColumns[$this->_order[$i]["column"]],
                        strtoupper($this->_order[$i]["dir"])
                    ],
                    $sColumn_order
                );

                array_push($aOrder, $sColumn_order);
            }
        }
        $sOrder = str_replace("__column_order__", join(",", $aOrder), $sOrder);

        $aOrderable = array_column($this->_columns, "orderable");
        if (!in_array(true, $aOrderable, true)) {
            $sOrder = "";
        }

        return $sOrder;
    }

    /**
     * Agregar filtro especial a columnas, la columna a filtrar debe tener el valor "sercheable=false" para que el filtro no falle
     * @param array $conditions ["column=value"]
     * @param string $sWhere  "WHERE ..." || ""
     */
    function constant_filtering(string $sWhere, array $conditions)
    {
        if ($sWhere === "") {
            $sWhere = "WHERE (__condition__) ";
        } else {
            $sWhere .= " AND (__condition__)";
        }
        return str_replace("__condition__", join(" AND ", $conditions), $sWhere);
    }

    function filtering()
    {
        $sWhere = "";
        if ($this->_search["value"] != "") {
            $sWhere = "WHERE (__condition__)";
            $sCondition = "[__columns__] LIKE '%__value__%'";
            $aCondition = array();
            for ($i = 0; $i < count($this->_aColumns); $i++) {

                $condition = str_replace(
                    [
                        "__columns__",
                        "__value__"
                    ],
                    [
                        $this->_aColumns[$i],
                        $this->_search["value"]
                    ],
                    $sCondition
                );
                array_push($aCondition, $condition);
            }

            $sWhere = str_replace("__condition__", join(" OR ", $aCondition), $sWhere);
        }

        /* Individual column filtering */
        $aColumn_search = array_column(array_column($this->_columns, "search"), "value");
        $aSearch = preg_grep('/\w{1,}/', $aColumn_search);
        if (sizeof($aSearch) > 0) {

            $sCondition = "[__columns__] LIKE '%__value__%'";
            $aCondition = array();

            for ($i = 0; $i < count($this->_aColumns); $i++) {
                if ($this->_columns[$i]["searchable"] && $this->_columns[$i]["search"]["value"] != '') {

                    $condition = str_replace(
                        [
                            "__columns__",
                            "__value__"
                        ],
                        [
                            $this->_aColumns[$i],
                            $this->_columns[$i]["search"]["value"]
                        ],
                        $sCondition
                    );
                    array_push($aCondition, $condition);
                }
            }

            if ($sWhere === "") {
                $sWhere = "WHERE (__condition__)";
                $sWhere = str_replace("__condition__", join(" AND ", $aCondition), $sWhere);
            } else {
                $sWhere .= " AND (" . join(" AND ", $aCondition) . ")";
            }
        }

        return $sWhere === "WHERE ()" ? "" : $sWhere ;
    }

    public function dispatch(array $data, int $data_total_count)
    {
        $output = array(
            "draw" => intval($this->_draw),
            "recordsTotal" => $data_total_count,
            "recordsFiltered" => strlen($this->_search["value"]) > 0 ? sizeof($data, COUNT_NORMAL) : $data_total_count,
            "data" => $data
        );

        return json_encode($output);
    }
}
