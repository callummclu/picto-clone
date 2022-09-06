import React from 'react';
import { ReactSketchCanvas } from 'react-sketch-canvas';

export const Canvas = class extends React.Component<any,any> {
    canvas: React.RefObject<any>;

    constructor(props:any) {
      super(props);
      this.canvas = React.createRef();
      this.state = {strokeWidth: 3}

    }

    bigPenMode(){
      this.setState({...this.state, strokeWidth: 7})
    }

    smallPenMode(){
      this.setState({...this.state, strokeWidth: 3})
    }

    eraseMode(){
      this.canvas.current.eraseMode(true)
    }
    penMode(){
      this.canvas.current.eraseMode(false)
    }
    clearCanvas(){
      this.canvas.current.clearCanvas()
    }
    saveSvg(){}
    fillSvg(){}


    render() {
      return (
        <>
          <ReactSketchCanvas
            className="canvas"
            style={{
                border: `3px solid gray`,
                borderRadius: '8px',
                backgroundSize:'contain',
                backgroundColor:"white",
                marginLeft: '10px',
                marginRight: 0,
                width:"calc(100% - 22px)"
            }}
            ref={this.canvas}
            strokeWidth={this.state.strokeWidth}
            strokeColor="black"
            backgroundImage='https://i.imgur.com/UWSVFu3.png'
          />
        </>
      );
    }
  };