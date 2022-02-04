import React, {useEffect, useContext} from 'react';
import styles from './MainPage.module.scss';
import Button from '../../components/Button/Button';
import {Github} from "../../components/icons";
import {supabase} from "../../client";
import AppContext from "../../Context/ContextProvider";


function MainPage() {

    const {setToken} = useContext(AppContext);


    const signInWithGithub = async () => {
        await supabase.auth.signIn({
            provider: 'github',
        }, {
            scopes: 'repo gist notifications'
        })

    }
    const signOut = async () => {
        await supabase.auth.signOut();
    }

    const addUser = async () => {
        await supabase
            .from('users')
            .insert([
                {name: 'test'},
            ], {returning: 'minimal'})
            .single()
    }
    useEffect(() => {
        window.addEventListener('hashchange', () => {
            setToken(supabase.auth.session().provider_token)
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
