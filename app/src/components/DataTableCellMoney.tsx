import React from "react";

const DataTableCellMoney = ({value} : {["value"] : string}) => {
    return (
        <div className={value!=="0.00"? "fw-bold" : ""}>
            <span>B/.</span>
            {value}
        </div>
    );
};

export default React.memo( DataTableCellMoney );