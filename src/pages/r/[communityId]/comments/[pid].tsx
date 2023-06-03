
import { Post } from '@/src/atoms/PostsAtom';
import { About } from '@/src/components/Community/About';
import PageContent from '@/src/components/Layout/PageContent';
import { PostItem } from '@/src/components/Posts/PostItem';
import Comments from '@/src/components/Posts/comments/Comments';
import { auth, firestore } from '@/src/firebase/clientApp';
import useCommunityData from '@/src/hooks/useCommunityData';
import { useDirectory } from '@/src/hooks/useDirectory';
import UsePosts from '@/src/hooks/usePosts';
import { User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

 const PostPage:React.FC = () => {
   const [user] = useAuthState(auth);
   const router = useRouter();
   const { communityId, pid } = router.query;
   const { communityStateValue } = useCommunityData();
   const { setDirectoryState } = useDirectory();
   const {
     postStateValue,
     setPostStateValue,
     onDeletePost,
     onVote,
     loading,
     setLoading,
   } = UsePosts();

   const fetchPost = async () => {
     console.log("FETCHING POST");
     setLoading(true);
     try {
       const postDocRef = doc(firestore, "posts", pid as string);
       const postDoc = await getDoc(postDocRef);
       setPostStateValue((prev) => ({
         ...prev,
         selectedPost: { id: postDoc.id, ...postDoc.data() } as Post,
       }));
      
     } catch (error: any) {
       console.log("fetchPost error", error.message);
     }
     setLoading(false);
   };
   // Fetch post if not in already in state
   useEffect(() => {
     const { pid } = router.query;

     if (pid && !postStateValue.selectedPost) {
       fetchPost();
     }
   }, [router.query, postStateValue.selectedPost]);
   return (
     <PageContent>
       <>
         {postStateValue.selectedPost && (
           <PostItem
             post={postStateValue.selectedPost as Post}
             onVote={onVote}
             onDeletePost={onDeletePost}
             userVoteValue={
               postStateValue.postVotes.find(
                 (item) => item.postId === postStateValue.selectedPost?.id
               )?.voteValue
             }
             userIsCreator={
               user?.uid === postStateValue.selectedPost?.creatorId
             }
           />
         )}
         <Comments
           user={user as User}
           selectedPost={postStateValue.selectedPost as Post}
           communityId={communityId as string}
         />
       </>
       <>
         <About
           communityData={communityStateValue.currentCommunity}
           onCreatePage={false}
         />
       </>
     </PageContent>
   );
 };

export default PostPage;