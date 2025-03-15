import { useEffect, useState, useRef } from "react";

function App() {
  const [messages, setMessages] = useState(["hi", "hello"])
  const wsRef = useRef<WebSocket | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const ws = new WebSocket("http://localhost:8080");
    ws.onmessage = (event) => {
      setMessages(m => [...m, event.data]);
    }
    wsRef.current = ws;

    ws.onopen = () => {
      ws.send(JSON.stringify({
        type: "join",
        payload: {
          roomId: "red"
        }
      }))
    }

    return () => {
      ws.close();
    }
  }, []);
  
  const sendMessage = () => {
    const message = inputRef.current?.value.trim(); // ✅ Ensure `message` is not empty or null

    if (!message) {
      console.log("No message entered.");
      return;
    }

    console.log("Sending message:", message);

    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(
        JSON.stringify({
          type: "chat",
          payload: {
            message: message,
          },
        })
      );

      // Clear input after sending
      inputRef.current.value = "";
    } else {
      console.log("WebSocket is not connected.");
    }
  };

  return (
    <div>
      <div>
        {messages.map((message, id) => 
          <div key={id}>
            {message}
        </div>)}
      </div>
      <div>
        <input ref={inputRef} id="message" type="text"></input>
        <button onClick={sendMessage}>Send msgs</button>
      </div>
    </div>
  );
}

export default App;
