import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Link,
  Button,
  Heading,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useContext, useEffect } from "react";
import { UserContext } from "../../context/user.context";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const navigate = useNavigate();

  const { apiLogin, user } = useContext(UserContext);

  const onSubmit = (data: any) => apiLogin(data);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  return (
    <Flex minH={"100%"} align={"center"} justify={"center"} bg={"grey.8"}>
      <Stack spacing={8} mx={"auto"} maxW={"md"} py={12} px={8} w={"98%"}>
        <Box rounded={"lg"} bg={"grey.10"} boxShadow={"lg"} p={8}>
          <Stack spacing={4}>
            <Heading fontSize={"h5"}>Login</Heading>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl id="email">
                <FormLabel>Usuário</FormLabel>
                <Input type="email" {...register("email")} />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Senha</FormLabel>
                <Input type="password" {...register("password")} />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"flex-end"}
                >
                  <Link
                    marginTop="20px"
                    alignSelf={"flex-end"}
                    color={"grey.2"}
                  >
                    Esqueci minha senha
                  </Link>
                </Stack>
                <Button
                  type="submit"
                  size={"lg"}
                  bg={"brand.1"}
                  color={"grey.white"}
                  _hover={{
                    bg: "grey.1",
                  }}
                >
                  Entrar
                </Button>
              </Stack>
            </form>
            <Link padding={"15px 0 20px 0"} alignSelf={"center"}>
              Ainda não possui conta?
            </Link>
            <Link
              textAlign={"center"}
              w={"100%"}
              bg={"grey.10"}
              color={"grey.0"}
              border={"1px solid"}
              borderColor={"grey.0"}
              h={"48px"}
              padding={"10px"}
            >
              Cadastrar
            </Link>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default LoginForm;