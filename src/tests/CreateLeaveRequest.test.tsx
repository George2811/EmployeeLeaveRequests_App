import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import dayjs from 'dayjs';
import { describe, it, expect, vi } from 'vitest';
import { CreateLeaveRequest } from '../pages/CreateLeaveRequest';

vi.mock('../api/leaveRequests.api', () => ({
    createLeaveRequest: vi.fn()
}));

vi.mock('../auth/useAuth', () => ({
  useAuth: () => ({
    auth: {
      user: { id: 'employee-123' }
    }
  })
}));

vi.mock('@mui/x-date-pickers', async () => {
    const actual = await vi.importActual<any>('@mui/x-date-pickers');
  
    return {
      ...actual,
      DatePicker: ({ label, onChange }: any) => (
        <input
          aria-label={label}
          type="date"
          onChange={(e) =>
            onChange(dayjs(e.target.value, 'YYYY-MM-DD', true))
          }
        />
      )
    };
});

describe('CreateLeaveRequest – Reason field', () => {
  it('shows validation error when reason is empty', async () => {
    // Arrange
    const user = userEvent.setup()
    render(<CreateLeaveRequest />)

    // Act -> Click submit WITHOUT filling reason
    await user.click(
      screen.getByRole('button', { name: /create leave request/i })
    )

    // Assert -> Validation message
    expect(
      await screen.findByText(/Reason is required/i)
    ).toBeInTheDocument()
  })
})