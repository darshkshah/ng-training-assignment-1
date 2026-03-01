import { Component, signal } from '@angular/core';
import { Header } from '../../header/header';
import { TaskTable } from '../../task-table/task-table';
import { Footer } from '../../footer/footer';
import { TaskCreateForm } from '../../task-create-form/task-create-form';
import { LoginStatus } from '../../login-status/login-status';

@Component({
  selector: 'app-tasks-page',
  imports: [Header, TaskTable, Footer, TaskCreateForm, LoginStatus],
  templateUrl: './tasks-page.html',
  styleUrl: './tasks-page.css',
})
export class TasksPage {
    parentModalVisibility = signal(false);
}
