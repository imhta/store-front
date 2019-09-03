import {CustomerFeedback, InvoiceModel} from '../models/invoices.model';

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

export class SaveCustomerFeedback {
  static readonly type = '[Invoice] Save customer feedback for invoice';

  constructor(public invoiceId: string, public feedback: CustomerFeedback) {
  }
}

export class CustomerFeedbackSavedSuccessfully {
  static readonly type = '[Invoice] Customer feedback for invoice saved successfully';
}

export class ErrorInSavingCustomerFeedback {
  static readonly type = '[Error] Saving customer feedback';

  constructor(public err: string) {
  }
}
