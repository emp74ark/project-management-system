import { Component, OnInit } from '@angular/core';
import { Board, Dictionary } from 'src/app/shared/interfaces';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BoardService } from '../shared/services/boards.service';
import { Observable, switchMap } from 'rxjs';
import { UserService } from '../shared/services/users.service';
import { TranslateService } from 'src/app/shared/services/translate.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { dic } from './dashboard-page.props';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {
  
  DashboardForm!: FormGroup;
  boardList$!: Observable<Board[]>;
  boardEditable: {[index: string]: boolean} = {};

  i18n: Dictionary = this.translate.get(dic);

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private boardService: BoardService,
    private userService: UserService,
    private translate: TranslateService,
    private modal: ModalService
  ) {}
  
  ngOnInit(): void {
    this._createForm();
    this.boardService.getList().subscribe();
    this.boardList$ = this.boardService.listStream;
    this.userService.getByLogin(localStorage.getItem('login')!).subscribe(
      user => {
        localStorage.setItem('userId', user.id!);
      }
    );
    this.translate.locale.subscribe(
      lang => {
        this.i18n = this.translate.get(dic, lang);
      }
    );
  }

  private _createForm(){
    this.DashboardForm = this.fb.group({
      title: [null, [Validators.required]],
      description: [null]
    });
  }

  create() {
    if(this.DashboardForm.invalid){
      return;
    }

    const board: Board = {
      title: this.DashboardForm.value.title,
      description: this.DashboardForm.value.description
    };

    this.boardService.create(board)
      .pipe(switchMap(() => this.boardService.getList()))
      .subscribe(() => {
      this.DashboardForm.reset();
    });
  }

  open(id: string) {
    this.router.navigate(['/user/board', id]);
  }

  prompt(event: MouseEvent) {
    event.stopImmediatePropagation();
    this.modal.prompt(this.i18n['modal_delete'], this.delete);
  }
  
  delete = (id: string) => {
    this.boardService.delete(id)
      .pipe(switchMap(() => this.boardService.getList()))
      .subscribe(() => this.modal.close());
  };

  checkEditableStatus(boardId: string) {
    if(this.boardEditable[boardId] === undefined) {
      return false;
    }
    return this.boardEditable[boardId];
  }

  edit(event: MouseEvent, boardId: string){
    event.stopImmediatePropagation();
    this.boardEditable = {
      ...this.boardEditable,
      [boardId]: true
    };
  }

  save(event: MouseEvent, id: string, title: string, description: string){
    event.stopImmediatePropagation();
    const board: Board = {
      id: id,
      title: title,
      description: description
    };
    this.boardEditable = {
      ...this.boardEditable,
      [id]: false
    };
    this.boardService.edit(board)
      .pipe(switchMap(() => this.boardService.getList()))
      .subscribe();
  }
}
