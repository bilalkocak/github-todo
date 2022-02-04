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
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

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
            .finally(() => {
                setLoading(false);
            });
    }
    return (
        <div className={styles.container}>
            <h2>My Github Repos</h2>
            {loading ?
                <div className={styles.centered}>
                    <PuffLoader
                        size={100}
                        color={"#123abc"}
                        loading={true}
                    />
                </div>
                :
                <div>
                    {repoList.length > 0 ?
                            repoList.map((repo, index) => {
                                return (
                                    <RepoItem key={repo.id} repo={repo} order={index + 1}/>
                                )
                            })
                        :
                        <div className={styles.centered}>
                            You have no repositories
                        </div>}
                </div>
            }
        </div>
    );
};


export default RepoList;
