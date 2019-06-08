import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackBar: MatSnackBar) { }

  config:MatSnackBarConfig ={
    duration:3000,
    horizontalPosition:'right',
    verticalPosition:'top',
  }
  success(msg){
    this.config['panelClass']=['notification','success'];
   return this.snackBar.open(msg,'',this.config);
  }
  warning(msg){
    this.config['panelClass']=['notification','warning'];
   return this.snackBar.open(msg,'',this.config);
  }
  update(msg){
    this.config['panelClass']=['notification','update'];
   return this.snackBar.open(msg,'',this.config);
  }
}
