import "./css/App.css";
import { Route, Switch } from "react-router-dom";
import Lading from "./components/landingpage/Landing";
import Home from "./components/Home/Home.jsx";
import Nav from "./components/Nav/Nav";
import Creategame from "./components/creategame/Creategame";
import Filters from "./components/filters/Filters";
import Detail from "./components/card/Detail";
import Page404 from "./components/page404/Page404";
import Footer from "./components/footer/Footer";
function App() {
  return (
    <>
      <Switch>
        <Route exact path={"/"} component={Lading} />
        <Route exact path={"/home"}>
          <Nav />
          <Filters />
          <Home />
          <Footer />
        </Route>
        <Route exact path={"/create"}>
          <Nav />
          <Creategame />
        </Route>
        <Route exact path={"/game/:id"}>
          <Nav />
          <Detail />
        </Route>
        <Route exact path={"*"}>
          <Page404 />
        </Route>
      </Switch>
    </>
  );
}

export default App;
