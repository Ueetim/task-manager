import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsAreaComponent } from './stats-area.component';

describe('StatsAreaComponent', () => {
  let component: StatsAreaComponent;
  let fixture: ComponentFixture<StatsAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatsAreaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatsAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
