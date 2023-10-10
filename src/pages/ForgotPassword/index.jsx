import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Center, HStack, Heading, Input, VStack, Image, Text, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { EmailIcon } from '@chakra-ui/icons'


export default function ForgotPassword() {
    const navigate = useNavigate()

    return (
        <Center height="100%" padding="5rem">
            <HStack borderRadius="1rem" boxShadow="0.1rem 0.1rem lightgray">
                <Box flex="1 1 0">
                    <Image maxWidth="100%" maxHeight="100%" src="/Banner.svg" alt='Welcome to Agora' borderRadius="1rem 0 0 1rem"></Image>
                </Box>
                <VStack flex="1 1 0" height="100%" gap="5rem" justifyContent="center">
                    <Heading>
                        Forgot Password
                    </Heading>
                    <VStack as="form" gap="1.5rem">
                        <Text as="label" htmlFor='email' width="100%">Enter you email address</Text>
                        <InputGroup>
                            <InputLeftElement>
                                <EmailIcon color="blue.500" />
                            </InputLeftElement>
                            <Input type='email' id='email' placeholder='Email' />
                        </InputGroup>

                        <Input type="submit" value="Continue" border="none" color="white" backgroundColor="blue.500" _hover={{ backgroundColor: "blue.700" }} transition="all 0.25s linear"></Input>
                        <Input type="button" value="Go back" onClick={() => navigate("/login")} borderColor="blue.500" _hover={{ backgroundColor: "blue.700", color: "white" }} transition="all 0.25s linear"></Input>
                    </VStack>
                </VStack>
            </HStack>
        </Center>
    )
}