import React from "react";
import { useForm } from "../hooks/useForm";
import { humanizeDate } from "../utils/formatDate";
import { getMonthsList } from "../utils/helpers";
import { Input } from "./Input";
import { Select } from "./Select";

type StateAddConciliation = {
    date: string;
    credit: string;
    
}


export const ModalAddCredit = () => {

    const { values, handleInputChange } = useForm<StateAddConciliation>({
        credit : "",
        date   : new Date().toISOString(),
    });

    async function saveCredit(  ) {
        console.log();
        
    }

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
                                id="date"
                                label="Fecha"
                                type="text"
                                value={humanizeDate( values.date )}
                            />

                            <Select
                                id="date"
                                label="Fecha"
                                options={getMonthsList()}
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
