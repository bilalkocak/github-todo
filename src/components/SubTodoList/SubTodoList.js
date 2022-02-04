import React from 'react';
import PropTypes from 'prop-types';
import styles from './SubTodoList.module.scss'
import classNames from "classnames";
import {supabase} from "../../client";
import {toast} from "react-toastify";

const SubTodoList = ({todos, refresh}) => {
    const toggleCheckbox = async (id, status) => {
        await supabase
            .from('sub_task')
            .update({is_done: !status})
            .eq('id', id)
    }

    const onChange = (e, id, status, parentId) => {
        toggleCheckbox(id, status).then(() => {
            toast("Todo updated successfully");
            refresh(parentId)
        })
    }


    return (
        <div>
            {
                todos.length === 0
                &&
                <div className={styles.centered}>
                    <p>No todos</p>
                </div>
            }

            {todos.map((todo, index) => (
                <div className={styles.item} key={todo.id}>
                    <label htmlFor={`${index}-${todo.id}`}>
                        <div className={classNames(styles.checkbox, todo.is_done && styles.active)}>
                            <input type="checkbox" onChange={e => onChange(e, todo.id, todo.is_done, todo.todo_id)}
                                   className={styles.realCheckbox}
                                   id={`${index}-${todo.id}`}
                                   value={todo.is_done}/>
                            {todo.is_done && <div>&#x2713;</div>}
                        </div>
                    </label>

                    <label htmlFor={`${index}-${todo.id}`}>
                        <span>{todo.text}</span>
                    </label>

                </div>
            ))}
        </div>
    );
};

SubTodoList.propTypes = {
    todos: PropTypes.array.isRequired,
    refresh: PropTypes.func.isRequired
};

export default SubTodoList;
