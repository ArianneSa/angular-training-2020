import { Component, OnInit } from '@angular/core';
import { Profile } from './profile-model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GlobalService } from 'src/app/services/global.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit {

  profileForm: any;

  constructor(private service: GlobalService, private route: Router) { }

  profile: Profile = {
    email: '',
    first_name: '',
    last_name: '',
    alias: '',
    job_title: '',
    mobile_number: '',
    password: '',
  };

  ngOnInit():void {
    this.service.httpGetProfile();

    this.service.onHttpGetProfile.subscribe(
      (profile: any) => {
        console.log('on get profile: ', profile);
        this.fillForm(profile);
      }
    );

    this.profileForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      first_name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required]),
      alias: new FormControl('', [Validators.required]),
      job_title: new FormControl('', [Validators.required]),
      mobile_number: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      confirm_password: new FormControl('', [Validators.required]),
    });
  }

  fillForm(profile: any): void {
    this.profileForm.patchValue({
      first_name: profile.meta.first_name,
      last_name: profile.meta.last_name,
      email: profile.email,
      alias: profile.alias,
      job_title: profile.meta.job_title,
      mobile_number: profile.meta.mobile_number,
    });
  }

  onSubmit():void {
    console.log('valid: ', this.profileForm.valid);
    console.log(this.profileForm.value);

    if (this.profileForm.valid) {
      const formValues = this.profileForm.value;
      const newFormValues = {
        meta: {
          first_name: formValues.first_name,
          last_name: formValues.last_name,
          job_title: formValues.job_title,
          mobile_number: formValues.mobile_number,
          timezone: 'Asian/Manila'
        },
        curremt_password: '',
        email: formValues.email,
        alias: formValues.alias
      }

      this.service.httpUpdateProfile(newFormValues);

      console.log('submit');
      this.service.httpUpdateProfile(this.profileForm.value);
    }
  }

  onLogout():void {
    this.service.deleteToken();
    this.route.navigate(['/']);
  }

}
