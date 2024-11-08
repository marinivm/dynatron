import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerModel } from '../models/customer.model';

@Injectable()
export class BaseService {

    protected baseUrl: string = 'http://localhost:5232/api';

    constructor(protected http: HttpClient) { }

    public List(): Observable<any> {
        return this.http.get(this.baseUrl);
    }

    public Get(id: number): Observable<any> {
        return this.http.get(this.baseUrl + `/${id}`);
    }

    public Create(model: any): Observable<any>{        
        return this.http.post(this.baseUrl, model);
    }

    public Update(model: any): Observable<any>{       
        return this.http.put(this.baseUrl + `/${model.id}`, model);
    }

    public Delete(id: number): Observable<any>{       
        return this.http.delete(this.baseUrl + `/${id}`);
    }
}
