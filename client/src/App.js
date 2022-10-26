import "./css/App.css";
import { Route } from "react-router-dom";
import Lading from "./components/landingpage/Landing";
import Home from "./components/Home/Home.jsx";
import Nav from "./components/Nav/Nav";
import Creategame from "./components/creategame/Creategame";
import Filters from "./components/filters/Filters";
function App() {
  return (
    <>
      <Route exact path={"/"} component={Lading} />
      <Route exact path={"/home"}>
        <Nav />
        <Filters />
        <Home />
      </Route>
      <Route exact path={"/create"}>
        <Nav />
        <Creategame />
      </Route>
    </>
  );
}

export default App;
