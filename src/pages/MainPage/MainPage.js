import React, {useContext} from 'react';
import styles from './MainPage.module.scss';
import Button from '../../components/Button/Button';
import {Github} from "../../components/icons";
import AppContext from "../../Context/ContextProvider";


function MainPage() {
    const {
        signInWithGithub,
    } = useContext(AppContext);

    return <div className={styles.container}>
        <div className={styles.content}>
            <h1>ToDo App</h1>
            <p>
                This is a simple todo list app.
            </p>
            <Button
                customClass={styles.button}
                onClick={() => signInWithGithub()}
                text={'Sign In With Github'}
                icon={<Github/>}
            />
        </div>
    </div>;
}

export default MainPage;
