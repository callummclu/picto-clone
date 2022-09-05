import React from 'react';
import { ReactSketchCanvas } from 'react-sketch-canvas';
import styled from 'styled-components';
import { CanvasControls } from './CanvasControls';
import { UserControls } from './UserControls';

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
      this.state = {eraseMode:false, paths:null, strokeWidth:5};

    }

    eraserMode(){
        this.canvas.current
            .eraseMode(true)
            this.changeHandler()
    }

    penMode(){
        this.canvas.current
            .eraseMode(false)
            this.changeHandler()
    }

    bigPen(){
        this.setState({ ...this.state, strokeWidth: 8 })

    }

    weePen(){
        this.setState({ ...this.state, strokeWidth: 5 })

    }

    changeHandler() {
      this.setState({ ...this.state, eraseMode: !this.state.eraseMode }, () => 
      console.log(this.state.eraseMode ));
   }
  
   svgChangeHandler(svg:any) {
    this.setState({ ...this.state, paths:svg})
   }

   sendMessage() {
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
   }


   clearCanvas(){
        this.canvas.current
          .clearCanvas()
         
      }
   
      pullMessage() {
        this.returnSvg(this, this.state.paths)
      }
  
    render() {
      return (
        <>
        <CanvasControls eraserMode={this.eraserMode} penMode={this.penMode}/>

        <div style={{top:-50}}>
            <button onClick={()=>this.eraserMode()}>eraser</button>
            <button onClick={()=>this.penMode()}>pen mode</button>
            <button onClick={()=>this.bigPen()}>big pen mode</button>
            <button onClick={()=>this.weePen()}>wee pen mode</button>
        </div>
        
          <ReactSketchCanvas
            style={{
                border: `3px solid gray`,
                borderRadius: '8px',
                backgroundSize:'contain'
            }}
            ref={this.canvas}
            strokeWidth={this.state.strokeWidth}
            strokeColor="black"
            backgroundImage='https://i.imgur.com/UWSVFu3.png'
          />

          <div style={{bottom: -50}}>
            <button onClick={()=>this.sendMessage()}>Send</button>
            <button onClick={()=>this.pullMessage()}>Pull down</button>
            <button onClick={()=>this.clearCanvas()}>Clear</button>

          </div>

        </>
      );
    }
  };
  
