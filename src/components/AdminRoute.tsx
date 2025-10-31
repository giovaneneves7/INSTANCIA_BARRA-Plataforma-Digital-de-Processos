import { useEffect, useState, type JSX } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../api/SupabaseClient";

const ADMIN_EMAIL = "admin.pdp@presidentedutra.ba.gov.br";

/*
* @author Caio Alves
*/
export default function AdminRoute({ children }: { children: JSX.Element }) {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      if (user && user.email === ADMIN_EMAIL) {
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
      }
    };

    checkUser();
  }, []); 

  if (isAuthorized === null) {
    return <div>Verificando credenciais...</div>;
  }

  if (!isAuthorized) {
    return <Navigate to="/login" replace />;
  }

  return children;
}