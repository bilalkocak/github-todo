import React from 'react';
import PropTypes from 'prop-types';
import styles from './TodoItem.module.scss'

const TodoItem = ({todo,order}) => {
    return (
        <div className={styles.container}>
            <div className={styles.order}>{order}</div>
            <div className={styles.text}>{todo.text}</div>
            <span className={styles.detail}>Details...</span>
        </div>
    );
};

TodoItem.propTypes = {

};

export default TodoItem;
