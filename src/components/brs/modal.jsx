import React from 'react'
import {
    Button,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Select
    // useToast
} from '@chakra-ui/react'
// import { useUpdateGroupMutation } from '../../store/services/GroupsService'
// import { useGetUsersQuery } from '../../store/services/UserService'

export default function BRSModal({ isOpen, onClose }) {
    //  фвццф   const toast = useToast()

    // const [updateGroup, { isSuccess, isError, isUninitialized, error }] =
    // useUpdateGroupMutation()

    // useEffect(() => {
    //     if (isSuccess && !isUninitialized) {
    //         toast({
    //             title: 'Успешно',
    //             status: 'success',
    //             duration: 3000,
    //             isClosable: true
    //         })
    //     } else if (isError && !isUninitialized) {
    //         toast({
    //             title: 'Ошибка',
    //             description: error,
    //             status: 'error',
    //             duration: 3000,
    //             isClosable: true
    //         })
    //     }
    // }, [isSuccess, isError])

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Добавить запись о конкурсе</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <FormControl>
                        <FormLabel>Название</FormLabel>
                        <Input id="name" />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Значение</FormLabel>
                        <Input id="amount" type="number" />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Выберите из списка</FormLabel>
                        <Select
                        // value={setTch}
                        // onChange={(ev) => setTch(ev.target.value)}
                        >
                            <option value="Region">Региональный</option>
                            <option value="Country">Межрегиональный</option>
                            <option value="World">Международный</option>
                            <option value="Other">Другие</option>
                        </Select>
                    </FormControl>
                </ModalBody>

                <ModalFooter>
                    <Button
                        colorScheme="telegram"
                        mr={3}
                        onClick={() => {
                            // updateGroup({
                            //     data: { boss: tch },
                            //     id: group._id
                            // })
                            onClose()
                        }}
                    >
                        Назначить
                    </Button>
                    <Button onClick={onClose}>Отмена</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
