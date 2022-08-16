
import { LinearProgress } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import * as React from 'react';
import { PokemonList } from '../../types/pokemon';
import { Column, Pagination } from '../../types/table';
import LoadingSkeleton from './LoadingSkeleton';
import TBody from './TBody';
import THead from './THead';

const columns: Column[] = [
  { id: 'name', label: 'Name', minWidth: 170 }
];

interface ITableProps {
  pokemons: PokemonList[],
  isLoading: boolean;
  isPaginationLoading: boolean;
  totalRecords: number;
  pagination: Pagination;
  isComparing?: boolean;
  handleCheckBox?: (e: React.ChangeEvent<HTMLInputElement>, item: PokemonList) => void;
  handlePaginationChange: (pagination: Pagination) => void;
  onFavouriteRemoved?: (items: PokemonList[]) => void;
}

export default function PokemonTable({
  pokemons,
  isLoading,
  isPaginationLoading,
  pagination,
  handlePaginationChange,
  totalRecords,
  handleCheckBox,
  isComparing = false,
  onFavouriteRemoved
}: ITableProps) {

  const handleChangePage = (event: unknown, newPage: number) => {
    handlePaginationChange({
      ...pagination,
      page: newPage
    });
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    handlePaginationChange({
      ...pagination,
      rowsPerPage: parseInt(event.target.value)
    });
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 800 }}>
        <Table stickyHeader>
          <THead columns={columns} isComparing={isComparing}
          />
          <TableBody>
            {
              isLoading
                ? <LoadingSkeleton rowsPerPage={pagination.rowsPerPage} />
                : <TBody
                  pokemons={pokemons}
                  isLoading={isLoading}
                  columns={columns}
                  isComparing={isComparing}
                  handleCheckBox={handleCheckBox}
                  onFavouriteRemoved={onFavouriteRemoved}
                />
            }
          </TableBody>
        </Table>
      </TableContainer>
      {
        pokemons.length > 1 && (
          <TablePagination
            rowsPerPageOptions={[10, 20, 30, 40, 50]}
            component="div"
            count={totalRecords}
            rowsPerPage={pagination.rowsPerPage}
            page={pagination.page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        )
      }
      {
        isPaginationLoading && <LinearProgress />
      }
    </Paper>
  );
}