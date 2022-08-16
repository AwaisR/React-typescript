import { Grid, Typography } from '@mui/material';
import { Fragment } from 'react';
import AccordionSection from './Accordion';
import AccordionBody from './AccordionBody';

export default function AccordionDetail({ pokemonDetails }: any) {

  function capitalize(string: string) {
    return string.split("_").join(' ').toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  return (
    <>
      {
        pokemonDetails && <>
          <AccordionSection name='Abilities'>
            <Grid container spacing={2}>
              {pokemonDetails && pokemonDetails?.abilities?.map(({ ability, slot }: any, index: number) => (
                <AccordionBody ability={ability.name} slot={slot} key={index} />
              ))}
            </Grid>
          </AccordionSection>
          <AccordionSection name='Species'>
            <Grid container spacing={2}>
              <Grid item xs={6} md={6}>
                <Typography sx={{ fontWeight: 'bold', fontSize: "14px" }} gutterBottom>
                  Names
                </Typography>
              </Grid>
              <Grid item xs={6} md={6}>
                <Typography gutterBottom sx={{ color: "#858484" }} >
                  {pokemonDetails?.species?.name}
                </Typography>
              </Grid>
            </Grid>
          </AccordionSection>
          <AccordionSection name='Forms'>
            <Grid container spacing={2}>
              {pokemonDetails && pokemonDetails?.forms?.map(({ name }: any, index: number) => (
                <Fragment key={index}>
                  <Grid item xs={6} md={6} >
                    <Typography sx={{ fontWeight: 'bold', fontSize: "14px" }} gutterBottom>
                      Name
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <Typography gutterBottom sx={{ color: "#858484" }} >
                      {name}
                    </Typography>
                  </Grid>
                </Fragment>
              ))}
            </Grid>
          </AccordionSection>
          <AccordionSection name='Game Indices'>
            <Grid container>
              {pokemonDetails && pokemonDetails?.game_indices?.map(({ version }: any, index: number) => (
                <Fragment key={index}>
                  <Grid item xs={6} md={3}>
                    <ul>
                      <li>{version.name}</li>
                    </ul>
                  </Grid>
                </Fragment>
              ))}
            </Grid>
          </AccordionSection>
          <AccordionSection name='Stats'>
            <Grid container>
              {pokemonDetails && pokemonDetails?.stats?.map(({ stat, base_stat, effort }: any, index: number) => (
                <Fragment key={index}>
                  <Grid item xs={4} md={1} >
                    <Typography sx={{ fontWeight: 'bold', fontSize: "14px" }} gutterBottom>
                      Name
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={4}>
                    <Typography gutterBottom sx={{ color: "#858484" }} >
                      {stat.name}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={2}>
                    <Typography sx={{ fontWeight: 'bold', fontSize: "14px" }} gutterBottom>
                      Base Stat
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={1}>
                    <Typography gutterBottom sx={{ color: "#858484" }} >
                      {base_stat}
                    </Typography>
                  </Grid>

                  <Grid item xs={6} md={2}>
                    <Typography sx={{ fontWeight: 'bold', fontSize: "14px" }} gutterBottom>
                      Effort
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={2}>
                    <Typography gutterBottom sx={{ color: "#858484" }} >
                      {effort}
                    </Typography>
                  </Grid>
                </Fragment>
              ))}
            </Grid>
          </AccordionSection>
          <AccordionSection name='Types'>
            <Grid container spacing={2}>
              {pokemonDetails && pokemonDetails?.types?.map(({ slot, type }: any, index: number) => (
                <AccordionBody key={index} ability={type.name} slot={slot} />
              ))}
            </Grid>
          </AccordionSection>
          <AccordionSection name='Sprites'>
            <Grid container spacing={2}>
              {
                pokemonDetails.sprites && Object.entries(pokemonDetails?.sprites).map(([key, value]: [string, any], index: number) => (
                  <Fragment key={index}>
                    {
                      typeof value === "string"
                      && <Grid item xs={6} md={4}>
                        <Typography sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
                          <img
                            src={`${value}`}
                            alt={key}
                            loading="lazy"
                          />
                          <Typography gutterBottom sx={{ fontSize: "14px" }}>
                            {capitalize(key)}
                          </Typography>
                        </Typography>
                      </Grid>
                    }
                  </Fragment>
                ))
              }
            </Grid>
          </AccordionSection>
        </>
      }
    </>
  )
}
