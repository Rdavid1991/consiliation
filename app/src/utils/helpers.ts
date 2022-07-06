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
            number: i+1,
        });
    }

    return months;

};

export const moneyUnformat = ( number: string ) => { 
    
    let unformated = number.replaceAll( ",", "" );
    unformated = unformated.replaceAll( ".", "" );
    unformated = unformated.replace( /(?=(\d{1}))/, "00" );
    unformated = unformated.replace( /0+(?=(\d{2}))/, "0" );
    unformated = unformated.replace( /0+(?=(\d{3,}))/, "" );
    unformated = unformated.replace( /(\d+)(?=(\d{2}))/g, "$1." );
    unformated = unformated.replace( /[a-zA-Z]+/, "" );
    return unformated?.toString(); 
    
};

export const moneyFormat = ( number : string  ) => { 

    if ( number.length > 0 ) {
        let formatNumber = number.replaceAll( ".", "" );
        formatNumber = formatNumber.replace( /(?=(\d{1}))/, "00" );
        formatNumber = formatNumber.replace( /0+(?=(\d{2}))/, "0" );
        formatNumber = formatNumber.replace( /0+(?=(\d{3,}))/, "" );
        formatNumber = formatNumber.replace( /(\d+)(?=(\d{2}))/g, "$1." );
        formatNumber = formatNumber.replace( /(\d)(?=(\d{3})+\.)/g, "$1," );
        
        return formatNumber.toString();
    }

    return "";
};