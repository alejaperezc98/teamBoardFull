import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  private env: string;

  constructor(private _http: HttpClient, private _router: Router) {
    this.env = environment.APP_URL
   }

   saveTask(board: any){
    return this._http.post<any>(this.env + 'board/saveTask', board)
   }
}
