import { renderHook, userEvents } from '@self-kit/tests';
import { vi } from 'vitest';

import { useEscapeClickEffect } from './useEscapeClickEffect';

describe('useEscapeClickEffect', () => {
  it('Props:isActive=true: при нажатии esc вызывается onEscape', async () => {
    const onEscape = vi.fn();

    renderHook(() => useEscapeClickEffect({ isActive: true, onEscape }));
    await userEvents.keyboard('{Escape}');
    expect(onEscape).toBeCalled();
  });

  it('Props:isActive=false: при нажатии esc onEscape не вызывается', async () => {
    const onEscape = vi.fn();

    renderHook(() => useEscapeClickEffect({ isActive: false, onEscape }));
    await userEvents.keyboard('{Escape}');
    expect(onEscape).not.toBeCalled();
  });
});
