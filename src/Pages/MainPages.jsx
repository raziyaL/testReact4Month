import React, {useEffect, useState} from 'react';
import Users from "../Components/Users";
import style from '../style/mainpage.module.css'
import DeleteModal from "../Components/DeleteModal";
import CreateModal from "../Components/CreateModal";


function MainPages(props) {
    const [deleteModal, setDeleted] = useState(false);
    const [createdModal, setCreateModal] = useState(false);

    const [userName, setUserName] = useState({
        name: '',
        email:'',
        username:''
    });

    const [todos, setTodos] = useState([]);

    function handleChange(e) {
        const { name, value } = e.target;
        setUserName(prevState => ({
            ...prevState,
                [name]: value
        }))
    }


    async function createUser(event){
        event.preventDefault();

        const {name, email, username} = userName;

        if(name.trim() === "" || email.trim() === "" || username.trim() === "" ){
            alert("Please enter your name");
            return
        }
        const data = {
        name: userName.name,
            email: userName.email,
            username: userName.username
        }

        const response = await fetch('http://localhost:8000/users', {
            method: 'POST',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })
        setUserName({
            name: "",
            email: "",
            username: ""
        })
        setCreateModal(true)
        createTodo()
        }
        async function createTodo(){
            const response = await fetch('http://localhost:8000/users')
            const data = await response.json();
            setTodos(data)
        }

        useEffect(()=>{
            createTodo()
        }, [])

    async function onDelete(id){
        const response = await fetch(`http://localhost:8000/users/${id}`, {
            method: 'DELETE'
        })
        setDeleted(true)
        createTodo()
    }



    return (
        <div>
            <form className={style.form} action="" onSubmit={createUser}>
                <input
                    className={style.input}
                    name="name"
                    value={userName.name}
                    onChange={handleChange}
                    placeholder="NAME"
            />
                <input
                    className={style.input}


                    name="email"
                value={userName.email}
                onChange={handleChange}
                placeholder="EMAIL"/>

                <input
                    className={style.input}

                    name="username"
                value={userName.username}
                onChange={handleChange}
                placeholder="USERNAME"/>
                <button className={style.createButton} type="submit">create</button>
            </form>

            <ul>

                <div className={style.title}>
                    <div><h3>NAME</h3></div>
                    <div><h3>EMAIL</h3></div>
                    <div><h3>USERNAME</h3></div>
                    <div><h3>ACTIONS</h3></div>
                </div>
                {
                    todos.length > 0 ?
                        todos.map((item) =>
                            <Users key={item.id} item={item} deleteName={onDelete}/>)
                        : <p>list empty </p>
                }
            </ul>
            {deleteModal && <DeleteModal onClose={()=>{
                setDeleted(false)
            }} />}
            {createdModal && <CreateModal onCreated={()=>{
                setCreateModal(false)
            }} />}
        </div>
    );
}

export default MainPages;