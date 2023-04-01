import { ChatFeed, Message } from 'react-chat-engine';

function CustomChatFeed(props) {
  const { chats, activeChat, userName } = props;

  const chat = chats && chats[activeChat];

  function renderReadReceipts(message, isMyMessage) {
    return chat.people.map((person, index) => {
      if (person.last_read === message.id) {
        return (
          <div
            key={`read_${index}`}
            className="read-receipt"
            style={{
              float: isMyMessage ? 'right' : 'left',
              backgroundImage: `url(${person?.person?.avatar})`,
            }}
          />
        );
      }

      return null;
    });
  }

  function renderMessages() {
    const keys = Object.keys(chat?.messages);

    return keys.map((key, index) => {
      const message = chat.messages[key];
      const lastMessageKey = index === 0 ? null : keys[index - 1];
      const isMyMessage = userName === message.sender.username;

      return (
        <div key={`msg_${index}`} style={{ width: '100%' }}>
          <div className="message-block">
            {isMyMessage ? (
              <Message
                text={message.text}
                isMyMessage={isMyMessage}
                author={message.sender.username}
                className="message-my"
              />
            ) : (
              <Message
                text={message.text}
                isMyMessage={isMyMessage}
                author={message.sender.username}
                className="message-other"
              />
            )}
          </div>
          <div
            className="read-receipts"
            style={{
              marginRight: isMyMessage ? '18px' : '0px',
              marginLeft: isMyMessage ? '0px' : '68px',
            }}
          >
            {renderReadReceipts(message, isMyMessage)}
          </div>
        </div>
      );
    });
  }

  if (!chat) return <div />;

  return (
    <div className="chat-feed">
      <ChatFeed
        messages={renderMessages()}
        hasInputField={false}
        bubbleStyles={{
          text: {
            fontSize: 18,
          },
          chatbubble: {
            borderRadius: 20,
            padding: 10,
          },
        }}
      />
    </div>
  );
}

export default CustomChatFeed;
