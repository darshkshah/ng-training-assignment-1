import { Component, effect, EventEmitter, inject, input, model, Output, signal } from '@angular/core';
import { Datepicker } from '../datepicker/datepicker';
import { UserService } from '../../services/users/user-service';
import { Picklist } from '../picklist/picklist';
import { PickListOption } from '../../models/picklist-option.model';
import { NotificationsService } from '../../services/notifications/notifications-service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskService } from '../../services/task-service/task-service';
import { TaskUpdateModel } from '../../models/task.model';

interface TaskFormInputsInterface {
    assigned_to_id: string,
    description: string,
    due_date: string,
    status: string,
    priority: string
}

@Component({
    selector: 'app-task-create-form',
    imports: [Datepicker, Picklist, ReactiveFormsModule],
    templateUrl: './task-create-form.html',
    styleUrl: './task-create-form.css',
})
export class TaskCreateForm {
    // modalVisibility = signal<boolean>(true);
    modalVisibility = model<boolean>();

    // Testing this out
    task = input<TaskUpdateModel | null>(null);
    patchEffect = effect(() => {
        const t = this.task();

        if (t) {
        this.todoFormGroup.patchValue({
            todoStatus: t.status,
            todoDueDate: t.due_date,
            todoPriority: t.priority,
            todoDescription: t.description,
            todoAssignedTo: `${t.assigned_to_id}`
        });
        }
    });



    userService = inject(UserService);
    notificationsService = inject(NotificationsService)
    taskService = inject(TaskService);

    statusPickListInputs = { "title": "Status", "content": [{ "content": "pending" }, { "content": "in_progress" }, { "content": "completed" }], 'field': 'status', "todoFormGroupFieldName": "todoStatus" };
    priorityPickListInputs = { "title": "Priority", "content": [{ "content": "low" }, { "content": "medium" }, { "content": "high" }], 'field': 'priority', "todoFormGroupFieldName": "todoPriority" };
    usersPickList = signal<PickListOption[]>([]);
    todoFormGroup = new FormGroup({
        todoDescription: new FormControl<string>("", [Validators.required]),
        todoDueDate: new FormControl<string>("", [Validators.required]),
        todoPriority: new FormControl<string>("high", [Validators.required]),
        todoStatus: new FormControl<string>("completed", [Validators.required]),
        todoAssignedTo: new FormControl<string>("1", [Validators.required])
    })

    get isDescriptionMarkedError() {
        return this.todoFormGroup.controls.todoDescription.hasError('required') && (this.todoFormGroup.controls.todoDescription.dirty || this.todoFormGroup.controls.todoDescription.touched)
    }

    ngOnInit() {
        this.userService.loadUsers().subscribe(reponse => {
            if (reponse.body != null) {
                const users = reponse.body
                this.userService.setUsersListLocally(users);
                this.usersPickList.set(users.map(user => ({
                    content: `${user.first_name} ${user.last_name}`,
                    id: `${user.id}`
                })));
                this.assignedToPicklistData.content = this.usersPickList();
            }
            // const num = this.notificationsService.addNotification("Clicked", "Sucess");
            // setTimeout(() => {
            //     this.notificationsService.removeNotification(num);
            // }, 5000)
        })
    }

    handleSubmit() {
        // console.log(this.todoFormGroup.value)
        if (this.todoFormGroup.invalid) {
            this.todoFormGroup.markAllAsTouched();
        } else {
            const todoControls = this.todoFormGroup.controls
            const task = {
                status: todoControls.todoStatus.value,
                due_date: todoControls.todoDueDate.value,
                priority: todoControls.todoPriority.value,
                description: todoControls.todoDescription.value,
                assigned_to_id: todoControls.todoAssignedTo.value
            }
            const currentTask = this.task()
            if (currentTask != null) {
                this.taskService.editTask(task, currentTask.id).subscribe(body => {
                    console.log(body);
                })
            } else {
                this.taskService.newTask(task).subscribe(response => {
                    if (response.status == 201) {
                        const id: number = this.notificationsService.addNotification("Success", "Added new task");
                        setTimeout(() => {
                            this.notificationsService.removeNotification(id)
                        }, 5000);
                    } else {
                        const id: number = this.notificationsService.addNotification("Failed", `Body: ${response.body?.toString().slice(0, 50)}`);
                        setTimeout(() => {
                            this.notificationsService.removeNotification(id)
                        }, 5000);
                    }
                    this.modalVisibility.set(false);
                });
            }

        }
    }

    close() {
        this.modalVisibility.set(false);
    }

    cancelAndClose() {
        this.todoFormGroup.reset();
        this.modalVisibility.set(false);
    }

    assignedToPicklistData = {
        title: 'Assigned To',
        content: [] as PickListOption[],
        field: 'assigned_to_id',
        todoFormGroupFieldName: 'todoAssignedTo'
    };
}
