import React, {useContext, useEffect, useState} from 'react';
import TodoItem from "../TodoItem/TodoItem";
import styles from './TodoList.module.scss';
import TextArea from "../TextArea/TextArea";
import Button from "../Button/Button";
import AppContext from "../../Context/ContextProvider";
import {toast} from 'react-toastify';
import PuffLoader from "react-spinners/PuffLoader";
import SubTodoList from "../SubTodoList/SubTodoList";
import TodoListHeader from "../TodoListHeader/TodoListHeader";


const TodoList = () => {
    const [todoText, setTodoText] = useState('');
    const [todosLoading, setTodosLoading] = useState(true);
    const [selectedTodo, setSelectedTodo] = useState(null);
    const {
        fetchTodos,
        addSubTodo,
        fetchSubTodos,
        addTodo,
        subTodos,
        todos,
        session,
        deleteTodo
    } = useContext(AppContext);


    useEffect(() => {
        if (session) {
            fetchTodos().finally(() => setTodosLoading(false));
        }
    }, [session]);


    const handleSubmit = () => {
        if (todoText === "") {
            toast.error("Please enter a todo");
            return;
        }
        selectedTodo ?
            addSubTodo(todoText, selectedTodo.id)
                .then(() => {
                    setTodoText('');
                    fetchSubTodos(selectedTodo.id);
                    toast.success("Todo added successfully");
                })
            :
            addTodo(todoText).then(() => {
                setTodoText('');
                fetchTodos();
                toast.success("Todo added successfully");
            })

    }

    const handleClickTodoDetail = (todo) => {
        fetchSubTodos(todo.id).then(() => {
            setSelectedTodo(todo);
        })
    }

    const handleClickTodoDelete = (todo) => {
        deleteTodo(todo.id)
    }
    return (
        <div className={styles.container}>
            <TodoListHeader
                onClickBack={() => setSelectedTodo(null)}
                selectedTodo={selectedTodo}
            />
            {todosLoading && <div className={styles.centered}>
                <PuffLoader
                    size={100}
                    color={"#123abc"}
                    loading={true}
                />
            </div>}
            {
                selectedTodo ? <SubTodoList todos={subTodos} refresh={fetchSubTodos}/> :
                    todos && todos.map((todo, index) => (
                        <TodoItem
                            key={todo.id}
                            todo={todo}
                            order={index + 1}
                            onClickDetail={handleClickTodoDetail}
                            onClickDelete={handleClickTodoDelete}
                        />
                    ))
            }
            <div className={styles.footer}>
                <TextArea customClass={styles.input}
                          onChange={(e) => setTodoText(e.target.value)}
                          value={todoText}/>
                <Button text={'Add'}
                        customClass={styles.button}
                        onClick={(e) => handleSubmit(e)}/>
            </div>
        </div>
    );
};

export default TodoList;
