import React from 'react';
import style from "../style/mainpage.module.css";

function CreateModal({onCreated}) {
    return (
        <div className={style.modalBack}>
            <div className={style.modal}>

                <p>user created</p>
                <button onClick={onCreated}>close</button>
            </div>
        </div>

    );
}

export default CreateModal;