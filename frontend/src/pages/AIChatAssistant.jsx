import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { formatDate } from '../utils/helpers';

export default function AIChatAssistant() {
  const { currentUser, chatMessages, sendChatMessage } = useApp();
  const [text, setText] = useState('');
  const messages = chatMessages.filter((message) => message.userId === currentUser.id);

  const submit = (event) => {
    event.preventDefault();
    if (!text.trim()) return;
    sendChatMessage(text.trim());
    setText('');
  };

  return (
    <section className="chat-page">
      <div className="chat-panel">
        <div className="chat-head"><div className="paw-avatar">P</div><div><h2>Paw</h2><p>Mock AI assistant for care, bookings, and reminders</p></div></div>
        <div className="chat-messages">
          {messages.map((message) => <div className={`message ${message.sender}`} key={message.id}><p>{message.message}</p><span>{formatDate(message.createdAt)}</span></div>)}
        </div>
        <form className="chat-input" onSubmit={submit}>
          <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Ask Paw about grooming, vet visits, bookings..." />
          <button className="btn primary" type="submit">Send</button>
        </form>
      </div>
      <aside className="assistant-tips">
        <h3>Try asking</h3>
        {['How often should I groom Luna?', 'What should I prepare for a vet visit?', 'Help me understand my booking status.', 'Any diet tips for my pet?'].map((tip) => <button key={tip} onClick={() => setText(tip)}>{tip}</button>)}
      </aside>
    </section>
  );
}
