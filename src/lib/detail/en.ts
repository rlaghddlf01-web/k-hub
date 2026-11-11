import type { DetailCopy } from '../detail-types';

// Detailed descriptions (English). Only features confirmed in the code are listed.
// Prices, fees, "No.1", "official" and "government" style claims are intentionally left out.
export const detail: DetailCopy = {
  nav: { market: 'Second-hand', tax: 'Tax refund', telecom: 'Phone & plans' },
  featuresLabel: 'Key features',
  forWhoLabel: 'Good for',

  services: {
    market: {
      eyebrow: 'Second-hand · Moving sale',
      headline: 'Pass on what you no longer need, and find what you do nearby',
      desc: 'A marketplace for foreign workers and students: second-hand deals, free giveaways and moving sales before you leave Korea. Meet people near your dormitory or campus, and use AI translation when you do not share a language.',
      features: [
        { icon: 'globe', title: 'AI translation support', text: 'Item descriptions and messages are translated into your own language, so you can follow a deal even when you speak different languages.' },
        { icon: 'gift', title: 'Free giveaways & moving sales', text: 'Share things you no longer use, or clear out appliances and furniture in one go with the moving-sale section before you go home.' },
        { icon: 'map', title: 'Direct deals near you', text: 'Set your location and radius on a map to find nearby items, then schedule a meeting place and time.' },
        { icon: 'shield', title: 'ID check & scam alerts', text: 'ID card photo recognition and SMS verification help confirm sign-ups, and suspicious wording such as prepayment or pushing you to another messenger triggers a warning.' },
        { icon: 'users', title: 'Neighbourhood news & life tips', text: 'Read the neighbourhood board and the living & tax blog for life in Korea, and install it on your home screen to use it like an app.' },
      ],
      forWho: ['Workers living near dormitories or industrial parks', 'People packing up before leaving Korea', 'New arrivals who need appliances or furniture', 'Students'],
    },
    tax: {
      eyebrow: 'Tax refund',
      headline: 'Understand your tax refund step by step, in your own language',
      desc: 'Find out whether you can get back the income tax you paid while working in Korea, and apply, with guidance in your language. From estimating the amount to entering documents, e-signing and following progress, it is one connected flow, and the filing itself is handled through a partner tax accountant.',
      features: [
        { icon: 'calc', title: 'Estimate your refund', text: 'Enter your work period, salary and visa type to calculate a possible refund in advance.' },
        { icon: 'camera', title: 'Fill in from an ID card photo', text: 'Take a photo of your alien registration card and AI reads the details to save typing. You can correct anything it misreads.' },
        { icon: 'file', title: 'E-sign on screen', text: 'Sign the authorization and the contract with your finger on screen, so there is no paperwork to prepare.' },
        { icon: 'bell', title: 'Progress updates by text', text: 'When the status changes you get a text in your language, and you can continue the conversation on Telegram, WhatsApp, Facebook or KakaoTalk.' },
        { icon: 'support', title: 'Support manager & guides', text: 'Ask the AI support manager when you get stuck, and an administrator can reply in person when needed. There is also an FAQ and a guide to the youth income tax reduction.' },
      ],
      forWho: ['Foreign workers who paid income tax in Korea', 'Anyone who wants to check eligibility first', 'People who find Korean tax terms hard to follow'],
    },
    telecom: {
      eyebrow: 'Phone & plans',
      headline: 'Explore phones, plans and internet in your own language, all in one place',
      desc: 'Browse smartphones, plans and internet/IPTV products in your language and leave a sign-up request. After you submit, a staff member contacts you to verify your identity and help with activation.',
      features: [
        { icon: 'globe', title: 'Available in 17 languages', text: 'Plans, devices, events and FAQs are shown in 17 languages.' },
        { icon: 'phone', title: 'Browse plans & devices', text: 'See plan and phone product information. Prices and terms are confirmed in the final consultation.' },
        { icon: 'file', title: 'Online sign-up request', text: 'Choose new number or number porting, carrier, and USIM or eSIM, then submit. The form does not ask for your alien registration number.' },
        { icon: 'sim', title: 'eSIM guide', text: 'Learn in advance what an eSIM is and how to use it on the guide page.' },
        { icon: 'chat', title: 'AI support manager', text: 'Ask about plans and phones in your language. Its answers are limited to the catalogue and it is set not to invent prices or screening results.' },
      ],
      forWho: ['People getting their first number in Korea', 'Anyone confused by plan options', 'Studio-flat residents who need internet or IPTV'],
    },
  },

  intentTitle: 'Which service fits you?',
  intentSub: 'Tap the sentence closest to what you need right now.',
  intents: [
    { text: 'I want to sell or find used appliances and furniture', service: 'market' },
    { text: 'I want to clear out my things before leaving Korea', service: 'market' },
    { text: 'I want to know if I can get my Korean tax back', service: 'tax' },
    { text: 'I want to look at phones and plans in my language', service: 'telecom' },
    { text: 'I need internet or IPTV for my room', service: 'telecom' },
  ],

  howTitle: 'How it works',
  steps: [
    { title: 'Choose your language', text: 'Pick one of 17 languages. The address changes to something like /vi, and the same language is passed on to the service. Languages a service does not support go to English.' },
    { title: 'Pick a service', text: 'Tap second-hand, tax refund or phone & plans to open that service’s website.' },
    { title: 'Continue on the service', text: 'There is no sign-up or login on the hub. Registration and applications happen on each service.' },
  ],

  faqTitle: 'Frequently asked questions',
  faq: [
    { q: 'Do I need to sign up on the hub?', a: 'No. The hub only introduces the services and links to them, so there is no sign-up or login. You register and apply on each service.' },
    { q: 'Are the three services linked to one account?', a: 'The hub does not take logins right now, and accounts and applications are managed separately by each service.' },
    { q: 'Which languages are supported?', a: 'The hub supports 17 languages. Each service supports its own list; for example Korea Tax Refund Service supports 15 (no Japanese or Russian). Unsupported languages go to English.' },
    { q: 'How much does it cost?', a: 'Using the hub is free. For the cost and terms of each service, please check the information on that service.' },
    { q: 'Is the support manager a person?', a: 'On Korea Tax Refund Service and K-Telecom the support manager answers with AI first. On Korea Tax Refund Service an administrator can also reply in person when needed.' },
    { q: 'What does the hub record?', a: 'For visit statistics only, it records an anonymous visitor ID and how you arrived (such as an ad tag). It does not collect your name or contact details.' },
  ],

  disclaimer: 'Service content, prices and supported languages may change depending on each service. Please check the final terms on each service.',
};
