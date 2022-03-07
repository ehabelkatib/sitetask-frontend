import React from "react";
import ReactDOM from "react-dom";
import { ToastProvider } from "react-toast-notifications";
import "./index.css";
import App from "./App";
import { GlobalStyle } from "./globalStyles";

ReactDOM.render(
	<React.StrictMode>
		<GlobalStyle />
		<ToastProvider autoDismiss autoDismissTimeout={3000} placement="top-right">
			<App />
		</ToastProvider>
	</React.StrictMode>,
	document.getElementById("root")
);
