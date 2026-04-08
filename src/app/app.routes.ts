import { Routes } from '@angular/router';
import { CharacterListComponent } from './components/characterlist/characterlist.component';
import { CharacterDetailsComponent } from './components/characterdetails/characterdetails.component';

export const routes: Routes = [
  { path: 'characters', component: CharacterListComponent },
  { path: 'characters/:id', component: CharacterDetailsComponent },
  { path: '', redirectTo: 'characters', pathMatch: 'full' },
];
