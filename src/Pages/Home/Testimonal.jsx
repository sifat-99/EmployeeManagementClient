
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useEffect, useState } from 'react';

export default function Testimonial() {


    const [data, setData] = useState([]);

    useEffect(() => {
      fetch("Test.json")
        .then((res) => res.json())
        .then((data) => setData(data));
    }, []);



  return (
    <div style={{marginBottom:'28px'}}>
      {
        data.map((item) => (
            <Accordion key={item.id}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                
            >
                <Typography sx={{ width: '33%', flexShrink: 0 }}>
                {item.name}
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>{item.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>
                {item.quote}
                </Typography>
            </AccordionDetails>
            </Accordion>
        ))

      }
    </div>
  );
}