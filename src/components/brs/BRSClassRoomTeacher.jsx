import React from 'react'
import {
    Box,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    useDisclosure
} from '@chakra-ui/react'
import BRSModal from './modal'

export default function BRS() {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <div>
            <Box borderWidth="1px" borderColor="blue">
                <TableContainer>
                    <Table borderWidth={1} variant="simple">
                        <Thead>
                            <Tr>
                                <Th borderWidth={1} rowSpan={3}>
                                    ФИО
                                </Th>
                                <Th
                                    colSpan={12}
                                    fontSize="2xl"
                                    borderWidth={1}
                                    textAlign="center"
                                >
                                    полугодие
                                </Th>
                            </Tr>
                            <Tr>
                                <Th
                                    colSpan={6}
                                    fontSize="2xl"
                                    borderWidth={1}
                                    textAlign="center"
                                >
                                    1
                                </Th>
                                <Th
                                    colSpan={6}
                                    borderWidth={1}
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
                            <Tr>
                                <Td borderWidth={1}>Иванов Петр</Td>
                                <Td borderWidth={1} />
                                <Td borderWidth={1} />
                                <Td borderWidth={1} />
                                <Td borderWidth={1} />
                                <Td borderWidth={1} />
                                <Td borderWidth={1} />
                                <Td borderWidth={1} />
                                <Td borderWidth={1} />
                                <Td borderWidth={1} />
                                <Td borderWidth={1} />
                                <Td borderWidth={1} />
                                <Td borderWidth={1} />
                            </Tr>
                            <Tr>
                                <Td borderWidth={1}>Александрова Ирина</Td>
                                <Td borderWidth={1} />
                                <Td borderWidth={1} />
                                <Td borderWidth={1} />
                                <Td borderWidth={1} />
                                <Td borderWidth={1} />
                                <Td borderWidth={1} />
                                <Td borderWidth={1} />
                                <Td borderWidth={1} />
                                <Td borderWidth={1} />
                                <Td borderWidth={1} />
                                <Td borderWidth={1} />
                                <Td borderWidth={1} />
                            </Tr>
                            <Tr>
                                <Td borderWidth={1}>Сидоров Алексей</Td>
                                <Td borderWidth={1} />
                                <Td borderWidth={1} />
                                <Td borderWidth={1} />
                                <Td borderWidth={1} />
                                <Td borderWidth={1} />
                                <Td borderWidth={1} />
                                <Td borderWidth={1} />
                                <Td borderWidth={1} />
                                <Td borderWidth={1} />
                                <Td borderWidth={1} />
                                <Td borderWidth={1} />
                                <Td borderWidth={1} />
                            </Tr>
                            <Tr>
                                <Td borderWidth={1}>Танюк Екатерина</Td>
                                <Td borderWidth={1} />
                                <Td borderWidth={1} />
                                <Td borderWidth={1} />
                                <Td borderWidth={1} />
                                <Td borderWidth={1} />
                                <Td borderWidth={1} />
                                <Td borderWidth={1} />
                                <Td borderWidth={1} />
                                <Td borderWidth={1} />
                                <Td borderWidth={1} />
                                <Td borderWidth={1} />
                                <Td borderWidth={1} />
                            </Tr>
                        </Tbody>
                    </Table>
                </TableContainer>
                {/* 
                    <Center m={5}>
                        <Button variant="outline" onClick={onOpen}>
                            Добавить запись
                        </Button>
                    </Center> */}
            </Box>
            <BRSModal onOpen={onOpen} isOpen={isOpen} onClose={onClose} />
        </div>
    )
}
