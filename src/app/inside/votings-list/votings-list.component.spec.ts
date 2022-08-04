import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VotingsListComponent } from './votings-list.component';

describe('VotingsListComponent', () => {
  let component: VotingsListComponent;
  let fixture: ComponentFixture<VotingsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VotingsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VotingsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
