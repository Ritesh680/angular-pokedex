import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BattleInfoComponent } from './battle-info.component';

describe('BattleInfoComponent', () => {
  let component: BattleInfoComponent;
  let fixture: ComponentFixture<BattleInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BattleInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BattleInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
