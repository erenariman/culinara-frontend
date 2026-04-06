import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ShoppingPage from '@/app/shopping/page'; // Need to export default for this to work, which it is.
import { useShoppingLists, useCreateShoppingList } from '@/hooks/useShopping';

// Mock hooks
jest.mock('@/hooks/useShopping');
const mockUseShoppingLists = useShoppingLists as jest.Mock;
const mockUseCreateShoppingList = useCreateShoppingList as jest.Mock;

// Mock Shell
jest.mock('@/components/layout/shell', () => ({
    Shell: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}));

describe('Shopping Page', () => {
    beforeEach(() => {
        mockUseCreateShoppingList.mockReturnValue({
            mutateAsync: jest.fn(),
            isPending: false,
        });
    });

    it('renders fallback state when dry', () => {
        mockUseShoppingLists.mockReturnValue({ data: [], isLoading: false });
        render(<ShoppingPage />);
        expect(screen.getByText('Shopping Lists')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('New List Name...')).toBeInTheDocument();
    });

    it('renders lists and items', () => {
        mockUseShoppingLists.mockReturnValue({
            data: [
                {
                    id: '1',
                    name: 'Weekly',
                    items: [
                        { ingredient_name: 'Milk', amount: 1, unit: 'l', isChecked: false }
                    ]
                }
            ],
            isLoading: false
        });

        render(<ShoppingPage />);
        expect(screen.getByText('Weekly')).toBeInTheDocument();
        expect(screen.getByText('Milk')).toBeInTheDocument();
    });

    it('allows creating a new list', async () => {
        const mutateMock = jest.fn();
        mockUseCreateShoppingList.mockReturnValue({
            mutateAsync: mutateMock,
            isPending: false,
        });
        mockUseShoppingLists.mockReturnValue({ data: [], isLoading: false });

        render(<ShoppingPage />);

        const input = screen.getByPlaceholderText('New List Name...');
        const button = screen.getByText('Create');

        fireEvent.change(input, { target: { value: 'Party List' } });
        fireEvent.click(button);

        await waitFor(() => {
            expect(mutateMock).toHaveBeenCalledWith('Party List');
        });
    });
});
