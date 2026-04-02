import { render, screen, fireEvent } from "@testing-library/react";
import Input from "@/components/atom/input";

describe("Input component", () => {
  it("renders correctly with given value and placeholder", () => {
    const mockSetValue = jest.fn();
    render(<Input value="test value" setValue={mockSetValue} placeholder="Enter text" />);
    
    const input = screen.getByPlaceholderText("Enter text");
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue("test value");
  });

  it("calls setValue on input change", () => {
    const mockSetValue = jest.fn();
    render(<Input value="" setValue={mockSetValue} />);
    
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "new" } });
    
    expect(mockSetValue).toHaveBeenCalledWith("new");
  });
});
