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
    <div className="flex flex-col h-full bg-white p-3" style={{ fontFamily: 'var(--font-tahoma)' }}>
      {/* Header */}
      <div className="pb-2 mb-3" style={{
        borderBottom: '2px solid #0054e3',
      }}>
        <h2 className="text-base font-bold" style={{ color: '#000080' }}>Get in Touch</h2>
        <p className="text-xs text-gray-600 mt-1">{siteData.contact.subtext}</p>
      </div>

      {/* Contact Methods */}
      <div className="flex-1 space-y-2">
        {contactMethods.map((method) => (
          <a
            key={method.label}
            href={method.href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleContactClick(method.label.toLowerCase())}
            className="block p-3 border-2 transition-colors"
            style={{
              backgroundColor: '#ece9d8',
              borderTopColor: '#ffffff',
              borderLeftColor: '#ffffff',
              borderRightColor: '#808080',
              borderBottomColor: '#808080',
              textDecoration: 'none',
              color: '#000000',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#e5f3ff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#ece9d8';
            }}
          >
            <div className="flex items-center gap-3">
              <div className="text-2xl">{method.icon}</div>
              <div className="flex-1">
                <div className="font-bold text-sm mb-0.5" style={{ color: '#000080' }}>{method.label}</div>
                <div className="text-xs text-gray-600">{method.value}</div>
              </div>
              <div className="text-gray-500">→</div>
            </div>
          </a>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-3 pt-2 text-xs text-gray-600 text-center" style={{
        borderTop: '1px solid #808080',
      }}>
        I typically respond within 24-48 hours
      </div>
    </div>
  );
};
