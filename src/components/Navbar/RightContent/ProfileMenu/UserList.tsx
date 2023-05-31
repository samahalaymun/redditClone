import React from "react";
import { auth } from "@/src/firebase/clientApp";
import { MenuDivider } from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import { CgProfile } from "react-icons/cg";
import { MdOutlineLogin } from "react-icons/md";
import MenuItemWrapper from "./MenuItemWrapper";
import { useResetRecoilState } from "recoil";
import { CommunityState } from "@/src/atoms/communitiesAtoms";

type UserListProps = {};

const UserList: React.FC<UserListProps> = () => {
  const resetCommunityState=useResetRecoilState(CommunityState)
  const logout = async () => {
    await signOut(auth);
   // resetCommunityState();
  };
  return (
    <>
      <MenuItemWrapper label="Profile" icon={CgProfile} onClick={()=>{}} />
      <MenuDivider />
      <MenuItemWrapper label="Log out" icon={MdOutlineLogin} onClick={logout} />
    </>
  );
};

export default UserList;
