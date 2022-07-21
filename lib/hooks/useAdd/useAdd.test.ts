import { useAdd } from '.';

it('Expect 7 + 8 to be 15', () => {
  const sum = useAdd(7, 8);
  expect(sum).toBe(15);
});
