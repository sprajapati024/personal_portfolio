import projectsData from '../data/projects.json';
import siteData from '../data/site.json';

// Type definitions
interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface ChatResponse {
  message: string;
  shouldOpenProject?: string;
  shouldOpenWindow?: string;
}

// Build context from data files
const buildSystemContext = (): string => {
  const projectsList = projectsData.projects
    .map(p => `- ${p.title} (${p.year}): ${p.overview.problem} Tools: ${p.tools.join(', ')}. Impact: ${p.impact.primary}`)
    .join('\n');

  return `You are Shirin Prajapati's AI assistant embedded in his portfolio website.

About Shirin:
- Name: ${siteData.name}
- Title: ${siteData.title}
- Company: ${siteData.company}
- Tagline: ${siteData.tagline}
- Bio: ${siteData.about.bio}
- Stack: ${siteData.about.stack.join(', ')}
- Values: ${siteData.about.values.join(', ')}
- Contact: ${siteData.contact.email}
- Location: Brampton, Ontario
- Phone: 647-573-6089

Professional Experience:
1. Project Manager at Provident Energy Management (Sept 2021 - Present)
   - Directed project decision-making, enhancing operational efficiency and response times
   - Managed capital and operating budgets, achieving 15% cost savings
   - Delivered 90% of projects on time and 10% under budget
   - Conducted detailed Pre-Sales Audits for project planning accuracy
   - Improved logistics processes and metering system operations
   - Enhanced stakeholder communication with detailed project reports

2. Project Coordinator at Provident Energy Management (Oct 2019 - Sept 2021)
   - Primary point of contact for project management
   - Achieved 95% client satisfaction rating
   - Improved project documentation and planning accuracy by 30%

3. Control Centre Operator at Provident Energy Management (Mar 2018 - Oct 2019)

Education:
- Advanced Diploma in Building Systems & Engineering Technician, Seneca College

Skills:
- Technical: Microsoft Outlook, Excel, Bluebeam, Notion, Document Management
- Soft Skills: Time Management, Effective Communication, Risk Management, Critical Thinking & Problem Solving
- Over 5 years in sub-metering industry project lifecycle management

Current Focus:
- Focus: ${siteData.now.focus}
- Experiment: ${siteData.now.experiment}
- Next: ${siteData.now.next}

Projects:
${projectsList}

Your role:
1. Answer questions about Shirin's work, projects, skills, experience, education, and professional background
2. Be conversational and friendly, like MSN Messenger
3. If asked about a specific project, provide details and suggest viewing it
4. If you mention a project that the user should see, include the project slug in your response like this: [OPEN_PROJECT:project-slug]
5. Keep responses concise (2-3 sentences) unless asked for details
6. If asked about tools, reference the specific projects where they were used
7. Be enthusiastic but professional
8. Can answer questions about his career progression, achievements, and professional metrics

Examples:
- "Which project had the biggest impact?" → Mention the payment processing automation (300+ hours saved annually) and suggest: [OPEN_PROJECT:payment-processing-automation]
- "What tools did he use with Notion?" → Reference the Notion PM System and MeterConnex integration projects
- "Tell me about Python" → Mention the multiple Python projects (API integration, payment processing, MDMS validation)
- "What's his experience?" → Highlight 5+ years in sub-metering, career progression from Control Centre Operator to Project Manager
- "What are his achievements?" → Mention 90% on-time delivery, 15% cost savings, 95% client satisfaction, 30% improvement in documentation`;
};

// Parse response for action commands
const parseResponse = (response: string): ChatResponse => {
  const projectMatch = response.match(/\[OPEN_PROJECT:([^\]]+)\]/);
  const windowMatch = response.match(/\[OPEN_WINDOW:([^\]]+)\]/);

  // Remove command markers from the message
  const cleanMessage = response
    .replace(/\[OPEN_PROJECT:[^\]]+\]/g, '')
    .replace(/\[OPEN_WINDOW:[^\]]+\]/g, '')
    .trim();

  return {
    message: cleanMessage,
    shouldOpenProject: projectMatch ? projectMatch[1] : undefined,
    shouldOpenWindow: windowMatch ? windowMatch[1] : undefined,
  };
};

// Main chat function
export const sendChatMessage = async (
  userMessage: string,
  conversationHistory: Message[] = []
): Promise<ChatResponse> => {
  try {
    // Build messages array
    const messages: Message[] = [
      { role: 'system', content: buildSystemContext() },
      ...conversationHistory,
      { role: 'user', content: userMessage }
    ];

    // Call serverless API
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(errorData.error || `API error: ${response.status}`);
    }

    const data = await response.json();
    const assistantMessage = data.message || "Sorry, I couldn't process that. Can you try rephrasing?";

    return parseResponse(assistantMessage);
  } catch (error) {
    console.error('Chat service error:', error);

    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        return {
          message: "⚠️ OpenAI API key not configured on the server.",
        };
      }
      return {
        message: `Error: ${error.message}`,
      };
    }

    return {
      message: "Sorry, something went wrong. Please try again.",
    };
  }
};

// Generate greeting message
export const getGreetingMessage = (): string => {
  const greetings = [
    "Hi! I'm Shirin's assistant! Ask me about his projects or work. 😊",
    "Hey there! Want to know about Shirin's automation work? Just ask!",
    "Hello! I can tell you all about Shirin's projects. What interests you?",
  ];

  return greetings[Math.floor(Math.random() * greetings.length)];
};
