import _ from "lodash";
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface IProps {
  message: string | null;
  setErrorMessage: (message: string | null) => void;
}

function ErrorAlert({ message, setErrorMessage }: IProps) {
  if (message != "") {
    toast.error(message, {
      position: toast.POSITION.TOP_CENTER,
      toastId: "error-toast",
      theme: "colored",
      onClose: () => setErrorMessage(null),
    });
    return <ToastContainer transition={Zoom} />;
  } else {
    return null;
  }
}

export default ErrorAlert;
