import { Alert, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface IAdditionalActionsProps {
  isComparing: boolean;
  selectedPokemons: String[];
  toggleIsComparing: (status: boolean) => void;
};

export default function AdditionalActions({ isComparing, selectedPokemons, toggleIsComparing }: IAdditionalActionsProps) {
  let navigate = useNavigate();

  const isCompareDisabled = selectedPokemons.length < 2 || selectedPokemons.length > 3;
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {
        isComparing
          ? <>
            {isCompareDisabled && (selectedPokemons.length < 2 || selectedPokemons.length > 3) && <Alert sx={{ marginRight: 1 }} severity="warning">Please select at least 2 and at most 3 items to compare.</Alert>}
            <Button variant="contained" disabled={isCompareDisabled} onClick={() => navigate(`/compare?name=${selectedPokemons.toString()}`)}>Compare Selected</Button>
            <Button sx={{ marginLeft: 2 }} variant="contained" onClick={() => toggleIsComparing(false)}>Cancel</Button>
          </>
          : <Button variant="contained" onClick={() => toggleIsComparing(true)}>Compare</Button>
      }
    </div>
  )
}
