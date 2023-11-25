import {
  Avatar,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Components/Provider/AuthProvider";
const Registration = () => {
  const [valid, setValid] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {createUser} = useContext(AuthContext);

//   const userEmailPassword = {
//     email: email,
//     password: password,
//   };
//   console.log(userEmailPassword);

  const paperStyle = {
    padding: { xs: 2, md: 6, lg: 10 },
    margin: "30px auto",
    height: "70vh",
    borderRadius: "12px",
    boxShadow: "0 0 10px 0 #000",
  };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const btnStyle = { margin: "8px 0" };
  const handleRegistrationName = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    // console.log(e.target.password.value)
  };

  const handleRegistrationEmail = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    setEmail(e.target.value);
    // console.log(e.target.password.value)
  };
  const handleRegistrationPassword = (e) => {
    e.preventDefault();
    const password = e.target.value;

    if (password.length < 6) {
      setValid("Password must be at least 6 characters long");
      return;
    } else if (!/[A-Z]/.test(password)) {
      setValid("Password must contain at least one uppercase letter");
      return;
    } else if (!/[a-z]/.test(password)) {
      setValid("Password must contain at least one lowercase letter");
      return;
    } else if (!/[0-9]/.test(password)) {
      setValid("Password must contain at least one number");
      return;
    } else if (!/[!@#$%^&*]/.test(password)) {
      setValid("Password must contain at least one special character");
      return;
    } else {
      setValid("");
    }
    // console.log(password);
    setPassword(password);
  };

  const handleRegister = () => {

    console.log(email, password);
    createUser(email, password)
        .then((res) => {
            console.log(res);
            }
        )
        .catch((err) => {
            console.log(err);
        }
    );


  };

  return (
    <Grid>
      <Paper elevation={10} sx={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}></Avatar>
          <h2>Sign Up</h2>
        </Grid>
        <TextField
          onChange={handleRegistrationName}
          name="name"
          sx={{ mb: 2 }}
          label="Name"
          placeholder="Enter Name"
          fullWidth
          required
        />
        <TextField
          onChange={handleRegistrationEmail}
          name="email"
          sx={{ mb: 2 }}
          label="Email"
          placeholder="Enter Email"
          fullWidth
          required
        />
        <TextField
          onChange={handleRegistrationPassword}
          name="password"
          label="Password"
          placeholder="Enter password"
          type="password"
          fullWidth
          required
        />
        <Typography sx={{ color: "red", mt:2 }}>{valid}</Typography>
        <Button
          type="submit"
          color="primary"
          variant="contained"
          style={btnStyle}
          onClick={handleRegister}
          fullWidth
        >
          register
        </Button>

        <Typography
          sx={{ display: "flex", gap: 1, alignItems: "center", mt: 2 }}
        >
          {" "}
          Have an account?
          <Link to={"/login"}>
            <Button>Sign In</Button>
          </Link>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default Registration;
