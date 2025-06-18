import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuditLogService } from '../../../services/audit-log.service';
import { AuditLog } from '../../../models/audit-log';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-audit-logs',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './audit-logs.component.html',
  styleUrls: ['./audit-logs.component.scss']
})
export class AuditLogsComponent implements OnInit {
  auditLogs: AuditLog[] = [];
  totalElements = 0;
  currentPage = 1;
  itemsPerPage = 20;
  totalPages = 1;
  sortBy = 'timestamp';
  sortDir = 'desc';

  expandedRows: Set<number> = new Set();

  auditLogService = inject(AuditLogService);
  notificationService = inject(NotificationService);

  ngOnInit(): void {
    this.loadAuditLogs();
  }

  loadAuditLogs(page = 0, size = this.itemsPerPage): void {
    this.auditLogService.getAllAuditLogs(page, size, this.sortBy, this.sortDir).subscribe({
      next: (response) => {
        this.auditLogs = response.content || [];
        this.totalElements = response.totalElements || 0;
        this.currentPage = response.number + 1;
        this.totalPages = response.totalPages || 1;

        if (this.auditLogs.length === 0 && this.currentPage > 1) {
          this.goToPage(this.currentPage - 1);
        }
      },
      error: (err) => {
        this.notificationService?.handleError('Erro ao carregar logs de auditoria.');
        console.error(err);
      }
    });
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.loadAuditLogs(page - 1, this.itemsPerPage);
  }

  changePageSize(): void {
    this.currentPage = 1;
    this.loadAuditLogs(0, this.itemsPerPage);
  }

  changeSortBy(field: string): void {
    if (this.sortBy === field) {
      this.sortDir = this.sortDir === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortBy = field;
      this.sortDir = 'desc';
    }
    this.currentPage = 1;
    this.loadAuditLogs(0, this.itemsPerPage);
  }

  toggleRowExpansion(logId: number): void {
    if (this.expandedRows.has(logId)) {
      this.expandedRows.delete(logId);
    } else {
      this.expandedRows.add(logId);
    }
  }

  isRowExpanded(logId: number): boolean {
    return this.expandedRows.has(logId);
  }

  formatTimestamp(timestamp: string): string {
    return new Date(timestamp).toLocaleString('pt-BR');
  }

  getActionClass(action: string): string {
    switch (action.toLowerCase()) {
      case 'http_request':
        return 'action-http';
      case 'read_all_groups':
        return 'action-read';
      default:
        return 'action-default';
    }
  }

  getMethodClass(method: string | null): string {
    if (!method) return '';
    switch (method.toLowerCase()) {
      case 'get':
        return 'method-get';
      case 'post':
        return 'method-post';
      case 'put':
        return 'method-put';
      case 'delete':
        return 'method-delete';
      default:
        return 'method-default';
    }
  }

  getPageNumbers(): number[] {
    const pages = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(1, this.currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(this.totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  }

  trackById(index: number, log: AuditLog): number {
    return log.id;
  }

  protected readonly Math = Math;
}
