import React, { useEffect, useState } from "react";
import { Table } from "../components/Table";
import { conciliationTable } from "../utils/conciliationTable";
import { ModalAddConciliation } from "../components/ModalAddConciliation";
import { modalShow } from "../utils/ModalActions";
import { SideBarAction } from "../utils/SideBarAction";
import { ModalAddCredit } from "../components/ModalAddCredit";
import { fetch_GET } from "../utils/requests";
import { apiUrl, creditEndPoint } from "../config";
import { moneyFormat } from "../utils/helpers";


const tableId = "conciliation_table";

export const Home = () => {
    const [table, setTable] = useState<DataTables.DataTables>();
    const [credit, setCredit] = useState({
        amount    : "0",
        remaining : "0"
    });

    useEffect(() => {
        const tableRender: DataTables.Api = conciliationTable( `#${tableId}` );
        tableRender.column( 0 ).search( "7" ).draw();
        setTable( table );
        getCreditFromMonth();
    }, []);


    const openSideBar = async () => {
        modalShow( "#addConciliation" );
    };

    const getCreditFromMonth = async () => {

        const route = creditEndPoint.getFromMonth.split( "=" );

        const response = await fetch_GET( `${apiUrl}`, { month: 7, [route[0]]: route[1] });
        setCredit({
            amount    : moneyFormat( response.data[0].amount ),
            remaining : moneyFormat( response.data[0].remaining )
        });
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
            <h3>Crédito <span>{ credit.amount }</span></h3>
            <h3>Saldo <span>{ credit.remaining }</span></h3>

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
