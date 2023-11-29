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
import {  useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import useAxiosPublic from "../../Components/hooks/useAxiosPublic";
import useAuth from "../../Components/hooks/useAuth";
const imgApiKey = import.meta.env.VITE_IMG_API_KEY;
const imageHostingApi = `https://api.imgbb.com/1/upload?key=${imgApiKey}`;

const Registration = () => {
  const [valid, setValid] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const { createUser, logOut,updateUser } = useAuth()
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);

  const axiosPublic = useAxiosPublic();
  

  const paperStyle = {
    padding: { xs: 2, md: 6, lg: 10 },
    margin: "30px auto",
    height: "700px",
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
  };

  const handleRegistrationName = (e) => {
    e.preventDefault();
    setName(e.target.value);
    console.log(name);
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
        updateUser(name, selectedFile)
        handleSetUserToDB(res.user.uid);
        logOut();
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
        setError(err.message);
      });
  };

  const handleSetUserToDB = (uid) => {
    axiosPublic.post("/employees", {
      uid: uid,
      email: email,
      name: name,
      photoURL: selectedFile,
      role: "user",
      bankAccountNo: null,
      salary: null,
      verificationStatus: false,
    });
  };

  const handleFileChange = (event) => {
    console.log(event.target.files[0]);
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    fetch(imageHostingApi, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        setSelectedFile(data.data.display_url);
      })
      .catch((err) => console.log(err));
  };

  console.log(selectedFile);

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
              color="primary"
              variant="outlined"
              sx={PrimaryButton}
              // disabled
            >
              <CloudUploadIcon sx={{ mr: "6px" }} />
              Upload Image
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

        <Typography sx={{ color: "red", mt: 2 }}>
          {valid}
          {error}
        </Typography>
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
