import Swal from "sweetalert2";

export const AlertServer = async ( error : any ) => {
    return await Swal.fire({
        ...error
    });
};