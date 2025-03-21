import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Header } from '../header/index';

describe('Header Component', () => {
    it('renders header with correct title', () => {
        render(<Header />);
        const titleElement = screen.getByText('Proa Solar Farm Map');
        expect(titleElement).toBeInTheDocument();
    });

    it('displays the header with correct styling', () => {
        render(<Header />);
        const headerElement = screen.getByRole('banner');
        expect(headerElement).toHaveClass('header');
    });
});
