import React, { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { Stack, Text } from "@chakra-ui/react";
import { PostItem } from "./PostItem";
import { useAuthState } from "react-firebase-hooks/auth";
import PostLoader from "./PostLoader";
import UsePosts from "@/src/hooks/usePosts";
import { Post } from "@/src/atoms/PostsAtom";
import { auth, firestore } from "@/src/firebase/clientApp";
import { Community } from "@/src/atoms/communitiesAtoms";

type PostsProps = {
  CommunityData: Community;
};

const Posts: React.FC<PostsProps> = ({ CommunityData }) => {
  const [loading, setLoading] = useState(false);
  const [user] = useAuthState(auth);
 
  const {
    postStateValue,
    setPostStateValue,
    onDeletePost,
    onSelectPost,
    onVote,
  } = UsePosts();
  
  const getPosts = async () => {
    setLoading(true);
    try {
      const postQuery = query(
        collection(firestore, "posts"),
        where("communityId", "==", CommunityData.id),
        orderBy("createdAt", "desc")
      );
      const postDocs = await getDocs(postQuery);
      const posts = postDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPostStateValue((prev) => ({
        ...prev,
        posts: posts as Post[],
      }));
    } catch (error: any) {
      console.log(error.message);
    }
    setLoading(false)
  };
  useEffect(() => {
    getPosts();
  }, [CommunityData]);
  return (
    <>
      {loading ? (
        <PostLoader />
      ) : (
        <Stack spacing={2}>
          {postStateValue &&
            postStateValue.posts.map((post) => (
              <PostItem
                key={post.id}
                onDeletePost={onDeletePost}
                onSelectPost={ onSelectPost}
                post={post}
                onVote={onVote}
                userIsCreator={user?.uid === post.creatorId}
                userVoteValue={
                  postStateValue.postVotes.find(
                    (item) => item.postId === post.id
                  )?.voteValue
                }
              />
            ))}
        </Stack>
      )}
    </>
  );
};
export default Posts;
