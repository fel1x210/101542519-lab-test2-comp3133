import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { CharacterFilterComponent } from '../characterfilter/characterfilter.component';
import { HpApiService } from '../../services/hp-api.service';
import { Character } from '../../models/character.model';

@Component({
  selector: 'app-characterlist',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatButtonModule,
    CharacterFilterComponent,
  ],
  templateUrl: './characterlist.component.html',
  styleUrl: './characterlist.component.scss',
})
export class CharacterListComponent implements OnInit {
  characters: Character[] = [];
  loading = false;

  private readonly placeholderImage =
    'https://via.placeholder.com/300x400?text=No+Image';

  constructor(
    private hpApi: HpApiService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadCharacters('');
  }

  onHouseChange(house: string): void {
    this.loadCharacters(house);
  }

  viewDetails(character: Character): void {
    this.router.navigate(['/characters', character.id]);
  }

  getImage(character: Character): string {
    return character.image || this.placeholderImage;
  }

  getHouseDisplay(character: Character): string {
    return character.house || 'No House';
  }

  private loadCharacters(house: string): void {
    this.loading = true;
    this.characters = [];

    const source$ =
      house === ''
        ? this.hpApi.getCharacters()
        : house === 'None'
          ? this.hpApi.getCharacters()
          : this.hpApi.getCharactersByHouse(house);

    source$.subscribe({
      next: (data) => {
        this.characters =
          house === 'None' ? data.filter((c) => !c.house) : data;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.snackBar.open('Failed to load characters. Please try again.', 'Close', {
          duration: 5000,
        });
        console.error('API error:', err);
      },
    });
  }
}
