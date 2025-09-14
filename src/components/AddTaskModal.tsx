import {
  Modal,
  Stack,
  TextInput,
  Textarea,
  Button,
  MultiSelect,
  type MultiSelectProps,
  Avatar,
  Group,
  Text,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useState } from "react";
import { useTaskFormStore } from "../store/TaskFromStore1";

interface AddTaskModalProps {
  opened: boolean;
  onClose: () => void;
  onAdd: (
    title: string,
    description: string,
    dueDate: string | null,
    assignees: string[]
  ) => void;
}
const usersData: Record<string, { image: string; email: string }> = {
  "Emily Johnson": {
    image:
      "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-7.png",
    email: "emily92@gmail.com",
  },
  "Ava Rodriguez": {
    image:
      "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png",
    email: "ava_rose@gmail.com",
  },
  "Olivia Chen": {
    image:
      "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-4.png",
    email: "livvy_globe@gmail.com",
  },
  "Ethan Barnes": {
    image:
      "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png",
    email: "ethan_explorer@gmail.com",
  },
  "Mason Taylor": {
    image:
      "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png",
    email: "mason_musician@gmail.com",
  },
};

const renderMultiSelectOption: MultiSelectProps["renderOption"] = ({
  option,
}) => (
  <Group gap="sm">
    <Avatar src={usersData[option.value].image} size={36} radius="xl" />
    <div>
      <Text size="sm">{option.value}</Text>
      <Text size="xs" opacity={0.5}>
        {usersData[option.value].email}
      </Text>
    </div>
  </Group>
);

export default function AddTaskModal({
  opened,
  onClose,
  onAdd,
}: AddTaskModalProps) {
  const {
    title,
    description,
    dueDate,
    setTasks,
    setdescription,
    setdueDate,
    resetForm,
  } = useTaskFormStore();
  const [assignees, setAssignees] = useState<string[]>([]);
  const [assigneesError, setAssigneesError] = useState<string>(
    "Assignees is required"
  );
  const options = Object.entries(usersData).map(([name, { image, email }]) => ({
    value: name,
    label: name,
    image,
    email,
  }));

  const handleAdd = () => {
    if (
      !title.trim() ||
      !description.trim() ||
      !dueDate ||
      assignees.length === 0
    ) {
      if (assignees.length === 0) setAssigneesError("Assignees is required");
      return;
    }

    onAdd(title, description, dueDate, assignees);
    onClose();
    resetForm();
    setAssignees([]);
    setAssigneesError("Assignees is required");
  };
  return (
    <Modal opened={opened} onClose={onClose} title="Add Task">
      <Stack>
        <TextInput
          label="Title"
          withAsterisk
          value={title}
          onChange={(e) => setTasks(e.currentTarget.value)}
          error={!title.trim() && "Title is required"}
        />
        <Textarea
          label="Description"
          withAsterisk
          value={description}
          onChange={(e) => setdescription(e.currentTarget.value)}
          error={!description.trim() && "Description is required"}
        />
        <DateInput
          label="Due Date"
          withAsterisk
          valueFormat="ddd MMM DD YYYY"
          minDate={new Date()}
          value={dueDate}
          onChange={(date) => setdueDate(date ? date : null)}
          error={!dueDate ? "Due Date is required" : false}
        />
        <MultiSelect
          data={options}
          value={assignees}
          onChange={(values) => {
            setAssignees(values);
            if (values.length > 0) {
              setAssigneesError("");
            } else {
              setAssigneesError("Assignees is required");
            }
          }}
          renderOption={renderMultiSelectOption}
          maxDropdownHeight={300}
          label="Assignees"
          placeholder="Search for Assignees"
          hidePickedOptions
          searchable
          error={assigneesError}
        />
        {/* เพิ่ม MultiSelect ตรงนี้*/}
        <Button onClick={handleAdd}>Save</Button>
      </Stack>
    </Modal>
  );
}
