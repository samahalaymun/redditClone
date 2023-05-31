import { Box, Text } from "@chakra-ui/react";
import React from "react";

export const Footer: React.FC = () => {
  return (
    <Box
      bg="white"
      padding="12px"
      borderRadius={4}
      border="1px solid"
      borderColor="gray.300"
    >
      <Text  fontSize="9pt">
        Reddit, Inc. © {new Date().getFullYear()}. All rights reserved.
      </Text>
    </Box>
  );
};
