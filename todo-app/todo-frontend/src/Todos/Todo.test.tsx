import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, vi, test, expect } from "vitest";
import Todo, { TodoItem } from "./Todo";


describe("Todo", () => {
  test("renders text and status", () => {
    const todo: TodoItem = { id: "1", text: "Write tests", done: false };

    render(
      <Todo todo={todo} onToggle={() => {}} onDelete={() => {}} />
    );

    expect(screen.getByText("Write tests")).toBeInTheDocument();
    expect(screen.getByText(/not done/i)).toBeInTheDocument();
  });

  test("calls handlers when buttons are clicked", async () => {
    const user = userEvent.setup();

    const todo: TodoItem = { id: "1", text: "Write tests", done: false };
    const onToggle = vi.fn();
    const onDelete = vi.fn();

    render(<Todo todo={todo} onToggle={onToggle} onDelete={onDelete} />);

    await user.click(screen.getByRole("button", { name: /toggle/i }));
    expect(onToggle).toHaveBeenCalledTimes(1);
    expect(onToggle).toHaveBeenCalledWith(todo);

    await user.click(screen.getByRole("button", { name: /delete/i }));
    expect(onDelete).toHaveBeenCalledTimes(1);
    expect(onDelete).toHaveBeenCalledWith(todo);
  });
});