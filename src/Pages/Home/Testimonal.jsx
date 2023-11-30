
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useEffect, useState } from 'react';
import useAxiosPublic from '../../Components/hooks/useAxiosPublic';

export default function Testimonial() {


    const [data, setData] = useState([]);

    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        axiosPublic
            .get("/testimonials")
            .then((res) => {
                setData(res.data);
            })
            .catch((err) => console.log(err));
    }, [axiosPublic]);



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