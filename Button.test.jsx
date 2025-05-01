import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from '@mui/material'

describe('Button component', () => {
  test('renders with correct text and responds to click', () => {
    const handleClick = vi.fn()

    render(<Button onClick={handleClick}>Нажми меня</Button>)

    const button = screen.getByText(/Нажми меня/i)
    expect(button).toBeInTheDocument()

    fireEvent.click(button)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
