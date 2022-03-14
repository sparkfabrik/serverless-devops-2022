import { TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { SnackbarService } from './snackbar.service';

class MatSnackBarStub{
  open(){
    return {
      onAction: () => of({})
    }
  }
}

describe('SnackbarService', () => {
  let snackbar: MatSnackBarModule;
  let service: SnackbarService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MatSnackBarModule,
        SnackbarService,
        { provide: MatSnackBar , useClass: MatSnackBarStub }
      ],
      imports: [],
    });
    snackbar = TestBed.inject(MatSnackBar);
    service = TestBed.inject(SnackbarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
