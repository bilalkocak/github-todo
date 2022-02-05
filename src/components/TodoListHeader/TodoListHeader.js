import React from 'react';
import PropTypes from 'prop-types';
import styles from './TodoListHeader.module.scss'

const TodoListHeader = ({selectedTodo, onClickBack}) => {
    return (
        <div className={styles.container}>
            {
                selectedTodo ? <h2>{selectedTodo.desc}</h2>
                    : <h2>My Todo List</h2>
            }
            {
                selectedTodo &&
                <div className={styles.backButton} onClick={onClickBack}>
                    Back
                </div>
            }
        </div>
    );
};

TodoListHeader.propTypes = {
    selectedTodo: PropTypes.object,
    onClickBack: PropTypes.func
};

export default TodoListHeader;
