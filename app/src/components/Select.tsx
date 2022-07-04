import React, { ChangeEvent } from "react";

interface Props {
    disabled?: boolean;
    id: string;
    label: string;
    onChange?: ( e: ChangeEvent<HTMLSelectElement> ) => void;
    placeholder?: string;
    title?: string;
    value?: string;
    required?: boolean;
    options?: Array<unknown>
}

type PropsSelect = Omit<Props, "label" | "options">;
type LabelProps = Pick<Props, "id" | "label">;
type SelectOptions = Pick<Props, "options">

export const Select = ( props: Props ) => {

    const selectProps: PropsSelect = props;
    const labelProps: LabelProps = props;

    const select: SelectOptions = props;

    return (
        <div className="mb-3">
            <label
                className="form-label"
                htmlFor={labelProps.id}
            >
                {labelProps.label}
            </label>
            <select
                {...{ ...selectProps }}
                className="form-select-sm form-select"
            >
                {
                    select.options?.map(( option ) => {
                        return <>{option}</>;
                    })
                }
            </select>
        </div>
    );
};
