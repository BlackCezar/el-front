import React from 'react'
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
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Select
    // useToast
} from '@chakra-ui/react'
// import { useUpdateGroupMutation } from '../../store/services/GroupsService'
// import { useGetUsersQuery } from '../../store/services/UserService'

export default function BRSModal({
    isOpen,
    object,
    setObject,
    action,
    group,
    onClose,
    students
}) {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Добавить запись о конкурсе</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <FormControl>
                        <FormLabel>Выберите из списка</FormLabel>
                        <Select
                            placeholder="Выберите студента"
                            value={object.student}
                            onChange={(ev) =>
                                setObject({
                                    ...object,
                                    student: ev.target.value
                                })
                            }
                        >
                            {students &&
                                students.map((student) => (
                                    <option
                                        key={object._id}
                                        value={student._id}
                                    >
                                        {student.fullname}
                                    </option>
                                ))}
                        </Select>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Значение</FormLabel>
                        <NumberInput
                            max={10}
                            min={0}
                            value={object.number}
                            onChange={(ev) =>
                                setObject({ ...object, number: ev })
                            }
                        >
                            <NumberInputField />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                    </FormControl>
                    <FormControl>
                    <Select
                            value={object.half}
                            placeholder="Выберите полугодие"
                            onChange={(ev) =>
                                setObject({ ...object, half: ev.target.value })
                            }
                        >
                            <option value="1">Первое</option>
                            <option value="2">Второе</option>
                        </Select>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Выберите из списка</FormLabel>
                        <Select
                            value={object.type}
                            placeholder="Выберите из списка"
                            onChange={(ev) =>
                                setObject({ ...object, type: ev.target.value })
                            }
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
                            object.group = group && group[0]._id
                            action(object)
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
