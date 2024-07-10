import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from "react-router-dom";
import './style.css'
import "./favorite-view.scss";
import { useNavigate, Link } from 'react-router-dom';
import PageHeader from '../page-header/PageHeader';



const UserDetail = (props) => {
    const [user, setUser] = useState({})
    const [fav, setFav] = useState([])
    const { id } = useParams();
    const navigate = useNavigate()


    useEffect(() => {
        axios.get('http://localhost:8000/api/user/' + id)
            .then(res => setUser(res.data))
            .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/favorites/${id}`)
            .then(res => {setFav(res.data); console.log(res.data)})
            .catch(err => console.error(err));
    }, []);

    const deleteUser = () => {
        axios.delete('http://localhost:8000/api/user/' + id)
            .then(res => {
                console.log(res)
            })
            .catch(err => console.error(err));
        localStorage.removeItem("jwt");
        localStorage.removeItem("loggeduser")
        localStorage.removeItem("userid")
        navigate('/')
        window.location.reload()
    }

    return (
        <div>
            <PageHeader>
                My Profile
            </PageHeader>
            <div className="container">

                <div className="card">
                    <div className="infos">
                        <div className="name">
                            <h2>{user.fullname}</h2>
                            <h4>@{user.name}</h4>
                        </div>
                        <p className="text">
                            {user.email}
                        </p>
                        <ul className="stats">
                            <li>
                                <h3>{fav.length}</h3>
                                <h4>Favorites</h4>
                            </li>
                        </ul>
                        <div className="links">

                            <Link to={"/user/" + user._id + "/edit"}> <button className="follow">Edit</button> </Link>
                            <button onClick={deleteUser} className="view">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserDetail;

