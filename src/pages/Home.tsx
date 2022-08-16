import { Alert, TextField, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import AdditionalActions from '../components/AdditionalActions/AdditionalActions';
import ContainerLayout from '../components/Layout/ContainerLayout';
import PokemonTable from '../components/PokemonTable';
import useDebounce from '../customHooks/useDebounce';
import { sendGetRequest } from '../services/api';
import { PokemonList } from '../types/pokemon';
import { Pagination } from '../types/table';

const PAGE_LIMIT = 10;

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPokemons, setselectedPokemons] = useState<String[]>([]);
  const [pokemons, setPokemons] = useState<PokemonList[]>([]);
  const [hasError, setHasError] = useState(false);
  const [totalRecords, setTotalRecords] = useState(0);
  const [isComparing, setIsComparing] = useState(false);
  const [pagination, setPagination] = useState({
    rowsPerPage: PAGE_LIMIT,
    page: 0,
  });
  const [isPaginationLoading, setIsPaginationLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const loadData = useCallback(async (showSkeleton = true, paginationData = pagination, search: string | null = null) => {
    if (showSkeleton) setIsLoading(true);
    try {
      let url = `?limit=${paginationData.rowsPerPage}&offset=${paginationData.page}`;
      if (search) {
        url += `&query=${search}`;
      }
      const { data } = await sendGetRequest(url);
      setTotalRecords(data.count)
      setPokemons(data.results);
    } catch (error) {
      setHasError(true);
    } finally {
      setIsLoading(false);
      setIsPaginationLoading(false);
    }
  }, []);

  const handlePaginationChange = useCallback(async (newPagination: Pagination) => {
    setIsPaginationLoading(true);
    setPagination(newPagination);
    await loadData(false, newPagination);
  }, [pagination]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    // NOTE: seems this api doesn't support search but functionality is implemented implemented 
    loadData(false, pagination, debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  const handleCheckBox = (e: React.ChangeEvent<HTMLInputElement>, items: PokemonList) => {
    const checked = e.target.checked
    if (checked) {
      let compareItems = [...selectedPokemons, items.name]
      setselectedPokemons(compareItems);
    } else {
      const removeCompares = selectedPokemons.filter((que: String) => que !== items.name);
      setselectedPokemons(removeCompares)
    }
  }

  const toggleIsComparing = (status: boolean) => {
    setIsComparing(status);
  }
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  }

  return (
    <ContainerLayout>
      <Typography
        component='div'
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 2
        }}>
        <TextField
          label="Search"
          variant="outlined"
          onChange={handleSearchChange}
          sx={{ width: "30%" }}
        />
        <AdditionalActions
          isComparing={isComparing}
          selectedPokemons={selectedPokemons}
          toggleIsComparing={toggleIsComparing}
        />
      </Typography>
      {
        !hasError
          ? <PokemonTable
            pokemons={pokemons}
            isLoading={isLoading}
            isPaginationLoading={isPaginationLoading}
            pagination={pagination}
            handlePaginationChange={handlePaginationChange}
            totalRecords={totalRecords}
            isComparing={isComparing}
            handleCheckBox={handleCheckBox}
          />
          : <Alert severity="error">Something went wrong.</Alert>
      }
    </ContainerLayout>
  )
}
