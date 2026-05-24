import { Injectable } from '@angular/core';
import { Item } from './item';

@Injectable({
  providedIn: 'root'
})
export class FakeDbService {

  private items: Item[] = [];

  constructor() {
    // for (let i = 1; i <= 200; i++) {
      // this.items.push({
      //   id: i,
      //   title: `Item ${i}`,
      //   image: `https://picsum.photos/80/80?random=${i}`
      // });
    }
  // }

  getItems(page: number, pageSize: number): Promise<Item[]> {
    const start = page * pageSize;
    const end = start + pageSize;

    return Promise.resolve(this.items.slice(start, end));
  }
}