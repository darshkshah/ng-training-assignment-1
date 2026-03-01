import { Component, signal } from '@angular/core';
import { Header } from '../../header/header';
import { TaskTable } from '../../task-table/task-table';
import { Footer } from '../../footer/footer';
import { TaskCreateForm } from '../../task-create-form/task-create-form';
import { LoginStatus } from '../../login-status/login-status';
import { TaskModel, TaskUpdateModel } from '../../../models/task.model';
import { DeleteTaskForm } from '../../delete-task-form/delete-task-form';

@Component({
  selector: 'app-tasks-page',
  imports: [Header, TaskTable, Footer, TaskCreateForm, LoginStatus, DeleteTaskForm],
  templateUrl: './tasks-page.html',
  styleUrl: './tasks-page.css',
})
export class TasksPage {
    parentModalVisibility = signal(false);
    deleteModalVisibility = signal<boolean>(false);

    editingTask = signal<TaskUpdateModel | null>(null);
    taskToBeDeleted = signal<TaskModel | null>(null);

    onNewTask() {
        this.editingTask.set(null);
    }

    onDeleteTask(taskToBeDeleted: TaskModel) {
        this.taskToBeDeleted.set(taskToBeDeleted);
        this.deleteModalVisibility.set(true);
    }
    
    onEditTask(task: TaskUpdateModel) {
        this.editingTask.set(task);
        this.parentModalVisibility.set(true);
    }
}
