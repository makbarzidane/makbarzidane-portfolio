# M. Akbar Zidane Portfolio

Portfolio pribadi untuk **M. Akbar Zidane**. Website ini berfokus pada profile, data diri, hasil project, paket AI agent, CV, kontak, animasi motion, dan CMS sederhana untuk mengedit konten penting.

Live website:

```text
https://m-akbar-zidane-portfolio.vercel.app
```

Repository:

```text
https://github.com/makbarzidane/makbarzidane-portfolio
```

## Fitur Utama

- Landing portfolio personal dengan visual profile besar.
- Animasi preloader dan reveal motion.
- Portfolio project dengan preview visual dari link live atau GitHub.
- Toggle bahasa Indonesia dan Inggris.
- Halaman CV internal di `/cv`.
- CMS sederhana di `/admin` dengan login via API server.
- CMS online berbasis Vercel Blob agar perubahan terbaca dari laptop dan HP.

## Tech Stack

- Next.js
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide Icons
- Vercel

## Menjalankan Project

```bash
npm install
npm run dev
```

Buka:

```text
http://localhost:3000
```

CMS:

```text
http://localhost:3000/admin
```

## Konfigurasi Login CMS

Login CMS divalidasi melalui API route server, jadi credential tidak ditampilkan di halaman login.

Buat environment variable berikut di local atau Vercel:

```text
CMS_USERNAME
CMS_PASSWORD
BLOB_READ_WRITE_TOKEN
```

Untuk local development, buat file `.env.local`:

```text
CMS_USERNAME=isi_username
CMS_PASSWORD=isi_password
BLOB_READ_WRITE_TOKEN=isi_token_vercel_blob
```

`BLOB_READ_WRITE_TOKEN` dibuat otomatis saat Vercel Blob Storage ditambahkan ke project. Token ini dipakai server untuk menyimpan `cms/content.json` dan file upload CMS ke folder `cms-uploads`.

## Mengedit Konten

Konten default berada di:

```text
data/cmsContent.ts
```

Dari CMS `/admin`, kamu bisa mengedit:

- Hero profile, foto, CV, dan data diri.
- Kontak.
- Project portfolio, link demo, link GitHub, dan preview image.
- Paket AI agent.
- Export/import JSON.

Catatan: perubahan CMS tersimpan online setelah Vercel Blob Storage aktif dan `BLOB_READ_WRITE_TOKEN` terpasang di Vercel. Tanpa token tersebut, API akan menampilkan pesan konfigurasi dan tidak menyimpan perubahan sebagai data online.

## Portfolio Default

Project default yang ditampilkan:

- M. Akbar Zidane Portfolio
- Zimeira Agent Online
- 2Z Reklame & Cutting Sticker Company Profile
- Zimeira Tech Website
- E-Commerce Hijab Website
- Besemah Coffee
- Homestay Bukit Dempo
- QR Ordering System Cafe
- Apex Legends Sentiment Analysis

## Deploy

Project ini siap deploy ke Vercel.

```bash
npx vercel --prod
```
