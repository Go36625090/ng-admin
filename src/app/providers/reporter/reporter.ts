export interface Reporter {
  write(key: string, ...data: any[]):void;
}

