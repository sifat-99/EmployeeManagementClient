
import { useState } from "react";
// // import useAxiosPublic from "../../../Components/hooks/useAxiosPublic";
// import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

export default function UserForm() {
  function publish(formData) {
    const content = formData.get("content");
    const button = formData.get("button");
    alert(`'${content}' was published with the '${button}' button`);
  }

  function save(formData) {
    const content = formData.get("content");
    alert(`Your draft of '${content}' has been saved!`);
  }
  const [work,setWork] = useState([])
  const handleWorkSheet = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const content = formData.get("content");
    const selectWork = formData.get("selectWork");
    setWork( {content, selectWork})

  };

//   const axiosPublic = useAxiosPublic();

//   const [MyWorks, setMyWorks] = useState([]);


//   axiosPublic.post("/workSheet", work)
//     .then(res => console.log(res.data))
//     .catch(err => console.log(err))


    // axiosPublic.get("/workSheet")
    // .then(res => setMyWorks(res.data))
    // .catch(err => console.log(err))


  console.log(work)

  return (
    <div>
        <form onSubmit={handleWorkSheet} action={publish}>
      <textarea placeholder="Today's Work" name="content" rows={4} cols={40} />
      <br />
      <select name="selectWork">
        <option value="ProjectSubmit">ProjectSubmit</option>
        <option value="Communication">Communication</option>
        <option value="Field">Field</option>
      </select>
      <button type="submit" name="button" value="submit">
        Publish
      </button>
      <button formAction={save}>Save draft</button>
    </form>

    <div>
    {/* <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Work Name</TableCell>
            <TableCell align="right">Content</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {MyWorks.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer> */}
    </div>
    </div>
  );
}
