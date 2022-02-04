import React, {createContext, useContext} from 'react';
import PropTypes from 'prop-types';
import styles from './AppPage.module.scss'
import RepoList from "../../components/RepoList/RepoList";
import TodoList from "../../components/TodoList/TodoList";

const AppPage = props => {

    return (

        <div className={styles.container}>

            <RepoList repos={[]}/>
            <TodoList todos={[{
                id: 1,
                text:  "bilal",
                isCompleted: false
            }, {
                id: 2,
                text: 'Сделать задание по Redux',
                isCompleted: false
            }]}/>
        </div>

    )
        ;
};

AppPage.propTypes = {};

export default AppPage;
