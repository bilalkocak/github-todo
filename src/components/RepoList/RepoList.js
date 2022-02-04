import React, {useContext, useEffect, useState} from 'react';
import RepoItem from '../RepoItem/RepoItem';
import styles from './RepoList.module.scss'
import axios from "axios";
import AppContext from "../../Context/ContextProvider";
import PuffLoader from "react-spinners/PuffLoader";
import {useNavigate} from "react-router-dom";

const RepoList = () => {
    const {token} = useContext(AppContext);
    const [repoList, setRepoList] = useState([]);

    useEffect(() => {
        fetchRepos();
    }, [token]);

    useEffect(() => {
        !Boolean(token) && navigate('/');
    }, []);

    const fetchRepos = () => {
        axios.get('https://api.github.com/user/repos?per_page=100', {
            headers: {
                Authorization: 'token ' + token //the token is a variable which holds the token
            }
        })
            .then(res => {
                setRepoList(res.data);
            })
    }
    return (
        <div className={styles.container}>
            <h2>My Github Repos</h2>
            <div>
                {
                    repoList.map(repo => {
                        return (
                            <RepoItem key={repo.id} repo={repo}/>
                        )
                    })
                }
            </div>
        </div>
    );
};


export default RepoList;
