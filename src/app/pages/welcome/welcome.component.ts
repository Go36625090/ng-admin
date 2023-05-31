import {Component, Inject, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {API_SERVICE, APIService} from "../../common/api";
import {LogService} from "../../common/log/log.service";
import {Log} from "../../common/log";
import {UserService} from "../../service/user.service";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  gender: string = 'male';
  private readonly log: Log;
  user: any;
  constructor(private fb: UntypedFormBuilder, @Inject(API_SERVICE)
              private api: APIService,
              private userService: UserService,
              private logging: LogService) {
    this.log = logging.bind(this);
    this.user = userService.getUser();
  }
  validateForm!: UntypedFormGroup;

  submitForm(): void {
    if (this.validateForm.valid) {
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

    this.api.post({method: 'welcome.info.query'},{})
      .subscribe({
        // next: (v: any) => this.log.info(v),
        // error: (e: any) => this.log.error(e),
        // complete: () => this.log.debug('complete')
      });

  }

}
