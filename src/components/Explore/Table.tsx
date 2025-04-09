import React from "react";
import { Space, Table, Tag, Spin } from "antd";
import type { TableProps } from "antd";
import { useInvoices } from "@/hooks/useInvoice"
import { formatDistanceToNow } from 'date-fns';

interface DataType {
  key: string;
  title: string;
  status: string;
  memo: string;
  updatedAt: string;
}


const columns: TableProps<DataType>["columns"] = [
  {
    title: "Title",
    dataIndex: "title",
    key: "id",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "id",
  },
  {
    title: "Memo",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Created",
    dataIndex: "updatedAt",
    key: "updatedAt"
  }
];


const Table_: React.FC = () => {


  const { data: invoice, isLoading } = useInvoices();
  console.log("Invoices", invoice?.data);


  const filtered = (invoice?.data || []).map((invoice: any) => ({
    ...invoice,
    // updatedAt: formatDistanceToNow(new Date(invoice.updatedAt),
  // Consider adding { addSuffix: true } for "ago" suffix
  id:invoice.id.split(0,5),
  updatedAt: formatDistanceToNow(new Date(invoice.updatedAt), { addSuffix: true })
}));

  if (isLoading) {
    return <div className="flex justify-center h-[100vh] items-center"><Spin /></div>
  }
  return <div className="">
    <Table<DataType> columns={columns} dataSource={filtered} />
  </div>

}

export default Table_;
