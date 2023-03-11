import React, { useState, useEffect, useContext } from "react";

//INTERNAL IMPORT
import Style from "../styles/index.module.css";
import {
  HeroSection,
  Service,
  BigNFTSilder,
  Subscribe,
  Title,
  Category,
  Filter,
  NFTCard,
  Collection,
  AudioLive,
  FollowerTab,
  Slider,
  Brand,
  Video,
  Loader,
} from "../components/componentsindex";
import { getTopCreators } from "../TopCreators/TopCreators";
import { setBlogList } from '../redux/reducers/BlogReducer';

//IMPORTING CONTRCT DATA
import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";
import {useDispatch} from "react-redux";
import {authService} from "../services/auth.service";
import Cookies from "js-cookie";
import axios from "axios";
import {useRouter} from "next/router";
import {useSelector} from "react-redux";

// export const getServerSideProps = async (context) => {
//   var authorization = "";

//   let token  = context.req.headers.cookie.split(" ")[3];
//   authorization = token?.split("=")[1];

//   const allBlogOptions = {
//     method: 'GET',
//     url: `http://localhost:3001/api/v1/blogs`,
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization':`Bearer ${authorization}`
//     }
//   };

//   const allBlogs = await axios(allBlogOptions).then((res) => res).catch(err => err)

//   return {
//     props: {
//       allBlogs: allBlogs.data ? allBlogs?.data.data.blogs : []
//     }
//   }
// }

const Home = ({allBlogs}) => {
  const router = useRouter();
  const { checkIfWalletConnected } = useContext(NFTMarketplaceContext);
  const dispatch = useDispatch();
  const {blogList} = useSelector(state => state.blog)

//   useEffect(() => {
//     if(allBlogs!==[]){
//     dispatch(setBlogList(allBlogs))
//   }else{
//     checkAuth();
//   }
//   }, [allBlogs])


//   const checkAuth = () =>{
//     let token = Cookies.get("user-token");
//     let control = authService.userValue.getValue();
// console.log('token',token);
// console.log('control',control);
//     if (control === false || control === null || token === undefined ||token === null) {
//       router.push('/login');
//     }
//   }

  
  useEffect(() => {
    checkIfWalletConnected();
  }, []);

  const { fetchNFTs } = useContext(NFTMarketplaceContext);
  const [nfts, setNfts] = useState([]);

  // const [nftsCopy, setNftsCopy] = useState([]);

  // useEffect(() => {
  //   fetchNFTs().then((items) => {
  //     setNfts(items.reverse());
  //     setNftsCopy(items);
  //   });
  // }, []);

  //CREATOR LIST
  const creators = getTopCreators(nfts);
  console.log(creators);

  return (
    <div className={Style.homePage}>
      <HeroSection />
      <Service />
      <BigNFTSilder />
      <Title
        heading="Audio Collection"
        paragraph="Discover the most outstanding NFTs in all topics of life."
      />
      <AudioLive />
      {creators.length == 0 ? (
        <Loader />
      ) : (
        <FollowerTab TopCreator={creators} />
      )}

      <Slider />
      <Collection />
      <Title
        heading="Featured NFTs"
        paragraph="Discover the most outstanding NFTs in all topics of life."
      />
      <Filter />
      {nfts.length == 0 ? <Loader /> : <NFTCard NFTData={nfts} />}

      <Title
        heading="Browse by category"
        paragraph="Explore the NFTs in the most featured categories."
      />
      <Category />
      <Subscribe />
      <Brand />
      <Video />
    </div>
  );
};

export default Home;
