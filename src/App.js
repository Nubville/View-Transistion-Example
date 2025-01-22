import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { CoffeesList } from "./features/coffee/CoffeeList";
import { SingleCoffeePage } from "./features/coffee/SingleCoffeePage";

export default function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <>
                <CoffeesList />
              </>
            )}
          />
          <Route exact path="/coffees/:id" component={SingleCoffeePage} />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
}
