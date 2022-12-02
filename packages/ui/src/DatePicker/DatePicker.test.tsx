import { act, fireEvent, renderWithTheme, screen } from '@self-kit/tests';
import { vi } from 'vitest';
import { useState } from 'react';

import { DatePicker } from './DatePicker';

// Протестировать любые кейсы, связанные с MaskFiled невозможно из-за того, что MaskField использует методы, не эмулируемые в rtl
describe('DatePicker', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2022-02-10'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('Props:onChange: при выборе даты в пикере в onChange передается объект Date', async () => {
    const onChange = vi.fn();

    renderWithTheme(<DatePicker onChange={onChange} />);
    fireEvent.focus(screen.getByRole('textbox'));
    await act(() => screen.getAllByText('10')[0].click());
    expect(onChange.mock.calls[0][0] instanceof Date).toBeTruthy();

    expect(onChange.mock.calls[0][0].toISOString()).toBe(
      '2022-02-10T00:00:00.000Z',
    );
  });

  it('Props:minDate: в пикере нельзя выбрать дату меньше minDate', async () => {
    const onChange = vi.fn();

    renderWithTheme(
      <DatePicker onChange={onChange} minDate={new Date('2022-02-09')} />,
    );

    fireEvent.focus(screen.getByRole('textbox'));

    const btn = screen.getAllByText('8')[0];

    expect(btn).toBeDisabled();
  });

  it('Props:minDate: в пикере можно выбрать дату равной minDate', async () => {
    renderWithTheme(<DatePicker minDate={new Date('2022-02-09')} />);
    fireEvent.focus(screen.getByRole('textbox'));

    const btn = screen.getAllByText('9')[0];

    expect(btn).not.toBeDisabled();
  });

  it('Props:maxDate: в пикере нельзя выбрать дату больше maxDate', async () => {
    renderWithTheme(<DatePicker maxDate={new Date('2022-02-09')} />);
    fireEvent.focus(screen.getByRole('textbox'));

    const btn = screen.getAllByText('10')[0];

    expect(btn).toBeDisabled();
  });

  it('Props:maxDate: в пикере можно выбрать дату равной maxDate', async () => {
    renderWithTheme(<DatePicker maxDate={new Date('2022-02-09')} />);
    fireEvent.focus(screen.getByRole('textbox'));

    const btn = screen.getAllByText('9')[0];

    expect(btn).not.toBeDisabled();
  });

  it('Props:value: при изменении меняется выбранная дата в календаре', async () => {
    const callbacks: { setValue: (date?: Date) => void } = {
      setValue: () => undefined,
    };

    const TestComponent = () => {
      const [value, setValue] = useState<Date | undefined>();

      callbacks.setValue = setValue;

      return <DatePicker value={value} onChange={setValue} />;
    };

    renderWithTheme(<TestComponent />);

    await act(() => {
      callbacks.setValue(new Date('2022-03-09'));
    });

    fireEvent.focus(screen.getByRole('textbox'));

    const selected = screen.getAllByText('9')[0].getAttribute('aria-selected');

    expect(selected).toBeTruthy();
  });
});
