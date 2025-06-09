
import { Navigate } from 'react-router-dom';

export default function Auth() {
  // No longer show login modal, just redirect to home page
  return <Navigate to="/" replace />;
}
