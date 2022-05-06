import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Engine } from 'src/app/Interfaces/Engine';
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
}
