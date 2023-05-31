import React, { useState } from "react";
import { Flex, Button, Text, Image, Box } from "@chakra-ui/react";
import Link from "next/link";
import CreateCommunityModal from "../Modal/CreateCommunity/CreateCommunityModal";

const CommunityNotFound: React.FC = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <CreateCommunityModal open={open} handleClose={() => setOpen(false)} />;
      <Flex
        alignItems="center"
        justifyContent="center"
        direction="column"
        minHeight="60vh"
      >
        <Box height="100px" width="100px" borderRadius="100%"backgroundColor="gray.400">
        </Box>
        
        <Text fontWeight={500} fontSize="18px" mb={5} mt={5} textAlign="center">
          Sorry, there aren’t any communities on Reddit with that name.
        </Text>
        <Text fontWeight={500} fontSize="14px" mb={5} textAlign="center">
          This community may have been banned or the community name is incorrect
        </Text>
        <Flex mt={2} mb="36px">
          <Button mr={2} variant="outline" onClick={() => setOpen(true)}>
            Create Community
          </Button>
          <Link href="/">
            <Button>GO HOME</Button>
          </Link>
        </Flex>
        <Text fontSize="9pt" textAlign="center" color="gray.500">
          Reddit, Inc. © 2023. All rights reserved. REDDIT and the ALIEN Logo
          are registered trademarks of reddit inc.
        </Text>
      </Flex>
    </>
  );
};
export default CommunityNotFound;
