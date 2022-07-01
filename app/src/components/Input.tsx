import React, { ChangeEvent } from "react";

interface Props {
    disabled?: boolean;
    id: string;
    label: string;
    onChange?: ( e: ChangeEvent<HTMLInputElement> ) => void;
    pattern?: string;
    placeholder?: string;
    title?: string;
    type: React.HTMLInputTypeAttribute;
    value: string;
}


export const Input = ( props: Props ) => {

    const {
        disabled,
        id,
        label,
        onChange,
        pattern,
        placeholder,
        title,
        type,
        value,
    } = props;


    return (
        <div className="mb-3">
            <label
                className="form-label"
                htmlFor={id}
            >
                {label}
            </label>
            <input
                {...{ disabled, id, onChange, pattern, placeholder, title, type, value }}
                className="form-control form-control-sm"
            />
        </div>
    );
};
