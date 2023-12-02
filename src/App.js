import * as React from 'react';
import { ReactSketchCanvas } from 'react-sketch-canvas';
import axios from 'axios';
import './App.css'

const styles = {
  border: "0.0625rem solid black",
  borderRadius: "0.25rem",
};

const Canvas = class extends React.Component {
  constructor(props) {
    super(props);

    this.canvas = React.createRef();

    this.state = {
      answer: '',
      equation: '',
      base: 10
    };

    this.submitImage = async () => {
      try {
        const image_string = await this.canvas.current.exportImage("png");
        const base = await this.state.base;
        const response = await axios.post("http://localhost:8000", { image_string: image_string, base: base });

        this.setState({ answer: response.data.answer, equation: response.data.equation  })
      } catch (e) {
        console.error(e);
      }
    };

  this.setBase = (event) => {
    this.setState({ base: parseInt(event.target.value, 10) });
  };

  }
  render() {
    const bases = Array.from({ length: 15 }, (_, i) => i + 2); // Create an array [2, 3, ..., 16]

    return (
      <div>
        <ReactSketchCanvas
          ref={this.canvas}
          strokeWidth={5}
          strokeColor="black"
        />
        <button onClick={this.submitImage}>
          Solve Equation
        </button>
        <p> Base: </p>
        <select value={this.state.base} onChange={this.setBase}>
          {bases.map((base) => (
            <option key={base} value={base}>
              {base}
            </option>
          ))}
        </select>
        <p>Answer: {this.state.answer}</p>
        <p>Equation: {this.state.equation}</p>
      </div>
    );
  }
};

function App() {
  return (
    <div className="canvas-div">
      <Canvas />
    </div>
  );
}

export default App;

