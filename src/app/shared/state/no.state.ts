import {Action, State, StateContext, Store} from '@ngxs/store';
import {FirestoreService} from '../services/firestore-service/firestore.service';
import {GetInvoiceById} from '../actions/invoice.actions';

@State<null>({
  name: 'no',
  defaults: null
})
export class NoState {
  constructor(private db: FirestoreService, private  store: Store) {
  }

  @Action(GetInvoiceById)
  getInvoiceById(ctx: StateContext<null>, {invoiceUid}: GetInvoiceById) {
    return this.db.getInvoiceById(invoiceUid);
  }

}
