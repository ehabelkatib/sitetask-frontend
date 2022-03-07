import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Welcome from "./pages/Welcome";
import WorkOrders from "./pages/WorkOrders";
import ForemanWorkOrders from "./pages/ForemanWorkOrders";
import AddEditWorkOrder from "./pages/AddEditWorkOrder";
import ForemanForm from "./components/ForemanForm";
import EngineerForm from "./components/EngineerForm";
import Details from "./pages/Details";
import ForemanDetails from "./pages/ForemanDetails";
import ForemanEditDetails from "./pages/ForemanEditDetails";
import EditDetail from "./pages/EditDetail";

function App() {
	return (
		<>
			<Router>
				<Switch>
					<Route exact path="/" component={Welcome} />
					<Route exact path="/login/engineer" component={EngineerForm} />
					<Route exact path="/manage/work-orders" component={WorkOrders} />
					<Route
						exact
						path="/manage/work-order/:orderID/details"
						component={Details}
					/>
					<Route
						exact
						path="/manage/work-order/new"
						component={AddEditWorkOrder}
					/>
					<Route
						exact
						path="/manage/work-order/:orderID/edit"
						component={AddEditWorkOrder}
					/>
					<Route
						exact
						path="/manage/detail/:detailId/edit"
						component={EditDetail}
					/>
					{/* FOREMAN ROUTES */}
					<Route exact path="/login/foreman" component={ForemanForm} />
					<Route exact path="/view/work-orders" component={ForemanWorkOrders} />
					<Route
						exact
						path="/view/work-order/:orderID/details"
						component={ForemanDetails}
					/>
					<Route
						exact
						path="/manage/foremendetail/:detailId/edit"
						component={ForemanEditDetails}
					/>
				</Switch>
			</Router>
		</>
	);
}

export default App;
