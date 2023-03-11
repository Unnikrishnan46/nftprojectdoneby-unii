import React from "react";

//INTERNAL IMPORT
import Style from "../styles/collection.module.css";
import images from "../img";
import {
  Banner,
  CollectionProfile,
  NFTCardTwo,
} from "../collectionPage/collectionIndex";
import { Slider, Brand } from "../components/componentsindex";
import Filter from "../components/Filter/Filter";

export const getServerSidePropss = async (context) => {
  const productOptions = {
    method: 'GET',
    url: `${process.env.NEXT_APP_BASE_ENDPOINT}/products`,
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const products = await axios(productOptions).then((res) => res).catch(err => err)


  // const requestOptionById: Object = {
  //   method: 'GET',
  //   url: `http://localhost:83/api/model/${id}`,
  //   headers: {
  //     'Content-Type': 'application/json',
  //     "Authorization": authorization
  //   }
  // };

  // const responseById: any = await axios(requestOptionById).then((res: any) => res).catch(err => err)

  return {
    props: {
      productList: products.data ? products.data : []
      // modelList: responseById?.data?.model
    }
  }
}

const collection = () => {
  const collectionArray = [
    {
      image: images.nft_image_1,
    },
    {
      image: images.nft_image_2,
    },
    {
      image: images.nft_image_3,
    },
    {
      image: images.nft_image_1,
    },
    {
      image: images.nft_image_2,
    },
    {
      image: images.nft_image_3,
    },
    {
      image: images.nft_image_1,
    },
    {
      image: images.nft_image_2,
    },
  ];
  return (
    <div className={Style.collection}>
      <Banner bannerImage={images.creatorbackground1} />
      <CollectionProfile />
      <Filter />
      <NFTCardTwo NFTData={collectionArray} />

      <Slider />
      <Brand />
    </div>
  );
};

export default collection;
