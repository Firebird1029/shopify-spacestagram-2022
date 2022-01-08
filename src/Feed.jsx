import PropTypes from "prop-types";
import { Layout } from "@shopify/polaris";
import Post from "./Post";

function Feed({ nasaItems }) {
	return (
		<Layout>
			{nasaItems.map((details) => (
				<Layout.Section oneHalf key={details.url}>
					<Post details={details} />
				</Layout.Section>
			))}
		</Layout>
	);
}

Feed.propTypes = {
	nasaItems: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Feed;
