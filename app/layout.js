export const metadata = {
  title: "My App",
  description: "Next.js app"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
