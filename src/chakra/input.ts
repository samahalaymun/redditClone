import type { ComponentStyleConfig } from "@chakra-ui/theme";

export const Input: ComponentStyleConfig = {
  baseStyle: {
    field: {
      fontSize: "10pt",
      _placeholder: {
        color: "gray.500",
      },
      _hover: {
        bg: "white",
      },
      _focus: {
        bg:"white",
        outline: "none",
        border: "1px solid",
        boxShadow:"none"
      },
    },
    addons: {
      height: "30px",
    },
  },
  sizes: {
    md: {
      field: {
        // height: "30px",
        fontSize: "10pt",
      },
    },
  },
  variants: {},
  defaultProps: {
    variant: null,
  },
};
