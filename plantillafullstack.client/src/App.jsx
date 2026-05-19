import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import AppRoutes from './routes/AppRoutes';
import styles from './App.module.css';

function App() {
    return (
        <BrowserRouter>
            <div className="app-container">
                <Header />
                <main className="main-content">
                    <AppRoutes />
                </main>
                <Footer />
            </div>
        </BrowserRouter>
    )
}

export default App;