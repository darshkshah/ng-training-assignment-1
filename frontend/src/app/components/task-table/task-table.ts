import { Component, inject } from '@angular/core';
import { TaskService } from '../../services/task-service/task-service';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { TextReplacePipe } from '../../pipes/text-replace-pipe/text-replace-pipe';
import { MenuButtonTaskTable } from '../menu-button-task-table/menu-button-task-table';

@Component({
  selector: 'app-task-table',
  imports: [TitleCasePipe, DatePipe, TextReplacePipe, MenuButtonTaskTable],
  templateUrl: './task-table.html',
  styleUrl: './task-table.css',
})
export class TaskTable {
    taskService = inject(TaskService);
    count: number = 3

    ngOnInit(): void {
        this.taskService.loadTasks().subscribe(reponse => {
            if (reponse.body != null) {
                const tasks = reponse.body
                this.taskService.count.set(tasks.count)
                this.taskService.setTasksLocally(tasks.results);
            }
        });
    }
}
