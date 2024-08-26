import { Button } from "antd";

function ButtonComponent({ onClick, title, danger, className }) {
  return (
    <Button
      type="primary"
      danger={danger ? true : false}
      size="large"
      className={className ? className : ""}
      onClick={onClick}
    >
      {title}
    </Button>
  );
}

export default ButtonComponent;
