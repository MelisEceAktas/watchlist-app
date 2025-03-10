import { ReactNode } from "react";

interface Props {
  color: string;
  children: ReactNode;
  onClick: () => void;
}
export const Button = ({ color, children, onClick }: Props) => {
  return (
    <button
      className={"btn btn-" + color}
      onClick={onClick}
      style={{ margin: "10px", padding: "10px 20px" }}
    >
      {children}
    </button>
  );
};
