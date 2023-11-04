import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { EmailIcon } from '@chakra-ui/icons';
import { postDataAPI } from '../../utils/fetchData';

export default function ForgotPassword() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/');
    }
  }, []);

  /**
   * Send user's email to server to reset password
   *
   * @param {Event} event
   */
  async function handleSubmit(event) {
    // prevent the page from being reload
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    const userData = {
      email: formData.get('email')
    };

    try {
      const res = await forgotPassword(userData);
      console.log(res);

      if (res.success) {
        // TODO: redirect to page to make user check their email
        alert('Check your email!');
      }
    } catch (error) {
      // TODO: turn off in production
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
          <Heading>Forgot Password</Heading>
          <VStack as="form" gap="1.5rem" method="post" onSubmit={handleSubmit}>
            <Text as="label" htmlFor="email" width="100%">
              Enter you email address
            </Text>
            <InputGroup>
              <InputLeftElement>
                <EmailIcon color="blue.500" />
              </InputLeftElement>
              <Input type="email" id="email" name="email" placeholder="Email" required />
            </InputGroup>

            <Input
              type="submit"
              value="Continue"
              border="none"
              color="white"
              backgroundColor="blue.500"
              _hover={{ backgroundColor: 'blue.700' }}
              transition="all 0.25s linear"></Input>
            <Input
              type="button"
              value="Go back"
              onClick={() => navigate('/login')}
              borderColor="blue.500"
              _hover={{ backgroundColor: 'blue.700', color: 'white' }}
              transition="all 0.25s linear"></Input>
          </VStack>
        </VStack>
      </HStack>
    </Center>
  );
}

/**
 * Send user's email to server
 *
 * @param {object} userData
 * @param {string} userData.email
 * @returns
 */
async function forgotPassword(userData) {
  return await postDataAPI('auth/forgot-password', { data: userData }, '');
}
