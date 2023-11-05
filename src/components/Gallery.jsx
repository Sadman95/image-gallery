import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button, Container, Form, Image } from "react-bootstrap";
import { DragDropContext, Draggable } from "react-beautiful-dnd";
import { StrictModeDroppable as Droppable } from "../helpers/StrictModeDropable";
import "../styles/gallery.css";

const Gallery = ({ images, setImages }) => {
	const [selected, setSelected] = useState([]);

	//selected images change handler
	const handleChangeImage = (target) => {
		setSelected((prev) =>
			target.checked
				? [...prev, target.value]
				: prev.filter((value) => value !== target.value)
		);
	};

	//selected images delete handler
	const handleDeleteImage = () => {
		const filteredImages = images.filter((img) => !selected.includes(img.id));
		setImages(filteredImages);
		setSelected([]);
	};

	//on-drag end handler
	const handleOnDragEnd = (result) => {
		if (!result.destination) return;

		const data = [...images];
		const [reorderedData] = data.splice(result.source.index, 1);
		data.splice(result.destination.index, 0, reorderedData);

		setImages(data);
	};

	useEffect(() => {
		console.log(selected);
	}, [selected]);

	return (
		<Container>
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
						onClick={handleDeleteImage}
						className="fw-bold text-danger text-decoration-none"
						variant="link"
					>
						Delete selected
					</Button>
				</div>
			)}
			<hr />
			<DragDropContext onDragEnd={handleOnDragEnd}>
				<Droppable droppableId="gallery-dropzone" direction="horizontal">
					{(provided) => (
						<div
							{...provided.droppableProps}
							ref={provided.innerRef}
							id="gallery-dropzone"
							className="container-fluid"
						>
							{images.map(({ id, url }, indx) => (
								<Draggable key={id} draggableId={id.toString()} index={indx}>
									{(provided) => (
										<div
											className={`img-container border border-secondary-subtle border-1 rounded position-relative float-start`}
											ref={provided.innerRef}
											{...provided.draggableProps}
											{...provided.dragHandleProps}
										>
											<Image
												height={indx == 0 ? 400 : 200}
												width={indx == 0 ? 400 : 200}
												src={url}
												alt={`img-${id}`}
											/>
											<Form.Check
												checked={selected.includes(id)}
												onChange={(e) => handleChangeImage(e.currentTarget)}
												className="position-absolute top-0 start-0 pt-3 ps-3"
												type="checkbox"
												id={`img-${id}`}
												value={id}
											/>
										</div>
									)}
								</Draggable>
							))}
							{provided.placeholder}
						</div>
					)}
				</Droppable>
			</DragDropContext>
		</Container>
	);
};

Gallery.propTypes = {
	images: PropTypes.array,
	setImages: PropTypes.func,
};

export default Gallery;
