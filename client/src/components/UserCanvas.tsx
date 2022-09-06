import React from 'react';
import { ReactSketchCanvas } from 'react-sketch-canvas';

export const Canvas = class extends React.Component<any,any> {
    canvas: React.RefObject<any>;

    constructor(props:any) {
      super(props);
      this.canvas = React.createRef();

    }

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
            strokeWidth={5}
            strokeColor="black"
            backgroundImage='https://i.imgur.com/UWSVFu3.png'
          />
        </>
      );
    }
  };