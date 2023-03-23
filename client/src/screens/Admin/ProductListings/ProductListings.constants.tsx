import React from "react";
import { TableColumn } from "react-data-table-component";
import { BsFillCaretDownFill } from "react-icons/bs";
import CustomStatusBadge from "../../../components/CustomStatusBadge";
import { Dropdown } from "react-bootstrap";
import { PRODUCT_LISTING_STATUSES } from "../../../constants";

export interface IProductListing {
  id: number;
  name: string;
  ready_to_ship: string;
  availability: string;
  status: string;
  description: string;
}

export interface ICompanyData {
  id: number;
  address: string | null;
  business_card_url: string | null;
  companyType: {
    id: number;
    name: string;
    registered_as: string;
  };
  createdAt: number;
  fk_company_type_id: number;
  fk_user_id: number;
  name: string;
  portfolio_url: string | null;
  registration_certificate_url: string | null;
  registration_number: string | null;
  supplied_products: string | null;
  updatedAt: number;
  verified: boolean;
}

export const DATA_TABLE_COLUMNS: ({
  onDropdownItemClick,
}: {
  onDropdownItemClick: (productListingId: number, status: string) => void;
}) => TableColumn<any>[] = ({ onDropdownItemClick }) => [
  {
    name: <b>ID</b>,
    selector: (row: IProductListing) => row.id,
    cell: (row: IProductListing) => row.id,
    width: "80px",
    sortable: true,
  },
  {
    name: <b>Name</b>,
    selector: (row: IProductListing) => row.name,
    cell: (row: IProductListing) => row.name,
  },
  {
    name: <b>Description</b>,
    selector: (row: IProductListing) => row.description,
    cell: (row: IProductListing) => (row.description ? row.description : "NA"),
  },
  {
    name: <b>Ready to Ship</b>,
    selector: (row: IProductListing) => row.ready_to_ship,
    cell: (row: IProductListing) => (
      <CustomStatusBadge
        status={row.ready_to_ship}
        badgeClass={row.ready_to_ship === "Yes" ? "green" : "gray"}
      />
    ),
  },
  {
    name: <b>Availability</b>,
    selector: (row: IProductListing) => row.availability,
    cell: (row: IProductListing) => (
      <CustomStatusBadge
        status={row.availability}
        badgeClass={row.availability === "In stock" ? "blue" : "red"}
      />
    ),
  },
  {
    name: <b>Status</b>,
    selector: (row: IProductListing) => row.status,
    cell: (row: IProductListing) => {
      const CustomToggle = React.forwardRef(
        (
          { onClick }: { onClick: (e: any) => void },
          ref: React.LegacyRef<HTMLAnchorElement>
        ) => (
          <CustomStatusBadge
            status={`${row.status}`}
            icon={<BsFillCaretDownFill />}
            badgeClass={row.status === "Published" ? "green" : "orange"}
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
              {PRODUCT_LISTING_STATUSES.map((status: string, index: number) => (
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
