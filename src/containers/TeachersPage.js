import React from 'react'
import {
    Box,
    Center,
    Flex,
    Heading,
    IconButton,
    Input,
    InputGroup,
    InputLeftElement,
    Link,
    ListItem,
    OrderedList,
    Spinner
} from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
import { ArrowBackIcon, SearchIcon } from '@chakra-ui/icons'
import { useGetUsersQuery } from '../store/services/UserService'

export default function GroupsPage() {
    const { data: teachers, isLoading } = useGetUsersQuery({ role: 'Teacher' })
    const navigation = useNavigate()
    const user = useSelector((state) => state.user.object)

    if (['Deputy'].includes(user.role)) {
        return (
            <div>
                <Flex mb={3}>
                    <IconButton
                        icon={<ArrowBackIcon />}
                        onClick={() => navigation(-1)}
                        mr={2}
                    />
                    <Heading mb={2}>Список учителей</Heading>

                    <InputGroup width="300" ml="auto">
                        <InputLeftElement pointerEvents="none">
                            <SearchIcon color="gray.300" />
                        </InputLeftElement>
                        <Input type="search" placeholder="Поиск по ФИО" />
                    </InputGroup>
                </Flex>
                {isLoading && (
                    <Center>
                        <Spinner />
                    </Center>
                )}

                <Box borderWidth="1px" borderRadius="10" boxShadow="sm">
                    <OrderedList>
                        {teachers &&
                            teachers.length &&
                            teachers.map((t) => (
                                <ListItem key={t._id} p={2} ml={5}>
                                    <Link href={`users/${t._id}`}>
                                        {t.fullname}
                                    </Link>
                                </ListItem>
                            ))}
                    </OrderedList>
                </Box>
            </div>
        )
    }
    return <Navigate to="404" />
}
