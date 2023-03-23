import React, { useState, useEffect } from "react";
import Layout from "../../layouts/MainLayout/MainLayout.index";
import { useSelector, useDispatch } from "react-redux";
import CustomDataTableWithPagination from "../../components/DataTableWIthPagination";
import user from "../../assets/images/dummyImages/user.jpg";
import Loading from "../../components/Loading";
import { getProductListingsReq } from "../../services/api";
import { useHistory } from "react-router-dom";
import { setLoading } from "./ProductListings.actions";
import ErrorAlert from "../../components/ErrorAlert";
import { ROLES_CONSTANTS } from "../../constants";
import { columns, IProductListing } from "./ProductListings.constants";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { FiAlertCircle } from "react-icons/fi";
import Breadcrumb from "../../components/Breadcrumb";
import UnauthorizedAccess from "../../components/UnAuthorizedAccess";

const ProductListings = () => {
  const state: any = useSelector((state) => state);
  const {
    accessToken,
    companyName,
    country,
    companyType,
    role,
    phoneNumber,
    companyVerified,
    userId,
    companyId,
  } = state.auth;
  const isLoading = state.isLoading;

  const dispatch = useDispatch();
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const [productLisitings, setProductListings] = useState<
    IProductListing[] | []
  >([]);
  const pageLimit = 10;

  const getProductListing = async () => {
    dispatch(setLoading(true));
    try {
      const res: {
        data: {
          previousPage: number | null;
          currentPage: number;
          nextPage: number | null;
          total: number;
          limit: number;
          productListings: IProductListing[] | [];
        };
      } = await getProductListingsReq(
        accessToken,
        userId,
        companyId,
        pageNumber,
        pageLimit
      );
      setProductListings(res.data.productListings);
      setTotalRows(res.data.total);
    } catch (err: any) {
      setErrorMessage(err.response.data);
    }
    dispatch(setLoading(false));
  };

  const onView = (row: IProductListing) => {
    console.log(row);
    history.push(`productListings/${row.id}/view`);
  };

  useEffect(() => {
    {
      role === ROLES_CONSTANTS.ROLE_SELLER && getProductListing();
    }
  }, [pageNumber]);

  return (
    <>
      {isLoading && <Loading />}
      <ErrorAlert message={errorMessage} setErrorMessage={setErrorMessage} />
      <Layout>
        <Breadcrumb breadcrumbs={{ currentStep: "Company" }} />
        {role === ROLES_CONSTANTS.ROLE_ADMIN ? (
          <section className="checkout spad">
            <div className="container">
              <div className="row">
                <div className="col-lg-3 col-md-6 mb-5">
                  <div className="checkout__order tg-company-div">
                    <div className="company-details-heading">
                      <div className="d-flex flex-row justify-content-start align-items-center">
                        <img className="me-3" src={user} alt="logo" />
                        <div className="d-flex flex-column align-items-start">
                          <h4>{companyName}</h4>
                          {companyVerified ? (
                            <span className="verified">
                              Verified <AiOutlineCheckCircle />
                            </span>
                          ) : (
                            <span className="not-verified ">
                              Verification Needed <FiAlertCircle />
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <ul className="mt-2 mb-5">
                      <li>
                        Type <span>{companyType}</span>
                      </li>
                      <li>
                        Country <span>{country}</span>
                      </li>
                      <li>
                        Phone <span>{phoneNumber}</span>
                      </li>
                    </ul>
                    <button
                      type="submit"
                      className="site-btn"
                      onClick={() =>
                        history.push(
                          `/users/${userId}/companies/${companyId}/productListings/addNew`
                        )
                      }
                    >
                      Add a Product
                    </button>
                    <button type="submit" className="site-btn">
                      Verify
                    </button>
                  </div>
                </div>
                <div className="col-lg-9 col-md-6">
                  <h4>Recent Listings</h4>
                  <CustomDataTableWithPagination
                    progressComponent={<Loading />}
                    paginationDefaultPage={1}
                    paginationPerPage={pageLimit}
                    isLoading={isLoading}
                    columns={columns(onView)}
                    onChangePage={(pageNumber: number) =>
                      setPageNumber(pageNumber)
                    }
                    paginationTotalRows={totalRows}
                    onRowClicked={() => console.log("clicked row")}
                    data={productLisitings}
                    parameterOfColumns={() => console.log("clicked row")}
                  />
                </div>
              </div>
            </div>
          </section>
        ) : (
          <UnauthorizedAccess message="You are not authorized to view this screen as a buyer!!!" />
        )}
      </Layout>
    </>
  );
};

export default ProductListings;
