import React from 'react';
import PropTypes from 'prop-types';
import styles from './TodoItem.module.scss'

const TodoItem = ({todo, order, onClick}) => {
    return (
        <div className={styles.container}>
            <div className={styles.order}>{order}</div>
            <div className={styles.text}>{todo.desc}</div>
            <span className={styles.detail} onClick={() => onClick(todo.id)}>Details...</span>
        </div>
    );
};

TodoItem.propTypes = {
    todo: PropTypes.object.isRequired,
    order: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired
};

export default TodoItem;
