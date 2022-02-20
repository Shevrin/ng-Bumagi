import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  statusRequest = 0;
  pressed!: false;
  userList!: Observable<any>;

  constructor(private appService: AppService) {}

  getAllStatuses() {
    // this.userList = this.appService.getAllUsers();
  }
  changeStatusRequest(status: number) {
    this.statusRequest = status;
    this.userList = this.appService.getUsers(status)
		// .pipe(map((data) => data));
  }

  openModal(id: number) {
    console.log('open  modal id: ', id);
    
  }

  ngOnInit() {
    this.userList = this.appService.getAllUsers();
  }
}
