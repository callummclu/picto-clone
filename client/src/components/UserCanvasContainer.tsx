import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Canvas } from './UserCanvas';

export const UserCanvasContainer = () => {
        const [textRange, setTextRange] = useState("");
  const [sentText,setSentText]  = useState("");
  const [image,setImage] = useState("");
  const [svg,setSvg] = useState<any>(null);

  const grabSvg = (data:any) => {
    setSvg(data)
  }

  const saveImage = (data:string) => {
    setImage(data);
    console.log(textRange)
  }

  const returnSvg = (el:any,paths:any) => {
    el.canvas.current.loadPaths(paths)
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
        <Canvas saveImage={saveImage} grabSvg={grabSvg} returnSvg={returnSvg}/>
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
