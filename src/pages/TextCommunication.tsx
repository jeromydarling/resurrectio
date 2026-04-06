import { useState } from 'react';
import { Link } from 'react-router-dom';
import { mockPeople } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from '@/components/ui/sonner';
import {
  MessageSquare,
  Send,
  Clock,
  Pencil,
  X,
  CheckCheck,
  Check,
  AlertCircle,
  Phone,
  Heart,
} from 'lucide-react';

// ── People with phones ──

const peopleWithPhones = mockPeople.filter((p) => p.phone);

// ── Quick-send templates ──

const templates = [
  'Reminder: Meeting tomorrow',
  'Checking in — how are you?',
  'Call me when you can',
  'Your court date is coming up',
];

// ── Scheduled reminders (inline mock) ──

const scheduledReminders = [
  {
    personId: 'person-1',
    personName: 'Marcus Johnson',
    message: 'Parole check-in reminder',
    scheduledTime: 'Tomorrow 9am',
  },
  {
    personId: 'person-2',
    personName: 'Denise Williams',
    message: 'Mentor meeting reminder',
    scheduledTime: 'Thursday 2pm',
  },
  {
    personId: 'person-4',
    personName: 'Anthony Brown',
    message: 'Court date reminder',
    scheduledTime: 'Next Monday',
  },
  {
    personId: 'person-6',
    personName: 'Kevin Harris',
    message: 'Drug test reminder',
    scheduledTime: 'Friday',
  },
];

// ── Recent messages (inline mock) ──

type MessageDirection = 'outgoing' | 'incoming';
type DeliveryStatus = 'delivered' | 'read' | 'failed';

interface RecentMessage {
  id: string;
  personId: string;
  personName: string;
  direction: MessageDirection;
  text: string;
  timestamp: string;
  status: DeliveryStatus;
}

const recentMessages: RecentMessage[] = [
  {
    id: 'msg-1',
    personId: 'person-1',
    personName: 'Marcus Johnson',
    direction: 'outgoing',
    text: 'Hey Marcus, just checking in. How did the GED study session go?',
    timestamp: 'Today 3:42pm',
    status: 'read',
  },
  {
    id: 'msg-2',
    personId: 'person-1',
    personName: 'Marcus Johnson',
    direction: 'incoming',
    text: 'It went good. I think Im ready for the math part. Thanks for asking',
    timestamp: 'Today 3:58pm',
    status: 'delivered',
  },
  {
    id: 'msg-3',
    personId: 'person-2',
    personName: 'Denise Williams',
    direction: 'outgoing',
    text: 'Denise, your mentor meeting with Maria is Thursday at 2pm at the parish hall. Let me know if you need a ride.',
    timestamp: 'Today 2:15pm',
    status: 'delivered',
  },
  {
    id: 'msg-4',
    personId: 'person-6',
    personName: 'Kevin Harris',
    direction: 'outgoing',
    text: 'Kevin, I have a lead on a housing opening. Can you call me today?',
    timestamp: 'Today 11:30am',
    status: 'read',
  },
  {
    id: 'msg-5',
    personId: 'person-6',
    personName: 'Kevin Harris',
    direction: 'incoming',
    text: 'Yes!! Calling you after lunch',
    timestamp: 'Today 11:45am',
    status: 'delivered',
  },
  {
    id: 'msg-6',
    personId: 'person-3',
    personName: 'Robert Davis',
    direction: 'outgoing',
    text: "Robert, congratulations on the 90-day milestone! You've earned it.",
    timestamp: 'Yesterday 4:10pm',
    status: 'read',
  },
  {
    id: 'msg-7',
    personId: 'person-3',
    personName: 'Robert Davis',
    direction: 'incoming',
    text: "Thank you. Couldn't have done it without y'all. Means a lot.",
    timestamp: 'Yesterday 5:02pm',
    status: 'delivered',
  },
  {
    id: 'msg-8',
    personId: 'person-10',
    personName: 'Terrence Wallace',
    direction: 'outgoing',
    text: 'Terrence, your GED class moved to Room 204 tonight. Same time.',
    timestamp: 'Yesterday 1:20pm',
    status: 'failed',
  },
  {
    id: 'msg-9',
    personId: 'person-11',
    personName: 'Yolanda Reyes',
    direction: 'outgoing',
    text: 'Yolanda, the job fair is Saturday 10am-2pm at the community center. I can help with your resume beforehand.',
    timestamp: 'Yesterday 10:05am',
    status: 'delivered',
  },
  {
    id: 'msg-10',
    personId: 'person-11',
    personName: 'Yolanda Reyes',
    direction: 'incoming',
    text: 'That would be great. Can we meet Friday afternoon?',
    timestamp: 'Yesterday 10:32am',
    status: 'delivered',
  },
];

// ── Status badge helpers ──

function deliveryBadge(status: DeliveryStatus) {
  switch (status) {
    case 'read':
      return (
        <span className="inline-flex items-center gap-0.5 text-[11px] text-green-700">
          <CheckCheck className="h-3 w-3" /> Read
        </span>
      );
    case 'delivered':
      return (
        <span className="inline-flex items-center gap-0.5 text-[11px] text-blue-700">
          <Check className="h-3 w-3" /> Delivered
        </span>
      );
    case 'failed':
      return (
        <span className="inline-flex items-center gap-0.5 text-[11px] text-red-600">
          <AlertCircle className="h-3 w-3" /> Failed
        </span>
      );
  }
}

// ── Component ──

export default function TextCommunication() {
  const [recipient, setRecipient] = useState('');
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (!recipient || !message.trim()) {
      toast('Please select a recipient and type a message.');
      return;
    }
    const person = mockPeople.find((p) => p.id === recipient);
    toast(`Message sent to ${person?.firstName ?? 'recipient'}.`);
    setMessage('');
  };

  return (
    <div className="min-h-screen bg-red-50/40">
      {/* Header */}
      <div className="bg-red-950 text-white px-6 py-10">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <MessageSquare className="h-7 w-7 text-red-300" />
            <h1 className="font-serif text-3xl font-bold">Text Communication</h1>
          </div>
          <p className="text-red-200 max-w-2xl text-lg leading-relaxed">
            Most returning citizens don't have email — they have a prepaid phone. Text is how you
            reach them.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8 space-y-10">
        {/* ────── 1. Quick Send ────── */}
        <section>
          <h2 className="font-serif text-xl font-semibold text-red-900 mb-4 flex items-center gap-2">
            <Send className="h-5 w-5" /> Quick Send
          </h2>
          <Card className="border-red-100">
            <CardContent className="pt-6 space-y-4">
              {/* Recipient */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">Recipient</label>
                <Select value={recipient} onValueChange={setRecipient}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose a person..." />
                  </SelectTrigger>
                  <SelectContent>
                    {peopleWithPhones.map((p) => (
                      <SelectItem key={p.id} value={p.id}>
                        {p.firstName} {p.lastName} — {p.phone}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">Message</label>
                <Textarea
                  placeholder="Type your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value.slice(0, 160))}
                  rows={3}
                  className="resize-none"
                />
                <p className="text-xs text-gray-500 text-right">
                  <span className={message.length >= 150 ? 'text-red-600 font-medium' : ''}>
                    {message.length}
                  </span>
                  /160
                </p>
              </div>

              {/* Template buttons */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Templates
                </label>
                <div className="flex flex-wrap gap-2">
                  {templates.map((t) => (
                    <Button
                      key={t}
                      variant="outline"
                      size="sm"
                      className="text-xs border-red-200 text-red-800 hover:bg-red-50"
                      onClick={() => setMessage(t)}
                    >
                      {t}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Send */}
              <div className="pt-2">
                <Button
                  className="bg-red-900 hover:bg-red-800 text-white"
                  onClick={handleSend}
                >
                  <Send className="h-4 w-4 mr-2" /> Send Message
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* ────── 2. Scheduled Reminders ────── */}
        <section>
          <h2 className="font-serif text-xl font-semibold text-red-900 mb-4 flex items-center gap-2">
            <Clock className="h-5 w-5" /> Scheduled Reminders
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {scheduledReminders.map((r, i) => (
              <Card key={i} className="border-red-100">
                <CardContent className="pt-5 pb-4 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <Link
                        to={`/people/${r.personId}`}
                        className="text-sm font-semibold text-red-900 hover:text-red-700 underline underline-offset-2 decoration-red-300"
                      >
                        {r.personName}
                      </Link>
                      <p className="text-sm text-gray-700 mt-1">{r.message}</p>
                    </div>
                    <Badge className="bg-red-100 text-red-800 border-red-200 text-[11px] shrink-0">
                      <Clock className="h-3 w-3 mr-1" />
                      {r.scheduledTime}
                    </Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 text-xs border-red-200 text-red-800 hover:bg-red-50"
                    >
                      <Pencil className="h-3 w-3 mr-1" /> Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 text-xs text-gray-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <X className="h-3 w-3 mr-1" /> Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* ────── 3. Recent Messages ────── */}
        <section>
          <h2 className="font-serif text-xl font-semibold text-red-900 mb-4 flex items-center gap-2">
            <Phone className="h-5 w-5" /> Recent Messages
          </h2>
          <Card className="border-red-100">
            <CardContent className="pt-6 pb-4">
              <div className="space-y-3">
                {recentMessages.map((msg) => {
                  const isOutgoing = msg.direction === 'outgoing';
                  return (
                    <div
                      key={msg.id}
                      className={`flex ${isOutgoing ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[75%] rounded-2xl px-4 py-3 space-y-1.5 ${
                          isOutgoing
                            ? 'bg-red-900 text-white rounded-br-md'
                            : 'bg-gray-100 text-gray-900 rounded-bl-md'
                        }`}
                      >
                        {/* Name & timestamp header */}
                        <div
                          className={`flex items-center gap-2 text-[11px] ${
                            isOutgoing ? 'text-red-200' : 'text-gray-500'
                          }`}
                        >
                          <Link
                            to={`/people/${msg.personId}`}
                            className={`font-semibold underline underline-offset-2 ${
                              isOutgoing
                                ? 'text-red-100 decoration-red-400 hover:text-white'
                                : 'text-gray-700 decoration-gray-400 hover:text-gray-900'
                            }`}
                          >
                            {msg.personName}
                          </Link>
                          <span>{msg.timestamp}</span>
                        </div>
                        {/* Message body */}
                        <p
                          className={`text-sm leading-relaxed ${
                            isOutgoing ? 'text-red-50' : 'text-gray-800'
                          }`}
                        >
                          {msg.text}
                        </p>
                        {/* Delivery status */}
                        {isOutgoing && (
                          <div className="flex justify-end">{deliveryBadge(msg.status)}</div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Warm footer */}
          <div className="mt-6 text-center">
            <p className="text-sm text-red-800/70 italic flex items-center justify-center gap-1.5">
              <Heart className="h-3.5 w-3.5" />
              Every text is a thread of connection. Keep reaching out.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
