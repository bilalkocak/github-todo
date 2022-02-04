import MainPage from './pages/MainPage/MainPage';
import './assets/styles/App.scss'
import {
    Routes,
    Route,
} from "react-router-dom";
import AppPage from "./pages/AppPage/AppPage";
import {ContextProvider} from "./Context/ContextProvider";

function App() {


    return (
        <ContextProvider>
            <div className="App">
                <Routes>
                    <Route path="/" element={<MainPage/>}/>
                    <Route path="/app" element={<AppPage/>}/>
                </Routes>
            </div>
        </ContextProvider>

    );
}

export default App;
