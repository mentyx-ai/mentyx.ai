export const metadata = {
  title: "Mentyx.ai Demo",
  description: "AI-powered loan origination demo platform",
};

export default function DemoLayout({ children }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          fontFamily: "system-ui, sans-serif",
          background: "#f9fafb",
          color: "#111",
        }}
      >
        {children}
      </body>
    </html>
  );
}
