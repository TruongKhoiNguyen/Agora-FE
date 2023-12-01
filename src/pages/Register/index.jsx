import { Link, useNavigate } from 'react-router-dom';
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
  InputLeftElement,
  Icon,
  useToast
} from '@chakra-ui/react';
import { ArrowForwardIcon, EmailIcon, LockIcon } from '@chakra-ui/icons';
import { FaUserCircle } from 'react-icons/fa';

import requestApi from '../../utils/fetchData';

export default function Register() {
  const navigate = useNavigate();
  const toast = useToast();

  /**
   * Parse register form data and post it to the server
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
      form.password.setCustomValidity('Password and password confirmation must match');
      return;
    }

    const registerData = {
      firstName: formData.get('firstname'),
      lastName: formData.get('lastname'),
      email: formData.get('email'),
      password: formData.get('password')
    };

    try {
      await register(registerData);
      toast({
        title: 'Success',
        description: 'Register success. Please login to continue.',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'bottom-right'
      });
      navigate('/login');
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'bottom-right'
      });
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
        <VStack flex="1 1 0" height="100%" gap="3rem" justifyContent="center">
          <Heading>Register</Heading>
          <VStack as="form" gap="1.5rem" method="post" onSubmit={handleSubmit}>
            <Text as="label" position="absolute" visibility="hidden" htmlFor="email">
              Email
            </Text>
            <InputGroup>
              <InputLeftElement>
                <EmailIcon color="blue.500" />
              </InputLeftElement>
              <Input type="email" id="email" placeholder="Email" name="email" required></Input>
            </InputGroup>

            <Text as="label" position="absolute" visibility="hidden" htmlFor="firstname">
              First name
            </Text>
            <InputGroup>
              <InputLeftElement>
                <Icon as={FaUserCircle} color="blue.500" />
              </InputLeftElement>
              <Input
                type="text"
                id="firstname"
                name="firstname"
                placeholder="First name"
                required></Input>
            </InputGroup>

            <Text as="label" position="absolute" visibility="hidden" htmlFor="lastname">
              Last name
            </Text>
            <InputGroup>
              <InputLeftElement>
                <Icon as={FaUserCircle} color="blue.500" />
              </InputLeftElement>
              <Input type="text" id="lastname" name="lastname" placeholder="Last name"></Input>
            </InputGroup>

            <Text as="label" position="absolute" visibility="hidden" htmlFor="password">
              Password
            </Text>
            <InputGroup>
              <InputLeftElement>
                <LockIcon color="blue.500" />
              </InputLeftElement>
              <Input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                required></Input>
            </InputGroup>

            <Text as="label" position="absolute" visibility="hidden" htmlFor="confirm">
              Confirm password
            </Text>
            <InputGroup>
              <InputLeftElement>
                <LockIcon color="blue.500" />
              </InputLeftElement>
              <Input
                type="password"
                id="confirm"
                name="confirm"
                placeholder="Confirm password"
                required></Input>
            </InputGroup>

            <Input
              type="submit"
              value="REGISTER"
              border="none"
              color="white"
              backgroundColor="blue.500"
              _hover={{ backgroundColor: 'blue.700' }}
              transition="all 0.25s linear"></Input>
          </VStack>
          <Text as={Link} to="/login" className="login-link" color="gray" fontWeight="semibold">
            Already have an Account <ArrowForwardIcon />
          </Text>
        </VStack>
      </HStack>
    </Center>
  );
}

/**
 * Send register data to server
 *
 * @param {object} registerInfo
 * @param {string} registerInfo.firstName
 * @param {string} registerInfo.lastName
 * @param {string} registerInfo.email
 * @param {string} registerInfo.password
 *
 * @returns
 */
async function register(registerInfo) {
  return await requestApi('auth/register', 'POST', registerInfo);
}
