import React, { useEffect, useState } from "react";
import { Table } from "../components/Table";
import { conciliationTable } from "../utils/conciliationTable";
import { ModalAddConciliation } from "../components/ModalAddConciliation";
import { modalShow } from "../utils/ModalActions";
import { SideBarAction } from "../utils/SideBarAction";
import { ModalAddCredit } from "../components/ModalAddCredit";
import { fetch_GET } from "../utils/requests";
import { apiUrl, creditEndPoint } from "../config";
import { getMonthsList, moneyFormat } from "../utils/helpers";
import { Options, Select } from "../components/Select";


const tableId = "conciliation_table";

export const Home = () => {
    const [ table, setTable ] = useState<DataTables.Api>();
    const [ viewMonth, setViewMonth] = useState<string>( String( new Date().getMonth() + 1 ));
    const [ credit, setCredit ] = useState({
        amount    : "0",
        remaining : "0"
    });

    useEffect(() => {
        const tableRender: DataTables.Api = conciliationTable( `#${tableId}` );
        tableRender.column( 0 ).search( viewMonth ).draw();
        setTable( tableRender );
        getCreditFromMonth();
    }, []);

    useEffect(() => {
        table?.column( 0 ).search( viewMonth ).draw();
        getCreditFromMonth();
    }, [viewMonth]);
    


    const openSideBar = async () => {
        modalShow( "#addConciliation" );
    };

    const getCreditFromMonth = async () => {

        const route = creditEndPoint.getFromMonth.split( "=" );

        const response = await fetch_GET( `${apiUrl}`, { month: viewMonth, [route[0]]: route[1] });

        if ( response.data.length > 0 ) {
            setCredit({
                amount    : moneyFormat( response.data[0].amount ),
                remaining : moneyFormat( response.data[0].remaining )
            });
        }else {
            setCredit({
                amount    : "0",
                remaining : "0",
            });
        }
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

            <Select
                id="month"
                label="Mes"
                value={ viewMonth }
                onChange={( e )=> setViewMonth( e.target.value )}
            >
                {
                    getMonthsList().map(( month, index ) => (
                        <Options
                            value={String( month.number )}
                            key={index}
                            text={month.name}
                        />
                    ))
                }
            </Select>

            <ModalAddConciliation />
            <ModalAddCredit />

            <h3>{ }</h3>
            <button onClick={() => modalShow( "#addCredit" )}>Agregar crédito</button>
            <h3>Crédito <span>{credit.amount}</span></h3>
            <h3>Saldo <span>{credit.remaining}</span></h3>

            <Table
                id={tableId}
                columns={[
                    "Fecha",
                    "Referencia",
                    "Descripción",
                    "Credito",
                    "Débito MIDES",
                    "Débito BNP",
                    "Balance"
                ]}
            />
        </React.Fragment>
    );
};
