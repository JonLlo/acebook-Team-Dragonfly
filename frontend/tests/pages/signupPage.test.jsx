import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

import { useNavigate } from "react-router-dom";
import { signup } from "../../src/services/authentication";

import { SignupPage } from "../../src/pages/Signup/SignupPage";

// Mocking React Router's useNavigate function
vi.mock("react-router-dom", () => {
  const navigateMock = vi.fn();
  const useNavigateMock = () => navigateMock; // Create a mock function for useNavigate
  return { useNavigate: useNavigateMock };
});

// Mocking the signup service
vi.mock("../../src/services/authentication", () => {
  const signupMock = vi.fn();
  return { signup: signupMock };
});

// Reusable function for filling out signup form
async function completeSignupForm() {
  const user = userEvent.setup();

  const emailInputEl = screen.getByLabelText("Email:");
  const passwordInputEl = screen.getByLabelText("Password:");
  const submitButtonEl = screen.getByRole("submit-button");

  await user.type(emailInputEl, "test@email.com");
  await user.type(passwordInputEl, "password1!");
  await user.click(submitButtonEl);
}

describe("Signup Page", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  test("allows a user to signup", async () => {
    render(<SignupPage />);

    await completeSignupForm();

    expect(signup).toHaveBeenCalledWith("test@email.com", "password1!");
  });

  test("navigates to /login on successful signup", async () => {
    render(<SignupPage />);

    const navigateMock = useNavigate();

    await completeSignupForm();

    expect(navigateMock).toHaveBeenCalledWith("/login");
  });

  test("shows error on unsuccessful signup", async () => {
    render(<SignupPage />);

    signup.mockRejectedValue(new Error("Error signing up"));

    await completeSignupForm();

    expect(await screen.findByText("Signup failed. Please try again.")).toBeTruthy();
  });
});

  test("email must be valid", async () => {
    render(<SignupPage />);

    const user = userEvent.setup();

    const emailInputEl = screen.getByLabelText("Email:");
    const passwordInputEl = screen.getByLabelText("Password:");
    const submitButtonEl = screen.getByRole("submit-button");

    await user.type(emailInputEl, "testemail.com");
    await user.type(passwordInputEl, "password1!");
    await user.click(submitButtonEl);

    expect(await screen.findByText("Please enter a valid email address.")).toBeTruthy();
  })

  test("password must be greater than 8 characters", async () => {
    render(<SignupPage />);

    const user = userEvent.setup()

    const emailInputEl = screen.getByLabelText("Email:");
    const passwordInputEl = screen.getByLabelText("Password:");
    const submitButtonEl = screen.getByRole("submit-button");

    await user.type(emailInputEl, "test@email.com");
    await user.type(passwordInputEl, "pass");
    await user.click(submitButtonEl);
    //If the below line shows an errorr, ignore it. Its a recurring issue that
    //doesn't affect functionality
    expect(await screen.findByText("Be at least 8 characters long"));
  })

  test("password must have a digit and special character", async () => {
    render(<SignupPage />);

    const user = userEvent.setup()

    const emailInputEl = screen.getByLabelText("Email:");
    const passwordInputEl = screen.getByLabelText("Password:");
    const submitButtonEl = screen.getByRole("submit-button");
    
    await user.type(emailInputEl, "test@email.com");
    await user.type(passwordInputEl, "password");
    await user.click(submitButtonEl);

    expect(await screen.findByText("Include a number") || screen.findByText("Include a special character"));
  })