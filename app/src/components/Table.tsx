import React from 'react';



interface Props {
    columns: Array<string>
    id: string;
}


export const Table = (props: Props) => {

    const { columns, id } = props;

    return (
        <table {...{ id }}>
            <thead>
                <tr>
                    {columns.map((name, index) => (
                        <th key={index}>{name}</th>
                    ))}
                </tr>
            </thead>
        </table>
    );
};
