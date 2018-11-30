import {InvoiceModel} from '../models/invoices.model';

export class GetInvoiceById {
  static readonly type = '[Invoice] Get Invoice by ID';

  constructor(public invoiceUid: string) {
  }
}

export class GotInvoiceByIdSuccessfully {
  static readonly type = '[Invoice] Got Invoice by ID';

  constructor(public invoice: InvoiceModel) {
  }
}

export class InvoiceNotFoundById {
  static readonly type = '[Not Found]  Invoice not found by ID';
}

export class ErrorInGettingInvoiceById {
  static readonly type = '[Error] Getting Invoice by ID';

  constructor(public err: string) {
  }
}

// export class GetStoreDetailsForInvoice {
//   static readonly type = '[Invoice] Get Store details for invoice';
//
//   constructor(public storeUid: string) {
//   }
// }
//
// export class GotStoreDetailsForInvoiceSuccessfully {
//   static readonly type = '[Invoice] Got Store details for invoice successfully';
//
//   constructor(public store: any) {
//   }
// }
//
// export class ErrorInGettingStoreDetails {
//   static readonly type = '[Error] Getting Store details';
//
//   constructor(public err: string) {
//   }
// }
