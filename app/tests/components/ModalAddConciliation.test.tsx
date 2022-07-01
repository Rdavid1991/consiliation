import React from "react";
import { render, screen } from "@testing-library/react";
import { ModalAddConciliation } from "./../../src/components/ModalAddConciliation";


describe( "first", () => {

    test( "renders learn react link", () => {

        render( <ModalAddConciliation /> );
        expect( <ModalAddConciliation /> ).toMatchSnapshot();
    });

});
