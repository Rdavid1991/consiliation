
export const humanizeDate = ( date : string| number ) => {    
    return new Date( date ).toLocaleDateString(
        undefined,
        {dateStyle: "full"}
    );
};
