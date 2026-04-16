import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
    return (
        <BrowserRouter>
            <div className="container mt-4">
                <Routes>
                    <Route path="/" element={<h1>Welcome to the Plantilla Fullstack App!</h1>} />
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App;