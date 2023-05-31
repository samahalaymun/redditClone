import React, { useEffect, useState } from "react";
import { tabItem } from "./NewPostForm";
import { Flex, Icon, Text } from "@chakra-ui/react";

type TabItemProps = {
  item: tabItem;
  selected: boolean;
  setSelectedTab:(value:string)=>void;
};

export const TabItem: React.FC<TabItemProps> = ({ item, selected,setSelectedTab }) => {
  return (
    <Flex
      align="center"
      justify="center"
      flexGrow={1}
      p="14px 0"
      fontWeight={700}
      cursor="pointer"
      _hover={{ bg: "gray.50" }}
      color={selected ? "blue.500" : "gray.500"}
      borderWidth={selected ? "0px 1px 2px 0px" : "0px 1px 1px 0px"}
      borderBottomColor={selected ? "blue.500" : "gray.200"}
      onClick={() => setSelectedTab(item.title)}
      borderRightColor="gray.200"
    >
      <Flex align="center" height="20px" mr={2}>
        <Icon as={item.icon} />
      </Flex>
      <Text fontSize="10pt">{item.title}</Text>
    </Flex>
  );
};
