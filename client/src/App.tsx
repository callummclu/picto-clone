import React, { useEffect, useRef } from 'react';
import { ReactSketchCanvas } from 'react-sketch-canvas';
import styled from 'styled-components'

const Canvas = class extends React.Component<any,any> {
  canvas: React.RefObject<any>;
  saveImage: Function;
  constructor(props:any) {
    super(props);
    this.saveImage = props.saveImage;
    this.canvas = React.createRef();
    this.state = {eraseMode:false};
  }

  changeHandler() {
    this.setState({ eraseMode: !this.state.eraseMode }, () => 
    console.log(this.state.eraseMode ));
 }


  render() {
    return (
      <>
        <ReactSketchCanvas
        style={{
          border: `3px solid gray`,
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
                this.saveImage(data);
                this.canvas.current.clearCanvas()
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
        <button
        style={{top:"400px"}}
          onClick={() => {
            this.canvas.current
              .eraseMode(!this.state.eraseMode)
              this.changeHandler()
             
          }}
        >
          Eraser
        </button>
      </>
    );
  }
};


function App() {

  const [textRange, setTextRange] = React.useState("");
  const [sentText,setSentText]  = React.useState("");
  const [image,setImage] = React.useState("");

  const saveImage = (data:string) => {
    setImage(data);
    console.log(textRange)
  }

  useEffect(()=>{
    setSentText(textRange)
    setTextRange("")
  },[image])

  return (
    <>
        <div style={{position:"relative", width:"100%",display:"flex",justifyContent: "center",alignItems: "center",flexDirection:"column"}}>

    <CanvasContainer style={{backgroundImage: `url(${image})`,backgroundSize:"cover", border: `3px solid gray`,
          borderRadius: '8px'}}>
    <TextContainer color="red" style={{left:-3, top: -3}}>
      <div><h2>callum</h2></div>
          <p>{sentText}</p> 
        </TextContainer>
    </CanvasContainer>
    </div>

    <br/><br/><br/><br/><br/><br/>

    <div style={{position:"relative", width:"100%",display:"flex",justifyContent: "center",alignItems: "center",flexDirection:"column"}}>
      <CanvasContainer>
      <TextContainer color="red">
      <div><h2>callum</h2></div>
          <p>{textRange}</p> 
        </TextContainer>
        <Canvas saveImage={saveImage}/>
        <TextContainer>
          <div><h2>callum</h2></div>
          <p></p> 
        </TextContainer>
        
      </CanvasContainer>

<br/>
      <br/>
      <input onChange={(e:any)=>setTextRange(e.target.value)}/>
      
    </div>
    </>
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
    border: 3px solid gray;
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
