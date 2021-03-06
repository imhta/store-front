import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Actions, ofActionDispatched, Store} from '@ngxs/store';
import {
  CustomerFeedbackSavedSuccessfully,
  ErrorInGettingInvoiceById,
  ErrorInSavingCustomerFeedback,
  GetInvoiceById,
  GotInvoiceByIdSuccessfully,
  InvoiceNotFoundById,
  SaveCustomerFeedback
} from '../shared/actions/invoice.actions';
import {CustomerFeedback, InvoiceModel} from '../shared/models/invoices.model';
import {LoadingTrue} from '../shared/state/loading.state';
import {take} from 'rxjs/operators';
import {SeoService} from '../shared/services/seo/seo.service';

@Component({
  selector: 'cx-invoice-page',
  templateUrl: './invoice-page.component.html',
  styleUrls: ['./invoice-page.component.scss']
})
export class InvoicePageComponent implements OnInit {
  status: 'NOTFOUND' | 'FOUND' | 'NOTSEARCHED' | 'ERROR' = 'NOTSEARCHED';
  invoice: InvoiceModel;
  feedbackStatus: 'GIVEN' | 'NOTGIVEN' | 'ERROR' = 'NOTGIVEN';
  feedback = new CustomerFeedback();

  constructor(private route: ActivatedRoute, private store: Store, private actions$: Actions, private seo: SeoService) {
    this.store.dispatch([new GetInvoiceById(this.route.snapshot.paramMap.get('id'))]);
    this.actions$.pipe(ofActionDispatched(GotInvoiceByIdSuccessfully)).subscribe(({invoice}) => {
      this.status = 'FOUND';
      this.invoice = invoice;
    });
    this.actions$.pipe(ofActionDispatched(InvoiceNotFoundById)).subscribe(() => this.status = 'NOTFOUND');
    this.actions$.pipe(ofActionDispatched(ErrorInGettingInvoiceById)).subscribe(() => this.status = 'ERROR');
  }

  ngOnInit() {
  }

  saveFeedback(reaction: 'happy' | 'sad' | 'ok') {
    this.feedback.reaction = reaction;
    this.actions$
      .pipe(ofActionDispatched(CustomerFeedbackSavedSuccessfully), take(5))
      .subscribe(() => this.feedbackStatus = 'GIVEN');
    this.actions$
      .pipe(ofActionDispatched(ErrorInSavingCustomerFeedback), take(5))
      .subscribe(({err}) => {
        this.feedbackStatus = 'ERROR';
      });
    this.store.dispatch([new LoadingTrue(), new SaveCustomerFeedback(this.invoice.invoiceId, this.feedback)]);

  }
}
