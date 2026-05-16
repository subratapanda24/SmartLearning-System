export const courses = [
  {
    id: 1,
    title: "Introduction to React",
    description: "Master modern React with hooks, context, and best practices for building dynamic web applications.",
    category: "Web Development",
    instructor: "Dr. Sarah Chen",
    instructorId: 1,
    rating: 4.8,
    students: 2340,
    duration: "12 hours",
    level: "Beginner",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop",
    color: "#333333",
    progress: 65,
    lessons: [
      {
        id: 1,
        title: "What is React?",
        duration: "15 min",
        type: "video",
        completed: true,
        content: "React is a JavaScript library for building user interfaces. It was developed by Facebook and is now maintained by Meta and a community of developers. React allows you to create reusable UI components and efficiently update the DOM using a virtual DOM approach. Key concepts include JSX, components, props, and state management.",
        videoUrl: null,
        aiContext: "This lesson covers React fundamentals including JSX, virtual DOM, component architecture, and declarative UI paradigm."
      },
      {
        id: 2,
        title: "Components & Props",
        duration: "22 min",
        type: "video",
        completed: true,
        content: "Components are the building blocks of React applications. They accept inputs called props and return React elements describing what should appear on screen. Components can be functional or class-based, though modern React favors functional components with hooks. Props flow downward from parent to child components, making data flow predictable.",
        videoUrl: null,
        aiContext: "This lesson covers React components (functional vs class), props system, prop drilling, children prop, and component composition patterns."
      },
      {
        id: 3,
        title: "State & Hooks",
        duration: "30 min",
        type: "video",
        completed: false,
        content: "State is a way to store and manage data that changes over time within a component. React Hooks like useState and useEffect allow functional components to use state and lifecycle features. useState returns a state variable and setter function, while useEffect handles side effects like API calls, subscriptions, and DOM manipulation.",
        videoUrl: null,
        aiContext: "This lesson covers useState, useEffect, useContext, useReducer, custom hooks, and state management patterns in React."
      },
      {
        id: 4,
        title: "Event Handling",
        duration: "18 min",
        type: "video",
        completed: false,
        content: "React handles events using camelCase naming convention and passes functions as event handlers rather than strings. Synthetic events wrap native browser events to provide consistent behavior across browsers. Common events include onClick, onChange, onSubmit, and onKeyDown.",
        videoUrl: null,
        aiContext: "This lesson covers synthetic events, event handlers, event propagation, preventing defaults, and form handling in React."
      },
      {
        id: 5,
        title: "React Quiz",
        duration: "10 min",
        type: "quiz",
        completed: false,
        content: null,
        quizId: 1
      }
    ],
    resources: [
      { id: 1, title: "React Official Documentation", type: "pdf", size: "2.4 MB" },
      { id: 2, title: "Component Cheat Sheet", type: "pdf", size: "850 KB" },
      { id: 3, title: "Hooks Reference Guide", type: "pdf", size: "1.1 MB" }
    ]
  },
  {
    id: 2,
    title: "Python for Data Science",
    description: "Learn Python programming with focus on data analysis, visualization, and machine learning fundamentals.",
    category: "Data Science",
    instructor: "Prof. Marcus Johnson",
    instructorId: 2,
    rating: 4.9,
    students: 3120,
    duration: "18 hours",
    level: "Intermediate",
    thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=250&fit=crop",
    color: "#444444",
    progress: 30,
    lessons: [
      {
        id: 1,
        title: "Python Basics Review",
        duration: "20 min",
        type: "video",
        completed: true,
        content: "Python is a versatile programming language known for its simple syntax and readability. In data science, Python serves as the foundation for libraries like NumPy, Pandas, and Scikit-learn. Key concepts include variables, data types, control flow, functions, and list comprehensions.",
        videoUrl: null,
        aiContext: "This lesson reviews Python fundamentals: variables, data types, loops, functions, and list comprehensions for data science applications."
      },
      {
        id: 2,
        title: "NumPy & Arrays",
        duration: "25 min",
        type: "video",
        completed: false,
        content: "NumPy is the fundamental package for numerical computing in Python. It provides support for large, multi-dimensional arrays and matrices, along with mathematical functions to operate on these arrays efficiently. Broadcasting, vectorization, and array slicing are core concepts.",
        videoUrl: null,
        aiContext: "This lesson covers NumPy arrays, broadcasting, vectorized operations, array slicing, reshaping, and mathematical functions."
      },
      {
        id: 3,
        title: "Pandas DataFrames",
        duration: "35 min",
        type: "video",
        completed: false,
        content: "Pandas provides high-performance data structures for data manipulation and analysis. The DataFrame is a two-dimensional labeled data structure with columns of potentially different types. Key operations include filtering, grouping, merging, and pivot tables.",
        videoUrl: null,
        aiContext: "This lesson covers Pandas DataFrames, Series, indexing, filtering, groupby, merge, pivot tables, and data cleaning techniques."
      },
      {
        id: 4,
        title: "Data Visualization",
        duration: "28 min",
        type: "video",
        completed: false,
        content: "Data visualization is crucial for understanding patterns and communicating insights. Matplotlib and Seaborn are popular Python libraries for creating static visualizations, while Plotly enables interactive charts. Choose the right chart type for your data and audience.",
        videoUrl: null,
        aiContext: "This lesson covers Matplotlib, Seaborn, Plotly, chart types (bar, line, scatter, heatmap), and visualization best practices."
      },
      {
        id: 5,
        title: "Python Data Science Quiz",
        duration: "10 min",
        type: "quiz",
        completed: false,
        quizId: 2
      }
    ],
    resources: [
      { id: 4, title: "NumPy Quick Reference", type: "pdf", size: "1.8 MB" },
      { id: 5, title: "Pandas Cookbook", type: "pdf", size: "3.2 MB" }
    ]
  },
  {
    id: 3,
    title: "UI/UX Design Fundamentals",
    description: "Master the principles of user interface and experience design with practical design thinking methodologies.",
    category: "Design",
    instructor: "Emily Rodriguez",
    instructorId: 3,
    rating: 4.7,
    students: 1890,
    duration: "10 hours",
    level: "Beginner",
    thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop",
    color: "#555555",
    progress: 0,
    lessons: [
      {
        id: 1,
        title: "Design Thinking Overview",
        duration: "18 min",
        type: "video",
        completed: false,
        content: "Design thinking is a human-centered approach to innovation. The five stages include: Empathize (understand users), Define (frame the problem), Ideate (brainstorm solutions), Prototype (create models), and Test (validate with users). This iterative process helps create products that truly solve user problems.",
        videoUrl: null,
        aiContext: "This lesson covers design thinking methodology: empathize, define, ideate, prototype, and test phases with practical examples."
      },
      {
        id: 2,
        title: "Color Theory & Typography",
        duration: "24 min",
        type: "video",
        completed: false,
        content: "Color theory in UI design involves understanding color wheels, complementary colors, and how colors evoke emotions. Typography encompasses font selection, hierarchy, readability, and pairing. Together, these elements create visual harmony and guide user attention through the interface.",
        videoUrl: null,
        aiContext: "This lesson covers color psychology, color schemes, typography hierarchy, font pairing, readability, and accessibility considerations."
      },
      {
        id: 3,
        title: "Wireframing & Prototyping",
        duration: "30 min",
        type: "video",
        completed: false,
        content: "Wireframes are low-fidelity representations of a design that focus on layout and functionality. Prototypes add interactivity and visual detail. Tools like Figma, Sketch, and Adobe XD enable rapid creation and testing of designs before development begins.",
        videoUrl: null,
        aiContext: "This lesson covers wireframing techniques, prototyping tools (Figma, Sketch), low-fi vs high-fi prototypes, and user testing methods."
      },
      {
        id: 4,
        title: "Design Quiz",
        duration: "10 min",
        type: "quiz",
        completed: false,
        quizId: 3
      }
    ],
    resources: [
      { id: 6, title: "Design Principles Handbook", type: "pdf", size: "4.1 MB" },
      { id: 7, title: "Color Palette Templates", type: "zip", size: "12 MB" }
    ]
  },
  {
    id: 4,
    title: "Machine Learning Basics",
    description: "Understand core ML algorithms, model evaluation, and build your first predictive models from scratch.",
    category: "Data Science",
    instructor: "Prof. Marcus Johnson",
    instructorId: 2,
    rating: 4.6,
    students: 1560,
    duration: "20 hours",
    level: "Advanced",
    thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop",
    color: "#3a3a3a",
    progress: 10,
    lessons: [
      {
        id: 1,
        title: "What is Machine Learning?",
        duration: "20 min",
        type: "video",
        completed: true,
        content: "Machine Learning is a subset of AI that enables systems to learn from data without being explicitly programmed. The three main types are supervised learning (labeled data), unsupervised learning (unlabeled data), and reinforcement learning (reward-based). Applications span healthcare, finance, NLP, and computer vision.",
        videoUrl: null,
        aiContext: "This lesson introduces ML paradigms: supervised, unsupervised, reinforcement learning, with use cases in various industries."
      },
      {
        id: 2,
        title: "Linear Regression",
        duration: "30 min",
        type: "video",
        completed: false,
        content: "Linear regression models the relationship between dependent and independent variables by fitting a linear equation. Key concepts include cost functions, gradient descent optimization, feature scaling, and model evaluation using R-squared and RMSE metrics.",
        videoUrl: null,
        aiContext: "This lesson covers linear regression, cost functions, gradient descent, feature scaling, R², RMSE, and overfitting prevention."
      },
      {
        id: 3,
        title: "Classification Algorithms",
        duration: "35 min",
        type: "video",
        completed: false,
        content: "Classification predicts categorical outcomes. Popular algorithms include logistic regression, decision trees, random forests, and SVMs. Evaluation metrics include accuracy, precision, recall, F1-score, and ROC-AUC curves.",
        videoUrl: null,
        aiContext: "This lesson covers logistic regression, decision trees, random forests, SVM, and classification evaluation metrics."
      }
    ],
    resources: [
      { id: 8, title: "ML Algorithms Cheat Sheet", type: "pdf", size: "1.5 MB" }
    ]
  },
  {
    id: 5,
    title: "JavaScript Advanced Concepts",
    description: "Deep dive into closures, prototypes, async patterns, and modern JavaScript features for expert developers.",
    category: "Web Development",
    instructor: "Dr. Sarah Chen",
    instructorId: 1,
    rating: 4.5,
    students: 1780,
    duration: "15 hours",
    level: "Advanced",
    thumbnail: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=250&fit=crop",
    color: "#4a4a4a",
    progress: 45,
    lessons: [
      {
        id: 1,
        title: "Closures & Scope",
        duration: "22 min",
        type: "video",
        completed: true,
        content: "A closure is a function that retains access to its lexical scope even when executed outside that scope. JavaScript has function scope, block scope (let/const), and global scope. Understanding the scope chain is essential for debugging and writing clean code.",
        videoUrl: null,
        aiContext: "This lesson covers closures, lexical scope, scope chain, IIFE patterns, and practical closure applications in JavaScript."
      },
      {
        id: 2,
        title: "Promises & Async/Await",
        duration: "28 min",
        type: "video",
        completed: true,
        content: "Promises represent the eventual completion of an asynchronous operation. Async/await provides syntactic sugar for working with promises. Error handling uses try/catch blocks. Promise.all, Promise.race, and Promise.allSettled handle multiple concurrent operations.",
        videoUrl: null,
        aiContext: "This lesson covers Promises, async/await, error handling, Promise.all/race/allSettled, and async patterns."
      },
      {
        id: 3,
        title: "Prototypal Inheritance",
        duration: "25 min",
        type: "video",
        completed: false,
        content: "JavaScript uses prototypal inheritance rather than classical inheritance. Every object has a prototype chain. The class syntax provides sugar over prototypes. Understanding __proto__, Object.create(), and the prototype chain is key to mastering JavaScript OOP.",
        videoUrl: null,
        aiContext: "This lesson covers prototypes, prototype chain, Object.create, ES6 classes, and inheritance patterns in JavaScript."
      }
    ],
    resources: [
      { id: 9, title: "JS Advanced Patterns", type: "pdf", size: "2.0 MB" }
    ]
  },
  {
    id: 6,
    title: "Cloud Computing with AWS",
    description: "Learn cloud architecture, core AWS services, and deploy scalable applications on Amazon Web Services.",
    category: "Cloud & DevOps",
    instructor: "Alex Kim",
    instructorId: 4,
    rating: 4.4,
    students: 980,
    duration: "16 hours",
    level: "Intermediate",
    thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=250&fit=crop",
    color: "#2a2a2a",
    progress: 0,
    lessons: [
      {
        id: 1,
        title: "Cloud Computing Fundamentals",
        duration: "18 min",
        type: "video",
        completed: false,
        content: "Cloud computing delivers computing resources over the internet on a pay-as-you-go basis. Three service models exist: IaaS (infrastructure), PaaS (platform), and SaaS (software). AWS, Azure, and GCP are the major providers. Benefits include scalability, cost efficiency, and global reach.",
        videoUrl: null,
        aiContext: "This lesson covers cloud fundamentals: IaaS, PaaS, SaaS, deployment models, and AWS global infrastructure."
      },
      {
        id: 2,
        title: "EC2 & S3 Basics",
        duration: "30 min",
        type: "video",
        completed: false,
        content: "EC2 (Elastic Compute Cloud) provides virtual servers in the cloud with various instance types for different workloads. S3 (Simple Storage Service) offers object storage with high durability and availability. Both are foundational AWS services used in nearly every cloud architecture.",
        videoUrl: null,
        aiContext: "This lesson covers EC2 instances, AMIs, security groups, S3 buckets, storage classes, and basic architectures."
      }
    ],
    resources: [
      { id: 10, title: "AWS Services Overview", type: "pdf", size: "5.2 MB" }
    ]
  }
];

export const categories = ["All", "Web Development", "Data Science", "Design", "Cloud & DevOps"];
