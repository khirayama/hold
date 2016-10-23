export function errorHandler(event) {
  const stack = event.error.stack;
  const message = event.error.toString();

  if (stack) {
    message += '\n' + stack;
  }

  const xhr = new XMLHttpRequest();
  xhr.open('POST', '/log', true);
  xhr.send(message);
}
