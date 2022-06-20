import React, { useCallback } from 'react'
import {
    Box,
    Divider,
    Heading,
    Table,
    Tr,
    Text,
    Spinner,
    Th,
    Thead,
    TableContainer,
    Center,
    HStack
} from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { useLazyGetLessonsQuery } from '../../store/services/LessonsService'
import RenderLessonRow from './renderLessonRow'
import { useGetUsersQuery } from '../../store/services/UserService'
import { useLazyGetGroupsQuery } from '../../store/services/GroupsService'

function getNameOfDay(i) {
    let day = ''
    switch (i) {
        case 0:
            day = 'Понедельник'
            break
        case 1:
            day = 'Вторник'
            break
        case 2:
            day = 'Среда'
            break
        case 3:
            day = 'Четверг'
            break
        case 4:
            day = 'Пятница'
            break
        case 5:
            day = 'Суббота'
            break
        default:
            day = ''
    }
    return day
}

export default function DashboardParent() {
    const user = useSelector((state) => state.user.object)
    const { data: child, isSuccess } = useGetUsersQuery({ parent: user._id })
    const [getGroup, { data: group }] = useLazyGetGroupsQuery()
    const [getLessons, { data: lessons, isLoading }] = useLazyGetLessonsQuery()

    React.useEffect(() => {
        if (child && child.length && isSuccess && group && group.length) {
            getLessons({ group: group[0]._id })
        } else if (child && child.length && isSuccess) {
            getGroup({ students: child[0]._id })
        }
    }, [user])
    const weekStart = React.useMemo(() => {
        const date = new Date()
        const today = date.getDate()
        const dayOfTheWeek = date.getDay()
        const newDate = date.setDate(today - dayOfTheWeek)
        return new Date(newDate)
    }, [])

    const renderBox = useCallback(
        (d, i) => {
            const newD = new Date(d.getTime())
            newD.setDate(newD.getDate() + i)
            const list = lessons
                ? lessons.filter(
                      (l) => l.date === newD.toLocaleDateString('ru-RU')
                  )
                : []
            return (
                <Box
                    key={i}
                    className="dayOfWeek"
                    borderWidth="1px"
                    boxShadow="base"
                    borderColor="blue"
                    w="100%"
                >
                    <Heading fontSize="1xl" p={4}>
                        {getNameOfDay(i)}
                    </Heading>
                    <Divider />
                    <TableContainer>
                        <Table size="sm">
                            <Thead>
                                <Tr>
                                    <Th>Время</Th>
                                    <Th>Дисциалина</Th>
                                    <Th>Аудитория</Th>
                                </Tr>
                            </Thead>
                            <RenderLessonRow list={list} />
                        </Table>
                    </TableContainer>
                </Box>
            )
        },
        [weekStart, lessons]
    )

    if (isLoading) {
        return (
            <Center>
                <Spinner />
            </Center>
        )
    }
    if (isSuccess && child && child.length) {
        return (
            <div>
                <Heading textAlign="center" mb={4} fontSize="2xl">
                    Расписание ученика {child ? child[0].fullname : ''}
                </Heading>
                <HStack spacing={4} mb={4}>
                    {weekStart && renderBox(weekStart, 0)}
                    {weekStart && renderBox(weekStart, 1)}
                    {weekStart && renderBox(weekStart, 2)}
                </HStack>
                <HStack spacing={4} mb={4}>
                    {weekStart && renderBox(weekStart, 3)}
                    {weekStart && renderBox(weekStart, 4)}
                    {weekStart && renderBox(weekStart, 5)}
                </HStack>
            </div>
        )
    }
    return (
        <Text>У вас не указан ребенок, свяжитесь с заместителем директора</Text>
    )
}
