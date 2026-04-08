import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, shareReplay } from 'rxjs';
import { Character } from '../models/character.model';

@Injectable({ providedIn: 'root' })
export class HpApiService {
  private readonly baseUrl = 'https://hp-api.onrender.com/api';
  private readonly houseCache = new Map<string, Observable<Character[]>>();
  private readonly characterByIdCache = new Map<string, Observable<Character>>();
  private allCharacters$?: Observable<Character[]>;

  constructor(private http: HttpClient) {}

  getCharacters(): Observable<Character[]> {
    if (!this.allCharacters$) {
      this.allCharacters$ = this.http
        .get<Character[]>(`${this.baseUrl}/characters`)
        .pipe(shareReplay({ bufferSize: 1, refCount: true }));
    }
    return this.allCharacters$;
  }

  getCharactersByHouse(house: string): Observable<Character[]> {
    const key = house.toLowerCase();
    const existing = this.houseCache.get(key);
    if (existing) return existing;

    const req$ = this.http
      .get<Character[]>(`${this.baseUrl}/characters/house/${key}`)
      .pipe(shareReplay({ bufferSize: 1, refCount: true }));
    this.houseCache.set(key, req$);
    return req$;
  }

  getCharacterById(id: string): Observable<Character> {
    const existing = this.characterByIdCache.get(id);
    if (existing) return existing;

    const req$ = this.http
      .get<Character[]>(`${this.baseUrl}/character/${id}`)
      .pipe(
        map((chars) => chars[0]),
        shareReplay({ bufferSize: 1, refCount: true })
      );
    this.characterByIdCache.set(id, req$);
    return req$;
  }
}
