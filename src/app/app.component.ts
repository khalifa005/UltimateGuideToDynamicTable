import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Config, Columns, DefaultConfig, APIDefinition, STYLE, API } from 'ngx-easy-table';
import { apiDataItems } from './FakeApiData/ApiDataItems';
import { apiColumns } from './FakeApiData/ApiColumns';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  public configuration: Config;
  public apiCustomColumns: any[];
  public apiData: any[];
  paginationParam: any = {
    limit: 5,
    offset: 0,
    count: -1,
    sortColumnKey: '',
    sortOrder: ''
  };
  
  constructor(private readonly cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.apiData = apiDataItems;
    this.apiCustomColumns = apiColumns;
  }

  ngAfterViewInit(): void {

  }


}