import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { map, Observable } from 'rxjs';
import { AppService } from 'src/app/services/app.service';
import { ModalAlertComponent } from '../modal-alert/modal-alert.component';
import { UserCardComponent } from '../user-card/user-card.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  statusRequest = 0;
  pressed = false;
  userList!: Observable<any>;

  constructor(
    private appService: AppService,
    public userCard: MatDialog,

    private element: ElementRef,
    private renderer: Renderer2
  ) {}

  getStatus(event: any) {
    // console.log(event);
    // console.log(event.target.classList.contains('btn-pressed'));
  }

  getAllStatuses() {
    this.userList = this.appService.getAllUsers();
    this.userList.subscribe((data) => console.log(data));
    // this.appService.editUser().subscribe((data) => console.log('patch ', data));
  }

  changeStatusRequest(status: number) {
    this.statusRequest = status;
    this.userList = this.appService.getUsers(status);
  }

  openModal(id: number) {
    console.log('open  modal id: ', id);
    this.userList.subscribe((data) => {
      console.log(data);

      let userdata = data.find((item: any) => item.id == id);
      console.log(userdata);

      const openUserConfig = new MatDialogConfig();
      openUserConfig.data = {
        // userdata,
        // user: {
        //   id: id,
        //   fname: 'Петров',
        //   mname: 'Геннадьевич',
        //   name: 'Тимур',
        //   status: 2,
        // },

        id: userdata.id,
        name: userdata.name,
        fname: userdata.fname,
        mname: userdata.mname,
        status: userdata.status,
      };
      this.userCard.open(UserCardComponent, openUserConfig);
    });
  }

  ngOnInit() {
    this.getAllStatuses();
  }
}
