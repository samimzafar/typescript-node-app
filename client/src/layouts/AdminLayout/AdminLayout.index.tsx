import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { SIDENAV_ITEMS } from "./AdminLayout.constants";
import adminImagePath from "../../assets/images/adminDummyDp.png";
import logoDark from "../../assets/images/logoDark.png";
import APButton from "../../components/APButton";
import { BiLogOut } from "react-icons/bi";
import { logoutUser } from "./AdminLayout.actions";
import { useHistory } from "react-router-dom";

function AdminLayout({ children }: { children: JSX.Element | JSX.Element[] }) {
  const state: any = useSelector((state) => state);
  const { name }: { name: string } = state.auth;
  const dispatch: any = useDispatch();
  const history = useHistory();

  const onHandleLogout = () => {
    dispatch(logoutUser());
    history.push(`/login`);
  };

  return (
    <div className="admin-layout-wrapper">
      <div className="d-flex flex-column flex-shrink-0 p-3 bg-light side-nav-wrapper">
        <a href="/" className="w-100 text-center">
          <div className="mb-2">
            <img src={logoDark} className="side-nav-logo" />
          </div>
          <h5 className="link-dark">
            <b>Admin Portal</b>
          </h5>
        </a>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
          {SIDENAV_ITEMS.map((item, i) => (
            <li key={i} className="nav-item">
              <NavLink
                to={item.to}
                className="nav-link link-dark"
                aria-current="page"
              >
                {item.icon}
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
        <hr />
        <div className="dropdown d-flex justify-content-between">
          <a
            href="#"
            className="d-flex align-items-center link-dark text-decoration-none"
          >
            <img
              src={adminImagePath}
              alt=""
              width="32"
              height="32"
              className="rounded-circle me-2"
            />
            <strong>{name}</strong>
          </a>
          <BiLogOut
            onClick={onHandleLogout}
            className="mt-1 cursor-pointer"
            size={25}
          />
        </div>
      </div>
      <div className="container-wrapper">{children}</div>
    </div>
  );
}

export default AdminLayout;
