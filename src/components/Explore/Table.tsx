import { useInvoices } from "@/hooks/useInvoice";
import type { TableProps } from "antd";
import { Spin, Table, Tag } from "antd";
import { formatDistanceToNow } from "date-fns";
import React from "react";

interface DataType {
  key: string;
  desc: string;
  status: string;
  memo: string;
  updatedAt: string;
}

const columns: TableProps<DataType>["columns"] = [
  {
    title: "Desc",
    dataIndex: "description",
    key: "id",
    defaultSortOrder: "ascend",
    // sorter: (a, b) => a.key - b.key,
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "id",
    render: (status: string) => {
      let color = "green";
      if (status === "Pending") {
        color = "orange";
      } else if (status === "Failed") {
        color = "red";
      }
      return (
        <Tag color={color} key={status}>
          {status.toUpperCase()}
        </Tag>
      );
    },
  },
  {
    title: "Memo",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Created",
    dataIndex: "updatedAt",
    key: "updatedAt",
  },
];

const Table_: React.FC = () => {
  const { data: invoice, isLoading } = useInvoices();
  console.log("Invoices", invoice?.data);

  const filtered = (invoice?.data || []).map((invoice: any) => ({
    ...invoice,
    id: `...${invoice.id.slice(-5)}`,
    updatedAt: formatDistanceToNow(new Date(invoice.updatedAt), {
      addSuffix: true,
    }),
  }));

  if (isLoading) {
    return (
      <div className="flex justify-center h-[100vh] items-center">
        <Spin />
      </div>
    );
  }
  return (
    <div className="">
      <Table<DataType> columns={columns} dataSource={filtered} size="small" />
    </div>
  );
};

export default Table_;
