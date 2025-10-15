import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { SignupComponent } from './signup.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let authServiceMock: any;
  let messageServiceMock: any;
  let routerMock: any;

  beforeEach(async () => {
    // Mock dependencies
    authServiceMock = { register: jasmine.createSpy('register') };
    messageServiceMock = { success: jasmine.createSpy('success'), error: jasmine.createSpy('error') };
    routerMock = { navigateByUrl: jasmine.createSpy('navigateByUrl') };

    await TestBed.configureTestingModule({
      declarations: [ SignupComponent ],
      imports: [ ReactiveFormsModule, FormsModule ],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: NzMessageService, useValue: messageServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // triggers ngOnInit
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the signup form with 4 controls', () => {
    const controls = component.signupForm.controls;
    expect(controls['name']).toBeTruthy();
    expect(controls['email']).toBeTruthy();
    expect(controls['password']).toBeTruthy();
    expect(controls['checkPassword']).toBeTruthy();
  });

  it('should make name, email, password, checkPassword required', () => {
    const form = component.signupForm;
    form.controls['name'].setValue('');
    form.controls['email'].setValue('');
    form.controls['password'].setValue('');
    form.controls['checkPassword'].setValue('');
    expect(form.valid).toBeFalse();
  });

  it('should validate password confirmation', () => {
    const form = component.signupForm;
    form.controls['password'].setValue('12345');
    form.controls['checkPassword'].setValue('1234');
    const errors = component.confirmationValidator(form.controls['checkPassword']);
    expect(errors['confirm']).toBeTrue();
  });

  it('should call AuthService.register and show success message on valid registration', fakeAsync(() => {
    const formValue = { name: 'Test', email: 'test@test.com', password: '12345', checkPassword: '12345' };
    component.signupForm.setValue(formValue);

    // Mock AuthService.register to return an observable with id
    authServiceMock.register.and.returnValue(of({ id: 1 }));

    component.register();
    tick();

    expect(authServiceMock.register).toHaveBeenCalledWith(formValue);
    expect(messageServiceMock.success).toHaveBeenCalledWith('User registered successfully', { nzDuration: 5000 });
    expect(routerMock.navigateByUrl).toHaveBeenCalledWith('/login');
  }));

  it('should show error message if registration fails', fakeAsync(() => {
    const formValue = { name: 'Test', email: 'test@test.com', password: '12345', checkPassword: '12345' };
    component.signupForm.setValue(formValue);

    authServiceMock.register.and.returnValue(of({ id: null }));

    component.register();
    tick();

    expect(messageServiceMock.error).toHaveBeenCalledWith('User registration failed', { nzDuration: 5000 });
  }));
});
