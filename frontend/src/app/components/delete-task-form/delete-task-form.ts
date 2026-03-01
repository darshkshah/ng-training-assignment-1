import { Component, inject, input, model } from '@angular/core';
import { TaskModel } from '../../models/task.model';
import { TaskService } from '../../services/task-service/task-service';

@Component({
  selector: 'app-delete-task-form',
  imports: [],
  templateUrl: './delete-task-form.html',
  styleUrl: './delete-task-form.css',
})
export class DeleteTaskForm {
    task = input.required<TaskModel | null>()
    isOpen = model<boolean>()

    taskService = inject(TaskService);


    onDelete() {
        const currentValue = this.task();
        if (currentValue != null) {
            this.taskService.deleteTask(currentValue.id).subscribe(body => {

            })
        }
        this.onClose();
    }

    onClose() {
        this.isOpen.set(false);
    }

}
