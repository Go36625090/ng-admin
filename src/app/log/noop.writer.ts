import {Writer} from "./writer";

export class NoopWriter implements Writer{
  write(...data: any[]): void {
    console.log('noop', ...data);
  }
}
