import React from "react";
import { AddIcon } from "@chakra-ui/icons";
import { Box, Flex, Icon } from "@chakra-ui/react";
import { BsArrowUpRightCircle, BsChatDots } from "react-icons/bs";
import { GrAdd } from "react-icons/gr";
import {
  IoFilterCircleOutline,
  IoNotificationsOutline,
  IoVideocamOutline,
} from "react-icons/io5";
import SingleIcon from "./SingleIcon";

const Icons: React.FC = () => {

  return (
    <Flex>
      <Flex
        display={{ base: "none", md: "flex" }}
        align="center"
        borderRight="1px solid"
        borderColor="gray.200"
      >
        <SingleIcon icon={BsArrowUpRightCircle} fontSize={20} display={"flex"} />
        <SingleIcon icon={IoFilterCircleOutline} fontSize={22} display={"flex"}/>
        <SingleIcon icon={IoVideocamOutline} fontSize={22}display={"flex"} />
      </Flex>
      <>
        <SingleIcon icon={BsChatDots} fontSize={20} display={"flex"}/>
        <SingleIcon icon={IoNotificationsOutline} fontSize={20} display={"flex"}/>
        <SingleIcon icon={GrAdd} fontSize={20} display={{base:"none",md:"flex"}}/>
      </>
    </Flex>
  );
};
export default Icons;
