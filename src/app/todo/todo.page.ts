import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { addTodo, removeTodo, loadTodos, changeStatusTodo } from '../state/todos/todo.actions';
import { selectAllTodos } from '../state/todos/todo.selectors';
import { Todo } from './todo.model';
import { saveAs } from 'file-saver'

@Component({
  selector: 'app-todo',
  templateUrl: 'todo.page.html',
  styleUrls: ['todo.page.scss'],
})
export class TodoPage implements OnInit {
  public allTodos$ = this.store.select(selectAllTodos);
  obj: Todo = {
    title: '',
    description: '',
    dueDate: '',
    priorityLevel: 'low',
  };
  public statusArr: string[] = ['todo', 'pending', 'completed'];
  constructor(private store: Store) { }
  ngOnInit() {
    this.store.dispatch(loadTodos());
  }
  ChangeStatus(todo: Todo, status: string) {
    this.store.dispatch(changeStatusTodo({ id: todo.id, status }));
  }
  addTodo() {
    if (!this.obj.title || !this.obj.description || !this.obj.dueDate) {
      alert("Please fill all details!!");
      return;
    }
    this.store.dispatch(addTodo(this.obj));
    this.obj = {
      title: '',
      description: '',
      dueDate: '',
      priorityLevel: 'low',
    };
  }
  removeTodo(todo: Todo) {
    this.store.dispatch(removeTodo({ id: todo.id }));
  }


  downloadFile(data: any) {
    const replacer = (key, value) => (value === null ? '' : value); // specify how you want to handle null values here
    const header = Object.keys(data[0]);
    const csv = data.map((row) =>
      header
        .map((fieldName) => JSON.stringify(row[fieldName], replacer))
        .join(',')
    );
    csv.unshift(header.join(','));
    const csvArray = csv.join('\r\n');

    const a = document.createElement('a');
    const blob = new Blob([csvArray], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    a.href = url;
    a.download = 'myFile.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }

  public globalData = [
    {
      name: 'User 1',
      age: 33,
      average: 98,
      approved: true,
      description: 'I am active blogger and Author.',
    }
  ]
  // public headers = [
  //   'name', 'age',
  //   'average',
  //   'approved',
  //   'description'
  // ]
  downloadCsv() {
    let data:any;
    this.allTodos$.forEach(e => {
      data=e;
    })
    this.downloadFile(data);
  }

}

 // <button (click)="downloadCsv()" >click</button>
  // 


 // this.allTodos$.map((t: Todo[])=>{
  //   this.activeTags = [];
  //   this.inactiveTags=[];
  //   t.forEach(e => {
  //    if (e.status=='active')
  //    {
  //      this.activeTags.push(e);
  //    }
  //    else if (e.status=='inactive')
  //    {
  //      this.inactiveTags.push(e);
  //    }
  //   });
  // });
