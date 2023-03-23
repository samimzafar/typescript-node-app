import { Col, Container, Row } from "react-bootstrap";
import CustomAccordion from "../../../components/CustomAccordion";
import { FAQS } from "./Dashboard.constants";

const FAQs = () => {
  return (
    <Container>
      <Row>
        <Col>
          <h2>
            FAQ
            <span className="text-lowercase">s</span>
          </h2>
        </Col>
      </Row>
      <Row className="faq-container">
        <Col>
          <CustomAccordion itemsArray={FAQS} />
        </Col>
      </Row>
    </Container>
  );
};

export default FAQs;
