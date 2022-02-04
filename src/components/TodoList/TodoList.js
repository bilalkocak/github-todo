import React, {useContext, useEffect} from 'react';
import TodoItem from "../TodoItem/TodoItem";
import styles from './TodoList.module.scss';
import TextArea from "../TextArea/TextArea";
import Button from "../Button/Button";
import {supabase} from "../../client";
import AppContext from "../../Context/ContextProvider";
import {toast} from 'react-toastify';


const TodoList = () => {
    const [todoText, setTodoText] = React.useState('');
    const [todos, setTodos] = React.useState([]);
    const {user} = useContext(AppContext);

    const fetchTodos = async () => {
        let {data: _todos} = await supabase
            .from('todos')
            .select("*")
            .eq('user_id', user.id)
        setTodos(_todos);
    }
    useEffect(() => {
        fetchTodos()
    }, [user]);

    const addTodo = async () => {
        await supabase
            .from('todos')
            .insert([
                {desc: todoText, user_id: user.id}
            ], {returning: 'minimal'})
            .single()
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        addTodo().then(() => {
            setTodoText('');
            fetchTodos();
            toast("Wow so easy!")
        })
    }
    return (
        <div className={styles.container}>
            <h2>My Todo List</h2>
            {todos.map((todo, index) => (
                <TodoItem key={todo.id} todo={todo} order={index + 1}/>
            ))}
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
