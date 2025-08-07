import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";


const MessageForm = () => {

  const [message, setMessage] = useState<string>("");
  const [delay, setDelay] = useState<number>(10);
  const [isSending, setIsSending] = useState<boolean>(false);
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);
  const [sentMessage, setSentMessage] = useState<string>("");

  const handleSend = () => {
    setIsSending(true);

    const id = setTimeout(() => {
      setSentMessage(message);
      setIsSending(false);
    }, delay * 1000);

    setTimerId(id);
  }

  const handleCancel = () => {
    if (timerId) 
      clearTimeout(timerId);
      setIsSending(false);
    
  }
  
  return (
    <div className="mx-w-md mx-auto mt-50 p-6 border rounded-lg shadow-sm bg-white space-y-4">
        <h1 className="text-2xl font-bold text-gray-800 text-center">DM Delay Button</h1>

        <Textarea
            placeholder="Enter your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
        />

        <Input
            placeholder="Delay in seconds"
            value={delay}
            onChange={(e) => setDelay(Number(e.target.value))}
            disabled={isSending}
        />

        {!isSending ? (
          <Button className="w-full" onClick={handleSend}>
            Send with Delay
          </Button>
        ) : (
            <Button className="w-full" variant="destructive" onClick={handleCancel}>
                Cancel Sending
            </Button>
        )}

        {sentMessage && (
          <div className="p-3 border rounded-lg bg-green-100 text-green-900">
            <p className="font-bold">Sent Message:</p>
            <p>{sentMessage}</p>
          </div>
        )}

    </div>
  )
}

export default MessageForm