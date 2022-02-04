import React, {useEffect, useContext} from 'react';
import styles from './MainPage.module.scss';
import Button from '../../components/Button/Button';
import {Github} from "../../components/icons";
import {supabase} from "../../client";
import AppContext from "../../Context/ContextProvider";


function MainPage() {
    const {setToken, setUser} = useContext(AppContext);

    const signInWithGithub = async () => {
        await supabase.auth.signIn({
            provider: 'github',
        }, {
            scopes: 'repo gist notifications'
        })
    }

    const fetchUser = async (email) => {
        let {data: users, error} = await supabase
            .from('users')
            .select("*")
            .eq('mail', email)

        if (users.length === 0) {
            await addUser(email)
        } else {
            setUser(users[0])
        }
    }


    const addUser = async (email) => {
        await supabase
            .from('users')
            .insert([
                {mail: email},
            ], {returning: 'minimal'})
            .single()
    }
    useEffect(() => {
        window.addEventListener('hashchange', () => {
            setToken(supabase.auth.session().provider_token)
            const user = supabase.auth.user()
            fetchUser(user.email)
        })
    }, []);


    return <div className={styles.container}>
        <div className={styles.content}>
            <h1>ToDo App</h1>
            <p>
                This is a simple todo list app.
            </p>
            <Button
                customClass={styles.button}
                onClick={() => signInWithGithub()}
                text={'Sign In With Github'}
                icon={<Github/>}
            />

        </div>
    </div>;
}

export default MainPage;
