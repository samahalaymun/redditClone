import React, { useEffect, useState } from "react";
import { Comment } from "./Comments";
import { Box, Flex, Icon, Spinner, Stack, Text } from "@chakra-ui/react";
import moment from "moment";
import { FaReddit } from "react-icons/fa";
import {
  IoArrowDownCircleOutline,
  IoArrowUpCircleOutline,
} from "react-icons/io5";

type CommentItemProps = {
  comment: Comment;
  onDeleteComment: (comment: Comment) => void;
  isLoading: boolean;
  userId?: string;
};

export const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  onDeleteComment,
  isLoading,
  userId,
}) => {
 
  return (
    <Flex>
      <Box mr={2} position="relative">
        <Icon as={FaReddit} fontSize={30} color="gray.300" />
        <Box
          bg="gray.200"
          width="2px"
          height="60%"
          position="absolute"
          top="inherit"
          left="50%"
          transform="translate(0px,-7px)"
        ></Box>
      </Box>
      <Stack spacing={1}>
        <Stack direction="row" spacing={2} align="center" fontSize="8pt">
          <Text
            fontWeight={700}
            _hover={{ textDecoration: "underline", cursor: "pointer" }}
          >
            {comment.creatorDisplayText}
          </Text>
          <Text color="gray.600">
            {moment(new Date(comment.createdAt?.seconds * 1000)).fromNow()}
          </Text>
          {isLoading && <Spinner size="sm" />}
        </Stack>
        <Text fontSize="10pt">{comment.text}</Text>
        <Stack direction="row" align="center" cursor="pointer" color="gray.500">
          <Icon as={IoArrowUpCircleOutline} />
          <Icon as={IoArrowDownCircleOutline} />
          {userId&&(userId === comment.creatorId) && (
            <>
              <Text fontSize="9pt" _hover={{ color: "blue.500" }}>
                Edit
              </Text>
              <Text
                fontSize="9pt"
                _hover={{ color: "blue.500" }}
                onClick={() => onDeleteComment(comment)}
              >
                Delete
              </Text>
            </>
          )}
        </Stack>
      </Stack>
    </Flex>
  );
};
