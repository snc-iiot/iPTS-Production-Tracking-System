import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";

export const CuttingPage = () => {
  return (
    <div className="p-2">
      <Input placeholder="Search" className="w-[15rem] " />
      <Table>
        {/* <TableCaption>Process in Cutting</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Order</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Yield</TableHead>
            <TableHead>Scrap</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">001840033845</TableCell>
            <TableCell>9378909069 CU.9.53X0.7X65 LWC</TableCell>
            <TableCell>1947.000</TableCell>
            <TableCell>0</TableCell>
            <TableCell>0</TableCell>
            <TableCell className="text-right">Complete</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">001840033845</TableCell>
            <TableCell>9378909069 CU.9.53X0.7X65 LWC</TableCell>
            <TableCell>1947.000</TableCell>
            <TableCell>0</TableCell>
            <TableCell>0</TableCell>
            <TableCell className="text-right">Complete</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};
