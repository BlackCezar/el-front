import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import {
    Alert,
    AlertIcon,
    Box,
    Button,
    Center,
    Container,
    Flex,
    FormControl,
    FormLabel,
    Image,
    Input,
    Spinner,
    Text
} from '@chakra-ui/react'
import { useDispatch } from 'react-redux';
import './assets/scss/App.scss'
import { useAuthUserMutation } from './store/services/UserService'
import { saveUser } from './reducers/user';

function App() {
    const dispatch = useDispatch()
    const history = useNavigate();

    const [loginInput, setLoginInput] = useState({
        value: '',
        touched: false,
        valid: false
    })
    const [passwordInput, setPasswordInput] = useState({
        value: '',
        touched: false,
        valid: false
    })
    const [login, {isLoading, data, isSuccess}] = useAuthUserMutation()
    const handleLogin = val => {
        val = val.target.value
        setLoginInput({
            touched: true,
            value: val,
            valid: val !== '' && val !== '' && String(val).length > 4
        })
    }

    const handlePassword = val => {
        val = val.target.value
        setPasswordInput({
            touched: true,
            value: val,
            valid: val !== '' && val !== '' && String(val).length > 3
        })
    }

    const handleSendForm = async ev => {
        ev.preventDefault()
      
        await login({
            login: loginInput.value,
            password: passwordInput.value
        })
       
    }

    useEffect(() => {
        console.log(data)
        if (isSuccess && data.code === 0) {
            dispatch(saveUser(data.object))
            const {role} = data.object
            if (role === 'Deputy') history("/groups");
            if (role === 'Admin') history("/users");
            if (role === 'Student') history("/dashboard");
            if (role === 'Teacher') history("/journal");
            if (role === 'Parent') history("/dashboard");
            if (role === 'ClassRoomTeacher') history("/brs");
        }
    }, [data, isSuccess, dispatch])
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
                        <FormControl isInvalid={loginInput.touched && !loginInput.valid} isRequired mb={5}>
                            <FormLabel htmlFor="login">Логин:</FormLabel>
                            <Input
                                id="login"
                                type="text"
                                value={loginInput.value}
                                onChange={handleLogin}
                            />
                        </FormControl>
                        <FormControl isInvalid={passwordInput.touched && !passwordInput.valid} isRequired mb={5}>
                            <FormLabel htmlFor="email">Пароль:</FormLabel>
                            <Input
                                id="password"
                                type="password"
                                value={passwordInput.value}
                                onChange={handlePassword}
                            />
                        </FormControl>
                            <Flex flexDir='column' w='100%' >
                            <Center>

                                <Button w='50%'  onClick={handleSendForm} mt={4} mb={4} type="submit">
                                    {isLoading ? <Spinner /> : 'Войти'}
                                </Button>
                        </Center>

                                {data && data.code !== 0 && <Alert status='error'>
                                    <AlertIcon />
                                    {data.message}
                                </Alert>}
                            </Flex>

                    </form>
                </Box>
            </Container>
        </div>
    )
}

export default App
