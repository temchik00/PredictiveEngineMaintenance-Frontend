import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EngineService } from 'src/app/Shared/Engine/engine.service';
import { LoaderService } from 'src/app/Shared/Loader/loader.service';
import { StateModalService } from 'src/app/Shared/State-modal/state-modal.service';

@Component({
  selector: 'app-train-modal',
  templateUrl: './train-modal.component.html',
  styleUrls: ['./train-modal.component.scss'],
})
export class TrainModalComponent implements OnInit {
  @Input() visible!: boolean;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  public epochs: string = '';
  public batchSize: string = '';
  public learningRate: string = '';
  public dropout: string = '';

  constructor(
    private engineService: EngineService,
    private loader: LoaderService,
    private stateModal: StateModalService
  ) {}

  ngOnInit(): void {}

  public close(): void {
    this.visible = false;
    this.visibleChange.next(this.visible);
    this.epochs = '';
    this.batchSize = '';
    this.learningRate = '';
    this.dropout = '';
  }

  public async train(): Promise<void> {
    try {
      if (this.isDisabled()) {
        this.stateModal.fail('Введены некорректные данные');
        return;
      }
      this.loader.show();
      let epochs = +this.epochs;
      let batchSize = +this.batchSize;
      let learningRate = +this.learningRate;
      let dropout = +this.dropout;
      let result = await this.engineService.trainModel(
        epochs,
        batchSize,
        learningRate,
        dropout
      );
      this.loader.hide();
      this.stateModal.success(
        'Обучение прошло успешно',
        `Модель успешно обучилась, выдав результат: ${result.score}, что ${
          result.isBetter ? 'лучще' : 'хуже'
        } предыдущей модели.\nНазвание модели - ${result.modelName}`
      );
      this.close();
    } catch (error) {
      this.loader.hide();
      if (error instanceof HttpErrorResponse && error.status === 400) {
        this.stateModal.fail(undefined, 'Недостаточно данных для обучения');
      } else {
        this.stateModal.fail();
      }
    }
  }

  public isDisabled(): boolean {
    return (
      +this.epochs <= 0 ||
      !Number.isInteger(+this.epochs) ||
      +this.batchSize <= 0 ||
      !Number.isInteger(+this.batchSize) ||
      +this.learningRate <= 0 ||
      +this.learningRate >= 1 ||
      this.dropout === '' ||
      +this.dropout <= 0 ||
      +this.dropout >= 1
    );
  }
}
