import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import dayjs from 'dayjs';
import { describe, it, expect, vi } from 'vitest';

import { CreateLeaveRequest } from '../pages/CreateLeaveRequest';
import { TestWrapper } from '../tests/TestWrapper';
import { createLeaveRequest } from '../api/leaveRequests.api';

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

const renderForm = () => {
    render(
        <TestWrapper>
            <CreateLeaveRequest />
        </TestWrapper>
    );
};

const fillValidForm = async () => {
  const user = userEvent.setup();

  await user.type(
    screen.getByLabelText(/Reason/i),
    'Vacation days'
  );

  await user.type(
    screen.getByLabelText(/Start Date/i),
    dayjs().add(1, 'day').format('MM/DD/YYYY')
  );

  await user.type(
    screen.getByLabelText(/End Date/i),
    dayjs().add(5, 'day').format('MM/DD/YYYY')
  );

  return user;
};

describe('CreateLeaveRequest', () => {
  it('creates leave request successfully', async () => {
    vi.mocked(createLeaveRequest).mockResolvedValueOnce({});

    renderForm();
    const user = await fillValidForm();

    await user.click(
      screen.getByRole('button', { name: /Create Leave Request/i })
    );

    expect(
      await screen.findByText(/Leave Request created successfully./i)
    ).toBeInTheDocument();
  });
});
