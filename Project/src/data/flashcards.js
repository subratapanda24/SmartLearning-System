export const flashcardsData = [
  {
    id: 1,
    courseId: 1,
    cards: [
      { id: 1, front: "What is the Virtual DOM?", back: "A lightweight JavaScript representation of the real DOM that React uses to efficiently determine and batch UI updates.", difficulty: null, nextReview: null, interval: 1 },
      { id: 2, front: "What is JSX?", back: "A syntax extension for JavaScript that allows writing HTML-like markup inside JavaScript files. It gets compiled to React.createElement() calls.", difficulty: null, nextReview: null, interval: 1 },
      { id: 3, front: "What is the difference between props and state?", back: "Props are read-only inputs passed from parent to child. State is mutable data managed within a component using useState or useReducer.", difficulty: null, nextReview: null, interval: 1 },
      { id: 4, front: "What does useEffect do?", back: "useEffect handles side effects in functional components — API calls, subscriptions, timers, and DOM manipulation. It runs after render.", difficulty: null, nextReview: null, interval: 1 },
      { id: 5, front: "What is component composition?", back: "Building complex UIs by combining smaller, reusable components. Uses children prop and render props patterns for flexible composition.", difficulty: null, nextReview: null, interval: 1 },
      { id: 6, front: "What is the key prop used for in lists?", back: "The key prop helps React identify which items have changed, been added, or removed. It should be a stable, unique identifier.", difficulty: null, nextReview: null, interval: 1 },
      { id: 7, front: "What are controlled components?", back: "Form elements whose value is controlled by React state, using value and onChange props. React is the single source of truth.", difficulty: null, nextReview: null, interval: 1 },
      { id: 8, front: "What is the Context API?", back: "A React feature for sharing data across the component tree without prop drilling. Created with createContext and consumed with useContext.", difficulty: null, nextReview: null, interval: 1 }
    ]
  },
  {
    id: 2,
    courseId: 2,
    cards: [
      { id: 1, front: "What is NumPy broadcasting?", back: "A mechanism that allows NumPy to perform operations on arrays of different shapes by virtually expanding the smaller array.", difficulty: null, nextReview: null, interval: 1 },
      { id: 2, front: "What is a Pandas Series?", back: "A one-dimensional labeled array capable of holding any data type. It's like a column in a spreadsheet or a dictionary.", difficulty: null, nextReview: null, interval: 1 },
      { id: 3, front: "What does .groupby() do in Pandas?", back: "Splits data into groups based on criteria, applies a function (aggregate, transform, filter), and combines the results.", difficulty: null, nextReview: null, interval: 1 },
      { id: 4, front: "What is vectorization in NumPy?", back: "Performing operations on entire arrays at once instead of element-by-element loops. It's much faster due to C-level optimizations.", difficulty: null, nextReview: null, interval: 1 },
      { id: 5, front: "What is a DataFrame merge?", back: "Combining two DataFrames based on common columns or indices, similar to SQL JOINs. Supports inner, outer, left, and right joins.", difficulty: null, nextReview: null, interval: 1 }
    ]
  },
  {
    id: 3,
    courseId: 3,
    cards: [
      { id: 1, front: "What are the 5 stages of Design Thinking?", back: "Empathize → Define → Ideate → Prototype → Test. It's an iterative, human-centered approach to design.", difficulty: null, nextReview: null, interval: 1 },
      { id: 2, front: "What is a complementary color scheme?", back: "A scheme using colors directly opposite each other on the color wheel (e.g., blue & orange). Creates high contrast and visual energy.", difficulty: null, nextReview: null, interval: 1 },
      { id: 3, front: "What is the F-pattern in web design?", back: "Users scan web pages in an F-shape: horizontally across the top, then down the left side, with shorter horizontal movements.", difficulty: null, nextReview: null, interval: 1 },
      { id: 4, front: "What is a wireframe?", back: "A low-fidelity visual representation of a design focusing on layout, content hierarchy, and functionality — without colors or detailed styling.", difficulty: null, nextReview: null, interval: 1 }
    ]
  }
];
