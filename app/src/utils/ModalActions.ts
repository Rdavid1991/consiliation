import { Modal } from "bootstrap";

export const modalShow = ( element:string ) => {

    const rgx = new RegExp( "^#.*?" );

    if ( rgx.test( element )) {
        const modalElement = document.querySelector( element );
        if ( modalElement ) {
            const modalInstance = Modal.getOrCreateInstance( modalElement );
            modalInstance.show();
        }
    }else{
        throw `${element} No es un selector id, un id comienza con #`;
    }
};
