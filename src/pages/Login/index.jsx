import React from 'react'
import { Link } from 'react-router-dom'
import { Box, Center, HStack, Heading, Input, VStack, Image, Text, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { ArrowForwardIcon, EmailIcon, LockIcon } from '@chakra-ui/icons'
import { postDataAPI } from '../../utils/fetchData'

export default function Login() {
    async function handleSubmit(event) {
        // prevent the page from being reload
        event.preventDefault()

        const form = event.target
        const formData = new FormData(form)

        const loginData = {
            email: formData.get('email'),
            password: formData.get('password'),
        }

        try {
            const res = await login(loginData)
            console.log(res)

            if (res.success) {
                const token = res.metadata.token.accessToken
                const refreshToken = res.metadata.token.accessToken
                const userId = res.metadata.token.userId

                // WARNING: store token like this is prone to XSS attack
                localStorage.setItem("token", token)
                localStorage.setItem("refreshToken", refreshToken)
                localStorage.setItem("userId", userId)

                // TODO: navigate to home page
            }

        } catch (error) {
            // TODO: Turn off these lines in production
            console.log(error.message)
            console.log(error.response?.data)
        }

    }

    return (
        <Center height="100%" padding="5rem">
            <HStack borderRadius="1rem" boxShadow="0.1rem 0.1rem lightgray">
                <VStack flex="1 1 0" height="100%" gap='6rem' justifyContent="center">
                    <Heading>
                        Login
                    </Heading>
                    <VStack as="form" gap="1.5rem" method='post' onSubmit={handleSubmit}>
                        <Text as="label" position="absolute" visibility="hidden" htmlFor="username">Username</Text>
                        <InputGroup>
                            <InputLeftElement>
                                <EmailIcon color="blue.500" />
                            </InputLeftElement>
                            <Input type="email" id="Email" name="email" placeholder='Email'></Input>
                        </InputGroup>

                        <Text as="label" position="absolute" visibility="hidden" htmlFor="password">Password</Text>
                        <InputGroup>
                            <InputLeftElement>
                                <LockIcon color="blue.500" />
                            </InputLeftElement>
                            <Input type="password" id="password" name="password" placeholder='Password'></Input>
                        </InputGroup>

                        <Input type="submit" value="LOGIN" border="none" color="white" backgroundColor="blue.500" _hover={{ backgroundColor: "blue.700" }} transition="all 0.25s linear"></Input>
                        <Text as={Link} to="/forgot-password" color="gray">Forgot <Text as="em" fontStyle="normal" fontWeight="semibold">Username/Password?</Text></Text>
                    </VStack>

                    <Text as={Link} to="/register" color="gray" fontWeight="semibold">Create your Account <ArrowForwardIcon /></Text>
                </VStack>
                <Box flex="1 1 0">
                    <Image maxWidth="100%" maxHeight="100%" src="/Banner.svg" alt='Welcome to Agora' borderRadius="0 1rem 1rem 0"></Image>
                </Box>
            </HStack>
        </Center>
    )
}


async function login(loginData) {
    return postDataAPI('auth/login', { data: loginData }, '')
}