import React, { ChangeEventHandler, FormEvent, useState } from "react";
import { useForm } from "../hooks/useForm";
import { humanizeDate } from "../utils/formatDate";
import { getMonthsList, moneyFormat, moneyUnformat } from "../utils/helpers";
import { Input } from "./Input";
import { Options, Select } from "./Select";
import { ChangeEvent } from "react";
import { fetch_POST } from "../utils/requests";
import { apiUrl, creditEndPoint } from "../config";
import { StateAddConciliation } from "../interface";

export const ModalAddCredit = () => {

    const { values, handleInputChange, setValues, reset } = useForm<StateAddConciliation>({
        added_by : "",
        added_in : new Date().toISOString(),
        credit   : "",
        month    : new Date().getMonth().toString(),
    });

    async function saveCredit( e: FormEvent<HTMLFormElement> ) {
        e.preventDefault();

        const url = `${apiUrl}?${creditEndPoint.save}`;
        await fetch_POST( url, values );

        reset();
    }

    const onSpecialChange = ( e: ChangeEvent<HTMLInputElement> ) => {
        setValues({
            ...values,
            credit: moneyUnformat( e.target.value ) as string
        });
    };

    console.log( values );

    return (
        <div className="modal fade" id="addCredit">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Nueva conciliación</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <form
                        onSubmit={saveCredit}
                    >
                        <div className="modal-body">
                            <Input
                                disabled={true}
                                id="added_in"
                                label="Fecha"
                                type="text"
                                value={humanizeDate( values.added_in )}
                            />

                            <Select
                                id="month"
                                label="Mes"
                                value={values.month}
                                onChange={handleInputChange}
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


                            <Input
                                onChange={onSpecialChange}
                                id="credit"
                                label="Monto"
                                type="text"
                                placeholder="0.00"
                                value={moneyFormat( values.credit )}
                                required={true}
                            />


                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                            <button type="submit" className="btn btn-primary">Guardar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
