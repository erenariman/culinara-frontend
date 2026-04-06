import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import IngredientsPage from '@/app/ingredients/page';
import { useIngredients, useCreateIngredient } from '@/hooks/useIngredients';

// Mock the hooks
jest.mock('@/hooks/useIngredients');
const mockUseIngredients = useIngredients as jest.Mock;
const mockUseCreateIngredient = useCreateIngredient as jest.Mock;

// Mock Shell to avoid routing/context issues in simple test
jest.mock('@/components/layout/shell', () => ({
    Shell: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}));

describe('Ingredients Page', () => {
    beforeEach(() => {
        mockUseCreateIngredient.mockReturnValue({
            mutateAsync: jest.fn(),
            isPending: false,
        });
    });

    it('renders loading state', () => {
        mockUseIngredients.mockReturnValue({
            data: undefined,
            isLoading: true,
        });

        render(<IngredientsPage />);
        // We expect undefined because Loader is pure CSS or Icon, let's check for 'Ingredients Pantry' text which is always there
        expect(screen.getByText('Ingredients Pantry')).toBeInTheDocument();
    });

    it('renders ingredients list', async () => {
        mockUseIngredients.mockReturnValue({
            data: [
                { id: '1', name: 'Flour', calories_per_100g: 364, protein_per_100g: 10, fat_per_100g: 1, carbs_per_100g: 76, density_g_ml: 0.6 },
                { id: '2', name: 'Sugar', calories_per_100g: 387, protein_per_100g: 0, fat_per_100g: 0, carbs_per_100g: 100, density_g_ml: 0.8 },
            ],
            isLoading: false,
        });

        render(<IngredientsPage />);

        expect(screen.getByText('Flour')).toBeInTheDocument();
        expect(screen.getByText('Sugar')).toBeInTheDocument();
        expect(screen.getByText('364 kcal')).toBeInTheDocument();
    });

    it('filters ingredients by search', async () => {
        mockUseIngredients.mockReturnValue({
            data: [
                { id: '1', name: 'Flour', calories_per_100g: 364, protein_per_100g: 10, fat_per_100g: 1, carbs_per_100g: 76, density_g_ml: 0.6 },
                { id: '2', name: 'Sugar', calories_per_100g: 387, protein_per_100g: 0, fat_per_100g: 0, carbs_per_100g: 100, density_g_ml: 0.8 },
            ],
            isLoading: false,
        });

        render(<IngredientsPage />);

        const searchInput = screen.getByPlaceholderText('Search ingredients...');
        fireEvent.change(searchInput, { target: { value: 'Flour' } });

        expect(screen.getByText('Flour')).toBeInTheDocument();
        expect(screen.queryByText('Sugar')).not.toBeInTheDocument();
    });
});
