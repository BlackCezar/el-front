import React, { useEffect, useState, useMemo } from 'react'
import { ArrowBackIcon } from '@chakra-ui/icons'
import {
    Box,
    Flex,
    Heading,
    IconButton,
    Table,
    TableContainer,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr
} from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { useLazyGetGradesQuery } from '../../store/services/GradesService'
import '../../assets/scss/Journal.scss'
import { useLazyGetLessonsQuery } from '../../store/services/LessonsService'
import { useLazyGetGroupsQuery } from '../../store/services/GroupsService'

const groupBy = function (xs, key) {
    return xs.reduce((rv, x) => {
        ;(rv[x[key]] = rv[x[key]] || []).push(x)
        return rv
    }, {})
}

export default function JournalStudent() {
    const user = useSelector((state) => state.user.object)
    const [getGroup, { data: groups, isLoading }] = useLazyGetGroupsQuery()
    const [groupedLessons, setGroupedLessons] = useState([])
    const [getLessons, { data: lessons }] = useLazyGetLessonsQuery()
    useEffect(() => {
        if (
            user &&
            !isLoading &&
            groups &&
            groups.length &&
            groups.length > 0
        ) {
            getLessons({ group: groups[0]._id, student: user._id })
        } else if (user && user._id) {
            getGroup({ students: user._id })
        }
    }, [user, groups, isLoading])
    const [getGrades] = useLazyGetGradesQuery()
    const [field, selectField] = React.useState(null)
    // const getColSpan = React.useCallback(
    //     (day, gradesL) => {
    //         if (gradesL) {
    //             const list = gradesL.filter((g) => g.date === day)
    //             const students = []
    //             list.forEach((g) => {
    //                 if (students[g.student._id]) students[g.student._id] += 1
    //                 else students[g.student._id] = 1
    //             })
    //             return Object.values(students).sort()[0] + 1
    //         }
    //         return 1
    //     },
    //     [grades]
    // )

    const days = useMemo(() => {
        const dList = {}
        if (lessons && lessons.length) {
            setGroupedLessons(groupBy(lessons, 'subject'))

            lessons.forEach((l) => {
                getGrades({ lesson: l._id, student: user._id }).then(
                    (gradeList) => {
                        const { data } = gradeList

                        if (data && data.length) {
                            if (dList[l.date]) {
                                dList[l.date].push(...data)
                            } else dList[l.date] = [...data]
                        }
                    }
                )
            })
        }
        return dList
    }, [lessons])

    return (
        <div>
            <Heading mb={5}>
                <IconButton icon={<ArrowBackIcon />} />{' '}
            </Heading>

            <Box borderWidth="1px" borderColor="blue">
                <TableContainer>
                    <Table>
                        <Thead>
                            <Tr borderWidth={1}>
                                <Th>Дисциплина / дата</Th>
                                {days &&
                                    Object.keys(days).sort().map((day) => {
                                        const col = groupBy(days[day], 'date')
                                        return (
                                            <Th
                                                colSpan={col[day].length}
                                                borderWidth="1px"
                                                className={
                                                    field && field.date === day
                                                        ? 'journal-date active '
                                                        : 'journal-date'
                                                }
                                                onClick={() => {
                                                    const d = lessons.find(
                                                        (lsn) =>
                                                            lsn.date === day
                                                    )
                                                    selectField(d)
                                                }}
                                            >
                                                {day}
                                            </Th>
                                        )
                                    })}
                            </Tr>
                        </Thead>
                        <Tbody>
                            {groupedLessons ? (
                                Object.keys(groupedLessons).map((lesson) => (
                                    <Tr p="6px" key={lesson}>
                                        <Td borderWidth={1}>{lesson}</Td>

                                        {days &&
                                            Object.keys(days).sort().map((key) => {
                                                const list = days[key]
                                                return list
                                                    .filter(
                                                        (l) =>
                                                            l.lesson.subject ===
                                                            lesson
                                                    )
                                                    .map((les) => (
                                                        <Td borderWidth="1px">
                                                            {les.number}
                                                        </Td>
                                                    ))
                                            })}
                                    </Tr>
                                ))
                            ) : (
                                <Tr>
                                    <Td />
                                </Tr>
                            )}
                        </Tbody>
                    </Table>
                </TableContainer>
            </Box>

            {field && (
                <Box boxShadow="md" mt={20} p={4}>
                    <Flex justifyContent="space-between">
                        <Box w="100%" mr="5" borderRight="1px solid blue">
                            <Heading mb="5" textAlign="center">
                                Тема урока
                            </Heading>
                            <Text>{field.topic}</Text>
                        </Box>
                        <Box w="100%">
                            <Heading mb="5" textAlign="center">
                                Домашнее задание
                            </Heading>
                            <Text>{field.homework}</Text>
                        </Box>
                    </Flex>
                </Box>
            )}
        </div>
    )
}
