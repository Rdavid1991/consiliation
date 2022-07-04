
export function humanizeDate ( date : string| number ) {    

    const newDate = new Date( date );
    const time = newDate.getTime();
    const offset = newDate.getTimezoneOffset() *60*1000;
    
    return new Date( time + offset ).toLocaleDateString(
        [],
        {dateStyle: "full"}
    );
}

humanizeDate.prototype.getMonth = () => { 
    console.log( this );
};
