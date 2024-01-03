import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [MatPaginatorModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css',
})
export class PaginationComponent {
  @Input() totalCount!: number;
  @Input() pageSize!: number;
  @Output() handlePageChange = new EventEmitter<PageEvent>();

  handlePagination(e: PageEvent) {
    this.handlePageChange.emit(e);
  }
}
