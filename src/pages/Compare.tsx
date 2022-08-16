import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, CircularProgress, Grid, Tooltip, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AccordionDetail from "../components/Accordion/AccordionDetail";
import ContainerLayout from '../components/Layout/ContainerLayout';
import { sendGetRequest } from "../services/api";

export default function Compare() {
  let navigate = useNavigate();
  let { search } = useLocation();
  const [isLoading, setIsLoading] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [comparesData, setcomparesData] = useState<any[]>([])

  const loadPokemons = async () => {
    try {
      setIsLoading(true)
      let names = search.split('=')[1].split(',')
      const promises = names.map(name => {
        return sendGetRequest(`/${name}`);
      });
      const data = await Promise.all(promises);
      setcomparesData(data)
    } catch (error) {
      setIsLoading(true)
      setHasError(true)
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadPokemons();
  }, [search])

  return (
    <>
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
            }}
          />
        </Tooltip>
        {
          isLoading
            ? (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: "center",
                  justifyContent: "center",
                  height: "calc(100vh  - 335px)"
                }}>
                <CircularProgress />
              </Box>
            )
            : (
              <Grid container spacing={2}>
                {comparesData.map((item, index) => (
                  <Grid item xs={12} md={6} key={index}>
                    <Typography variant="h6" sx={{ textAlign: "center", marginBottom: "10px", color: "#1976d2" }}>{item.data.name}</Typography>
                    <AccordionDetail pokemonDetails={item.data} />
                  </Grid>
                ))}
              </Grid>
            )
        }
      </ContainerLayout>
    </>
  )
}
