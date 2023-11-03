import PropTypes from "prop-types";
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import "../styles/gallery.module.css";
import { useEffect, useState } from "react";

const Gallery = ({ images, setImages }) => {
	const [selected, setSelected] = useState([]);

	// checkbox change handler
	const handleChangeImage = (target) => {
		if (target.checked) setSelected((prev) => [...prev, target.value]);
		else setSelected(selected.filter((value) => value !== target.value));
	};

	// delete selected images handler
	const handleDeleteImage = () => {
		const data = JSON.parse(localStorage.getItem("images"));
		const filteredImages = data.filter((img) => !selected.includes(img.id));
		localStorage.setItem("images", JSON.stringify(filteredImages));
		setImages(filteredImages);
		setSelected([]);
	};

	useEffect(() => {
		console.log(selected);
	}, [selected]);

	return (
		<Container fluid>
			<h1>Gallery</h1>
			{selected.length > 0 && (
				<div className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between">
					<Form.Check
						defaultChecked
						onChange={() => setSelected([])}
						type="checkbox"
						label={`${selected.length} image${
							selected.length > 1 ? "s" : ""
						} selected`}
					/>
					<Button
						onClick={() => handleDeleteImage()}
						className="text-danger text-decoration-none"
						variant="link"
					>
						Delete selected
					</Button>
				</div>
			)}
			<hr />
			<Row>
				{images.map(({ id, url }, indx) => (
					<Col
						className={`position-relative p-2`}
						xs={12}
						sm={6}
						md={{ span: indx == 0 ? 4 : 2 }}
						key={id}
					>
						<label style={{ cursor: "pointer" }} htmlFor={`img-${id}`}>
							<Image
								className="bg-light border border-secondary-subtle border-1 rounded"
								fluid
								src={url}
								alt={`img-${id}`}
							/>
						</label>
						<Form.Check
							checked={selected.includes(id)}
							onChange={(e) => handleChangeImage(e.currentTarget)}
							className="position-absolute top-0 start-0 pt-3 ps-5"
							type="checkbox"
							id={`img-${id}`}
							value={id}
							label={`img-${id}`}
						/>
					</Col>
				))}
			</Row>
		</Container>
	);
};

Gallery.propTypes = {
	images: PropTypes.array,
	setImages: PropTypes.func,
};

export default Gallery;
