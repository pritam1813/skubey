import React from "react";
import { render } from "@testing-library/react";
import ThemeButton from "@/components/Buttons/ThemeLinkButton";
import "@testing-library/jest-dom";

describe("ThemeButton", () => {
  it("renders correctly with given title and href", () => {
    const { getByText } = render(
      <ThemeButton title="Test Button" href="/test" />
    );
    const linkElement = getByText("Test Button");
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", "/test");
  });

  it("applies the correct classes", () => {
    const { getByText } = render(
      <ThemeButton title="Test Button" href="/test" />
    );
    const linkElement = getByText("Test Button");
    expect(linkElement).toHaveClass(
      "tw-text-sm lg:tw-text-base tw-bg-primary tw-text-secondary hover:tw-bg-primaryHover hover:tw-text-primary tw-no-underline tw-py-2.5 tw-px-5 tw-rounded-pillcustom tw-transition-all tw-duration-500 tw-ease-in-out"
    );
  });
});
