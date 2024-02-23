import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "./ui/checkbox";

import { Button } from "./ui/button";
import { toast } from "sonner";
import { Badge } from "./ui/badge";
import { useId, useState } from "react";
import { TrashIcon } from "@radix-ui/react-icons";
import axios from "axios";

const Todo = ({
  id,
  title,
  description,
  completed: status,
  handleDeleteTask,
  url
}) => {
  const [completed, setCompleted] = useState(status);

  const handleStatusChange = async () => {
    try {
      const res = await axios.put(`${url}/tasks/${id}`);
      if (res.data.success) {
        setCompleted(!completed);
        toast.success("Task status changed succesfully");
      }
    } catch (err) {
      toast.error("Something went wrong.");
      console.log(err);
    }
  };

  return (
    <Card className="max-w-sm hover:-translate-y-2 hover:bg-accent hover:text-accent-foreground transition-all duration-300 ease-in-out">
      <CardHeader>
        <Badge
          className="w-fit"
          variant={completed ? "success" : "destructive"}
        >
          {completed ? "Completed" : "Incomplete"}
        </Badge>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between gap-14">
        <Button
          size={"sm"}
          onClick={() => handleDeleteTask(id)}
          variant={"destructive"}
        >
          <TrashIcon className="mr-2 h-4 w-4" /> Delete
        </Button>
        <div className="flex items-center space-x-2">
          <Checkbox
            onCheckedChange={handleStatusChange}
            id={`status${id}`}
            checked={completed}
          />
          <label
            htmlFor={`status${id}`}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Mark Completed
          </label>
        </div>
      </CardFooter>
    </Card>
  );
};

export default Todo;
