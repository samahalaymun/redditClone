import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BsChat, BsDot } from "react-icons/bs";
import { FaReddit } from "react-icons/fa";
import {
  IoArrowDownCircleOutline,
  IoArrowDownCircleSharp,
  IoArrowRedoOutline,
  IoArrowUpCircleOutline,
  IoArrowUpCircleSharp,
  IoBookmarkOutline,
} from "react-icons/io5";
import {
  Flex,
  Icon,
  Image,
  Skeleton,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import moment from "moment";
import { PostIconItem } from "./PostItemIcon";
import Link from "next/link";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { Post } from "@/src/atoms/PostsAtom";
import { useRouter } from "next/router";
import { firestore } from "@/src/firebase/clientApp";
import { ErrorComponent } from "../Layout/ErrorComponent";

type PostItemProps = {
  post: Post;
  userIsCreator: boolean;
  userVoteValue?: number;
  onVote: (
    event: React.MouseEvent<SVGElement, MouseEvent>,
    post: Post,
    vote: number,
    communityId: string
  ) => void;
  onDeletePost: (post: Post) => Promise<boolean>;
  onSelectPost?: (post: Post) => void;
  homePage?:boolean;
};

export const PostItem: React.FC<PostItemProps> = ({
  post,
  userIsCreator,
  userVoteValue,
  onVote,
  onDeletePost,
  onSelectPost,
  homePage
}) => {
  const [loadingImage, setLoadingImage] = useState(true);
  const [error, setError] = useState("");
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [communityImage,setCommunityImage]=useState(post.communityImageURL)
  const router=useRouter();
 const singlePostPage=!onSelectPost;

  const handleDelete = async (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
    setLoadingDelete(true);
    try {
      console.log(post)
      const success = await onDeletePost(post);
      if (!success) {
        throw new Error("Failed to delete post");
      }
      if (singlePostPage) {
        router.push(`/r/${post.communityId}`);
      }
    } catch (error: any) {
      setError(error.message);
      console.log(error.message);
    }
    setLoadingDelete(false);
  };

  const getCommunityImageUrL = async()=>{

   
    try {
      const communityDocRef = doc(
        firestore,
        "communities",
        post.communityId as string
      );
      const communityDoc = await getDoc(communityDocRef);
       setCommunityImage(communityDoc.data()?.imageURL);

    } catch (error:any) {
       console.log(error.message)
    }
  }
  useEffect(()=>{
     getCommunityImageUrL();
  },[post])
  return (
    <Flex
      border="1px solid"
      bg="white"
      borderColor={singlePostPage ? "white" : "gray.300"}
      borderRadius={singlePostPage ? "4px 4px 0px 0px" : "4px"}
      _hover={{ borderColor: singlePostPage ? "" : "gray.500" }}
      cursor={singlePostPage ? "unset" : "pointer"}
      onClick={() => onSelectPost && onSelectPost(post)}
    >
      <Flex
        direction="column"
        align="center"
        bg={singlePostPage ? "none" : "gray.100"}
        p={2}
        width="40px"
        borderRadius={singlePostPage ? "0" : "4px 0px 0px 4px"}
      >
        <Icon
          as={
            userVoteValue === 1 ? IoArrowUpCircleSharp : IoArrowUpCircleOutline
          }
          color={userVoteValue === 1 ? "brand.100" : "gray.400"}
          fontSize={22}
          onClick={(event) => onVote(event, post, 1, post.communityId)}
          cursor="pointer"
        />
        <Text fontSize="9pt">{post.voteStatus}</Text>
        <Icon
          as={
            userVoteValue === -1
              ? IoArrowDownCircleSharp
              : IoArrowDownCircleOutline
          }
          color={userVoteValue === -1 ? "#4379ff" : "gray.400"}
          fontSize={22}
          onClick={(event) => onVote(event, post, -1, post.communityId)}
          cursor="pointer"
        />
      </Flex>
      <Flex direction="column" width="100%">
        {error && <ErrorComponent error={error} />}
        <Stack spacing={1} padding="10px">
          <Stack direction="row" spacing={0.6} align="center" fontSize="9pt">
            {homePage && (
              <>
                {communityImage ? (
                  <Image
                    borderRadius="full"
                    boxSize="18px"
                    src={communityImage}
                    mr={2}
                  />
                ) : (
                  <Icon as={FaReddit} fontSize={18} mr={1} color="blue.500" />
                )}
                <Link href={`r/${post.communityId}`}>
                  <Text
                    fontWeight={700}
                    _hover={{ textDecoration: "underline" }}
                    onClick={(event) => event.stopPropagation()}
                  >{`r/${post.communityId}`}</Text>
                </Link>
                <Icon as={BsDot} color="gray.500" fontSize={8} />
              </>
            )}
            <Text color="gray.500">
              Posted by u/{post.creatorDisplayName}{" "}
              {moment(new Date(post.createdAt?.seconds * 1000)).fromNow()}
            </Text>
          </Stack>
          <Text fontSize="12pt" fontWeight={600}>
            {post.title}
          </Text>
          <Text fontSize="10pt">{post.body}</Text>
          {post.imageURL && (
            <Flex justify="center" align="center" p={2}>
              {loadingImage && (
                <Skeleton height="200px" width="100%" borderRadius={4} />
              )}
              <Image
                maxHeight="460px"
                src={post.imageURL}
                display={loadingImage ? "none" : "unset"}
                onLoad={() => setLoadingImage(false)}
                alt="Post Image"
              />
            </Flex>
          )}
        </Stack>
        <Flex ml={1} mb={0.5} color="gray.500" fontWeight={600}>
          <PostIconItem
            icon={BsChat}
            label={`${post.numberOfComments} Comment${
              post.numberOfComments <= 1 ? "" : "s"
            }`}
            onClick={() => {}}
          />
          <PostIconItem
            icon={IoBookmarkOutline}
            label="Share"
            onClick={() => {}}
          />
          <PostIconItem icon={BsChat} label="Save" onClick={() => {}} />
          {userIsCreator &&
            (loadingDelete ? (
              <Flex align="center" p="8px 10px" width="50px">
                <Spinner size="xs" />
              </Flex>
            ) : (
              <PostIconItem
                icon={AiOutlineDelete}
                label="Delete"
                onClick={handleDelete}
              />
            ))}
        </Flex>
      </Flex>
    </Flex>
  );
};
