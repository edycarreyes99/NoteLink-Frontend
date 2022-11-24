import {Observable} from 'rxjs';

export interface ICRUD<T, I> {
  index(params: any): Observable<I>;

  create(params?: any): Observable<any>;

  show?(id: number | string): Observable<T>;

  update(id: number | string, t: T): Observable<T>;

  delete(id: number | string): Observable<any>;
}
