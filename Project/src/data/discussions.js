export const discussions = [
  {
    id: 1,
    courseId: 1,
    title: "Best practices for managing complex state?",
    author: "Jamie L.",
    avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Jamie&backgroundColor=c0aede",
    timestamp: "2 hours ago",
    content: "I've been working on a larger React project and I'm struggling with state management. When should I use useReducer vs Context API vs an external library like Redux? My app has about 15 components and some deeply nested ones need access to shared state.",
    upvotes: 24,
    replies: [
      {
        id: 1,
        author: "Dr. Sarah Chen",
        avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Sarah&backgroundColor=c0aede",
        isInstructor: true,
        timestamp: "1 hour ago",
        content: "Great question, Jamie! Here's my rule of thumb: useState for simple local state, useReducer for complex local state, Context for theme/auth that rarely changes, and Redux/Zustand only for truly global state that changes frequently. With 15 components, I'd start with Context + useReducer.",
        upvotes: 18
      },
      {
        id: 2,
        author: "Alex M.",
        avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=AlexM&backgroundColor=b6e3f4",
        isInstructor: false,
        timestamp: "45 min ago",
        content: "I had a similar issue. I ended up using Zustand — it's like Redux but with way less boilerplate. Highly recommend checking it out!",
        upvotes: 7
      }
    ]
  },
  {
    id: 2,
    courseId: 1,
    title: "How to handle API errors gracefully in React?",
    author: "Priya S.",
    avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Priya&backgroundColor=ffd5dc",
    timestamp: "5 hours ago",
    content: "I'm building a dashboard that makes multiple API calls. What's the best pattern for handling errors — should I use error boundaries, try/catch in useEffect, or something else? I want to show meaningful error messages to users without crashing the whole app.",
    upvotes: 15,
    replies: [
      {
        id: 1,
        author: "Dr. Sarah Chen",
        avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Sarah&backgroundColor=c0aede",
        isInstructor: true,
        timestamp: "3 hours ago",
        content: "Use a combination! Error boundaries catch rendering errors, try/catch in useEffect handles async errors, and a custom useApi hook can centralize error handling logic. I'll cover this in detail in the upcoming advanced patterns lesson.",
        upvotes: 12
      }
    ]
  },
  {
    id: 3,
    courseId: 2,
    title: "Best way to handle missing data in Pandas?",
    author: "Chris W.",
    avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Chris&backgroundColor=d1d4f9",
    timestamp: "1 day ago",
    content: "My dataset has about 15% missing values. Should I drop rows, fill with mean/median, or use more sophisticated imputation? The missing data seems to be in random columns and doesn't follow an obvious pattern.",
    upvotes: 31,
    replies: [
      {
        id: 1,
        author: "Prof. Marcus Johnson",
        avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Marcus&backgroundColor=b6e3f4",
        isInstructor: true,
        timestamp: "22 hours ago",
        content: "It depends on the pattern of missingness. If it's MCAR (Missing Completely at Random), mean/median imputation works fine. For MAR data, you might want to use KNN imputation or iterative imputation from sklearn. Never just drop data without analyzing the pattern first!",
        upvotes: 22
      }
    ]
  },
  {
    id: 4,
    courseId: 3,
    title: "How to build an effective design portfolio?",
    author: "Taylor R.",
    avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Taylor&backgroundColor=c0e3c0",
    timestamp: "3 days ago",
    content: "I'm finishing up the course and want to start applying for junior UX positions. How many case studies should I include in my portfolio? Should I focus on quantity or depth?",
    upvotes: 19,
    replies: [
      {
        id: 1,
        author: "Emily Rodriguez",
        avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Emily&backgroundColor=ffd5dc",
        isInstructor: true,
        timestamp: "2 days ago",
        content: "Quality over quantity, always! 3-4 strong case studies that show your process from research to final design are far more impactful than 10 superficial ones. Make sure at least one project shows how you handled constraints and user feedback.",
        upvotes: 14
      },
      {
        id: 2,
        author: "Morgan K.",
        avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Morgan&backgroundColor=ffe0b2",
        isInstructor: false,
        timestamp: "2 days ago",
        content: "I just got hired after following Emily's advice — 3 detailed case studies with clear problem statements and results. Recruiters told me they appreciated the depth!",
        upvotes: 9
      }
    ]
  }
];
