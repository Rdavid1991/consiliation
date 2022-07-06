import { Input } from "./Input";
import { useForm } from "../hooks/useForm";
import { humanizeDate } from "../utils/formatDate";
import { fetch_POST } from "../utils/requests";
import { apiUrl, conciliationEndPoints } from "../config";
import { FormEvent, ChangeEvent } from "react";
import { moneyUnformat, moneyFormat } from "../utils/helpers";

type StateAddConciliation = {
    date: string;
    debit_bnp: string;
    debit_mides: string;
    description: string;
    reference: string;
}

export const ModalAddConciliation = () => {

    const { values, handleInputChange, setValues } = useForm<StateAddConciliation>({
        date        : new Date().toISOString(),
        debit_bnp   : "",
        debit_mides : "",
        description : "",
        reference   : "",
    });

    const saveConciliation = ( e: FormEvent<HTMLFormElement> ) => {
        e.preventDefault();

        const url = `${apiUrl}?${conciliationEndPoints.save}`;
        fetch_POST( url, values );
    };

    const handleInputChangeSpecial = ({ target }: ChangeEvent<HTMLInputElement> ) => {
        setValues({
            ...values,
            [target.name || target.id]: moneyUnformat( target.value )
        });
    };

    return (
        <div className="modal fade" id="addConciliation">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Nueva conciliación</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <form
                        onSubmit={saveConciliation}
                    >
                        <div className="modal-body">
                            <Input
                                disabled={true}
                                id="date"
                                label="Fecha"
                                type="text"
                                value={humanizeDate( values.date )}
                            />
                            <Input
                                id="reference"
                                label="Referencia"
                                onChange={handleInputChange}
                                type="text"
                                value={values.reference}
                                required={true}
                            />
                            <Input
                                id="description"
                                label="Descripción"
                                onChange={handleInputChange}
                                type="text"
                                value={values.description}
                                required={true}
                            />
                            <Input
                                id="debit_mides"
                                label="Débito MIDES"
                                onChange={handleInputChangeSpecial}
                                placeholder="0.00"
                                title="Solo números"
                                type="text"
                                value={moneyFormat( values.debit_mides )}
                                required={true}
                            />
                            <Input
                                id="debit_bnp"
                                label="Débito BNP"
                                onChange={handleInputChangeSpecial}
                                placeholder="0.00"
                                title="Solo números"
                                type="text"
                                value={moneyFormat( values.debit_bnp )}
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
