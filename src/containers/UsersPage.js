import {
    Badge,
    Box,
    Button,
    Center,
    IconButton,
    Spinner,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    useDisclosure
} from '@chakra-ui/react'
import { Navigate } from 'react-router-dom'
import React, { useState } from 'react'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { useSelector } from 'react-redux'
import {
    useLazyDeleteUsersQuery,
    useGetUsersQuery
} from '../store/services/UserService'
import UserModal from '../components/users/UserModal'

export default function UsersPage() {
    const { data: users, isLoading, refetch: usersRefetch } = useGetUsersQuery()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [deleteUser] = useLazyDeleteUsersQuery()
    const [selectedUser, selectUser] = useState(null)
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
        parent: null
    })

    const handleUserForm = (prop, val) => {
        val = val.target.value

        const newVal = {
            ...userFrom
        }
        newVal[prop] = val
        setUserForm(newVal)
    }

    const user = useSelector((state) => state.user.object)

    if (user && user.role && ['Admin'].includes(user.role)) {
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
                                            <Tr key={u._id}>
                                                <Td>{u.fullname}</Td>
                                                <Td>{u.login}</Td>
                                                <Td>{u.phone}</Td>
                                                <Td>
                                                    {u.role === 'Admin' && (
                                                        <Badge>
                                                            Администратор
                                                        </Badge>
                                                    )}
                                                    {u.role === 'Student' && (
                                                        <Badge>Ученик</Badge>
                                                    )}
                                                    {u.role === 'Teacher' && (
                                                        <Badge>Учитель</Badge>
                                                    )}
                                                    {u.role ===
                                                        'ClassRoomTeacher' && (
                                                        <Badge>
                                                            Классный рук.
                                                        </Badge>
                                                    )}
                                                    {u.role === 'Deputy' && (
                                                        <Badge>Зам.</Badge>
                                                    )}
                                                    {u.role === 'Parent' && (
                                                        <Badge>Родитель</Badge>
                                                    )}
                                                </Td>
                                                <Td>
                                                    {u.group && u.group.name}
                                                </Td>
                                                <Td>
                                                    {u.parent &&
                                                        u.parent.fullname}
                                                </Td>
                                                <Td>
                                                    <IconButton
                                                        onClick={() => {
                                                            selectUser(u)
                                                            setUserForm({
                                                                ...u
                                                            })
                                                            onOpen()
                                                        }}
                                                        mr="2"
                                                        colorScheme="yellow"
                                                        icon={<EditIcon />}
                                                        aria-label="Edit"
                                                    />
                                                    <IconButton
                                                        onClick={async () => {
                                                            await deleteUser(
                                                                u._id
                                                            )
                                                            usersRefetch()
                                                        }}
                                                        colorScheme="red"
                                                        icon={<DeleteIcon />}
                                                        aria-label="Delete"
                                                    />
                                                </Td>
                                            </Tr>
                                        ))}
                                </Tbody>
                            </Table>
                        </TableContainer>
                    )}

                    <Center m="2">
                        <Button
                            onClick={() => {
                                selectUser(null)
                                onOpen()
                            }}
                            colorScheme="telegram"
                        >
                            Добавить пользователя
                        </Button>
                    </Center>

                    <UserModal
                        isOpen={isOpen}
                        onClose={onClose}
                        user={selectedUser}
                        handler={handleUserForm}
                        data={userFrom}
                    />
                </Box>
            </div>
        )
    }
    return <Navigate to="404" />
}
