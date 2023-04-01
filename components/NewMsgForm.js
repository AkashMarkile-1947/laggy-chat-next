import { useState } from 'react';
import { sendMessage } from 'react-chat-engine';

function MessageFormSocial(props) {
  const [value, setValue] = useState('');

  function handleSubmit(event) {
    event.preventDefault();

    const text = value.trim();

    if (text.length > 0) {
      sendMessage(props.chatID, { text }, propscreds);
    }

    setValue('');
  }

  function handleChange(event) {
    setValue(event.target.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Type a message..."
        value={value}
        onChange={handleChange}
      />
      <button type="submit">Send</button>
    </form>
  );
}

export default MessageFormSocial;
