import PropTypes from "prop-types";
import { Layout, Card, Button, TextContainer, TextStyle } from "@shopify/polaris";
import { ThumbsUpMajor } from "@shopify/polaris-icons";
import ProgressiveImage from "react-progressive-image";
import LocalStorageService from "./localStorage.service";

function Feed({ nasaItems }) {
	const storage = new LocalStorageService("shopify-spacestagram-2022-brandonyee");

	return (
		<Layout>
			{nasaItems.map(
				({ copyright, date, explanation, hdurl, media_type: mediaType, title, url }) =>
					mediaType === "image" && (
						<Layout.Section oneHalf key={url}>
							<Card sectioned title={title}>
								<TextContainer>
									{/* Image */}
									<ProgressiveImage src={hdurl} placeholder={url}>
										{(src, loading) => (
											<div style={{ minHeight: loading ? "30rem" : 0 }}>
												<img
													style={{
														width: "100%",
														transition: "opacity ease-in 300ms",
														opacity: loading ? 0.5 : 1,
														filter: loading ? "blur(5px)" : "none",
													}}
													src={src}
													alt={title}
													name={title}
												/>
											</div>
										)}
									</ProgressiveImage>

									{/* Like Button */}
									<Button primary icon={ThumbsUpMajor} outline={!storage.getPictureState(url)}>
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
