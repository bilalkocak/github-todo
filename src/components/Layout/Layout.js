import React, {useContext} from 'react';
import styles from './Layout.module.scss'
import Button from "../Button/Button";
import {ToastContainer} from "react-toastify";
import {supabase} from "../../client";
import AppContext from "../../Context/ContextProvider";
import {useNavigate} from "react-router-dom";

const Layout = props => {
    let navigate = useNavigate();

    const {user, setUser, setToken} = useContext(AppContext);

    const signOut = async () => {
        await supabase.auth.signOut();
        setUser(null);
        setToken(null);
        navigate('/')
    }
    return (
        <div>
            {user && <div className={styles.header}>
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

Layout.propTypes = {};

export default Layout;
