import React from 'react';
import style from '../style/mainpage.module.css'


function DeleteModal({onClose}) {


    return (
        <div className={style.modalBack}>
            <div className={style.modal}>

                <p>user deleted</p>
                <button onClick={onClose}>close</button>
            </div>
        </div>

    );
}

export default DeleteModal;