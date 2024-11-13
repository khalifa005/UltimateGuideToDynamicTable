// CustomColumn.ts
export class CustomColumn {
    id: string;
    key: string;
    title: string;
    placeholder: string | null;
    width: number | null;
    order: number;
    fieldType: string;
    filterType: string;
    cellTemplateKey: string | null;
    relatedFields: string | null;
    filterOptions: any[] | null;

    constructor(
        id: string,
        key: string,
        title: string,
        placeholder: string | null = null,
        width: number | null = null,
        order: number = 0,
        fieldType: string = "-1",
        filterType: string = "2",
        cellTemplateKey: string | null = null,
        relatedFields: string | null = null,
        filterOptions: any[] | null = null
    ) {
        this.id = id;
        this.key = key;
        this.title = title;
        this.placeholder = placeholder;
        this.width = width;
        this.order = order;
        this.fieldType = fieldType;
        this.filterType = filterType;
        this.cellTemplateKey = cellTemplateKey;
        this.relatedFields = relatedFields;
        this.filterOptions = filterOptions;
    }
}


