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
  @ViewChild('textCellTemplate', { static: true }) textCellTemplate: TemplateRef<any>;
  @ViewChild('htmlCellTemplate', { static: true }) htmlCellTemplate: TemplateRef<any>;
  @ViewChild('dateCellTemplate', { static: true }) dateTemplate: TemplateRef<any>;
  @ViewChild('multiInfoCellTemplate', { static: true }) multiInfoCellTemplate: TemplateRef<any>;
  @ViewChild('actionCellTemplate', { static: true }) actionIconTemplate: TemplateRef<any>;
  @ViewChild('table') table: APIDefinition;

  public configuration: Config;
  public columns: Columns[];
  public columnsCopy: Columns[];
  public data: any[];
  public selectedRowsIds: number[] = [];
  paginationParam: any = {
    limit: 5,
    offset: 0,
    count: -1,
    sortColumnKey: '',
    sortOrder: ''
  };
  filterValues: { [key: string]: any } = {};
  public paginationTotalItems: number;
  checked = new Set<string>();
  public apiCustomColumns: any[];
  public apiData: any[];

  constructor(private readonly cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.apiData = apiDataItems;

    this.initializeTableConfig();
    this.apiCustomColumns = apiColumns;
    //because our api won't match with the ngx table format
    this.prepareDynamicColumns();
    this.filterClicked(); // Initialize data with pagination
  }

  ngAfterViewInit(): void {
    this.table.apiEvent({
      type: API.setPaginationDisplayLimit,
      value: this.paginationParam.limit,
    });
    this.cdr.detectChanges();
  }

  initializeTableConfig(): void {
    this.configuration = { ...DefaultConfig };
    this.configuration.isLoading = true;
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
      cellTemplate: this.selectTemplateBasedOnKey(column.cellTemplateKey),
      cssClass: { includeHeader: false, name: column.styleClasses ?? column.inlineCSS },
      // I will use custom filter - this to make the filter template next to the header title
      // headerActionTemplate: this.customHeaderActionTemplate,
    }));

    this.columnsCopy = this.columns;
    this.initializeCheckedColumns();
  }

  selectTemplateBasedOnKey(templateKey: string): TemplateRef<any> {
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
      case 'actionCellTemplate':
        return this.actionIconTemplate;
      default:
        return this.textCellTemplate;
    }
  }

  handleNestedFields(columnKey: any, row: any): { label: string; fieldKey: string }[] {
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
    this.configuration.isLoading = true;

    // Filter data based on filter values
    const filteredData = this.apiData.filter(item => {
      // Loop over each key-value pair in the filterValues object
      return Object.entries(this.filterValues).every(([key, value]) => {
        // Assert that `key` is a property of `item`
        const typedKey = key as keyof typeof item;
    
        //in case related data like Price get the related data vales

        // If a filter value exists, check if it matches the item's property value
        return value 
          ? item[typedKey]?.toString().toLowerCase() == value.toString().toLowerCase() 
          : true; // If no filter value, include the item by default
      });
    });
  
    // Update pagination count based on filtered data length
    this.paginationParam.count = filteredData.length;
    // this.paginationParam.limit = this.paginationParam.limit;
  
    // Apply pagination to the filtered data
    this.data = filteredData.slice(
      (this.paginationParam.offset - 1) * this.paginationParam.limit,
      this.paginationParam.offset * this.paginationParam.limit
    );
    
    this.paginationParam= { ...this.paginationParam };
    this.configuration.isLoading = false;
    this.cdr.detectChanges();
  }

  resetFilters(): void {
    this.filterValues = {};  // Clear filter values
    // Reset related field filters, if any
    this.apiCustomColumns.forEach(column => {
      if (column.relatedFields?.length) {
          column.relatedFields.forEach((field:any) => {
              this.filterValues[field.fieldKey] = '';
          });
      } else {
          this.filterValues[column.key] = '';
      }
  });

    this.initializeCheckedColumns();
    this.paginationParam.offset = 1; // Reset to first page
    this.filterClicked(); // Apply reset filters
    this.columns = [...this.columnsCopy];  // Restore all columns to be visible
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
    const params = `_limit=${this.paginationParam.limit}&_page=${this.paginationParam.offset}`; // see https://github.com/typicode/json-server
    this.filterClicked(); // Refresh data with new pagination
  }

  // Updates sorting parameters based on the event data
  private updateSorting(data: any): void {
    this.paginationParam.sortColumnKey = data.key || this.paginationParam.sortColumnKey;
    this.paginationParam.sortOrder = data.order || this.paginationParam.sortOrder;
    this.sortData();
    this.filterClicked(); // Refresh data with new pagination
  }

  sortData(): void {
    const sortKey = this.paginationParam.sortColumnKey as keyof typeof this.apiData[0];
    const sortOrder = this.paginationParam.sortOrder === 'asc' ? 1 : -1;
  
    this.apiData.sort((a, b) => {
      if (a[sortKey] < b[sortKey]) return -1 * sortOrder;
      if (a[sortKey] > b[sortKey]) return 1 * sortOrder;
      return 0;
    });
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

  deleteRow(rowId: number): void {
    // Filter out the row with the matching ID from the data array
    this.apiData = this.apiData.filter(row => row.id !== rowId);

   this.filterClicked(); 
}

}