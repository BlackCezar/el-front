import React, { useState } from 'react'
import { Button, Input, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader } from "@chakra-ui/react";

export default function({onClose, onSubmit}) {
    const [name, setName] = useState('')
    
    return (   <ModalContent><ModalHeader>Добавить класс</ModalHeader>
    <ModalCloseButton />
    <ModalBody>
        <Input placeholder='Введите номер класса' maxLength={4} value={name} onChange={ev => setName(ev.target.value)} />
    </ModalBody>

    <ModalFooter>
      <Button variant='ghost' mr={3} onClick={onClose}>Отмена</Button>
      <Button disabled={!name || String(name).length < 2} colorScheme='telegram' onClick={() => onSubmit({name})} >
        Добавить
      </Button>
    </ModalFooter></ModalContent>)
}