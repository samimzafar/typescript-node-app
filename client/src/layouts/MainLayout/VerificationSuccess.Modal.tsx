import { ModalProps } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import ActionModal from "../../components/ActionModal";
import SuccessSVG from "../../components/SuccessSVG";

interface ISuccessProps {
  setModalType: (modalType: string) => void;
  setModalSize: (modalSize: ModalProps["size"]) => void;
  setModalBackdrop: (modalBackdrop: ModalProps["backdrop"]) => void;
  toggleModal: () => void;
}

const VerificationSuccess = ({
  setModalType,
  setModalSize,
  setModalBackdrop,
  toggleModal,
}: ISuccessProps) => {
  const onHandleLogin = () => {
    setModalType("login");
    setModalSize(undefined);
    setModalBackdrop(true);
  };

  const onHandleLoginScreen = () => {
    history.push(`/login`);
    toggleModal();
  };

  const history = useHistory();
  return (
    <ActionModal
      ActionElement={<SuccessSVG />}
      body={"Congratulations! Your account has been created"}
      buttonText={"Login to continue"}
      buttonAction={onHandleLoginScreen}
    />
  );
};

export default VerificationSuccess;
