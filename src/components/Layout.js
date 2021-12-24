import { CssBaseline, Grid } from "@material-ui/core";
import React from "react";
import Content from "./Content";
import NavBar from "./NavBar";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  const [state, setState] = React.useState({
    map: true,
    access: true,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  return (
    <>
      <CssBaseline />
      <div style={{ minHeight: "100vh", width: "100%", display: "flex" }}>
        <Sidebar state={state} onchange={handleChange} />

        <NavBar />
        <Grid
          item
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          {/* <Toolbar /> */}
          <Content state={state} />
        </Grid>
      </div>
    </>
  );
};

export default Layout;
