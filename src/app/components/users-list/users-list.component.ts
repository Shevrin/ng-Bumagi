import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { map, Observable } from 'rxjs';
import { AppService } from 'src/app/services/app.service';
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

  click(event: any) {
    console.log(event);
    console.log(event.target.classList.contains('btn-pressed'));
  }

  getAllStatuses(event: any) {
    this.userList = this.appService.getAllUsers();
    const hasClass =
      this.element.nativeElement.classList.contains('btn-pressed');
    if (hasClass) {
      this.renderer.removeClass(this.element.nativeElement, 'btn-pressed');
    } else {
      this.renderer.addClass(this.element.nativeElement, 'btn-pressed');
    }
  }
  changeStatusRequest(status: number) {
    this.statusRequest = status;
    this.userList = this.appService.getUsers(status);
    // .pipe(map((data) => data));
  }

  openModal(id: number) {
    console.log('open  modal id: ', id);
    const openUserConfig = new MatDialogConfig();
    // openUserConfig.width = '1000px';
    openUserConfig.data = {
      userid: id,
    };
    this.userCard.open(UserCardComponent, openUserConfig);
  }

  ngOnInit() {
    this.userList = this.appService.getAllUsers();
  }
}
