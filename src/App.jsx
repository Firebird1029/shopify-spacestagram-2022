import { useState, useEffect } from "react";
import { AppProvider, Page, Layout, Card, Button } from "@shopify/polaris";
import enTranslations from "@shopify/polaris/locales/en.json";
import "./App.css";
import Feed from "./Feed";
import Loading from "./Loading";

function App() {
	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [nasaItems, setNasaItems] = useState([]);

	// Get data from NASA API
	useEffect(() => {
		fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_NASA_KEY}&count=10`)
			.then((res) => res.json())
			.then(
				(result) => {
					setNasaItems(result);
					setIsLoaded(true);
				},
				(err) => {
					setError(err);
					setIsLoaded(true);
				}
			);
	}, []);

	return (
		<AppProvider i18n={enTranslations}>
			<Page title="Spacestagram">{isLoaded ? <Feed nasaItems={nasaItems} /> : <Loading />}</Page>
		</AppProvider>
	);
}

export default App;
