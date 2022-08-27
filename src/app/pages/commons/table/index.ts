export interface TableGridColumn {
  kind: string;
  name: string;
  hidden?: boolean;
  filter?: boolean;
  filterFn?:TableGridColumnFilterFn;
  sort?: boolean;
  transformer?: TableGridColumnTransformer;
  transformerKind?: string;
}

export declare interface TableGridColumnTransformer {
  apply(input: any): any;
}
export declare interface TableGridColumnFilterFn {
  apply(input: any): any;
}
