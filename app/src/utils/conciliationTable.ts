import { fetch_GET } from "./requests";
import { apiUrl, conciliationEndPoints } from "../config";
import { humanizeDate } from "./formatDate";
import { moneyFormat } from "./helpers";


export const conciliationTable = ( id : string ) => {

    const rgx = new RegExp( "^#.*?" );

    if ( rgx.test( id )) {    
        return $( id ).DataTable({
            ajax: async ( data , callback ) => { 

                const options = data as {[s:string]: unknown};

                Object.entries( data ).map(([key, value])=>{
                    options[key] = JSON.stringify( value );
                });
                
                const route = conciliationEndPoints.getAll.split( "=" );

                const response = await fetch_GET( apiUrl, {...data, [route[0]]: route[1] });
                
                callback( response );
            },
            columns: [
                
                { 
                    data       : "date",
                    render     : ( val )=>humanizeDate( val ),
                    searchable : false
                },
                { data: "reference" },
                { data: "description" },
                { 
                    data   : "debit_bnp",
                    render : ( val : number | string  ) => moneyFormat( `<span id="currency">B/.</span> ${val}` )
                },
                { 
                    data   : "debit_mides",
                    render : ( val : number | string  ) => moneyFormat( `<span id="currency">B/.</span> ${val}` )
                },

                
            ],
            processing : true,
            retrieve   : true,
            serverSide : true,
            
        });
    }else{
        throw `${id} No es un selector id, un id comienza con #`;
    }
};