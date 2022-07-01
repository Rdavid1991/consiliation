import React from "react";
import {renderToString} from 'react-dom/server';
import Swal from"sweetalert2";
import { SideBarMenu } from "../components/SideBarMenu";

export const SideBar = async() => {
  
    await Swal.fire({
        grow      : 'row',
        hideClass : {
            popup: `
          animate__animated
          animate__bounceOutLeft
          animate__faster
          `
        },
        html      : renderToString(<SideBarMenu/>),
        position  : 'top-start',
        showClass : {
            popup: `
            animate__animated
            animate__bounceInLeft
            animate__faster
          `
        },
        showCloseButton   : true,
        showConfirmButton : false,
        title             : 'Left sidebar 👋',
        width             : 300,
    });
};
