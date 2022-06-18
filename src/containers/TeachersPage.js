import React, { useEffect, useState } from 'react'
import {
    Box,
    Center,
    Flex,
    Heading,
    IconButton,
    Input,
    InputGroup,
    InputLeftElement,
    ListItem,
    OrderedList,
    Spinner,
    Text
} from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { Navigate, NavLink, useNavigate } from 'react-router-dom'
import { ArrowBackIcon, SearchIcon } from '@chakra-ui/icons'
import { useGetUsersQuery, useLazyGetUsersQuery } from '../store/services/UserService'

export default function GroupsPage() {
    const { data: teachers, isLoading } = useGetUsersQuery({ role: 'Teacher' })
    const navigation = useNavigate()
    const user = useSelector((state) => state.user.object)
    const [searchInput, setSearchInput] = useState('') 
    const [search, {data}] = useLazyGetUsersQuery()
    useEffect(() => {
        if (searchInput && String(searchInput).length) {
            search({
                fullname: searchInput,
                role: 'Teacher'
            })
        }
    }, [searchInput])

    if (user && user.role) {
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
                            <Input value={searchInput} onChange={ev => setSearchInput(ev.target.value)} type="search" placeholder="Поиск по ФИО" />
                        </InputGroup>
                    </Flex>
                    {isLoading && (
                        <Center>
                            <Spinner />
                        </Center>
                    )}
                    {searchInput && data ? <Box borderWidth="1px" borderRadius="10" boxShadow="sm">
                        <Text p={3}>Найдено <b>{data.length}</b> записей</Text>
                        <OrderedList>
                            {data &&
                                data.length &&
                                data.map((t) => (
                                    <ListItem key={t._id} p={2} ml={5}>
                                        <NavLink to={`/users/${t._id}`}>
                                            {t.fullname}
                                        </NavLink>
                                    </ListItem>
                                ))}
                        </OrderedList>
                    </Box> : 
                    <Box borderWidth="1px" borderRadius="10" boxShadow="sm">
                        <OrderedList>
                            {teachers &&
                                teachers.length &&
                                teachers.map((t) => (
                                    <ListItem key={t._id} p={2} ml={5}>
                                        <NavLink to={`/users/${t._id}`}>
                                            {t.fullname}
                                        </NavLink>
                                    </ListItem>
                                ))}
                        </OrderedList>
                    </Box>}
                </div>
            )
        }
        return <Navigate to="/404" />
    } 
    return <Center><Center><Spinner size='xs' /></Center></Center>
}
