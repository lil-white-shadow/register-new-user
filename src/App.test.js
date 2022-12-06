import { toBeInTheDocument } from '@testing-library/jest-dom/dist/matchers';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders logo', () => {
  render(<App />);
  const logo = screen.getByText("Fetch");
  expect(logo).toBeInTheDocument();
});

test('renders heading', () => {
  render(<App />);
  const heading = screen.getByText("Create your new account");
  expect(heading).toBeInTheDocument();
});