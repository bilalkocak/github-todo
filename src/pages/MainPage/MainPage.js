import React, {useEffect, useState} from 'react';
import styles from './MainPage.module.scss';
import Button from '../../components/Button/Button';
import {Github} from "../../components/icons";
import {supabase} from "../../client";


function MainPage(props) {
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState(null);


    const fetchUsers = async () => {
        let { data: users, error } = await supabase
            .from('users')
            .select('*')
        setUsers(users)
    }

    const checkUser = async () => {
        const _user = await supabase.auth.user();
        setUser(_user)
    }

    const signInWithGithub = async () => {
        await supabase.auth.signIn({
            provider: 'github',
        });
    }
    const signOut = async () => {
        await supabase.auth.signOut();
        setUser(null)
    }

    const addUser = async () => {
        await supabase
            .from('users')
            .insert([
                { name: 'test' },
            ], { returning: 'minimal' })
            .single()
    }
    useEffect(() => {
        window.addEventListener('hashchange', () => {
            checkUser();
        })
        fetchUsers()
    }, []);

    useEffect(()=>{
        if(user?.aud==="authenticated") {
            // içeri al
        }
    },[user])

    return <div className={styles.container}>
        <div className={styles.content}>
            <h1>ToDo App</h1>
            <p>
                This is a simple todo list app.
            </p>
            <Button
                onClick={signInWithGithub}
                text={'Sign In With Github'}
                icon={<Github />}
            />
        </div>
    </div>;
}

export default MainPage;
