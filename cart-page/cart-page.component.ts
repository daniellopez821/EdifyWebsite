import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {catchError, of} from 'rxjs';


@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [
    ReactiveFormsModule

  ],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css'
})
export class CartPageComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      topic: ['', Validators.required],  // This field represents the selected option
    });
  }

  onSubmit() {
    if (this.form.valid) {
      // Sending form data to the backend
      this.http.post('http://localhost:3000/cart', this.form.value)
        .pipe(
          catchError(err => {
            console.error('Error:', err);
            return of(err); // Handle error appropriately
          })
        )
        .subscribe(response => {
          console.log('Response from backend:', response);
        });
    }
  }
}
