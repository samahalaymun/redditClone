import { Alert, AlertIcon, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

type ErrorComponentProps = {
    error:string;
}

export const ErrorComponent: React.FC<ErrorComponentProps> = ({error}) => {
  return (
    <Alert status="error">
      <AlertIcon />
      <Text mr={2}>{error}</Text>
    </Alert>
  );
};