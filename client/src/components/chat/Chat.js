import React, { useEffect, useRef, useState } from 'react'
import io from 'socket.io-client'
import PageHeader from '../page-header/PageHeader';
import './chat.scss'

const Chat = (props) => {
    const [socket] = useState(() => io(':8000'));
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const bottomRef = useRef(null);

    useEffect(() => {
        console.log("Running");
        socket.on("welcome", data => console.log(data));
        socket.on("messages_to_chat", data => setMessages(data));
    }, [socket]);

    useEffect(() => {
        socket.emit("new_user",  props.name);
    }, [props.name, socket]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handelSubmit = e => {
        e.preventDefault();
        socket.emit("message_from_client", { msg: message, name: props.name });
        setMessage("");
    }
    return (
      <>
        <PageHeader>
        Chat
    </PageHeader>
        <div className='chat'>
            <h1>Welcome, {props.name}</h1>
            {
                messages.map((msg, i) =>
                    (msg.name === props.name) ?
                        <>
                            <span><strong>You: </strong></span><br /> {msg.msg}<br/>
                        </>
                        :
                        <>
                            <span><strong>{msg.name}</strong></span> {msg.name ? <>said: </> : <></>} <br /> {msg.msg} <br/>
                        </>
                )
            }
            <form onSubmit={handelSubmit}>
                <input type="text" value={message} style={{backgroundColor: 'white'}} onChange={e => setMessage(e.target.value)} />
                <input type="submit" value="Send" />
            </form>
            <div ref={bottomRef} />
        </div>
        </>
    )
}

export default Chat