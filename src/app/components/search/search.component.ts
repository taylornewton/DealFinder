import { Component, OnInit } from '@angular/core';
import { PropertyService } from '../../services/property.service';
import { FileProcessingService } from '../../services/file-processing.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  fileError = '';

  constructor(private _fileService: FileProcessingService,
    private _propertyService: PropertyService) { }

  ngOnInit() {
  }

  fileChangeListener($event) {
    let files = $event.srcElement.files;
    if(!this._fileService.isCSV(files[0])){
      this.fileError = 'Invalid file type. Please upload a .csv file.'
      this.fileReset();
    }
  }

  fileReset() {

  }
}
