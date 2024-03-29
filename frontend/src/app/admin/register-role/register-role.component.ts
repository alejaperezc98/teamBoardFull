import { Component, OnInit } from '@angular/core';
import { RoleService } from '../../services/role.service';
import { Router } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-register-role',
  templateUrl: './register-role.component.html',
  styleUrls: ['./register-role.component.css']
})
export class RegisterRoleComponent implements OnInit {

  registerData: any;
  message: string = '';
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds: number = 2;

  constructor(
    private _roleService: RoleService,
    private _router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.registerData = {};
  }

  ngOnInit(): void {
  }

  registerRole(){
    if (
      !this.registerData.name ||
      !this.registerData.description
    ) {
      this.message = 'Failed process: Incomplete Data';
      this.openSnackBarError();
    } else {
      this._roleService.registerRole(this.registerData).subscribe({
        next: (v) => {
          this._router.navigate(['/listRole'])
          this.message = 'Role created'
          this.openSnackBarSuccesfull();
        },
        error: (e) => {
          this.message = e.error.message;
          this.openSnackBarError();
        }
      });
    }
  }

  openSnackBarSuccesfull() {
    this._snackBar.open(this.message, 'X', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
      panelClass: ['style-snackbarTrue'],
    });
  }
  openSnackBarError() {
    this._snackBar.open(this.message, 'X', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
      panelClass: ['style-snackbarFalse'],
    });
  }

}
