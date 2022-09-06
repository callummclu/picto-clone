import { useState } from "react"

export function Keys({contentState}:any){
    const [isCaps,setIsCaps] = useState(false)
    const [isShift,setIsShift] = useState(false)
    const [content,setContent] = contentState
    const setShift = () => {
      setIsCaps(!isCaps)
      setIsShift(!isShift)
    }
    const isCap = (letter:string)=>{
      if(isCaps){
        if(isShift){
          setShift()
        }
        return letter.toUpperCase()
      } else {
        return letter
      }
    }
    return(
      <>
      <div className="row one">
        <div onClick={event=>setContent(content+'1')} className="key one"/>
        <div onClick={event=>setContent(content+'2')} className="key two"/>
        <div onClick={event=>setContent(content+'3')} className="key three"/>
        <div onClick={event=>setContent(content+'4')} className="key four"/>
        <div onClick={event=>setContent(content+'5')} className="key five"/>
        <div onClick={event=>setContent(content+'6')} className="key six"/>
        <div onClick={event=>setContent(content+'7')} className="key seven"/>
        <div onClick={event=>setContent(content+'8')} className="key eight"/>
        <div onClick={event=>setContent(content+'9')} className="key nine"/>
        <div onClick={event=>setContent(content+'0')} className="key ten"/>
        <div onClick={event=>setContent(content+'-')} className="key dash"/>
        <div onClick={event=>setContent(content+'=')}  className="key equals"/>
      </div>
      <div className="row two">
        <div  onClick={event=>setContent(content+isCap('q'))} className="key q"/>
        <div  onClick={event=>setContent(content+isCap('w'))} className="key w"/>
        <div  onClick={event=>setContent(content+isCap('e'))} className="key e"/>
        <div  onClick={event=>setContent(content+isCap('r'))} className="key r"/>
        <div  onClick={event=>setContent(content+isCap('t'))} className="key t"/>
        <div  onClick={event=>setContent(content+isCap('y'))} className="key y"/>
        <div  onClick={event=>setContent(content+isCap('u'))} className="key u"/>
        <div  onClick={event=>setContent(content+isCap('i'))} className="key i"/>
        <div  onClick={event=>setContent(content+isCap('o'))} className="key o"/>
        <div  onClick={event=>setContent(content+isCap('p'))} className="key p"/>
        <div  onClick={event=>setContent(content.slice(0, -1))} className="key enter"/>
      </div>
      <div className="row three">
        <div onClick={event=>setIsCaps(!isCaps)} className={isCaps ? "key caps active" : "key caps"} />
        <div onClick={event=>setContent(content+isCap('a'))}className="key a"/>
        <div onClick={event=>setContent(content+isCap('s'))}className="key s"/>
        <div onClick={event=>setContent(content+isCap('d'))}className="key d"/>
        <div onClick={event=>setContent(content+isCap('f'))}className="key f"/>
        <div onClick={event=>setContent(content+isCap('g'))}className="key g"/>
        <div onClick={event=>setContent(content+isCap('h'))}className="key h"/>
        <div onClick={event=>setContent(content+isCap('j'))}className="key j"/>
        <div onClick={event=>setContent(content+isCap('k'))}className="key k"/>
        <div onClick={event=>setContent(content+isCap('l'))} className="key l"/>
        <div onClick={event=>setContent(content+'\n')} className="key enter"/>
      </div>
      <div className="row four">
        <div onClick={setShift} className="key shift"/>
        <div onClick={event=>setContent(content+isCap('z'))} className="key z"/>
        <div onClick={event=>setContent(content+isCap('x'))} className="key x"/>
        <div onClick={event=>setContent(content+isCap('c'))} className="key c"/>
        <div onClick={event=>setContent(content+isCap('v'))} className="key v"/>
        <div onClick={event=>setContent(content+isCap('b'))} className="key b"/>
        <div onClick={event=>setContent(content+isCap('n'))} className="key n"/>
        <div onClick={event=>setContent(content+isCap('m'))} className="key m"/>
        <div onClick={event=>setContent(content+',')} className="key comma"/>
        <div onClick={event=>setContent(content+'.')} className="key period"/>
        <div onClick={event=>setContent(content+'/')} className="key slash"/>
      </div>
      <div className="row five">
        <div onClick={event=>setContent(content+';')} className="key semi-colon"/>
        <div onClick={event=>setContent(content+'`')} className="key tilde"/>
        <div onClick={event=>setContent(content+' ')} className="key space"/>
        <div onClick={event=>setContent(content+'[')} className="key left-square-bracket"/>
        <div onClick={event=>setContent(content+']')} className="key right-square-bracket"/>
      </div>
      </>
    )
  }