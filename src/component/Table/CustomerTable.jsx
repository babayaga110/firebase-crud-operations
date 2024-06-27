import * as React from "react";
import { Table, Button, IconButton } from "@mui/joy";
import { Edit, PersonRemove } from "@mui/icons-material";

const rows = [
  { name: "Frozen yoghurt", calories: 159, fat: 6.0, carbs: 24, protein: 4.0 },
];

export default function CustomerTable({ customers, handleDelete, handleUpdate }) {
  return (
    <Table sx={{ "& thead th:nth-child(1)": { width: "40%" } }}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Skills</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {customers?.map((row) => (
          <tr key={row?.id}>
            <td>{row?.customerName}</td>
            <td>{row?.email}</td>
            <td>{row?.role}</td>
            <td>{row?.skills}</td>
            <td
              style={{
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <IconButton
                variant="solid"
                color="neutral"
                onClick={() => {
                  handleUpdate({
                    isOpen: true,
                    type: "update",
                    id: row?.id,
                  });
                }}
              >
                <Edit />
              </IconButton>
              <IconButton
                variant="solid"
                color="danger"
                onClick={() => {
                  handleDelete({
                    isOpen: true,
                    type: "delete",
                    id: row?.id,
                  });
                }}
              >
                <PersonRemove />
              </IconButton>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
