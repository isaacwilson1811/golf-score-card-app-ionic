import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface StorageChangeAction {
  type: string,
  key: string,
  value: any
}

@Injectable({
  providedIn: 'root'
})
export class PersistentStorageService {

  private prefix = 'GOLFDATA_';
  private storage = localStorage;
  public storageChanges$ = new Subject<StorageChangeAction>();

  constructor() { }

  read( key:string ): any | undefined {
    const value: any = this.storage.getItem(this.prefix + key);
    return value ? JSON.parse(value) : undefined;
  }

  write( key:string, value:any ) {
    this.storage.setItem(this.prefix + key, JSON.stringify(value));
    this.storageChanges$.next({type: 'write', key, value});
  }

  remove( key:string ) {
    const value = null;
    this.storage.removeItem(this.prefix + key);
    this.storageChanges$.next({type: 'remove', key, value});
  }

}
