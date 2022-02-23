import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { map, Observable } from 'rxjs';
import { AppService } from 'src/app/services/app.service';
import { UserCardComponent } from '../user-card/user-card.component';
import { UserResponse } from './user-response';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  pressed = false;
  // userList!: Observable<any>;
  userList!: UserResponse[];
  interval!: any;
  // Observable<UserResponse[]>
  constructor(private appService: AppService, public userCard: MatDialog) {}

  getUsersList(status?: number): void {
    if (status) {
      clearInterval(this.interval);
      this.interval = setInterval(() => this.getUsersByStatus(status), 5000);
      // this.getUsersByStatus(status);
    } else {
      clearInterval(this.interval);
      this.interval = setInterval(() => this.getAllUsers(), 5000);
    }
  }

  getAllUsers() {
    // this.userList = this.appService.getAllUsers();
    this.appService.getAllUsers().subscribe((data) => {
      if (Array.isArray(data)) {
        this.userList = data;
      } else {
        this.getAllUsers();
      }
    });
    // this.appService.editUser().subscribe((data) => console.log('patch ', data));
  }

  getUsersByStatus(status: number) {
    // this.userList = this.appService.getUsers(status);
    this.appService.getUsers(status).subscribe((data) => {
      if (Array.isArray(data)) {
        this.userList = data;
      } else {
        this.getUsersByStatus(status);
      }
    });
  }

  openModal(id: number) {
    clearInterval(this.interval);
    console.log('open user id: ', id);
    let userdata = this.userList.find((item: any) => item.id == id);
    const openUserConfig = new MatDialogConfig();
    openUserConfig.data = {
      id: userdata!.id,
      name: userdata!.name,
      fname: userdata!.fname,
      mname: userdata!.mname,
      status: userdata!.status,
    };
    this.userCard.open(UserCardComponent, openUserConfig);
  }

  ngOnInit() {
    // this.getAllUsers();
    this.getUsersList();
  }
}
