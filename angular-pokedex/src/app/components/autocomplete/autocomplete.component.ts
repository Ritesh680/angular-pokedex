import { Component, OnInit, Input } from '@angular/core';
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
  @Input() handleSelection!: (id: string) => void;
  filteredOptions!: Observable<DropdownOptions[]>;

  ngOnInit() {
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

  getSelectedPokemonId(value: string) {
    const pokemon = this.options.find((option) => option.label == value);
    return pokemon?.value;
  }

  handleSelect(e: any) {
    const id = this.getSelectedPokemonId(e.source.value);
    console.log(e);

    this.handleSelection(id as string);
  }
}
