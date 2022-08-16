import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Checkbox, Skeleton, TableCell, TableRow, Tooltip } from '@mui/material';
import { Fragment, useState } from 'react';
import { LOCALSTORAGE_KEY } from '../../services/api';
import { PokemonList } from '../../types/pokemon';
import { Column } from '../../types/table';
import PokemonDetails from './PokemonDetails';

interface TBodyInterface {
  pokemons: PokemonList[],
  isLoading: boolean,
  columns: Column[],
  isComparing: boolean,
  handleCheckBox?: (e: React.ChangeEvent<HTMLInputElement>, item: PokemonList) => void;
  onFavouriteRemoved?: (items: PokemonList[]) => void;
};

function TBody({ pokemons, isLoading, columns, isComparing, handleCheckBox, onFavouriteRemoved }: TBodyInterface) {
  const [selectedPokemon, setSelectedPokemon] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<PokemonList[]>(localStorage.getItem(LOCALSTORAGE_KEY) ? JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY) || '[]') : []);
  const toggleDrawer = (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setSelectedPokemon(null);
  };

  const addToFavorites = (item: PokemonList) => {
    const updatedFavorites = [...favorites, item];
    saveFavorites(updatedFavorites);
  }

  const removeFromFavorites = (item: PokemonList) => {
    const updatedFavorites = favorites.filter((fav: PokemonList) => fav.name !== item.name);
    saveFavorites(updatedFavorites);
    if (onFavouriteRemoved) {
      onFavouriteRemoved(updatedFavorites);
    }
  }

  const saveFavorites = (items: PokemonList[]) => {
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(items));
    setFavorites(items);
  }

  const isAddedToFavorites = (item: PokemonList) => {
    return !!favorites.find((fav: PokemonList) => fav.name === item.name);
  };

  return (
    <>
      {pokemons.length
        ? pokemons.map((row, index) => (
          <TableRow hover key={index}>
            {columns.map((column, index) => {
              const value = row[column.id];
              return (
                <Fragment key={index}>
                  {
                    isLoading
                      ? <Skeleton />
                      : <TableCell key={column.id} align={column.align}>
                        {
                          isComparing &&
                          <Checkbox
                            color="primary"
                            onChange={(e) => handleCheckBox && handleCheckBox(e, row)}
                          />
                        }
                        {value}
                      </TableCell>
                  }
                </Fragment>
              );
            })}
            <TableCell align="right">
              <Tooltip title="View details">
                <VisibilityIcon color="primary"
                  sx={{ cursor: "pointer", marginRight: 2 }}
                  onClick={() => setSelectedPokemon(row.name)}
                />
              </Tooltip>
              {
                isAddedToFavorites(row)
                  ? <Tooltip title="remove from favorite">
                    <FavoriteRoundedIcon
                      color="primary"
                      onClick={() => removeFromFavorites(row)}
                      sx={{
                        cursor: "pointer"
                      }}
                    />
                  </Tooltip>
                  : <Tooltip title="Add to favorite">
                    <FavoriteBorderOutlinedIcon
                      color="primary"
                      onClick={() => addToFavorites(row)}
                      sx={{
                        cursor: "pointer"
                      }}
                    />
                  </Tooltip>
              }
            </TableCell>
          </TableRow>
        ))
        : (
          <TableRow hover>
            <TableCell colSpan={2} align='center'>
              No records found.
            </TableCell>
          </TableRow>
        )
      }
      <PokemonDetails pokemon={selectedPokemon} toggleDrawer={toggleDrawer} />
    </>
  )
}

export default TBody;