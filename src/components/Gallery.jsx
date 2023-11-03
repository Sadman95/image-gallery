import PropTypes from "prop-types";
import { Col, Container, Image, Row } from "react-bootstrap";

const Gallery = ({ images }) => {
	return (
		// <div>
		// 	{images.map(({ id, url }) => (
		// 		<div key={id}>
		// 			<img src={url} alt={`img-${id}`} />
		// 		</div>
		// 	))}
		// </div>
		<Container>
			<Row>
				{images.map(({ id, url }) => (
					<Col xs={12} sm={6} md={2} key={id}>
						<Image fluid src={url} alt={`img-${id}`} />
					</Col>
				))}
			</Row>
		</Container>
	);
};

Gallery.propTypes = {
	images: PropTypes.array,
};

export default Gallery;
