import { Component, OnInit } from '@angular/core';
import { StateModalService } from 'src/app/Shared/State-modal/state-modal.service';

@Component({
  selector: 'app-state-modal',
  templateUrl: './state-modal.component.html',
  styleUrls: ['./state-modal.component.scss'],
})
export class StateModalComponent implements OnInit {
  constructor(public data: StateModalService) {}

  ngOnInit(): void {}
}
