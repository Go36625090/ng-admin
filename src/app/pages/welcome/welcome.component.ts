import {Component, Inject, Injector, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {APIService, API_SERVICE} from "../../api";
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  gender: string = 'male';

  constructor(private fb: UntypedFormBuilder, @Inject(API_SERVICE) private api: APIService) { }
  validateForm!: UntypedFormGroup;

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
  ngOnInit() {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true, [Validators.required]]
    });

    this.api.post('welcome.info.query',{})
      .subscribe({
        next: (v: any) => console.log(v),
        error: (e: any) => console.error(e),
        complete: () => console.info('complete')
      });

  }

}
