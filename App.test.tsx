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

async function waitForOnboarding() {
  await waitFor(() => {
    expect(screen.getByRole('heading', { name: 'Welcome to Sleepy Baby' })).toBeOnTheScreen();
  });
}

async function waitForHome() {
  await waitFor(() => {
    expect(screen.getByRole('heading', { name: 'Sleepy Baby' })).toBeOnTheScreen();
  });
}

it('prompts for date of birth on first launch', async () => {
  render(<App />);
  await waitForOnboarding();
  expect(screen.getByText('When was your baby born?')).toBeOnTheScreen();
  expect(screen.getByRole('button', { name: /birthdate/i })).toBeOnTheScreen();
});

it('has no date selected and Get Started disabled by default', async () => {
  render(<App />);
  await waitForOnboarding();
  expect(screen.getByRole('button', { name: /birthdate/i })).toHaveTextContent(/Birthdate/);
  expect(screen.getByRole('button', { name: /get started/i })).toBeDisabled();
});

it('enables Get Started after selecting a birthdate', async () => {
  render(<App />);
  await waitForOnboarding();

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
])('shows "$expected" for a birthdate $monthsBack months ago', async ({ monthsBack, expected }) => {
  render(<App />);
  await waitForOnboarding();

  fireEvent.press(screen.getByRole('button', { name: /birthdate/i }));

  for (let i = 0; i < monthsBack; i++) fireEvent.press(screen.getByRole('button', { name: 'Prev' }));

  fireEvent.press(screen.getByRole('button', { name: '1' }));

  expect(screen.getByText(expected)).toBeOnTheScreen();
});

it('displays selected date in long format on the birthdate button', async () => {
  currentDate(new Date(2026, 1, 13));

  render(<App />);
  await waitForOnboarding();

  fireEvent.press(screen.getByRole('button', { name: /birthdate/i }));
  fireEvent.press(screen.getByRole('button', { name: '1' }));

  expect(screen.getByRole('button', { name: /birthdate/i })).toHaveTextContent(/February 1, 2026/);
});

it('disables future dates in the date picker', async () => {
  currentDate(new Date(2026, 1, 3));

  render(<App />);
  await waitForOnboarding();
  fireEvent.press(screen.getByRole('button', { name: /birthdate/i }));
  expect(screen.getByRole('button', { name: '4' })).toBeDisabled();
});

it('hides birthdate button when date picker is open', async () => {
  render(<App />);
  await waitForOnboarding();

  fireEvent.press(screen.getByRole('button', { name: /birthdate/i }));

  expect(screen.queryByRole('button', { name: /birthdate/i })).not.toBeOnTheScreen();
});

it('saves selected birthdate to storage', async () => {
  currentDate(new Date(2026, 1, 3));

  render(<App />);
  await waitForOnboarding();

  fireEvent.press(screen.getByRole('button', { name: /birthdate/i }));
  fireEvent.press(screen.getByRole('button', { name: '1' }));

  await waitFor(async () => {
    expect(await AsyncStorage.getItem('baby_dob')).toBe(new Date(2026, 1, 1).toISOString());
  });
});

it('skips onboarding and shows home when birthdate is saved', async () => {
  const now = new Date();
  const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 6, now.getDate());
  await AsyncStorage.setItem('baby_dob', sixMonthsAgo.toISOString());

  render(<App />);
  await waitForHome();

  expect(screen.getByText(/6 months old/i)).toBeOnTheScreen();
  expect(screen.queryByText('When was your baby born?')).not.toBeOnTheScreen();
});

it('navigates to home screen when Get Started is pressed', async () => {
  render(<App />);
  await waitForOnboarding();

  fireEvent.press(screen.getByRole('button', { name: /birthdate/i }));
  fireEvent.press(screen.getByRole('button', { name: '1' }));
  fireEvent.press(screen.getByRole('button', { name: /get started/i }));

  expect(screen.getByRole('heading', { name: 'Sleepy Baby' })).toBeOnTheScreen();
});

it('navigates from home to edit birthdate screen', async () => {
  const now = new Date();
  const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 6, now.getDate());
  await AsyncStorage.setItem('baby_dob', sixMonthsAgo.toISOString());

  render(<App />);
  await waitForHome();

  fireEvent.press(screen.getByRole('button', { name: /edit birthdate/i }));

  expect(screen.getByRole('heading', { name: 'Edit Birthdate' })).toBeOnTheScreen();
});

it('returns to home from edit birthdate via Back', async () => {
  const now = new Date();
  const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 6, now.getDate());
  await AsyncStorage.setItem('baby_dob', sixMonthsAgo.toISOString());

  render(<App />);
  await waitForHome();

  fireEvent.press(screen.getByRole('button', { name: /edit birthdate/i }));
  fireEvent.press(screen.getByRole('button', { name: /back/i }));

  expect(screen.getByRole('heading', { name: 'Sleepy Baby' })).toBeOnTheScreen();
});

it('returns to home from edit birthdate via Done', async () => {
  const now = new Date();
  const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 6, now.getDate());
  await AsyncStorage.setItem('baby_dob', sixMonthsAgo.toISOString());

  render(<App />);
  await waitForHome();

  fireEvent.press(screen.getByRole('button', { name: /edit birthdate/i }));
  fireEvent.press(screen.getByRole('button', { name: /done/i }));

  expect(screen.getByRole('heading', { name: 'Sleepy Baby' })).toBeOnTheScreen();
});
