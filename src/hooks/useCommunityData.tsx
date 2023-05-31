import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  Community,
  CommunitySnippet,
  CommunityState,
} from "../atoms/communitiesAtoms";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "../firebase/clientApp";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  increment,
  writeBatch,
} from "firebase/firestore";
import { authModalState } from "../atoms/authModalAtoms";
import { useRouter } from "next/router";

const useCommunityData = (ssrCommunityData?: boolean) => {
  const [communityStateValue, setCommunityStateValue] =
    useRecoilState(CommunityState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [user] = useAuthState(auth);
  const setAuthModalState=useSetRecoilState(authModalState);
  const router = useRouter();

  const onJoinLeaveCommunity = (
    communityData: Community,
    isJoined: boolean
  ) => {
    if (isJoined) {
  
      leaveCommunity(communityData.id);
      return;
    }
    joinCommunity(communityData);
  };
  const joinCommunity = async (communityData: Community) => {
    
    if(!user){
       setAuthModalState({open:true,view:"login"});
       return;
    }
    setLoading(true)

    try {
      const batch = writeBatch(firestore);

      const newSnippet: CommunitySnippet = {
        communityId: communityData.id,
        imageURL: communityData.imageURL || "",
        isModerator:user?.uid === communityData.creatorId
      };
      batch.set(
        doc(
          firestore,
          `users/${user?.uid}/communitySnippets`,
          communityData.id
        ),
        newSnippet
      );
      batch.update(doc(firestore, "communities", communityData.id), {
        numberOfMembers: increment(1),
      });
      await batch.commit();
      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: [...prev.mySnippets, newSnippet],
      }));
    } catch (error: any) {
      setError(error.message);
    }
    setLoading(false);
  };
  const leaveCommunity = async(communityId: string) => {
    setLoading(true);
    try {
      const batch = writeBatch(firestore);
      batch.delete(
        doc(
          firestore,
          `users/${user?.uid}/communitySnippets/${communityId}`
        )
      );
      batch.update(doc(firestore, "communities", communityId), {
        numberOfMembers: increment(-1),
      });
      await batch.commit();
      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: prev.mySnippets.filter(
          (snippet) => snippet.communityId !== communityId
        ),
      }));
      setLoading(false);
    } catch (error:any) {
       setError(error.message)
    }
  };

  const getMySnippets = async () => {
    setLoading(true);
    try {
      const snippetsDoc = await getDocs(
        collection(firestore, `users/${user?.uid}/communitySnippets`)
      );
      const snippets = snippetsDoc.docs.map((doc) => ({ ...doc.data() }));
      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: snippets as CommunitySnippet[],
        snippetsFetched:true
      }));
    } catch (error: any) {
      setError(error.message);
    }
    setLoading(false);
  };

  const getCommunityData = async (communityId: string) => {
    try {
      const communityDocRef = doc(
        firestore,
        "communities",
        communityId as string
      );
      const communityDoc = await getDoc(communityDocRef);
      setCommunityStateValue((prev) => ({
        ...prev,
        currentCommunity: {
          id: communityDoc.id,
          ...communityDoc.data(),
        } as Community,
      }));
    } catch (error: any) {
      console.log("getCommunityData error", error.message);
    }
    setLoading(false);
  };
  useEffect(() => {
    if (!user){
      setCommunityStateValue(prev=>({
        ...prev,
        mySnippets:[],
        snippetsFetched:false
      }))
      return;
    };
    getMySnippets();
  }, [user]);

  useEffect(() => {
    const { communityId } = router.query;
    if (communityId && !communityStateValue.currentCommunity.id) {
        getCommunityData(communityId as string);
    }
  }, [router.query, communityStateValue.currentCommunity]);
  return {
    communityStateValue,
    setCommunityStateValue,
    onJoinLeaveCommunity,
    loading,
  };
};

export default useCommunityData;
