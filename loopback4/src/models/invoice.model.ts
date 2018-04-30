import { Entity, property, model } from '@loopback/repository';

@model()
export class Invoice extends Entity {
    @property({
        type: 'string',
        id: true,
    })
    id?: string;

    @property({
        type: 'string',
        required: true,
    })
    customer: string;

    @property({
        type: 'string',
    })
    date?: string;



    getId() {
        return this.id;
    }
}