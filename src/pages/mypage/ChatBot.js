import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import { Button, TextField, Paper, List, ListItem, Typography, Box } from "@mui/material";
import { Send, Close } from "@mui/icons-material";
import styles from "../../styles/mypage/ChatBot.module.css";

const ChatBot = ({ closeModal }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const chatBotRef = useRef(null);
  const messageEndRef = useRef(null);

  const modalStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)", // 챗봇 실행했을 때 뒷 배경 색상
    },
    content: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      width: "500px", // 원하는 가로 크기로 조절
      maxHeight: "80%", // 원하는 세로 크기로 조절
      margin: "auto", // 가운데 정렬
      backgroundColor: "white",
      border: "7px solid #81D594",
    },
  };

  // ChatBot 닫기
  const closeChatBot = () => {
    closeModal();
  };

  const sendMessage = async () => {
    if (inputMessage.trim() === "") return;

    try {
      // 사용자의 메시지를 화면에 추가
      setMessages([...messages, { isUser: true, text: inputMessage }]);

      // 서버로 요청을 보내고 응답을 받는다.
      const response = await axios.post("/rest/chatBot", {
        event: "send",
        inputText: inputMessage,
      });

      // 챗봇의 응답을 화면에 추가
      setMessages((prevMessages) => [
        ...prevMessages,
        { isUser: false, text: response.data.bubbles[0].data.description },
      ]);
    } catch (error) {
      console.error("Error during API call", error);
    }

    setInputMessage("");
  };

  useEffect(() => {
    // 메세지 목록이 변경될 때, 스크롤을 가장 아래로 이동
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // useEffect(() => {
  //   // 웰컴 메세지
  //   setMessages([{ isUser: false, test: "안녕하세요! '#fit'에 오신 것을 환영합니다. 운동과 건강에 관심을 가지고 계신 여러분을 위한 헬스와 피트니스의 모든 것을 한 곳에서 찾아보실 수 있습니다. 헬스관련 정보, 커뮤니티, 최신 뉴스, 그리고 저희 챗봇이 여러분의 운동 관련 질문에 도움을 드릴 준비가 되어 있습니다. 어떤 도움이 필요하신가요?"}]);
  // }, []);

  return (
    <div>
      {/* 모달 창 */}
      <Modal
        ref={chatBotRef}
        isOpen={true}
        onRequestClose={closeChatBot}
        contentLabel="ChatBot Modal"
        ariaHideApp={false}
        style={modalStyles}
      >

        <Button
            variant="outlined"
            color="error"
            className={styles["close-button"]}
            onClick={closeChatBot}
          >
          <Close />
        </Button>
        <h2 className={styles["title"]}>#FIT CHATBOT</h2>

        <div className={styles["modal-content"]}>
          

          <List
            id={styles["chat-container"]}
            className={styles["chat-message"]}
            sx={{ overflowY: 'auto', width: '100%' }}
          >
            {messages.map((message, index) => (
              <ListItem
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: message.isUser ? "flex-end" : "flex-start",
                }}
              >
                <Paper
                  elevation={3}
                  sx={{
                    padding: "10px",
                    backgroundColor: message.isUser ? "#E3F2FD" : "#81D594",
                    color: message.isUser ? "black" : "white",
                    borderRadius: message.isUser
                      ? "10px 0 10px 10px"
                      : "0 10px 10px 10px",
                  }}
                >
                  <Typography variant="body1">{message.text}</Typography>
                </Paper>
              </ListItem>
            ))}
            <div ref={messageEndRef} />
          </List>
          <Box
            className={styles["input-container"]}
            sx={{
              display: "flex",
              alignItems: "stretch",
              gap: '10px',
              marginTop: '10px',
              width: '100%'
              
            }}
          >
            <TextField
              type="text"
              variant="outlined"
              fullWidth
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  sendMessage();
                  event.preventDefault();
                }
              }}
              sx={{ flex: 1, width: '100%' }} // 너비를 메시지 출력창과 동일하게 설정
            />
            <Button
              variant="contained"
              color="primary"
              onClick={sendMessage}
              endIcon={<Send />}
              sx={{ flex: 'none', height: '100%' }}
            >
              전송
            </Button>
          </Box>
        </div>
      </Modal>
    </div>
  );
};

export default ChatBot;