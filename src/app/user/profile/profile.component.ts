import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { Dictionary, User } from 'src/app/shared/interfaces';
import { AuthService } from 'src/app/shared/services/auth.service';
import { TranslateService } from 'src/app/shared/services/translate.service';
import { UserService } from '../shared/services/users.service';

// TODO: - Edit profile should redirect the user to a route with a form for edit profile. The requirements for the form are the same as for all forms in the application. There should be a 'Delete User' button. In case of this action should be shown as a  "confirmation modal" then the user should be logged out, and the user should be removed from the database.

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userId = localStorage.getItem('userId')!
  user$!: Observable<User>

  profileEditable = false
  profileForm!: FormGroup

  displayGreeting: boolean;

  dic = [
    'profile',
    'name',
    'short',
    'email',
    'required',
    'correct_email',
    'password',
    'correct_password',
    'mismatch_passwords',
    'edit',
    'save',
    'close',
    'delete',
    'repeat',
    'modal_saved'
  ]
  i18n: Dictionary = this.translate.get(this.dic)

  constructor(
    public auth: AuthService,
    private userService: UserService,
    private translate: TranslateService,
    private fb: FormBuilder,
    private router: Router
  ) { 
    this.displayGreeting = false;
  }

  ngOnInit(): void {
    this.user$ = this.userService.getUserById(this.userId)

    this.translate.locale.subscribe(
      lang => {
        this.i18n = this.translate.get(this.dic, lang)
      }
    )

    this._createProfileForm()
  }
  
  private _createProfileForm() {
    this.user$.subscribe(
      user => {
        this.profileForm = this.fb.group({
          profileName: [user.name, [Validators.required, Validators.minLength(2)]],
          profileEmail: [user.login, [Validators.required, Validators.email]],
          profilePassword1: [null, [Validators.required, Validators.minLength(6)]],
          profilePassword2: [null, [Validators.required]]
        })
      }
    )
  }

  hideGreeting(){
    this.displayGreeting = false;
  }

  editProfile() {
    this.profileEditable = true
  }

  saveProfile() {
    if (this.profileForm.invalid) {
      return
    }
    
    const user: User = {
      name: this.profileForm.value.profileName,
      login: this.profileForm.value.profileEmail,
      password: this.profileForm.value.profilePassword1
    }
    
    this.userService.edit(this.userId, user)
      .pipe(switchMap(
        () => this.user$ = this.userService.getUserById(this.userId)
      ))
      .subscribe(() => {
        this.displayGreeting = true;
        this.profileEditable = false;
      })
  }

  passwordValidator() {
    const value1 = this.profileForm.get('profilePassword1')?.value
    const value2 = this.profileForm.get('profilePassword2')?.value
    return value1 === value2 ? true : false
  }

  deleteProfile() {
    // this.userService.delete(this.userId)
    // this.auth.logout()
    // this.router.navigate(['/user', 'login'])
  }
}
