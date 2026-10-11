# Iroda — Next.js portfolio

Qora + bordo rangli bir sahifalik portfolio. Profil rasmingiz qo‘shilgan.

## 1. ZIP ochish va ishga tushirish (Windows / VS Code)

1. ZIP ustida o‘ng tugma → «Извлечь все…» / Extract All.
2. VS Code → File → Open Folder. **Ichida `package.json` turgan `iroda-portfolio` papkasini oching.** Tashqi papkani adashtirmang.
3. Terminal → New Terminal.
4. `node -v` orqali Node.js versiyasini tekshiring. Node.js 22 yoki 24 LTS ishlating (minimal talab 20.9).
5. Quyidagi buyruqlarni ketma-ket yozing:

```powershell
npm install
npm run dev
```

Brauzerda http://localhost:3000 ni oching. Terminal ochiq tursin. To‘xtatish: Ctrl+C.
Agar 3000 band bo‘lsa, Next.js terminalda boshqa port ko‘rsatadi — o‘sha manzilni oching.
Agar PowerShell «npm.ps1 cannot be loaded» desa, `npm.cmd install` va `npm.cmd run dev` ishlating yoki terminal profilini Command Prompt qiling.

## 2. O‘zingizning havolalaringiz

`lib/portfolio.js` ni oching. `profile` ichidagi bo‘sh qiymatlarni to‘ldiring:

```js
github: "https://github.com/SIZNING_USERNAME",
telegram: "https://t.me/SIZNING_USERNAME",
email: "sizning-emailingiz@gmail.com",
```

Qo‘shtirnoq va vergullar qolsin. Bular namuna — o‘zingizning haqiqiy manzilingizni yozing.
Telegram uchun faqat username; telefon raqami kerak emas.
Hozir aniq manzillar berilmagani sabab ijtimoiy havolalar «Tez orada» holatida. Qiymatni yozishingiz bilan bosiladigan havolaga aylanadi.

`projects` ro‘yxatidagi `url` — saytga kirish havolasi; `github` — loyiha kodi joylashgan repository.
Birinchi Pul, Travio va Mediapark uchun oldingi loyihalaringiz manzillari qo‘yilgan. Ularning hozir ochilishini masofadan tasdiqlash imkoni bo‘lmadi; taqdimotdan oldin uchalasini brauzeringizda ochib tekshiring. Zarur bo‘lsa Vercel’dagi amaldagi URL bilan almashtiring.
Kartadagi tasvirlar haqiqiy sayt screenshotlari emas, loyiha mavzusidagi CSS UI eskizlaridir va shunday belgilangan.

Profil rasmi: `public/profile.png`. Yangi rasm ishlatmoqchi bo‘lsangiz shu faylni almashtiring yoki `profile.image` ni yangilang. Mahalliy rasm uchun Next Image domen sozlamasi kerak emas.

## 3. Emailga xabar kelishini ulash

Forma **React Hook Form** bilan yozilgan. Xabarlarni **Web3Forms** emailingizga yetkazadi. Alohida backend, MongoDB va Gmail paroli kerak emas.

1. https://web3forms.com ni oching.
2. Xabar kelishini istagan emailingiz orqali Access Key oling; xizmat yuborgan tasdiqlash ko‘rsatmalarini bajaring.
3. VS Code terminalida, `package.json` bor joyda:

```powershell
Copy-Item .env.example .env.local
```

4. Yaratilgan `.env.local` ni ochib kalitni qo‘ying:

```dotenv
NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=BU_YERGA_WEB3FORMS_KALITINGIZ
```

5. Terminalda Ctrl+C, so‘ng `npm run dev`.
6. Formaga ism, haqiqiy email va kamida 10 belgili xabar yozib yuboring. Emailning Inbox va Spam papkalarini tekshiring.

**Muhim farq:** `profile.email` saytda ko‘rinadigan manzil. Xabar qaysi emailga borishini Web3Forms kaliti belgilaydi. Ikkalasida ham bir xil emailingizni ishlating.

Kalit bo‘lmasa sayt ochiladi, lekin forma yuborishda ulanish kerakligini aytadi. Kalitsiz yoki API javobi xato bo‘lsa «Yuborildi» deb yolg‘on xabar chiqmaydi. Real yetkazish kalitingiz bilan tekshirilishi kerak.

Bu public form kaliti: `NEXT_PUBLIC_` qiymati brauzerga chiqadi. Bu joyga email paroli, Gmail App Password yoki maxfiy server kaliti yozmang. Spamdan himoya uchun honeypot qo‘shilgan; Web3Forms hisobidagi mavjud himoya sozlamalaridan ham foydalanishingiz mumkin.

## 4. GitHub’ga push qilish

https://github.com/new orqali **iroda-portfolio** nomli yangi, bo‘sh repository yarating. README / .gitignore / license yaratish kataklarini belgilamang (loyihada fayllar allaqachon bor).

VS Code terminali `package.json` bor papkada ochilgan bo‘lsin:

```powershell
git init
git add .
git commit -m "Create Iroda portfolio"
git branch -M main
git remote add origin https://github.com/SIZNING_USERNAME/iroda-portfolio.git
git push -u origin main
```

`SIZNING_USERNAME` ni almashtiring. GitHub oynasi ochilsa o‘z akkauntingiz bilan kiring.
Git ism/email so‘rasa o‘z ma’lumotingiz bilan:

```powershell
git config user.name "Iroda Inoyatullayeva"
git config user.email "GITHUB_EMAILINGIZ"
git commit -m "Create Iroda portfolio"
git push -u origin main
```

Agar `remote origin already exists` desa, avval `git remote -v` bilan tekshiring. Bu aynan portfolio papkasi ekaniga ishonch hosil qilgach:

```powershell
git remote set-url origin https://github.com/SIZNING_USERNAME/iroda-portfolio.git
git push -u origin main
```

`node_modules`, `.next`, `.env.local` GitHub’ga ketmaydi — `.gitignore` tayyor.
Boshqa loyiha repositorysi ichida ishlamang. Bu ZIP’da Git tarixi yo‘q.

Keyingi o‘zgarishlarda:

```powershell
git add .
git commit -m "Update portfolio"
git push
```

## 5. Vercel’ga deploy

1. https://vercel.com saytida GitHub akkauntingiz bilan kiring.
2. Add New → Project → `iroda-portfolio` → Import.
3. Framework Preset: **Next.js**.
4. Root Directory: **`./`** — agar GitHub repository ildizida `package.json` bo‘lsa. Agar tashqi papkani ham push qilgan bo‘lsangiz, `package.json` bor ichki `iroda-portfolio` ni tanlang.
5. Build Command: `npm run build`. Output Directory: Next.js default qiymatini o‘zgartirmang. Install Command: `npm install` (odatda avtomatik).
6. Environment Variables bo‘limida quyidagini qo‘shing:

| Name | Value | Qayerga qo‘yiladi |
| --- | --- | --- |
| `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` | Web3Forms bergan haqiqiy kalit | Production, Preview, Development |

Bu loyihada boshqa majburiy variable yo‘q. MONGO_URI, JWT_SECRET, SMTP yoki VERCEL_TOKEN kerak emas.

7. Deploy bosing. Tayyor bo‘lgach berilgan `.vercel.app` manzilini oching.
8. Navbar, telefon menyusi, loyiha havolalari va email formasini tekshiring.

Kalitni keyin o‘zgartirsangiz: Project → Settings → Environment Variables → saqlang → Deployments → eng so‘nggi deployment → Redeploy. `NEXT_PUBLIC_` build vaqtida kiritiladi; faqat variable saqlash bilan eski deployment yangilanmaydi.

GitHub bilan ulanganidan keyin `main` branch’ga navbatdagi push Vercel’da yangi deployment boshlaydi.

## 6. Maktabda ko‘rsatishdan oldin

- GitHub va Telegram linklarini kiriting.
- Profil rasm va ismni ko‘ring.
- Uchta loyiha havolasini yangi tabda oching.
- Email formasini haqiqiy Web3Forms kaliti bilan sinang.
- Telefonda navbar menyusi va loyiha filtrini tekshiring.
- Internet muammosi uchun noutbukda mahalliy saytni ham tayyorlab qo‘ying:

```powershell
npm run build
npm run start
```

http://localhost:3000 ochiladi. Birinchi `npm install` uchun internet kerak. Asosiy sahifa va profil rasmi mahalliy ishlaydi; email, tashqi loyihalar va Google Fonts uchun internet kerak (font yuklanmasa Arial ishlatiladi).

Qisqa tanishtirish: «Bu mening shaxsiy portfolio saytim. Next.js’da yozilgan. Bu yerda o‘zim haqimda, ishlatadigan texnologiyalarim va loyihalarim bor. Navbar bir sahifadagi bo‘limlarga olib boradi. Loyihani shu yerdan ochish va forma orqali menga xabar yuborish mumkin.»

## Fayllar

- `lib/portfolio.js` — ism, matnlar, ijtimoiy linklar va loyihalar.
- `components/Portfolio.jsx` — sahifa, mobil menyu, filtrlar va animatsiyalar.
- `components/ContactForm.jsx` — React Hook Form va Web3Forms yuborish.
- `app/globals.css` — responsive dizayn, dark/bordo ranglar, hover va harakatlar.
- `app/layout.jsx` — sahifa nomi, SEO tavsifi va til.
- `public/profile.png` — profil rasmi.
- `.env.example` — zarur variable namunasi.

Ranglar CSS boshidagi `:root` ichida. Harakatni kamaytirish sozlamasi yoqilgan qurilmalarda animatsiyalar o‘chadi. Bu faqat dark dizayn, light/dark almashtirish tugmasi yo‘q.

## Rasmiy yo‘riqnomalar

- https://nextjs.org/docs/app/getting-started/installation
- https://docs.web3forms.com/how-to-guides/js-frameworks/react-js/react-js
- https://docs.web3forms.com/getting-started/faq
- https://vercel.com/docs/git/vercel-for-github
- https://vercel.com/docs/environment-variables

## Tayyorlashdagi tekshiruv

`npm run build` muvaffaqiyatli yakunlandi (Next.js 16.4.0). HTML’dagi bo‘lim havolalari, takrorlanmaydigan ID’lar va formaning label bog‘lanishlari tekshirildi. Brauzerda vizual va bosish sinovi bu muhitda bajarilmadi. Web3Forms kaliti, GitHub va Telegram manzillari egasi tomonidan kiritilishi kerak; haqiqiy email yuborish sinovi bajarilmagan.

## V2 — yangi animatsiyalar

- Ochilishda qisqa `iroda.` intro va yuqoriga ochiladigan parda.
- Hero sarlavhasining satrma-satr ko‘tarilishi va tugmalarning ketma-ket chiqishi.
- Profil rasmining kirish animatsiyasi, sichqonchaga ergashadigan 3D og‘ish va yorug‘lik yaltirashi.
- Fonda bordo yorug‘lik, suzuvchi kod belgilar va kursor atrofidagi mayin nur.
- Uzluksiz yuradigan texnologiyalar qatori (ustiga sichqoncha keltirilsa to‘xtaydi).
- Scroll bo‘yicha ochiladigan bo‘limlar, ketma-ket chiqadigan kartalar, hover effektlari.
- Ekran tepasida sahifa o‘qish progress chizig‘i.
- Pastki o‘ng burchakda animatsiyalarni o‘chirish/yoqish tugmasi.

Asosiy yangi fayl: `components/MotionExperience.jsx`. Qo‘shimcha CSS: `app/globals.css` oxiridagi `ENTRANCE + INTERACTIVE MOTION — v2` bo‘limi.

**Oldingi versiya sizda sozlangan bo‘lsa:** faqat `components/Portfolio.jsx`, `components/MotionExperience.jsx` va `app/globals.css` fayllarini shu versiyadan ko‘chiring. O‘zingiz to‘ldirgan `.env.local` va `lib/portfolio.js` fayllarini saqlab qoling. Yangi kutubxona kerak emas. Terminaldagi serverni qayta ishga tushiring; intro animatsiyasini qayta ko‘rish uchun brauzer sahifasini yangilang.

Qurilmada Reduce Motion / harakatni kamaytirish sozlamasi yoqilgan bo‘lsa animatsiyalar avtomatik o‘chadi. Telefonda kursor va 3D og‘ish effektlari ishlatilmaydi. Intro uchun sun’iy tarmoq so‘rovi yoki haqiqiy yuklanish indikatori yo‘q; bu qisqa vizual kirish.
