import { TitleCasePipe } from '@angular/common';
import { Component, computed, input, Signal, signal } from '@angular/core';
import { PickListOption } from '../../models/picklist-option.model';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TextReplacePipe } from '../../pipes/text-replace-pipe/text-replace-pipe';
import { toSignal } from '@angular/core/rxjs-interop';


@Component({
  selector: 'app-picklist',
  imports: [TitleCasePipe, ReactiveFormsModule, TextReplacePipe],
  templateUrl: './picklist.html',
  styleUrl: './picklist.css',
})
export class Picklist {
    inputData = input.required<{"title": string, "field" : string, "todoFormGroupFieldName": string}>();
    picklistOptions = input.required<PickListOption[]>();
    control = input.required<FormControl>();

    isOpen = false;
    selectedOption= signal<string>("");

    get isMarkedError() {
        return !this.isOpen && this.control().hasError('required') && (this.control().dirty || this.control().touched)
    }

    ngOnInit() {
        this.control().valueChanges.subscribe(value => {
            if (this.inputData().field == 'assigned_to_id') {
                const updated = this.picklistOptions().find(option => option.id === value)?.content ?? ""
                this.selectedOption.set(updated);
            } else {
                this.selectedOption.set(value);
            }
        })
    }

    toggleIsOpen() {
        this.isOpen=!this.isOpen;
        this.control().markAsTouched();
    }

    selectOption(option:PickListOption) {
        this.selectedOption.set(option.content);
        if (this.inputData().field == "assigned_to_id") {
            this.control().setValue(option.id);
        } else {
            this.control().setValue(option.content);
        }
    }
}
