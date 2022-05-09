import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-dropzone',
  templateUrl: './dropzone.component.html',
  styleUrls: ['./dropzone.component.scss'],
})
export class DropzoneComponent implements OnInit {
  private selectedFile: File | undefined = undefined;

  @Output() fileChanged: EventEmitter<File | undefined> = new EventEmitter<
    File | undefined
  >();
  constructor() {}

  ngOnInit(): void {}

  public dropFile(event: any): void {
    let file: File | undefined = event.target.files[0];
    this.selectedFile = file;
    this.fileChanged.next(this.selectedFile);
  }
}
