import { Flex, Icon, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { BsChat } from 'react-icons/bs';

type PostIconItemProps = {
  icon: typeof Icon.arguments;
  label: string;
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

export const PostIconItem: React.FC<PostIconItemProps> = ({icon,label,onClick}) => {
  return (
    <Flex
      align="center"
      p="8px 10px"
      borderRadius={4}
      _hover={{ bg: "gray.200" }}
      cursor="pointer"
      onClick={onClick}
    >
      <Icon as={icon} mr={2} />
      <Text fontSize="9pt">{label}</Text>
    </Flex>
  );
};