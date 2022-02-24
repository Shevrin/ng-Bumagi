import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AppService } from 'src/app/services/app.service';
import { LoaderService } from 'src/app/services/loader.service';
import { UserCardComponent } from '../user-card/user-card.component';
import { UserResponse } from './user-response';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  pressed = false;
  // userList!: Observable<UserResponse[]>;
  userList!: UserResponse[];
  interval!: any;
  constructor(
    private appService: AppService,
    public userCard: MatDialog,
    public loaderService: LoaderService
  ) {}

  getUsersList(status?: number): void {
    if (status) {
      clearInterval(this.interval);
      this.interval = setInterval(() => this.getUsersByStatus(status), 5000);
    } else {
      clearInterval(this.interval);
      this.interval = setInterval(() => this.getAllUsers(), 5000);
    }
  }

  getAllUsers(): void {
    this.appService.getAllUsers().subscribe((data) => {
      if (Array.isArray(data)) {
        this.userList = data;
      } else {
        setTimeout(() => this.getAllUsers(), 5000);
      }
    });
  }

  getUsersByStatus(status: number): void {
    this.appService.getUsers(status).subscribe((data) => {
      if (Array.isArray(data)) {
        this.userList = data;
      } else {
        setTimeout(() => this.getUsersByStatus(status), 5000);
      }
    });
  }

  openModal(id: number): void {
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

  ngOnInit(): void {
    this.getUsersList();
  }
}
