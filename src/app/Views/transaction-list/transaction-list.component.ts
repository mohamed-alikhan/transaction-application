import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {RouterModule} from '@angular/router';
import { TransactionService, Transaction } from '../../Services/transaction.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-transaction-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './transaction-list.component.html',
  styleUrl: './transaction-list.component.scss'
})
export class TransactionListComponent {
  transactions: Transaction[] = [];
  startDate: string = '2021-12-01';
  endDate: string = '2021-12-31';

  private transactionsSubscription: Subscription | undefined;

  constructor(private transactionService: TransactionService) { }

  ngOnInit() {
    // this.transactionsSubscription = this.transactionService.getTransactions().subscribe(transactions => {
    //   this.transactions = transactions;
    // });

    this.transactionService.getTransactions(this.startDate, this.endDate).subscribe(data => {
      this.transactions = data.filter(t => ['COMPLETED', 'IN PROGRESS', 'REJECTED'].includes(t.status));
    });
  }

  ngOnDestroy() {
    if (this.transactionsSubscription) {
      this.transactionsSubscription.unsubscribe();
    }
  }
}
