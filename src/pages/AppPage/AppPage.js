import React from 'react';
import styles from './AppPage.module.scss'
import RepoList from "../../components/RepoList/RepoList";
import TodoList from "../../components/TodoList/TodoList";

const AppPage = () => {

    return (

        <div className={styles.container}>

            <RepoList />
            <TodoList />
        </div>

    )
        ;
};


export default AppPage;
