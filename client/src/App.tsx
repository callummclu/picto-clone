import React, { useRef } from 'react';
import { ReactSketchCanvas } from 'react-sketch-canvas';
import styled from 'styled-components'

const Canvas = class extends React.Component<any> {
  canvas: React.RefObject<any>;
  constructor(props:any) {
    super(props);

    this.canvas = React.createRef();
  }

  render() {
    return (
      <>
        <ReactSketchCanvas
        style={{
          border: `3px solid ${this.props.color}`,
          borderRadius: '8px',
          backgroundSize:'contain'
        }}
          ref={this.canvas}
          strokeWidth={5}
          strokeColor="black"
          backgroundImage='https://i.imgur.com/UWSVFu3.png'
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

  return (

    <div style={{position:"relative", width:"100%",display:"flex",justifyContent: "center",alignItems: "center",flexDirection:"column"}}>
      <CanvasContainer>
      <TextContainer color="red">
      <div><h2>callum</h2></div>
          <p>{textRange}</p> 
        </TextContainer>
        <Canvas color="red"/>
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
    line-height: 43px;
    word-wrap: break-word;
white-space: pre-wrap;
word-break: break-word;

  }
  & div{
    border: 3px solid;
    border-color: ${props => props.color};
    display: inline-block;
    width: 150px;
    height:40px;
    text-align: center;
    border-top-left-radius: 8px;
    border-bottom-right-radius: 8px;
    background-color:white;

  }
`

const CanvasContainer = styled.div`
  position:relative;
  width: 100%;
  max-width: 601px;
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


`

export default App;
