import React from 'react';
import PropTypes from 'prop-types';
import styles from "../SubTodoList/SubTodoList.module.scss";
import classNames from "classnames";
import Delete from '../../assets/images/delete.png';

const SubTodoItem = ({todo, onClickSubTodo, onClickDelete}) => {
    return (
        <div className={styles.item} key={todo.id}>
            <div className={styles.content}>
                <label htmlFor={`subTodo-${todo.id}`}>
                    <div className={classNames(styles.checkbox, todo.is_done && styles.active)}>
                        <input type="checkbox" onChange={() => onClickSubTodo(todo.id, todo.is_done, todo.todo_id)}
                               className={styles.realCheckbox}
                               id={`subTodo-${todo.id}`}
                               value={todo.is_done}/>
                        {todo.is_done && <div>&#x2713;</div>}
                    </div>
                </label>

                <label htmlFor={`subTodo-${todo.id}`}>
                    <span className={classNames(styles.desc, todo.is_done && styles.active)}>{todo.text}</span>
                </label>
            </div>

            <div className={styles.delete} onClick={() => onClickDelete(todo.id, todo.todo_id)}>
                <img src={Delete} alt=""/>
            </div>

        </div>
    );
};

SubTodoItem.propTypes = {
    todo: PropTypes.object.isRequired,
    onClickSubTodo: PropTypes.func.isRequired,
    onClickDelete: PropTypes.func.isRequired
};

export default SubTodoItem;
