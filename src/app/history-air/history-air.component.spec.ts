import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryAirComponent } from './history-air.component';

describe('HistoryAirComponent', () => {
  let component: HistoryAirComponent;
  let fixture: ComponentFixture<HistoryAirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoryAirComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HistoryAirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
