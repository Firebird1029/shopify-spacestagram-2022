import { AppProvider, Page, Layout, Card, Button } from "@shopify/polaris";
import enTranslations from "@shopify/polaris/locales/en.json";
import "./App.css";

function App() {
	return (
		<AppProvider i18n={enTranslations}>
			<Page title="Spacestagram">
				<Layout>
					{[1, 2, 3].map(() => (
						<Layout.Section oneThird>
							<Card sectioned>
								<Button onClick={() => alert("Button clicked!")}>Example button</Button>
							</Card>
						</Layout.Section>
					))}
				</Layout>
			</Page>
		</AppProvider>
	);
}

export default App;
