import { BsGrid1X2Fill, BsBuilding, BsJournalText } from "react-icons/bs";

interface ISideNavItem {
  to: string;
  icon: JSX.Element;
  name: string;
}

export const SIDENAV_ITEMS: ISideNavItem[] = [
  {
    to: "/admin",
    icon: <BsGrid1X2Fill className="bi me-3 mb-1" />,
    name: "Dashboard",
  },
  {
    to: "/admins/companies",
    icon: <BsBuilding className="bi me-3 mb-1" />,
    name: "Companies",
  },
  {
    to: "/admins/inquiries",
    icon: <BsJournalText className="bi me-3 mb-1" />,
    name: "Inquiries",
  },
];

export const ACTIONS = {
  LOGOUT_USER: "logout",
};
