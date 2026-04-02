import { render, screen, fireEvent } from "@testing-library/react";
import Button from "@/components/atom/button";

describe("Button component", () => {
  it("renders children correctly", () => {
    render(<Button>Click Me</Button>);
    expect(
      screen.getByRole("button", { name: "Click Me" }),
    ).toBeInTheDocument();
  });

  it("applies passed className along with defaults", () => {
    render(<Button className="custom-class">Styled</Button>);
    const btn = screen.getByRole("button", { name: "Styled" });
    expect(btn).toHaveClass("custom-class");
    expect(btn).toHaveClass("bg-blue-900");
  });

  it("handles onClick and disabled props", () => {
    const handleClick = jest.fn();
    const { rerender } = render(<Button onClick={handleClick}>Action</Button>);

    const btn = screen.getByRole("button", { name: "Action" });
    fireEvent.click(btn);
    expect(handleClick).toHaveBeenCalledTimes(1);

    rerender(
      <Button onClick={handleClick} disabled>
        Action
      </Button>,
    );
    expect(btn).toBeDisabled();

    fireEvent.click(btn);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
