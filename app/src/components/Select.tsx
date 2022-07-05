import React, { ChangeEvent, ReactNode } from "react";

interface Props {
    disabled?: boolean;
    id: string;
    label: string;
    onChange?: ( e: ChangeEvent<HTMLSelectElement> ) => void;
    placeholder?: string;
    title?: string;
    value?: string;
    required?: boolean;
    children : ReactNode
}

type PropsSelect = Omit<Props, "label" | "options">;
type LabelProps = Pick<Props, "id" | "label">;

export const Select = ( props: Props ) => {

    const selectProps: PropsSelect = props;
    const labelProps: LabelProps = props;

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
                {props.children}
            </select>
        </div>
    );
};

interface PropsOptions {
    text: string;
    value : string;
}

export const Options = ( props: PropsOptions ) => { 
    return <option value={props.value}>{props.text}</option>;
};


