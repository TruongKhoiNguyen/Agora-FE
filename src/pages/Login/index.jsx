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
  useToast
} from '@chakra-ui/react';
import { ArrowForwardIcon, EmailIcon, LockIcon } from '@chakra-ui/icons';

import requestApi from '../../utils/fetchData';

export default function Login() {
  const navigate = useNavigate();
  const toast = useToast();

  /**
   * Submit login form to server and store credential tokens
   *
   * @param {Event} event
   */
  async function handleSubmit(event) {
    // prevent the page from being reload
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    const loginData = {
      email: formData.get('email'),
      password: formData.get('password')
    };

    try {
      const res = await login(loginData);
      const accessToken = res.data.metadata.token.accessToken;
      const refreshToken = res.data.metadata.token.refreshToken;
      const userId = res.data.metadata.userId;

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('userId', userId);

      toast({
        title: 'Login success.',
        description: 'Login success.',
        status: 'success',
        duration: 4000,
        isClosable: true,
        position: 'bottom-right'
      });
      navigate('/messenger');
      window.location.reload();
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
    <Box bg="gray.200" w="100vw" h="100vh">
      <Center height="100%" padding="5rem">
        <HStack borderRadius="1rem" boxShadow="0.1rem 0.1rem lightgray" bg="white">
          <VStack flex="1 1 0" height="100%" gap="6rem" justifyContent="center">
            <Heading>Login</Heading>
            <VStack as="form" gap="1.5rem" method="post" onSubmit={handleSubmit}>
              <Text as="label" position="absolute" visibility="hidden" htmlFor="username">
                Username
              </Text>
              <InputGroup>
                <InputLeftElement>
                  <EmailIcon color="blue.500" />
                </InputLeftElement>
                <Input type="email" id="Email" name="email" placeholder="Email" required></Input>
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

              <Input
                type="submit"
                value="LOGIN"
                border="none"
                color="white"
                backgroundColor="blue.500"
                _hover={{ backgroundColor: 'blue.700' }}
                transition="all 0.25s linear"></Input>
              <Text as={Link} to="/forgot-password" color="gray">
                Forgot{' '}
                <Text as="em" fontStyle="normal" fontWeight="semibold">
                  Username/Password?
                </Text>
              </Text>
            </VStack>

            <Text as={Link} to="/register" color="gray" fontWeight="semibold">
              Create your Account <ArrowForwardIcon />
            </Text>
          </VStack>
          <Box flex="1 1 0">
            <Image
              maxWidth="100%"
              maxHeight="100%"
              src="/Banner.svg"
              alt="Welcome to Agora"
              borderRadius="0 1rem 1rem 0"></Image>
          </Box>
        </HStack>
      </Center>
    </Box>
  );
}

/**
 * Send login data to server
 *
 * @param {object} loginData
 * @param {string} loginData.email
 * @param {string} loginData.password
 * @returns
 */
async function login(loginData) {
  return await requestApi('auth/login', 'POST', { ...loginData });
}
