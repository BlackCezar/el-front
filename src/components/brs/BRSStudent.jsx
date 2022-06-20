import React from 'react'
import {
    Table,
    TableContainer,
    Tbody,
    Td,
    Text,
    Th,
    Center,
    Spinner,
    Thead,
    Tr,
    Box,
} from '@chakra-ui/react'
import { useLazyGetPointsQuery } from '../../store/services/PointsService'
import { useGetSSOMutation } from '../../store/services/GradesService'


export default function BRSStudent({user}) {
    const [getPoints, {data: points, isSuccess, isLoading}] = useLazyGetPointsQuery()
    const [getSSO, {data: sso}] = useGetSSOMutation()
    const [getSSOSecond, {data: sso2}] = useGetSSOMutation()

    React.useEffect(() => {
        if (user && user._id) {
            getPoints({student: user._id})

            getSSO({half: 1, students: [user]})
            getSSOSecond({half: 2, students: [user]})
        }
    }, [])

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

    const renderPoint = React.useCallback((list, type, half) => {
        const point = list.find(l => l.type === type && l.half === half)
        if (point) {
            console.log(point)
            return <Text>{point.number}</Text>
        } 
        return <Text /> 
    }, [points])

    const renderTable = React.useCallback((student) => {
        const pointsList = points && isSuccess ? points.filter(p => p.student === student._id) : []
                            
        return (<Tr>
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
        </Tr>)
    }, [sso2, sso, user, points])

    return (
        <div>
            <Box borderWidth="1px" borderColor="blue">
            <Box borderWidth="1px" maxWidth='calc(100vw - 260px)' borderColor="blue">
                {isLoading ? <Center><Center><Spinner /></Center></Center> :
                <TableContainer >
                    <Table borderWidth={1} variant="simple">
                        <Thead borderWidth={3}>
                            <Tr>
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
                            {user && renderTable(user)} 
                        </Tbody>
                    </Table>
                </TableContainer>}
                
                   
            </Box>
            </Box>
        </div>
    )
}