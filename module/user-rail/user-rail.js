export default async function init({ root, props }) {
  const messages = root.querySelectorAll('.chat-widget-message');

  messages.forEach((message) => {
    message.addEventListener('click', () => {
      messages.forEach((m) => m.classList.remove('active'));
      message.classList.add('active');
      message.classList.remove('has-notification');
    });
  });
}
