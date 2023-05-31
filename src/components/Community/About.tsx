import { Community, CommunityState } from "@/src/atoms/communitiesAtoms";
import { auth, firestore, storage } from "@/src/firebase/clientApp";
import useCommunityData from "@/src/hooks/useCommunityData";
import { useDirectory } from "@/src/hooks/useDirectory";
import { useSelectFile } from "@/src/hooks/useSelectFile";
import {
  Box,
  Button,
  Divider,
  Flex,
  Icon,
  Image,
  Input,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { FaReddit } from "react-icons/fa";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { RiCakeLine } from "react-icons/ri";
import { useRecoilValue, useSetRecoilState } from "recoil";
type AboutProps = {
  communityData: Community;
  onCreatePage?: boolean;
};

export const About: React.FC<AboutProps> = ({
  communityData,
  onCreatePage,
}) => {
  const [user] = useAuthState(auth);
  const selectedFileRef = useRef<HTMLInputElement>(null);
  const { selectedFile,  onSelectFile ,setSelectedFile} = useSelectFile();
  const [uploadingImage, setUploadingImage] = useState(false);
  const setCommunityStateValue = useSetRecoilState(CommunityState);
   const {setDirectoryState}=useDirectory() 

  const onUpdateImage = async () => {
    if (!selectedFile) return;
    setUploadingImage(true);
    try {
      const imageRef = ref(storage, `communities/${communityData.id}/image`);
      await uploadString(imageRef, selectedFile, "data_url");
      const downloadURL = await getDownloadURL(imageRef);
      await updateDoc(doc(firestore, "communities", communityData.id), {
        imageURL: downloadURL,
      });
      setCommunityStateValue((prev) => ({
        ...prev,
        currentCommunity: {
          ...prev.currentCommunity,
          imageURL: downloadURL,
        },
      }));

       setDirectoryState((prev)=>({
          ...prev,
          selectedMenuItem:{
            ...prev.selectedMenuItem,
            imageURL: downloadURL,
          }
        }))

    } catch (error) {}
    setUploadingImage(false);
    
  };
  const onSelectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      onSelectFile(event.target.files[0]);
    }
  };
  return (
    <Box position="sticky" top="14px" width="100%">
      <Flex
        justify="space-between"
        align="center"
        bg="blue.400"
        color="white"
        padding={3}
        borderRadius="4px 4px 0px 0px"
      >
        <Text fontSize="10pt" fontWeight={700}>
          About Community
        </Text>
        <Icon as={HiOutlineDotsHorizontal} />
      </Flex>
      <Flex direction="column" p={3} bg="white" borderRadius="0px 0px 4px 4px">
        <Stack spacing={2}>
          <Flex width="100%" p={2} fontWeight={600} fontSize="10pt">
            <Flex direction="column" flexGrow={1}>
              <Text>{communityData?.numberOfMembers?.toLocaleString()}</Text>
              <Text color="gray.500" fontWeight={500}>
                Members
              </Text>
            </Flex>
            <Flex direction="column" flexGrow={1}>
              <Text>1</Text>
              <Text color="gray.500" fontWeight={500}>
                Online
              </Text>
            </Flex>
          </Flex>
          <Divider />
          <Flex
            align="center"
            width="100%"
            p={1}
            fontWeight={500}
            fontSize="10pt"
          >
            <Icon as={RiCakeLine} mr={2} fontSize={18} />
            {communityData?.createdAt && (
              <Text>
                Created{" "}
                {moment(
                  new Date(communityData.createdAt!.seconds * 1000)
                ).format("MMM DD, YYYY")}
              </Text>
            )}
          </Flex>
          <Divider />

          {!onCreatePage && user && (
            <Link href={`/r/${communityData.id}/submit`}>
              <Button mt={3} height="30px" width="100%">
                Create Post
              </Button>
            </Link>
          )}
          {user?.uid === communityData.creatorId && (
            <>
              <Divider />
              <Stack spacing={1} fontSize="10pt">
                <Text fontWeight={600}>Admin</Text>
                <Flex align="center" justify="space-between">
                  <Text
                    color="blue.500"
                    cursor="pointer"
                    _hover={{ textDecoration: "underline" }}
                    onClick={() => selectedFileRef.current?.click()}
                  >
                    Change image
                  </Text>
                  <Input
                    type="file"
                    ref={selectedFileRef}
                    hidden
                    onChange={onSelectImage}
                  />
                  {communityData.imageURL ||selectedFile? (
                    <Image
                      boxSize="40px"
                      borderRadius="full"
                      src={selectedFile || communityData.imageURL}
                    />
                  ) : (
                    <Icon
                      as={FaReddit}
                      fontSize={40}
                      color="brand.100"
                      mr={2}
                    />
                  )}
                </Flex>
                {selectedFile &&
                  (uploadingImage ? (
                    <Spinner size="xs" />
                  ) : (
                    <Text cursor="pointer" onClick={onUpdateImage}>
                      Save Changes
                    </Text>
                  ))}
              </Stack>
            </>
          )}
        </Stack>
      </Flex>
    </Box>
  );
};
