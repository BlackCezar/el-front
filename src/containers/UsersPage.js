import {
    Box,
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Spinner,
    Stack,
    Table,
    TableCaption,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    useDisclosure
} from '@chakra-ui/react'
import React from 'react'
import { useGetUsersQuery } from '../store/services/UserService'

export default function UsersPage() {
    const { data, isLoading } = useGetUsersQuery()
    const users = data && data.array ? data.array : []
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <div>
            <Box borderWidth="1px" borderRadius="10" boxShadow="sm">
                {isLoading ? (
                    <Spinner size="xs" />
                ) : (
                    <TableContainer>
                        <Table variant="simple">
                            <TableCaption>Таблица учетных записей</TableCaption>
                            <Thead>
                                <Tr>
                                    <Th>Имя</Th>
                                    <Th>Логин</Th>
                                    <Th>Телефон</Th>
                                    <Th>Роль</Th>
                                    <Th>Класс</Th>
                                    <Th>ФИО ребенка / родителя</Th>
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
                                                    'Администратор'}
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
                                        </Tr>
                                    ))}
                            </Tbody>
                        </Table>
                    </TableContainer>
                )}

                <Stack>
                    <Button onClick={onOpen}>Open Modal</Button>

                    <Modal isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Modal Title</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>Heeey</ModalBody>

                            <ModalFooter>
                                <Button
                                    colorScheme="blue"
                                    mr={3}
                                    onClick={onClose}
                                >
                                    Close
                                </Button>
                                <Button variant="ghost">
                                    Secondary Action
                                </Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                </Stack>
            </Box>
        </div>
    )
}
