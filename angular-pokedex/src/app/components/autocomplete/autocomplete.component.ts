import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AsyncPipe } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';

interface DropdownOptions {
  label: string;
  value: string | number;
}

@Component({
  selector: 'app-autocomplete',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
  ],
  templateUrl: './autocomplete.component.html',
  styleUrl: './autocomplete.component.css',
})
export class AutoCompleteComponent implements OnInit {
  myControl = new FormControl('');
  @Input() options: DropdownOptions[] = [];
  @Input() label: string = '';
  @Input() disabled: boolean = true;
  @Input() defaultValue = '';

  @Output() handleSelection = new EventEmitter<string>();
  filteredOptions!: Observable<DropdownOptions[]>;
  selectedOption!: DropdownOptions;

  ngOnInit() {
    this.selectedOption = this.getSelectedPokemon(this.defaultValue);
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
  }

  private _filter(value: string): DropdownOptions[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) =>
      option.label.toLowerCase().includes(filterValue)
    );
  }

  getSelectedPokemon(value: string): DropdownOptions {
    const pokemon = this.options.find((option) => option.label == value);
    return pokemon ?? { label: '', value: '' };
  }

  handleSelect(option: DropdownOptions) {
    this.selectedOption = option;
    this.handleSelection.emit(option.value as string);
  }
}
