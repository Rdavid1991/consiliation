import React, { useEffect, useRef } from "react";
import { Table } from "../components/Table";
import { conciliationTable } from "../utils/conciliationTable";
import { ModalAddConciliation } from "../components/ModalAddConciliation";
import { modalShow } from "../utils/ModalActions";


const tableId = "conciliation_table";

export const Home = () => {


    useEffect(() => {
        conciliationTable( `#${tableId}` );
    }, []);

    
    const openSideBar = async () => {
        modalShow( "#addConciliation" );
    };

    return (
        <React.Fragment>
            <button
                onClick={openSideBar}
            >Abrir</button>
            <ModalAddConciliation />

            <Table
                id={tableId}
                columns={[
                    "Fecha",
                    "Referencia",
                    "Descripción",
                    "Débito MIDES",
                    "Débito BNP"
                ]}
            />
        </React.Fragment>
    );
};
