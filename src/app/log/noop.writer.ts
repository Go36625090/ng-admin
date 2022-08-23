import {Injectable} from "@angular/core";
import {Writer} from "./writer";


@Injectable({
  providedIn: 'root'
})
export class NoopWriter implements Writer{
  write(...data: any[]): void {
    console.log(data);
  }
}
