import { AlertServer } from "./alerts";

export const fetch_POST = async ( url :string, params:{[s:string | number]:unknown}) => {
    const formData = new FormData();

    Object.entries( params ).map(([key, value]) => { 
        formData.append( key, value as string );
    });

    const response = await fetch( url,{
        body   : formData,
        method : "POST",
    });

    if ( response.status === 200 ) {
        return await response.json();
    }else{
        AlertServer( JSON.parse( response.statusText ));
    }

};

export const fetch_GET = async ( url: string, params:{[s:string | number]:unknown}) => { 

    const paramsUrl: Array<string> = []  ;

    Object.entries( params ).map(( param )=>{
        paramsUrl.push( param.join( "=" )); 
    });
    
    const response = await fetch( `${url}?${paramsUrl.join( "&" )}` ,{
        method: "GET"
    });

    if ( response.status === 200 ) {
        return await response.json();
    }else{
        AlertServer( JSON.parse( response.statusText ));
    }
};