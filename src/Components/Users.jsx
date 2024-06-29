import React from 'react';
import style from '../style/mainpage.module.css'

function Users({item, deleteName}) {
    return (
        <div className={style.container}>

            <li className={style.list}>
                <div>
                    <p>{item.name}</p>
                </div>

                <div>
                    <p>{item.email}</p>
                </div>
                <div>
                    <p>{item.username}</p>
                </div>

                <div>
                    <button onClick={() => deleteName(item.id)} >delete</button>
                </div>

            </li>
        </div>
    );
}

export default Users;


