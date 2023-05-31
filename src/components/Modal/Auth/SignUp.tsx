import React, { useState, useEffect } from "react";
import InputItem from "../../Layout/InputItem";
import { Button, Flex, Text } from "@chakra-ui/react";
import { authModalState } from "@/src/atoms/authModalAtoms";
import { useSetRecoilState } from "recoil";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, firestore } from "@/src/firebase/clientApp";
import { FIREBASE_ERRORS } from "@/src/firebase/errors";
import { UnderlineButton } from "../../Layout/UnderlineButton";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { User } from "firebase/auth";

type SignUpProps = {};

const SignUp: React.FC<SignUpProps> = () => {
  const [signUpForm, setSignUpForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [createUserWithEmailAndPassword, userCred, loading, userError] =
    useCreateUserWithEmailAndPassword(auth);
  const setAuthModalState = useSetRecoilState(authModalState);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (error) setError("");
    if (!signUpForm.email.includes("@")) {
      return setError("Please enter a valid email");
    }
    if (signUpForm.password !== signUpForm.confirmPassword) {
      return setError("Passwords do not match");
    }
    createUserWithEmailAndPassword(signUpForm.email, signUpForm.password)
  };
  const createUserDoc = async (user: User) => {
    const userId = user.uid;
    const userDocRef = doc(firestore, "users", userId);
    await setDoc(userDocRef, {
      uid: user.uid,
      email: user.email,
    });
  }

  useEffect(() => {
    if (userCred) {
      createUserDoc(userCred.user);
    }
  }, [userCred]);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };
  return (
    <form onSubmit={onSubmit}>
      <InputItem
        name="email"
        placeholder="email"
        type="email"
        mb={2}
        onChange={onChange}
      />
      <InputItem
        name="password"
        placeholder="password"
        type="password"
        mb={2}
        onChange={onChange}
      />
      <InputItem
        name="confirmPassword"
        placeholder="confirm password"
        type="password"
        onChange={onChange}
      />
      {(error || userError) && (
        <Text mt={2} fontSize="10pt" color="error.100">
          {error ||
            FIREBASE_ERRORS[userError?.message as keyof typeof FIREBASE_ERRORS]}
        </Text>
      )}
      <Button
        width="100%"
        height="36px"
        mb={4}
        mt={2}
        type="submit"
        isLoading={loading}
      >
        Sign Up
      </Button>
      <Flex fontSize="9pt">
        <Text mr={1}>Have an account?</Text>

        <UnderlineButton
          label="LOG IN"
          onClick={() =>
            setAuthModalState((prev) => ({
              ...prev,
              view: "login",
            }))
          }
        />
      </Flex>
    </form>
  );
};
export default SignUp;
