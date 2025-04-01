import { render, screen } from '@testing-library/react';
import Badge from '@/components/Badge';

describe('Badge Component', () => {
  it('renders children text correctly', () => {
    render(<Badge>Test Message</Badge>);
    expect(screen.getByText('Test Message')).toBeInTheDocument();
  });

  it('applies correct error styling', () => {
    render(<Badge variation="error">Error</Badge>);
    const element = screen.getByText('Error');
    
    expect(element).toHaveClass('bg-red-100');
    expect(element).toHaveClass('text-red-600');
  });

  it('applies correct success styling', () => {
    render(<Badge variation="success">Success</Badge>);
    const element = screen.getByText('Success');
    
    expect(element).toHaveClass('bg-green-100');
    expect(element).toHaveClass('text-green-600');
  });

  it('applies correct xs size styling', () => {
    render(<Badge size="xs">XS</Badge>);
    const element = screen.getByText('XS');
    
    expect(element).toHaveClass('text-xs');
    expect(element).toHaveClass('px-3');
    expect(element).toHaveClass('py-1');
  });

  it('applies correct lg size styling', () => {
    render(<Badge size="lg">LG</Badge>);
    const element = screen.getByText('LG');
    
    expect(element).toHaveClass('text-lg');
    expect(element).toHaveClass('px-6');
    expect(element).toHaveClass('py-4');
  });

  it('hides when visibility is false in solid mode', () => {
    const { container } = render(<Badge visibility={false}>Hidden</Badge>);
    expect(container.firstChild).toHaveClass('hidden');
  });

  it('shows fixed position when mode is fixed and visible', () => {
    render(<Badge mode="fixed" visibility={true}>Fixed</Badge>);
    const element = screen.getByText('Fixed');
    
    expect(element).toHaveClass('fixed');
    expect(element).toHaveClass('opacity-100');
  });

  it('hides properly in fixed mode when not visible', () => {
    const { container } = render(
      <Badge mode="fixed" visibility={false}>Hidden Fixed</Badge>
    );
    expect(container.firstChild).toHaveClass('fixed');
    expect(container.firstChild).toHaveClass('opacity-0');
  });

  it('merges custom className correctly', () => {
    render(<Badge className="custom-class">Test</Badge>);
    const element = screen.getByText('Test');
    
    expect(element).toHaveClass('custom-class');
    expect(element).toHaveClass('rounded-sm');
  });
});