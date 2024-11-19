import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Tarefa } from '../../../Tarefa';
import { CommonModule } from '@angular/common';
import { TaskItemComponent } from '../task-item/task-item.component';
import { AddTaskComponent } from '../add-task/add-task.component';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, TaskItemComponent, AddTaskComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent implements OnInit{

  tarefas: Tarefa[] = [];

  constructor(private tasksService:TaskService){}

  ngOnInit(): void {
     this.tasksService.getTasks().subscribe((dado)=>{
      this.tarefas = dado;
      console.log(dado)
    })
  }

  addTask(tarefa: Tarefa){
    this.tasksService.addTask(tarefa).subscribe((tarefa) => {
      this.tarefas.push(tarefa);
    })
  }

  deleteTask(tarefa: Tarefa){
    this.tasksService.deleteTask(tarefa).subscribe(()=>
      (this.tarefas = this.tarefas.filter((t) => t.id !== tarefa.id)));
  }

  toggleConcluido(tarefa: Tarefa){
    tarefa.concluido = !tarefa.concluido;
    this.tasksService.updateTask(tarefa).subscribe()
  }
}