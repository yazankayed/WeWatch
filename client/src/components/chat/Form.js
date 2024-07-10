import React, { useState } from 'react'
import PageHeader from '../page-header/PageHeader';
import './chat.scss'


const Form = (props) => {
    const [name, setName] = useState("");
    const handelSubmit = e => {
        e.preventDefault();
        props.handelName(name);
    }
  return (
    <>
        <PageHeader>Chat</PageHeader>
    <div style={{textAlign:"center"}}>
        <h3>Get started right now!</h3>
        <form onSubmit={handelSubmit}>
            <div>
                <label>I want to start chatting with the name...</label><br/>
                <input style={{background:"white"}} type="text" placeholder="My name.." value={name} onChange={e=>setName(e.target.value)} />
                <br/><br/>
                <input  className="btn btn-outline-danger" type="submit" value="Chat"/>
                <br/><br/>
            </div>
        </form>
    </div>
    </>
  )
}

export default Form