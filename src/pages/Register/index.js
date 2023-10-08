import React from 'react'
import { Link } from 'react-router-dom'
import { Box, Center, HStack, Heading, Input, VStack, Image, Text, InputGroup, InputLeftElement, Icon } from '@chakra-ui/react'
import { ArrowForwardIcon, EmailIcon, LockIcon } from '@chakra-ui/icons'
import { FaUserCircle } from 'react-icons/fa'

export default function Register() {
    return (
        <Center height="100%" padding="5rem">
            <HStack borderRadius="1rem" boxShadow="0.1rem 0.1rem lightgray">
                <Box flex="1 1 0">
                    <Image maxWidth="100%" maxHeight="100%" src="/Banner.svg" alt='Welcome to Agora' borderRadius="1rem 0 0 1rem"></Image>
                </Box>
                <VStack flex="1 1 0" height="100%" gap="5rem" justifyContent="center">
                    <Heading>
                        Register
                    </Heading>
                    <VStack as="form" gap="1.5rem">
                        <Text as="label" position="absolute" visibility="hidden" htmlFor='email'>Email</Text>
                        <InputGroup>
                            <InputLeftElement>
                                <EmailIcon color="blue.500" />
                            </InputLeftElement>
                            <Input type='email' id='email' placeholder='Email' />
                        </InputGroup>

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

                        <Text as="label" position="absolute" visibility="hidden" htmlFor="confirm">Confirm password</Text>
                        <InputGroup>
                            <InputLeftElement>
                                <LockIcon color="blue.500" />
                            </InputLeftElement>
                            <Input type="password" id="confirm" name="confirm" placeholder='Confirm password'></Input>
                        </InputGroup>

                        <Input type="submit" value="REGISTER" border="none" color="white" backgroundColor="blue.500" _hover={{ backgroundColor: "blue.700" }} transition="all 0.25s linear"></Input>
                    </VStack>
                    <Text as={Link} to="/login" className='login-link' color="gray" fontWeight="semibold">Already have an Account <ArrowForwardIcon /></Text>
                </VStack>
            </HStack>
        </Center>
    )
}