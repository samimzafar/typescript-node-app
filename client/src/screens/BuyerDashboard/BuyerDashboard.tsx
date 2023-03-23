import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import UnauthorizedAccess from "../../components/UnAuthorizedAccess";
import Layout from "../../layouts/MainLayout/MainLayout.index";
import { ROLES_CONSTANTS } from "../../constants";
import { Col, Container, Row } from "react-bootstrap";
import {
  getAllProductsReq,
  getInquiriesReq,
  getCompaniesInfoReq,
} from "../../services/api";
import ErrorAlert from "../../components/ErrorAlert";
import { IProduct, IInquiries } from "./BuyerDashboard.constants";
import { ICompanyInfo } from "./BuyerDashboard.constants";
import { setLoading } from "./BuyerDashboard.actions";
import Inquiries from "./Dashboard/Inquiries";
import CompanyCard from "./Dashboard/CompanyCard";
import FAQs from "./Dashboard/FAQs";
import TrendingProducts from "./Dashboard/TrendingProducts";
import ContactUs from "./Dashboard/Contactus";

const BuyerDashboard = () => {
  const state: any = useSelector((state) => state);
  const { role, userId, accessToken } = state.auth;
  const isLoading = state.isLoading;
  const pageLimitInquiries = 5;
  const pageLimitCompanies = 1;
  const pageNumber = 1;
  const dispatch = useDispatch();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [products, setProducts] = useState<IProduct[] | []>([]);
  const [inquiries, setInquiries] = useState<IInquiries[] | []>([]);
  const [company, setCompany] = useState<ICompanyInfo | null>(null);

  const getInquiries = async () => {
    dispatch(setLoading(true));
    try {
      const res: {
        data: {
          inquiries: IInquiries[];
        };
      } = await getInquiriesReq(
        userId,
        accessToken,
        pageLimitInquiries,
        pageNumber
      );
      setInquiries(res.data.inquiries);
    } catch (err: any) {
      setErrorMessage(err.response.data);
    }
    dispatch(setLoading(false));
  };

  const getCompanies = async () => {
    dispatch(setLoading(true));
    try {
      const res: {
        data: { companies: ICompanyInfo[] };
      } = await getCompaniesInfoReq(
        userId,
        accessToken,
        pageLimitCompanies,
        pageNumber
      );
      setCompany(res.data.companies[0]);
    } catch (err: any) {
      setErrorMessage(err.response.data);
    }
    dispatch(setLoading(false));
  };

  const getAllProducts = async () => {
    dispatch(setLoading(true));
    try {
      const res: {
        data: { productListings: IProduct[] };
      } = await getAllProductsReq(userId, accessToken);
      setProducts(res.data.productListings);
    } catch (err: any) {
      setErrorMessage(err.response.data);
    }
    dispatch(setLoading(false));
  };

  useEffect(() => {
    getAllProducts();
    getInquiries();
    getCompanies();
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <ErrorAlert message={errorMessage} setErrorMessage={setErrorMessage} />
      <Layout>
        {role === ROLES_CONSTANTS.ROLE_BUYER ? (
          <>
            <div className="container products-catalogue">
              <h2>
                Available <span>Products</span>
              </h2>
              <TrendingProducts products={products} isLoading={isLoading} />
            </div>
            <Container className="section-2 mb-5">
              <Row>
                <Col lg={4} sm={12}>
                  <CompanyCard company={company} isLoading={isLoading} />
                </Col>
                <Col lg={8} sm={12}>
                  <Inquiries inquiries={inquiries} isLoading={isLoading} />
                </Col>
              </Row>
            </Container>
            <Container className="section-3 mb-5">
              <FAQs />
            </Container>
            <Container className="section-3 mb-5">
              <ContactUs />
            </Container>
          </>
        ) : (
          <UnauthorizedAccess message="You are not authorized to view this screen!!!" />
        )}
      </Layout>
    </>
  );
};

export default BuyerDashboard;
