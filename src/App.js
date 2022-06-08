import React, { useState } from 'react'
import {
    Box,
    Button,
    Center,
    Container,
    Flex,
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    Image,
    Input,
    Text
} from '@chakra-ui/react'
import './assets/scss/App.scss'

function App() {
    const [input, setInput] = useState('')

    const handleInputChange = (e) => setInput(e.target.value)

    const isError = input === ''

    return (
        <div className="login-page">
            <Center>
                <Flex alignItems="center">
                    <Text color="blue" fontSize="4xl">
                        Электронный журнал СУНЦ СВФУ
                    </Text>
                    <Image
                        borderRadius="full"
                        boxSize="150px"
                        src="logo.png"
                        alt="Logo"
                    />
                </Flex>
            </Center>
            <Container mt={20}>
                <Box borderWidth="1px" p="15" borderRadius="10">
                    <form>
                        {' '}
                        <FormControl isInvalid={isError} isRequired mb={5}>
                            <FormLabel htmlFor="email">Email</FormLabel>
                            <Input
                                id="email"
                                type="email"
                                value={input}
                                onChange={handleInputChange}
                            />
                            {!isError ? (
                                <FormHelperText>Helper</FormHelperText>
                            ) : (
                                <FormErrorMessage>
                                    Email is required.
                                </FormErrorMessage>
                            )}
                        </FormControl>
                        <FormControl isInvalid={isError}>
                            <FormLabel htmlFor="email">Email</FormLabel>
                            <Input
                                id="email"
                                type="email"
                                value={input}
                                onChange={handleInputChange}
                            />
                            {!isError ? (
                                <FormHelperText>newsletter on.</FormHelperText>
                            ) : (
                                <FormErrorMessage>
                                    Email is required.
                                </FormErrorMessage>
                            )}
                        </FormControl>
                        <Button mt={4} type="submit">
                            Submit
                        </Button>
                    </form>
                </Box>
            </Container>
        </div>
    )
}

export default App
