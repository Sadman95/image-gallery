import PropTypes from "prop-types";
import { Button, Container, Form, Image } from "react-bootstrap";
import "../styles/gallery.module.css";
import { useEffect, useState } from "react";
import { DragDropContext, Draggable } from "react-beautiful-dnd";
import { StrictModeDroppable as Droppable } from "../helpers/StrictModeDropable";

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

	// drag handler
	const handleOnDragEnd = (result) => {
		if (!result.destination) return;

		const data = [...images];

		const [reorderedData] = data.splice(result.source.index, 1);

		data.splice(result.destination.index, 0, reorderedData);

		setImages(data);
	};

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
						onClick={() => handleDeleteImage()}
						className="text-danger text-decoration-none"
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
							className="d-flex align-items-start"
						>
							{images.map(({ id, url }, indx) => (
								<Draggable key={id} draggableId={id.toString()} index={indx}>
									{(provided) => (
										<div
											className={`position-relative p-2`}
											ref={provided.innerRef}
											{...provided.draggableProps}
											{...provided.dragHandleProps}
										>
											<Image
												height={indx == 0 ? 200 : 100}
												width={indx == 0 ? 200 : 100}
												fluid
												className="bg-light border border-secondary-subtle border-1 rounded"
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
