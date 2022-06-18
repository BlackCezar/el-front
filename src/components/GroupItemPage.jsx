import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import {
    Box,
    Button,
    Flex,
    Heading,
    IconButton,
    Link,
    ListItem,
    OrderedList,
    Spinner,
    Text,
    useDisclosure
} from '@chakra-ui/react'
import React from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { useGetGroupQuery } from '../store/services/GroupsService'
import SetTeacherModal from './groups/SetTeacherModal'
import AddStudentModal from './groups/AddStudentModal'

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
                    <Button ml={3} onClick={teacherOpenModal}>Назначить</Button>
                </Flex>
            </Box>

            <Box
                mt={3}
                mb={3}
                borderWidth="1px"
                borderRadius="10"
                boxShadow="sm"
            >
                <OrderedList>
                    {group.students &&
                        group.students.length &&
                        group.students.map((user) => (
                            <ListItem p={2} ml={5} key={user._id}>
                                <Link href={`/users/${user._id}`}>
                                    <NavLink to={`/users/${user._id}`}>
                                        {user.fullname}
                                    </NavLink>
                                </Link>
                            </ListItem>
                        ))}
                </OrderedList>
            </Box>

            <SetTeacherModal
                group={group}
                isOpen={isTeacherOpen}
                onClose={teacherCloseModal}
            />
            <AddStudentModal
                group={group}
                isOpen={isStudentOpen}
                onClose={studentCloseModal}
            />
        </div>
    )
}
