import { fetch_GET } from "./requests";
import { apiUrl } from "../config";
import { humanizeDate } from "./formatDate";


export const conciliationTable = ( id : string ) => {

    const rgx = new RegExp( "^#.*?" );

    if ( rgx.test( id )) {    
        return $( id ).DataTable({
            ajax: async ( data , callback ) => { 

                const options = data as {[s:string]: unknown};

                Object.entries( data ).map(([key, value])=>{
                    options[key] = JSON.stringify( value );
                });
                
                const response = await fetch_GET( apiUrl, {...data});
                
                callback( response );
            },
            columns: [
                
                { 
                    data   : "date",
                    render : ( val )=>humanizeDate( val ),
                },
                { data: "debit_bnp" },
                { data: "debit_mides" },
                { data: "description" },
                { data: "reference" },
                
            ],
            processing : true,
            retrieve   : true,
            serverSide : true,
            
        });
    }else{
        throw `${id} No es un selector id, un id comienza con #`;
    }
};