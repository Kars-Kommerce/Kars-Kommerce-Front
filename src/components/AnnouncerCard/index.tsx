import {
  Card,
  CardBody,
  CardFooter,
  Stack,
  Heading,
  Text,
  Avatar,
  Link,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
const AnnouncerCard = ({ authorName, bio, authorID }: any) => {
  const navigate = useNavigate();

  return (
    <>
      <Card
        w={"90%"}
        css={{ boxShadow: "none" }}
        borderRadius={"4px"}
        bg={"grey.white"}
        padding={"15px 0"}
      >
        <CardBody>
          <Stack css={{ display: "flex", alignItems: "center" }}>
            <Avatar
              color={"grey.white"}
              size="xl"
              name={authorName}
              bgColor={"brand.1"}
            ></Avatar>
          </Stack>

          <Stack mt="6" spacing="7">
            <Heading size="md" fontSize="h6" textAlign={"center"} noOfLines={1}>
              {authorName}{" "}
            </Heading>
            <Text textAlign={"center"} color={"grey.2"} noOfLines={3}>
              {bio}
            </Text>
          </Stack>
        </CardBody>

        <CardFooter display={"flex"} justifyContent={"center"}>
          <Link
            variant="solid"
            bg={"grey.0"}
            color={"grey.white"}
            _hover={{ bg: "grey.2" }}
            padding={"12px 24px"}
            borderRadius={"4px"}
            onClick={() => navigate(`/user/${authorID}`)}
          >
            Ver todos anuncios
          </Link>
        </CardFooter>
      </Card>
    </>
  );
};

export default AnnouncerCard;
