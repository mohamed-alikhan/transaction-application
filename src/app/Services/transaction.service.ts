import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Transaction {
  id: number;
  date: string;
  comments: string;
}

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private transactionsSubject: BehaviorSubject<Transaction[]> = new BehaviorSubject<Transaction[]>([
    { id: 1, date: '01/10/2020', comments: 'Utility bill' },
    { id: 2, date: '15/10/2020', comments: '' }
  ]);

  constructor() { }

  getTransactions(): Observable<Transaction[]> {
    return this.transactionsSubject.asObservable();
  }

  updateTransaction(updatedTransaction: Transaction) {
    const transactions = this.transactionsSubject.getValue();
    const transactionIndex = transactions.findIndex(t => t.id === updatedTransaction.id);
    if (transactionIndex !== -1) {
      transactions[transactionIndex] = updatedTransaction;
      this.transactionsSubject.next(transactions);
    }
  }
}
