import {
  Avatar,
  Box,
  Button,
  Grid,
  Input,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Components/Provider/AuthProvider";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const Registration = () => {
  const [valid, setValid] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const { createUser } = useContext(AuthContext);
  const paperStyle = {
    padding: { xs: 2, md: 6, lg: 10 },
    margin: "30px auto",
    height: "70vh",
    borderRadius: "12px",
    boxShadow: "0 0 10px 0 #000",
  };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const btnStyle = { margin: "8px 0" };
  const PrimaryButton = {
    ml: "8px",
    fontWeight: "bold",
    borderRadius: "12px",
    "&:hover": {
      backgroundColor: "#39A7FF",
      color: "black",
      fontWeight: "bold",
    },
  }


  const handleRegistrationName = (e) => {
    e.preventDefault();
    setName(e.target.value);
    console.log(name)
  };

  const handleRegistrationEmail = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
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

  const [error, setError] = useState("");

  const handleRegister = () => {
    console.log(email, password);
    createUser(email, password)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        setError(err.message);
      });
  };

  const [selectedFile, setSelectedFile] = useState(null);



  const handleFileChange = (event) => {
    console.log(event.target.files[0]);
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {

    console.log('dklajhdlfah')
    console.log(selectedFile)
  };

  return (
    <Grid>
      <Paper elevation={10} sx={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}></Avatar>
          <h1>User Registration</h1>
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

        <Box
          sx={{ display: "flex", alignItems: "center" }}
          style={{ marginBottom: "20px" }}
        >
          <div>
            <Input type="file" onChange={handleFileChange} />
            <Button
              onClick={handleUpload}
              color="primary"
              variant="outlined"
              sx={PrimaryButton}
            >
              <CloudUploadIcon sx={{ mr: "6px" }} />
              Upload
            </Button>
          </div>
        </Box>
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

        <Typography sx={{ color: "red", mt: 2 }}>{valid}{error}</Typography>
        <Button
          type="submit"
          // color="primary"
          variant="outlined"
          style={btnStyle}
          sx={PrimaryButton}
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
