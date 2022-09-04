import React from 'react';
import { ReactSketchCanvas } from 'react-sketch-canvas';

export const Canvas = class extends React.Component<any,any> {
    canvas: React.RefObject<any>;
    saveImage: Function;
    grabSvg: Function;
    returnSvg: Function;
    constructor(props:any) {
      super(props);
      this.grabSvg = props.grabSvg
      this.saveImage = props.saveImage;
      this.returnSvg = props.returnSvg
      this.canvas = React.createRef();
      this.state = {eraseMode:false, paths:null};
    }
  
    changeHandler() {
      this.setState({ ...this.state, eraseMode: !this.state.eraseMode }, () => 
      console.log(this.state.eraseMode ));
   }
  
   svgChangeHandler(svg:any) {
    this.setState({ ...this.state, paths:svg})
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
                  this.saveImage(data);
                  this.canvas.current.clearCanvas()
                })
                this.canvas.current.exportPaths()
                    .then((data:any) => {
                        this.grabSvg(data)
                        console.log(data)
                        this.svgChangeHandler(data)
                    })
            }}
          >
            Send
          </button>
  
          <button
          style={{top:"250px"}}
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
          <button style={{top:"-100px"}} onClick={()=> this.returnSvg(this, this.state.paths)}>
            pull image
          </button>
        </>
      );
    }
  };
  