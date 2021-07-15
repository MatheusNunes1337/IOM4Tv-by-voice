import React, {useEffect, useState, useContext} from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

import { BsChevronDoubleRight, BsChevronDoubleLeft} from "react-icons/bs"

import api from '../services/api'

import { useHistory } from 'react-router-dom'

//images
import logomarca from "../assets/images/logomarca.png"
import seta from "../assets/images/seta.svg"

//context 
import { Context } from '../contexts/buttonContext'
import { RequestContext } from '../contexts/requestContext'

import '../assets/css/style.css'

function Biblioteca() {
  const { index, handleMovement, setIndex, startListen } = useContext(Context)
  const { funcao, makeRequest } = useContext(RequestContext)
  let history = useHistory()

  const videos = ['video 1', 'video 2', 'video 3', 'video 4', 'video 5']
  let [videoIndex, setVideoIndex] = useState(0)
  let [statusMessage, setStatus] = useState('Selecionado')

  const commands = [
      {
        command: ['direita', 'direito', 'direto'],
        callback: () => handleMovement(2)
      },
      {
        command: 'esquerda',
        callback: () => handleMovement(1)
      },
      {
        command: ['clicar', 'clica', 'clique'],
        callback: () => handleMovement(3)
      }
  ]

  const { transcript } = useSpeechRecognition({commands})


  async function goBackHome(e) {
    const TVkeyCode = e.currentTarget.id
    const data = {keyCode: TVkeyCode}
    //await api.post('/', data)
    history.push('/')
  }

  function trocarVideo(e) {
    const TVkeyCode = e.currentTarget.id
    if(TVkeyCode == 37) {
       if(videoIndex === 0) {
          setVideoIndex(videos.length - 1)
        } else {
          setVideoIndex(videoIndex - 1)
        }
    } else {
        if(videoIndex === videos.length - 1) {
          setVideoIndex(0)
        } else {
          setVideoIndex(videoIndex + 1)
        }
    }
    console.log('video atual:', videos[videoIndex])
    setStatus('Selecionado o ')
  }

  function iniciarVideo() {
    setStatus('Iniciado o ')
  }

  useEffect(() => {
      let btn;
      btn = document.getElementsByClassName("interact_btn")[index]
      btn.focus();
  }, [index]);

  useEffect(() => {
      setIndex(0)
      startListen()
  }, []);

  console.log('você falou: ', transcript)


  return (
    <div className="container">
		<div className="interface">
			<div className="logo">
				<img src={logomarca} className="logomarca"/>
			</div>
			<div className="content">
				<div className="control lib">
					<button id="37" className="lib leftButton interact_btn" value="esquerda" onClick={trocarVideo}><BsChevronDoubleLeft className="buttonIcon"/></button>
					<button id="13" className="lib okButton interact_btn" value="OK" onClick={iniciarVideo}>OK</button>
          <button id="39" className="lib rightButton interact_btn" value="direita" onClick={trocarVideo}><BsChevronDoubleRight className="buttonIcon"/></button>
				</div>
				<button id="48" className="library interact_btn" onClick={goBackHome}> 
					<img src={seta} alt="seta" className="setaLibrary"/>  
				</button>
			</div>
			<p className="libraryDesc leftTitle"> {statusMessage} {videos[videoIndex]} </p>
		</div>
	</div>
  );
}

export default Biblioteca;
