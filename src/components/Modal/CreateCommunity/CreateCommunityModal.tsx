import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Box,
  Divider,
  Text,
  Input,
  Stack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import CommunityTypeCheckBox from "./CommunityTypeCheckBox";
import { BsFillEyeFill, BsFillPersonFill } from "react-icons/bs";
import { HiLockClosed } from "react-icons/hi";
import {
  doc,
  getDoc,
  runTransaction,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { auth, firestore } from "@/src/firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { useDirectory } from "@/src/hooks/useDirectory";

type CreateCommunityModalProps = {
  open: boolean;
  handleClose: () => void;
};

const CreateCommunityModal: React.FC<CreateCommunityModalProps> = ({
  open,
  handleClose,
}) => {
  const [user] = useAuthState(auth);
  const [communityName, setCommunityName] = useState("");
  const [charsRemaining, setCharsRemaining] = useState(21);
  const [communityType, setCommunityType] = useState("public");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router =useRouter();
  const {toggleMenuOpen}=useDirectory()
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 21) return;
    setCommunityName(event.target.value);
    setCharsRemaining(21 - event.target.value.length);
  };
 
  const onCommunityTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCommunityType(event.target.name);
  };

  const handleCreateCommunity = async () => {
    if (error) setError("");
    const format = /[ `!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (format.test(communityName) || communityName.length < 3) {
      setError(
        "Community names must be between 3–21 characters, and can only contain letters, numbers, or underscores."
      );
      return;
    }
    setLoading(true);
    try {
      const communityDocRef = doc(firestore, "communities", communityName);
      await runTransaction(firestore, async (transaction) => {
        const communityDoc = await transaction.get(communityDocRef);
        if (communityDoc.exists()) {
          throw new Error(`Sorry, /r${communityName} is taken. Try another.`);
        }
        //create community
         transaction.set(communityDocRef, {
          creatorId: user?.uid,
          createdAt: serverTimestamp(),
          numberOfMembers: 1,
          privacyType: communityType,
        });
         //create communitySnippet on user
         transaction.set(
           doc(
             firestore,
             `users/${user?.uid}/communitySnippets`,
             communityName
           ),
           {
             communityId: communityName,
             isModerator: true,
           }
         );
         
      });
      router.push(`/r/${communityName}`);
      handleClose();
      toggleMenuOpen();
    } catch (error: any) {
      setError(error.message);
    }
    //handleClose();
    setLoading(false);
  };
  return (
    <>
      <Modal isOpen={open} onClose={handleClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            display="flex"
            flexDirection="column"
            fontSize={15}
            padding={3}
          >
            Create a community
          </ModalHeader>
          <Box pl={3} pr={3}>
            <Divider />
            <ModalCloseButton />
            <ModalBody display="flex" flexDirection="column" padding="10px 0px">
              <Text fontWeight={500} fontSize={15}>
                Name
              </Text>
              <Text fontSize={11} color="gray.500">
                Community names including capitalization cannot be changed.
              </Text>
              <Text
                position="relative"
                left="10px"
                top="28px"
                width="20px"
                color="gray.400"
              >
                r/
              </Text>
              <Input
                position="relative"
                value={communityName}
                size="sm"
                pl="22px"
                onChange={handleChange}
              />
              <Text
                mt={2}
                fontSize="9pt"
                color={charsRemaining === 0 ? "#fb133a" : "gray.500"}
              >
                {charsRemaining} Characters remaining
              </Text>
              {error && (
                <Text pt={1} fontSize="9pt" color="error.100">
                  {error}
                </Text>
              )}
              <Box mt={4} mb={4}>
                <Text fontWeight={500} fontSize={15} mb={2}>
                  Community type
                </Text>
                <Stack spacing={2}>
                  <CommunityTypeCheckBox
                    name="public"
                    type={communityType}
                    label="Public"
                    description="Anyone can view, post, and comment to this community"
                    onChange={onCommunityTypeChange}
                    icon={BsFillPersonFill}
                  />
                  <CommunityTypeCheckBox
                    name="restricted"
                    type={communityType}
                    label="Restricted"
                    description="Anyone can view this community, but only approved users can post"
                    onChange={onCommunityTypeChange}
                    icon={BsFillEyeFill}
                  />
                  <CommunityTypeCheckBox
                    name="private"
                    type={communityType}
                    label="Private"
                    description="Only approved users can view and submit to this community"
                    onChange={onCommunityTypeChange}
                    icon={HiLockClosed}
                  />
                </Stack>
              </Box>
            </ModalBody>
          </Box>

          <ModalFooter bg="gray.100" borderRadius="0px 0px 10px 10px">
            <Button
              variant="outline"
              mr={2}
              onClick={handleClose}
              height="30px"
            >
              Cancel
            </Button>
            <Button
              variant="solid"
              height="30px"
              onClick={handleCreateCommunity}
              isLoading={loading}
            >
              Create Community
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default CreateCommunityModal;
