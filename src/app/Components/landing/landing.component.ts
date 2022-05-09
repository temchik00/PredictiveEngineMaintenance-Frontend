import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EngineService } from 'src/app/Shared/Engine/engine.service';
import { LoaderService } from 'src/app/Shared/Loader/loader.service';
import { StateModalService } from 'src/app/Shared/State-modal/state-modal.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  public engineId: string = '';
  public selectedFile: File | undefined = undefined;
  public forTesting: boolean = false;

  constructor(
    private engineService: EngineService,
    private router: Router,
    private loader: LoaderService,
    private stateModal: StateModalService
  ) {}

  ngOnInit(): void {}

  public open(): void {
    let id: number = +this.engineId;
    this.loader.show();
    this.engineService
      .openEngine(id)
      .then(() => {
        this.loader.hide();
        this.router.navigate(['engine']);
      })
      .catch((error) => {
        this.loader.hide();
        if (
          error instanceof HttpErrorResponse &&
          (<HttpErrorResponse>error).status === 404
        ) {
          this.stateModal.fail(
            'Не удалось открыть двигатель',
            `Двигатель с идентификатором ${this.engineId} не найден.`
          );
        } else {
          this.stateModal.fail();
          console.error(error);
        }
      });
  }

  public create(): void {
    this.loader.show();
    this.engineService
      .createEngine()
      .then(() => {
        this.loader.hide();
        this.router.navigate(['engine']);
      })
      .catch((error) => {
        this.loader.hide();
        this.stateModal.fail('Не удалось создать новый двигатель');
        console.error(error);
      });
  }

  public dropFile(file: File | undefined): void {
    this.selectedFile = file;
  }

  public uploadFile(): void {
    this.loader.show();
    if (this.selectedFile) {
      this.engineService
        .uploadEngineCSV(this.selectedFile, this.forTesting)
        .then(() => {
          this.loader.hide();
          this.stateModal.success('Данные успешно загружены');
        })
        .catch((error) => {
          this.loader.hide();
          this.stateModal.fail('Не удалось загрузить данные');
          console.error(error);
        });
    } else {
      this.stateModal.fail('Файл не выбран');
    }
  }
}
