import { Component, EventEmitter, inject, Output } from '@angular/core';
import { TaskService } from '../../services/task-service/task-service';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { TextReplacePipe } from '../../pipes/text-replace-pipe/text-replace-pipe';
import { MenuButtonTaskTable } from '../menu-button-task-table/menu-button-task-table';
import { TaskModel, TaskUpdateModel } from '../../models/task.model';

@Component({
  selector: 'app-task-table',
  imports: [TitleCasePipe, DatePipe, TextReplacePipe, MenuButtonTaskTable],
  templateUrl: './task-table.html',
  styleUrl: './task-table.css',
})
export class TaskTable {
    taskService = inject(TaskService);
    count: number = 3
    @Output() edit = new EventEmitter<TaskUpdateModel>();
    @Output() taskToBeDeleted = new EventEmitter<TaskModel>();


    ngOnInit(): void {
        this.taskService.loadTasks().subscribe(reponse => {
            if (reponse.body != null) {
                const tasks = reponse.body
                this.taskService.count.set(tasks.count)
                this.taskService.setTasksLocally(tasks.results);
            }
        });
    }

    onDelete(taskToBeDeleted:TaskModel) {
        this.taskToBeDeleted.emit(taskToBeDeleted);
    }

    onEdit(task: TaskModel) {

        const taskUpdate: TaskUpdateModel = {
            id: task.id,
            status: task.status,
            due_date: task.due_date ?? '',
            priority: task.priority,
            description: task.description,
            assigned_to_id: task.assigned_to.id
        };
        this.edit.emit(taskUpdate);
    }
}
