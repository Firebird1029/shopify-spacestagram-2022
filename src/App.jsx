import { useState, useEffect, useCallback } from "react";
import { AppProvider, Card, DatePicker, DisplayText, Page, TextContainer } from "@shopify/polaris";
import enTranslations from "@shopify/polaris/locales/en.json";
import dateFormat from "dateformat";
import "./App.css";
import Feed from "./Feed";
import Loading from "./Loading";

function App() {
	// NASA API-related state
	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [nasaItems, setNasaItems] = useState([]);

	// Date picker-related state
	const [{ month, year }, setDate] = useState({ month: 0, year: 2022 });
	const [selectedDates, setSelectedDates] = useState({
		start: new Date("Sun Jan 02 2022 00:00:00 GMT-0500 (EST)"),
		end: new Date("Sun Jan 09 2022 00:00:00 GMT-0500 (EST)"),
	});

	// Get data from NASA API
	useEffect(() => {
		// pull images from a specific range of dates, as set by the date picker
		const startDate = dateFormat(selectedDates.start, "yyyy-mm-dd");
		const endDate = dateFormat(selectedDates.end, "yyyy-mm-dd");
		fetch(
			`https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_NASA_KEY}&start_date=${startDate}&end_date=${endDate}`
		)
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

		// to just pull 10 random images: (also remove selectedDates from React hook)
		// https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_NASA_KEY}&count=10
	}, [selectedDates]);

	// Date picker code
	const handleMonthChange = useCallback((newMonth, newYear) => setDate({ month: newMonth, year: newYear }), []);

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
				<Card sectioned title="Date Picker">
					<DatePicker
						month={month}
						year={year}
						onChange={setSelectedDates}
						onMonthChange={handleMonthChange}
						selected={selectedDates}
						multiMonth
						allowRange
					/>
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
