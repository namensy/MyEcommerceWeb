export interface FooterSection {
  title: string;
  links: Array<{
    label: string;
    href: string;
  }>;
}

export const footerData: FooterSection[] = [
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Features", href: "/features" },
      { label: "Works", href: "/how-it-works" },
      { label: "Career", href: "/careers" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Customer Support", href: "/support" },
      { label: "Delivery Details", href: "/delivery" },
      { label: "Terms & Conditions", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
    ],
  },
  {
    title: "FAQ",
    links: [
      { label: "Account", href: "/faq/account" },
      { label: "Manage Deliveries", href: "/faq/delivery" },
      { label: "Orders", href: "/faq/orders" },
      { label: "Payments", href: "/faq/payments" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Free eBooks", href: "/resources/ebooks" },
      { label: "Development Tutorial", href: "/resources/tutorials" },
      { label: "How to - Blog", href: "/blog" },
      { label: "Youtube Playlist", href: "/youtube" },
    ],
  },
];
