import { Month } from "../interface";


export const getMonthsList = () => { 
    
    const date = new Date();
    const months : Array<Month> = [];

    for ( let i = 0; i < 11; i++ ) {
    
        date.setMonth( i );

        months?.push({
            name: date.toLocaleDateString([], {
                month: "long"
            }),
            number: i,
        });
    }

    return months;

};