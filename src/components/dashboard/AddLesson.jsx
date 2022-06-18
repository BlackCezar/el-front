import React from 'react'
import {Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Button, FormControl, FormLabel, Select} from '@chakra-ui/react'
import { useGetUsersQuery } from '../../store/services/UserService'

export default function AddLesson({isOpen, onClose, object, setObject, action}) {
    const {data: teachers} = useGetUsersQuery({role: 'Teacher'})
    const isDisabled = React.useMemo(() => {
        let isEmpty = false
        if (object.group === '') isEmpty = true
        if (object.teacher === '') isEmpty = true
        if (object.subject === '') isEmpty = true
        if (object.classroom === '') isEmpty = true
        return isEmpty
    }, [object])
    return (<Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
                   
            <ModalHeader> {object._id ? 'Изменить занятие' : 'Добавить занятие'} </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <FormControl as='fieldset' mb={3}>
                    <FormLabel as='legend'>Дисциплина</FormLabel>
                    <Input id="subject" value={object.subject} onChange={ev => setObject({...object, subject: ev.target.value})} />
                </FormControl>
                <FormControl as='fieldset' mb={3}>
                    <FormLabel as='teacher'>Учитель</FormLabel>
                    <Select placeholder='Выберите учителя' id="teacher" value={object.teacher} onChange={ev => setObject({...object, teacher: ev.target.value})}>
                        {teachers && teachers.map(t => <option value={t._id} key={t._id}>{t.fullname}</option >)}
                    </Select>
                </FormControl>
                <FormControl as='fieldset' mb={3}>
                    <FormLabel as='legend'>Аудитория</FormLabel>
                    <Input id="classroom" value={object.classroom} onChange={ev => setObject({...object, classroom: ev.target.value})} />
                </FormControl>
            </ModalBody>

            <ModalFooter>
                <Button onClick={onClose} variant='ghost'>Отмена</Button>
                <Button disabled={isDisabled} onClick={() => {
                    if (object._id) action({
                        data: object,
                        id: object._id
                    }); 
                        else action(object); 
                    onClose()}} colorScheme='telegram' mr={3}>
                    {object._id ? 'Сохранить' : 'Добавить'}
                </Button>
            </ModalFooter>
        </ModalContent>
    </Modal>)
}