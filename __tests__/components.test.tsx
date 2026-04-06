import { render, screen } from '@testing-library/react';
import { Button } from '@/components/ui/button';
import { Card, CardTitle } from '@/components/ui/card';

describe('UI Components', () => {
    it('renders button correctly', () => {
        render(<Button>Click me</Button>);
        const button = screen.getByRole('button', { name: /click me/i });
        expect(button).toBeInTheDocument();
    });

    it('renders card with title', () => {
        render(
            <Card>
                <CardTitle>Test Card</CardTitle>
            </Card>
        );
        expect(screen.getByText('Test Card')).toBeInTheDocument();
    });
});
