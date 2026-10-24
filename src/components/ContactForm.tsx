import { useState, type FormEvent } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { FunctionsHttpError } from '@supabase/supabase-js';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckCircle2, Loader2, Send } from 'lucide-react';

type Fields = { name: string; email: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;

const LIMITS = { name: 100, email: 255, message: 2000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validate = (f: Fields): Errors => {
  const e: Errors = {};
  if (!f.name.trim()) e.name = 'Please enter your name';
  if (!EMAIL_RE.test(f.email.trim())) e.email = 'Please enter a valid email';
  if (!f.message.trim()) e.message = 'Please write a message';
  return e;
};

export const ContactForm = () => {
  const [fields, setFields] = useState<Fields>({ name: '', email: '', message: '' });
  const [website, setWebsite] = useState(''); // honeypot
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [formError, setFormError] = useState<string | null>(null);

  const update = (key: keyof Fields) => (e: { target: { value: string } }) => {
    setFields((f) => ({ ...f, [key]: e.target.value }));
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormError(null);
    const found = validate(fields);
    setErrors(found);
    if (Object.keys(found).length) return;

    setStatus('sending');
    const { error } = await supabase.functions.invoke('contact-submit', {
      body: { ...fields, website },
    });
    if (error) {
      let msg = "Couldn't send your message. Please try again or email me directly.";
      if (error instanceof FunctionsHttpError) {
        try {
          const body = await error.context.json();
          if (body?.error) msg = body.error;
          if (body?.fields) {
            setErrors(Object.fromEntries(Object.entries(body.fields).map(([k, v]) => [k, (v as string[])[0]])));
          }
        } catch { /* keep default message */ }
      }
      setFormError(msg);
      setStatus('idle');
      return;
    }
    setStatus('sent');
    setFields({ name: '', email: '', message: '' });
  };

  if (status === 'sent') {
    return (
      <div role="status" className="flex flex-col items-center justify-center gap-3 rounded-lg border border-primary/60 bg-primary/15 p-8 text-center">
        <CheckCircle2 className="h-10 w-10 text-accent" />
        <p className="text-lg font-semibold text-foreground">Message sent — thank you!</p>
        <p className="text-sm text-muted-foreground">I'll get back to you by email.</p>
        <Button variant="ghost" onClick={() => setStatus('idle')} className="mt-2 hover:bg-primary/15">
          Send another message
        </Button>
      </div>
    );
  }

  const fieldClass = 'bg-background/60 border-border/60 focus-visible:ring-accent';

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4" aria-label="Contact form">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="contact-name">Name</Label>
          <Input
            id="contact-name"
            autoComplete="name"
            maxLength={LIMITS.name}
            value={fields.name}
            onChange={update('name')}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'contact-name-error' : undefined}
            className={fieldClass}
            placeholder="Your name"
          />
          {errors.name && <p id="contact-name-error" className="text-sm text-accent">{errors.name}</p>}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="contact-email">Email</Label>
          <Input
            id="contact-email"
            type="email"
            autoComplete="email"
            maxLength={LIMITS.email}
            value={fields.email}
            onChange={update('email')}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'contact-email-error' : undefined}
            className={fieldClass}
            placeholder="you@example.com"
          />
          {errors.email && <p id="contact-email-error" className="text-sm text-accent">{errors.email}</p>}
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="contact-message">Message</Label>
        <textarea
          id="contact-message"
          rows={5}
          maxLength={LIMITS.message}
          value={fields.message}
          onChange={update('message')}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'contact-message-error' : undefined}
          placeholder="How can I help?"
          className={`flex w-full rounded-md border px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-0 md:text-sm resize-y ${fieldClass}`}
        />
        <div className="flex justify-between gap-2">
          {errors.message ? <p id="contact-message-error" className="text-sm text-accent">{errors.message}</p> : <span />}
          <span className="text-xs text-muted-foreground">{fields.message.length}/{LIMITS.message}</span>
        </div>
      </div>

      {/* Honeypot – hidden from people and screen readers */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="contact-website">Website</label>
        <input id="contact-website" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
      </div>

      {formError && <p role="alert" className="text-sm text-accent">{formError}</p>}

      <Button
        type="submit"
        size="lg"
        disabled={status === 'sending'}
        className="w-full bg-primary text-primary-foreground hover:bg-primary/85 hover:shadow-[0_0_30px_hsl(var(--primary)/0.55)] transition-smooth"
      >
        {status === 'sending' ? (
          <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Sending…</>
        ) : (
          <><Send className="mr-2 h-5 w-5" /> Send message</>
        )}
      </Button>
    </form>
  );
};
