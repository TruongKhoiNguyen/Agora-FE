import React from 'react'
import { Link } from 'react-router-dom'
import { Box, Center, HStack, Heading, Input, VStack, Image, Text, InputGroup, InputLeftElement, Icon } from '@chakra-ui/react'
import { ArrowForwardIcon, LockIcon } from '@chakra-ui/icons'
import { FaUserCircle } from 'react-icons/fa'

export default function Login() {
    return (
        <Center height="100%" padding="5rem">
            <HStack borderRadius="1rem" boxShadow="0.1rem 0.1rem lightgray">
                <VStack flex="1 1 0" height="100%" gap='6rem' justifyContent="center">
                    <Heading>
                        Login
                    </Heading>
                    <VStack as="form" gap="1.5rem">
                        <Text as="label" position="absolute" visibility="hidden" htmlFor="username">Username</Text>
                        <InputGroup>
                            <InputLeftElement>
                                <Icon as={FaUserCircle} color="blue.500" />
                            </InputLeftElement>
                            <Input type="text" id="username" name="username" placeholder='Username'></Input>
                        </InputGroup>

                        <Text as="label" position="absolute" visibility="hidden" htmlFor="password">Password</Text>
                        <InputGroup>
                            <InputLeftElement>
                                <LockIcon color="blue.500" />
                            </InputLeftElement>
                            <Input type="password" id="password" name="password" placeholder='Password'></Input>
                        </InputGroup>

                        <Input type="submit" value="LOGIN" border="none" color="white" backgroundColor="blue.500" _hover={{ backgroundColor: "blue.700" }} transition="all 0.25s linear"></Input>
                        <Text as={Link} to="/reset-password" color="gray">Forgot <Text as="em" fontStyle="normal" fontWeight="semibold">Username/Password?</Text></Text>
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
