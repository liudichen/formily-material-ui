import React from 'react';
import { PaginationProps } from '@mui/material';

interface DataGridPaginationProps extends PaginationProps {
  rowsPerPageOptions?: number[],
  onPageSizeChange?: (pageSize: number, details?: object) => void,
}

declare const DataGridPagination: React.FC<DataGridPaginationProps>;

export default DataGridPagination;
