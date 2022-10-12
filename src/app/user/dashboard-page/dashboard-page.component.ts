import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/shared/interfaces';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BoardService } from '../shared/services/boards.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {
  
  DashboardForm!: FormGroup;
  boardList$!: Observable<Project[]>

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private boardService: BoardService
  ) {
    this._createForm()
   }

  ngOnInit(): void {
    this.boardList$ = this.boardService.getList()
  }

  private _createForm(){
    this.DashboardForm = this.fb.group({
      title: [null, [Validators.required]],
      description: [null]
    })
  }

  create() {
    if(this.DashboardForm.invalid){
      return
    }

    const project: Project = {
      title: this.DashboardForm.value.title,
      description: this.DashboardForm.value.description
    }

    this.boardService.create(project).subscribe(() => {
      this.DashboardForm.reset()
    })
  }

  open(id: string) {
    this.router.navigate(['/user/project', id])
  }
  
  delete(id: string) {
    this.boardService.delete(id).subscribe()
  }

  getList(){
    this.boardService.getList().subscribe()
  }

}
