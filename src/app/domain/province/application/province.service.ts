import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

const API_URL = 'https://www.el-tiempo.net/api/json/v2/provincias'

@Injectable({
  providedIn: 'root'
})
export class ProvinceService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get<any>(API_URL)
  }

  getById(id: string): Observable<any> {
    return this.http.get<any>(`${API_URL}/${id}`)
  }
}
