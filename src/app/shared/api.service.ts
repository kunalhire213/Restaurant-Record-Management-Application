import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http: HttpClient) { }

  // service for get all restaurants data from backend
  getAllData() {
    return this._http.get<any>("http://localhost:3000/restaurant").pipe(map((res: any) => {
      return res;
    }))
  }

  // service for post new data in backend
  postData(data: any) {
    return this._http.post<any>("http://localhost:3000/restaurant", data).pipe(map((res: any) => {
      return res;
    }))
  }

  // service for update existing data
  putData(data: any, id: number) {
    return this._http.put<any>("http://localhost:3000/restaurant/" + id, data).pipe(map((res) => {
      return res;
    }))
  }

  // service for delete the data
  deleteData(id: number) {
    return this._http.delete<any>("http://localhost:3000/restaurant/" + id).pipe(map((res: any) => {
      return res;
    }))
  }
}
