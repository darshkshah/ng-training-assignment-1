import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuButtonTaskTable } from './menu-button-task-table';

describe('MenuButtonTaskTable', () => {
  let component: MenuButtonTaskTable;
  let fixture: ComponentFixture<MenuButtonTaskTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuButtonTaskTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuButtonTaskTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
