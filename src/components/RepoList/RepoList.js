import React, {useContext, useEffect, useState} from 'react';
import RepoItem from '../RepoItem/RepoItem';
import styles from './RepoList.module.scss'
import AppContext from "../../Context/ContextProvider";
import PuffLoader from "react-spinners/PuffLoader";

const RepoList = () => {
    const {fetchRepos, repoList, session} = useContext(AppContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (session) {
            fetchRepos().finally(() => {
                setLoading(false);
            });
        }
    }, [session]);


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
                    {repoList && repoList.length > 0 ?
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
