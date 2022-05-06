import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StateModalService {
  public isVisible: boolean = false;
  public title: string = '';
  public text: string = '';

  constructor() {}

  private open(title: string, text: string): void {
    this.title = title;
    this.text = text;
    this.isVisible = true;
  }

  public success(
    title: string = 'Операция выполнена успешно',
    text: string = ''
  ): void {
    this.open(title, text);
  }

  public fail(
    title: string = 'Не удалось выполнить операцию',
    text: string = ''
  ): void {
    this.open(title, text);
  }

  public close(): void {
    this.isVisible = false;
    this.title = '';
    this.text = '';
  }
}
