import { Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

type UnderlineButtonProps = {
  label:string,
  onClick:any
};

export const UnderlineButton: React.FC<UnderlineButtonProps> = ({label,onClick}) => {
  const [state, setState] = useState();
  return (
    <Text
      fontSize="9pt"
      color="blue.500"
      fontWeight={700}
      cursor="pointer"
      textDecoration="underline"
      onClick={onClick}
    >
      {label}
    </Text>
  );
};
