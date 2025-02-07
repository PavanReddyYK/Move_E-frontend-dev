import BTable from 'react-bootstrap/Table';
import { useTable, usePagination, useGlobalFilter } from 'react-table';
import { GlobalFilter } from './GlobalFilter';

export default function Table({ columns, data }) {
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSizeState] = useState(10);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        globalFilter,
        setGlobalFilter,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize, // already provided by useTable for updating page size
        state,
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex, pageSize: pageSize }, // use the pageSize state here
            autoResetPage: false,
        },
        useGlobalFilter,
        usePagination
    );

    // Sync pageIndex and pageSize state when they change inside the table
    useEffect(() => {
        setPageIndex(state.pageIndex);
        setPageSizeState(state.pageSize); // Sync page size state
    }, [state.pageIndex, state.pageSize]);

    // Render your table and pagination controls here
    return (
        <>
            <Row className="mb-3">
                <Col className="d-flex align-items-center">
                    Show
                    <select
                        className="form-control w-auto mx-2"
                        value={pageSize}
                        onChange={(e) => {
                            setPageSize(Number(e.target.value));
                        }}
                    >
                        {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                            <option key={pageSize} value={pageSize}>
                                {pageSize}
                            </option>
                        ))}
                    </select>
                    entries
                </Col>
                <Col>
                    <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
                </Col>
            </Row>
            <BTable striped bordered hover responsive {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row, i) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </BTable>
            <Row className="justify-content-between mt-3">
                <Col sm={12} md={6}>
                    <span className="d-flex align-items-center">
                        Page {pageIndex + 1} of {pageOptions.length} | Go to page:{' '}
                        <input
                            type="number"
                            className="form-control ml-2"
                            defaultValue={pageIndex + 1}
                            onChange={(e) => {
                                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                                gotoPage(page);
                            }}
                            style={{ width: '100px' }}
                        />
                    </span>
                </Col>
                <Col sm={12} md={6}>
                    <Pagination className="justify-content-end">
                        <Pagination.First onClick={() => gotoPage(0)} disabled={!canPreviousPage} />
                        <Pagination.Prev onClick={() => previousPage()} disabled={!canPreviousPage} />
                        <Pagination.Next onClick={() => nextPage()} disabled={!canNextPage} />
                        <Pagination.Last onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage} />
                    </Pagination>
                </Col>
            </Row>
        </>
    );
}