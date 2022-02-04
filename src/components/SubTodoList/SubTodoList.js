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

    const onChange = (id, status, parentId) => {
        toggleCheckbox(id, status).then(() => {
            toast("Todo updated successfully");
            refresh(parentId)
        })
    }

    const onClickDelete = async (id, parentId) => {
        const {error} = await supabase
            .from('sub_task')
            .delete()
            .eq('id', id)
        if (error) {
            toast.error("Error deleting todo");
        } else {
            toast.success("Todo deleted successfully");
            refresh(parentId)
        }
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
                            <input type="checkbox" onChange={() => onChange(todo.id, todo.is_done, todo.todo_id)}
                                   className={styles.realCheckbox}
                                   id={`${index}-${todo.id}`}
                                   value={todo.is_done}/>
                            {todo.is_done && <div>&#x2713;</div>}
                        </div>
                    </label>

                    <label htmlFor={`${index}-${todo.id}`}>
                        <span className={classNames(styles.desc, todo.is_done && styles.active)}>{todo.text}</span>
                    </label>

                    <div className={styles.delete} onClick={() => onClickDelete(todo.id, todo.todo_id)}>
                        Delete
                    </div>

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
