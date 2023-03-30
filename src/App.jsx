import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import ClientRoutes from './routes/ClientRoutes';
import AdminRoutes from './routes/AdminRoutes';
import Error from './pages/Client/Error'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/*' element={<ClientRoutes />} />
          <Route path='/admin/*' element={<AdminRoutes />} />
          <Route path='*' element={<Error />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
