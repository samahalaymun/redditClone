
import { User } from 'firebase/auth';
import React from 'react'
import { useSetRecoilState } from "recoil";
import { authModalState } from "@/src/atoms/authModalAtoms";
import { ChevronDownIcon } from '@chakra-ui/icons';
import { Menu, MenuButton, Flex, Icon, MenuList, Text, Box } from '@chakra-ui/react';
import { FaRedditSquare } from 'react-icons/fa';
import { IoSparkles } from 'react-icons/io5';
import { VscAccount } from 'react-icons/vsc';
import UserList from './UserList';
import NoUserList from './NoUserList';

type MenuWrapperProps = {
  user?: User | null;
};

const MenuWrapper: React.FC<MenuWrapperProps> = ({user}) => {
     const setAuthModalState = useSetRecoilState(authModalState);
  return (
    <Menu>
      <MenuButton
        cursor="pointer"
        padding="0 6px"
        borderRadius={4}
        _hover={{
          outline: "1px solid",
          outlineColor: "gray.200",
        }}
      >
        <Flex align="center">
          <Flex align="center">
            {user ? (
              <>
                <Icon
                  as={FaRedditSquare}
                  fontSize={24}
                  mr={1}
                  color="gray.300"
                />
                <Box
                  display={{ base: "none", lg: "flex" }}
                  flexDirection="column"
                  fontSize="8pt"
                  alignItems="flex-start"
                  mr={8}
                >
                  <Text fontWeight={700}>
                    {user?.displayName || user?.email?.split("@")[0]}
                  </Text>
                  <Flex alignItems="center">
                    <Icon as={IoSparkles} color="brand.100" mr={1} />
                    <Text color="gray.400">1 karma</Text>
                  </Flex>
                </Box>
              </>
            ) : (
              <Icon as={VscAccount} fontSize={24} mr={1} color="gray.400" />
            )}
            <ChevronDownIcon />
          </Flex>
        </Flex>
      </MenuButton>
      <MenuList>
        {user ? (
          <UserList />
        ) : (
            <NoUserList setModalState={setAuthModalState} />
        )}
      </MenuList>
    </Menu>
  );
};

export default MenuWrapper