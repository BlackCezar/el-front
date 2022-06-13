import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    IconButton,
    Input,
    Link,
    ListItem,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    OrderedList,
    Spinner,
    Text,
    useDisclosure
} from '@chakra-ui/react'
import React from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { useGetGroupQuery } from '../store/services/GroupsService'
import SetTeacherModal from './groups/SetTeacherModal'

export default function GroupItemPage() {
    const params = useParams()
    const navigate = useNavigate()
    const {
        isOpen: isStudentOpen,
        onOpen: studentOpenModal,
        onClose: studentCloseModal
    } = useDisclosure()
    const {
        isOpen: isTeacherOpen,
        onOpen: teacherOpenModal,
        onClose: teacherCloseModal
    } = useDisclosure()
    const { data: group, isLoading } = useGetGroupQuery(params.groupId)

    return isLoading ? (
        <Spinner />
    ) : (
        <div>
            <Heading>
                <Flex alignItems="center">
                    <IconButton
                        icon={<ArrowBackIcon />}
                        onClick={() => navigate(-1)}
                        mr={2}
                    />
                    Класс {group ? group.name : ''}
                    <Button
                        colorScheme="telegram"
                        ml="auto"
                        onClick={studentOpenModal}
                    >
                        Добавить ученика <ArrowForwardIcon ml={2} />
                    </Button>
                </Flex>
            </Heading>
            <Box mt={3} mb={3}>
                <Flex alignItems="center">
                    <Text mr={3}>Классный руководитель: </Text>

                    {group.boss ? (
                        <NavLink to={`/users/${group.boss._id}`}>
                            <Text mr={3} color="blue">
                                {group.boss.fullname}
                            </Text>
                        </NavLink>
                    ) : (
                        'Не назначено'
                    )}
                    <Button onClick={teacherOpenModal}>Назначить</Button>
                </Flex>
            </Box>

            <Box mt={3} mb={3}>
                <Flex alignItems="center">
                    <Text mr={3}>Список учеников</Text>{' '}
                </Flex>
            </Box>
            <OrderedList>
                {group.students &&
                    group.students.length &&
                    group.students.map((user) => (
                        <ListItem key={user._id}>
                            <Link href={`/users/${user._id}`}>
                                <NavLink to={`/users/${user._id}`}>
                                    {user.fullname}
                                </NavLink>
                            </Link>
                        </ListItem>
                    ))}
            </OrderedList>

            <SetTeacherModal
                group={group}
                isOpen={isTeacherOpen}
                onClose={teacherCloseModal}
            />
            <AddStudentModal
                isOpen={isStudentOpen}
                onClose={studentCloseModal}
            />
        </div>
    )
}

function AddStudentModal({ isOpen, onClose }) {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Create your account</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <FormControl>
                        <FormLabel>First name</FormLabel>
                        <Input placeholder="First name" />
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel>Last name</FormLabel>
                        <Input placeholder="Last name" />
                    </FormControl>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme="blue" mr={3}>
                        Save
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
