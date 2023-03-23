import AdminLayout from "../../../layouts/AdminLayout/AdminLayout.index";
import APCard from "../../../components/APCard";
import APButton from "../../../components/APButton";
import { Spinner } from "react-bootstrap";
import { DATA_TABLE_COLUMNS, ICompanyData } from "./ProductListings.constants";
import {
  getCompanyProductListings,
  changeProductListingStatusReq,
} from "../../../services/api";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ErrorAlert from "../../../components/ErrorAlert";
import CustomDataTableWithPagination from "../../../components/DataTableWIthPagination";
import { BsFillPlusSquareFill, BsFillArrowUpCircleFill } from "react-icons/bs";
import { useHistory } from "react-router";
import { ROLES_CONSTANTS } from "../../../constants";
import CustomStatusBadge from "../../../components/CustomStatusBadge";
import CardDetailsRow from "../../../components/CardDetailsRow";
import CustomModal from "../../../components/Modal";
import UploadDocuments from "./ProductListings.UploadDocuments";

interface ICompanyDocuments {
  registrationCertificateUrl: string | null;
  businessCardUrl: string | null;
  portfolioUrl: string | null;
}

function ProductListings(props: any) {
  // Configuration Variables
  const history = useHistory();
  let companyId: string = props.match.params.companyId;
  let companyIdNum = Number(companyId);

  // State Variables
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [company, setCompany] = useState<any | null>(null);
  const [productListings, setProductListings] = useState<object[] | []>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [totalRows, setTotalRows] = useState<number>(0);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [companyDocuments, setCompanyDocuments] = useState<ICompanyDocuments>({
    registrationCertificateUrl: null,
    businessCardUrl: null,
    portfolioUrl: null,
  });

  const pageLimit = 10;

  // Store
  const state: any = useSelector((state) => state);
  const { userId, accessToken }: { userId: number; accessToken: string } =
    state.auth;

  async function getAllCompanyProductListings() {
    setLoading(true);
    try {
      const res: {
        data: {
          productListings: object[];
          company: ICompanyData;
          total: number;
        };
      } = await getCompanyProductListings({
        adminId: userId,
        accessToken,
        companyId: companyIdNum,
        pageLimit,
        pageNumber,
      });
      const { total, company, productListings } = res.data;
      setCompanyDocuments({
        registrationCertificateUrl: company.registration_certificate_url,
        portfolioUrl: company.portfolio_url,
        businessCardUrl: company.business_card_url,
      });
      setTotalRows(total);
      setCompany(company);
      setProductListings(productListings);
    } catch (err: any) {
      setErrorMessage(err.response.data);
    }
    setLoading(false);
  }

  function onAddNewProductClick() {
    history.push("addProduct");
  }

  async function onDropdownItemClick(productListingId: number, status: string) {
    setLoading(true);
    try {
      await changeProductListingStatusReq({
        adminId: userId,
        accessToken,
        companyId: companyIdNum,
        productListingId,
        status,
      });
      getAllCompanyProductListings();
    } catch (err: any) {
      setErrorMessage(err.response.data);
    }
    setLoading(false);
  }

  function onUploadClick() {
    setModalVisible(true);
  }

  function ModalContent() {
    return (
      <div className="p-4">
        <h4>Upload Documents</h4>
        <UploadDocuments
          setModalVisible={setModalVisible}
          getAllCompanyProductListings={getAllCompanyProductListings}
          companyDocuments={companyDocuments}
        />
      </div>
    );
  }

  useEffect(() => {
    getAllCompanyProductListings();
  }, [pageNumber]);

  return (
    <>
      <ErrorAlert message={errorMessage} setErrorMessage={setErrorMessage} />
      <CustomModal
        title="UploadDocuments"
        hide={() => setModalVisible(!modalVisible)}
        show={modalVisible}
        size={"lg"}
        backdrop={true}
      >
        {ModalContent()}
      </CustomModal>
      <AdminLayout>
        <div className="ms-4 me-4 mt-5 mb-4 d-flex justify-content-between align-items-center">
          <h4>Product Listings</h4>
          {company?.companyType.registered_as ===
            ROLES_CONSTANTS.ROLE_SELLER && (
            <APButton onClick={onAddNewProductClick}>
              Add New Product <BsFillPlusSquareFill className="ms-2 mb-1" />
            </APButton>
          )}
        </div>
        <div className="ms-4 me-4">
          <APCard>
            <div className="mb-2">
              <b>Company Details:</b>
            </div>
            {!loading && company ? (
              <div>
                <CardDetailsRow
                  leftLabel="Name:"
                  leftValue={company.name}
                  rightLabel="Company Type:"
                  rightValue={company.companyType.name}
                />
                <CardDetailsRow
                  leftLabel="Verified:"
                  leftValue={
                    <CustomStatusBadge
                      status={
                        company.verified === true ? "Verified" : "Not Verified"
                      }
                      badgeClass={company.verified === true ? "green" : "red"}
                    />
                  }
                  rightLabel="Supplied Products:"
                  rightValue={
                    company.supplied_products
                      ? company.supplied_products
                      : "N/A"
                  }
                />
                <CardDetailsRow
                  leftLabel="Address:"
                  leftValue={company.address ? company.address : "N/A"}
                />
              </div>
            ) : loading ? (
              <Spinner animation="border" />
            ) : (
              <div>Company Details not found</div>
            )}
            <div className="mb-2 mt-4 d-flex justify-content-between align-items-center">
              <b>Company Documents:</b>
              <APButton onClick={onUploadClick}>
                Upload <BsFillArrowUpCircleFill className="ms-2 mb-1" />
              </APButton>
            </div>
            {!loading && company ? (
              company ? (
                <div>
                  <div className="d-flex align-items-center mb-2">
                    <div className="text-secondary">
                      Registration Certificate:
                    </div>
                    {company.registration_certificate_url ? (
                      <div className="company-doc-img-wrapper ms-3">
                        <a
                          href={company.registration_certificate_url}
                          target="__blank"
                        >
                          View Document
                        </a>
                      </div>
                    ) : (
                      <div className="ms-3">N/A</div>
                    )}
                  </div>
                  <div className="d-flex align-items-center mb-2">
                    <div className="text-secondary">Business Card:</div>
                    {company.business_card_url ? (
                      <div className="company-doc-img-wrapper ms-3">
                        <a href={company.business_card_url} target="__blank">
                          View Document
                        </a>
                      </div>
                    ) : (
                      <div className="ms-3">N/A</div>
                    )}
                  </div>
                  <div className="d-flex align-items-center">
                    <div className="text-secondary">Portfolio:</div>
                    {company.portfolio_url ? (
                      <div className="company-doc-img-wrapper ms-3">
                        <a href={company.portfolio_url} target="__blank">
                          View Document
                        </a>
                      </div>
                    ) : (
                      <div className="ms-3">N/A</div>
                    )}
                  </div>
                </div>
              ) : (
                <div>
                  No documents found. Kindly upload documents for the company.
                </div>
              )
            ) : loading ? (
              <Spinner animation="border" />
            ) : (
              <div>Company Details not found</div>
            )}
            <div className="mb-2 mt-4">
              <b>Product Listings:</b>
            </div>
            <div className="table-wrapper">
              <CustomDataTableWithPagination
                columns={DATA_TABLE_COLUMNS({ onDropdownItemClick })}
                data={productListings}
                isLoading={loading}
                progressComponent={<Spinner animation="border" />}
                paginationDefaultPage={pageNumber}
                onChangePage={(pageNumber: number) => setPageNumber(pageNumber)}
                paginationTotalRows={totalRows}
                paginationPerPage={pageLimit}
                parameterOfColumns={DATA_TABLE_COLUMNS}
                className="table-row-clickable"
              />
            </div>
          </APCard>
        </div>
      </AdminLayout>
    </>
  );
}

export default ProductListings;
