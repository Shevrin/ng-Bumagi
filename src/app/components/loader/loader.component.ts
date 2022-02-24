import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit {
  loader$!: Observable<boolean>;
  constructor(public loaderService: LoaderService) {}

  ngOnInit(): void {
    this.loader$ = this.loaderService.isLoading$;
  }
}
