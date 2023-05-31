import React from "react";
import { CgProfile } from "react-icons/cg";
import { MenuItem, Flex, Icon } from "@chakra-ui/react";

type MenuItemWrapperProps = {
  label: any;
  icon: any;
  onClick:any;
};

const MenuItemWrapper: React.FC<MenuItemWrapperProps> = ({ label, icon ,onClick}) => {
  return (
    <MenuItem
      fontSize="10pt"
      fontWeight={700}
      _hover={{ bg: "blue.500", color: "white" }}
      onClick={onClick}
    >
      <Flex align="center">
        <Icon fontSize={20} mr={2} as={icon} />
        {label}
      </Flex>
    </MenuItem>
  );
};

export default MenuItemWrapper;
