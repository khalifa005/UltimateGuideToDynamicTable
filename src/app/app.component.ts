import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Config, Columns, DefaultConfig, APIDefinition, STYLE } from 'ngx-easy-table';
import { CustomColumn } from './Models/CustomColumns';
import { CustomPagingParameters } from './Models/CustomPagingParameters';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { KeyValueList } from './Models/KeyValueList';
import { apiDataItems } from './FakeApiData/ApiDataItems';
import { apiColumns } from './FakeApiData/ApiColumns';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @ViewChild('textCellTemplate', { static: true }) textCellTemplate: TemplateRef<any>;
  @ViewChild('htmlCellTemplate', { static: true }) htmlCellTemplate: TemplateRef<any>;
  @ViewChild('dateTemplate', { static: true }) dateTemplate: TemplateRef<any>;
  @ViewChild('multiInfoCellTemplate', { static: true }) multiInfoCellTemplate: TemplateRef<any>;
  @ViewChild('mediaTemplate', { static: true }) mediaIndicatorIconTemplate: TemplateRef<any>;
  @ViewChild('actionTemplate', { static: true }) actionIconTemplate: TemplateRef<any>;

  @ViewChild('table') table: APIDefinition;

  public configuration: Config;
  public columns: Columns[];
  public columnsCopy: Columns[];
  public data: any[];

  public selectedRowsIds: number[] = [];
  paginationParam: any;
  // public customPagingParameters: CustomPagingParameters = new CustomPagingParameters();
  // apiCustomColumns!: CustomColumn[];

  filterValues: { [key: string]: any } = {};
  public paginationTotalItems: number;
  checked = new Set<string>();

  public apiCustomColumns: any[];

  constructor(private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.configuration = { ...DefaultConfig };

    // this.configuration.isLoading = true;
    this.configuration.showContextMenu = false;
    // this.configuration.resizeColumn = true;
    // this.configuration.columnReorder = true;
    this.configuration.fixedColumnWidth = true;
    this.configuration.tableLayout.hover = false;
    this.configuration.tableLayout.striped = true;
    this.configuration.tableLayout.style = STYLE.TINY;
    this.configuration.tableLayout.borderless = false;
    this.configuration.checkboxes = true;
    this.configuration.serverPagination = true;
    this.configuration.horizontalScroll = true;
    // this.configuration.isLoading = false;

    this.apiCustomColumns = apiColumns;
    //because our api won't match with the ngx table format
    this.prepareDynamicColumns();
    this.data = apiDataItems;

    this.paginationParam = {
      ...this.paginationParam,
      limit: 5,
      offset: 1,
      count: this.apiCustomColumns.length,
    };


    this.configuration.isLoading = false;
  }

  prepareDynamicColumns() {
    let mappedColumns: Columns[] = [];

    if (this.apiCustomColumns) {

      this.apiCustomColumns.forEach(column => {

        let mappedColumn: Columns = {
          key: column.key,
          // cssClass: { includeHeader: false, name: 'fw-bold mt-1 mb-1 pt-1 pb-1' },
          title: column.title,
          // width: column.width,//'5%'
          cellTemplate: this.selectTemplateForKey(column.cellTemplateKey),
          // I will use custom filter - this to make the filter template next to the header title
          // headerActionTemplate: this.customHeaderActionTemplate,
        };

        mappedColumns.push(mappedColumn);
      });
    }

    this.columns = mappedColumns;
    this.columnsCopy = mappedColumns;
    this.initializeCheckedColumns();
  }

  selectTemplateForKey(templateKey: string): TemplateRef<any> {
    // Return specific templates based on template keys; use default template for general cases
    switch (templateKey) {
      case 'text':
        return this.textCellTemplate;
      case 'html':
        return this.htmlCellTemplate;
      case 'date':
        return this.dateTemplate;
      case 'multiInfo':
        return this.multiInfoCellTemplate;
      case 'media':
        return this.mediaIndicatorIconTemplate;
      case 'action':
        return this.actionIconTemplate;
      default:
        return this.textCellTemplate;
    }
  }

  displyNewLine(columnKey: any, row: any): string[] {

    let matchedColumn = this.apiCustomColumns.find(x => x.key === columnKey);
    
    if (matchedColumn?.relatedFields) {
      let result = matchedColumn?.relatedFields.split(',');
      return result;
    }
    else {
      return [];
    }
  }

  sanitizeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  rowSelected(row: any): void {
    if (row && row.id) {

      const doesItemExisit = this.selectedRowsIds.includes(row.id);
      if (doesItemExisit) {
        this.selectedRowsIds = this.selectedRowsIds.filter(id => id !== row.id);
      }
      else {
        this.selectedRowsIds.push(row.id);
      }
    }
  }

  initializeCheckedColumns(): void {
    // Initialize all columns as checked
    this.checked = new Set(this.columnsCopy.map(column => column.key));
  }

  toggleVisibilityOfColumns(name: string): void {
    this.checked.has(name) ? this.checked.delete(name) : this.checked.add(name);
    this.columns = this.columnsCopy.filter((column) => this.checked.has(column.key));
  }

  // Handle the click event on a table row
  eventEmitted(event: { event: string; value: any }): void {
    if (event.event === 'onSelectAll') {

    }

    if (event.event === 'onCheckboxSelect') {
    }

    if (event.event !== 'onClick') {
      this.parseEvent(event);
    }
  }

  //to get the sorting and pagination  event of the grid
  private parseEvent(obj: any): void {

    if (obj.event === "onPagination") {

      this.paginationParam.limit = obj.value.limit ? obj.value.limit : this.paginationParam.limit;
      // this.customPagingParameters.pageSize = obj.value.limit ? obj.value.limit : this.paginationParam.limit;
      this.paginationParam.offset = obj.value.page ? obj.value.page : this.paginationParam.offset;
      // this.customPagingParameters.pageIndex = obj.value.page ? obj.value.page : 1;

      this.paginationParam = { ...this.paginationParam };
    }

    if (obj.event === "onOrder") {

      this.paginationParam.sort = !!obj.value.key ? obj.value.key : this.paginationParam.sort;
      let matchedSortItem = this.apiCustomColumns.find(x => x.key === this.paginationParam.sort);

      // this.customPagingParameters.sortKey = matchedSortItem?.key!;

      this.paginationParam.order = !!obj.value.order ? obj.value.order : this.paginationParam.order;
      // this.customPagingParameters.sortOrder = this.paginationParam.order;

    }

    if (obj.event === "onCheckboxSelect") {

      if (obj.value && this.data && obj.value.row && obj.value.row.id) {

        const doesIdExisit = this.selectedRowsIds.includes(obj.value.row.id);
        if (doesIdExisit) {
          this.selectedRowsIds = this.selectedRowsIds.filter(code => code !== obj.value.row.id);
        }
        else {
          this.selectedRowsIds.push(obj.value.row.id);
        }

      }
    }

    if (obj.event === "onSelectAll") {

      if (obj.value && this.data) {
        this.selectedRowsIds = this.data.map(item => item.id as number);
      }
      else {
        this.selectedRowsIds = [];
      }
    }


  }

  onFilterChange(key: string, value: any) {
    this.filterValues[key] = value;
    console.log('filterValues:', this.filterValues);
  }

  filterClicked(): void {
    const keyValueListConverted = new KeyValueList();

    Object.entries(this.filterValues).forEach(([key, value]) => {

      let matchedFilterColumnItem = this.apiCustomColumns.find(x => x.key === key)

      if (value) {

        keyValueListConverted
        .addItem(key,
          `${matchedFilterColumnItem?.filterFieldDBName ?? key} = '${value}' `);

      } else {
        keyValueListConverted
          .addItem(key, ``);
      }
    });

    let dynamicFilters = keyValueListConverted;
    console.log('dynamicFilters', dynamicFilters);

  }

  resetFilters(): void {
    this.filterValues = {};  // Clear the filter values
    this.apiCustomColumns.forEach(column => {
      // Reset individual filters if needed
      const element = document.getElementById(column.id) as HTMLInputElement;
      if (element) {
        element.value = '';  // Clear the input field
      }
    });
    console.log('Filters reset:', this.filterValues);
    this.initializeCheckedColumns();
    this.columns = [...this.columnsCopy];  // Restore all columns to be visible
    this.filterClicked(); // Optionally, re-apply filters if needed
  }



}