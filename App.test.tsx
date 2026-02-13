// eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-unsafe-return
jest.mock('@react-native-async-storage/async-storage', () => require('./testing/fake-async-storage'));

import AsyncStorage from '@react-native-async-storage/async-storage';
import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';
import App from './App';

const currentDate = (date: Date) =>
  jest.useFakeTimers({
    now: date,
    doNotFake: ['setTimeout', 'clearTimeout', 'setImmediate', 'clearImmediate', 'setInterval', 'clearInterval'],
  });

beforeEach(async () => {
  await AsyncStorage.clear();
});

afterEach(() => {
  jest.useRealTimers();
});

it('prompts for date of birth on first launch', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: 'Welcome to Sleepy Baby' })).toBeOnTheScreen();
  expect(screen.getByText('When was your baby born?')).toBeOnTheScreen();
  expect(screen.getByRole('button', { name: /birthdate/i })).toBeOnTheScreen();
});

it('has no date selected and Get Started disabled by default', () => {
  render(<App />);
  expect(screen.getByRole('button', { name: /birthdate/i })).toHaveTextContent(/Birthdate/);
  expect(screen.getByRole('button', { name: /get started/i })).toBeDisabled();
});

it('enables Get Started after selecting a birthdate', () => {
  render(<App />);

  fireEvent.press(screen.getByRole('button', { name: /birthdate/i }));
  fireEvent.press(screen.getByRole('button', { name: '1' }));

  expect(screen.getByRole('button', { name: /get started/i })).toBeEnabled();
});

it.each([
  { monthsBack: 0, expected: '0 months old' },
  { monthsBack: 1, expected: '1 month old' },
  { monthsBack: 3, expected: '3 months old' },
  { monthsBack: 6, expected: '6 months old' },
  { monthsBack: 12, expected: '12 months old' },
])('shows "$expected" for a birthdate $monthsBack months ago', ({ monthsBack, expected }) => {
  render(<App />);

  fireEvent.press(screen.getByRole('button', { name: /birthdate/i }));

  for (let i = 0; i < monthsBack; i++) fireEvent.press(screen.getByRole('button', { name: 'Prev' }));

  fireEvent.press(screen.getByRole('button', { name: '1' }));

  expect(screen.getByText(expected)).toBeOnTheScreen();
});

it('displays selected date in long format on the birthdate button', () => {
  currentDate(new Date(2026, 1, 13));

  render(<App />);

  fireEvent.press(screen.getByRole('button', { name: /birthdate/i }));
  fireEvent.press(screen.getByRole('button', { name: '1' }));

  expect(screen.getByRole('button', { name: /birthdate/i })).toHaveTextContent(/February 1, 2026/);
});

it('disables future dates in the date picker', () => {
  currentDate(new Date(2026, 1, 3));

  render(<App />);
  fireEvent.press(screen.getByRole('button', { name: /birthdate/i }));
  expect(screen.getByRole('button', { name: '4' })).toBeDisabled();
});

it('hides birthdate button when date picker is open', () => {
  render(<App />);

  fireEvent.press(screen.getByRole('button', { name: /birthdate/i }));

  expect(screen.queryByRole('button', { name: /birthdate/i })).not.toBeOnTheScreen();
});

it('saves selected birthdate to storage', async () => {
  currentDate(new Date(2026, 1, 3));

  render(<App />);

  fireEvent.press(screen.getByRole('button', { name: /birthdate/i }));
  fireEvent.press(screen.getByRole('button', { name: '1' }));

  await waitFor(async () => {
    expect(await AsyncStorage.getItem('baby_dob')).toBe(new Date(2026, 1, 1).toISOString());
  });
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
