import React from "react";
import Layout from "../../layouts/MainLayout/MainLayout.index";
import { useSelector } from "react-redux";
import { ROLES_CONSTANTS } from "../../constants";
import UnauthorizedAccess from "../../components/UnAuthorizedAccess";
import Alert from "../../components/Alert";
import { Container, Row, Col } from "react-bootstrap";

const SellerDashboard = () => {
  const state: any = useSelector((state) => state);
  const { role } = state.auth;
  return (
    <>
      <Layout>
        {role === ROLES_CONSTANTS.ROLE_SELLER ? (
          <Container className="seller-dashboard-container">
            <Row>
              <Col lg={{ span: 6, offset: 3 }} md={12} sm={12}>
                <Alert
                  alertType="warning"
                  alertMsg="We have received your information. Our team will reach out to you shortly to set up your dashboard."
                />
              </Col>
            </Row>
          </Container>
        ) : (
          <UnauthorizedAccess message="You are not authorized to view this screen!!!" />
        )}
      </Layout>
    </>
  );
};

export default SellerDashboard;
