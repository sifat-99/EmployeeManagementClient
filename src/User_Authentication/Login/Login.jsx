import {
  Avatar,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Components/Provider/AuthProvider";
import { GoogleAuthProvider } from "firebase/auth";
import GoogleIcon from "@mui/icons-material/Google";
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("asfasf");
  const captchaRef = useRef("");

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

  const handleLoginEmail = (e) => {
    e.preventDefault();
    // console.log(e.target.value);
    setEmail(e.target.value);
    // console.log(e.target.password.value)
  };
  const handleLoginPassword = (e) => {
    e.preventDefault();
    // console.log(e.target.value);
    setPassword(e.target.value);
    // console.log(e.target.email.value)
  };

  const { signIn, signInWithGoogle } = useContext(AuthContext);
  const provider = new GoogleAuthProvider();

  const handleSignIn = () => {
    signIn(email, password)
      .then((result) => {
        console.log(result.user);
      })
      .catch((error) => console.log(error.message));
  };

  const handleSignInWithGoogle = () => {
    signInWithGoogle(provider)
      .then((result) => {
        console.log(result.user);
      })
      .catch((error) => console.log(error.message));
  };

    useEffect(() => {
        loadCaptchaEnginge(6);
      }
        , []);
const [disable, setDisable] = useState(true)


    const handleValidateCaptcha = () => {
         captchaRef.current.focus();
       const value =captchaRef.current.value;
    //    console.log(value)

       if (validateCaptcha(value)===true) {
            setDisable(false);

        }
        else
        {
            setDisable(true);
        }
    }

  return (
    <Grid>
      <Paper elevation={10} sx={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}></Avatar>
          <h2>Sign In</h2>
        </Grid>
        <TextField
          onChange={handleLoginEmail}
          name="email"
          sx={{ mb: 2 }}
          label="Username"
          placeholder="Enter username"
          fullWidth
          required
        />
        <TextField
          onChange={handleLoginPassword}
          name="password"
          label="Password"
          placeholder="Enter password"
          type="password"
          fullWidth
          required
        />
        <FormControlLabel
          control={<Checkbox name="checkedB" color="primary" />}
          label="Remember me"
        />

        <div>
        <LoadCanvasTemplate />
        </div>

        <TextField
        //   onChange={handleValidateCaptcha}
          name="Captcha"
          label="Captcha"
          placeholder="Enter Captcha"
          type="text"
          inputRef={captchaRef}
          fullWidth
        //   required
        />
        <Button 
        type="submit"
          color="primary"
          variant="contained"
          style={btnStyle}
          
          onClick={handleValidateCaptcha}
          >
        Validate
        </Button>

        <Button
          type="submit"
          color="primary"
          variant="contained"
          style={btnStyle}
          disabled={disable}
          onClick={handleSignIn}
          fullWidth
        >
          Sign in
        </Button>

        <Typography
          sx={{ display: "flex", gap: 1, alignItems: "center", mt: 2 }}
        >
          {" "}
          Don&apos;t have an account?
          <Link to={"/registration"}>
            <Button>Sign Up</Button>
          </Link>
        </Typography>
        <Button onClick={handleSignInWithGoogle}>
          <GoogleIcon sx={{ mt: 2, fontSize: 50 }}></GoogleIcon>
        </Button>
      </Paper>
    </Grid>
  );
};

export default Login;
