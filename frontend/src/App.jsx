import { Routes, Route } from 'react-router';
import Home from './Pages/Home';

import Header from "./components/Header"
import PrivateRoute from "./routes/PrivateRoute"
import RegisterPage from './Pages/Register';
import LoginPage from './Pages/Login';
import AboutPage from './Pages/About';
import ContactPage from './Pages/Contact';
import ProfilePage from './Pages/Profile';
import BoardsPage from './Pages/Board';
import SingleBoardPage from './Pages/SingleBoard';
import TaskDetailsPage from './Pages/TaskDetailPage';
import JoinBoardPage from './Pages/JoinBoard';
function App() {
  return (
    <div
      className=''
    >
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/boards" element={<BoardsPage />} />
          <Route path="/join-board" element={<JoinBoardPage />} />
          <Route path="/boards/:boardId" element={<SingleBoardPage />} />
          <Route path="/tasks/:id" element={<TaskDetailsPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
