import ClearIcon from '@mui/icons-material/Clear';
import { Alert, Box, CircularProgress, Divider, Typography } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import { useCallback, useEffect, useState } from 'react';
import { sendGetRequest } from '../../services/api';
import AccordionDetail from '../Accordion/AccordionDetail';

interface IPokemonDetails {
  pokemon: string | null;
  toggleDrawer: (open: any) => void;
};

export default function PokemonDetails({ pokemon, toggleDrawer }: IPokemonDetails) {
  const [isLoading, setIsLoading] = useState(false);
  const [pokemonDetails, setPokemonDetails] = useState<any>({})
  const [hasError, setHasError] = useState(false);

  const getPokemonDetails = useCallback(async () => {
    try {
      const { data } = await sendGetRequest(`/${pokemon}`);
      setPokemonDetails(data);
    } catch (error) {
      setHasError(true)
    } finally {
      setIsLoading(false);
    }
  }, [pokemon]);

  useEffect(() => {
    if (pokemon) {
      getPokemonDetails();
    }
  }, [pokemon])

  return (
    <Drawer
      anchor={'right'}
      open={!!pokemon}
      onClose={() => toggleDrawer(false)}
    >
      <Box sx={{ width: { md: '40vw', xs: '90vw' } }}>
        <Typography component='div' sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px" }}>
          <Typography variant='h5' sx={{ color: "#1976d2" }}>
            {pokemonDetails?.name}
          </Typography>
          <ClearIcon color='primary' sx={{ cursor: "pointer" }} onClick={() => toggleDrawer(false)} />
        </Typography>

        <Divider />
        {
          isLoading
            ? <CircularProgress />
            : (
              !hasError
                ? <AccordionDetail pokemonDetails={pokemonDetails} />
                : <Alert severity='error'>Something went wrong.</Alert>
            )
        }

      </Box>
    </Drawer>
  )
}
