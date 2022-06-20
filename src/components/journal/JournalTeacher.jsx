import { ArrowBackIcon, CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons'
import {
    Box,
    Button,
    ButtonGroup,
    Editable,
    EditableInput,
    EditablePreview,
    Flex,
    Heading,
    HStack,
    IconButton,
    Input,
    List,
    ListItem,
    Table,
    TableContainer,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    useDisclosure,
    useEditableControls
} from '@chakra-ui/react'
import React from 'react'
// import { useSelector } from 'react-redux'
import {
    useCreateGradeMutation,
    useLazyGetGradesQuery,
    useUpdateGradeMutation
} from '../../store/services/GradesService'
import { useLazyGetGroupQuery } from '../../store/services/GroupsService'
import AddGrade from './AddGrade'
import AddTotalGrade from './AddTotalGrade'
import '../../assets/scss/Journal.scss'
import { useUpdateLessonMutation } from '../../store/services/LessonsService'

const groupBy = function (xs, key) {
    return xs.reduce((rv, x) => {
        ;(rv[x[key]] = rv[x[key]] || []).push(x)
        return rv
    }, {})
}

export default function JournalTeacher({
    groupdLesson,
    lessons,
    refetchLessons
}) {
    const [subject, setSubject] = React.useState(false)
    const [activeLessons, setActiveLessons] = React.useState([])
    const [getGrades, { data: grades }] = useLazyGetGradesQuery()
    const [get1Grades, { data: firstTotalGrades }] = useLazyGetGradesQuery()
    const [get2Grades, { data: secondTotalGrades }] = useLazyGetGradesQuery()
    const [get3Grades, { data: thirdTotalGrades }] = useLazyGetGradesQuery()
    const [getGroup, { data: group }] = useLazyGetGroupQuery()
    const [createGrade] = useCreateGradeMutation()
    const [updateGrade] = useUpdateGradeMutation()
    const [updateLesson] = useUpdateLessonMutation()
    const [field, selectField] = React.useState(null)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const {
        isOpen: isOpenTotal,
        onOpen: openTotal,
        onClose: closeTotal
    } = useDisclosure()
    const [grade, setGrade] = React.useState({
        student: '',
        lesson: '',
        number: '',
        date: new Date().toLocaleDateString('ru-RU')
    })

    const goTo = (obj) => {
        setActiveLessons(lessons.filter((l) => l.subject === obj.subject))
        setSubject(obj)
        getGrades({ group: obj._id })
        getGroup(obj._id)

        selectField(null)

        get1Grades({
            date: '1',
            subject: obj.subject
        })
        get2Grades({
            date: '2',
            subject: obj.subject
        })
        get3Grades({
            date: '3',
            subject: obj.subject
        })
    }
    const days = React.useMemo(() => {
        return groupBy(activeLessons, 'date')
    }, [activeLessons])

    const renderTotalGrade = React.useCallback(
        (list) => {
            const l = list.map((student) => {
                const firstGrade =
                    firstTotalGrades &&
                    firstTotalGrades.length &&
                    firstTotalGrades.find((t) => t.student._id === student._id)

                const secondGrade =
                    secondTotalGrades &&
                    secondTotalGrades.length &&
                    secondTotalGrades.find((t) => t.student._id === student._id)

                const thirdGrade =
                    thirdTotalGrades &&
                    thirdTotalGrades.length &&
                    thirdTotalGrades.find((t) => t.student._id === student._id)

                return (
                    <Tr height="65px" p="6px" key={'student-' + student._id}>
                        <Td borderWidth={1}>
                            <Text>{firstGrade ? firstGrade.number : ''}</Text>
                        </Td>
                        <Td borderWidth={1}>
                            <Text>{secondGrade ? secondGrade.number : ''}</Text>
                        </Td>
                        <Td borderWidth={1}>
                            <Text>{thirdGrade ? thirdGrade.number : ''}</Text>
                        </Td>
                    </Tr>
                )
            })
            return l
        },
        [group, thirdTotalGrades, secondTotalGrades, firstTotalGrades]
    )
    return subject && subject.name ? (
        <div>
            <Heading mb={5}>
                <IconButton
                    onClick={() => setSubject(false)}
                    icon={<ArrowBackIcon />}
                />{' '}
                {subject.name} - {subject.subject}
                <Button float="right" onClick={onOpen}>
                    Добавить оценку
                </Button>
                <Button mr={4} float="right" onClick={openTotal}>
                    Добавить итоговую оценку
                </Button>
            </Heading>

            <HStack spacing={4}>
                <Box borderWidth="1px" borderColor="blue">
                    <TableContainer>
                        <Table>
                            <Thead>
                                <Tr borderWidth={1} height="65px">
                                    <Th>Ученик / дата</Th>
                                    {Object.keys(days)
                                        .sort()
                                        .map((day, i) => {
                                            const activeLesson =
                                                activeLessons.find(
                                                    (l) => l.date === day
                                                )
                                            const gradesList = grades
                                                ? grades
                                                      .filter(
                                                          (g) =>
                                                              g.date === day &&
                                                              g.lesson._id ===
                                                                  activeLesson._id
                                                      )
                                                      .map((g) => {
                                                          const studentId =
                                                              g.student._id
                                                          return {
                                                              ...g,
                                                              student: studentId
                                                          }
                                                      })
                                                : []
                                            const length = Object.values(
                                                groupBy(gradesList, 'student')
                                            )
                                            console.log(length)
                                            return (
                                                <Th
                                                    key={'day-' + i}
                                                    colSpan={
                                                        length && length.length
                                                            ? length[0]
                                                                  .length === 1
                                                                ? 1
                                                                : length[0]
                                                                      .length
                                                            : 0
                                                    }
                                                    borderWidth="1px"
                                                    className={
                                                        field &&
                                                        field.date === day
                                                            ? 'journal-date active '
                                                            : 'journal-date'
                                                    }
                                                    onClick={() => {
                                                        const d = lessons.find(
                                                            (l) =>
                                                                l.date ===
                                                                    day &&
                                                                l.subject ===
                                                                    subject.subject
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
                                {group && group.students ? (
                                    group.students.map((s, i) => (
                                        <Tr
                                            p="6px"
                                            height="65px"
                                            key={'st-' + s._id + i}
                                            maxHeight="65px"
                                        >
                                            <Td borderWidth={1}>
                                                {s.fullname}
                                            </Td>
                                            {Object.keys(days)
                                                .sort()
                                                .map((day) => {
                                                    const d =
                                                        activeLessons.find(
                                                            (l) =>
                                                                l.date ===
                                                                    day &&
                                                                l.subject ===
                                                                    subject.subject
                                                        )
                                                    const gradesList = grades
                                                        ? grades.filter(
                                                              (g) =>
                                                                  g.date ===
                                                                      day &&
                                                                  g.student
                                                                      ._id ===
                                                                      s._id &&
                                                                  g.lesson
                                                                      ._id ===
                                                                      d._id
                                                          )
                                                        : []

                                                    const MaxLength = grades
                                                        ? grades.filter(
                                                              (g) =>
                                                                  g.date ===
                                                                      day &&
                                                                  g.lesson
                                                                      ._id ===
                                                                      d._id
                                                          )
                                                        : []

                                                    console.log(MaxLength)
                                                    return gradesList &&
                                                        gradesList.length ? (
                                                        gradesList.map(
                                                            (g, ind) => (
                                                                <Td
                                                                    borderWidth={
                                                                        1
                                                                    }
                                                                    key={
                                                                        g._id +
                                                                        ind * 20
                                                                    }
                                                                >
                                                                    <Editable
                                                                        submitOnBlur
                                                                        onSubmit={(
                                                                            val
                                                                        ) =>
                                                                            updateGrade(
                                                                                {
                                                                                    data: {
                                                                                        ...field,
                                                                                        number: val
                                                                                    },
                                                                                    id: g._id
                                                                                }
                                                                            )
                                                                        }
                                                                        defaultValue={
                                                                            g.number
                                                                        }
                                                                    >
                                                                        <Flex alignItems="center">
                                                                            <EditablePreview />
                                                                            <Input
                                                                                as={
                                                                                    EditableInput
                                                                                }
                                                                            />
                                                                            <EditableControls />
                                                                        </Flex>
                                                                    </Editable>
                                                                </Td>
                                                            )
                                                        )
                                                    ) : (
                                                        <Td
                                                            borderWidth="1px"
                                                            colSpan={
                                                                MaxLength &&
                                                                MaxLength.length
                                                            }
                                                        />
                                                    )
                                                })}
                                        </Tr>
                                    ))
                                ) : (
                                    <Tr>
                                        <Td>Нет студентов</Td>
                                    </Tr>
                                )}
                            </Tbody>
                        </Table>
                    </TableContainer>
                    <AddGrade
                        object={grade}
                        students={group && group.students ? group.students : []}
                        setObject={setGrade}
                        lessons={activeLessons}
                        action={createGrade}
                        isOpen={isOpen}
                        onClose={onClose}
                    />
                    <AddTotalGrade
                        object={grade}
                        students={group && group.students ? group.students : []}
                        setObject={setGrade}
                        subject={subject ? subject.subject : ''}
                        action={createGrade}
                        isOpen={isOpenTotal}
                        onClose={closeTotal}
                    />
                </Box>

                <Box borderWidth="1px" borderColor="blue">
                    <TableContainer>
                        <Table>
                            <Thead>
                                <Tr height="65px" borderWidth={1}>
                                    <Th>1 Полугодие</Th>
                                    <Th>2 Полугодие</Th>
                                    <Th>Итоговая</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {group && group.students ? (
                                    renderTotalGrade(group.students)
                                ) : (
                                    <Tr>
                                        <Td>Нет студентов</Td>
                                    </Tr>
                                )}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </Box>
            </HStack>
            {field && (
                <Box boxShadow="md" mt={20} p={4}>
                    <Flex justifyContent="space-between">
                        <Box w="100%" mr="5" borderRight="1px solid blue">
                            <Heading mb="5" textAlign="center">
                                Тема урока
                            </Heading>

                            <Editable
                                submitOnBlur
                                onChange={(val) =>
                                    selectField({
                                        ...field,
                                        topic: val
                                    })
                                }
                                onSubmit={(val) => {
                                    refetchLessons()
                                    updateLesson({
                                        data: {
                                            ...field,
                                            topic: val
                                        },
                                        id: field._id
                                    })
                                }}
                                defaultValue="Введите тему урока"
                                value={field.topic}
                            >
                                <Flex alignItems="center">
                                    <EditablePreview />
                                    <Input as={EditableInput} />{' '}
                                    <EditableControls />
                                </Flex>
                            </Editable>
                        </Box>
                        <Box w="100%">
                            <Heading mb="5" textAlign="center">
                                Домашнее задание
                            </Heading>
                            <Editable
                                submitOnBlur
                                onChange={(val) =>
                                    selectField({
                                        ...field,
                                        homework: val
                                    })
                                }
                                onSubmit={(val) => {
                                    refetchLessons()
                                    updateLesson({
                                        data: {
                                            ...field,
                                            homework: val
                                        },
                                        id: field._id
                                    })
                                }}
                                value={field.homework}
                                defaultValue="Введите домашнее задание"
                            >
                                <Flex alignItems="center">
                                    <EditablePreview />
                                    <Input as={EditableInput} />{' '}
                                    <EditableControls />
                                </Flex>
                            </Editable>
                        </Box>
                    </Flex>
                </Box>
            )}
        </div>
    ) : (
        <div>
            <Heading>Выберите класс с дисциплиной</Heading>

            <List>
                {groupdLesson &&
                    Object.keys(groupdLesson).map((l) => {
                        return (
                            <ListItem
                                key={l}
                                className="link-group"
                                onClick={() => goTo(groupdLesson[l])}
                                mb={3}
                            >
                                {l.replace('-', '  ')}
                            </ListItem>
                        )
                    })}
            </List>
        </div>
    )
}

function EditableControls() {
    const {
        isEditing,
        getSubmitButtonProps,
        getCancelButtonProps,
        getEditButtonProps
    } = useEditableControls()

    return isEditing ? (
        <ButtonGroup justifyContent="center" size="sm">
            <IconButton icon={<CheckIcon />} {...getSubmitButtonProps()} />
            <IconButton icon={<CloseIcon />} {...getCancelButtonProps()} />
        </ButtonGroup>
    ) : (
        <Flex justifyContent="center">
            <IconButton
                size="sm"
                icon={<EditIcon />}
                {...getEditButtonProps()}
            />
        </Flex>
    )
}
