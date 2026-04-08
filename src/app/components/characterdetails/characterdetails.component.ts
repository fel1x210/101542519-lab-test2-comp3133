import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { HpApiService } from '../../services/hp-api.service';
import { Character } from '../../models/character.model';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-characterdetails',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
  ],
  templateUrl: './characterdetails.component.html',
  styleUrl: './characterdetails.component.scss',
})
export class CharacterDetailsComponent implements OnInit {
  character: Character | null = null;
  loading = true;

  private readonly placeholderImage =
    'https://via.placeholder.com/300x400?text=No+Image';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private hpApi: HpApiService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.hpApi
        .getCharacterById(id)
        .pipe(finalize(() => (this.loading = false)))
        .subscribe({
          next: (data) => {
            this.character = data ?? null;
            if (!this.character) {
              this.snackBar.open('Character not found.', 'Close', {
                duration: 4000,
              });
            }
          },
          error: () => {
            this.character = null;
            this.snackBar.open('Failed to load character details.', 'Close', {
              duration: 5000,
            });
          },
        });
    } else {
      this.loading = false;
    }
  }

  getImage(): string {
    return this.character?.image || this.placeholderImage;
  }

  getHouse(): string {
    return this.character?.house || 'No House';
  }

  getWandDisplay(): string {
    if (!this.character?.wand) return 'Unknown';
    const { wood, core, length } = this.character.wand;
    const parts: string[] = [];
    if (wood) parts.push(wood);
    if (core) parts.push(core);
    if (length != null) parts.push(`${length}"`);
    return parts.length ? parts.join(', ') : 'Unknown';
  }

  goBack(): void {
    this.router.navigate(['/characters']);
  }
}
