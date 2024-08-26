import React from "react";
import { Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
function Inputs({ title, value, disabled, type, onChange }) {
  return (
    <div className="col-span-12 sm:col-span-6">
      <label className="block text-sm font-medium text-gray-700">{title}</label>
      {type === "password" ? (
        <Input.Password
          size="large"
          placeholder="input password"
          onChange={onChange}
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
        />
      ) : (
        <Input value={value} disabled={disabled} size="large" />
      )}
    </div>
  );
}

export default Inputs;
