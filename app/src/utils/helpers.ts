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

export const moneyUnformat = ( number: string ) => { 
    const unformated = number.match( /\d+/g )?.join( "" );
    return unformated?.toString(); 
};

export const moneyFormat = ( nNumber : string  ) => { 

    const sDecimal = nNumber.replace( /(\d+)(?=(\d{2}))/g, "$1." );
    const scolon = sDecimal.replace( /(\d)(?=(\d{3})+\.)/g, "$1," );
    
    return scolon.toString();

};