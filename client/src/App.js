import { useLocation, Route } from "react-router-dom";
import Home from "./views/Home Page/Home";
import Landing from "./views/Landing Page/Landing";
import Loading from "./assets/loading";
import NavBar from "./components/NavBar/NavBar";
import Detail from "./views/Detail Page/Detail";
import CreatePokemon from "./views/Form Page/FormPage";

function App() {
  const location = useLocation();

  return (
    <div className="App">
      <Route
        exact
        path="/"
        render={() => {
          return <Landing />;
        }}
      />
      <Route
        exact
        path="/home"
        render={() => {
          return <Home />;
        }}
      />
      <Route
        exact
        path="/loading"
        render={() => {
          return <Loading />;
        }}
      />
      <Route
        exact
        path="/detail/:id"
        render={() => {
          return <Detail />;
        }}
      />
      <Route
        exact
        path="/create"
        render={() => {
          return <CreatePokemon />;
        }}
      />
    </div>
  );
}

export default App;
