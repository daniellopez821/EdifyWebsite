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
  selectedFile: File | null = null;


  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      topic: ['', Validators.required],  // This field represents the selected option
    });
  }
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }


  onSubmit() {
    if (this.form.valid) {
      const formData = new FormData();
      formData.append('name', this.form.get('name')?.value);
      formData.append('email', this.form.get('email')?.value);
      formData.append('topic', this.form.get('topic')?.value);

      if (this.selectedFile) {
        formData.append('file', this.selectedFile);
      }

      this.http.post('http://localhost:3000/cart', formData)
        .pipe(
          catchError(err => {
            console.error('Error:', err);
            return of(err);
          })
        )
        .subscribe(response => {
          console.log('Response from backend:', response);
        });
    }
  }

}
