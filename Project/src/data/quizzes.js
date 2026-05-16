export const quizzes = [
  {
    id: 1,
    courseId: 1,
    title: "React Fundamentals Quiz",
    questions: [
      {
        id: 1,
        question: "What is the virtual DOM in React?",
        options: [
          "A direct copy of the browser DOM",
          "A lightweight JavaScript representation of the real DOM",
          "A CSS framework for React",
          "A database for storing component data"
        ],
        correct: 1,
        explanation: "The virtual DOM is a lightweight JavaScript object that is a copy of the real DOM. React uses it to determine what changes need to be made to the actual DOM, making updates more efficient."
      },
      {
        id: 2,
        question: "Which hook is used to manage state in functional components?",
        options: ["useEffect", "useContext", "useState", "useReducer"],
        correct: 2,
        explanation: "useState is the primary hook for managing local state in functional components. It returns a state variable and a function to update it."
      },
      {
        id: 3,
        question: "What is JSX?",
        options: [
          "A new programming language",
          "A syntax extension that allows HTML-like code in JavaScript",
          "A CSS preprocessor",
          "A testing framework"
        ],
        correct: 1,
        explanation: "JSX is a syntax extension for JavaScript that allows you to write HTML-like code within your JavaScript files."
      },
      {
        id: 4,
        question: "How do props flow in React?",
        options: [
          "Child to parent only",
          "Both directions freely",
          "Parent to child only (unidirectional)",
          "Through a central store only"
        ],
        correct: 2,
        explanation: "Props in React flow uni-directionally from parent to child components. This makes the data flow predictable and easier to debug."
      },
      {
        id: 5,
        question: "What does useEffect do?",
        options: [
          "Creates new components",
          "Handles side effects in functional components",
          "Manages routing",
          "Optimizes rendering performance"
        ],
        correct: 1,
        explanation: "useEffect handles side effects like API calls, subscriptions, timers, and DOM manipulation in functional components."
      }
    ]
  },
  {
    id: 2,
    courseId: 2,
    title: "Python Data Science Quiz",
    questions: [
      {
        id: 1,
        question: "What is a NumPy array?",
        options: [
          "A Python list with extra methods",
          "A homogeneous multi-dimensional array for numerical computing",
          "A database table",
          "A visualization tool"
        ],
        correct: 1,
        explanation: "NumPy arrays are homogeneous multi-dimensional arrays that provide efficient numerical computing capabilities."
      },
      {
        id: 2,
        question: "What is a Pandas DataFrame?",
        options: [
          "A single column of data",
          "A 2D labeled data structure with potentially heterogeneous columns",
          "A NumPy array alias",
          "A plotting function"
        ],
        correct: 1,
        explanation: "A DataFrame is a two-dimensional, size-mutable, labeled data structure with columns of potentially different types."
      },
      {
        id: 3,
        question: "Which library is NOT commonly used for data visualization in Python?",
        options: ["Matplotlib", "Seaborn", "React", "Plotly"],
        correct: 2,
        explanation: "React is a JavaScript library for building user interfaces, not a Python data visualization library."
      },
      {
        id: 4,
        question: "What does pandas.groupby() do?",
        options: [
          "Sorts the DataFrame",
          "Splits data into groups based on criteria for aggregation",
          "Merges two DataFrames",
          "Creates a pivot table"
        ],
        correct: 1,
        explanation: "groupby() splits the data into groups based on specified criteria, allowing you to apply aggregate functions to each group."
      }
    ]
  },
  {
    id: 3,
    courseId: 3,
    title: "UI/UX Design Quiz",
    questions: [
      {
        id: 1,
        question: "What are the five stages of Design Thinking?",
        options: [
          "Plan, Design, Build, Test, Deploy",
          "Empathize, Define, Ideate, Prototype, Test",
          "Research, Sketch, Code, Review, Ship",
          "Discover, Design, Develop, Deliver, Debrief"
        ],
        correct: 1,
        explanation: "The five stages of Design Thinking are Empathize, Define, Ideate, Prototype, and Test."
      },
      {
        id: 2,
        question: "What is a wireframe?",
        options: [
          "A final polished design",
          "A low-fidelity representation focusing on layout and functionality",
          "A piece of hardware",
          "A JavaScript framework"
        ],
        correct: 1,
        explanation: "A wireframe is a low-fidelity visual representation of a design that focuses on layout, structure, and functionality."
      },
      {
        id: 3,
        question: "Which color scheme uses colors opposite on the color wheel?",
        options: ["Analogous", "Complementary", "Triadic", "Monochromatic"],
        correct: 1,
        explanation: "Complementary color schemes use colors that are directly opposite each other on the color wheel."
      }
    ]
  }
];
