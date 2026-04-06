import { render, screen, fireEvent } from '@testing-library/react';
import CreateRecipePage from '@/app/recipes/create/page';
import { useCreateRecipe } from '@/hooks/useRecipes';
import { useIngredients } from '@/hooks/useIngredients';

// Mocks
jest.mock('@/hooks/useRecipes');
jest.mock('@/hooks/useIngredients');
jest.mock('next/navigation', () => ({
    useRouter: () => ({ push: jest.fn() })
}));

// Mock Shell
jest.mock('@/components/layout/shell', () => ({
    Shell: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}));

const mockUseCreateRecipe = useCreateRecipe as jest.Mock;
const mockUseIngredients = useIngredients as jest.Mock;

describe('Recipe Wizard', () => {
    beforeEach(() => {
        mockUseCreateRecipe.mockReturnValue({
            mutateAsync: jest.fn(),
            isPending: false,
        });
        mockUseIngredients.mockReturnValue({
            data: [
                { id: '1', name: 'Flour', calories_per_100g: 364 }
            ],
            isLoading: false
        });
    });

    it('navigates through steps', async () => {
        render(<CreateRecipePage />);

        // Step 1: Details
        expect(screen.getByText('Recipe Details')).toBeInTheDocument();
        const titleInput = screen.getByPlaceholderText("e.g. Grandma's Apple Pie");
        fireEvent.change(titleInput, { target: { value: 'Test Pie' } });

        // Find next button
        const nextBtn = screen.getByText(/Next Step/i);
        fireEvent.click(nextBtn);

        // Step 2: Ingredients
        // Use findByText which waits (default 1000ms) for element to appear
        const ingredientsHeader = await screen.findByText('Ingredients');
        expect(ingredientsHeader).toBeInTheDocument();

        // Add ingredient logic check
        // Wait for list to render
        const ingredientItem = await screen.findByText('Flour');
        fireEvent.click(ingredientItem);

        // Expect to see it added to the list (input with value 100 default)
        const amountInput = await screen.findByDisplayValue('100');
        expect(amountInput).toBeInTheDocument();

        fireEvent.click(screen.getByText(/Next Step/i));

        // Step 3: Instructions
        const instructionsHeader = await screen.findByText('Instructions');
        expect(instructionsHeader).toBeInTheDocument();
    });
});
