import { Component, EventEmitter, inject, input, Output, signal } from '@angular/core';
import { TaskService } from '../../services/task-service/task-service';

@Component({
  selector: 'app-menu-button-task-table',
  imports: [],
  templateUrl: './menu-button-task-table.html',
  styleUrl: './menu-button-task-table.css',
})
export class MenuButtonTaskTable {
    taskId = input.required<number>();
    isOpen = signal<boolean>(false)
    taskService = inject(TaskService);
    @Output() edit = new EventEmitter<void>();
    @Output() delete = new EventEmitter<void>();

    toggleIsOpen() {
        this.isOpen.set(!this.isOpen());
    }

    onDelete() {
        this.delete.emit();
    }

    onEdit() {
        this.edit.emit();
    }
}
