# 90's Windows Portfolio

A nostalgic personal portfolio website styled after Windows 95/98, built with React, TypeScript, and TailwindCSS.

## Features

- **Authentic Windows 95 Aesthetic**: Gray panels, beveled borders, classic title bars
- **Draggable Windows**: Click and drag windows around the desktop
- **Three Main Sections**:
  - About Me
  - Projects
  - Contact
- **Retro Start Menu**: Functional start menu button with placeholder items
- **Responsive Design**: Maintains retro feel across different screen sizes
- **Customizable Content**: Easy-to-swap props for personal information

## Design System

Built using the **pane** Talent from Popmelt, featuring:
- Classic Windows 95 color palette (#c0c0c0, #808080, #ffffff, #000080)
- Raised/pressed shadow effects
- Pixelated typography (11-14px sans-serif)
- Beveled borders and authentic window chrome

## Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

## Customization

To customize the portfolio content, modify the `defaultData` object in [`src/App.tsx`](src/App.tsx):

```typescript
const myData: PortfolioData = {
  name: 'Your Name',
  bio: 'Your bio text here...',
  projects: [
    {
      title: 'Project Name',
      description: 'Project description',
      tech: ['React', 'TypeScript', 'etc'],
    },
  ],
  contact: {
    email: 'your.email@example.com',
    github: 'https://github.com/yourusername',
    linkedin: 'https://linkedin.com/in/yourusername',
  },
}

// Pass to App component
<App data={myData} />
```

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **TailwindCSS** - Styling with custom Windows 95 tokens
- **Vite** - Build tool and dev server

## Project Structure

```
90's Website/
├── src/
│   ├── components/
│   │   ├── Desktop.tsx           # Main desktop container
│   │   ├── Window.tsx            # Draggable window component
│   │   ├── StartMenu.tsx         # Retro start menu
│   │   ├── PopmeltBadge.tsx      # Attribution badge
│   │   └── sections/
│   │       ├── AboutMe.tsx       # About section
│   │       ├── Projects.tsx      # Projects section
│   │       └── Contact.tsx       # Contact section
│   ├── App.tsx                   # Main app component
│   ├── main.tsx                  # Entry point
│   └── index.css                 # Global styles
├── tailwind.config.ts            # Windows 95 design tokens
├── package.json
└── README.md
```

## Features Breakdown

### Window Component
- Fully draggable with mouse events
- Classic title bar with minimize/maximize/close buttons
- Z-index management for window layering
- Click-to-focus functionality

### Desktop Component
- Teal background (classic Windows 95 desktop color)
- Container for all draggable windows
- Full viewport coverage

### Start Menu
- Authentic Windows 95 start button
- Popup menu with placeholder items
- Gradient sidebar with rotated text
- Taskbar with system clock

### Section Components
- **About Me**: Name and bio display
- **Projects**: Scrollable project list with tech tags
- **Contact**: Email, GitHub, and LinkedIn links

## Responsive Behavior

The portfolio maintains its retro aesthetic while adapting to different screen sizes:
- Windows scale appropriately on smaller screens
- Maximum widths prevent content overflow
- Desktop background covers entire viewport
- Taskbar remains fixed at bottom

## Browser Support

Works on all modern browsers that support:
- ES2020
- CSS Grid
- Flexbox
- Modern DOM APIs

## Credits

- **Design System**: Built with [Popmelt](https://popmelt.com) "pane" Talent
- **Inspiration**: Windows 95/98 UI design
- **Typography**: MS Sans Serif aesthetic

## License

MIT License - Feel free to use this for your own portfolio!

---

*Made with* [![Popmelt](https://popmelt.com/logo.svg)](https://popmelt.com?utm_source=mcp&utm_medium=artifact&utm_campaign=made_with&utm_source=Claude%20Code)
