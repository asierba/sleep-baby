// eslint-disable-next-line @typescript-eslint/no-require-imports
jest.mock('@react-native-async-storage/async-storage', () => require('./testing/fake-async-storage'));

import AsyncStorage from '@react-native-async-storage/async-storage';
import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';
import App from './App';

beforeEach(async () => {
  await AsyncStorage.clear();
});

it('prompts for date of birth on first launch', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: 'Welcome to Sleepy Baby' })).toBeOnTheScreen();
  expect(screen.getByText('When was your baby born?')).toBeOnTheScreen();
  expect(screen.getByRole('button', { name: /birthdate/i })).toBeOnTheScreen();
});

it('has no date selected and Get Started disabled by default', () => {
  render(<App />);
  expect(screen.getByRole('button', { name: /birthdate/i })).toHaveTextContent('Birthdate');
  expect(screen.getByRole('button', { name: /get started/i })).toBeDisabled();
});

it('enables Get Started after selecting a birthdate', () => {
  render(<App />);

  fireEvent.press(screen.getByRole('button', { name: /birthdate/i }));
  fireEvent.press(screen.getByRole('button', { name: '1' }));

  expect(screen.getByRole('button', { name: /get started/i })).toBeEnabled();
});

it.each([
  { monthsBack: 0, expectedAge: 0 },
  { monthsBack: 3, expectedAge: 3 },
  { monthsBack: 6, expectedAge: 6 },
  { monthsBack: 12, expectedAge: 12 },
])('shows $expectedAge months old for a birthdate $monthsBack months ago', ({ monthsBack, expectedAge }) => {
  render(<App />);

  fireEvent.press(screen.getByRole('button', { name: /birthdate/i }));

  const prevButton = screen.getByRole('button', { name: 'Prev' });
  for (let i = 0; i < monthsBack; i++) fireEvent.press(prevButton);

  fireEvent.press(screen.getByRole('button', { name: '1' }));

  expect(screen.getByText(new RegExp(`${expectedAge} months old`, 'i'))).toBeOnTheScreen();
});

it('disables future dates in the date picker', () => {
  const realDate = Date;
  const mockDate = new realDate(2026, 1, 3);
  jest
    .spyOn(global, 'Date')
    .mockImplementation((...args: unknown[]) => (args.length ? new realDate(...(args as [unknown])) : mockDate));

  render(<App />);
  fireEvent.press(screen.getByRole('button', { name: /birthdate/i }));
  expect(screen.getByRole('button', { name: '4' })).toBeDisabled();

  jest.restoreAllMocks();
});

it('hides birthdate button when date picker is open', () => {
  render(<App />);

  fireEvent.press(screen.getByRole('button', { name: /birthdate/i }));

  expect(screen.queryByRole('button', { name: /birthdate/i })).not.toBeOnTheScreen();
});

it('saves selected birthdate to storage', async () => {
  jest.useFakeTimers({
    now: new Date(2026, 1, 3),
    doNotFake: ['setTimeout', 'clearTimeout', 'setImmediate', 'clearImmediate', 'setInterval', 'clearInterval'],
  });

  render(<App />);

  fireEvent.press(screen.getByRole('button', { name: /birthdate/i }));
  fireEvent.press(screen.getByRole('button', { name: '1' }));

  await waitFor(async () => {
    expect(await AsyncStorage.getItem('baby_dob')).toBe(new Date(2026, 1, 1).toISOString());
  });

  jest.useRealTimers();
});

it('restores saved birthdate from storage on launch', async () => {
  const now = new Date();
  const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 6, now.getDate());
  await AsyncStorage.setItem('baby_dob', sixMonthsAgo.toISOString());

  render(<App />);

  await waitFor(() => {
    expect(screen.getByText(/6 months old/i)).toBeOnTheScreen();
  });
  expect(screen.getByRole('button', { name: /get started/i })).toBeEnabled();
});
