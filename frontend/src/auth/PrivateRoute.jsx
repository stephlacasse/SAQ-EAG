import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getCurrentUser } from 'aws-amplify/auth';

async function isAuthenticated() {
  try {
    const user = await getCurrentUser();
    return !!user;
  } catch {
    return false;
  }
}

function PrivateRoute({ children }) {
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    isAuthenticated().then((isAuth) => {
      setAuth(isAuth);
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Loading...</div>;

  return auth ? children : <Navigate to="/auth" />;
}

export default PrivateRoute;
