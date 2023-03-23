import AdminLayout from "../../../layouts/AdminLayout/AdminLayout.index";
import { Spinner } from "react-bootstrap";
import {
  getInquiriesByAdminReq,
  changeInquiryStatusReq,
} from "../../../services/api";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ErrorAlert from "../../../components/ErrorAlert";
import { DATA_TABLE_COLUMNS, IInquiry } from "./Inquiries.constants";
import CustomDataTableWithPagination from "../../../components/DataTableWIthPagination";
import { useHistory } from "react-router";

function Inquiries() {
  // State Variables
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [inquiries, setInquiries] = useState<object[] | []>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [totalRows, setTotalRows] = useState<number>(0);
  const pageLimit = 10;

  // Store
  const state: any = useSelector((state) => state);
  const { accessToken, userId }: { accessToken: string; userId: number } =
    state.auth;

  // Configuration Variables
  const history = useHistory();

  async function getInquiries() {
    setLoading(true);
    try {
      const res: {
        data: {
          previousPage: number | null;
          currentPage: number;
          nextPage: number | null;
          total: number;
          limit: number;
          inquiries: IInquiry[];
        };
      } = await getInquiriesByAdminReq(
        userId,
        accessToken,
        pageLimit,
        pageNumber
      );
      const { total, inquiries } = res.data;
      setTotalRows(total);
      setInquiries(inquiries);
    } catch (err: any) {
      setErrorMessage(err.response.data);
    }
    setLoading(false);
  }

  async function onDropdownItemClick(inquiryId: number, status: string) {
    setLoading(true);
    try {
      await changeInquiryStatusReq({
        adminId: userId,
        accessToken,
        inquiryId,
        status,
      });
      getInquiries();
    } catch (err: any) {
      setErrorMessage(err.response.data);
    }
    setLoading(false);
  }

  function onRowClicked(value: { id: number }) {
    history.push(`inquiries/${value.id}`);
  }

  useEffect(() => {
    getInquiries();
  }, [pageNumber]);
  return (
    <>
      <ErrorAlert message={errorMessage} setErrorMessage={setErrorMessage} />
      <AdminLayout>
        <h4 className="ms-4 mt-5 mb-4">Inquiries</h4>
        <div className="table-wrapper ms-4 me-4">
          <CustomDataTableWithPagination
            columns={DATA_TABLE_COLUMNS(onDropdownItemClick)}
            data={inquiries}
            isLoading={loading}
            progressComponent={<Spinner animation="border" />}
            paginationDefaultPage={pageNumber}
            onChangePage={(pageNumber: number) => setPageNumber(pageNumber)}
            paginationTotalRows={totalRows}
            paginationPerPage={pageLimit}
            parameterOfColumns={DATA_TABLE_COLUMNS}
            className="table-row-clickable"
            onRowClicked={onRowClicked}
          />
        </div>
      </AdminLayout>
    </>
  );
}

export default Inquiries;
