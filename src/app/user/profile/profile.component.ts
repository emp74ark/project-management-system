import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { Dictionary, User } from 'src/app/shared/interfaces';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { TranslateService } from 'src/app/shared/services/translate.service';
import { UserService } from '../shared/services/users.service';
import { dic } from './profile.props';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userId = localStorage.getItem('userId')!;
  user$!: Observable<User>;

  profileEditable = false;
  profileForm!: FormGroup;

  i18n: Dictionary = this.translate.get(dic);

  constructor(
    public auth: AuthService,
    private userService: UserService,
    private translate: TranslateService,
    private fb: FormBuilder,
    private router: Router,
    private modal: ModalService
  ) {}

  ngOnInit(): void {
    this.user$ = this.userService.getUserById(this.userId);

    this.translate.locale.subscribe(
      lang => {
        this.i18n = this.translate.get(dic, lang);
      }
    );

    this._createProfileForm();
  }

  private _createProfileForm() {
    this.profileForm = this.fb.group({
      profileName: [null, [Validators.required, Validators.minLength(2)]],
      profileEmail: [null, [Validators.required, Validators.email]],
      profilePassword1: [null, [Validators.required, Validators.minLength(6)]],
      profilePassword2: [null, [Validators.required]]
    });
  }

  edit() {
    this.profileEditable = true;
    this.user$.subscribe(
      user => {
        console.log(user);
        this.profileForm.patchValue({ 'profileName': user.name });
        this.profileForm.patchValue({ 'profileEmail': user.login });
      }
    );
  }

  cancel() {
    this.profileEditable = false;
  }

  save() {
    if (this.profileForm.invalid) {
      return;
    }

    this.modal.info(this.i18n['modal_saved']);

    const user: User = {
      name: this.profileForm.value.profileName,
      login: this.profileForm.value.profileEmail,
      password: this.profileForm.value.profilePassword1
    };

    this.userService.edit(this.userId, user)
      .pipe(switchMap(
        () => this.user$ = this.userService.getUserById(this.userId)
      ))
      .subscribe(() => {
        this.profileEditable = false;
        this.modal.close();
      });
  }

  passwordValidator() {
    const value1 = this.profileForm.get('profilePassword1')?.value;
    const value2 = this.profileForm.get('profilePassword2')?.value;
    return value1 === value2 ? true : false;
  }

  prompt() {
    this.modal.prompt(this.i18n['modal_delete'], this.delete);
  }

  delete = () => {
    this.userService.delete(this.userId).subscribe();
    this.auth.logout();
    this.router.navigate(['/user', 'login']);
  };
}
