import React, { useMemo } from 'react'
import {
    Box,
    Divider,
    Flex,
    List,
    ListItem,
    Text,
    OrderedList,
    StackItem,
    HStack,
    Heading,
    Center,
    Spinner
} from '@chakra-ui/react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useGetLessonsQuery } from '../store/services/LessonsService'
import JournalTeacher from '../components/journal/JournalTeacher'

export default function BRSPage() {
    const user = useSelector(state => state.user.object)
    const {data: lessons} = useGetLessonsQuery({teacher: user._id}) 
    const groupdLesson = useMemo(() => {
        const list = {}
        if (lessons) {
            lessons.forEach(l => {
                const gn = l.group.name
                if (!list[`${gn}-${l.subject}`]) list[`${gn}-${l.subject}`] = {...l.group, subject: l.subject}
            });
        } 
        return list
    }, [lessons])

    const days = useMemo(() => {
        const firstDate = new Date('1 Sept 2022')
        const daysList = []
        for (let i = 0; i < 272; i += 1) {
            const tmpDate = new Date(firstDate)
            tmpDate.setDate(firstDate.getDate() + i)
            if (tmpDate.getDay() !== 0)
                daysList.push(tmpDate.toLocaleDateString('ru-RU'))
        }
        return daysList
    }, [])


    if (user && user.role) {
        if (user.role === 'Teacher') return <JournalTeacher groupdLesson={groupdLesson} lessons={lessons} />
        if (['Student', 'Teacher', 'ClassRoomTeacher'].includes(user.role)) {
            return (
                <div>
                    <Box borderWidth="1px" borderColor="blue">
                        <Flex>
                            <Box
                                w="200px"
                                borderRight="1px solid blue"
                                boxShadow="md"
                            >
                                <Flex
                                    alignItems="center"
                                    h="110px"
                                    justifyContent="center"
                                >
                                    <Text p="5px">Предмет / дата</Text>
                                </Flex>
                                <Divider />
                                <OrderedList ml="8">
                                    <ListItem p="6px">
                                        <Text>Информатика</Text>
                                    </ListItem>
                                    <ListItem p="6px">
                                        <Text>Информатика</Text>
                                    </ListItem>
                                    <ListItem p="6px">
                                        <Text>Информатика</Text>
                                    </ListItem>
                                    <ListItem p="6px">
                                        <Text>Информатика</Text>
                                    </ListItem>
                                </OrderedList>
                            </Box>
                            <Box w="100%" className="journal-scroll">
                                {days && (
                                    <HStack spacing={0}>
                                        {days.map((day) => {
                                            return (
                                                <StackItem key={day}>
                                                    <Text
                                                        borderColor="blue"
                                                        borderWidth="1px"
                                                        className="journal-date"
                                                    >
                                                        {day}
                                                    </Text>
                                                    <List>
                                                        <ListItem>
                                                            <Text className="point">
                                                                5
                                                            </Text>
                                                            <Text className="point">
                                                                5
                                                            </Text>
                                                            <Text className="point">
                                                                5
                                                            </Text>
                                                            <Text className="point">
                                                                5
                                                            </Text>
                                                            <Text className="point">
                                                                5
                                                            </Text>
                                                            <Text className="point">
                                                                5
                                                            </Text>
                                                        </ListItem>
                                                    </List>
                                                </StackItem>
                                            )
                                        })}
                                    </HStack>
                                )}
                            </Box>
                        </Flex>
                    </Box>
    
                    <Box boxShadow="md" mt={20} p={4}>
                        <Flex justifyContent="space-between">
                            <Box w="100%" mr="5" borderRight="1px solid blue">
                                <Heading mb="5" textAlign="center">
                                    Тема урока
                                </Heading>
                                <Text>Lorem</Text>
                            </Box>
                            <Box w="100%">
                                <Heading mb="5" textAlign="center">
                                    Домашнее задание
                                </Heading>
                                <Text>Lorem</Text>
                            </Box>
                        </Flex>
                    </Box>
                </div>
            )
        }
        return <Navigate to="/404" />
    } 
    return <Center><Center><Spinner size='xs' /></Center></Center>
}
