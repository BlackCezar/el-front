import React, {useCallback, useEffect, useMemo} from 'react'
import { Button, Center, Flex, Heading, IconButton, LinkBox, Modal, ModalOverlay, Spinner, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useDisclosure, useToast} from "@chakra-ui/react";
import {NavLink} from "react-router-dom";
import { ArrowForwardIcon, DeleteIcon } from '@chakra-ui/icons';
import { useCreateGroupMutation, useGetGroupsQuery } from '../store/services/GroupsService';
import GroupsContent from '../components/groupsModalContent'

export default function GroupsPage() {
    const GroupsReq = useGetGroupsQuery()
    const [createGroup, createGroupData] = useCreateGroupMutation()
    const toast = useToast()
    const groups = useMemo(() => {
        console.log(GroupsReq.data)
        if (GroupsReq.data && GroupsReq.isSuccess) {
            return GroupsReq.data.array
        }
    }, [GroupsReq])
    const { isOpen, onOpen, onClose } = useDisclosure()

    useEffect(() => {
        if (createGroupData.isError && createGroupData.error) {
            toast({
                title: 'Account created.',
                description: createGroupData.error,
                status: 'error',
                duration: 3000,
                isClosable: true,
              })
        } else if (createGroupData.isSuccess && createGroupData.data.code === 0) {
            onClose()
            GroupsReq.refetch()
        }
    }, [createGroupData.error, createGroupData.isSuccess])

    const renderGroups = useCallback(groupsList => {
        return groupsList.map(group => (<Tr>
            <Td>
                <LinkBox className='link-group' key="group._id"><NavLink to={'/groups/' + group._id}>{group.name}</NavLink></LinkBox>
            </Td>
            <Td>
                <IconButton icon={<DeleteIcon />} colorScheme='red' mr={2} />
                <IconButton icon={<ArrowForwardIcon />} colorScheme='telegram' mr={2} />
                <Button ml={2} colorScheme='facebook' variant='ghost'>Перевести на след. класс</Button>
            </Td>
        </Tr>
        ))
    }, [groups])


    return <div>
        <Flex justifyContent='space-between'> 
            <Heading mb={2}>Список классов</Heading>
            <Button ml={2} colorScheme='green' onClick={onOpen}>Добавить класс</Button>
        </Flex>
        {GroupsReq.isLoading && <Center>
            <Spinner />
        </Center>}

<TableContainer>
<Table variant='simple' colorScheme='telegram'>
    <Thead>
        <Tr>
            <Th>Номер класса</Th><Th>Действия</Th>
        </Tr>
    </Thead>
    <Tbody>
        {groups && groups.length ? renderGroups(groups) : <Tr><Td><Text>Нет классов</Text></Td></Tr>}
    </Tbody>
    </Table>
</TableContainer>
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
            <GroupsContent onSubmit={createGroup} onClose={onClose} />
      </Modal>
    </div>
}
