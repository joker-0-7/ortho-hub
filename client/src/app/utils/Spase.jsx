import { Select, Space } from "antd";
import React from "react";

function SpaceCom({
  defaultValue1,
  onChange,
  options1,
  defaultValue2,
  options2,
}) {
  return (
    <Space wrap className="w-full grid grid-cols-1 sm:grid-cols-2">
      <Select
        size="large"
        defaultValue={defaultValue1}
        className="w-full"
        onChange={(e) => {
          onChange("subject", e);
        }}
        options={options1}
      />
      <Select
        size="large"
        defaultValue={defaultValue2}
        name="source"
        onChange={(e) => {
          onChange("source", e);
        }}
        className="w-full"
        options={options2}
      />
    </Space>
  );
}

export default SpaceCom;
