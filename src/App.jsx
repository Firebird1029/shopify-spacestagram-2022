import { useState, useEffect } from "react";
import { AppProvider, Card, DisplayText, Page, TextContainer } from "@shopify/polaris";
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
		<AppProvider
			i18n={enTranslations}
			theme={{
				colorScheme: "dark",
			}}
		>
			<Page fullWidth>
				<br />
				<DisplayText size="extraLarge">Spacestagram</DisplayText>
				<br />
				<Card sectioned title="Welcome to Spacestagram!">
					<TextContainer>
						<p>
							This modest website pulls images from NASA&apos;s APOD (Astronomy Picture of the Day) API
							and allows you to like/unlike your favorites.
						</p>
					</TextContainer>
				</Card>
				<br />
				<br />
				<div style={{ maxWidth: "120rem", margin: "0 auto" }}>
					{isLoaded ? <Feed nasaItems={nasaItems} /> : <Loading />}
				</div>
			</Page>
		</AppProvider>
	);
}

export default App;
