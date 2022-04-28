import './App.css';
import { Routes, BrowserRouter, Route } from 'react-router-dom';
import Main from './pages/main/Main';
import MapPage from './pages/map-page/MapPage';
import Login from './pages/login/Login';
import SignUp from './pages/signup/SignUp';
import ManageForm from './pages/manage-form/ManageForm';
import ManageList from './pages/manage-list/ManageList';
import FavoriteRecent from './pages/favorite-recent/FavoriteRecent';
import FavoritePreempt from './pages/favorite-preempt/FavoritePreempt';
// import Room from './pages/room/Room';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/search" element={<MapPage />} />
        <Route path="/favorite/recent-room" element={<FavoriteRecent />} />
        <Route path="/favorite/preempt-room" element={<FavoritePreempt />} />
        <Route path="/manage/form" element={<ManageForm />} />
        <Route path="/manage/form/:id" element={<ManageForm />} />
        <Route path="/manage/list" element={<ManageList />} />
        {/* <Route path="/room" element={<Room />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
