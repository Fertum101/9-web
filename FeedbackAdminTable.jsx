import { useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchFeedbacksAdmin, deleteFeedbackAdmin } from '../../store/slices/adminSlice'
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
} from '@tanstack/react-table'
import { useVirtualizer } from '@tanstack/react-virtual'
import {
  Box, Button, Table, TableHead, TableRow,
  TableCell, TableBody, TableContainer, Paper, TableSortLabel, CircularProgress, Typography
} from '@mui/material'
import { useDrag, useDrop, DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

const DraggableHeaderCell = ({ header, index, moveColumn }) => {
  const ref = useRef(null)

  const [, drop] = useDrop({
    accept: 'column',
    hover(item) {
      if (!ref.current || item.index === index) return
      moveColumn(item.index, index)
      item.index = index
    }
  })

  const [, drag] = useDrag({
    type: 'column',
    item: { id: header.id, index },
  })

  drag(drop(ref))

  return (
    <TableCell ref={ref}>
      <TableSortLabel
        active={!!header.column.getIsSorted()}
        direction={header.column.getIsSorted() === 'desc' ? 'desc' : 'asc'}
        onClick={header.column.getToggleSortingHandler()}
      >
        {flexRender(header.column.columnDef.header, header.getContext())}
      </TableSortLabel>
    </TableCell>
  )
}

const FeedbackAdminTable = () => {
  const dispatch = useDispatch()
  const { feedbacks } = useSelector(state => state.admin)
  const parentRef = useRef()
  const [loading, setLoading] = useState(true)
  const [columnOrder, setColumnOrder] = useState([])

  useEffect(() => {
    dispatch(fetchFeedbacksAdmin()).then(() => {
      setTimeout(() => setLoading(false), 1000)
    })
  }, [dispatch])

  const columns = useMemo(() => [
    {
      accessorKey: 'author',
      header: 'Автор',
      enableSorting: true,
      cell: info => (
        <Box sx={{ position: 'sticky', left: 0, backgroundColor: 'background.paper', zIndex: 2 }}>
          {info.getValue()}
        </Box>
      ),
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },
    {
      accessorKey: 'date',
      header: 'Дата',
    },
    {
      accessorKey: 'text',
      header: 'Отзыв',
    },
    {
      id: 'actions',
      header: 'Действия',
      cell: ({ row }) => (
        <Button variant="outlined" color="error" onClick={() => dispatch(deleteFeedbackAdmin(row.original.id))}>
          Удалить
        </Button>
      ),
    },
  ], [dispatch])

  const columnIds = useMemo(() => columns.map(col => col.id || col.accessorKey), [columns])

  const table = useReactTable({
    data: feedbacks || [],
    columns,
    state: {
      columnOrder: columnOrder.length ? columnOrder : columnIds,
    },
    onColumnOrderChange: setColumnOrder,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    enableColumnOrdering: true,
  })

  const moveColumn = (dragIndex, hoverIndex) => {
    const newOrder = [...table.getState().columnOrder]
    const [moved] = newOrder.splice(dragIndex, 1)
    newOrder.splice(hoverIndex, 0, moved)
    table.setColumnOrder(newOrder)
  }

  const rowVirtualizer = useVirtualizer({
    count: table.getRowModel().rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 56,
    overscan: 5,
  })

  const virtualRows = rowVirtualizer.getVirtualItems()
  const totalSize = rowVirtualizer.getTotalSize()

  if (loading || !feedbacks) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="200px">
        <CircularProgress />
      </Box>
    )
  }

  return (
    <TableContainer component={Paper} sx={{ maxHeight: 400, overflow: 'auto' }} ref={parentRef}>
      <Table stickyHeader>
        <DndProvider backend={HTML5Backend}>
          <TableHead>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header, index) => (
                  <DraggableHeaderCell
                    key={header.id}
                    header={header}
                    index={index}
                    moveColumn={moveColumn}
                  />
                ))}
              </TableRow>
            ))}
          </TableHead>
        </DndProvider>
        <TableBody>
          {virtualRows.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length}>
                <Typography variant="body1" sx={{ p: 2 }}>Нет отзывов</Typography>
              </TableCell>
            </TableRow>
          ) : (
            <>
              {virtualRows.map(virtualRow => {
                const row = table.getRowModel().rows[virtualRow.index]
                return (
                  <TableRow key={row.id} style={{ height: `${virtualRow.size}px` }}>
                    {row.getVisibleCells().map(cell => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                )
              })}
            </>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default FeedbackAdminTable
