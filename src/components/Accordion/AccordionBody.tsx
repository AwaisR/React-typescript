import { Grid, Typography } from '@mui/material'

interface AccordionBodyPropsInterface {
  slot: string;
  ability: string;
};

export default function AccordionBody({ slot, ability }: AccordionBodyPropsInterface) {
  return (
    <>
      <Label text='Slot' />
      <Value text={slot} />
      <Label text='Name' />
      <Value text={ability} />
    </>
  )
}

const Label = ({ text }: { text: string }) => (
  <Grid item xs={6} md={3}>
    <Typography sx={{ fontWeight: 'bold', fontSize: "14px" }} gutterBottom>
      {text}
    </Typography>
  </Grid>
);

const Value = ({ text }: { text: string }) => (
  <Grid item xs={6} md={3}>
    <Typography gutterBottom sx={{ color: "#858484" }}>
      {text}
    </Typography>
  </Grid>
);