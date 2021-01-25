import { render, screen } from "@testing-library/react";
import App from "./App";
import { server } from './mocks/server';
import { rest } from 'msw';

test("displays images from the server", async () => {
  render(<App />);

  // show loading spinner
  const loadingSpinner = await screen.findByRole('progressbar');
  expect(loadingSpinner).toBeVisible();

  // load images from server
  const images = await screen.findAllByRole("img", { name: /flavor$/i });
  expect(images).toHaveLength(2);
  
  // loading spinner no longer shows
  // const hiddenLoadingSpinner = screen.getByRole('progressbar', { hidden: true })
  // expect(hiddenLoadingSpinner).not.toBeVisible();

  const hiddenLoadingSpinner = screen.queryByRole('progressbar');
  expect(hiddenLoadingSpinner).not.toBeInTheDocument();

  // no error is visible
  const error = screen.queryByRole('alert');
  expect(error).not.toBeInTheDocument();
});

test("displays error upon error response from server", async () => {
  server.resetHandlers(
    rest.get("http://localhost:3030/flavors", 
    (req, res, ctx) => res(ctx.status(500)))
  );

  render(<App />);

  // show loading spinner
   const loadingSpinner = screen.getByRole('progressbar');
   expect(loadingSpinner).toBeVisible();

  // show error banner
  const error = await screen.findByRole("alert");
  expect(error).toBeVisible();
  // name option doesn't work for this particular dom
  expect(error).toHaveTextContent("error contacting the server");

  // expect loading spinner to have disappeared
  const hiddenLoadingSpinner = screen.queryByRole('progressbar');
  expect(hiddenLoadingSpinner).not.toBeInTheDocument();
})