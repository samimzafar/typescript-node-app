import { TableColumn } from "react-data-table-component";
import CustomStatusBadge from "../../../components/CustomStatusBadge";
import { BsFillCaretDownFill } from "react-icons/bs";
import { Dropdown } from "react-bootstrap";
import React from "react";
import { COMPANY_VERIFICATION_DROPDOWN_OPTIONS } from "../../../constants";

export interface ICompany {
  id: number;
  name: string;
  verified: 0 | 1;
  supplied_products: string | null;
  companyType: {
    name: string;
    registered_as: string;
  };
}

export const DATA_TABLE_COLUMNS: ({
  onDropdownItemClick,
}: {
  onDropdownItemClick: (companyId: number, verified: boolean) => void;
}) => TableColumn<any>[] = ({ onDropdownItemClick }) => [
  {
    name: <b>ID</b>,
    selector: (row: ICompany) => row.id,
    cell: (row: ICompany) => row.id,
    width: "80px",
    sortable: true,
  },
  {
    name: <b>Name</b>,
    selector: (row: ICompany) => row.name,
    cell: (row: ICompany) => row.name,
  },
  {
    name: <b>Type</b>,
    selector: (row: ICompany) => row.companyType.name,
    cell: (row: ICompany) => row.companyType.name,
  },
  {
    name: <b>Registered As</b>,
    selector: (row: ICompany) => row.companyType.registered_as,
    cell: (row: ICompany) => row.companyType.registered_as,
  },
  {
    name: <b>Supplied Products</b>,
    selector: (row: any) => row.supplied_products,
    cell: (row: ICompany) =>
      row.supplied_products ? row.supplied_products : "NA",
  },
  {
    name: <b>Verified</b>,
    selector: (row: ICompany) => row.verified,
    cell: (row: ICompany) => {
      const CustomToggle = React.forwardRef(
        (
          { onClick }: { onClick: (e: any) => void },
          ref: React.LegacyRef<HTMLAnchorElement>
        ) => (
          <CustomStatusBadge
            status={row.verified === 1 ? "Verified" : "Not Verified"}
            icon={<BsFillCaretDownFill />}
            badgeClass={row.verified === 1 ? "green" : "red"}
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
              {COMPANY_VERIFICATION_DROPDOWN_OPTIONS.map(
                (status: string, index: number) => (
                  <Dropdown.Item
                    active={row.verified === (status === "Verified" ? 1 : 0)}
                    onClick={() =>
                      onDropdownItemClick(
                        row.id,
                        status === "Verified" ? true : false
                      )
                    }
                    key={index}
                  >
                    <small>{status}</small>
                  </Dropdown.Item>
                )
              )}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      );
    },
  },
];
