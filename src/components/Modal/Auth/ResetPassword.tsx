import React, { useState } from "react";
import { authModalState } from "@/src/atoms/authModalAtoms";
import { useSetRecoilState } from "recoil";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import { auth } from "@/src/firebase/clientApp";
import { Button, Flex, Icon, Input, Text } from "@chakra-ui/react";
import { BsDot, BsReddit } from "react-icons/bs";
import InputItem from "../../Layout/InputItem";
import { UnderlineButton } from "../../Layout/UnderlineButton";

const ResetPassword: React.FC = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [sendPasswordResetEmail, sending, error] =
    useSendPasswordResetEmail(auth);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await sendPasswordResetEmail(email);
    setSuccess(true);
  };

  return (
    <Flex direction="column" width="100%" >
      <Icon as={BsReddit} color="brand.100" fontSize={40} mb={2} />
      <Text fontWeight={700} mb={2}>
        Reset your password
      </Text>
      {success ? (
        <Text mb={4}>Check your email :)</Text>
      ) : (
        <>
          <Text fontSize="sm"  mb={2}>
            Enter the email associated with your account and we will send you a
            reset link
          </Text>
          <form onSubmit={onSubmit} style={{ width: "100%" }}>
            <InputItem
              name="email"
              placeholder="email"
              type="email"
              mb={2}
              onChange={(event) => setEmail(event.target.value)}
            />
            <Text textAlign="center" fontSize="10pt" color="error.100">
              {error?.message}
            </Text>
            <Button
              width="100%"
              height="36px"
              mb={2}
              mt={2}
              type="submit"
              isLoading={sending}
            >
              Reset Password
            </Button>
          </form>
        </>
      )}
      <Flex
        alignItems="center"
        fontSize="9pt"
        color="blue.500"
        fontWeight={700}
        cursor="pointer"
      >
        <UnderlineButton
          label="Log In"
          onClick={() =>
            setAuthModalState((prev) => ({
              ...prev,
              view: "login",
            }))
          }
        />
        <Icon as={BsDot} />
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
    </Flex>
  );
};

export default ResetPassword;
