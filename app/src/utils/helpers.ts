import { Month } from "../interface";


export const getMonthsList = () => { 
    
    const date = new Date();
    const months : Array<Month> = [];

    for ( let i = 0; i < 12; i++ ) {
    
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

export const moneyFormat = ( nNumber : number  ) => { 
    const sNumber = String( nNumber );

    const sDecimal = sNumber.replace( /(\d+)(?=(\d{2}))/g, "$1." );
    const scolon = sDecimal.replace( /(\d)(?=(\d{3})+\.)/g, "$1," );
    
    return scolon;

};