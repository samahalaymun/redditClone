import { Box, Button, Flex, Image, Stack } from "@chakra-ui/react";
import React from 'react';

type ImageContainerProps = {
  image: string;
  setSelectedTab: (value: string) => void;
  setSelectedFile: (value: string) => void;
};

export const ImageContainer: React.FC<ImageContainerProps> = ({
  image,
  setSelectedTab,
  setSelectedFile,
}) => (
  <Box width="100%">
    <Flex
      justify="center"
      align="center"
      width="100%"
      border="1px solid "
      borderRadius={4}
      borderColor="gray.200"
      position="relative"
      overflow="hidden"
    >
      <Image
        src={image}
        width="100%"
        height="100%"
        filter="blur(20px) brightness(.8)"
        position="absolute"
        top={0}
        left={0}
      />
      <Image src={image} maxWidth="400px" maxHeight="500px" zIndex={0}/>
    </Flex>
    <Stack direction="row" mt={4} justify="flex-end">
      <Button height="28px" onClick={() => setSelectedTab("Post")}>
        Back to Post
      </Button>
      <Button
        variant="outline"
        height="28px"
        onClick={() => setSelectedFile("")}
      >
        Remove
      </Button>
    </Stack>
  </Box>
);