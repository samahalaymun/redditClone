import { Community, CommunityState } from "@/src/atoms/communitiesAtoms";
import { firestore } from "@/src/firebase/clientApp";
import { doc, getDoc } from "firebase/firestore";
import { GetServerSidePropsContext } from "next";
import safeJsonStringify from "safe-json-stringify";
import React, { useEffect } from "react";
import CommunityNotFound from "@/src/components/Community/CommunityNotFound";
import Header from "@/src/components/Community/Header";
import PageContent from "@/src/components/Layout/PageContent";
import CreatePostLink from "@/src/components/Community/CreatePostLink";

import { useSetRecoilState } from "recoil";
import { About } from "@/src/components/Community/About";
import Head from "next/head";
import Posts from "@/src/components/Posts/Posts";


interface CommunityPageProps {
  communityData:Community;
}
const CommunityPage: React.FC<CommunityPageProps> = ({ communityData }) => {
  const setCommunityStateValue=useSetRecoilState(CommunityState)
   

    useEffect(() => {
      if(communityData){
        setCommunityStateValue(prev=>({
          ...prev,
          currentCommunity:communityData
        }))
      }
    }, [communityData]);

     if (!communityData) {
       return <CommunityNotFound />;
     }

  return (
    <>
      <Head>
        <title>{communityData.id as string}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/redditFace.svg" />
      </Head>
      <Header communityData={communityData} />
      <PageContent>
        <>
          <CreatePostLink />
          <Posts CommunityData={communityData} />
        </>
        <>
          <About communityData={communityData} onCreatePage={false} />
        </>
      </PageContent>
    </>
  );
};

export default CommunityPage;
export async function getServerSideProps(context: GetServerSidePropsContext){
 try {
    const communityDocRef = doc(firestore, "communities",context.query.communityId as string);
    const communityDoc = await getDoc(communityDocRef);
    return {
      props: {
        communityData: communityDoc.exists()?JSON.parse(safeJsonStringify({ id: communityDoc.id, ...communityDoc.data() })):"",
      },
    };
 } catch (error) {
      console.log("getServerSideProps error - [community]", error);
 }
};
