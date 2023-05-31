import React from "react";
import { AuthModalState } from "@/src/atoms/authModalAtoms";
import { MdOutlineLogin } from "react-icons/md";
import MenuItemWrapper from "./MenuItemWrapper";

type NoUserListProps = {
  setModalState: (value: AuthModalState) => void;
};

const NoUserList: React.FC<NoUserListProps> = ({ setModalState }) => {
    return (
      <>
        <MenuItemWrapper
          label="Log In / Sign Up"
          icon={MdOutlineLogin}
          onClick={()  => setModalState({ open: true, view: "login" })}
        />
      </>
    );
};
export default NoUserList;
