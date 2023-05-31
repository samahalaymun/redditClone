import React, { useState } from "react";
import CreateCommunityModal from "../../Modal/CreateCommunity/CreateCommunityModal";
import { Box, Flex, Icon, MenuItem, Text } from "@chakra-ui/react";
import { GrAdd } from "react-icons/gr";
import { useRecoilValue } from "recoil";
import { CommunityState } from "@/src/atoms/communitiesAtoms";
import { MenuListItem } from "./MenuListItem";
import { FaReddit } from "react-icons/fa";
type CommunitiesProps = {
  //menuOpen: boolean;
};

const Communities: React.FC<CommunitiesProps> = () => {
  const [open, setOpen] = useState(false);
  const mySnippets = useRecoilValue(CommunityState).mySnippets;

  return (
    <>
      <CreateCommunityModal open={open} handleClose={() => setOpen(false)} />
      { (
        <Box mt={3} mb={4}>
          <Text pl={3} mb={1} fontSize="7pt" fontWeight={500} color="gray.500">
            MODERATING
          </Text>
          {mySnippets
            .filter((item) => item.isModerator)
            .map((snippet) => (
              <MenuListItem
                key={snippet.communityId}
                displayText={`r/${snippet.communityId}`}
                link={`/r/${snippet.communityId}`}
                icon={FaReddit}
                iconColor="brand.100"
                imageURL={snippet.imageURL}
              />
            ))}
        </Box>
      )}
      <Box mt={3} mb={4}>
        <Text pl={3} mb={1} fontSize="7pt" fontWeight={500} color="gray.500">
          YOUR COMMUNITIES
        </Text>
      </Box>
      <MenuItem
        width="100%"
        fontSize="10pt"
        _hover={{ bg: "gray.100" }}
        onClick={() => setOpen(true)}
      >
        <Flex align="center">
          <Icon as={GrAdd} fontSize={20} mr={2} />
          Create Community
        </Flex>
      </MenuItem>
      {mySnippets.map((snippet) => (
        <MenuListItem
          displayText={`r/${snippet.communityId}`}
          link={`/r/${snippet.communityId}`}
          imageURL={snippet.imageURL}
          icon={FaReddit}
          iconColor="blue.500"
          key={snippet.communityId}
        />
      ))}
    </>
  );
};
export default Communities;
