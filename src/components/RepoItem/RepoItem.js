import React from 'react';
import PropTypes from 'prop-types';
import styles from './RepoItem.module.scss'

const RepoItem = ({repo}) => {
    return (
        <div className={styles.container}>
            {repo.name}
        </div>
    );
};

RepoItem.propTypes = {
    repo: PropTypes.object.isRequired
};

export default RepoItem;
