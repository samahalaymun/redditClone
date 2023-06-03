import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { DirectoryMenuItem, defaultMenuItem, directoryMenuState } from '../atoms/directoryMenuAtoms';
import { useRouter } from 'next/router';
import { CommunityState } from '../atoms/communitiesAtoms';
import { FaReddit } from 'react-icons/fa';



export const useDirectory = () => {
  const [directoryState,setDirectoryState] = useRecoilState(directoryMenuState);
  const router=useRouter();
  const communityStateValue=useRecoilValue(CommunityState);
  let counter=0;
  const toggleMenuOpen=()=>{
    setDirectoryState(prev=>({
        ...prev,
        isOpen:!directoryState.isOpen
    }))
  }

  const onSelectMenuItem=(menuItem:DirectoryMenuItem)=>{
    setDirectoryState((prev) => ({
      ...prev,
      selectedMenuItem: menuItem,
    }));
    router.push(menuItem.link);
    if (directoryState.isOpen) {
      toggleMenuOpen();
    }
  }

  useEffect(() => {
    const { currentCommunity } = communityStateValue;
    counter++;
    console.log(counter);
    if (router.query.communityId && currentCommunity.id) {
      setDirectoryState((prev) => ({
        ...prev,
        selectedMenuItem: {
          displayText: `r/${currentCommunity.id}`,
          link: `/r/${currentCommunity.id}`,
          imageURL: currentCommunity.imageURL,
          icon: FaReddit,
          iconColor: "blue.500",
        },
      }));
      return;
    }
    setDirectoryState((prev) => ({
      ...prev,
      selectedMenuItem: defaultMenuItem,
    }));
      return () => console.log("unmounting...");
  }, [router.query, communityStateValue.currentCommunity]);

  return {
    directoryState,
    toggleMenuOpen,
    onSelectMenuItem,
    setDirectoryState,
  };
};