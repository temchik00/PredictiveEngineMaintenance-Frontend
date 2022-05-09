import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Engine } from 'src/app/Interfaces/Engine';
import { ExpectedLifetime } from 'src/app/Interfaces/ExpectedLifetime';
import { PredictionHistory } from 'src/app/Interfaces/History';
import { TrainResult } from 'src/app/Interfaces/TrainResult';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EngineService {
  public engine: Engine | undefined = undefined;
  constructor(private httpClient: HttpClient) {}

  public async openEngine(id: number): Promise<void> {
    try {
      this.engine = await firstValueFrom(
        this.httpClient.get<Engine>(`${environment.apiUrl}/data/engine/${id}/`)
      );
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async createEngine(): Promise<void> {
    try {
      this.engine = await firstValueFrom(
        this.httpClient.post<Engine>(`${environment.apiUrl}/data/engine/`, {})
      );
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async uploadEngineCSV(file: File, forTesting: boolean): Promise<void> {
    try {
      let formData: FormData = new FormData();
      formData.append('file', file, file.name);
      let query: HttpParams = new HttpParams();
      query = query.set('for_testing', forTesting);
      await firstValueFrom(
        this.httpClient.post(
          environment.apiUrl + '/data/loadFromCSV/',
          formData,
          { params: query }
        )
      );
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async getLifetime(): Promise<ExpectedLifetime> {
    if (this.engine)
      return firstValueFrom(
        this.httpClient.get<ExpectedLifetime>(
          `${environment.apiUrl}/prediction/${this.engine.id}/`
        )
      );
    else return Promise.reject();
  }

  public async getHistory(): Promise<PredictionHistory> {
    if (this.engine)
      return firstValueFrom(
        this.httpClient.get<PredictionHistory>(
          `${environment.apiUrl}/prediction/history/${this.engine.id}/`
        )
      );
    else return Promise.reject();
  }

  public async uploadCycles(file: File): Promise<void> {
    try {
      let formData: FormData = new FormData();
      formData.append('file', file, file.name);
      await firstValueFrom(
        this.httpClient.post(
          `${environment.apiUrl}/data/cyclesFromFile/${this.engine!.id}/`,
          formData
        )
      );
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async trainModel(
    epochs: number,
    batchSize: number,
    learningRate: number,
    dropout: number
  ): Promise<TrainResult> {
    return firstValueFrom(
      this.httpClient.post<TrainResult>(
        environment.apiUrl + '/prediction/train/',
        {
          epochs: epochs,
          batchSize: batchSize,
          learningRate: learningRate,
          dropout: dropout,
        }
      )
    );
  }

  public async addCycle(
    settings: Array<number>,
    sensors: Array<number>,
    hasFailed: boolean
  ): Promise<void> {
    let params: HttpParams = new HttpParams();
    params = params.set('has_failed', hasFailed);
    return firstValueFrom(
      this.httpClient.post<void>(
        `${environment.apiUrl}/data/cycle/${this.engine!.id}/`,
        {
          setting1: settings[0],
          setting2: settings[1],
          setting3: settings[2],
          sensorValues: sensors,
        },
        { params: params }
      )
    );
  }
}
