export interface AuditLog {
  id: number;
  tableName: string | null;
  recordId: string | null;
  action: string;
  timestamp: string;
  endpoint: string;
  httpMethod: string | null;
  userAgent: string | null;
  ipAddress: string | null;
  userId: string;
}

export interface AuditLogResponse {
  content: AuditLog[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}
