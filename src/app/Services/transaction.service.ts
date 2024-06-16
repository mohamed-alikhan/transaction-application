import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface Transaction {
  id: string;
  date: number;
  sender: { firstName: string; lastName: string; dateOfBirth: string; IDNumber: string; };
  recipient: { firstName: string; lastName: string; email: string; accountNumber: string; bank: string; };
  Amount: number;
  CurrencyCd: string;
  Comments: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  // private transactionsSubject: BehaviorSubject<Transaction[]> = new BehaviorSubject<Transaction[]>([
  //   { id: 1, date: '01/10/2020', comments: 'Utility bill' },
  //   { id: 2, date: '15/10/2020', comments: '' }
  // ]);

  private apiUrl = 'http://localhost:5000/api/transactions';
  private transactionsSubject = new BehaviorSubject<Transaction[]>([]);
  transactions$ = this.transactionsSubject.asObservable();

  constructor(private http: HttpClient) { }

  getTransactions(startDate: string, endDate: string): Observable<Transaction[]> {
    // return this.transactionsSubject.asObservable();
    return this.http.get<Transaction[]>(`${this.apiUrl}?startDate=${startDate}&endDate=${endDate}`)
      .pipe(
        tap((transactions: Transaction[]) => this.transactionsSubject.next(transactions))
      );
  }

  getTransactionById(id: string): Transaction | undefined {
    return this.transactionsSubject.getValue().find(transaction => transaction.id === id);
  }

  updateTransaction(updatedTransaction: Transaction) {
    const transactions = this.transactionsSubject.getValue();
    const transactionIndex = transactions.findIndex(t => t.id === updatedTransaction.id);
    if (transactionIndex !== -1) {
      transactions[transactionIndex] = updatedTransaction;
      // this.transactionsSubject.next(transactions);
      this.transactionsSubject.next([...transactions]);
    }
  }
}
