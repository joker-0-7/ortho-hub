import { Pagination } from "antd";

function PaginationComp({
  current,
  onChange,
  count,
  pageSize,
  onShowSizeChange,
}) {
  return (
    <Pagination
      current={current}
      onChange={onChange}
      total={count}
      pageSize={pageSize}
      showSizeChanger
      onShowSizeChange={onShowSizeChange}
    />
  );
}

export default PaginationComp;
