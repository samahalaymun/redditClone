import { Checkbox, Flex, Icon, Text } from "@chakra-ui/react";
import React from "react";


type CommunityTypeCheckBoxProps = {
  name: string;
  type: string;
  onChange: any;
  label: string;
  description: string;
  icon: any;
};

const CommunityTypeCheckBox: React.FC<CommunityTypeCheckBoxProps> = ({
  name,
  type,
  onChange,
  label,
  description,
  icon,
}) => {
  return (
    <Checkbox
      name={name}
      isChecked={type === name}
      onChange={onChange}
      colorScheme="blue"
    >
      <Flex align="center">
        <Icon as={icon} mr={2} color="gray.500" />
        <Text fontSize="10pt" mr={1}>
          {label}
        </Text>
        <Text fontSize="8pt" color="gray.500">
          {description}
        </Text>
      </Flex>
    </Checkbox>
  );
};
export default CommunityTypeCheckBox;
