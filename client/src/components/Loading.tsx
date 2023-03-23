import { Spinner } from "react-bootstrap";

interface ILoading {
  loadingClass?: string;
}
function Loading(props: ILoading) {
  return (
    <div className={props.loadingClass ? props.loadingClass : "loader-spinner"}>
      <Spinner animation="border" />
    </div>
  );
}

export default Loading;
