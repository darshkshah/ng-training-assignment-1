import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTaskForm } from './delete-task-form';

describe('DeleteTaskForm', () => {
  let component: DeleteTaskForm;
  let fixture: ComponentFixture<DeleteTaskForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteTaskForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteTaskForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
