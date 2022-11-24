import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ICRUD} from "./icrud";

export abstract class CRUD<T, I> implements ICRUD<T, I> {

  protected constructor(
    protected http: HttpClient,
    public url: string
  ) {
  }

  index(params: any): Observable<I> {
    return this.http.get<I>(`${this.url}`, {
      params: {
        ...params,
      },
    });
  }

  create(params?: any): Observable<any> {
    return this.http.get<any>(this.url + '/create', {
      params: {
        ...params
      }
    });
  }

  show(
    id: number | string,
    params?: any,
    additionalUrl?: string
  ): Observable<T> {
    return this.http.get<T>(
      `${this.url}/${id}` + (additionalUrl ? '/' + additionalUrl : ''),
      {
        params: {
          ...params,
        },
      }
    );
  }

  update(id: number | string, t: T, params?: any): Observable<T> {
    return this.http.patch<T>(
      `${this.url}/${id}`,
      {...t},
      {
        params: {
          ...params,
        },
      }
    );
  }

  delete(id: number | string, params?: any): Observable<T> {
    return this.http.delete<T>(`${this.url}/${id}`, {
      params: {
        ...params,
      },
    });
  }
}
