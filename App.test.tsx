import { render, screen } from '@testing-library/react-native';
import App from './App';

it('displays the app name', () => {
  render(<App />);
  expect(screen.getByText('Sleepy Baby')).toBeTruthy();
});
