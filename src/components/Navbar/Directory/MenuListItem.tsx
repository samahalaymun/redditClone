import { useDirectory } from "@/src/hooks/useDirectory";
import { Flex, Icon, Image, MenuItem } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { IconType } from "react-icons";

type MenuListItemProps = {
  displayText: string;
  link: string;
  icon: IconType;
  iconColor: string;
  imageURL?: string;
};

export const MenuListItem: React.FC<MenuListItemProps> = ({
  displayText,
  link,
  icon,
  iconColor,
  imageURL,
}) => {
  
    const router=useRouter()
    const { onSelectMenuItem } = useDirectory();
  return (
    <MenuItem
      width="100%"
      fontSize="10pt"
      _hover={{ bg: "gray.100" }}
      onClick={() =>
        onSelectMenuItem({ displayText, link, icon, iconColor, imageURL })
      }
    >
      <Flex align="center">
        {imageURL ? (
          <Image
            alt="community image"
            src={imageURL}
            borderRadius="full"
            boxSize="18px"
            mr={2}
          />
        ) : (
          <Icon fontSize={20} mr={2} as={icon} color={iconColor} />
        )}
        {displayText}
      </Flex>
    </MenuItem>
  );
};
