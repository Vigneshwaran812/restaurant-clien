import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';


import { User } from 'app/models/user';
import { FormGroup } from '@angular/forms';




export interface logInResponse
{
    id: number,
    token : string;
}

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private userSubject: BehaviorSubject<null>;
    public user: Observable<null>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject(null);
        this.user = this.userSubject.asObservable();
    }

    public get userValue() {
        return this.userSubject.value;
    }

    login(loginForm : FormGroup) {
        return this.http.post<any>(`https://localhost:7135/api/Auth/login`, loginForm.value)
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('token',user.data.token);
                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('token');
        this.userSubject.next(null);
        this.router.navigate(['/admin-login']);
    }

    
    emailExist( email : string)
    {
        return this.http.post<any>(`https://localhost:7135/api/Auth/login`,email);
    }
}