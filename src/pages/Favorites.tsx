import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Alert, Tooltip } from '@mui/material';
import { useCallback, useState } from 'react';
import { useNavigate } from "react-router-dom";
import ContainerLayout from '../components/Layout/ContainerLayout';
import PokemonTable from '../components/PokemonTable';
import { LOCALSTORAGE_KEY } from '../services/api';
import { PokemonList } from '../types/pokemon';
import { Pagination } from '../types/table';

const PAGE_LIMIT = 10;

export default function Favorites() {
  let navigate = useNavigate();
  const [pagination, setPagination] = useState({
    rowsPerPage: PAGE_LIMIT,
    page: 0
  });

  const [favorites, setFavorites] = useState<PokemonList[]>(localStorage.getItem(LOCALSTORAGE_KEY) ? JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY) || '[]') : []);

  const handlePaginationChange = useCallback(async (newPagination: Pagination) => {
    setPagination(newPagination);
  }, [pagination]);


  const onFavouriteRemoved = (items: PokemonList[]) => {
    setFavorites(items);
  }

  return (
    <ContainerLayout>
      <Tooltip
        title="Back"
      >
        <ArrowBackIcon
          onClick={() => navigate("/")}
          color="primary"
          sx={{
            marginBottom: 2,
            cursor: "pointer"
          }} />
      </Tooltip>
      <PokemonTable
        pokemons={favorites}
        isLoading={false}
        isPaginationLoading={false}
        pagination={pagination}
        handlePaginationChange={handlePaginationChange}
        totalRecords={favorites.length}
        onFavouriteRemoved={onFavouriteRemoved}
      />
    </ContainerLayout>
  )
}
