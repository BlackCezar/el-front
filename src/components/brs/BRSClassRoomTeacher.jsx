import React from 'react'
import {
    Box,
    Button,
    Center,
    Spinner,
    Table,
    TableContainer,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    useDisclosure
} from '@chakra-ui/react'
import BRSModal from './modal'
import { useGetGroupsQuery } from '../../store/services/GroupsService'
import { useCreatePointMutation, useLazyGetPointsQuery } from '../../store/services/PointsService'
import { useGetSSOMutation } from '../../store/services/GradesService'

export default function BRSClassRoom({user}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const {data: group, isLoading} = useGetGroupsQuery({boss: user._id})
    const [createPoint] = useCreatePointMutation()
    const [getPoints, {data: points, isSuccess}] = useLazyGetPointsQuery()
    const [getSSO, {data: sso}] = useGetSSOMutation()
    const [getSSOSecond, {data: sso2}] = useGetSSOMutation()
    const [object, setObject] = React.useState({
        number: 0,
        group: '',
        type: 'Other',
        half: 1,
        student: '',
    })
    const students = React.useMemo(() => {
        if (group && group.length) {
            getPoints({group: group[0]._id})

            getSSO({half: 1, students: group[0].students})
            getSSOSecond({half: 2, students: group[0].students})
            return group[0].students
        }
        return []
    }, [group])

    const renderPoint = React.useCallback((list, type, half) => {
        const point = list.find(l => l.type === type && l.half === half)
        if (point) {
            console.log(point)
            return <Text>{point.number}</Text>
        } 
        return <Text /> 
    }, [points])

    const renderSSO = React.useCallback((student, half) => {
        if (sso && sso2) {
            if (half === 2) {
                const ssoStudent2 = sso2 && sso2.length ? sso2.find(i => i._id === student._id) : 0
                console.log(ssoStudent2)
                if (ssoStudent2 && ssoStudent2.sso) {
                    return parseFloat(ssoStudent2.sso).toFixed(2)
                }
            } else {
                const ssoStudent = sso && sso.length ? sso.find(i => i._id === student._id) : 0
                if (ssoStudent && ssoStudent.sso) {
                    return parseFloat(ssoStudent.sso).toFixed(2)
                }
            }
        } 
        return  Number(0).toFixed(2)
    }, [sso, sso2])

    return (
        <div>
             <Center m={5}>
                        <Button variant="outline" onClick={onOpen}>
                            Добавить запись
                        </Button>
                    </Center>

            <Box borderWidth="1px" maxWidth='calc(100vw - 260px)' borderColor="blue">
                {isLoading ? <Center><Center><Spinner /></Center></Center> :
                <TableContainer >
                    <Table borderWidth={1} variant="simple">
                        <Thead borderWidth={3}>
                            <Tr>
                                <Th borderWidth={3} rowSpan={3}>
                                    ФИО
                                </Th>
                                <Th
                                    colSpan={12}
                                    fontSize="2xl"
                                    borderWidth={3}
                                    textAlign="center"
                                >
                                    полугодие
                                </Th>
                            </Tr>
                            <Tr>
                                <Th
                                    colSpan={6}
                                    fontSize="2xl"
                                    borderWidth={3}
                                    textAlign="center"
                                >
                                    1
                                </Th>
                                <Th
                                    colSpan={6}
                                    borderWidth={3}
                                    fontSize="2xl"
                                    textAlign="center"
                                >
                                    2
                                </Th>
                            </Tr>
                            <Tr>
                                <Th borderWidth={1}>СОО</Th>
                                <Th borderWidth={1}>Рег. конкурсы</Th>
                                <Th borderWidth={1}>Росс. конк</Th>
                                <Th borderWidth={1}>Межд. конк</Th>
                                <Th borderWidth={1}>Разное</Th>
                                <Th borderWidth={1}>Итог</Th>
                                <Th borderWidth={1}>СОО</Th>
                                <Th borderWidth={1}>Рег. конкурсы</Th>
                                <Th borderWidth={1}>Росс. конк</Th>
                                <Th borderWidth={1}>Межд. конк</Th>
                                <Th borderWidth={1}>Разное</Th>
                                <Th borderWidth={1}>Итог</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {students && students.map(student => {
                            const pointsList = points && isSuccess ? points.filter(p => p.student === student._id) : []
                        
                            
                            return (<Tr key={student._id}>
                                <Td borderWidth={1}>{student.fullname}</Td>
                                
                                <Td borderWidth={1}>
                                    {renderSSO(student, 1)}
                                </Td>
                                <Td borderWidth={1}>
                                    {renderPoint(pointsList, 'Region', 1)}
                                </Td>
                                <Td borderWidth={1}>
                                    {renderPoint(pointsList, 'Country', 1)}
                                </Td>
                                <Td borderWidth={1}>
                                    {renderPoint(pointsList, 'World', 1)}
                                </Td>
                                <Td borderWidth={1}>
                                    {renderPoint(pointsList, 'Other', 1)}
                                </Td>
                                <Td borderWidth={1}>
                                    {pointsList.filter(p => p.half === 1).reduce((prev, curr) => prev + curr.number, 0)}
                                </Td>
                                <Td borderWidth={1}>
                                    {renderSSO(student, 2)}
                                </Td>
                                <Td borderWidth={1}>
                                    {renderPoint(pointsList, 'Region', 2)}
                                </Td>
                                <Td borderWidth={1}>
                                    {renderPoint(pointsList, 'Country', 2)}
                                </Td>
                                <Td borderWidth={1}>
                                    {renderPoint(pointsList, 'World', 2)}
                                </Td>
                                <Td borderWidth={1}>
                                    {renderPoint(pointsList, 'Other', 2)}
                                </Td>
                                <Td borderWidth={1}>
                                    {pointsList.filter(p => p.half === 2).reduce((prev, curr) => prev + curr.number, 0) + parseFloat(renderSSO(student, 2))}
                                </Td>
                            </Tr>)})}
                        </Tbody>
                    </Table>
                </TableContainer>}
                
                   
            </Box>
            <BRSModal group={group} action={createPoint} object={object} setObject={setObject} onOpen={onOpen} students={students} isOpen={isOpen} onClose={onClose} />
        </div>
    )
}
