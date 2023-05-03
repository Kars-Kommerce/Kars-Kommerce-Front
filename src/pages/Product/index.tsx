import { Flex } from "@chakra-ui/react";
import BannerProduct from "../../components/BannerProduct";
import DescriptionCard from "../../components/DescriptionCard";
import DetailedAd from "../../components/DetailedAd";
import Galery from "../../components/Galery";
import AnnouncerCard from "../../components/AnnouncerCard";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Api from "../../utils/Api";
import Loading from "../../components/Loading";

interface IAdsAuthorProps {
  id: string;
  name: string;
  bio: string;
  is_advertiser: boolean;
}
interface IAdsResponseProps {
  id: number;
  author: IAdsAuthorProps;
  title: string;
  description: string;
  model: string;
  brand: string;
  year: number;
  fuel: number;
  fuel_type: string;
  is_active: boolean;
  price: number;
  created_at: Date;
  updated_at: Date;
}

interface IResponse {
  data: IAdsResponseProps;
}

const Product = () => {
  const { id } = useParams();
  const [actualAds, setActualAds] = useState<IAdsResponseProps | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const getActualAds = async () => {
      try {
        const { data }: IResponse = await Api.get(`/ads/${id}`);
        setActualAds(data);
      } catch {
        navigate("/");
      }
    };
    getActualAds();
  }, []);
  return actualAds ? (
    <>
      <Flex
        direction={{ base: "column", md: "row" }}
        align={"flex-start"}
        py={"1rem"}
        bg={
          "linear-gradient(180deg, #4529E6 31.25%, #F1F3F5 31.26%, #F1F3F5 100%)"
        }
        h={"100%"}
        w={"100%"}
        gap={"1rem"}
      >
        <Flex
          gap={"1rem"}
          direction={"column"}
          width={"100%"}
          alignItems={"center"}
        >
          <BannerProduct image={"../src/assets/background_car.png"} />
          <DetailedAd
            title={actualAds.title}
            price={actualAds.price}
            tags={[{ tag: "0 KM" }, { tag: 2000 }]}
          />
          <DescriptionCard description={actualAds.description} />
        </Flex>
        <Flex
          gap={"1rem"}
          direction={"column"}
          width={"100%"}
          alignItems={"center"}
        >
          <Galery />
          <AnnouncerCard
            authorName={actualAds.author.name}
            bio={actualAds.author.bio}
          />
        </Flex>
      </Flex>
    </>
  ) : (
    <Loading />
  );
};

export default Product;
