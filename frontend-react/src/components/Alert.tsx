import { ReactNode } from "react";

interface Props {
  color: string;
  children: ReactNode;
  onClose: () => void;
}
const Alert = ({ color, children, onClose }: Props) => {
  return (
    <div
      className={
        "alert alert-" +
        color +
        " d-flex align-items-center alert-dismissible fade show"
      }
      role="alert"
    >
      {children}
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
        onClick={onClose}
      ></button>
    </div>
  );
};

export default Alert;
