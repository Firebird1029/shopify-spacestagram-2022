import { useState, useEffect, useCallback } from "react";
import { AppProvider, Button, Card, DatePicker, DisplayText, Page, TextContainer } from "@shopify/polaris";
import enTranslations from "@shopify/polaris/locales/en.json";
import dayjs from "dayjs";
import Feed from "./Feed";
import Loading from "./Loading";

function App() {
	// NASA API-related state
	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [nasaItems, setNasaItems] = useState([]);

	// Date picker-related state
	const [{ month, year }, setDate] = useState({ month: 0, year: 2022 });
	const [selectedDates, setSelectedDates] = useState(null);
	const [preRequestedDate, setPreRequestedDate] = useState(false);

	// Dark mode
	const [darkMode, setDarkMode] = useState(
		window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
	);

	// Get data from NASA API
	useEffect(() => {
		// ensure page has loaded & user selected both start AND end dates before requesting data
		if (
			!selectedDates ||
			(!preRequestedDate && selectedDates.start.toDateString() === selectedDates.end.toDateString())
		) {
			return;
		}

		// pull images from a specific range of dates, as set by the date picker
		const startDate = dayjs(selectedDates.start).format("YYYY-MM-DD");
		const endDate = dayjs(selectedDates.end).format("YYYY-MM-DD");
		fetch(
			`https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_NASA_KEY}&start_date=${startDate}&end_date=${endDate}`
		)
			.then((res) => res.json())
			.then(
				(result) => {
					if (Array.isArray(result)) {
						// only update state if API returned valid response
						setNasaItems(result);
					}
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

	// Render pre-requested image if exists
	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search);
		const requestedDate = urlParams.get("date");

		// make sure requested date is of the form YYYY-MM-DD
		if (requestedDate && /^\d{4}-\d{2}-\d{2}$/.test(requestedDate)) {
			setPreRequestedDate(true);
			const validDate = dayjs(requestedDate, "YYYY-MM-DD");
			setSelectedDates({ start: validDate.toDate(), end: validDate.toDate() });
		} else {
			// due to race condition, only set initial dates once we know there is no prerequested date
			setSelectedDates({
				start: new Date("Sat Jan 01 2022"),
				end: new Date("Tue Jan 04 2022"),
			});
		}
	}, []);

	return (
		<AppProvider
			i18n={enTranslations}
			theme={{
				colorScheme: darkMode ? "dark" : "light",
			}}
		>
			<Page fullWidth>
				<br />
				<a href="/" style={{ color: "inherit", textDecoration: "inherit" }}>
					<DisplayText size="extraLarge">Spacestagram</DisplayText>
				</a>
				<br />
				{!preRequestedDate && (
					<div>
						{/* Introduction */}
						<Card sectioned title="Welcome to Spacestagram, image-sharing from the final frontier!">
							<TextContainer>
								<p>
									This website pulls images from NASA&apos;s APOD (Astronomy Picture of the Day) API
									and allows you to like/unlike your favorites. The website design comes from{" "}
									<a
										href="https://polaris.shopify.com/"
										style={{ color: "inherit" }}
										target="_blank"
										rel="noreferrer"
									>
										Shopify&apos;s Polaris library
									</a>
									.
								</p>
								<p>
									<strong>Key Features:</strong>
								</p>
								<ul>
									<li>
										The images are progressively loaded from NASA&apos;s API. First, the thumbnail
										of the image (provided from NASA) is shown and intentionally blurred. Once the
										HD image is loaded, it is swapped in and the image is unblurred.
									</li>
									<li>
										This website uses LocalStorage to keep track of an image&apos;s like status.
									</li>
									<li>
										The Share button creates a shareable link that displays only the shared image.
									</li>
									<li>
										This website automatically detects your computer&apos;s dark mode preference.
										Alternatively, you may toggle it on/off&nbsp;
										<Button plain onClick={() => setDarkMode((mode) => !mode)}>
											here
										</Button>
										.
									</li>
									<li>
										Each image post is its own React component, so changing its state
										(liking/unliking the image) will only re-render that specific image and not the
										whole page.
									</li>
								</ul>
							</TextContainer>
						</Card>

						{/* Date Picker */}
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
					</div>
				)}
				<br />
				<br />

				{/* Feed */}
				<div style={{ maxWidth: "120rem", margin: "0 auto" }}>
					{!error && isLoaded ? <Feed nasaItems={nasaItems} /> : <Loading />}
				</div>

				{/* Return to Main Site Button */}
				{preRequestedDate && (
					<div style={{ margin: "5rem auto 5rem", textAlign: "center" }}>
						<Button onClick={() => window.location.replace("/")}>Return to Main Site</Button>
					</div>
				)}

				{/* Footer */}
				<footer style={{ margin: "5rem auto 5rem" }}>&copy; 2022 Brandon Yee.</footer>
			</Page>
		</AppProvider>
	);
}

export default App;
