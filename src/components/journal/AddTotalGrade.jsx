import React from 'react'
import {
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Button,
    FormControl,
    FormLabel,
    Select
} from '@chakra-ui/react'

export default function AddGrade({
    isOpen,
    onClose,
    object,
    setObject,
    subject,
    action,
    students
}) {
    const isDisabled = React.useMemo(() => {
        let isEmpty = false
        if (object.student === '') isEmpty = true
        if (object.number === '') isEmpty = true
        if (object.date === '') isEmpty = true
        return isEmpty
    }, [object])
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    {' '}
                    {object._id
                        ? 'Изменить оценку'
                        : 'Добавить итоговую оценку'}{' '}
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl as="fieldset" mb={3}>
                        <FormLabel as="legend">Оценка</FormLabel>
                        <Input
                            id="number"
                            max="5"
                            value={object.number}
                            onChange={(ev) =>
                                setObject({
                                    ...object,
                                    number: ev.target.value
                                })
                            }
                        />
                    </FormControl>
                    <FormControl as="fieldset" mb={3}>
                        <FormLabel as="legend">Ученик</FormLabel>
                        <Select
                            placeholder="Выберите ученика"
                            id="student"
                            value={object.student}
                            onChange={(ev) =>
                                setObject({
                                    ...object,
                                    student: ev.target.value
                                })
                            }
                        >
                            {students &&
                                students.map((t) => (
                                    <option value={t._id} key={t._id}>
                                        {t.fullname}
                                    </option>
                                ))}
                        </Select>
                    </FormControl>
                    <FormControl as="fieldset" mb={3}>
                        <FormLabel as="legend">Полугодие</FormLabel>
                        <Select
                            placeholder="Выберите полугодие"
                            id="lesson"
                            value={object.date}
                            onChange={(ev) =>
                                setObject({ ...object, date: ev.target.value })
                            }
                        >
                            <option value="1">1 полугодие</option>
                            <option value="2">2 полугодие</option>
                            <option value="3">Итоговая</option>
                        </Select>
                    </FormControl>
                </ModalBody>

                <ModalFooter>
                    <Button onClick={onClose} variant="ghost">
                        Отмена
                    </Button>
                    <Button
                        disabled={isDisabled}
                        onClick={() => {
                            if (object._id)
                                action({
                                    data: object,
                                    id: object._id
                                })
                            else
                                action({
                                    ...object,
                                    subject
                                })
                            onClose()
                        }}
                        colorScheme="telegram"
                        mr={3}
                    >
                        {object._id ? 'Сохранить' : 'Добавить'}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
