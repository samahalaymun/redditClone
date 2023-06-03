import { Flex, Icon, Image, Stack, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { BsDot } from 'react-icons/bs';
import { FaReddit } from 'react-icons/fa';

type SearchResultItemProps = {
  image?: string;
  community: string;
  members: number;
  setOnFocus:(value:boolean)=>void;
};

export const SearchResultItem: React.FC<SearchResultItemProps> = ({
  image,
  community,
  members,
  setOnFocus,
}) => {
  const router = useRouter();
  const onItemClicked = (event:any) => {
    event.stopPropagation();
    router.push(`/r/${community}`);
    setOnFocus(false);
  };
  return (
    <Flex
      align="center"
      _hover={{ bg: "gray.200" }}
      p="8px 16px"
      onClick={onItemClicked}
    >
      {image ? (
        <Image
          alt="Community img"
          src={image}
          borderRadius="full"
          boxSize="22px"
          mr={2}
        />
      ) : (
        <Icon as={FaReddit} fontSize={22} color="blue.500" mr={2} />
      )}
      <Flex direction="column" fontSize="9pt">
        <Text fontWeight={500} fontSize="9pt">
          {`r/${community}`}
        </Text>
        <Stack
          direction="row"
          spacing={0.6}
          align="center"
          fontSize="9pt"
          color="gray.500"
        >
          <Text>Community</Text>
          <Icon as={BsDot} color="gray.500" fontSize={12} />
          <Text>{`${members} ${members > 1 ? "members" : "member"}`}</Text>
        </Stack>
      </Flex>
    </Flex>
  );
};