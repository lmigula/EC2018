import { DefaultCrudRepository, DataSourceType } from '@loopback/repository';
import { Invoice } from '../models';
import { inject } from '@loopback/core';

export class InvoiceRepository extends DefaultCrudRepository<
    Invoice,
    typeof Invoice.prototype.id
    >
{
    constructor(@inject('datasources.db') protected datasource: DataSourceType) {
        super(Invoice, datasource);
    }

}