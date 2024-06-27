import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import {
  DialogTitle,
  DialogContent,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Textarea,
  Button,
  ModalClose,
  ModalDialog
} from "@mui/joy";

export default function Update(
    { control, handleSubmit, onSubmit }
) {
  return (
    <ModalDialog
    sx={{
      width: "100%",
      mx: "auto",
      maxWidth: 400,
      p: 2,
    }}
  >
      <DialogTitle>
        Update Customer
        <ModalClose />
      </DialogTitle>
      <DialogContent>Fill in the information of the Customer.</DialogContent>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Controller
              name="customerName"
              control={control}
              render={({ field }) => <Input {...field} required />}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Role</FormLabel>
            <Controller
              name="role"
              control={control}
              render={({ field }) => <Input {...field} required />}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Controller
              name="email"
              control={control}
              render={({ field }) => <Input {...field} required type="email" />}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Skills</FormLabel>
            <Controller
              name="skills"
              control={control}
              render={({ field }) => (
                <Textarea {...field} required minRows={3} />
              )}
            />
          </FormControl>
          <Button type="submit">Update</Button>
        </Stack>
      </form>
    </ModalDialog>
  );
}
