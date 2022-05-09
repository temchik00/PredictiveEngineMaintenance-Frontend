import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Engine } from 'src/app/Interfaces/Engine';
import { EngineService } from 'src/app/Shared/Engine/engine.service';
import { LoaderService } from 'src/app/Shared/Loader/loader.service';
import { StateModalService } from 'src/app/Shared/State-modal/state-modal.service';

@Component({
  selector: 'app-engine',
  templateUrl: './engine.component.html',
  styleUrls: ['./engine.component.scss'],
})
export class EngineComponent implements OnInit {
  public engine!: Engine;
  public file: File | undefined = undefined;
  public options: any;
  public initOpts: any;
  public cycles: Array<number> | undefined = undefined;
  public predictedCycles: Array<number> | undefined = undefined;

  public addCycleModalVisible: boolean = false;
  public trainModalVisible: boolean = false;
  constructor(
    private router: Router,
    private engineService: EngineService,
    private loader: LoaderService,
    private stateModal: StateModalService
  ) {}

  ngOnInit(): void {
    if (this.engineService.engine === undefined) {
      this.router.navigate(['']);
    } else {
      this.engine = this.engineService.engine;
    }

    this.initOpts = {
      renderer: 'svg',
      width: 600,
      height: 400,
    };

    this.options = {
      title: {
        text: 'История предсказанного времени жизни',
        subtext: `для двигателя ${this.engine.id}`,
        x: 'center',
      },
      legend: {
        data: ['Remaining cycles'],
        align: 'left',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          animation: false,
        },
      },
      xAxis: {
        data: [],
        silent: false,
        boundaryGap: false,
        splitLine: {
          show: true,
        },
      },
      yAxis: [
        {
          type: 'value',
        },
      ],
      series: {
        name: 'Оставшиеся циклы',
        type: 'line',
        data: [],
        animationDelay: (idx: any) => idx * 10,
      },

      animationEasing: 'elasticOut',
      animationDelayUpdate: (idx: any) => idx * 5,
    };

    this.getHistory();
  }

  public async getExpectedLifetime(): Promise<void> {
    this.loader.show();
    try {
      let prediction = (await this.engineService.getLifetime())
        .expectedLifetime;
      this.loader.hide();
      this.stateModal.success(
        undefined,
        `Предпологаемое оставшееся время жизни - ${prediction} циклов`
      );
    } catch (error) {
      this.loader.hide();
      if (error instanceof HttpErrorResponse && error.status === 400)
        this.stateModal.fail(
          undefined,
          'Недостаточно данных для предсказания времени жизни'
        );
      else {
        this.stateModal.fail();
        console.error(error);
      }
    }
  }

  public dropFile(file: File | undefined) {
    this.file = file;
  }

  public async uploadCycles(): Promise<void> {
    if (!this.file) return;
    try {
      this.loader.show();
      await this.engineService.uploadCycles(this.file);
      this.loader.hide();
      await this.getHistory();
      this.stateModal.success('Циклы успешно загружены');
    } catch (error) {
      this.loader.hide();
      this.stateModal.fail();
      console.error(error);
    }
  }

  public async getHistory(): Promise<void> {
    try {
      this.loader.show();
      let history = (await this.engineService.getHistory()).history;
      let cycles: number[] = [];
      let predictedCycles: number[] = [];
      for (let index = 0; index < history.length; index++) {
        const element = history[index];
        cycles.push(element.cycleId);
        predictedCycles.push(element.lifetime);
      }
      this.options.xAxis.data = cycles;
      this.options.series.data = predictedCycles;
      this.cycles = cycles;
      this.loader.hide();
    } catch (error) {
      this.loader.hide();
      console.error(error);
    }
  }

  public addCycle(): void {
    this.addCycleModalVisible = true;
  }

  public trainModel(): void {
    this.trainModalVisible = true;
  }
}
