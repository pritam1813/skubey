import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Header from "@/components/Header";

describe("Header", () => {
  it("renders a heading", () => {
    render(<Header />);

    const heading = screen.getByText("Header");

    expect(heading).toBeInTheDocument();
  });
});
