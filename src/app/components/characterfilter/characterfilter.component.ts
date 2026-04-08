import { Component, EventEmitter, Output } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-characterfilter',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule],
  templateUrl: './characterfilter.component.html',
  styleUrl: './characterfilter.component.scss',
})
export class CharacterFilterComponent {
  @Output() houseChange = new EventEmitter<string>();

  houses = [
    { value: '', label: 'All Houses' },
    { value: 'Gryffindor', label: 'Gryffindor' },
    { value: 'Slytherin', label: 'Slytherin' },
    { value: 'Hufflepuff', label: 'Hufflepuff' },
    { value: 'Ravenclaw', label: 'Ravenclaw' },
    { value: 'None', label: 'No House' },
  ];

  selectedHouse = '';

  onHouseSelect(value: string): void {
    this.selectedHouse = value;
    this.houseChange.emit(value);
  }
}
