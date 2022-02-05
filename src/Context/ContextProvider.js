import React, {createContext, useState} from 'react';
import {supabase} from "../client";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import axios from "axios";

const AppContext = createContext();

export const ContextProvider = ({children}) => {
    const [todos, setTodos] = useState([]);
    const [subTodos, setSubTodos] = useState([]);
    const [user, setUser] = useState(null);
    const [session, setSession] = useState(null);
    const [repoList, setRepoList] = useState([]);

    let navigate = useNavigate()

    supabase.auth.onAuthStateChange((event, session) => {
        switch (event) {
            case 'SIGNED_IN':
                if (!user) {
                    setUser(session.user)
                    navigate('/app')
                    setSession(session)
                }
                break;
            case 'SIGNED_OUT':
                setUser(null)
                setSession(session)
                navigate('/')
                break;
            default:
                break;
        }
    })

    const fetchTodos = async () => {
        let {data: _todos} = await supabase
            .from('todo')
            .select("*")
            .eq('uuid', user.id)
        setTodos(_todos);
    };

    const fetchSubTodos = async (id) => {
        let {data: _todos} = await supabase
            .from('sub_task')
            .select("*")
            .eq('todo_id', id)
            .order('is_done', {ascending: true})
        setSubTodos(_todos);
    };

    const addTodo = async (text) => {
        await supabase
            .from('todo')
            .insert([
                {desc: text, uuid: user.id}
            ], {returning: 'minimal'})
            .single()
    }

    const addSubTodo = async (text, subId) => {
        await supabase
            .from('sub_task')
            .insert([
                {text: text, todo_id: subId}
            ], {returning: 'minimal'})
            .single()
    }

    const signInWithGithub = async () => {
        await supabase.auth.signIn({
            provider: 'github',
        }, {
            scopes: 'repo'
        })
    };

    const signOut = async () => {
        await supabase.auth.signOut();
        navigate('/')
    }


    const fetchRepos = () => {
        return axios.get('https://api.github.com/user/repos?per_page=100', {
            headers: {
                Authorization: 'token ' + session.provider_token
            }
        }).then(res => {
            setRepoList(res.data);
        })
    }

    const deleteTodo = async (id) => {
        await supabase
            .from('sub_task')
            .delete()
            .eq('todo_id', id).then(async () => {
                const {error} = await supabase
                    .from('todo')
                    .delete()
                    .eq('id', id)
                if (error) {
                    toast.error("Error deleting todo");
                } else {
                    toast.success("Todo deleted successfully");
                    fetchTodos()
                }
            })
    }
    const value = {
        todos,
        setTodos,
        subTodos,
        setSubTodos,
        fetchSubTodos,
        addSubTodo,
        addTodo,
        fetchTodos,
        signInWithGithub,
        fetchRepos,
        signOut,
        session,
        repoList,
        deleteTodo
    }
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContext;
