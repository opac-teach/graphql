import { LOGIN, LOGOUT } from "@/requetes/mutations"; // Mutation pour login
import { ME } from "@/requetes/queries";
import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { toast } from "sonner";

type User = {
  id: string;
  name: string;
  email: string;
};

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const { loading, error } = useQuery(ME, {
    skip: isAuthenticated,
    onCompleted: (data) => {
      if (data?.me) {
        setUser(data.me);
        setIsAuthenticated(true);
      }
    },
  });

  // Fonction pour se connecter et stocker le token dans le cookie
  const [loginMutation] = useMutation(LOGIN, {
    refetchQueries: [ME], // Réexécuter la requête ME après la connexion
    onCompleted: (data) => {
      if (data.login.success) {
        // document.cookie = `access_token=${data.login.token}; path=/; secure; HttpOnly`; // Stocke le token dans un cookie HttpOnly
        setIsAuthenticated(true); // L'utilisateur est maintenant authentifié
        toast.success(data.login.message);
      } else {
        toast.error(data.login.message);
      }
    },
    onError: (error) => {
      console.error("Login failed", error);
    },
  });

  const [logoutMutation] = useMutation(LOGOUT, {
    onCompleted: (data) => {
      if (data.logout.success) {
        setIsAuthenticated(false);
        setUser(null);
        window.location.reload();
        toast.success(data.logout.message);
      } else {
        toast.error(data.logout.message);
      }
    },
    onError: (error) => {
      console.error("Logout failed", error);
    },
  });

  const login = async (email: string, password: string) => {
    await loginMutation({
      variables: { loginInput: { email, password } },
    });
  };

  const logout = async () => {
    await logoutMutation();
  };

  return { isAuthenticated, user, loading, error, login, logout };
};

export default useAuth;
