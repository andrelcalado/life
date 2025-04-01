import { render, screen, fireEvent } from '@testing-library/react';
import Button from '@/components/Button';

describe('Button Component', () => {
  it('renders button with text correctly', () => {
    render(<Button text="Click me" />);
    const button = screen.getByText('Click me');
    expect(button).toBeInTheDocument();
  });

  it('applies solid variation correctly', () => {
    render(<Button variation="solid" text="Solid" />);
    const button = screen.getByText('Solid');
    expect(button.parentElement).toHaveClass('bg-sky-500');
    expect(button.parentElement).toHaveClass('text-white');
  });

  it('applies border variation correctly', () => {
    render(<Button variation="border" text="Border" />);
    const button = screen.getByText('Border');
    expect(button.parentElement).toHaveClass('border-2');
    expect(button.parentElement).toHaveClass('border-sky-500');
  });

  it('applies dangerous variation correctly', () => {
    render(<Button variation="solid-dangerous" text="Delete" />);
    const button = screen.getByText('Delete');
    expect(button.parentElement).toHaveClass('bg-red-500');
  });

  it('applies xs size correctly', () => {
    render(<Button size="xs" text="Small" />);
    const button = screen.getByText('Small');
    expect(button.parentElement).toHaveClass('text-xs');
    expect(button.parentElement).toHaveClass('px-3');
    expect(button.parentElement).toHaveClass('py-2');
  });

  it('applies lg size correctly', () => {
    render(<Button size="lg" text="Large" />);
    const button = screen.getByText('Large');
    expect(button.parentElement).toHaveClass('text-lg');
    expect(button.parentElement).toHaveClass('px-6');
    expect(button.parentElement).toHaveClass('py-4');
  });

  it('shows loading state correctly', () => {
    render(<Button loading text="Loading" />);
    const button = screen.getByText('Loading');
    expect(button.parentElement).toBeDisabled();
    expect(button.parentElement).toHaveClass('pointer-events-none');
    expect(button.parentElement.querySelector('svg')).toBeInTheDocument();
  });

  it('handles disabled state correctly', () => {
    render(<Button disabled text="Disabled" />);
    const button = screen.getByText('Disabled');
    expect(button.parentElement).toBeDisabled();
    expect(button.parentElement).toHaveClass('pointer-events-none');
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<Button text="Click" onClick={handleClick} />);
    const button = screen.getByText('Click');
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when disabled', () => {
    const handleClick = jest.fn();
    render(<Button text="Disabled" disabled onClick={handleClick} />);
    const button = screen.getByText('Disabled');
    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('shows prefix icon when provided', () => {
    render(<Button text="With Icon" prefix={<span data-testid="icon">+</span>} />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('merges custom className correctly', () => {
    render(<Button text="Custom" className="custom-class" />);
    const button = screen.getByText('Custom');
    expect(button.parentElement).toHaveClass('custom-class');
  });
});