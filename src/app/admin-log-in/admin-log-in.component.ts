import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'app/Services/autherntication-service.service';
import { MessageService } from 'primeng/api';
import { AfterViewInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

// import { AuthenticationService, Credentials, CredentialsService, LoginContext, } from 'src/app/services/auth';
// import { ValidationService } from 'src/app/services/validation.service';
// import { USERNAME_PATTERN } from 'src/app/shared/regex-patterns';

@Component({
  selector: 'admin-login',
  templateUrl: './admin-log-in.component.html',
  providers:[MessageService]
})
export class AdminLogInComponent implements OnInit{

  showPopUp: boolean= true;
  logInForm !: FormGroup;
  email :any;
  constructor(private authService : AuthenticationService,
              private formBuilder : FormBuilder,
              private router: Router,
              private messageService: MessageService
              ) {
                this.logInForm = this.formBuilder.group({
                 email: ['', Validators.required],
                  password: ['', Validators.required]
                });
  }
  ngOnInit(): void {
    // if(this.credentialsService.isAuthenticated()){
    //   this.router.navigateByUrl("/dashboard")
    // }
    
  }

  // getErrorStateMatcher(): ValidationService {
  //   return this.validationService;
  // }
  ngAfterViewInit() {
    //this.adminLogin();
  }
  


  getUsername(){
   // return this.loginForm?.get("userName")
  }

  getPassword(){
    //return this.loginForm?.get("password")
  }  
  
  onSubmit() {
    // if (this.loginForm.valid) {
      
      // const loginContext: LoginContext = {
      //   username: this.loginForm.value.userName || '',
      //   password: this.loginForm.value.password || '',
      // };

      // console.log(loginContext);
      // this.authService.login(loginContext).subscribe({
      //   next: (credentials: Credentials) => {
      //     // Handle the successful login
      //     console.log('Logged in successfully:', credentials);
      //     // this.router.navigate(['/dashboard']);
          
      //   },
      //   error: (error: HttpErrorResponse) => {
      //     // Handle the error during login
      //     if (error.error instanceof ErrorEvent) {
      //       // Client-side error occurred
      //       console.error('An error occurred:', error.error.message);
      //     } else {
      //       // Server-side error occurred
      //       console.error(`HTTP Error ${error.status}: ${error.error.message}`);
      //       if (error.error?.message === 'User Not Found') {
      //         // Perform custom validation for user not found
      //         this.loginForm.get('userName')?.setErrors({ userNotFound: true });
      //       }
      //       if (error.error?.message === 'Incorrect Password') {
      //         // Perform custom validation for user not found
      //         this.loginForm.get('password')?.setErrors({ incorrectPassword: true });
      //       }
            
      //     }
      //   }
    //   });
// }
}

success : boolean = false;

adminLogin() {

 

  this.authService.login(this.logInForm).subscribe(
    (response: any) => {
      console.log("Logged In successfully");
      
      setTimeout(() => {
        this.router.navigateByUrl('/dashboard');
      }, 1000); // Delay navigation by 3 seconds to match the toast duration
    },
    (error: any) => {
      // Handle error response
      console.error(error);
      console.log('Status:', error.status);
      console.log('Message:', error.message);
      console.log('Errors:', error.error.errors);

      
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.error.message,
        });
      }
  );
}


@Output() emailVerified: EventEmitter<string> = new EventEmitter<string>();
forgotPassword()
{
  this.email = this.logInForm.get('email')?.value;
  console.log(this.email);
  this.authService.emailExist(this.email).subscribe(
    (response: any) => {
      
      this.emailVerified.emit(this.email);
      this.router.navigate(['/admin-reset-password']);
    },
    (error:any) => {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: error.error.message,
      });
    });
}

}