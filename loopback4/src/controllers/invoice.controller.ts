import { repository } from '@loopback/repository';
import { Invoice } from '../models';
import { InvoiceRepository } from '../repositories';
import {
    HttpErrors,
    post,
    param,
    requestBody,
    get,
    put,
    patch,
    del,
} from '@loopback/rest';


export class TodoController {
    constructor(
        @repository(InvoiceRepository) protected invoiceRepo: InvoiceRepository,
    ) { }
    @post('/invoices')
    async createInvoice(@requestBody() invoice: Invoice) {
        if (!invoice.customer) {
            return Promise.reject(new HttpErrors.BadRequest('title is required'));
        }
        return await this.invoiceRepo.create(invoice);
    }

    @get('/invoices/{id}')
    async findInvoiceById(@param.path.number('id') id: string): Promise<Invoice> {
        return await this.invoiceRepo.findById(id);
    }

    @get('/invoices')
    async findInvoices(): Promise<Invoice[]> {
        return await this.invoiceRepo.find();
    }

    @patch('/invoices/{id}')
    async updateInvoice(
        @param.path.string('id') id: string,
        @requestBody() invoice: Invoice,
    ): Promise<boolean> {

        return await this.invoiceRepo.updateById(id, invoice);
    }
}
