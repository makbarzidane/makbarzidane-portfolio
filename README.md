# M. Akbar Zidane Portfolio

Website landing page portfolio pribadi untuk M. Akbar Zidane. Project ini dibuat untuk menampilkan profil, data diri, portfolio project, AI agent workflow, CV, dan CTA kontak.

## Tech Stack

- Next.js
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide Icons

## Cara Menjalankan Project

```bash
npm install
npm run dev
```

Buka `http://localhost:3000` di browser.

## Mengganti Data Portfolio

Cara paling mudah adalah membuka halaman CMS:

```bash
http://localhost:3000/admin
```

Dari CMS sederhana tersebut kamu bisa mengedit:

- Nama, role, bio singkat, dan foto
- Link WhatsApp, GitHub, Instagram, dan Email
- Data portfolio project
- Data agent package
- Export/import konten JSON

Data CMS disimpan di `localStorage` browser. Untuk versi permanen lintas perangkat, gunakan fitur Export JSON lalu jadikan data tersebut sebagai acuan update source code.

Data default website ada di `data/cmsContent.ts` dan `data/content.ts`.

Yang bisa diganti dari file tersebut:

- Menu navbar
- Tech stack
- Project portfolio
- AI project
- Layanan
- Alasan memilih
- Link WhatsApp, GitHub, Instagram, dan Email

Untuk link demo dan GitHub setiap project, ubah nilai `demoUrl` dan `githubUrl` pada array `projects`.

## Deploy ke Vercel

1. Push project ke GitHub.
2. Login ke Vercel.
3. Import repository.
4. Pastikan framework terdeteksi sebagai Next.js.
5. Klik Deploy.

Project ini tidak menggunakan CMS dan database, jadi siap deploy sebagai landing page statis Next.js.
