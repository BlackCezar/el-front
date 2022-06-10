import {
    Badge,
    Box,
    Button, Center, FormControl, FormLabel, IconButton, Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay, Select,
    Spinner,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    useDisclosure
} from "@chakra-ui/react";
import React, { useState } from "react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useDeleteUsersQuery, useGetUsersQuery } from '../store/services/UserService'

export default function UsersPage() {
    const { data, isLoading } = useGetUsersQuery()
    const users = data && data.array ? data.array : []
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [userFrom, setUserForm] = useState({
        login: '',
        password: '',
        rePassword: '',
        address: '',
        phone: '',
        fullname: '',
        role: 'Student',
        birthdate: '',
        group: null,
        parent: null,
    })

    const handleUserForm = (prop, val) => {
        val = val.target.value

        const newVal = {
            ...userFrom
        }
        newVal[prop] = val
        setUserForm(newVal)
    }

    const editModal = user => {
        setUserForm({
            login: user.login, 
            fullname: user.fullname,
            phone: user.phone,
            address: user.address,
        })
    }


    return (
        <div>
            <Box borderWidth="1px" borderRadius="10" boxShadow="sm">
                {isLoading ? (
                    <Spinner size="xs" />
                ) : (
                    <TableContainer>
                        <Table variant="simple">
                            <Thead>
                                <Tr>
                                    <Th>Имя</Th>
                                    <Th>Логин</Th>
                                    <Th>Телефон</Th>
                                    <Th>Роль</Th>
                                    <Th>Класс</Th>
                                    <Th>ФИО ребенка / родителя</Th>
                                    <Th />
                                </Tr>
                            </Thead>
                            <Tbody>
                                {users &&
                                    users.map((u) => (
                                        <Tr>
                                            <Td>{u.fullname}</Td>
                                            <Td>{u.login}</Td>
                                            <Td>{u.phone}</Td>
                                            <Td>
                                                {u.role === 'Admin' &&
                                                  <Badge>Администратор</Badge>}
                                                {u.role === 'Student' &&
                                                    'Ученик'}
                                                {u.role === 'Teacher' &&
                                                    'Учитель'}
                                                {u.role ===
                                                    'ClassRoomTeacher' &&
                                                    'Классный рук.'}
                                                {u.role === 'Deputy' && 'Зам.'}
                                                {u.role === 'Parent' &&
                                                    'Родитель'}
                                            </Td>
                                            <Td>{u.group}</Td>
                                            <Td>{u.parent}</Td>
                                            <Td>
                                                <IconButton onClick={() => editModal(u)} mr='2' colorScheme='yellow' icon={<EditIcon />} aria-label='Edit'/>
                                                <IconButton onClick={() => useDeleteUsersQuery(u._id)} colorScheme='red' icon={<DeleteIcon />} aria-label='Delete'/>
                                            </Td>
                                        </Tr>
                                    ))}
                            </Tbody>
                        </Table>
                    </TableContainer>
                )}

                    <Center m='2'><Button onClick={onOpen} colorScheme='telegram'>Добавить пользователя</Button></Center>

                    <Modal isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Добавление пользователя</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <form>
                                    <FormControl isRequired mb={2}>
                                        <FormLabel htmlFor='fullname'>ФИО</FormLabel>
                                        <Input id='fullname' value={userFrom.fullname} onChange={val => handleUserForm('fullname', val)} placeholder='Иванов Иван' />
                                    </FormControl>
                                    <FormControl isRequired mb={2}>
                                        <FormLabel htmlFor='login'>Логин</FormLabel>
                                        <Input id='login' value={userFrom.login} onChange={val => handleUserForm('login', val)} />
                                    </FormControl>
                                    <FormControl isRequired mb={2}>
                                        <FormLabel htmlFor='password'>Пароль</FormLabel>
                                        <Input id='password' type='password' value={userFrom.password} onChange={val => handleUserForm('password', val)}/>
                                    </FormControl>
                                    <FormControl isRequired mb={2}>
                                        <FormLabel htmlFor='rep_pass'>Повторите пароль</FormLabel>
                                        <Input id='rep_pass' type='password' value={userFrom.rePassowrd} onChange={val => handleUserForm('rePassword', val)}/>
                                    </FormControl>
                                    <FormControl isRequired mb={2}>
                                        <FormLabel htmlFor='role'>Роль</FormLabel>
                                        <Select id='role' placeholder='Выберите роль' value={userFrom.role} onChange={val => handleUserForm('role', val)}>
                                            <option value="Student">Ученик</option>
                                            <option value="Parent">Родитель</option>
                                            <option value="Teacher">Учитель</option>
                                            <option value="Student">Администратор</option>
                                            <option value="Deputy">Зам.</option>
                                            <option value="ClassRoomTeacher">Классный руководитель</option>
                                        </Select>
                                    </FormControl>
                                    <FormControl mb={2}>
                                        <FormLabel htmlFor='parent'>Родитель</FormLabel>
                                        <Select id='parent' placeholder='Выберите родителя' value={userFrom.parent} onChange={val => handleUserForm('parent', val)}>
                                            <option>United Arab Emirates</option>
                                            <option>Nigeria</option>
                                        </Select>
                                    </FormControl>
                                    <FormControl mb={2}>
                                        <FormLabel htmlFor='group'>Группа</FormLabel>
                                        <Select id='group' placeholder='Выберите группу' value={userFrom.group} onChange={val => handleUserForm('group', val)}>
                                            <option>United Arab Emirates</option>
                                            <option>Nigeria</option>
                                        </Select>
                                    </FormControl>
                                    <FormControl mb={2}>
                                        <FormLabel htmlFor='phone'>Номер телефона</FormLabel>
                                        <Input id='phone' placeholder='+7 999 999 9999' value={userFrom.phone} onChange={val => handleUserForm('phone', val)} />
                                    </FormControl>
                                    <FormControl mb={2}>
                                        <FormLabel htmlFor='address'>Адрес</FormLabel>
                                        <Input id='address' placeholder='ул. Ленина, д. 5, кв. 22' value={userFrom.address} onChange={val => handleUserForm('address', val)} />
                                    </FormControl>
                                </form>
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    colorScheme="blue"
                                    mr={3}
                                    onClick={onClose}
                                >
                                    Закрыть
                                </Button>
                                <Button colorScheme='green'>
                                    Добавить
                                </Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
            </Box>
        </div>
    )
}
