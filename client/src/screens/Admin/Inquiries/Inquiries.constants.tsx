import { TableColumn } from "react-data-table-component";
import moment from "moment";
import {
  DATE_FORMAT_Do_MMMM_YYYY,
  INQUIRY_STATUSES,
  INQUIRY_STATUSES_ARRAY,
} from "../../../constants";
import CustomStatusBadge from "../../../components/CustomStatusBadge";
import { Dropdown } from "react-bootstrap";
import React from "react";
import { BsFillCaretDownFill } from "react-icons/bs";

export interface IInquiry {
  id: number;
  fk_inquiry_by: number;
  fk_company_id: number;
  fk_product_listing_id: number;
  quantity: string;
  variety: string;
  logistical_option: string;
  port_of_landing: string;
  week_of_delivery: number;
  status: string;
  createdAt: number;
  updatedAt: number;
  productListing: {
    name: string;
  };
  inquiryByUser: {
    name: string;
    email: string;
    phone_number: string;
  };
  additional_requirements: string | null;
}

export const DATA_TABLE_COLUMNS: (
  onDropdownItemClick: (inquiryId: number, status: string) => void
) => TableColumn<any>[] = (onDropdownItemClick) => [
  {
    name: <b>ID</b>,
    selector: (row: IInquiry) => row.id,
    cell: (row: IInquiry) => row.id,
    width: "50px",
    sortable: true,
  },
  {
    name: <b>Product Listing</b>,
    selector: (row: IInquiry) => row.productListing.name,
    cell: (row: IInquiry) => row.productListing.name,
  },
  {
    name: <b>QTY/Variety</b>,
    selector: (row: IInquiry) => `${row.quantity}/${row.variety}`,
    cell: (row: IInquiry) => `${row.quantity}/${row.variety}`,
  },
  {
    name: <b>Inquiry By</b>,
    selector: (row: IInquiry) => row.inquiryByUser.name,
    cell: (row: IInquiry) => row.inquiryByUser.name,
  },
  {
    name: <b>Email</b>,
    selector: (row: IInquiry) => row.inquiryByUser.email,
    cell: (row: IInquiry) => row.inquiryByUser.email,
  },
  {
    name: <b>Phone Number</b>,
    selector: (row: IInquiry) => row.inquiryByUser.phone_number,
    cell: (row: IInquiry) => row.inquiryByUser.phone_number,
  },
  {
    name: <b>Status</b>,
    selector: (row: IInquiry) => row.status,
    cell: (row: any) => {
      let displayStatus: string = "";
      if (row.status === INQUIRY_STATUSES.Submitted) {
        displayStatus = "gray";
      } else if (row.status === INQUIRY_STATUSES.Accepted) {
        displayStatus = "green";
      } else if (row.status === INQUIRY_STATUSES.Acknowledged) {
        displayStatus = "orange";
      } else if (row.status === INQUIRY_STATUSES.Rejected) {
        displayStatus = "red";
      } else if (row.status === INQUIRY_STATUSES.ContactEstablished) {
        displayStatus = "blue";
      }

      const CustomToggle = React.forwardRef(
        (
          { onClick }: { onClick: (e: any) => void },
          ref: React.LegacyRef<HTMLAnchorElement>
        ) => (
          <CustomStatusBadge
            status={`${row.status}`}
            icon={<BsFillCaretDownFill />}
            badgeClass={displayStatus}
            onClick={(e) => {
              e.preventDefault();
              onClick(e);
            }}
            ref={ref}
          />
        )
      );

      return (
        <div className="position-relative">
          <Dropdown>
            <Dropdown.Toggle as={CustomToggle}></Dropdown.Toggle>

            <Dropdown.Menu>
              {INQUIRY_STATUSES_ARRAY.map((status: string, index: number) => (
                <Dropdown.Item
                  active={row.status === status}
                  onClick={() => onDropdownItemClick(row.id, status)}
                  key={index}
                >
                  <small>{status}</small>
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      );
    },
  },
];
