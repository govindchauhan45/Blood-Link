import { useEffect, useRef, useState } from "react";

function MessageBubble({ m }) {
  const isUser = m.sender === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-2`}>
      <div className={`max-w-[78%] px-3 py-2 rounded-xl text-sm ${isUser ? "bg-red-600 text-white" : "bg-gray-100 text-gray-800"}`}>
        <div>{m.text}</div>
        <div className="text-[10px] opacity-60 mt-1 text-right">{new Date(m.time).toLocaleTimeString()}</div>
      </div>
    </div>
  );
}

export default function Messages() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const listRef = useRef(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("bd_messages_v1");
      if (raw) setMessages(JSON.parse(raw));
    } catch (e) {
      setMessages([]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("bd_messages_v1", JSON.stringify(messages));
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages]);

  const send = (t) => {
    if (!t.trim()) return;
    const m = { id: Date.now(), text: t.trim(), sender: "user", time: Date.now() };
    setMessages(prev => [...prev, m]);
    setText("");
    // mock system reply
    setTimeout(() => {
      setMessages(prev => [...prev, { id: Date.now()+1, text: "Thanks — we'll reach out to the donor if available.", sender: "system", time: Date.now()+1 }]);
    }, 700);
  };

  return (
    <div>
      {/* Floating button */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="flex flex-col items-end gap-3">
          {open && (
            <div className="w-80 max-h-96 bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-100 flex flex-col">
              <div className="px-4 py-3 bg-red-600 text-white font-bold flex items-center justify-between">
                <span>Messages</span>
                <button onClick={() => setOpen(false)} className="opacity-90">×</button>
              </div>
              <div ref={listRef} className="p-3 overflow-y-auto flex-1" style={{ minHeight: 120 }}>
                {messages.length === 0 && <div className="text-xs text-gray-400">No messages yet. Ask a question or request help.</div>}
                {messages.map(m => <MessageBubble key={m.id} m={m} />)}
              </div>
              <div className="p-3 border-t border-gray-100">
                <div className="flex gap-2">
                  <input value={text} onChange={e => setText(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') send(text); }} placeholder="Write a message..." className="flex-1 px-3 py-2 border rounded-xl text-sm focus:outline-none" />
                  <button onClick={() => send(text)} className="px-3 py-2 rounded-xl bg-red-600 text-white font-bold">Send</button>
                </div>
              </div>
            </div>
          )}

          <button onClick={() => setOpen(o => !o)} className="w-14 h-14 rounded-full bg-gradient-to-br from-red-600 to-rose-600 text-white shadow-xl flex items-center justify-center font-black text-lg">
            💬
          </button>
        </div>
      </div>
    </div>
  );
}
