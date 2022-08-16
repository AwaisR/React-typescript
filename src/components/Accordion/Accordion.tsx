import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';

export default function AccordionSection({ name, children }: any) {
  return (
    <Accordion
      sx={{
        padding: "0px",
        boxShadow: "0px 0px 20px rgb(0 0 0 / 10%) !important",
        overflow: "hidden",
        transition: "all 150ms ease",
        marginBottom: "0px"
      }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon color='primary' />}
      >
        <Typography sx={{ fontWeight: 'bold', color: "#1976d2" }}>{name}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {children}
      </AccordionDetails>
    </Accordion>
  );
}
