'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ArrowUpRight, CheckCircle2, LoaderCircle } from 'lucide-react';
export default function ContactForm() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();
  const [status, setStatus] = useState(null);
  const key = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
  async function onSubmit(values) {
    setStatus(null);
    if (!key) { setStatus({ ok: false, text: 'Xabar yuborish hali sozlanmagan. Sayt egasi Web3Forms kalitini ulashi kerak.' }); return; }
    if (values.botcheck) return;
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ access_key: key, name: values.name.trim(), email: values.email.trim(), message: values.message.trim(), subject: 'Portfolio orqali yangi xabar', from_name: 'Iroda Portfolio', botcheck: '' }),
        signal: AbortSignal.timeout(20000),
      });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error('send-failed');
      setStatus({ ok: true, text: 'Rahmat! Xabaringiz yuborildi. Tez orada javob beraman.' }); reset();
    } catch { setStatus({ ok: false, text: 'Xabar yuborilmadi. Internetni tekshirib, qayta urinib ko‘ring yoki ijtimoiy tarmoq orqali yozing.' }); }
  }
  return <form onSubmit={handleSubmit(onSubmit)} noValidate className="contact-form">
    <div className="form-top"><span>Yangi suhbat boshlaymiz</span><span className="mono">hello, world_</span></div>
    <div className="form-row">
      <div><label htmlFor="name">Ismingiz</label><input id="name" autoComplete="name" placeholder="Ismingizni yozing" maxLength={80} aria-invalid={!!errors.name} aria-describedby={errors.name ? 'name-error' : undefined} {...register('name', { required: 'Ismingizni kiriting.', validate: value => value.trim().length >= 2 || 'Kamida 2 ta belgi kiriting.', maxLength: 80 })}/>{errors.name && <p id="name-error" className="field-error">{errors.name.message}</p>}</div>
      <div><label htmlFor="email">Email</label><input id="email" type="email" autoComplete="email" placeholder="siz@example.com" maxLength={254} aria-invalid={!!errors.email} aria-describedby={errors.email ? 'email-error' : undefined} {...register('email', { required: 'Emailingizni kiriting.', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'To‘g‘ri email kiriting.' }, maxLength: 254 })}/>{errors.email && <p id="email-error" className="field-error">{errors.email.message}</p>}</div>
    </div>
    <label htmlFor="message">Xabaringiz</label><textarea id="message" rows={5} placeholder="G‘oyangiz, savolingiz yoki shunchaki salom..." maxLength={3000} aria-invalid={!!errors.message} aria-describedby={errors.message ? 'message-error' : undefined} {...register('message', { required: 'Xabar yozing.', validate: v => v.trim().length >= 10 || 'Kamida 10 ta belgi yozing.', maxLength: 3000 })}/>
    {errors.message && <p id="message-error" className="field-error">{errors.message.message}</p>}
    <input type="checkbox" className="honeypot" tabIndex={-1} aria-hidden="true" {...register('botcheck')}/>
    <button className="button primary send-button" disabled={isSubmitting} type="submit">{isSubmitting ? 'Yuborilmoqda...' : 'Xabar yuborish'}{isSubmitting ? <LoaderCircle className="spin" size={19}/> : <ArrowUpRight size={20}/>}</button>
    <p className="form-note">Xabaringiz javob berish uchun ishlatiladi. Yuborish Web3Forms orqali amalga oshiriladi.</p>
    {status && <div role={status.ok ? 'status' : 'alert'} className={`form-status ${status.ok ? 'success' : 'error'}`}>{status.ok && <CheckCircle2 size={18}/>}<span>{status.text}</span></div>}
  </form>;
}
