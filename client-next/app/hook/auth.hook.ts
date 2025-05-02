import { CREATE_USER, LOGIN, LOGOUT } from "@/requetes/mutations"; // Mutation pour login
import { ME } from "@/requetes/queries";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type User = {
  id: string;
  name: string;
  email: string;
};

type Register = {
  name: string;
  email: string;
  password: string;
};

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const { data, loading, error } = useQuery(ME, {
    skip: isAuthenticated,
  });

  useEffect(() => {
    if (data?.me) {
      setUser(data.me);
      setIsAuthenticated(true);
    }
  }, [data]);

  // Fonction pour se connecter et stocker le token dans le cookie
  const [loginMutation] = useMutation(LOGIN, {
    refetchQueries: [ME],
    onCompleted: (data) => {
      if (data.login.success) {
        setIsAuthenticated(true);
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

  const [mutateFunction] = useMutation(CREATE_USER, {
    update(cache, { data }) {
      const newUser = data?.register;
      if (!newUser) return;

      cache.modify({
        fields: {
          users(existingUsers = []) {
            const newUserRef = cache.writeFragment({
              data: newUser,
              fragment: gql`
                fragment NewUser on User {
                  id
                  name
                }
              `,
            });

            return [...existingUsers, newUserRef];
          },
        },
      });
    },
    onCompleted: (data) => {
      toast.success(`User ${data.register.name} created successfully!`);
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

  const register = async (values: Register) => {
    await mutateFunction({
      variables: {
        registerInput: {
          name: values.name,
          email: values.email,
          password: values.password,
        },
      },
    });
  };

  return { isAuthenticated, user, loading, error, login, logout, register };
};

export default useAuth;
