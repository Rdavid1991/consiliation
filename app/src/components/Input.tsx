import React, { ChangeEvent } from "react";

interface Props {
    disabled?: boolean;
    id: string;
    label: string;
    onChange?: ( e: ChangeEvent<HTMLInputElement> ) => void;
    onBlur?: ()=> void;
    onFocus?: ()=> void;
    pattern?: string;
    placeholder?: string;
    title?: string;
    type: React.HTMLInputTypeAttribute;
    value: string;
    required ?: boolean
}

type PropsInput = Omit<Props, "label">;
type LabelProps = Pick<Props, "id" | "label">;

export const Input = ( props: Props ) => {

    const inputProps: PropsInput = props;
    const labelProps: LabelProps = props;

    return (
        <div className="mb-3">
            <label
                className="form-label"
                htmlFor={labelProps.id}
            >
                {labelProps.label}
            </label>
            <input
                {...{ ...inputProps }}
                className="form-control form-control-sm"
            />
        </div>
    );
};
