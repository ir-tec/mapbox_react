import { CssBaseline } from "@material-ui/core";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import MessageHandler from "./components/AlertMessage";
import Login from "./Pages/Login/Login";
import Register from "./Pages/register/Register";

function App({ auth }) {
  return (
    <>
      <CssBaseline />
      {localStorage.token ? (
        <Layout />
      ) : (
        <Switch>
          <Route exact path={"/"}>
            <Login />
          </Route>
          <Route exact path={"/register"}>
            <Register />
          </Route>
        </Switch>
      )}
      <MessageHandler />
    </>
  );
}
const mapSteteToProps = (props) => {
  const { auth } = props;

  return { auth };
};

export default connect(mapSteteToProps)(App);
