import {
    Box,
    Button,
    Center,
    Spinner,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    useDisclosure
} from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import BRSModal from '../components/brs/modal'
import BRSClassRoomTeacher from '../components/brs/BRSClassRoomTeacher'

export default function BRSPage() {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const user = useSelector((state) => state.user.object)

    if (user && user.role) {
        if (['Student', 'ClassRoomTeacher'].includes(user.role)) {
            if (user.role === 'ClassRoomTeacher') return <BRSClassRoomTeacher user={user} />
            return (
                <div>
                    <Box borderWidth="1px" borderColor="blue">
                        <TableContainer>
                            <Table variant="simple">
                                <Thead>
                                    <Tr>
                                        <Th
                                            colSpan={7}
                                            fontSize="2xl"
                                            textAlign="center"
                                        >
                                            БРС
                                        </Th>
                                    </Tr>
                                    <Tr>
                                        <Th width="20px" />
                                        <Th>СОО</Th>
                                        <Th>Рег. конкурсы</Th>
                                        <Th>Росс. конк</Th>
                                        <Th>Межд. конк</Th>
                                        <Th>Разное</Th>
                                        <Th>Итог</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    <Tr>
                                        <Td>1 полугодие</Td>
                                        <Td>inches</Td>
                                        <Td>inches</Td>
                                        <Td>millimetres (mm)</Td>
                                        <Td>inches</Td>
                                        <Td>inches</Td>
                                        <Td isNumeric>25.4</Td>
                                    </Tr>
                                    <Tr>
                                        <Td text>2 полугодие</Td>
                                        <Td>inches</Td>
                                        <Td>inches</Td>
                                        <Td>millimetres (mm)</Td>
                                        <Td>inches</Td>
                                        <Td>inches</Td>
                                        <Td isNumeric>25.4</Td>
                                    </Tr>
                                </Tbody>
                            </Table>
                        </TableContainer>
    
                        <Center m={5}>
                            <Button variant="outline" onClick={onOpen}>
                                Добавить запись
                            </Button>
                        </Center>
                    </Box>
                    <BRSModal isOpen={isOpen} onClose={onClose} />
                </div>
            )
        }
        return <Navigate to="/404" />
    }
    return <Center><Center><Spinner size='xs' /></Center></Center>
}
