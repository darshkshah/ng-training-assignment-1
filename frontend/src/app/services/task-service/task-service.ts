import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { TaskModel } from '../../models/task.model';
import { catchError, Observable, of, tap } from 'rxjs';
import { NotificationsService } from '../notifications/notifications-service';

interface TaskApiResponse {
    results: TaskModel[];
    next: string;
    previous: string;
    count: number;
}

@Injectable({
    providedIn: 'root',
})
export class TaskService {
    constructor(private http:HttpClient) {}

    tasks = signal<TaskModel[]>([]);
    count = signal<number>(4);

    notificationService = inject(NotificationsService);

    apiUrl:string = 'api/todo/tasks/';
    editRetrieveDeleteTaskApiUrl(taskId:number):string {
        return `api/todo/tasks/${taskId}/`
    }

    loadTasks() : Observable<HttpResponse<TaskApiResponse>> {
        return this.http.get<TaskApiResponse>(this.apiUrl, { observe: 'response' });
    }

    retrieveTask(id:number) {
        return this.http.get(this.editRetrieveDeleteTaskApiUrl(id));
    }

    newTask(task: Object) {
        return this.http.post(this.apiUrl, task, { observe: 'response' });
    }

    editTask(task:Object, taskId: number) {
        return this.http.patch(this.editRetrieveDeleteTaskApiUrl(taskId), task);
    }

    deleteTask(taskId:number) {
        return this.http.delete(this.editRetrieveDeleteTaskApiUrl(taskId)).pipe(
            tap(body => {
                this.notificationService.addNotification("Success", "Deleted task successfully");
            }),
            catchError(error => {
                if (error.status == 401) {
                    const num = this.notificationService.addNotification("Unauthorized", "You are unauthorized to delete tasks not created by or assigned to you");
                    setTimeout(() => {
                        this.notificationService.removeNotification(num)
                    }, 5000);
                } else if (error.status == 404) {
                    const num = this.notificationService.addNotification("Not Found", "The task you wanted to delete might have already been deleted.");
                    setTimeout(() => {
                        this.notificationService.removeNotification(num)
                    }, 5000);
                }
                return of(null);
            })
        );
    }

    addTaskLocally(task:TaskModel) {
        this.tasks.update(current => [...current, task]);
    }

    setTasksLocally(tasks: TaskModel[]) {
        this.tasks.set(tasks);
    }
}
