import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EngineService } from 'src/app/Shared/Engine/engine.service';
import { LoaderService } from 'src/app/Shared/Loader/loader.service';
import { StateModalService } from 'src/app/Shared/State-modal/state-modal.service';

@Component({
  selector: 'app-add-cycle-modal',
  templateUrl: './add-cycle-modal.component.html',
  styleUrls: ['./add-cycle-modal.component.scss'],
})
export class AddCycleModalComponent implements OnInit {
  @Input() visible!: boolean;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output() addedCycle: EventEmitter<void> = new EventEmitter<void>();

  private settingsValidator: RegExp =
    /^(-?[0-9]+(\.[0-9]+)? ){2}-?[0-9]+(\.[0-9]+)?$/;
  private sensorValidator: RegExp =
    /^(-?[0-9]+(\.[0-9]+)? ){20}-?[0-9]+(\.[0-9]+)?$/;

  public settings: string = '';
  public sensors: string = '';
  public hasFailed: boolean = false;

  constructor(
    private engineService: EngineService,
    private loader: LoaderService,
    private stateModal: StateModalService
  ) {}

  ngOnInit(): void {}

  public close(): void {
    this.visible = false;
    this.visibleChange.next(this.visible);
    this.settings = '';
    this.sensors = '';
    this.hasFailed = false;
  }

  public isDisabled(): boolean {
    return (
      !this.settingsValidator.test(this.settings) ||
      !this.sensorValidator.test(this.sensors)
    );
  }

  public async addCycle(): Promise<void> {
    if (this.isDisabled()) {
      this.stateModal.fail('Введены некорректные данные');
      return;
    }
    this.loader.show();
    let settings: Array<number> = [];
    let sensors: Array<number> = [];
    this.settings
      .trim()
      .split(' ')
      .forEach((setting) => {
        settings.push(+setting);
      });
    this.sensors
      .trim()
      .split(' ')
      .forEach((sensor) => {
        sensors.push(+sensor);
      });
    try {
      await this.engineService.addCycle(settings, sensors, this.hasFailed);
      this.addedCycle.next();
      this.loader.hide();
      this.stateModal.success('Цикл успешно добавлен');
      this.close();
    } catch (error) {
      this.loader.hide();
      this.stateModal.fail();
      console.error(error);
    }
  }
}
