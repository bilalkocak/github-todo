import React from 'react';
import PropTypes from 'prop-types';
import styles from './SubTodoList.module.scss'
import {supabase} from "../../client";
import {toast} from "react-toastify";
import SubTodoItem from "../SubTodoItem/SubTodoItem";

const SubTodoList = ({todos, refresh}) => {
    const toggleCheckbox = async (id, status) => {
        await supabase
            .from('sub_task')
            .update({is_done: !status})
            .eq('id', id)
    }

    const handleClickSubTodo = (id, status, parentId) => {
        toggleCheckbox(id, status).then(() => {
            toast.success("Todo updated successfully");
            refresh(parentId)
        })
    }

    const handleClickDelete = async (id, parentId) => {
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
                todos.length === 0 ?
                    <div className={styles.centered}>
                        <p>
                            You have no sub todo
                        </p>
                    </div> :
                    todos.map((todo) => (
                        <SubTodoItem
                            key={todo.id}
                            todo={todo}
                            onClickSubTodo={handleClickSubTodo}
                            onClickDelete={handleClickDelete}
                        />
                    ))
            }

        </div>
    );
};

SubTodoList.propTypes = {
    todos: PropTypes.array.isRequired,
    refresh: PropTypes.func.isRequired
};

export default SubTodoList;
