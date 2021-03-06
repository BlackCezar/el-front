import React, { useMemo } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import {  useSelector } from 'react-redux'
import {
    Box,
    Button,
    Center,
    Divider,
    Flex,
    Heading,
    IconButton,
    Spinner,
    Text
} from '@chakra-ui/react'
import '../assets/scss/Common.scss'
import { ReactComponent as LogoutIcon } from '../assets/images/logout.svg'

export default function Layout({ children }) {
    const navigation = useNavigate()
    const location = useLocation()
    const user = useSelector((state) => state.user.object)

    const pageName = useMemo(() => {
        let name = ''
        switch (location.pathname) {
            case '/dashboard':
                name = 'Личный кабинет'
                break
            case '/groups':
                name = 'Классы'
                break
            case '/journal':
                name = 'Журнал'
                break
            case '/brs':
                name = 'БРС'
                break
            case '/users':
                name = 'Учетные записи'
                break
            case '/export':
                name = 'Экспорт'
                break
            default:
                name = ''
        }
        return name
    }, [location])


    if (!user) {
        return <Navigate to="/" />
    }
    return (
        <div className="page-layout">
            { !user ? (
                <Box
                    boxShadow="xl"
                    className="sidebar"
                    bg="rgb(249 249 249)"
                    p="5"
                />
            ) : (
                <Box
                    boxShadow="xl"
                    className="sidebar"
                    bg="rgb(249 249 249)"
                    p="5"
                >
                    <Heading color="blue" textAlign="center" mb={5}>
                        СУНЦ СВФУ
                    </Heading>
                    <Divider mb="3" />
                    {['Student', 'Parent', 'Deputy'].includes(
                        user.role
                    ) && (
                        <Link to="/dashboard">
                            <Button
                                w="100%"
                                colorScheme="telegram"
                                variant="ghost"
                            >
                                Расписание
                            </Button>
                        </Link>
                    )}
                    {['Student', 'Teacher'].includes(
                        user.role
                    ) && (
                        <Link to="/journal">
                            <Button
                                w="100%"
                                colorScheme="telegram"
                                variant="ghost"
                            >
                                Журнал
                            </Button>
                        </Link>
                    )}
                    {['Student', 'ClassRoomTeacher'].includes(user.role) && (
                        <Link to="/brs">
                            <Button
                                w="100%"
                                colorScheme="telegram"
                                variant="ghost"
                            >
                                БРС
                            </Button>
                        </Link>
                    )}
                    {['Deputy'].includes(user.role) && (
                        <Link to="/groups">
                            <Button
                                w="100%"
                                colorScheme="telegram"
                                variant="ghost"
                            >
                                Классы
                            </Button>
                        </Link>
                    )}
                    {['Deputy'].includes(user.role) && (
                        <Link to="/teachers">
                            <Button
                                w="100%"
                                colorScheme="telegram"
                                variant="ghost"
                            >
                                Учителя
                            </Button>
                        </Link>
                    )}
                    {['Admin'].includes(user.role) && (
                        <Link to="/users">
                            <Button
                                w="100%"
                                colorScheme="telegram"
                                variant="ghost"
                            >
                                Учетные записи
                            </Button>
                        </Link>
                    )}
                </Box>
            )}
            {!user ? (
                <Center w="100%">
                    <Spinner size="xl" />
                </Center>
            ) : (
                <div className="content">
                    <Box p={5}>
                        <Flex alignItems="center" justifyContent="flex-end">
                            <Heading mr="auto" fontSize="3xl">
                                {pageName}
                            </Heading>
                            <Text>Здравствуйте, {user.fullname}</Text>
                            <IconButton
                                colorScheme="whiteAlpha"
                                ml={3}
                                aria-label="Выход"
                                icon={<LogoutIcon />}
                                onClick={() => navigation('/logout')}
                            />
                        </Flex>
                        <Divider mt={5} mb="3" />
                    </Box>
                    <Box p={5} pt={0}>
                        {children}
                    </Box>
                </div>
            )}
        </div>
    )
}
