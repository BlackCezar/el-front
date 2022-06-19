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
    useGetGradesQuery,
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

export default function JournalTeacher({ groupdLesson, lessons }) {
    // const user = useSelector(state => state.user.object)
    const [subject, setSubject] = React.useState(false)
    const [activeLessons, setActiveLessons] = React.useState([])
    const [getGrades, { data: grades }] = useLazyGetGradesQuery()
    const { data: firstTotalGrades } = useGetGradesQuery({ date: '1' })
    const { data: secondTotalGrades } = useGetGradesQuery({ date: '2' })
    const { data: thirdTotalGrades } = useGetGradesQuery({ date: '3' })
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
    }
    const days = React.useMemo(() => {
        return groupBy(activeLessons, 'date')
    }, [activeLessons])
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
                                <Tr borderWidth={1}>
                                    <Th>Ученик / дата</Th>
                                    {Object.keys(days)
                                        .sort()
                                        .map((day) => {
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
                                            return (
                                                <Th
                                                    colSpan={
                                                        length && length.length
                                                            ? length[0].length
                                                            : 1
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
                                                                l.date === day
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
                                    group.students.map((s) => (
                                        <Tr p="6px">
                                            <Td borderWidth={1}>
                                                {s.fullname}
                                            </Td>
                                            {Object.keys(days)
                                                .sort()
                                                .map((day) => {
                                                    const d =
                                                        activeLessons.find(
                                                            (l) =>
                                                                l.date === day
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
                                                    console.log(gradesList)
                                                    return gradesList.map(
                                                        (g) => (
                                                            <Td borderWidth={1}>
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
                                                                    <EditablePreview />
                                                                    <Input
                                                                        as={
                                                                            EditableInput
                                                                        }
                                                                    />
                                                                    <EditableControls />
                                                                </Editable>
                                                            </Td>
                                                        )
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
                        lessons={activeLessons}
                        action={createGrade}
                        isOpen={isOpenTotal}
                        onClose={closeTotal}
                    />
                </Box>

                <Box borderWidth="1px" borderColor="blue">
                    <TableContainer>
                        <Table>
                            <Thead>
                                <Tr borderWidth={1}>
                                    <Th>1 Полугодие</Th>
                                    <Th>2 Полугодие</Th>
                                    <Th>Итоговая</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {group && group.students ? (
                                    group.students.map(() => (
                                        <Tr p="6px">
                                            <Td borderWidth={1}>
                                            {firstTotalGrades &&
                                                        firstTotalGrades.length && <Editable
                                                    submitOnBlur
                                                    onSubmit={(val) =>
                                                        updateGrade({
                                                            data: {
                                                                ...field,
                                                                number: val
                                                            },
                                                            id:
                                                                firstTotalGrades &&
                                                                firstTotalGrades.length
                                                                    ? firstTotalGrades[0]
                                                                          ._id
                                                                    : ''
                                                        })
                                                    }
                                                    defaultValue={
                                                        firstTotalGrades &&
                                                        firstTotalGrades.length
                                                            ? firstTotalGrades[0]
                                                                  .number
                                                            : ''
                                                    }
                                                >
                                                    <EditablePreview />
                                                    <Input as={EditableInput} />
                                                    <EditableControls />
                                                </Editable>}
                                            </Td>
                                            <Td borderWidth={1}>
                                                {secondTotalGrades &&
                                                        secondTotalGrades.length &&
                                                <Editable
                                                    submitOnBlur
                                                    onSubmit={(val) =>
                                                        updateGrade({
                                                            data: {
                                                                ...field,
                                                                number: val
                                                            },
                                                            id:
                                                            secondTotalGrades &&
                                                                secondTotalGrades.length
                                                                    ? secondTotalGrades[0]
                                                                          ._id
                                                                    : ''
                                                        })
                                                    }
                                                    defaultValue={
                                                        secondTotalGrades &&
                                                        secondTotalGrades.length
                                                            ? secondTotalGrades[0]
                                                                  .number
                                                            : ''
                                                    }
                                                >
                                                    <EditablePreview />
                                                    <Input as={EditableInput} />
                                                    <EditableControls />
                                                </Editable>}
                                            </Td>
                                            <Td borderWidth={1}>
                                                {thirdTotalGrades && thirdTotalGrades.length && 
                                            <Editable
                                                    submitOnBlur
                                                    onSubmit={(val) =>
                                                        updateGrade({
                                                            data: {
                                                                ...field,
                                                                number: val
                                                            },
                                                            id:
                                                            thirdTotalGrades &&
                                                            thirdTotalGrades.length
                                                                    ? thirdTotalGrades[0]
                                                                          ._id
                                                                    : ''
                                                        })
                                                    }
                                                    defaultValue={
                                                        thirdTotalGrades &&
                                                        thirdTotalGrades.length
                                                            ? thirdTotalGrades[0]
                                                                  .number
                                                            : ''
                                                    }
                                                >
                                                    <EditablePreview />
                                                    <Input as={EditableInput} />
                                                    <EditableControls />
                                                </Editable>
}
                                            </Td>
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
                                onSubmit={(val) =>
                                    updateLesson({
                                        data: {
                                            ...field,
                                            topic: val
                                        },
                                        id: field._id
                                    })
                                }
                                defaultValue="Введите тему урока"
                                value={field.topic}
                            >
                                <EditablePreview />
                                <Input as={EditableInput} />{' '}
                                <EditableControls />
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
                                onSubmit={(val) =>
                                    updateLesson({
                                        data: {
                                            ...field,
                                            homework: val
                                        },
                                        id: field._id
                                    })
                                }
                                value={field.homework}
                                defaultValue="Введите домашнее задание"
                            >
                                <EditablePreview />
                                <Input as={EditableInput} />{' '}
                                <EditableControls />
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
                    Object.keys(groupdLesson).map((l) => (
                        <ListItem
                            className="link-group"
                            onClick={() => goTo(groupdLesson[l])}
                            mb={3}
                        >
                            {l.replace('-', '  ')}
                        </ListItem>
                    ))}
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
