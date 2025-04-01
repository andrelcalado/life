import { render, screen, fireEvent } from '@testing-library/react';
import Input from '@/components/Input';

describe('Input Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with default props', () => {
    render(<Input type="text" />);
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
  });

  it('renders the placeholder label', () => {
    render(<Input type="text" placeholder="Username" />);
    const input = screen.getByPlaceholderText('Username');
    expect(input).toBeInTheDocument();
  });

  it('renders correctly when type is email', () => {
    render(<Input type="email" />);
    const inputElmt = screen.getByRole('textbox');
    expect(inputElmt.type).toBe('email');
    expect(screen.getByTestId('ai-fill-mail')).toBeInTheDocument();
  });

  it('renders correctly when type is password', () => {
    render(<Input type="password" placeholder="Password" />);
    const inputElmt = screen.getByPlaceholderText('Password');
    expect(inputElmt.type).toBe('password');
    expect(screen.getByTestId('ai-fill-lock')).toBeInTheDocument();
  });

  it('toggles password visibility when eye icon is clicked', () => {
    render(<Input type="password" />);
    const button = screen.getByRole('button');
    
    expect(screen.getByTestId('ai-fill-eye-invisible')).toBeInTheDocument();
    
    fireEvent.click(button);
    expect(screen.getByTestId('ai-fill-eye')).toBeInTheDocument();
    
    fireEvent.click(button);
    expect(screen.getByTestId('ai-fill-eye-invisible')).toBeInTheDocument();
  });

  it('calls onChange handler when typing', () => {
    const mockOnChange = jest.fn();

    render(<Input type="text" onChange={mockOnChange} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test' } });
    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  it('applies error styling when error exists', () => {
    render(<Input type="text" error />);
    const label = screen.getByRole('textbox').parentElement;
    expect(label).toHaveClass('border-red-500');
  });

  it('shows auxiliary label when provided', () => {
    render(<Input type="text" auxLabel="Username" />);
    expect(screen.getByText('Username')).toBeInTheDocument();
  });

  it('merges custom className correctly', () => {
    render(<Input type="text" className="custom-class" />);
    const label = screen.getByRole('textbox').parentElement;
    expect(label).toHaveClass('custom-class');
  });

  it('limit the input when maxLength is provided', () => {
    render(<Input type="text" maxLength={5} />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('maxLength', '5');;
  });
});

jest.mock('react-icons/ai', () => ({
  AiFillMail: () => <div data-testid="ai-fill-mail" />,
  AiFillLock: () => <div data-testid="ai-fill-lock" />,
  AiFillEye: () => <div data-testid="ai-fill-eye" />,
  AiFillEyeInvisible: () => <div data-testid="ai-fill-eye-invisible" />,
}));