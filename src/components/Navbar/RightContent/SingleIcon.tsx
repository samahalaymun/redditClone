import { Flex, Icon } from "@chakra-ui/react";
import { type } from "os";
import React from "react";

type SingleIconProps = {
  icon: any;
  fontSize: any;
  display:any;
  onClick?:()=>void
};
const SingleIcon: React.FC<SingleIconProps> = ({ icon, fontSize, display }) => {
  return (
    <Flex
      mr={1.5}
      ml={1.5}
      padding={2}
      cursor="pointer"
      borderRadius={4}
      _hover={{ bg: "gray.200" }}
      display={display}
    >
      <Icon as={icon} fontSize={fontSize} />
    </Flex>
  );
};

export default SingleIcon;
