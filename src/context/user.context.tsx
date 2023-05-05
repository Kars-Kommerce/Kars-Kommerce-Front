import { createContext, ReactNode, useEffect, useState } from "react";
import Api from "../utils/Api";
import { Flex, Spinner, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { IAdsAuthorProps } from "../utils/Mock";
import Loading from "../components/Loading";

interface IUserProviderProps {
  children: ReactNode;
}

interface IAdsAuthor {
  id: string;
  name: string;
  bio: string;
  is_advertiser: boolean;
}

interface IComments {
  id: number;
  text: string;
  author: IAdsAuthor;
  created_at: Date;
}

interface IUser {
  id: string;
  name: string;
  username: string;
  email: string;
  cpf: string;
  cellphone: string;
  birth_date: string;
  bio: string;
  is_advertiser: boolean;
  created_at: Date;
  updated_at: Date;
  ads: IAdvertisementResponseProps[];
}

interface IAdvertisementResponseProps {
  id: number;
  author: IAdsAuthor;
  title: string;
  description: string;
  model: string;
  brand: string;
  year: number;
  kilometer: number;
  fuel: number;
  fuel_type: string;
  is_active: boolean;
  price: number;
  created_at: Date;
  updated_at: Date;
  comments: IComments[];
  cover_image: string;
  galery: object[];
}

interface IErro {
  response: {
    data: {
      message: string;
    };
  };
}

interface IResponseUserApi {
  data: IUser;
}

interface IResponseLoginApi {
  data: {
    token: string;
  };
}

interface IFormLogin {
  email: string;
  password: string;
}
export interface IFormRegister {
  name: string;
  username: string;
  email: string;
  cpf: string;
  cellphone: string;
  birth_date: string;
  bio?: string;
  address: {
    cep: string;
    state: string;
    city: string;
    street: string;
    number: string;
    complement: string;
  };
  is_advertiser: boolean;
  password: string;
}

interface IUserContext {
  user: IUser | null;
  loadingUser: boolean;
  logout(): void;
  apiLogin(dataForm: IFormLogin): Promise<void>;
  apiRegister(dataForm: IFormRegister): Promise<void>;
  loadingTechs(): void;
}

export const UserContext = createContext<IUserContext>({} as IUserContext);

export function UserProvider({ children }: IUserProviderProps) {
  const [loadingUser, setLoadingUser] = useState<boolean>(true);
  const [user, setUser] = useState<IUser | null>(null);

  const navigate = useNavigate();

  const toast = useToast();

  useEffect(() => {
    async function getUser() {
      const token = localStorage.getItem("@TOKEN");
      try {
        if (token && loadingUser) {
          try {
            Api.defaults.headers.Authorization = `Bearer ${token}`;
            const { data }: IResponseUserApi = await Api.get(`/users/profile`);
            setUser(data);
          } catch {
            toast({
              title: "Atenção",
              description: "Sessao expirada, conecte novamente",
              status: "info",
              duration: 1500,
              isClosable: true,
              position: "top-right",
            });
            window.localStorage.removeItem("@TOKEN");
          }
        }
      } catch {
      } finally {
        setLoadingUser(false);
      }
    }

    getUser();
  }, [loadingUser]);

  function logout(): void {
    setUser(null);
    setLoadingUser(true);
    window.localStorage.removeItem("@TOKEN");
  }

  function loadingTechs(): void {
    setLoadingUser(true);
  }

  async function apiLogin(dataForm: IFormLogin): Promise<void> {
    try {
      const { data }: IResponseLoginApi = await Api.post("/login", dataForm);
      toast({
        title: "Sucesso",
        description: "Login realizado!",
        status: "success",
        duration: 1500,
        isClosable: true,
        position: "top-right",
      });
      window.localStorage.setItem("@TOKEN", data.token);
      setLoadingUser(true);
      navigate("/");
    } catch (err) {
      toast({
        title: "Ops!",
        description: (err as IErro).response.data.message,
        status: "error",
        duration: 1500,
        isClosable: true,
        position: "top-right",
      });
    }
  }

  async function apiRegister(dataForm: IFormRegister): Promise<void> {
    try {
      await Api.post("/users", dataForm);
      toast({
        title: "Sucesso",
        description:
          "Você se registrou, estamos te redirecionando para o login!",
        status: "success",
        duration: 1500,
        isClosable: true,
        position: "top-right",
      });
    } catch (err) {
      toast({
        title: "Ops!",
        description: (err as IErro).response.data.message,
        status: "error",
        duration: 1500,
        isClosable: true,
        position: "top-right",
      });
    }
  }
  if (loadingUser) {
    return <Loading />;
  }

  return (
    <UserContext.Provider
      value={{
        user,
        loadingUser,
        logout,
        apiLogin,
        apiRegister,
        loadingTechs,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
