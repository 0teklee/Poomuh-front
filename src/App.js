import './App.css';
import { Routes, BrowserRouter, Route } from 'react-router-dom';
import Main from './pages/main/Main';
import MapPage from './pages/map-page/MapPage';
import Login from './pages/login/Login';
import SignUp from './pages/signup/SignUp';
import ManageForm from './pages/manage-form/ManageForm';
import ManageList from './pages/manage-list/ManageList';
import Favorite from './pages/favorite/Favorite';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/search" element={<MapPage />} />
        <Route path="/favorite" element={<Favorite />} />
        <Route path="/manage/form" element={<ManageForm />} />
        <Route path="/manage/list" element={<ManageList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
