import { Community } from "@/src/atoms/communitiesAtoms";
import { Box, Button, Flex, Icon, Image, Text } from "@chakra-ui/react";
import { FaDeaf, FaReddit } from "react-icons/fa";
import React from "react";
import useCommunityData from "@/src/hooks/useCommunityData";
type HeaderProps = {
  communityData:Community;
};

const Header: React.FC<HeaderProps> = ({communityData}) => {
    const { communityStateValue, onJoinLeaveCommunity, loading } =
      useCommunityData();
     const isJoined = !!communityStateValue.mySnippets.find(
       (snippet) => snippet.communityId === communityData.id
     );
     return (
       <Flex direction="column" width="100%" height="146px">
         <Box height="50%" bg="blue.400" width="100%" />
         <Flex bg="white" flexGrow={1} justify="center">
           <Flex width="95%" maxWidth="860px">
             {communityStateValue.currentCommunity.imageURL ? (
               <Image
                 src={communityStateValue.currentCommunity.imageURL}
                 boxSize="66px"
                 borderRadius="full"
                 position="relative"
                 top={-3}
                 color="blue.500"
                 border="4px solid white"
               ></Image>
             ) : (
               <Icon
                 as={FaReddit}
                 fontSize={64}
                 position="relative"
                 top={-3}
                 border="4px solid white"
                 borderRadius="50%"
                 color="blue.500"
               />
             )}
             <Flex padding="6px 16px">
               <Flex direction="column" mr={6}>
                 <Text fontSize="16pt" fontWeight={700}>
                   {communityStateValue.currentCommunity.id}
                 </Text>
                 <Text
                   color="gray.400"
                   fontSize="10pt"
                   fontWeight={500}
                 >{`r/${communityStateValue.currentCommunity.id}`}</Text>
               </Flex>
               <Button
                 onClick={() => onJoinLeaveCommunity(communityStateValue.currentCommunity, isJoined)}
                 variant={isJoined ? "outline" : "solid"}
                 height="30px"
                 pr={6}
                 pl={6}
                 isLoading={loading}
               >
                 {isJoined ? "Joined" : "Join"}
               </Button>
             </Flex>
           </Flex>
         </Flex>
       </Flex>
     );
};
export default Header;
