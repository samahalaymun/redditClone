import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Menu,
  MenuButton,
  Flex,
  MenuList,
  Icon,
  Text,
  Image,

} from "@chakra-ui/react";
import React from "react";
import {TiHome} from 'react-icons/ti'
import Communities from "./Communities";
import { useDirectory } from "@/src/hooks/useDirectory";
const Directory: React.FC = () => {
const { directoryState, toggleMenuOpen } = useDirectory();
//console.log(directoryState.selectedMenuItem);
    return (
      <Menu isOpen={directoryState.isOpen}>
        <MenuButton
          cursor="pointer"
          padding="0 6px"
          borderRadius={4}
          mr={2}
          ml={{ base: 0, md: 2 }}
          _hover={{
            outline: "1px solid",
            outlineColor: "gray.200",
          }}
          onClick={toggleMenuOpen}
        >
          <Flex
            align="center"
            justify="space-between"
            width={{ base: "auto", lg: "200px" }}
          >
            <Flex alignItems="center">
              {directoryState.selectedMenuItem.imageURL ? (
                <Image
                  alt="community image"
                  src={directoryState.selectedMenuItem.imageURL}
                  borderRadius="full"
                  boxSize="18px"
                  mr={2}
                />
              ) : (
                <Icon
                  as={directoryState.selectedMenuItem.icon}
                  color={directoryState.selectedMenuItem.iconColor}
                  fontSize={24}
                  mr={{ base: 1, md: 2 }}
                />
              )}
              <Flex display={{ base: "none", lg: "flex" }}>
                <Text fontWeight={600} fontSize="10pt" mt={0.5}>
                  {directoryState.selectedMenuItem.displayText}
                </Text>
              </Flex>
            </Flex>
            <ChevronDownIcon />
          </Flex>
        </MenuButton>
        <MenuList zIndex={100}>
          <Communities />
        </MenuList>
      </Menu>
    );
};

export default Directory;
