import React, {useContext, useEffect, useState} from 'react';
import TodoItem from "../TodoItem/TodoItem";
import styles from './TodoList.module.scss';
import TextArea from "../TextArea/TextArea";
import Button from "../Button/Button";
import {supabase} from "../../client";
import AppContext from "../../Context/ContextProvider";
import {toast} from 'react-toastify';
import PuffLoader from "react-spinners/PuffLoader";
import SubTodoList from "../SubTodoList/SubTodoList";


const TodoList = () => {
    const [todoText, setTodoText] = useState('');
    const [todos, setTodos] = useState([]);
    const [subTodos, setSubTodos] = useState([]);
    const [todosLoading, setTodosLoading] = useState(true);
    const [isSubMode, setIsSubMode] = useState(false);
    const [subId, setSubId] = useState(null);
    const {user} = useContext(AppContext);

    const fetchTodos = async () => {
        let {data: _todos} = await supabase
            .from('todos')
            .select("*")
            .eq('user_id', user.id)
        setTodos(_todos);
    }

    const fetchSubTodos = async (id) => {
        let {data: _todos} = await supabase
            .from('sub_task')
            .select("*")
            .eq('todo_id', id)
            .order('is_done', { ascending: true })
        setSubTodos(_todos);
    }
    useEffect(() => {
        fetchTodos().finally(() => setTodosLoading(false));
    }, [user]);

    const addTodo = async () => {
        await supabase
            .from('todos')
            .insert([
                {desc: todoText, user_id: user.id}
            ], {returning: 'minimal'})
            .single()
    }

    const addSubTodo = async () => {
        await supabase
            .from('sub_task')
            .insert([
                {text: todoText, todo_id: subId}
            ], {returning: 'minimal'})
            .single()
    }

    const handleSubmit = () => {
        if(todoText===""){
            toast.error("Please enter a todo");
            return;
        }
        isSubMode ?
            addSubTodo()
                .then(() => {
                    setTodoText('');
                    fetchSubTodos(subId).then(() => {
                        setIsSubMode(true);
                        setSubId(subId);
                    })
                    toast("Todo added successfully");
                })
            :
            addTodo().then(() => {
                setTodoText('');
                fetchTodos();
                toast("Todo added successfully");
            })

    }

    const handleClickTodo = (id) => {
        fetchSubTodos(id).then((res) => {
            setIsSubMode(true);
            setSubId(id);
        })
    }
    return (
        <div className={styles.container}>
            <h2 onClick={()=>setIsSubMode(false)}>My Todo List</h2>
            {todosLoading && <div className={styles.centered}>
                <PuffLoader
                    size={100}
                    color={"#123abc"}
                    loading={true}
                />
            </div>}
            {
                isSubMode ? <SubTodoList todos={subTodos} refresh={fetchSubTodos}/> :
                    todos.map((todo, index) => (
                        <TodoItem
                            key={todo.id}
                            todo={todo}
                            order={index + 1}
                            onClick={handleClickTodo}
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
