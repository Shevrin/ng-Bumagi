import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
})
export class UserCardComponent implements OnInit {
  isOpen = false;
  userForm!: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}
}
