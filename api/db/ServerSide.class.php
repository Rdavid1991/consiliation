<?php
class ServerSide
{
    function paging($start, $length)
    {
        $limit = "";
        if (isset($_GET["start"]) && $_GET["length"] != '-1') {
            $limit = "OFFSET " . intval($_GET["start"]) . " ROWS FETCH NEXT " . intval($_GET["length"]) . " ROWS ONLY";
        }

        return $limit;
    }

    function ordering($order, $columns, $aColumns)
    {

        $sOrder = "";
        if (isset($order)) {
            $sOrder = "ORDER BY  ";
            for ($i = 0; $i < sizeof($order); $i++) {
                if ($columns[$i]->{"orderable"} == "true") {
                    $sOrder .=  $aColumns[intval($order[$i]->{"column"})] . " " . ($order[$i]->{"dir"} === 'asc' ? 'asc' : 'desc') . ", ";
                }
            }

            $sOrder = substr_replace($sOrder, "", -2);
            if ($sOrder == "ORDER BY") {
                $sOrder = "";
            }
        }

        return $sOrder;
    }

    function filtering(object $search, array $aColumns)
    {
        $sWhere = "";
        if (isset($search) && $search->value != "") {
            $sWhere = "WHERE (";
            for ($i = 0; $i < count($aColumns); $i++) {
                $sWhere .= "[" . $aColumns[$i] . "]" . " LIKE '%" . $search->value . "%' OR ";
            }
            $sWhere = substr_replace($sWhere, "", -3);
            $sWhere .= ')';
        }

        /* Individual column filtering */
        // for ($i = 0; $i < count($aColumns); $i++) {
        //     if (isset($_GET["columns"][$i]["searchable"]) && $_GET["columns"][$i]["searchable"] == "true" && $_GET["columns"][$i]["search"]["value"] != '') {
        //         if ($sWhere == "") {
        //             $sWhere = "WHERE ";
        //         } else {
        //             $sWhere .= " AND ";
        //         }
        //         $sWhere .= "`" . $aColumns[$i] . "` LIKE '%" . $_GET["columns"][$i]["search"]["value"] . "%' ";
        //     }
        // }

        return $sWhere;
    }

    // function special_filtering_offer(string &$sWhere){

    //     $sWhere    = "WHERE (";
    //     $county    = isset($_GET["county"])    ?$_GET["county"]     :[];
    //     $province  = isset($_GET["province"])  ?$_GET["province"]   :[];
    //     $offerType = isset($_GET["offerType"]) ?$_GET["offerType"]  :"";
    //     $offerName = isset($_GET["offerName"]) ?$_GET["offerName"]  :"";


    //     foreach ($county as $key => $value) {
    //         $sWhere .= " json LIKE '%\"".explode(':', $value)[0]."\"%' OR";
    //     }

    //     $sWhere = preg_replace('/OR$/',')AND(',$sWhere);

    //     foreach ($province as $key => $value) {
    //         $sWhere .= " json LIKE '%\"".explode(':', $value)[0]."\"%' OR";
    //     }

    //     $sWhere = preg_replace('/OR$/',')AND(',$sWhere);

    //     $sWhere.= strlen($offerType) > 0 ? "offer_type_id ='".$offerType."') AND " : "";

    //     $sWhere.= strlen($offerName) > 0 ? "offer_name ='".$offerName."') AND " : "";

    //     $sWhere = substr_replace($sWhere, "", -4);

    //     $sWhere = strlen($sWhere) > 6? $sWhere : "";
    // }
}
