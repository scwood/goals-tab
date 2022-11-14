import { Button, Menu } from "@mantine/core";
import {
  IconArrowLeft,
  IconArrowRight,
  IconChevronDown,
  IconPencil,
  IconTrash,
} from "@tabler/icons";

import { Goal } from "./Goal";

const iconSize = 14;

export interface GoalMenuProps {
  goal: Goal;
  moveLeftDisabled: boolean;
  moveRightDisabled: boolean;
  onEdit: (goal: Goal) => void;
  onDelete: (goal: Goal) => void;
  onMoveLeft: (goal: Goal) => void;
  onMoveRight: (goal: Goal) => void;
}

export function GoalMenu(props: GoalMenuProps) {
  const {
    goal,
    moveLeftDisabled,
    moveRightDisabled,
    onEdit,
    onDelete,
    onMoveLeft,
    onMoveRight,
  } = props;

  return (
    <Menu width={150} position="bottom-start">
      <Menu.Target>
        <Button
          mb="xs"
          size="sm"
          compact
          variant="default"
          rightIcon={<IconChevronDown size={iconSize} />}
        >
          {goal.name}
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          disabled={moveLeftDisabled}
          onClick={() => onMoveLeft(goal)}
          icon={<IconArrowLeft size={iconSize} />}
        >
          Move left
        </Menu.Item>
        <Menu.Item
          disabled={moveRightDisabled}
          onClick={() => onMoveRight(goal)}
          icon={<IconArrowRight size={iconSize} />}
        >
          Move right
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item
          onClick={() => onEdit(goal)}
          icon={<IconPencil size={iconSize} />}
        >
          Edit goal
        </Menu.Item>
        <Menu.Item
          color="red"
          onClick={() => onDelete(goal)}
          icon={<IconTrash size={iconSize} />}
        >
          Delete goal
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
