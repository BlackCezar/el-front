import React from 'react'
import {Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Button, FormControl, FormLabel, Select} from '@chakra-ui/react'

export default function AddGrade({isOpen, onClose, object, setObject, action, lessons, students}) {
    const isDisabled = React.useMemo(() => {
        let isEmpty = false
        if (object.student === '') isEmpty = true
        if (object.lesson === '') isEmpty = true
        if (object.number === '') isEmpty = true
        return isEmpty
    }, [object])
    return (<Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
                   
            <ModalHeader> {object._id ? 'Изменить оценку' : 'Добавить оценку'} </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <FormControl as='fieldset' mb={3}>
                    <FormLabel as='legend'>Оценка</FormLabel>
                    <Input id="number" value={object.number} onChange={ev => setObject({...object, number: ev.target.value})} />
                </FormControl>
                <FormControl as='fieldset' mb={3}>
                    <FormLabel as='legend'>Ученик</FormLabel>
                    <Select placeholder='Выберите ученика' id="student" value={object.student} onChange={ev => setObject({...object, student: ev.target.value})}>
                        {students && students.map(t => <option value={t._id} key={t._id}>{t.fullname}</option >)}
                    </Select>
                </FormControl>
                <FormControl as='fieldset' mb={3}>
                    <FormLabel as='legend'>Урок</FormLabel>
                    <Select placeholder='Выберите урок' id="lesson" value={object.lesson} onChange={ev => setObject({...object, lesson: ev.target.value})}>
                        {lessons && lessons.map(t => <option value={t._id} key={t._id}>{t.subject} - {t.date}</option >)}
                    </Select>
                </FormControl>
            </ModalBody>

            <ModalFooter>
                <Button onClick={onClose} variant='ghost'>Отмена</Button>
                <Button disabled={isDisabled} onClick={() => {
                    if (object._id) action({
                        data: object,
                        id: object._id
                    }); 
                        else action({
                            ...object,
                            date: lessons.find(l => l._id === object.lesson).date
                        }); 
                    onClose()}} colorScheme='telegram' mr={3}>
                    {object._id ? 'Сохранить' : 'Добавить'}
                </Button>
            </ModalFooter>
        </ModalContent>
    </Modal>)
}