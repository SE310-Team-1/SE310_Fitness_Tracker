import { render, screen } from '@testing-library/react';
import App from './App';

test('rendersRoutines', () => {
  render(<App />);
  const rountinesElement = screen.getByText("Routines");
  expect(rountinesElement).toBeInTheDocument();
});

test('renders Today\'s Workout', () => {
  render(<App/>);
  const exercisesElemet = screen.getByText("Today's Workout");
  expect(exercisesElemet).toBeInTheDocument();
});