import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

import { Goal } from "./Goal";

export interface GoalModalProps {
  goal?: Goal;
  onClose?: () => void;
  onSave?: (title: string, timesPlanned: number) => void;
  onDelete?: () => void;
}

export function GoalModal(props: GoalModalProps) {
  const { goal, onClose, onSave, onDelete } = props;
  const [title, setTitle] = useState(goal?.title || "");
  const [timesPlannedString, setTimesPlannedString] = useState("3");

  const isValidTitle = title.length > 0;
  const isValidTimesPlanned = parseInt(timesPlannedString) > 0;
  const isValid = isValidTimesPlanned && isValidTitle;

  return (
    <Modal show={true} size="sm" centered>
      <Modal.Header>
        <Modal.Title>{goal ? "Edit goal" : "Create goal"} </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Label>Goal name</Form.Label>
        <Form.Control
          className="mb-2"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="example: Go to the gym"
        />
        <Form.Label>Times per week</Form.Label>
        <Form.Control
          value={timesPlannedString}
          onChange={(event) => setTimesPlannedString(event.target.value)}
          placeholder="example: 3"
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="light" size="sm" onClick={onClose}>
          Close
        </Button>
        {goal && (
          <Button variant="danger" size="sm" onClick={onDelete}>
            Delete
          </Button>
        )}
        <Button
          variant="primary"
          size="sm"
          onClick={() => onSave?.(title, parseInt(timesPlannedString))}
          disabled={!isValid}
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
