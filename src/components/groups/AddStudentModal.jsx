import React, { useEffect, useState } from 'react'
import {
    Button,
    FormControl,
    FormLabel,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Select,
    useToast
} from '@chakra-ui/react'
import { useUpdateGroupMutation } from '../../store/services/GroupsService'
import { useGetUsersQuery } from '../../store/services/UserService'

export default function AddStudentModal({ isOpen, onClose, group }) {
    const { data: students } = useGetUsersQuery({
        role: 'Student'
    })
    const [tch, setTch] = useState('')
    const toast = useToast()

    const [updateGroup, { isSuccess, isError, isUninitialized, error }] =
        useUpdateGroupMutation()

    useEffect(() => {
        if (isSuccess && !isUninitialized) {
            toast({
                title: 'Успешно',
                status: 'success',
                duration: 3000,
                isClosable: true
            })
        } else if (isError && !isUninitialized) {
            toast({
                title: 'Ошибка',
                description: error,
                status: 'error',
                duration: 3000,
                isClosable: true
            })
        }
    }, [isSuccess, isError])

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Добавить ученика</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <FormControl>
                        <FormLabel>Выберите из списка</FormLabel>
                        <Select
                            value={tch}
                            onChange={(ev) => {
                                setTch(ev.target.value)
                            }}
                        >
                            {students &&
                                students.length &&
                                students.map((t) => (
                                    <option key={t._id} value={t._id}>
                                        {t.fullname}
                                    </option>
                                ))}
                        </Select>
                    </FormControl>
                </ModalBody>

                <ModalFooter>
                    <Button
                        colorScheme="telegram"
                        mr={3}
                        onClick={() => {
                            console.log(tch)
                            updateGroup({
                                data: { students: [...group.students, tch] },
                                id: group._id
                            })
                            onClose()
                        }}
                    >
                        Добавить
                    </Button>
                    <Button onClick={onClose}>Отмена</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
