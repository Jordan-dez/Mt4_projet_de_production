import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  baseUrl = 'http://localhost:3030';

  constructor() { }
}
