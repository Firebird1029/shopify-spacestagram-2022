import { Layout, Card, Button } from "@shopify/polaris";
import PropTypes from "prop-types";

function Feed({ nasaItems }) {
	console.log(nasaItems);
	return (
		<Layout>
			{nasaItems.map((item) => (
				<p>{JSON.stringify(item)}</p>
			))}
			{/* {nasaItems.map(({ copyright, date, explanation, hdurl, media_type: mediaType, title, url }) => (
				<Layout.Section oneThird>
					<Card sectioned>{{ copyright, date, explanation, hdurl, mediaType, title, url }}</Card>
				</Layout.Section>
			))} */}
		</Layout>
	);
}

Feed.propTypes = {
	nasaItems: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Feed;
