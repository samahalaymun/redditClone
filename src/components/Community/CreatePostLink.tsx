import { authModalState } from "@/src/atoms/authModalAtoms";
import { auth } from "@/src/firebase/clientApp";
import { Box, Flex, Icon, Input } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { BsLink45Deg } from "react-icons/bs";
import { FaReddit } from "react-icons/fa";
import { IoImageOutline } from "react-icons/io5";
import { useSetRecoilState } from "recoil";
import { useState, useEffect } from "react";
import { useDirectory } from "@/src/hooks/useDirectory";

type CreatePostProps = {};

const CreatePostLink: React.FC<CreatePostProps> = () => {
  
  const router = useRouter();
   const [user] = useAuthState(auth);
  const setAuthModalState = useSetRecoilState(authModalState);
  const[selectedTab,setSelectedTab]=useState("");
  const {toggleMenuOpen}=useDirectory()
  const onClick = () => {
    // Could check for user to open auth modal before redirecting to submit
    console.log(selectedTab);
    if (!user) {
      setAuthModalState({ open: true, view: "login" });
      return;
    }
    const { communityId } = router.query;
    if (communityId) {
     // router.push(`/r/${communityId}/submit`);
      router.push({
        query: {
          communityId: communityId,
          selectedTab: selectedTab,
        },
        pathname: `/r/${communityId}/submit`,
      });
      
      return;
    }
    toggleMenuOpen();
  };
  useEffect(()=>{
    if(selectedTab)
      onClick();
  },[selectedTab])
  return (
    <Flex
      justify="space-evenly"
      align="center"
      bg="white"
      height="56px"
      borderRadius={4}
      border="1px solid"
      borderColor="gray.300"
      p={2}
      mb={4}
    >
      <Icon as={FaReddit} fontSize={36} color="gray.300" mr={4} />
      <Input
        placeholder="Create Post"
        fontSize="10pt"
        _placeholder={{ color: "gray.500" }}
        _hover={{
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        _focus={{
          outline: "none",
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        bg="gray.50"
        borderColor="gray.200"
        height="36px"
        borderRadius={4}
        mr={4}
        onClick={()=>{
          setSelectedTab("Post")
         // onClick()
        }}
      />
      <Flex
        cursor="pointer"
        borderRadius={4}
        _hover={{
          bg: "gray.200",
        }}
        height="36px"
        width="36px"
        padding={2}
        justify="center"
        align="center"
        onClick={() => {
          setSelectedTab("Images & Videos");
          
        }}
      >
        <Icon as={IoImageOutline} fontSize={24} color="gray.400" />
      </Flex>

      <Flex
        cursor="pointer"
        borderRadius={4}
        _hover={{
          bg: "gray.200",
        }}
        height="36px"
        width="36px"
        padding={2}
        justify="center"
        onClick={() => {
          setSelectedTab("Link");
          
        }}
      >
        <Icon
          as={BsLink45Deg}
          fontSize={24}
          color="gray.400"
          cursor="pointer"
        />
      </Flex>
    </Flex>
  );
};
export default CreatePostLink;
