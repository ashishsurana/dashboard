import * as React from "react";
import {
  Input,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import Header from "../../Header";
import type { IData } from "../../../data";

export default function MuiSortableTable({ data: rows }: { data: IData[] }) {
  const [order, setOrder] = React.useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = React.useState<string>("name");
  const [searchQuery, setSearchQuery] = React.useState<string>("");

  const columns = [
    {
      title: "Id",
      key: "id",
    },
    {
      title: "Title",
      key: "title",
    },
    {
      title: "Category",
      key: "category",
    },
    {
      title: "Status",
      key: "status",
    },
    {
      title: "Date",
      key: "date",
      renderer: (time: number) => {
        const date = new Date(time);
        const options: Intl.DateTimeFormatOptions = {
          month: "short",
          day: "2-digit",
          year: "numeric",
        };
        return date.toLocaleDateString(undefined, options);
      },
    },
    {
      title: "Amount",
      key: "amount",
    },
  ];

  const handleSort = (key: string) => {
    const isAsc = orderBy === key && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(key);
  };

  const sortedRows = rows
    .filter(
      (row) =>
        row.id.toLowerCase().includes(searchQuery) ||
        row.title.toLowerCase().includes(searchQuery)
    )
    .sort((a, b) => {
      if (a[orderBy] < b[orderBy]) return order === "asc" ? -1 : 1;
      if (a[orderBy] > b[orderBy]) return order === "asc" ? 1 : -1;
      return 0;
    });

  return (
    <div
      className="border border-gray-200 bg-white shadow-xl rounded-xl p-4"
      data-testid="table"
    >
      <Header title="Data Items">
        <Input
          placeholder="Search by title or ID"
          onChange={(e) => {
            const query = e.target.value.trim().toLowerCase();
            setSearchQuery(query);
          }}
        />
      </Header>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((col) => {
                return (
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === col.key}
                      direction={order}
                      onClick={() => handleSort(col.key)}
                      className="font-semibold"
                    >
                      {col.title}
                    </TableSortLabel>
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>

          <TableBody>
            {sortedRows.map((row) => (
              <TableRow key={row.id}>
                {columns.map((col) => {
                  return (
                    <TableCell>
                      {col.renderer ? col.renderer(row[col.key]) : row[col.key]}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
