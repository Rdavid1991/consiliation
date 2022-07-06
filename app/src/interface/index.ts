/**
 * Interface's
 */
export interface Month {
    name : string;
    number : number;
}

export type StateAddConciliation = {
    added_by: string;
    added_in: string;
    credit: string;
    month: string;
}