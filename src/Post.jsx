import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ProgressiveImage from "react-progressive-image";
import { Card, Button, TextContainer, TextStyle, ButtonGroup } from "@shopify/polaris";
import { ThumbsUpMajor, ShareMinor } from "@shopify/polaris-icons";
import dayjs from "dayjs";
import LocalStorageService from "./localStorage.service";

const storage = new LocalStorageService("shopify-spacestagram-2022-brandonyee");

function Post({ details: { copyright, date, explanation, hdurl, title, url } }) {
	// get any existing data from local storage
	const [localData, setLocalData] = useState(storage.getPictureState(url));

	// update localStorage with any changes
	useEffect(() => {
		storage.setPictureState(url, localData);
	}, [localData]);

	return (
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

				<ButtonGroup>
					{/* Like Button */}
					<Button
						icon={ThumbsUpMajor}
						outline={!(localData && localData.liked)}
						onClick={() => setLocalData({ liked: !(localData && localData.liked) })}
					>
						&nbsp;Like{localData && localData.liked ? "d" : ""}
					</Button>

					{/* Share Button */}
					<Button
						icon={ShareMinor}
						outline
						onClick={() => window.open(`?date=${dayjs(date).format("YYYY-MM-DD")}`, "_blank").focus()}
					>
						&nbsp;Share
					</Button>
				</ButtonGroup>

				{/* Explanation */}
				<p>{explanation}</p>
				<p>{dayjs(date, "YYYY-MM-DD").format("dddd, MMMM D, YYYY")}</p>
				<br />

				{/* Copyright */}
				<TextStyle variation="subdued">&copy; {copyright || "NASA"}</TextStyle>
			</TextContainer>
		</Card>
	);
}

Post.propTypes = {
	details: PropTypes.shape({
		copyright: PropTypes.string,
		date: PropTypes.string,
		explanation: PropTypes.string,
		hdurl: PropTypes.string,
		title: PropTypes.string,
		url: PropTypes.string,
	}).isRequired,
};

export default Post;
