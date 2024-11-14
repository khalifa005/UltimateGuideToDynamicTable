// CustomColumn.ts

export class CustomColumn {
    id: string;
    key: string;
    title: string;
    placeholder: string | null;
    width: number | null;
    order: number;
    filterType: string;
    cellTemplateKey: string | null;
    relatedFields: string | null;
    filterOptions: any[] | null;
    inlineCSS: string | null; // New property for inline CSS styles
    styleClasses: string | null; // New property for additional style classes

    constructor(
        id: string,
        key: string,
        title: string,
        placeholder: string | null = null,
        width: number | null = null,
        order: number = 0,
        filterType: string = "input",
        cellTemplateKey: string | null = null,
        relatedFields: string | null = null,
        filterOptions: any[] | null = null,
        inlineCSS: string | null = null,
        styleClasses: string | null = null
    ) {
        this.id = id;
        this.key = key;
        this.title = title;
        this.placeholder = placeholder;
        this.width = width;
        this.order = order;
        this.filterType = filterType;
        this.cellTemplateKey = cellTemplateKey;
        this.relatedFields = relatedFields;
        this.filterOptions = filterOptions;
        this.inlineCSS = inlineCSS;
        this.styleClasses = styleClasses;
    }
}

