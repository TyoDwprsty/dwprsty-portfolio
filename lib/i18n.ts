export type Lang = "en" | "id";

export const translations = {
  en: {
    // Navbar
    nav_home: "Home",
    nav_about: "About",
    nav_projects: "Projects",
    nav_contact: "Contact",

    // Hero
    hero_title: "Hi, I'm Dwi",
    hero_subtitle:
      "Crafting beautiful, performant web experiences with modern technologies. Passionate about clean code, user experience, and solving complex problems.",
    hero_cta_work: "View My Work",
    hero_cta_contact: "Get in Touch",

    // About
    about_heading: "About Me",
    about_p1:
      "I'm a full-stack developer with a passion for creating intuitive, high-performance web applications. With expertise in modern frontend frameworks and backend technologies, I deliver solutions that are both beautiful and functional.",
    about_p2:
      "My journey in tech started with curiosity about how things work on the internet. Over the years, I've developed a strong foundation in React, Next.js, Vue.js, and database design.",
    about_p3:
      "When I'm not coding, I enjoy learning new technologies, contributing to open-source projects, and exploring the intersection of design and development.",
    skills_heading: "Skills",

    // Projects
    projects_heading: "Featured Projects",
    projects_subtext:
      "A selection of recent work that showcases my skills and expertise",

    // Contact
    contact_heading: "Let's Connect",
    contact_subtitle_heading: "Get in Touch",
    contact_subtitle:
      "I'm always interested in hearing about new projects and opportunities. Whether you have a question or just want to say hello, feel free to reach out!",
    contact_name_label: "Name",
    contact_name_placeholder: "What you called as?",
    contact_email_label: "Email",
    contact_message_label: "Message",
    contact_message_placeholder:
      "Feel free to drop couple words about why you're here...",
    contact_send_btn: "Send Message",
    contact_sending: "Sending...",
    contact_success: "✓ Message sent! I'll get back to you soon.",

    // Footer
    footer_text: "© 2026 Dprasetyo. All rights reserved. Built with React, Next.js, and Tailwind CSS.",
  },

  id: {
    // Navbar
    nav_home: "Beranda",
    nav_about: "Tentang",
    nav_projects: "Proyek",
    nav_contact: "Kontak",

    // Hero
    hero_title: "Hai, Saya Dwi",
    hero_subtitle:
      "Membangun pengalaman web yang indah dan berperforma tinggi dengan teknologi modern. Bersemangat tentang kode yang bersih, pengalaman pengguna, dan memecahkan masalah kompleks.",
    hero_cta_work: "Lihat Karya Saya",
    hero_cta_contact: "Hubungi Saya",

    // About
    about_heading: "Tentang Saya",
    about_p1:
      "Saya seorang full-stack developer yang semangat dan antusias dalam menciptakan aplikasi web yang intuitif dan berperforma tinggi. Dengan keahlian di framework frontend modern dan teknologi backend, saya memberikan solusi yang indah sekaligus fungsional.",
    about_p2:
      "Perjalanan karir saya di dunia teknologi dimulai dari rasa ingin tahu tentang cara membuat website. Selama bertahun-tahun, saya membangun fondasi yang kuat dalam React, Next.js, Vue.js, dan desain database.",
    about_p3:
      "Di luar coding, saya senang mempelajari teknologi baru, berkontribusi pada proyek open-source, dan mengeksplorasi perpaduan antara desain dan pengembangan.",
    skills_heading: "Skills",

    // Projects
    projects_heading: "Proyek Unggulan",
    projects_subtext:
      "Pilihan karya terbaru yang menampilkan kemampuan dan keahlian saya",

    // Contact
    contact_heading: "Mari Terhubung",
    contact_subtitle_heading: "Hubungi Saya",
    contact_subtitle:
      "Saya selalu tertarik mendengar tentang proyek dan peluang baru. Apakah Anda punya pertanyaan atau sekadar ingin menyapa, jangan ragu untuk menghubungi!",
    contact_name_label: "Nama",
    contact_name_placeholder: "Siapa nama panggilan kamu?",
    contact_email_label: "Email",
    contact_message_label: "Pesan",
    contact_message_placeholder:
      "Ceritakan sedikit alasan kamu di sini...",
    contact_send_btn: "Kirim Pesan",
    contact_sending: "Mengirim...",
    contact_success: "✓ Pesan terkirim! Saya akan segera merespons.",

    // Footer
    footer_text: "© 2026 Dprasetyo. Hak cipta dilindungi. Dibuat menggunakan React, Next.js, dan Tailwind CSS.",
  },
} as const;

export type TranslationKey = keyof typeof translations.en;
