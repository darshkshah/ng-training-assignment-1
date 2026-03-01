import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { TaskModel } from '../../models/task.model';
import { Observable } from 'rxjs';

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

    apiUrl:string = 'api/todo/tasks/';
    editRetrieveTaskApiUrl(taskId:number):string {
        return `api/todo/tasks/${taskId}/`
    }

    loadTasks() : Observable<HttpResponse<TaskApiResponse>> {
        return this.http.get<TaskApiResponse>(this.apiUrl, { observe: 'response' });
    }

    retrieveTask(id:number) {
        return this.http.get(this.editRetrieveTaskApiUrl(id));
    }

    newTask(task: Object) {
        return this.http.post(this.apiUrl, task, { observe: 'response' });
    }

    editTask(task:Object, taskId: number) {
        return this.http.patch(this.editRetrieveTaskApiUrl(taskId), task);
    }

    addTaskLocally(task:TaskModel) {
        this.tasks.update(current => [...current, task]);
    }

    setTasksLocally(tasks: TaskModel[]) {
        this.tasks.set(tasks);
    }
}
