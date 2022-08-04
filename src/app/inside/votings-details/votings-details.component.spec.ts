import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VotingsDetailsComponent } from './votings-details.component';

describe('VotingsDetailsComponent', () => {
  let component: VotingsDetailsComponent;
  let fixture: ComponentFixture<VotingsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VotingsDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VotingsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
