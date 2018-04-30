import { InvoicePosition } from './position';
export class Invoice {
    id: string;
    customer: string;
    date: Date;
    amount: number;
    positon: Array<InvoicePosition>;

}