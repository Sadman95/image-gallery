import { useEffect } from "react";
import { useState } from "react";
import Gallery from "./components/Gallery";

const App = () => {
	const [images, setImages] = useState([]);

	useEffect(() => {
		fetch("./data.json")
			.then((data) => data.json())
			.then((res) => localStorage.setItem("images", JSON.stringify(res)))
			.then(() => setImages(JSON.parse(localStorage.getItem("images"))))
			.catch((err) => console.log(err));
	}, []);

	return (
		<div>
			{images.length && <Gallery images={images} setImages={setImages} />}
		</div>
	);
};

export default App;
