import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackgroundManagerComponent } from './background-manager.component';

describe('BackgroundManagerComponent', () => {
  let component: BackgroundManagerComponent;
  let fixture: ComponentFixture<BackgroundManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackgroundManagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackgroundManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
