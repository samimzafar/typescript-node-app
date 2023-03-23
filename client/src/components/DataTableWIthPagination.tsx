import DataTable from "react-data-table-component";

interface DataTableProps {
  isLoading: boolean;
  progressComponent: JSX.Element;
  paginationTotalRows: number;
  paginationPerPage: number;
  onChangePage: any;
  onRowClicked?: any;
  paginationDefaultPage: number;
  parameterOfColumns: any;
  columns: any;
  data: any;
  className?: string;
}

function CustomDataTableWithPagination({
  isLoading,
  progressComponent,
  columns,
  data,
  paginationTotalRows,
  paginationPerPage,
  onChangePage,
  onRowClicked,
  paginationDefaultPage,
  className,
}: DataTableProps) {
  return (
    <div className={className}>
      <DataTable
        progressPending={isLoading}
        columns={columns}
        progressComponent={progressComponent}
        highlightOnHover
        data={data}
        striped
        pagination
        paginationServer
        paginationTotalRows={paginationTotalRows}
        paginationPerPage={paginationPerPage}
        paginationDefaultPage={paginationDefaultPage}
        paginationComponentOptions={{
          noRowsPerPage: true,
        }}
        onChangePage={onChangePage}
        responsive={true}
        onRowClicked={onRowClicked}
      />
    </div>
  );
}

export default CustomDataTableWithPagination;
