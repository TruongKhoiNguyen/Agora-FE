/* eslint-disable react/prop-types */
import { Navigate } from 'react-router-dom';

const PrivateRouter = ({ children }) => {
  const accessToken = localStorage.getItem('accessToken');
  return accessToken ? children : <Navigate to="/login" />;
};

export default PrivateRouter;
