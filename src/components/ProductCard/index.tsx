import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import UserCard from "../UserCard";
import Tag from "../Tag";
import { useContext } from "react";
import { UserContext } from "../../context/user.context";
import { useNavigate } from "react-router-dom";

interface IProdctCardProps {
  product: IAdvertisementResponse;
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

interface IAdvertisementResponse {
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

const ProductCardContainer = styled.div`
  max-width: 312px;
  min-width: 312px;

  > div {
    :nth-child(1) {
      background-color: #e9ecef;
      padding: 0;
      max-height: 152px;

      > img {
        width: 100%;
        height: 152px;
        object-fit: cover;
      }
    }

    :nth-child(2) {
      display: flex;
      flex-flow: column nowrap;
      gap: 16px;
      margin-top: 16px;

      > h3 {
        font-size: 16px;
        font-weight: bold;
        cursor: pointer;
      }

      > p {
        font-size: 14px;
      }

      > div {
        :nth-child(3) {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        :nth-child(4) {
          display: flex;
          justify-content: space-between;
        }
      }
    }
  }

  p,
  span {
    color: #495057;
  }
`;

const ProductCard = ({ product }: IProdctCardProps) => {
  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  return (
    <ProductCardContainer>
      <div>
        <img src={`${product.cover_image}`} alt="Car" />
      </div>
      <div>
        <h3 onClick={() => navigate(`/ads/${product.id}`)}>{product.title}</h3>
        <p>{product.description}</p>
        <UserCard
          authorID={product.author?.id || user?.id!}
          authorName={product.author?.name! || user?.name!}
        />
        <div>
          <Tag
            tags={[{ tag: `${product.kilometer} KM` }, { tag: product.year }]}
          />
          <span>
            <strong>
              {product.price.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </strong>
          </span>
        </div>
      </div>
    </ProductCardContainer>
  );
};

export default ProductCard;
