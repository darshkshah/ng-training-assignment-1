import { Component, EventEmitter, inject, input, Input, model, Output } from '@angular/core';
import { TaskService } from '../../services/task-service/task-service';
import { Notifications } from '../notifications/notifications';
import { NotificationsService } from '../../services/notifications/notifications-service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
    modalVisibility = model<boolean>();
    taskService = inject(TaskService)
    notificationsService = inject(NotificationsService)
    @Output() newTaskClickedEvent = new EventEmitter<void>()

    newTaskOpen() {
        this.modalVisibility.set(true);
        this.newTaskClickedEvent.emit();
    }

    onRefresh() {
        this.taskService.loadTasks().subscribe(reponse => {
            if (reponse.body != null) {
                const tasks = reponse.body;
                this.taskService.count.set(tasks.count);
                this.taskService.setTasksLocally(tasks.results);
            }
            if (reponse.status == 200) {
                const id:number = this.notificationsService.addNotification("Refresh", "Success");
                setTimeout(() => {
                    this.notificationsService.removeNotification(id)
                }, 5000);
            }
        });
    }
}
