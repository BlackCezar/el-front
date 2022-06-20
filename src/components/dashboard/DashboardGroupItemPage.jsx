import { ArrowBackIcon, ArrowForwardIcon, DeleteIcon, EditIcon, PlusSquareIcon } from "@chakra-ui/icons"
import { Box, Center, Divider, Flex, Heading, IconButton, Spinner, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useDisclosure, VStack } from "@chakra-ui/react"
import React, { useState, useMemo } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useGetGroupQuery } from "../../store/services/GroupsService"
import { useCreateLessonMutation, useGetLessonsQuery, useLazyDeleteLessonQuery, useUpdateLessonMutation } from "../../store/services/LessonsService"
import AddLesson from "./AddLesson"


function getNameOfDay(i) {
    let day = ''
    switch (i) {
        case 0: day = 'Понедельник'; break;
        case 1: day = 'Вторник'; break;
        case 2: day = 'Среда'; break;
        case 3: day = 'Четверг'; break;
        case 4: day = 'Пятница'; break;
        case 5: day = 'Суббота'; break;
        default: day = '';
    }
    return day
}

export default function DashboardDeputy() {
    const navigate = useNavigate()
    const { groupId } = useParams()
    const { data: group } = useGetGroupQuery(groupId)
    const [create, { isLoading }] = useCreateLessonMutation()
    const [removeLesson] = useLazyDeleteLessonQuery()
    const [update] = useUpdateLessonMutation()
    const { data: lessons, refetch } = useGetLessonsQuery({ group: groupId })
    const currentDate = new Date()
    

    const [weekStart, setWeekStart] = useState(currentDate.getDate() - currentDate.getDay() + 1)
    const backWeek = () => {
        currentDate.setDate(weekStart - 7)
        setWeekStart(currentDate.getDate() - currentDate.getDay() + 1)
    }
    const forwardWeek = () => {
        currentDate.setDate(weekStart + 7)
        setWeekStart(currentDate.getDate() - currentDate.getDay() + 1)
    }
    const days = useMemo(() => {
        const dayList = []
            for (let i = weekStart; i < 6 + weekStart; i += 1) {
                const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i)
                dayList.push({
                    id: i,
                    lessons: lessons ? lessons.filter(l => l.date === date.toLocaleDateString('ru-RU')) : []
                })
            }
        return dayList
    }, [lessons, weekStart])
    const weekEndDate = useMemo(() => {
        const d = new Date(currentDate.getFullYear(), currentDate.getMonth(), weekStart + 5)
        return d.getDate()
    }, [weekStart])
    const { isOpen, onOpen, onClose } = useDisclosure()
    const createLesson = async (data) => {
        await create(data)
        refetch()
    }
    const updateLesson = async (data) => {
        await update(data)
        refetch()
    }
    const initialLesson = {
        date: '',
        subject: '',
        topic: '',
        homework: '',
        teacher: '',
        group: '',
        order: 0,
        classroom: '',
    }
    const [selectedLesson, setSelectedLesson] = React.useState(initialLesson)
    const addNewLesson = (day, order) => {
        onOpen()
      
        const d = new Date(currentDate.getFullYear(), currentDate.getMonth(), weekStart)
        d.setDate(weekStart + day)
        setSelectedLesson({
            ...initialLesson,
            date: d.toLocaleDateString('ru-RU'),
            order,
            group: groupId
        })
    }

    const renderLessonRow = React.useCallback((index, list) => {
        const firstLesson = list.find(l => l.order === 0)
        const secondLesson = list.find(l => l.order === 1)
        const thirdLesson = list.find(l => l.order === 2)
        const fourLesson = list.find(l => l.order === 3)
        const fiveLesson = list.find(l => l.order === 4)
        const sixLesson = list.find(l => l.order === 5)

        return (<Tbody>
            <Tr>
                <Td>8:00-8:45</Td>
                <Td>{firstLesson && firstLesson.subject}</Td>
                <Td>{firstLesson && firstLesson.teacher && firstLesson.teacher.fullname}</Td>
                <Td>{firstLesson && firstLesson.classroom}</Td>
                {firstLesson ? <Td>
                    <IconButton onClick={() => { setSelectedLesson(firstLesson); onOpen() }} mr={3} icon={<EditIcon />} colorScheme='yellow' />
                    <IconButton onClick={async () => {await removeLesson(firstLesson._id); refetch()}} icon={<DeleteIcon />} colorScheme='red' />
                </Td> : <Td>
                    <IconButton onClick={() => {
                        addNewLesson(index, 0)
                    }} icon={<PlusSquareIcon />} colorScheme='green' />
                </Td>}
            </Tr>
            <Tr>
                <Td>8:55-9:30</Td>
                <Td>{secondLesson && secondLesson.subject}</Td>
                <Td>{secondLesson && secondLesson.teacher && secondLesson.teacher.fullname}</Td>
                <Td>{secondLesson && secondLesson.classroom}</Td>
                {secondLesson ? <Td>
                    <IconButton onClick={() => { setSelectedLesson(secondLesson); onOpen() }} mr={3} icon={<EditIcon />} colorScheme='yellow' />
                    <IconButton onClick={async () => {await removeLesson(secondLesson._id); refetch()}} icon={<DeleteIcon />} colorScheme='red' />
                </Td> : <Td>
                    <IconButton onClick={() => {
                        addNewLesson(index, 1)
                    }} icon={<PlusSquareIcon />} colorScheme='green' />
                </Td>}
            </Tr>
            <Tr>
                <Td>9:40-10:25</Td>
                <Td>{thirdLesson && thirdLesson.subject}</Td>
                <Td>{thirdLesson && thirdLesson.teacher && thirdLesson.teacher.fullname}</Td>
                <Td>{thirdLesson && thirdLesson.classroom}</Td>
                {thirdLesson ? <Td>
                    <IconButton onClick={() => { setSelectedLesson(thirdLesson); onOpen() }} mr={3} icon={<EditIcon />} colorScheme='yellow' />
                    <IconButton onClick={async () => {await removeLesson(thirdLesson._id); refetch()}} icon={<DeleteIcon />} colorScheme='red' />
                </Td> : <Td>
                    <IconButton onClick={() => {
                        addNewLesson(index, 2)
                    }} icon={<PlusSquareIcon />} colorScheme='green' />
                </Td>}
            </Tr>
            <Tr>
                <Td>10:30-11:15</Td>
                <Td>{fourLesson && fourLesson.subject}</Td>
                <Td>{fourLesson && fourLesson.teacher && fourLesson.teacher.fullname}</Td>
                <Td>{fourLesson && fourLesson.classroom}</Td>
                {fourLesson ? <Td>
                    <IconButton onClick={() => { setSelectedLesson(fourLesson); onOpen() }} mr={3} icon={<EditIcon />} colorScheme='yellow' />
                    <IconButton onClick={async () => {await removeLesson(fourLesson._id); refetch()}} icon={<DeleteIcon />} colorScheme='red' />
                </Td> : <Td>
                    <IconButton onClick={() => {
                        addNewLesson(index, 3)
                    }} icon={<PlusSquareIcon />} colorScheme='green' />
                </Td>}
            </Tr>
            <Tr>
                <Td>11:25-12:10</Td>
                <Td>{fiveLesson && fiveLesson.subject}</Td>
                <Td>{fiveLesson && fiveLesson.teacher && fiveLesson.teacher.fullname}</Td>
                <Td>{fiveLesson && fiveLesson.classroom}</Td>
                {fiveLesson ? <Td>
                    <IconButton onClick={() => { setSelectedLesson(fiveLesson); onOpen() }} mr={3} icon={<EditIcon />} colorScheme='yellow' />
                    <IconButton onClick={async () => {await removeLesson(fiveLesson._id); refetch()}} icon={<DeleteIcon />} colorScheme='red' />
                </Td> : <Td>
                    <IconButton onClick={() => {
                        addNewLesson(index, 4)
                    }} icon={<PlusSquareIcon />} colorScheme='green' />
                </Td>}
            </Tr>
            <Tr>
                <Td>12:15-13:00</Td>
                <Td>{sixLesson && sixLesson.subject}</Td>
                <Td>{sixLesson && sixLesson.teacher && sixLesson.teacher.fullname}</Td>
                <Td>{sixLesson && sixLesson.classroom}</Td>
                {sixLesson ? <Td>
                    <IconButton onClick={() => { setSelectedLesson(sixLesson); onOpen() }} mr={3} icon={<EditIcon />} colorScheme='yellow' />
                    <IconButton onClick={async () => {await removeLesson(sixLesson._id); refetch()}} icon={<DeleteIcon />} colorScheme='red' />
                </Td> : <Td>
                    <IconButton onClick={() => {
                        addNewLesson(index, 5)
                    }} icon={<PlusSquareIcon />} colorScheme='green' />
                </Td>}
            </Tr>
        </Tbody>)
    }, [lessons])

    return <div>
        <Heading>
            <Flex alignItems="center">
                <IconButton
                    icon={<ArrowBackIcon />}
                    onClick={() => navigate(-1)}
                    mr={2}
                />
                Класс {group && group.name}
            </Flex></Heading>
        <Center>
            <Box p={4} mb={4} borderWidth='1px' borderRadius='base'>
                <Text textAlign='center' mb={4}>Активная неделя</Text>
                <Flex alignItems='center' justifyContent='space-between'>
                    <IconButton onClick={() => backWeek()} icon={<ArrowBackIcon />} />
                    <Text ml={4} mr={4}>{weekStart} - {weekEndDate}</Text>
                    <IconButton onClick={() => forwardWeek()} icon={<ArrowForwardIcon />} />
                </Flex>
            </Box>
        </Center>
        {isLoading ? <Center><Spinner /></Center> :

        <VStack spacing={4}>
            {days && days.map((day, index) => <Box key={day.id} className='dayOfWeek' borderWidth="1px" boxShadow="base" borderColor='blue' w='100%'>
                <Heading fontSize='1xl' p={4}>{getNameOfDay(index)}</Heading>
                <Divider />
                    <TableContainer>
                        <Table size='sm'>
                            <Thead>
                                <Tr>
                                    <Th>Время</Th>
                                    <Th>Дисциалина</Th>
                                    <Th>Учитель</Th>
                                    <Th>Аудитория</Th>
                                    <Th />
                                </Tr>
                            </Thead>
                            {renderLessonRow(index, day.lessons)}
                        </Table>
                    </TableContainer>
            </Box>)}
        </VStack>}
        <AddLesson action={selectedLesson._id ? updateLesson : createLesson} isOpen={isOpen} onClose={onClose} setObject={setSelectedLesson} object={selectedLesson} />
    </div>
}

