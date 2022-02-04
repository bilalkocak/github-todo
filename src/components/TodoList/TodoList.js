import React from 'react';
import TodoItem from "../TodoItem/TodoItem";
import styles from './TodoList.module.scss';
import TextArea from "../TextArea/TextArea";
import Button from "../Button/Button";

const TodoList = ({todos}) => {
    const [todoText, setTodoText] = React.useState('');
    return (
        <div className={styles.container}>
            <h2>My Todo List</h2>
            {todos.map((todo,index) => (
                <TodoItem key={todo.id} todo={todo} order={index+1}/>
            ))}
            <div className={styles.footer}>
                <TextArea customClass={styles.input}
                          onChange={(e) => setTodoText(e.target.value)}
                          value={todoText}/>
                <Button text={'Add'}
                        customClass={styles.button}
                        onClick={() => {
                            setTodoText('');
                            todos.push({
                                id: todos.length,
                                text: todoText,
                                completed: false
                            });
                        }}/>
            </div>
        </div>
    );
};

export default TodoList;
