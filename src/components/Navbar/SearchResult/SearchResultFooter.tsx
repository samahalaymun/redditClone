import { SearchIcon } from "@chakra-ui/icons";
import { Divider, Flex, Icon, Text } from "@chakra-ui/react";
import React from "react";

type SearchResultFooterProps = {
  searchInput: string;
};

export const SearchResultFooter: React.FC<SearchResultFooterProps> = ({
  searchInput,
}) => {
  return (
    <>
      
      <Flex align="center" p="8px 16px">
        <Icon
          as={SearchIcon}
          fontWeight={400}
          fontSize={20}
          color="gray.600"
          mr={2}
        />

        <Text fontSize="10pt">Search for {`"${searchInput}"`}</Text>
      </Flex>
    </>
  );
};
