import React, { useState } from "react";
import "./App.css";

function App() {
	const [inputValue, setInputValue] = useState(""); // State to track the input value
	const [displayText, setDisplayText] = useState(""); // State to display the text

	const handleInputChange = (event) => {
		setInputValue(event.target.value); // Update the inputValue state when the user types into the input field
	};

	const handleButtonClick = () => {
		setDisplayText(inputValue); // Set the displayText state to the current inputValue when the button is clicked
	};

	return (
		<div className="App">
			<header className="App-header">
				<h1>Hello, World!</h1>
				<input
					type="text"
					placeholder="Type something..."
					value={inputValue}
					onChange={handleInputChange}
				/>
				<button className="button" onClick={handleButtonClick}>
					Display Text
				</button>
				<p>{displayText}</p>
			</header>
		</div>
	);
}

export default App;
