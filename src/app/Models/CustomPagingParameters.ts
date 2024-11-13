import { KeyValueList } from "./KeyValueList";


export class CustomPagingParameters {
    pageIndex?: number | null; //current page
    pageSize?: number | null; // items per page
    sortOrder?: string | null; //right now it contains sortKey and order we can split them based on the our need- IdAsc - IdDesc
    sortKey?: string | null; //right now it contains sortKey and order we can split them based on the our need- IdAsc - IdDesc


    // Order?: string | null;
    search?: string | null; //global search if needed
    isDeleted?: boolean | null; //global filter for active items 
    dynamicFilters?: KeyValueList | null; //global filter for any table columns will contains columnDbName and value for it's filter 

    constructor() {
        this.pageIndex = 1;
        this.pageSize = 25;
        this.sortOrder = null;
        this.sortKey = null;
        this.search = null;
        this.isDeleted = null;
        this.dynamicFilters = null;
    }

}
