import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Register from './pages/Register';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import PrivateRouter from './privateRoute';
import Messenger from './pages/Messenger';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route
          path="/messenger"
          element={
            <PrivateRouter>
              <Messenger />
            </PrivateRouter>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
