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
				<Card sectioned title="Welcome to Spacestagram, image-sharing from the final frontier!">
					<TextContainer>
						<p>
							This website pulls images from NASA&apos;s APOD (Astronomy Picture of the Day) API and
							allows you to like/unlike your favorites. The website design comes from{" "}
							<a
								href="https://polaris.shopify.com/"
								style={{ color: "white" }}
								target="_blank"
								rel="noreferrer"
							>
								Shopify&apos;s Polaris library
							</a>
							.
						</p>
						<p>
							Use the date picker below (powered by the Polaris design library) to view images from a
							specific range of dates.
						</p>
						<p>
							<strong>Key Features:</strong>
						</p>
						<ul>
							<li>
								The images are progressively loaded from NASA&apos;s API. First, the thumbnail of the
								image (provided from NASA) is shown and intentionally blurred. Once the HD image is
								loaded, it is swapped in and the image is unblurred.
							</li>
							<li>This website uses LocalStorage to keep track of an image&apos;s like status.</li>
							<li>
								Each image post is its own React component, so changing its state (liking/unliking the
								image) will only re-render that specific image and not the whole page.
							</li>
						</ul>
					</TextContainer>
				</Card>
				<br />
				<br />
				<div style={{ maxWidth: "120rem", margin: "0 auto" }}>
					{!error && isLoaded ? <Feed nasaItems={nasaItems} /> : <Loading />}
				</div>
			</Page>
		</AppProvider>
	);
}

export default App;
