import React, {useContext} from 'react';
import styles from './Layout.module.scss'
import Button from "../Button/Button";
import {ToastContainer} from "react-toastify";
import AppContext from "../../Context/ContextProvider";

const Layout = props => {
    const {signOut, session} = useContext(AppContext);

    return (
        <div>
            {session && <div className={styles.header}>
                <h1>TODO APP</h1>
                <Button onClick={() => signOut()} text={'Logout'}/>
            </div>}
            <div className={styles.content}>
                {props.children}
            </div>
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />

        </div>
    );
};

export default Layout;
