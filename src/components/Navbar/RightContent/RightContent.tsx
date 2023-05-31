import {  Flex } from '@chakra-ui/react';
import React from 'react'
import AuthButtons from './AuthButtons';
import AuthModal from '../../Modal/Auth/AuthModal';
import { User } from 'firebase/auth';
import Icons from './Icons';
import MenuWrapper from './ProfileMenu/MenuWrapper';

type RightContentProps = {
  user?:User | null
};

const RightContent:React.FC<RightContentProps>=({user})=> {
  return (
    <>
      <AuthModal />
      <Flex align="center" justify="center">
        {user ? <Icons/> : <AuthButtons />}
        <MenuWrapper user={user}/>
      </Flex>
    </>
  );
}
export default RightContent;