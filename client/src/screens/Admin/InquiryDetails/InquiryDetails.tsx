import AdminLayout from "../../../layouts/AdminLayout/AdminLayout.index";
import APCard from "../../../components/APCard";
import APButton from "../../../components/APButton";
import { Spinner } from "react-bootstrap";
import { getInquiryDetailsReq } from "../../../services/api";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ErrorAlert from "../../../components/ErrorAlert";
import { useHistory } from "react-router";
import { DATE_FORMAT_Do_MMMM_YYYY, INQUIRY_STATUSES } from "../../../constants";
import CustomStatusBadge from "../../../components/CustomStatusBadge";
import CardDetailsRow from "../../../components/CardDetailsRow";
import moment from "moment";

interface IInquiry {
  id: number;
  quantity: string;
  variety: string;
  logistical_option: string;
  port_of_landing: string;
  week_of_delivery: number;
  status: string;
  additional_requirements: string | null;
  productListing: {
    name: string;
    unit: { name: string };
  };
  inquiryByUser: {
    name: string;
    email: string;
    phone_number: string;
  };
}

function InquiryDetails(props: any) {
  // Configuration Variables
  const history = useHistory();
  let inquiryId: number = Number(props.match.params.inquiryId);

  // State Variables
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [inquiry, setInquiry] = useState<IInquiry | null>(null);

  // Store
  const state: any = useSelector((state) => state);
  const { userId, accessToken }: { userId: number; accessToken: string } =
    state.auth;

  async function getInquiryDetails() {
    setLoading(true);
    try {
      const res: {
        data: {
          inquiry: IInquiry;
        };
      } = await getInquiryDetailsReq({
        adminId: userId,
        accessToken,
        inquiryId,
      });
      const { inquiry } = res.data;
      setInquiry(inquiry);
    } catch (err: any) {
      setErrorMessage(err.response.data);
    }
    setLoading(false);
  }

  function generateBadgeClass(status: string) {
    let badgeClass = "";
    switch (status) {
      case INQUIRY_STATUSES.Submitted:
        badgeClass = "gray";
        break;

      case INQUIRY_STATUSES.Accepted:
        badgeClass = "green";
        break;

      case INQUIRY_STATUSES.Acknowledged:
        badgeClass = "orange";
        break;

      case INQUIRY_STATUSES.Rejected:
        badgeClass = "red";
        break;

      case INQUIRY_STATUSES.ContactEstablished:
        badgeClass = "blue";
        break;

      default:
        badgeClass = "gray";
    }
    return badgeClass;
  }

  useEffect(() => {
    getInquiryDetails();
  }, []);

  return (
    <>
      <ErrorAlert message={errorMessage} setErrorMessage={setErrorMessage} />
      <AdminLayout>
        <div className="ms-4 me-4 mt-5 mb-4">
          <h4>Inquiry Details</h4>
        </div>
        <div className="ms-4 me-4">
          <APCard>
            {!loading && inquiry ? (
              <div>
                <CardDetailsRow
                  leftLabel="ID:"
                  leftValue={inquiry.id}
                  rightLabel="Inquiry By:"
                  rightValue={inquiry.inquiryByUser.name}
                />
                <CardDetailsRow
                  leftLabel="Email:"
                  leftValue={inquiry.inquiryByUser.email}
                  rightLabel="Phone Number:"
                  rightValue={inquiry.inquiryByUser.phone_number}
                />
                <CardDetailsRow
                  leftLabel="Product Listing:"
                  leftValue={inquiry.productListing.name}
                  rightLabel="Quantity:"
                  rightValue={`${inquiry.quantity} ${inquiry.productListing.unit.name}`}
                />
                <CardDetailsRow
                  rightLabel="Logistical Option/Port:"
                  rightValue={`${inquiry.logistical_option} / ${inquiry.port_of_landing}`}
                  leftLabel="Preferred Day of Delivery:"
                  leftValue={`${moment
                    .unix(inquiry.week_of_delivery)
                    .format(DATE_FORMAT_Do_MMMM_YYYY)}`}
                />
                <CardDetailsRow
                  leftLabel="Status:"
                  leftValue={
                    <CustomStatusBadge
                      status={inquiry.status}
                      badgeClass={generateBadgeClass(inquiry.status)}
                    />
                  }
                  rightLabel="Additional Requirements:"
                  rightValue={
                    inquiry.additional_requirements
                      ? inquiry.additional_requirements
                      : "N/A"
                  }
                />
              </div>
            ) : loading ? (
              <Spinner animation="border" />
            ) : (
              <div>Inquiry Details not found</div>
            )}
          </APCard>
        </div>
      </AdminLayout>
    </>
  );
}

export default InquiryDetails;
