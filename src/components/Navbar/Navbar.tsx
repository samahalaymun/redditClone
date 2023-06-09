import { Flex, Image, background } from "@chakra-ui/react";
import React from "react";
import SearchInput from "./SearchInput";
import RightContent from "./RightContent/RightContent";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/src/firebase/clientApp";
import Directory from "./Directory/Directory";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDirectory } from "@/src/hooks/useDirectory";
import { defaultMenuItem } from "@/src/atoms/directoryMenuAtoms";
import useCommunityData from "@/src/hooks/useCommunityData";
import { useSetRecoilState } from "recoil";
import { CommunityState, defaultCommunity } from "@/src/atoms/communitiesAtoms";

const Navbar: React.FC = () => {
  const [user, loading, error] = useAuthState(auth);
  const { onSelectMenuItem } = useDirectory();
  const { setCommunityStateValue } = useCommunityData();
  
  const onSelectHomePage=()=>{
    onSelectMenuItem(defaultMenuItem);
     setCommunityStateValue((prev) => ({
       ...prev,
       currentCommunity: defaultCommunity,
     }));
  }
  return (
    <Flex
      bg="white"
      height="44px"
      padding="6px 12px"
      justify={{ md: "space-between" }}
    >
      <Flex
        alignItems="center"
        width={{ base: "40px", md: "auto" }}
        mr={{ base: 0, md: 2 }}
        onClick={() => onSelectHomePage()}
        cursor="pointer"
      >
        <Image alt="reddit logo" src="/images/redditFace.svg" height="30px" />
        <Image
          alt="reddit logo"
          src="/images/redditText.svg"
          height="46px"
          display={{ base: "none", md: "unset" }}
        />
      </Flex>

      {user && <Directory />}
      <SearchInput user={user} />
      <RightContent user={user} />
    </Flex>
  );
};

export default Navbar;
