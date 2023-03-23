import AdminLayout from "../../../layouts/AdminLayout/AdminLayout.index";
import { Spinner } from "react-bootstrap";
import {
  getCompanies,
  changeVerificationOfCompanyReq,
} from "../../../services/api";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ErrorAlert from "../../../components/ErrorAlert";
import { DATA_TABLE_COLUMNS, ICompany } from "./Companies.constants";
import { useHistory } from "react-router";
import CustomDataTableWithPagination from "../../../components/DataTableWIthPagination";

function Companies() {
  // Configuration Variables
  const history = useHistory();

  // State Variables
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [companies, setCompanies] = useState<object[] | []>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [totalRows, setTotalRows] = useState<number>(0);
  const pageLimit = 10;

  // Store
  const state: any = useSelector((state) => state);
  const { accessToken, userId }: { accessToken: string; userId: number } =
    state.auth;

  async function getAdminCompanies() {
    setLoading(true);
    try {
      const res: {
        data: {
          previousPage: number | null;
          currentPage: number;
          nextPage: number | null;
          total: number;
          limit: number;
          companies: ICompany[];
        };
      } = await getCompanies({
        adminId: userId,
        accessToken,
        pageLimit,
        pageNumber,
      });
      const { total, companies } = res.data;
      setTotalRows(total);
      setCompanies(companies);
    } catch (err: any) {
      setErrorMessage(err.response.data);
    }
    setLoading(false);
  }

  function onRowClicked(row: ICompany) {
    history.push(`/admins/companies/${row.id}/productListings`);
  }

  async function onDropdownItemClick(companyId: number, verified: boolean) {
    setLoading(true);
    try {
      await changeVerificationOfCompanyReq({
        adminId: userId,
        accessToken,
        companyId,
        verified: verified === true ? 1 : 0,
      });
      getAdminCompanies();
    } catch (err: any) {
      setErrorMessage(err.response.data);
    }
    setLoading(false);
  }

  useEffect(() => {
    getAdminCompanies();
  }, [pageNumber]);
  return (
    <>
      <ErrorAlert message={errorMessage} setErrorMessage={setErrorMessage} />
      <AdminLayout>
        <h4 className="ms-4 mt-5 mb-4">Companies</h4>
        <div className="table-wrapper ms-4 me-4">
          <CustomDataTableWithPagination
            columns={DATA_TABLE_COLUMNS({ onDropdownItemClick })}
            data={companies}
            isLoading={loading}
            progressComponent={<Spinner animation="border" />}
            onRowClicked={onRowClicked}
            paginationDefaultPage={pageNumber}
            onChangePage={(pageNumber: number) => setPageNumber(pageNumber)}
            paginationTotalRows={totalRows}
            paginationPerPage={pageLimit}
            parameterOfColumns={DATA_TABLE_COLUMNS}
            className="table-row-clickable"
          />
        </div>
      </AdminLayout>
    </>
  );
}

export default Companies;
