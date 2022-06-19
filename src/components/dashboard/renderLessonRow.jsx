import React from 'react'
import { Tbody, Td, Tr } from '@chakra-ui/react'

export default function RenderLessonRow({ list }) {
    const firstLesson = list.find((l) => l.order === 0)
    const secondLesson = list.find((l) => l.order === 1)
    const thirdLesson = list.find((l) => l.order === 2)
    const fourLesson = list.find((l) => l.order === 3)
    const fiveLesson = list.find((l) => l.order === 4)
    const sixLesson = list.find((l) => l.order === 5)
    return (
        <Tbody>
            <Tr>
                <Td>8:00-8:45</Td>
                <Td>{firstLesson && firstLesson.subject}</Td>
                <Td>{firstLesson && firstLesson.classroom}</Td>
            </Tr>
            <Tr>
                <Td>8:55-9:30</Td>
                <Td>{secondLesson && secondLesson.subject}</Td>
                <Td>{secondLesson && secondLesson.classroom}</Td>
            </Tr>
            <Tr>
                <Td>9:40-10:25</Td>
                <Td>{thirdLesson && thirdLesson.subject}</Td>
                <Td>{thirdLesson && thirdLesson.classroom}</Td>
            </Tr>
            <Tr>
                <Td>10:30-11:15</Td>
                <Td>{fourLesson && fourLesson.subject}</Td>
                <Td>{fourLesson && fourLesson.classroom}</Td>
            </Tr>
            <Tr>
                <Td>11:25-12:10</Td>
                <Td>{fiveLesson && fiveLesson.subject}</Td>
                <Td>{fiveLesson && fiveLesson.classroom}</Td>
            </Tr>
            <Tr>
                <Td>12:15-13:00</Td>
                <Td>{sixLesson && sixLesson.subject}</Td>
                <Td>{sixLesson && sixLesson.classroom}</Td>
            </Tr>
        </Tbody>
    )
}
