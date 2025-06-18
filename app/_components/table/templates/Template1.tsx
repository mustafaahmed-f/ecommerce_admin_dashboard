"use client";

import type { Table } from "@tanstack/react-table";
import { useParams } from "next/navigation";

interface Template1Props {
  data: any;
  tableInstance: Table<any>;
  config: any;
}

function Template1({ data, tableInstance, config }: Template1Props) {
  const { module } = useParams();
  return <div>table of {module}</div>;
}

export default Template1;
