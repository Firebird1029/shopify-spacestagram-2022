import PropTypes from "prop-types";
import { Layout, Card, Button, TextContainer, Heading, TextStyle } from "@shopify/polaris";
import { ThumbsUpMajor } from "@shopify/polaris-icons";

function Feed({ nasaItems }) {
	return (
		<Layout>
			{nasaItems.map(
				({ copyright, date, explanation, hdurl, media_type: mediaType, title, url }) =>
					mediaType === "image" && (
						<Layout.Section oneHalf>
							<Card sectioned title={title}>
								<TextContainer>
									{/* Image */}
									<img src={hdurl} alt={title} name={title} style={{ width: "100%" }} />

									{/* Like Button */}
									<Button primary icon={ThumbsUpMajor}>
										&nbsp;Like
									</Button>

									{/* Explanation */}
									<p>{explanation}</p>
									<p>{date}</p>
									<br />

									{/* Copyright */}
									<TextStyle variation="subdued">&copy; {copyright || "NASA"}</TextStyle>
								</TextContainer>
							</Card>
						</Layout.Section>
					)
			)}
		</Layout>
	);
}

Feed.propTypes = {
	nasaItems: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Feed;
