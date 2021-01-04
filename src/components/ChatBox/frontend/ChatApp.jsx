import React, { useState, useEffect } from 'react';
// import Dashboard from './Dashboard.jsx';
import Convos from './Convos.jsx';
// import sampleChatData from './sampleChatData.js';
import Texts from './Texts.jsx';
import loggedUser from './sampleUser'
import axios from 'axios';


const ChatApp = () => {

  const [convos, setConvos] = useState(false);
  const [texts, setTexts] = useState(false);
  const [chatIdx, setChatIdx] = useState(null);
  const [chatHist, setChatHist] = useState([]);
  const [chatId, setChatId] = useState(null);

  const selectConvo = (id) => {
    setChatIdx(id);
    setChatId(chatHist[id].chatId)
    setConvos(false);
    setTexts(true);
  }

  const exitChat = () => {
    setTexts(false)
  }

  //Axios get
  useEffect(() => {
    if (loggedUser.role === 'client') {
      console.log('hitEffect', loggedUser.user)
      return axios.get('/msg/user', {
        params: {
          userName: loggedUser.user
        }
      }).then(({ data }) => {
        console.log('dataHist: ', data);
        setChatHist(data)
        console.log('newDataHist: ', data);
      })
    } else if (role === 'agent') {
      return axios.get('/msg/agent')
    }
    // setChatHist(sampleChatData)
  }, [])

  const updateConvo = (messageObj, chatRoomId) => {
    if (chatRoomId === null) {
      return;
    }
    
    let outdatedChat = [...chatHist];
    for (let i = 0; i < outdatedChat.length; i++) {
      if (outdatedChat[i].chatId === chatRoomId) {
        let chatRoom = outdatedChat[i]
        chatRoom.messages.push(messageObj)
        setChatHist(outdatedChat)
      }
    }
  }
  
  return (
    <div>
      <nav style={{ margin: '0 auto', width: '73%', display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ marginRight: '0px' }}>Apartment Hunt</span>
        <img onClick={() => setConvos(!convos)} style={{ cursor: 'pointer' }} width="25" height="30" src="data:image/svg+xml;base64,PHN2ZyBpZD0iQ2FwYV8xIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCA1MTIgNTEyIiBoZWlnaHQ9IjUxMiIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHdpZHRoPSI1MTIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGc+PHBhdGggZD0ibTAgMzQ5LjAyMmMwIDEyLjE4NyAxMy44MDggMTkuMjc3IDIzLjcxMSAxMi4yMTFsODIuNDcxLTU4LjgzMmM2LjkxNy00LjkzNCAxNS4wNjUtNy41NDIgMjMuNTYzLTcuNTQyaDE4MS4zODJjMzEuOTI4IDAgNTcuOTAyLTI1Ljk3NSA1Ny45MDItNTcuOTAydi0xOTAuMzMxYzAtOC4yODQtNi43MTYtMTUtMTUtMTVoLTI5Ni4xMjdjLTMxLjkyNyAwLTU3LjkwMiAyNS45NzQtNTcuOTAyIDU3LjkwMnptMzAtMjU5LjQ5NGMwLTE1LjM4NiAxMi41MTctMjcuOTAyIDI3LjkwMi0yNy45MDJoMjgxLjEyNnYxNzUuMzMxYzAgMTUuMzg2LTEyLjUxNyAyNy45MDItMjcuOTAyIDI3LjkwMmgtMTgxLjM4MmMtMTQuNzggMC0yOC45NTIgNC41MzctNDAuOTg0IDEzLjEybC01OC43NiA0MS45MTd6Ii8+PHBhdGggZD0ibTUxMiAyMDUuODc2YzAtMzEuOTMyLTI1Ljk3NC01Ny45MS01Ny45LTU3LjkxaC00MC4wN2MtOC4yODQgMC0xNSA2LjcxNi0xNSAxNXM2LjcxNiAxNSAxNSAxNWg0MC4wN2MxNS4zODUgMCAyNy45IDEyLjUyMSAyNy45IDI3LjkxdjIzMC4zNjRsLTU4Ljc1OS00MS45MTVjLTEyLjAzMS04LjU4My0yNi4yMDItMTMuMTE5LTQwLjk4MS0xMy4xMTloLTE4MS4zOWMtMTUuMzg1IDAtMjcuOS0xMi41MjEtMjcuOS0yNy45MXYtMTMuNDM5YzAtOC4yODQtNi43MTYtMTUtMTUtMTVzLTE1IDYuNzE2LTE1IDE1djEzLjQzOWMwIDMxLjkzMiAyNS45NzQgNTcuOTEgNTcuOSA1Ny45MWgxODEuMzljOC40OTcgMCAxNi42NDQgMi42MDcgMjMuNTYgNy41NDFsODIuNDcgNTguODNjOS44NTMgNy4wMzEgMjMuNzExLjAxNSAyMy43MTEtMTIuMjExdi0yNTkuNDl6Ii8+PHBhdGggZD0ibTEwNy44NjIgMTQzLjMzOWgxNzMuMzA0YzguMjg0IDAgMTUtNi43MTYgMTUtMTVzLTYuNzE2LTE1LTE1LTE1aC0xNzMuMzA0Yy04LjI4NCAwLTE1IDYuNzE2LTE1IDE1czYuNzE2IDE1IDE1IDE1eiIvPjxwYXRoIGQ9Im0xMDcuODYyIDIxMy4zMzloMTczLjMwNGM4LjI4NCAwIDE1LTYuNzE2IDE1LTE1cy02LjcxNi0xNS0xNS0xNWgtMTczLjMwNGMtOC4yODQgMC0xNSA2LjcxNi0xNSAxNXM2LjcxNiAxNSAxNSAxNXoiLz48L2c+PC9zdmc+" />
      </nav>
      <div>
        {convos ? <Convos chatHistory={chatHist} selectConvo={selectConvo}/> : null}
        {texts ? <Texts chatBox={chatHist[chatIdx]} exitChat={exitChat} updateConvo={updateConvo} chatId={chatId}/> : null}
        {/* {socketOn ? <SendSocket messageObj={chatHist[chatIdx]} /> : null} */}
      </div>
    </div>
  );
};

export default ChatApp;





 // console.log('updateConvo')
    // let outdatedChat = [...chatHist];
    // let chatRoom = outdatedChat[chatIdx]
    // // let newMessage = sendSocket(chatHist[chatIdx].chatId, messageObj.message)
    // chatRoom.messages.push(messageObj)
    // setChatHist(outdatedChat)
    // // storeConvo(messageObj)