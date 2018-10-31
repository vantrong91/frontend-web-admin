import { SearchModel } from "../models/search.model";
import { Observable } from "rxjs";
import { CategoryViewModel } from "../models/category.model";

export interface ICategoryService{
    Get(entity: SearchModel): Observable<any>;
    Put(entity: CategoryViewModel): Observable<any>;
    GetById(pk: number): Observable<any>;
}