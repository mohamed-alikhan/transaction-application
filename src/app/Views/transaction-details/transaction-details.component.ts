import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TransactionService, Transaction } from '../../Services/transaction.service';

@Component({
  selector: 'app-transaction-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './transaction-details.component.html',
  styleUrl: './transaction-details.component.scss'
})
export class TransactionDetailsComponent {
  transactionForm: FormGroup | undefined;
  transaction: Transaction | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private transactionService: TransactionService
  ) { }

  ngOnInit() {
    // const id = + this.route.snapshot.paramMap.get('id')!;
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam !== null ? +idParam : 0;
    this.transactionService.getTransactions().subscribe(transactions => {
      this.transaction = transactions.find(t => t.id === id) || { id: 0, date: '', comments: '' };
      this.initForm();
    });

    // this.transactionForm = this.fb.group({
    //   id: [{ value: this.transaction?.id ?? 0, disabled: true }],
    //   date: [{ value: this.transaction?.date ?? '', disabled: true }],
    //   comments: [this.transaction?.comments ?? '', [Validators.required, Validators.pattern('^[a-zA-Z0-9 ]*$')]]
    // });
  }

  private initForm() {
    this.transactionForm = this.fb.group({
      id: [{ value: this.transaction?.id, disabled: true }],
      date: [{ value: this.transaction?.date, disabled: true }],
      comments: [this.transaction?.comments, [Validators.required, Validators.pattern('^[a-zA-Z0-9 ]*$')]]
    });
  }

  onSubmit() {
    if (this.transactionForm?.valid) {
      if (this.transaction != null){
        this.transaction.comments = this.transactionForm.get('comments')?.value;
        console.log(this.transaction.comments)
        this.router.navigate(['/transaction-list']);
      }
    }
  }
}
