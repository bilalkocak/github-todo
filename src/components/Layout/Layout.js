import React from 'react';
import styles from './Layout.module.scss'
import Button from "../Button/Button";
import {ToastContainer} from "react-toastify";
const Layout = props => {
    return (
        <div>
            <div className={styles.header}>
               <h1>TODO APP</h1>
                <Button text={'Logout'}/>
            </div>
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

Layout.propTypes = {

};

export default Layout;
