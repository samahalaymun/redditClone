import { auth, firestore } from "@/src/firebase/clientApp";
import { Button, Flex, Image, Text } from "@chakra-ui/react";
import { User } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";

const OAuthButtons: React.FC = () => {
  const [signInWithGoogle, userCred,loading,error] = useSignInWithGoogle(auth);

   const createUserDoc = async (user: User) => {
     const userId = user.uid;
     const userDocRef = doc(firestore, "users", userId);
     await setDoc(userDocRef, {
       uid: user.uid,
       email: user.email,
     });
   };

   useEffect(() => {
     if (userCred) {
       createUserDoc(userCred.user);
     }
   }, [userCred]);
  return (
    <Flex direction="column" width="100%" mb={4}>
      <Button
        variant="oauth"
        mb={2}
        isLoading={loading}
        onClick={() => signInWithGoogle()}
      >
        <Image src="/images/googlelogo.png" height="20px" mr={6} /> Continue
        with Google
      </Button>
      <Button variant="oauth">Some other provider</Button>
      {error && (
        <Text textAlign="center" fontSize="10pt" color="red" mt={2}>
          {error.message}
        </Text>
      )}
    </Flex>
  );
};

export default OAuthButtons;
