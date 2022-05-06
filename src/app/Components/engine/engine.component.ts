import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EngineService } from 'src/app/Shared/Engine/engine.service';

@Component({
  selector: 'app-engine',
  templateUrl: './engine.component.html',
  styleUrls: ['./engine.component.scss'],
})
export class EngineComponent implements OnInit {
  constructor(private router: Router, private engineService: EngineService) {}

  ngOnInit(): void {
    if (this.engineService.engine === undefined) {
      this.router.navigate(['']);
    }
  }
}
