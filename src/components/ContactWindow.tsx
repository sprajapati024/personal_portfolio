import { loadSiteData } from '../data/dataLoader';

export const ContactWindow: React.FC = () => {
  const siteData = loadSiteData();

  const contactMethods = [
    {
      icon: '📧',
      label: 'Email',
      value: siteData.contact.email,
      href: `mailto:${siteData.contact.email}`,
      color: 'blue',
    },
    {
      icon: '💼',
      label: 'LinkedIn',
      value: 'View Profile',
      href: siteData.contact.linkedin,
      color: 'blue',
    },
  ];

  // Add Calendly if available
  if (siteData.contact.calendly) {
    contactMethods.push({
      icon: '📅',
      label: 'Schedule Meeting',
      value: 'Book a time',
      href: siteData.contact.calendly,
      color: 'green',
    });
  }

  const handleContactClick = (method: string) => {
    // Analytics tracking placeholder
    console.log(`contact_click(${method})`);
  };

  return (
    <div className="flex flex-col h-full" style={{ fontFamily: 'var(--font-tahoma)' }}>
      {/* Header */}
      <div className="border-b-2 border-gray-400 pb-3 mb-4">
        <h2 className="text-xl font-bold">Get in Touch</h2>
        <p className="text-xs text-gray-600 mt-1">{siteData.contact.subtext}</p>
      </div>

      {/* Contact Methods */}
      <div className="flex-1 space-y-3">
        {contactMethods.map((method) => (
          <a
            key={method.label}
            href={method.href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleContactClick(method.label.toLowerCase())}
            className="block p-4 border-2 hover:bg-blue-50 transition-colors"
            style={{
              background: '#ffffff',
              borderTopColor: '#ffffff',
              borderLeftColor: '#ffffff',
              borderRightColor: '#808080',
              borderBottomColor: '#808080',
              textDecoration: 'none',
              color: '#000000',
            }}
          >
            <div className="flex items-center gap-3">
              <div className="text-3xl">{method.icon}</div>
              <div className="flex-1">
                <div className="font-bold text-sm mb-0.5">{method.label}</div>
                <div className="text-xs text-gray-600">{method.value}</div>
              </div>
              <div className="text-gray-400">→</div>
            </div>
          </a>
        ))}
      </div>

      {/* Footer */}
      <div className="border-t border-gray-400 mt-4 pt-3 text-xs text-gray-600 text-center">
        I typically respond within 24-48 hours
      </div>
    </div>
  );
};
