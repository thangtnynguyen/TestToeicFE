import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { enviroment } from 'src/enviroments/enviroment';

@Injectable({
    providedIn: 'root'
})
export class httpCustomService {
    private baseUrl: string = enviroment.host.baseUrl;

    constructor(private http: HttpClient) { }

    get<T>(endpoint: string, options?: { headers?: HttpHeaders; params?: HttpParams | { [param: string]: string | string[]; } }) {
        return this.http.get<T>(`${this.baseUrl}${endpoint}`, options);
    }

    post<T>(endpoint: string, data: any, options?: { headers?: HttpHeaders }) {
        return this.http.post<T>(`${this.baseUrl}${endpoint}`, data, options);
    }

    put<T>(endpoint: string, data: any, options?: { headers?: HttpHeaders }) {
        return this.http.put<T>(`${this.baseUrl}${endpoint}`, data, options);
    }

    delete<T>(endpoint: string, options?: { headers?: HttpHeaders }) {
        return this.http.delete<T>(`${this.baseUrl}${endpoint}`, options);
    }
    
}
