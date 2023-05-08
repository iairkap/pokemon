import { useLocation, Route } from "react-router-dom";
import Home from "./views/Home Page/Home";
import Landing from "./views/Landing Page/Landing";

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
    </div>
  );
}

export default App;
