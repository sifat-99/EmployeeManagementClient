import { useEffect, useState } from "react";
import useAxiosPublic from "../../../Components/hooks/useAxiosPublic";
import { useLoaderData } from "react-router-dom";
import UserChart from "./UserSpecificGraph";
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";


const HR_SpecificUserDetails = () => {
  const axiosPublic = useAxiosPublic();

  const email = useLoaderData();
  console.log(email);

  const [specificEmail, setSpecificEmail] = useState('');
  const [userMonthlySalary, setUserMonthlySalary] = useState([1,2]);
  const [salaryMonth, setSalaryMonth] = useState(['january', 'february']);
  const [specificUser, setSpecificUser] = useState([]);


  useEffect(() => {
    axiosPublic.get(`/employees/${email}`).then((res) => {
    //   console.log(res.data);
      const user = res.data;
        console.log(user);
        setSpecificEmail(user?.email);
        setSpecificUser(user);
    });
  }, [axiosPublic, email]);

  console.log(specificEmail)

  useEffect(() => {
    axiosPublic.get(`/payments`).then((res) => {
    
    console.log(res.data)
    const allData = res?.data;
    const filteredData = allData?.filter((user) => user?.email === specificEmail);
    console.log(filteredData)
    setUserMonthlySalary(filteredData?.map((user) => user?.price));
    setSalaryMonth(filteredData?.map((payment) => {
        const date = new Date(payment?.date);
        const monthYear = `${date?.toLocaleString('default', { month: 'short' })} ${date?.getFullYear()}`
        return monthYear;
    }));
      
    });
  }, [axiosPublic, specificEmail]);
//   console.log(userPayments)
console.log(userMonthlySalary)
console.log(salaryMonth)

  return (
    <div style={{display:'flex'}}>
      <div>
      <Card sx={{width:'340px'}}>
      <CardMedia
        sx={{ height: 140 }}
        image={specificUser.photoURL}
        title={specificUser.image}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {specificUser?.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
         {specificUser?.email}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
      </div>
      <div>
      <UserChart salary={userMonthlySalary} month= {salaryMonth}></UserChart>
      <h1 style={{textAlign:'center'}}>{specificUser.name}&apos;s Payment History</h1>
      </div>
    </div>
  );
};



export default HR_SpecificUserDetails;
