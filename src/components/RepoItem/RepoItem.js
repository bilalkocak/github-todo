import React from 'react';
import PropTypes from 'prop-types';
import styles from './RepoItem.module.scss'

const RepoItem = ({repo, order}) => {
    return (
        <div className={styles.container}>
            <div className={styles.order}>
                {order}
            </div>
            <div className={styles.detail}>
                <h4 onClick={()=>window.open(repo.html_url, "_blank")}>{repo.name}</h4>
                {
                    repo.description &&
                    <p>{repo.description}</p>
                }
                <div className={styles.topics}>
                    {
                        repo.topics.map((topic, index) => {
                            return (
                                <span
                                    onClick={() => window.open(`https://github.com/topics/${topic}`, "_blank")}
                                    key={index}
                                    className={styles.topic}>
                                    {topic}
                                </span>
                            )
                        })
                    }
                </div>
            </div>

        </div>
    );
};

RepoItem.propTypes = {
    repo: PropTypes.object.isRequired
};

export default RepoItem;
