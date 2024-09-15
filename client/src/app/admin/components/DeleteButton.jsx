/*
Delete Button to use confirm on delete, control messages in confirm  dialog
handleDelete function have id of data  to be deleted
*/
import React from "react";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { Modal } from "antd";
import { AiOutlineDelete } from "react-icons/ai";
import { Button } from "@/components/ui/button";
const { confirm } = Modal;

function DeleteButton({ handleDelete, title }) {
  const showPromiseConfirm = () => {
    confirm({
      title: "Are you sure you want to delete this task?",
      icon: <ExclamationCircleFilled />,
      content: title.split(" ").slice(0, 10).join(" ") + " " + "...",
      okType: "danger",
      onOk() {
        return new Promise((resolve, reject) => {
          handleDelete().then(resolve).catch(reject);
        }).catch(() => console.log("Oops, errors occurred!"));
      },
      onCancel() {
        console.log("Cancelled");
      },
    });
  };

  return (
    <Button
      onClick={showPromiseConfirm}
      className="border-red-600 bg-transparent border-[1px] border-solid text-red-700 hover:bg-red-600 hover:text-light duration-100 mx-2"
    >
      <AiOutlineDelete className="mx-1 text-lg" />
    </Button>
  );
}

export default DeleteButton;
