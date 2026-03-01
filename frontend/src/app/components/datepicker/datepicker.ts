import { Component, computed, EventEmitter, input, Output, signal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

interface CalendarDay {
    day: number,
    month: "prev" | "current" | "next"
}

interface CalendarWeek {
    week: [CalendarDay, CalendarDay, CalendarDay, CalendarDay, CalendarDay, CalendarDay, CalendarDay]
}

interface CalendarMonth {
    month: [CalendarWeek, CalendarWeek, CalendarWeek, CalendarWeek, CalendarWeek, CalendarWeek]
    // monthName: string,
    // year: string
}

@Component({
    selector: 'app-datepicker',
    imports: [ReactiveFormsModule, FormsModule],
    templateUrl: './datepicker.html',
    styleUrl: './datepicker.css',
})
export class Datepicker {
    datePickerVisibility = false;
    get isMarkedError() {
        return !this.datePickerVisibility && (this.control().hasError('required') || this.control().invalid) && (this.control().dirty || this.control().touched)
    }
    control = input.required<FormControl>();
    today = new Date();
    currentMonth = signal<number>(this.today.getMonth());
    currentMonthName = computed(() => this.getMonthName(this.currentMonth()));
    currentYear = signal<number>(this.today.getFullYear());
    years = signal<number[]>([2024, 2025, 2026, 2027, 2028, 2029, 2030]);
    selectedDate: string = "";

    selectedMonth = computed<CalendarMonth>((() => this.generateCalendarMonth(this.currentMonth(), this.currentYear())));

    ngOnInit() { }

    generateCalendarMonth(month: number, year: number): CalendarMonth {
        const firstDayIndex = new Date(year, month, 1).getDay();
        const daysInCurrentMonth = new Date(year, month + 1, 0).getDate();
        const daysInPrevMonth = new Date(year, month, 0).getDate();

        const weeks: CalendarWeek[] = [];

        let currentDayCounter = 1;
        let nextMonthDayCounter = 1;

        for (let weekIndex = 0; weekIndex < 6; weekIndex++) {

            const week: CalendarDay[] = [];

            for (let dayIndex = 0; dayIndex < 7; dayIndex++) {

                const globalIndex = weekIndex * 7 + dayIndex;

                let day: CalendarDay;

                // Fill previous month days
                if (globalIndex < firstDayIndex) {
                    const prevMonthDay =
                        daysInPrevMonth - (firstDayIndex - globalIndex - 1);

                    day = { day: prevMonthDay, month: "prev" };
                }

                // Fill current month
                else if (currentDayCounter <= daysInCurrentMonth) {
                    day = { day: currentDayCounter++, month: "current" };
                }

                // Fill next month
                else {
                    day = { day: nextMonthDayCounter++, month: "next" };
                }

                week.push(day);
            }

            weeks.push({
                week: week as CalendarWeek["week"]
            });
        }

        return {
            month: weeks as CalendarMonth["month"]
        };
    }

    getMonthName(monthNumber: number): string {
        const date = new Date();
        date.setMonth(monthNumber); // Month is zero-based (0 = January)

        const formatter = new Intl.DateTimeFormat('en-US', { month: 'short' });
        return formatter.format(date);
    }

    selectDate(day: number) {
        const selectedDate = new Date(this.currentYear(), this.currentMonth(), day)
        const formatted = new Intl.DateTimeFormat('en-CA', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        }).format(selectedDate);
        // console.log(selectedDate, formatted);
        this.selectedDate = formatted;
        this.datePickerVisibility = false;
        this.control().setValue(formatted);
    }

    nextMonth() {
        const newDate = new Date(
            this.currentYear(),
            this.currentMonth() + 1,
            1
        );

        const newFullYear = newDate.getFullYear()
        if (newFullYear < this.years()[0] && !this.years().includes(newFullYear)) {
            this.years.update(current => [newFullYear, ...current]);
        } else if (newFullYear > this.years()[this.years().length - 1] && !this.years().includes(newFullYear)) {
            this.years.update(current => [...current, newFullYear]);
        }
        this.currentMonth.set(newDate.getMonth());
        this.currentYear.set(newDate.getFullYear());
    }

    prevMonth() {
        const newDate = new Date(
            this.currentYear(),
            this.currentMonth() - 1,
            1
        );

        const newFullYear = newDate.getFullYear()
        if (newFullYear < this.years()[0] && !this.years().includes(newFullYear)) {
            this.years.update(current => [newFullYear, ...current]);
        } else if (newFullYear > this.years()[this.years().length - 1] && !this.years().includes(newFullYear)) {
            this.years.update(current => [...current, newFullYear]);
        }
        this.currentMonth.set(newDate.getMonth());
        this.currentYear.set(newFullYear);
    }

    toggleDatePickerVisibility() {
        this.datePickerVisibility = !this.datePickerVisibility;
        this.control().markAsTouched();

    //     get isMarkedError() {
    //     return !this.datePickerVisibility && (this.control().hasError('required') || this.control().invalid) && (this.control().dirty || this.control().touched)
    // }

        // console.log(this.isMarkedError);

        // console.log("!this.datePickerVisibility", !this.datePickerVisibility);
        // console.log("(this.control().hasError('required') || this.control().invalid)", this.control().hasError('required') || this.control().invalid);
        // console.log("(this.control().dirty || this.control().touched)", this.control().dirty || this.control().touched);



    }
}
