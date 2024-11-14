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
  // paginationParam: any;
  paginationParam: any = {
    limit: 5,
    offset: 1,
    count: 0,
    sortColumnKey: '',
    sortOrder: ''
  };
  filterValues: { [key: string]: any } = {};
  public paginationTotalItems: number;
  checked = new Set<string>();
  public apiCustomColumns: any[];

  constructor(private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.initializeTableConfig();

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
  }

  initializeTableConfig(): void {
    this.configuration = { ...DefaultConfig };
    // this.configuration.isLoading = true;

    this.configuration.showContextMenu = false;
    this.configuration.resizeColumn = false;
    this.configuration.columnReorder = true;
    this.configuration.fixedColumnWidth = false;
    this.configuration.tableLayout.hover = true;
    this.configuration.tableLayout.striped = true;
    this.configuration.tableLayout.style = STYLE.NORMAL;
    this.configuration.tableLayout.borderless = false;
    this.configuration.checkboxes = true;
    this.configuration.serverPagination = true;
    this.configuration.horizontalScroll = false;
  }

  prepareDynamicColumns() {
    this.columns = this.apiCustomColumns.map(column => ({
      key: column.key,
      title: column.title,
      cellTemplate: this.selectTemplateForKey(column.cellTemplateKey)
      // cssClass: { includeHeader: false, name: 'fw-bold mt-1 mb-1 pt-1 pb-1' },
      // I will use custom filter - this to make the filter template next to the header title
      // headerActionTemplate: this.customHeaderActionTemplate,
    }));

    this.columnsCopy = this.columns;
    this.initializeCheckedColumns();
  }

  selectTemplateForKey(templateKey: string): TemplateRef<any> {
    // Return specific templates based on template keys; use default template for general cases
    switch (templateKey) {
      case 'textCellTemplate':
        return this.textCellTemplate;
      case 'htmlCellTemplate':
        return this.htmlCellTemplate;
      case 'dateCellTemplate':
        return this.dateTemplate;
      case 'multiInfoCellTemplate':
        return this.multiInfoCellTemplate;
      case 'mediaCellTemplate':
        return this.mediaIndicatorIconTemplate;
      case 'actionCellTemplate':
        return this.actionIconTemplate;
      default:
        return this.textCellTemplate;
    }
  }

  displyNewLinex(columnKey: any, row: any): string[] {

    let matchedColumn = this.apiCustomColumns.find(x => x.key === columnKey);

    if (matchedColumn?.relatedFields) {
      let result = matchedColumn?.relatedFields.split(',');
      return result;
    }
    else {
      return [];
    }
  }

  displayNewLine(columnKey: any, row: any): { label: string; fieldKey: string }[] {
    let matchedColumn = this.apiCustomColumns.find(x => x.key === columnKey);

    // Return relatedFields directly if available, otherwise an empty array
    return matchedColumn?.relatedFields || [];
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

  // Handles click events on a table row
  handleTableRowClick(event: { event: string; value: any }): void {
    switch (event.event) {
      case 'onSelectAll':
        this.handleSelectAll(event.value);
        break;
      case 'onCheckboxSelect':
        this.handleCheckboxSelect(event.value);
        break;
      case 'onClick':
        break;
      default:
        this.processGridEvent(event);
        break;
    }
  }

  // Processes sorting and pagination events for the grid
  private processGridEvent(event: { event: string; value: any }): void {
    switch (event.event) {
      case 'onPagination':
        this.updatePagination(event.value);
        break;
      case 'onOrder':
        this.updateSorting(event.value);
        break;
    }
  }

  // Updates pagination parameters based on the event data
  private updatePagination(data: any): void {
    this.paginationParam.limit = data.limit || this.paginationParam.limit;
    this.paginationParam.offset = data.page || this.paginationParam.offset;
    this.paginationParam = { ...this.paginationParam };
  }

  // Updates sorting parameters based on the event data
  private updateSorting(data: any): void {
    this.paginationParam.sortColumnKey = data.key || this.paginationParam.sortColumnKey;
    const matchedSortItem = this.apiCustomColumns.find(col => col.key === this.paginationParam.sort);
    this.paginationParam.sortOrder = data.order || this.paginationParam.sortOrder;
  }

  // Handles selection of a single row checkbox
  private handleCheckboxSelect(data: any): void {
    if (data?.row?.id) {
      const rowId = data.row.id;
      const idIndex = this.selectedRowsIds.indexOf(rowId);

      if (idIndex !== -1) {
        this.selectedRowsIds.splice(idIndex, 1); // Deselect row
      } else {
        this.selectedRowsIds.push(rowId); // Select row
      }
    }
  }

  // Handles selection or deselection of all rows
  private handleSelectAll(data: any): void {
    this.selectedRowsIds = data ? this.data.map(item => item.id as number) : [];
  }

}