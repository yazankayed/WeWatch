import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from "react-router-dom";
import './edit.css'
import { useNavigate } from 'react-router-dom';
import PageHeader from '../page-header/PageHeader';

const Edit = (props) => {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [fullname, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        axios.get('http://localhost:8000/api/user/' + id)
            .then(res => {
                setName(res.data.name);
                setFullName(res.data.fullname);
                setEmail(res.data.email);
            })
    }, []);

    const updateUser = e => {
        e.preventDefault();
        axios.patch('http://localhost:8000/api/user/' + id, {
            name,
            fullname,
            email
        })
            .then(res => { console.log(res); navigate('/'); window.location.reload()})
            .catch(err => console.error(err));
            
    }

    return (
        <div>
            <PageHeader>
                Edit Profile
            </PageHeader>
            <div className='login-page'>
                <div className='left'>
                    <div class="forms">
                        <form onSubmit={updateUser} >
                        <div class="subtitle"><h3>Let's Edit your Profile!</h3></div>
                        <div class="input-container ic1">
                            <input name="name" value={name} id="firstname" class="input" type="text" placeholder=" " onChange={(e) => { setName(e.target.value) }} />
                            <div class="cut"></div>
                            <label for="firstname" class="placeholder">User Name</label>
                        </div>
                        <div class="input-container ic2">
                            <input name="fullname" value={fullname} id="lastname" class="input" type="text" placeholder=" " onChange={(e) => { setFullName(e.target.value) }} />
                            <div class="cut"></div>
                            <label for="lastname" class="placeholder">Full Name</label>
                        </div>
                        <div class="input-container ic2">
                            <input name="email" value={email} id="email" class="input" type="text" placeholder=" "  onChange={(e) => { setEmail(e.target.value) }} />
                            <div class="cut cut-short"></div>
                            <lable for="email" class="placeholder">Email</lable>
                        </div>
                        <button type="text" class="submit">submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Edit;

