import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/Shared/Loader/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit {
  constructor(public data: LoaderService) {}

  ngOnInit(): void {}
}
