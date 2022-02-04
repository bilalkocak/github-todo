import MainPage from './pages/MainPage/MainPage';
import './assets/styles/App.scss'
import {
    Routes,
    Route,
} from "react-router-dom";
import AppPage from "./pages/AppPage/AppPage";
import {ContextProvider} from "./Context/ContextProvider";
import 'react-toastify/dist/ReactToastify.css';
import Layout from "./components/Layout/Layout";


function App() {


    return (
        <ContextProvider>
            <div className="App">
                <Layout>
                    <Routes>
                        <Route path="/" element={<MainPage/>}/>
                        <Route path="/app" element={<AppPage/>}/>
                    </Routes>
                </Layout>

            </div>
        </ContextProvider>

    );
}

export default App;
