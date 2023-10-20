import React from 'react';
import {
  Box,
  Center,
  HStack,
  Heading,
  Input,
  VStack,
  Image,
  Text,
  InputGroup,
  InputLeftElement
} from '@chakra-ui/react';
import { LockIcon } from '@chakra-ui/icons';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  /**
   * Send new password to server
   *
   * @param {Event} event
   */
  async function handleSubmit(event) {
    // prevent the page from being reload
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    const password = formData.get('password');
    const confirm = formData.get('confirm');

    if (password !== confirm) {
      form.password.setCustomValidity('Password and confirm password must match');
      return;
    }

    const resetData = {
      password: formData.get('password')
    };

    const token = searchParams.get('token');

    if (!token) {
      alert('Reset token does not exist');
      return;
    }

    try {
      const res = await fetch(`http://localhost:9900/api/v1/auth/reset-password?token=${token}`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(resetData)
      });

      const resData = await res.json();

      if (resData.success) {
        console.log(resData);
        navigate('/login');
      }
    } catch (error) {
      console.log(error.message);
      console.log(error.response?.data);
    }
  }

  return (
    <Center bg="gray.400" height="100vh" padding="5rem">
      <HStack bg="white" borderRadius="1rem" boxShadow="0.1rem 0.1rem lightgray">
        <Box flex="1 1 0">
          <Image
            maxWidth="100%"
            maxHeight="100%"
            src="/Banner.svg"
            alt="Welcome to Agora"
            borderRadius="1rem 0 0 1rem"></Image>
        </Box>
        <VStack flex="1 1 0" height="100%" gap="5rem" justifyContent="center">
          <Heading>Reset Password</Heading>
          <VStack as="form" gap="1.5rem" method="post" onSubmit={handleSubmit}>
            <Text as="label" htmlFor="password" position="absolute" visibility="hidden">
              Enter your new password
            </Text>
            <InputGroup>
              <InputLeftElement>
                <LockIcon color="blue.500" />
              </InputLeftElement>
              <Input
                type="password"
                id="password"
                name="password"
                placeholder="Enter new password"
                required
              />
            </InputGroup>

            <Text as="label" htmlFor="confirm" position="absolute" visibility="hidden">
              Confirm your new password
            </Text>
            <InputGroup>
              <InputLeftElement>
                <LockIcon color="blue.500" />
              </InputLeftElement>
              <Input
                type="password"
                id="confirm"
                name="confirm"
                placeholder="Confirm new password"
                required
              />
            </InputGroup>

            <Input
              type="submit"
              value="Reset password"
              border="none"
              color="white"
              backgroundColor="blue.500"
              _hover={{ backgroundColor: 'blue.700' }}
              transition="all 0.25s linear"></Input>
          </VStack>
        </VStack>
      </HStack>
    </Center>
  );
}
