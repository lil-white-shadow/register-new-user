import { render, screen } from '@testing-library/react';
import UserForm from './UserForm';

test('renders Labels', () => {
  render(<UserForm />);
  const nameLabel = screen.getByLabelText("Name");
  const emailLabel = screen.getByLabelText("Email");
  const passwordLabel = screen.getByLabelText("Password");
  const occupationLabel = screen.getByLabelText("Occupation");
  const stateLabel = screen.getByLabelText("State");

  expect(nameLabel && emailLabel && passwordLabel && occupationLabel && stateLabel).toBeInTheDocument();
});

test('renders text input fields with placeholder', () => {
  render(<UserForm />);
  const nameInput = screen.getAllByPlaceholderText("Enter your name");
  const emailInput = screen.getByPlaceholderText("Enter your email");
  const passwordInput = screen.getByPlaceholderText("Enter a secure password");

  expect(nameInput && emailInput && passwordInput).toBeInTheDocument();
});

test('renders dropdown inputs with default option', () => {
  render(<UserForm />);
  const occupationInput = screen.getByText("Select occupation");
  const stateInput = screen.getByText("Select State");

  expect( occupationInput && stateInput).toBeInTheDocument();
});

test('renders toggle visibility button', () => {
  render(<UserForm />);
  const toggleButton = screen.getByText("Toggle visibility");

  expect(toggleButton).toBeInTheDocument();
});

test('renders create button', () => {
  render(<UserForm />);
  const submitButton = screen.getByText("Create");

  expect(submitButton).toBeInTheDocument();
});