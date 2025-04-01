import { render, screen } from '@testing-library/react';
import BigNumberLabel from '@/components/BigNumberLabel';

describe('BigNumberLabel Component', () => {
  it('renders the big number correctly', () => {
    render(<BigNumberLabel bigNumber={42} />);
    expect(screen.getByText('42')).toBeInTheDocument();
  });

  it('renders the label when provided', () => {
    render(<BigNumberLabel bigNumber={100} label="Total Users" />);
    expect(screen.getByText('Total Users')).toBeInTheDocument();
  });

  it('does not render label when not provided', () => {
    render(<BigNumberLabel bigNumber={100} />);
    const element = screen.getByText('100');
    expect(element.childNodes[0]).toBeDefined();
    expect(element.childNodes[1]).toBeUndefined();
  });

  it('applies custom className correctly', () => {
    render(
      <BigNumberLabel 
        bigNumber={10} 
        label="Items" 
        className="custom-class" 
      />
    );
    
    const element = screen.getByText('10').parentElement;
    expect(element).toHaveClass('custom-class');
  });

  it('passes additional props to the container div', () => {
    render(
      <BigNumberLabel 
        bigNumber={99} 
        data-testid="big-number-container" 
      />
    );
    
    expect(screen.getByTestId('big-number-container')).toBeInTheDocument();
  });
});