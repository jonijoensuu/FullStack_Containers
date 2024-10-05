import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Todo from "./Todo";

describe("Todo Component", () => {
  const mockDeleteTodo = jest.fn();
  const mockCompleteTodo = jest.fn();

  const todo = {
    id: 1,
    text: "Sample Todo",
    done: false,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders the todo text", () => {
    const { getByText } = render(
      <Todo
        todo={todo}
        deleteTodo={mockDeleteTodo}
        completeTodo={mockCompleteTodo}
      />
    );
    expect(getByText("Sample Todo")).toBeInTheDocument();
  });

  test("displays not done info when todo is not done", () => {
    const { getByText } = render(
      <Todo
        todo={todo}
        deleteTodo={mockDeleteTodo}
        completeTodo={mockCompleteTodo}
      />
    );
    expect(getByText("This todo is not done")).toBeInTheDocument();
    expect(getByText("Delete")).toBeInTheDocument();
    expect(getByText("Set as done")).toBeInTheDocument();
  });

  test("displays done info when todo is done", () => {
    const doneTodo = { ...todo, done: true };
    const { getByText, queryByText } = render(
      <Todo
        todo={doneTodo}
        deleteTodo={mockDeleteTodo}
        completeTodo={mockCompleteTodo}
      />
    );
    expect(getByText("This todo is done")).toBeInTheDocument();
    expect(getByText("Delete")).toBeInTheDocument();
    expect(queryByText("Set as done")).toBeNull();
  });

  test("calls deleteTodo when Delete button is clicked", () => {
    const { getByText } = render(
      <Todo
        todo={todo}
        deleteTodo={mockDeleteTodo}
        completeTodo={mockCompleteTodo}
      />
    );
    fireEvent.click(getByText("Delete"));
    expect(mockDeleteTodo).toHaveBeenCalledWith(todo);
  });

  test("calls completeTodo when Set as done button is clicked", () => {
    const { getByText } = render(
      <Todo
        todo={todo}
        deleteTodo={mockDeleteTodo}
        completeTodo={mockCompleteTodo}
      />
    );
    fireEvent.click(getByText("Set as done"));
    expect(mockCompleteTodo).toHaveBeenCalledWith(todo);
  });
});
