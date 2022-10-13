import { Component, Input, OnInit } from '@angular/core';
import { List } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.scss']
})
export class BoardListComponent implements OnInit {
  @Input()
  list!: List

  constructor() { }

  ngOnInit(): void {
  }

}
