import {
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Select,
    Button,
    ModalFooter,
    useToast
} from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useGetGroupsQuery } from '../../store/services/GroupsService'
import {
    useCreateUserMutation,
    useGetUsersQuery,
    useUpdateUserMutation
} from '../../store/services/UserService'

export default function UserModal({ isOpen, onClose, data, handler, user }) {
    const { data: groups } = useGetGroupsQuery()
    const [
        createUser,
        { isSuccess, isError, error, isUninitialized, isLoading }
    ] = useCreateUserMutation()
    const [
        updateUser,
        {
            isSuccess: updateIsSuccess,
            isError: updateIsError,
            error: updateError,
            isLoading: isUpdateLoading,
            isUninitialized: updateIsUninitialized
        }
    ] = useUpdateUserMutation()
    const { data: parents } = useGetUsersQuery({
        role: 'Parent'
    })
    const toast = useToast()

    const createOrUpdateUser = () => {
        if (user) {
            updateUser({
                data: {
                    ...user,
                    ...data
                },
                id: user._id
            })
        } else {
            createUser(data)
        }
    }
    useEffect(() => {
        if (isSuccess && !isUninitialized) {
            toast({
                title: 'Успешно',
                status: 'success',
                duration: 3000,
                isClosable: true
            })
            onClose()
        } else if (isError && !isUninitialized) {
            toast({
                title: 'Ошибка',
                description: String(error.data).toString(),
                status: 'error',
                duration: 3000,
                isClosable: true
            })
        }
        if (updateIsSuccess && !updateIsUninitialized) {
            toast({
                title: 'Успешное обновление',
                status: 'success',
                duration: 3000,
                isClosable: true
            })
            onClose()
        } else if (updateIsError && !updateIsUninitialized) {
            toast({
                title: 'Ошибка обновления',
                description: updateError,
                status: 'error',
                duration: 3000,
                isClosable: true
            })
        }
    }, [
        isSuccess,
        isError,
        isUninitialized,
        error,
        updateError,
        updateIsError,
        updateIsUninitialized,
        updateIsSuccess
    ])

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Добавление пользователя</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <form>
                        <FormControl isRequired mb={2}>
                            <FormLabel htmlFor="fullname">ФИО</FormLabel>
                            <Input
                                id="fullname"
                                value={data.fullname}
                                onChange={(val) => handler('fullname', val)}
                                placeholder="Иванов Иван"
                            />
                        </FormControl>
                        <FormControl isRequired mb={2}>
                            <FormLabel htmlFor="login">Логин</FormLabel>
                            <Input
                                id="login"
                                value={data.login}
                                onChange={(val) => handler('login', val)}
                            />
                        </FormControl>
                        {!user && (
                            <FormControl isRequired mb={2}>
                                <FormLabel htmlFor="password">Пароль</FormLabel>
                                <Input
                                    id="password"
                                    type="password"
                                    value={data.password}
                                    onChange={(val) => handler('password', val)}
                                />
                            </FormControl>
                        )}
                        {!user && (
                            <FormControl isRequired mb={2}>
                                <FormLabel htmlFor="rep_pass">
                                    Повторите пароль
                                </FormLabel>
                                <Input
                                    id="rep_pass"
                                    type="password"
                                    value={data.rePassowrd}
                                    onChange={(val) =>
                                        handler('rePassword', val)
                                    }
                                />
                            </FormControl>
                        )}
                        <FormControl isRequired mb={2}>
                            <FormLabel htmlFor="role">Роль</FormLabel>
                            <Select
                                id="role"
                                placeholder="Выберите роль"
                                value={data.role}
                                onChange={(val) => handler('role', val)}
                            >
                                <option value="Student">Ученик</option>
                                <option value="Parent">Родитель</option>
                                <option value="Teacher">Учитель</option>
                                <option value="Student">Администратор</option>
                                <option value="Deputy">Зам.</option>
                                <option value="ClassRoomTeacher">
                                    Классный руководитель
                                </option>
                            </Select>
                        </FormControl>
                        {data.role === 'Student' && (
                            <FormControl mb={2}>
                                <FormLabel htmlFor="parent">Родитель</FormLabel>
                                <Select
                                    id="parent"
                                    placeholder="Выберите родителя"
                                    value={data.parent}
                                    onChange={(val) => handler('parent', val)}
                                >
                                    {parents && parents.length ? (
                                        parents.map((p) => (
                                            <option key={p._id} value={p._id}>
                                                {p.fullname}
                                            </option>
                                        ))
                                    ) : (
                                        <option disabled>Нет родителей</option>
                                    )}
                                </Select>
                            </FormControl>
                        )}
                        {data.role === 'Student' && (
                            <FormControl mb={2}>
                                <FormLabel htmlFor="group">Класс</FormLabel>
                                <Select
                                    id="group"
                                    placeholder="Выберите класс"
                                    value={data.group}
                                    onChange={(val) => handler('group', val)}
                                >
                                    {groups && groups.length ? (
                                        groups.map((g) => (
                                            <option key={g._id} value={g._id}>
                                                {g.name}
                                            </option>
                                        ))
                                    ) : (
                                        <option disabled>Нет класса</option>
                                    )}
                                </Select>
                            </FormControl>
                        )}
                        <FormControl mb={2}>
                            <FormLabel htmlFor="phone">
                                Номер телефона
                            </FormLabel>
                            <Input
                                id="phone"
                                placeholder="+7 999 999 9999"
                                value={data.phone}
                                type="tel"
                                onChange={(val) => handler('phone', val)}
                            />
                        </FormControl>
                        <FormControl mb={2}>
                            <FormLabel htmlFor="address">Адрес</FormLabel>
                            <Input
                                id="address"
                                placeholder="ул. Ленина, д. 5, кв. 22"
                                value={data.address}
                                onChange={(val) => handler('address', val)}
                            />
                        </FormControl>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                        Закрыть
                    </Button>
                    <Button
                        onClick={createOrUpdateUser}
                        disabled={isLoading || isUpdateLoading}
                        colorScheme="green"
                    >
                        Сохранить
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
