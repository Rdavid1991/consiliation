import React, { useEffect, useRef } from "react";
import { Table } from "../components/Table";
import { conciliationTable } from "../utils/conciliationTable";
import { ModalAddConciliation } from "../components/ModalAddConciliation";
import { modalShow } from "../utils/ModalActions";
import { SideBarAction } from "../utils/SideBarAction";
import { humanizeDate } from "../utils/formatDate";
import { ModalAddCredit } from "../components/ModalAddCredit";


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
                onClick={() => SideBarAction()}
            >
                sidebar
            </button>
            <button
                onClick={openSideBar}
            >Abrir</button>
            <ModalAddConciliation />
            <ModalAddCredit />

            <h3>{ }</h3>
            <button onClick={() => modalShow( "#addCredit" )}>Agregar crédito</button>
            <h3>Crédito <span>{ }</span></h3>
            <h3>Saldo <span>{ }</span></h3>

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
