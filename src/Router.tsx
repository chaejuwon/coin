import { BrowserRouter, Route, Switch } from "react-router-dom";
import Coins from "./routes/Coins";
import Coin from "./routes/Coin";

interface IRouterProps {

}

function Router({  }:IRouterProps) {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/coin/:coinId">
                    <Coin />
                </Route>
                <Route path="/coin">
                    <Coins />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default Router;