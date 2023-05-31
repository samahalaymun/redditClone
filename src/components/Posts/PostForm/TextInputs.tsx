import { Button, Flex, Input, InputGroup, InputRightElement, Stack, Text, Textarea } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

type TextInputsProps = {
  textInputs: {
    title: string;
    body: string;
  };

  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;

  handleCreatePost: () => void;
  loading: boolean;
  charsRemaining:number;
};

export const TextInputs: React.FC<TextInputsProps> = ({
  textInputs,
  onChange,
  handleCreatePost,
  loading,
  charsRemaining,
}) => {
  return (
    <Stack spacing={3} width="100%">
      <InputGroup>
        <Input
          name="title"
          value={textInputs.title}
          fontSize="10pt"
          borderRadius={4}
          placeholder="Title"
          _placeholder={{
            color: "gray.500",
          }}
          _focus={{
            outline: "none",
            bg: "white",
            border: "1px solid ",
            borderColor: "black",
            boxShadow: "none",
          }}
          onChange={onChange}
          pr="4rem"
        />
        <InputRightElement width="4rem">
          <Text fontWeight={600} fontSize="9pt" color="gray.500">
            {charsRemaining}/300
          </Text>
        </InputRightElement>
      </InputGroup>

      {/* <Text fontWeight={500} fontSize="9pt" position="relative"left="100%">0/300</Text> */}
      <Textarea
        name="body"
        value={textInputs.body}
        fontSize="10pt"
        borderRadius={4}
        placeholder="Text (optional)"
        _placeholder={{
          color: "gray.500",
        }}
        _focus={{
          outline: "none",
          bg: "white",
          border: "1px solid ",
          borderColor: "black",
          boxShadow: "none",
        }}
        height="100px"
        onChange={onChange}
      />
      <Flex
        borderTop="1px solid"
        borderTopColor="gray.200"
        justify="flex-end"
        pt={4}
      >
        <Button
          height="34px"
          padding="0px 30px"
          isDisabled={!textInputs.title}
          isLoading={loading}
          onClick={() => handleCreatePost()}
        >
          Post
        </Button>
      </Flex>
    </Stack>
  );
};
