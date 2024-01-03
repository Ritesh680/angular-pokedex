import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { PaginationComponent } from '../pagination/pagination.component';
import { PageEvent } from '@angular/material/paginator';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  object?: any;
}

type TableHeader<T> = {
  headerLabel: string;
  key: keyof T;
  render?: (item: any, rowData: T) => HTMLElement;
};

const tableHeaders: TableHeader<PeriodicElement>[] = [
  { headerLabel: 'name', key: 'name' },
  { headerLabel: 'weight', key: 'weight' },
  { headerLabel: 'symbol', key: 'symbol' },
  {
    headerLabel: 'Object',
    key: 'object',
    render: (item) => {
      return item?.name;
    },
  },
];

const ELEMENT_DATA: PeriodicElement[] = [
  {
    position: 1,
    name: 'Hydrogen',
    object: { name: 'object example' },
    weight: 1.0079,
    symbol: 'H',
  },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
  selector: 'app-table',
  styleUrls: ['table.component.css'],
  templateUrl: 'table.component.html',
  standalone: true,
  imports: [MatTableModule, CommonModule, PaginationComponent],
})
export class TableComponent implements OnInit {
  @Input() noSN: boolean = false;
  @Input() title: string = 'Static table';

  displayedColumns: string[] = [];
  dataSource = ELEMENT_DATA;
  tableHeaders = tableHeaders;
  perPage: number = 10;
  pageIndex: number = 0;
  tableData: PeriodicElement[] = [];

  ngOnInit(): void {
    this.createColumns();
    this.tableData = [...this.dataSource].slice(0, this.perPage);
  }

  createColumns() {
    const columns: string[] = [];
    this.tableHeaders.map((headers) => columns.push(headers.headerLabel));

    return (this.displayedColumns = columns);
  }

  handlePagination(page: PageEvent) {
    this.pageIndex == page.pageIndex
      ? this.handleTableData(page.pageSize)
      : this.handlePageChange(page.pageIndex);
  }

  handleTableData(perPage: number) {
    const data = [...this.dataSource];
    this.tableData = data.slice(this.pageIndex * perPage, perPage);
    this.perPage = perPage;
  }

  handlePageChange(page: number) {
    const data = [...this.dataSource];
    this.tableData = data.splice(page * this.perPage, this.perPage);
    this.pageIndex = page;
  }
}
