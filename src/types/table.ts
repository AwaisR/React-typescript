export interface Pagination {
  rowsPerPage: number;
  page: number;
};

export interface Column {
  id: 'name';
  label: string;
  minWidth?: number;
  align?: 'right';
};