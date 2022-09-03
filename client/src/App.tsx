import React, { useRef } from 'react';
import { ReactSketchCanvas } from 'react-sketch-canvas';
import styled from 'styled-components'
import { setTextRange } from 'typescript';
const styles = {
  border: '0.0625rem solid #9c9c9c',
  borderRadius: '8px',
};

const Canvas = class extends React.Component {
  canvas: React.RefObject<any>;
  constructor(props:any) {
    super(props);

    this.canvas = React.createRef();
  }

  render() {
    return (
      <>
        <ReactSketchCanvas
        style={styles}
          ref={this.canvas}
          strokeWidth={5}
          strokeColor="black"
          backgroundImage='https://upload.wikimedia.org/wikipedia/commons/8/89/HD_transparent_picture.png'
        />
        <button
        style={{top:"300px"}}
          onClick={() => {
            this.canvas.current
              .exportImage("png")
              .then((data:any) => {
                // here is where the image will be available
                console.log(data);
              })
          }}
        >
          Get Image
        </button>

        <button
        style={{top:"400px"}}
          onClick={() => {
            this.canvas.current
              .clearCanvas()
             
          }}
        >
          Clear
        </button>
      </>
    );
  }
};


function App() {

  const [textRange, setTextRange] = React.useState("");
  const userCanvas = useRef<any>(null)

  return (
    <div>
      <CanvasContainer>
      <TextContainer>
      <div><h2>callum</h2></div>
          <p>{textRange}</p> 
        </TextContainer>
        <Canvas/>
        <TextContainer>
          <div><h2>callum</h2></div>
          <p></p> 
        </TextContainer>
        
      </CanvasContainer>

<br/>
      <br/>
      <input onChange={(e:any)=>setTextRange(e.target.value)}/>
      
    </div>
  );
}

const TextContainer = styled.div`


  & *{
    display: inline;
    vertical-align: top;
    line-height: 46px;
    word-wrap: break-word;
white-space: pre-wrap;
word-break: break-word;

  }
  & div{
    border: 1px solid black;
    display: inline-block;
    width: 150px;
    height:46px;
    text-align: center;
    border-top-left-radius: 8px;
    border-bottom-right-radius: 8px;
    background-color:white;

  }
`

const CanvasContainer = styled.div`
  position:relative;
  width: 601px;
  height: 215px;

  &>*{
    position:absolute;
    left:0;
  }

  & p, h2{
    -webkit-user-select: none; /* Safari */        
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* IE10+/Edge */
    user-select: none; /* Standard */
    pointer-events: none;
  }

  & p {
    padding-left: 10px;
  }
`

export default App;
