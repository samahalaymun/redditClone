import { Button, Flex, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import InputItem from "../../Layout/InputItem";
import { authModalState } from "@/src/atoms/authModalAtoms";
import { useSetRecoilState } from "recoil";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/src/firebase/clientApp";
import { FIREBASE_ERRORS } from "@/src/firebase/errors";
import { UnderlineButton } from "../../Layout/UnderlineButton";

type LoginProps = {};

const Login: React.FC<LoginProps> = () => {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const setAuthModalState = useSetRecoilState(authModalState);
 const [signInWithEmailAndPassword, user, loading, error] =
   useSignInWithEmailAndPassword(auth);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signInWithEmailAndPassword(loginForm.email, loginForm.password);
  };
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };
  return (
    <form onSubmit={onSubmit}>
      <InputItem
        name="email"
        placeholder="email"
        type="text"
        mb={2}
        onChange={onChange}
      />
      <InputItem
        name="password"
        placeholder="password"
        type="password"
        onChange={onChange}
      />
      <Text mt={2} fontSize="10pt" color="error.100">
        {error &&
          FIREBASE_ERRORS[error?.message as keyof typeof FIREBASE_ERRORS]}
      </Text>
      <Flex mb={2}>
        <Text mr={1} fontSize="9pt">
          Forgot your password?
        </Text>
        <UnderlineButton
          label="Reset"
          onClick={() =>
            setAuthModalState((prev) => ({
              ...prev,
              view: "resetPassword",
            }))
          }
        />
      </Flex>
      <Button
        type="submit"
        width="100%"
        height="36px"
        mb={4}
        mt={2}
        isLoading={loading}
      >
        Log In
      </Button>
      <Flex fontSize="9pt">
        <Text mr={1}>New to Reddit?</Text>
        <UnderlineButton
          label="Sign Up"
          onClick={() =>
            setAuthModalState((prev) => ({
              ...prev,
              view: "signup",
            }))
          }
        />
      </Flex>
    </form>
  );
};
export default Login;
