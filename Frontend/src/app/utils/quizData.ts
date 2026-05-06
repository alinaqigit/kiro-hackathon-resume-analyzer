export type ExpertiseLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';
export type JobDomain = 'frontend' | 'backend' | 'fullstack' | 'datascience' | 'devops' | 'mobile' | 'general';

export interface Question {
  id: string;
  domain: JobDomain | 'general';
  difficulty: ExpertiseLevel;
  topic: string;
  text: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const questionBank: Question[] = [
  // ======== FRONTEND ========
  {
    id: 'fe-b-01', domain: 'frontend', difficulty: 'beginner', topic: 'JavaScript',
    text: 'Which of the following correctly declares a variable in modern JavaScript (ES6+)?',
    options: ['var x = 10', 'const x = 10', 'let x = 10', 'Both B and C'],
    correctIndex: 3,
    explanation: 'Both `const` (for constants) and `let` (for mutable variables) are ES6+ ways to declare variables. `var` is the old way with function-scope hoisting.'
  },
  {
    id: 'fe-b-02', domain: 'frontend', difficulty: 'beginner', topic: 'React',
    text: 'What is the purpose of the useState hook in React?',
    options: ['To fetch data from an API', 'To manage local component state', 'To create refs to DOM elements', 'To memoize expensive computations'],
    correctIndex: 1,
    explanation: 'useState is a React hook that allows functional components to have local state. It returns a state value and a setter function.'
  },
  {
    id: 'fe-b-03', domain: 'frontend', difficulty: 'beginner', topic: 'CSS',
    text: 'What CSS property controls the space between an element\'s content and its border?',
    options: ['margin', 'spacing', 'padding', 'border-spacing'],
    correctIndex: 2,
    explanation: 'padding controls the space inside an element between its content and border. margin controls space outside the border.'
  },
  {
    id: 'fe-b-04', domain: 'frontend', difficulty: 'beginner', topic: 'HTML',
    text: 'Which HTML5 element is semantically correct for the main navigation links of a website?',
    options: ['<div id="nav">', '<header>', '<nav>', '<menu>'],
    correctIndex: 2,
    explanation: 'The <nav> element represents a section of a page whose purpose is to provide navigation links.'
  },
  {
    id: 'fe-b-05', domain: 'frontend', difficulty: 'beginner', topic: 'JavaScript',
    text: 'What does the === operator check in JavaScript?',
    options: ['Value only', 'Type only', 'Value AND type (strict equality)', 'Reference equality'],
    correctIndex: 2,
    explanation: '=== checks both value and type without coercion. == only checks value after type coercion.'
  },
  {
    id: 'fe-i-01', domain: 'frontend', difficulty: 'intermediate', topic: 'React Hooks',
    text: 'What is the main difference between useEffect and useLayoutEffect?',
    options: [
      'useLayoutEffect runs before the browser paints, useEffect runs after',
      'useEffect runs before the browser paints, useLayoutEffect runs after',
      'They are identical in behavior',
      'useLayoutEffect cannot access DOM elements'
    ],
    correctIndex: 0,
    explanation: 'useLayoutEffect fires synchronously after all DOM mutations but before the browser paints. useEffect fires asynchronously after paint, which avoids blocking visual updates.'
  },
  {
    id: 'fe-i-02', domain: 'frontend', difficulty: 'intermediate', topic: 'Performance',
    text: 'What does React.memo() do?',
    options: [
      'Memoizes async function results',
      'Prevents a component from re-rendering if its props haven\'t changed',
      'Caches API responses',
      'Creates a memoized selector for Redux'
    ],
    correctIndex: 1,
    explanation: 'React.memo is a higher-order component that wraps a component and performs a shallow comparison of props. If props haven\'t changed, the re-render is skipped.'
  },
  {
    id: 'fe-i-03', domain: 'frontend', difficulty: 'intermediate', topic: 'JavaScript',
    text: 'Which describes event bubbling in JavaScript correctly?',
    options: [
      'Events propagate from parent to child elements',
      'Events propagate from child to parent elements up the DOM tree',
      'Events only fire on the target element',
      'Events propagate to sibling elements'
    ],
    correctIndex: 1,
    explanation: 'Event bubbling means an event starts at the target element and propagates up through ancestors in the DOM. This is opposed to event capturing which goes top-down.'
  },
  {
    id: 'fe-i-04', domain: 'frontend', difficulty: 'intermediate', topic: 'CORS',
    text: 'What is the primary purpose of CORS (Cross-Origin Resource Sharing)?',
    options: [
      'To encrypt HTTP requests between origins',
      'To allow browsers to make cross-origin requests in a controlled way',
      'To cache responses from different origins',
      'To prevent CSRF attacks'
    ],
    correctIndex: 1,
    explanation: 'CORS is a browser security mechanism that allows servers to specify which origins can access their resources. Without it, browsers block cross-origin XHR/fetch requests.'
  },
  {
    id: 'fe-i-05', domain: 'frontend', difficulty: 'intermediate', topic: 'React',
    text: 'When would you use useCallback hook?',
    options: [
      'To memoize a value that\'s expensive to compute',
      'To memoize a function reference so it\'s not recreated on every render',
      'To manage asynchronous state updates',
      'To replace useState for complex state logic'
    ],
    correctIndex: 1,
    explanation: 'useCallback returns a memoized function that only changes when dependencies change. It\'s useful when passing callbacks to child components that rely on reference equality for optimization.'
  },
  {
    id: 'fe-a-01', domain: 'frontend', difficulty: 'advanced', topic: 'React Internals',
    text: 'How does React\'s reconciliation algorithm (diffing) optimize updates?',
    options: [
      'It re-renders the entire DOM tree on every state change',
      'It uses heuristics: same-type components update in place, different types are destroyed and rebuilt; keys help identify list items',
      'It uses deep equality checks on all component state',
      'It patches only the changed CSS properties'
    ],
    correctIndex: 1,
    explanation: 'React\'s reconciler uses heuristics: elements of the same type update in place, different types destroy/rebuild the subtree. Keys on lists tell React which items changed, moved, or were added/removed.'
  },
  {
    id: 'fe-a-02', domain: 'frontend', difficulty: 'advanced', topic: 'Architecture',
    text: 'What is the primary advantage of Server-Side Rendering (SSR) over Client-Side Rendering (CSR)?',
    options: [
      'SSR eliminates the need for JavaScript entirely',
      'SSR sends fully rendered HTML improving initial page load time and SEO',
      'SSR is always faster after the initial load',
      'SSR removes the need for a CDN'
    ],
    correctIndex: 1,
    explanation: 'SSR generates HTML on the server per request, delivering content-ready pages to the browser faster. This improves Time-to-First-Contentful-Paint and allows search engine crawlers to index content easily.'
  },
  {
    id: 'fe-a-03', domain: 'frontend', difficulty: 'advanced', topic: 'Performance',
    text: 'What is code splitting and why is it used in React applications?',
    options: [
      'Breaking code into separate Git repositories',
      'Dividing code into multiple files loaded on demand to reduce initial bundle size',
      'Separating CSS from JavaScript code',
      'Distributing computation across multiple CPU cores'
    ],
    correctIndex: 1,
    explanation: 'Code splitting (via React.lazy + Suspense or dynamic import()) allows bundlers to create separate chunks loaded on demand. This reduces initial bundle size, improving load time.'
  },
  {
    id: 'fe-a-04', domain: 'frontend', difficulty: 'advanced', topic: 'State Management',
    text: 'When is a state management library like Redux truly necessary in a React app?',
    options: [
      'Always, for any React application',
      'When multiple unrelated components need to share state and prop-drilling becomes unmanageable',
      'Only for apps with more than 100 components',
      'When using class components exclusively'
    ],
    correctIndex: 1,
    explanation: 'Redux is most valuable when many unrelated components need shared state, and passing props deeply (prop-drilling) becomes impractical. Context API or simpler solutions may suffice for smaller apps.'
  },
  {
    id: 'fe-e-01', domain: 'frontend', difficulty: 'expert', topic: 'React Architecture',
    text: 'What problem did the React Fiber architecture solve compared to the original stack reconciler?',
    options: [
      'Fiber added TypeScript support to React',
      'Fiber enables incremental rendering: work can be split into chunks, paused, and resumed, enabling concurrent features',
      'Fiber replaced JSX with a simpler template syntax',
      'Fiber eliminated the need for the virtual DOM'
    ],
    correctIndex: 1,
    explanation: 'The original stack reconciler was synchronous — once started it couldn\'t be interrupted. Fiber is a linked-list structure that allows React to split rendering work, pause for higher-priority updates, and resume, enabling concurrent mode features like Suspense and transitions.'
  },
  {
    id: 'fe-e-02', domain: 'frontend', difficulty: 'expert', topic: 'Browser Internals',
    text: 'What is the Critical Rendering Path and how can it be optimized?',
    options: [
      'The sequence of steps the browser takes to convert HTML, CSS, and JS into pixels; optimized by minimizing render-blocking resources and reducing DOM complexity',
      'The network path from server to browser; optimized by CDNs',
      'The JavaScript execution order; optimized by using async/await',
      'The sequence of React component lifecycle methods'
    ],
    correctIndex: 0,
    explanation: 'The CRP: parse HTML → build DOM, parse CSS → build CSSOM, combine → Render Tree, layout, paint. Optimization includes deferring non-critical JS, inlining critical CSS, using resource hints (preload/prefetch), and reducing layout thrashing.'
  },
  {
    id: 'fe-e-03', domain: 'frontend', difficulty: 'expert', topic: 'Micro-frontends',
    text: 'What is the main benefit and drawback of a micro-frontend architecture?',
    options: [
      'Benefit: teams can deploy independently; Drawback: increased bundle duplication and coordination overhead',
      'Benefit: eliminates all shared state; Drawback: requires rewriting in a single framework',
      'Benefit: faster runtime performance; Drawback: harder to test',
      'Benefit: removes the need for a backend; Drawback: requires TypeScript'
    ],
    correctIndex: 0,
    explanation: 'Micro-frontends allow teams to work and deploy independently, improving scalability. The trade-offs include potential duplication of shared dependencies, complex cross-app communication, and consistency challenges.'
  },

  // ======== BACKEND ========
  {
    id: 'be-b-01', domain: 'backend', difficulty: 'beginner', topic: 'HTTP',
    text: 'What HTTP status code indicates that a resource was not found?',
    options: ['200', '301', '404', '500'],
    correctIndex: 2,
    explanation: '404 Not Found indicates that the server cannot find the requested resource. 200 is success, 301 is a redirect, and 500 is a server error.'
  },
  {
    id: 'be-b-02', domain: 'backend', difficulty: 'beginner', topic: 'REST',
    text: 'In REST API design, which HTTP method is idempotent and used to fully update a resource?',
    options: ['POST', 'PATCH', 'PUT', 'DELETE'],
    correctIndex: 2,
    explanation: 'PUT replaces a resource entirely and is idempotent (same result if called multiple times). POST creates, PATCH partially updates, DELETE removes.'
  },
  {
    id: 'be-b-03', domain: 'backend', difficulty: 'beginner', topic: 'Databases',
    text: 'What is the purpose of a primary key in a relational database?',
    options: ['To encrypt the row data', 'To uniquely identify each row in a table', 'To sort the table rows', 'To link to another database'],
    correctIndex: 1,
    explanation: 'A primary key uniquely identifies each record in a table. It must be unique and not null, ensuring each row can be precisely referenced.'
  },
  {
    id: 'be-b-04', domain: 'backend', difficulty: 'beginner', topic: 'APIs',
    text: 'What does JSON stand for?',
    options: ['JavaScript Object Notation', 'Java Serialized Object Notation', 'JavaScript Online Network', 'JSON is not an acronym'],
    correctIndex: 0,
    explanation: 'JSON (JavaScript Object Notation) is a lightweight data-interchange format derived from JavaScript object syntax, widely used for API responses.'
  },
  {
    id: 'be-b-05', domain: 'backend', difficulty: 'beginner', topic: 'Security',
    text: 'What does SQL injection exploit?',
    options: ['Weak passwords', 'Unsanitized user input embedded directly into SQL queries', 'Slow database queries', 'Unencrypted database connections'],
    correctIndex: 1,
    explanation: 'SQL injection occurs when user input is embedded directly into SQL queries without sanitization, allowing attackers to manipulate query logic. Parameterized queries/prepared statements prevent this.'
  },
  {
    id: 'be-i-01', domain: 'backend', difficulty: 'intermediate', topic: 'Auth',
    text: 'How does JWT (JSON Web Token) authentication work?',
    options: [
      'The server stores session state and sends a session ID cookie',
      'The server signs a token containing claims; the client sends it on each request; server verifies the signature without storing state',
      'JWT encrypts the database password for transmission',
      'JWT is only used for OAuth2 flows'
    ],
    correctIndex: 1,
    explanation: 'JWT is stateless: the server signs a JSON payload with a secret/private key. The client stores the token and sends it in the Authorization header. The server verifies the signature without a session lookup, enabling horizontal scaling.'
  },
  {
    id: 'be-i-02', domain: 'backend', difficulty: 'intermediate', topic: 'Databases',
    text: 'What is the N+1 query problem?',
    options: [
      'Running a query that returns N+1 more rows than expected',
      'Loading a list of N items with one query, then making N additional queries to load related data for each item',
      'Having N+1 tables in a database join',
      'A query that runs N+1 times due to a loop bug'
    ],
    correctIndex: 1,
    explanation: 'N+1 occurs when fetching a list of N items (1 query) and then separately querying for each item\'s relations (N queries). Solved with eager loading (JOINs, include/prefetch).'
  },
  {
    id: 'be-i-03', domain: 'backend', difficulty: 'intermediate', topic: 'Scaling',
    text: 'What is the difference between horizontal and vertical scaling?',
    options: [
      'Horizontal = adding more powerful hardware; Vertical = adding more servers',
      'Horizontal = adding more servers to distribute load; Vertical = upgrading the existing server\'s hardware',
      'They are the same thing',
      'Horizontal scaling only applies to databases'
    ],
    correctIndex: 1,
    explanation: 'Vertical scaling (scale up) adds CPU/RAM to an existing machine — limited by hardware ceiling. Horizontal scaling (scale out) adds more machines — theoretically unlimited but requires load balancing and stateless architecture.'
  },
  {
    id: 'be-i-04', domain: 'backend', difficulty: 'intermediate', topic: 'Caching',
    text: 'What is the purpose of database connection pooling?',
    options: [
      'To replicate data across multiple databases',
      'To reuse existing database connections rather than creating a new one for each request, reducing overhead',
      'To cache query results in memory',
      'To load-balance between multiple databases'
    ],
    correctIndex: 1,
    explanation: 'Creating a DB connection is expensive (TCP handshake, auth). A connection pool maintains a set of open connections that are borrowed and returned by requests, dramatically reducing per-request latency.'
  },
  {
    id: 'be-i-05', domain: 'backend', difficulty: 'intermediate', topic: 'Databases',
    text: 'What does a database index do, and what is its tradeoff?',
    options: [
      'Indexes speed up reads by providing fast lookup structures; tradeoff is slower writes and additional storage',
      'Indexes encrypt data for security; tradeoff is CPU overhead',
      'Indexes compress data; tradeoff is slower reads',
      'Indexes replicate data; tradeoff is consistency'
    ],
    correctIndex: 0,
    explanation: 'An index (typically a B-tree) creates a sorted lookup structure on one or more columns, making SELECT queries faster. The tradeoff: indexes must be updated on INSERT/UPDATE/DELETE, adding write overhead and storage.'
  },
  {
    id: 'be-a-01', domain: 'backend', difficulty: 'advanced', topic: 'Distributed Systems',
    text: 'What does the CAP theorem state?',
    options: [
      'A distributed system can guarantee Consistency, Availability, and Partition Tolerance simultaneously',
      'A distributed system can only guarantee at most two of: Consistency, Availability, Partition Tolerance',
      'All distributed systems must sacrifice Availability for Consistency',
      'CAP only applies to NoSQL databases'
    ],
    correctIndex: 1,
    explanation: 'CAP theorem: in the presence of a network partition, a distributed system must choose between Consistency (all nodes see the same data) and Availability (every request gets a response). CP systems (like HBase) and AP systems (like Cassandra) make different trade-offs.'
  },
  {
    id: 'be-a-02', domain: 'backend', difficulty: 'advanced', topic: 'Microservices',
    text: 'What is the Saga pattern in microservices?',
    options: [
      'A pattern for real-time data streaming between services',
      'A way to manage distributed transactions through a sequence of local transactions with compensating transactions on failure',
      'A service discovery mechanism',
      'An API gateway pattern for authentication'
    ],
    correctIndex: 1,
    explanation: 'Sagas handle distributed transactions without 2PC. Each service executes its local transaction and publishes an event. On failure, compensating transactions roll back completed steps. Can be choreography (event-driven) or orchestration (central coordinator).'
  },
  {
    id: 'be-a-03', domain: 'backend', difficulty: 'advanced', topic: 'Databases',
    text: 'What is the difference between optimistic and pessimistic locking?',
    options: [
      'Optimistic locking acquires locks immediately; pessimistic locking checks conflicts at commit time',
      'Pessimistic locking acquires locks upfront preventing conflicts; optimistic locking assumes no conflicts and validates at commit, rolling back if data changed',
      'They are identical strategies with different names',
      'Optimistic locking is only for reads; pessimistic only for writes'
    ],
    correctIndex: 1,
    explanation: 'Pessimistic locking: lock the row immediately (SELECT FOR UPDATE). Optimistic locking: read with a version number, and at update check if version matches (no lock held). Optimistic is better for low-contention scenarios; pessimistic for high-contention.'
  },
  {
    id: 'be-e-01', domain: 'backend', difficulty: 'expert', topic: 'Database Internals',
    text: 'How does a B-tree index improve query performance at the storage level?',
    options: [
      'It stores all data in memory sorted by the index column',
      'It creates a balanced tree where leaf nodes store pointers to data pages, enabling O(log n) lookup with minimal disk I/O',
      'It hash-partitions data across disk blocks for O(1) access',
      'It pre-computes aggregates to speed up GROUP BY queries'
    ],
    correctIndex: 1,
    explanation: 'B-tree nodes contain sorted keys and child pointers. Traversing from root to leaf is O(log n) and minimizes disk I/O (each node fits in a disk page). Leaf nodes contain the actual row pointers or (in clustered indexes) data itself.'
  },
  {
    id: 'be-e-02', domain: 'backend', difficulty: 'expert', topic: 'Distributed Systems',
    text: 'How does the Raft consensus algorithm ensure leader election safety?',
    options: [
      'Raft uses a global lock shared across all nodes',
      'A candidate must receive votes from a majority quorum; its log must be at least as up-to-date as voters\' logs, preventing split-brain',
      'Raft relies on synchronized clocks across all nodes',
      'The node with the highest ID always becomes leader'
    ],
    correctIndex: 1,
    explanation: 'In Raft, a new leader must win a majority vote. Voters only vote for candidates whose log is at least as up-to-date (term + log index). This guarantees only nodes with all committed entries can become leader, ensuring no committed data is lost.'
  },
  {
    id: 'be-e-03', domain: 'backend', difficulty: 'expert', topic: 'Architecture',
    text: 'What is MVCC (Multi-Version Concurrency Control) in PostgreSQL?',
    options: [
      'A mechanism where each write creates a new version of a row; readers see consistent snapshots without blocking writers',
      'A method to replicate data across multiple versions of PostgreSQL',
      'A backup strategy that keeps multiple database versions',
      'A query planner feature for optimizing concurrent reads'
    ],
    correctIndex: 0,
    explanation: 'PostgreSQL\'s MVCC means writes create new tuple versions (old versions kept for ongoing transactions). Each transaction sees a consistent snapshot based on its start time. Readers never block writers and vice versa. VACUUM reclaims dead tuples.'
  },

  // ======== DATA SCIENCE ========
  {
    id: 'ds-b-01', domain: 'datascience', difficulty: 'beginner', topic: 'ML Fundamentals',
    text: 'What is the difference between supervised and unsupervised learning?',
    options: [
      'Supervised uses large datasets; unsupervised uses small ones',
      'Supervised learning uses labeled data to learn input-output mappings; unsupervised finds patterns in unlabeled data',
      'Supervised is for classification only; unsupervised for regression',
      'They are the same but with different data sizes'
    ],
    correctIndex: 1,
    explanation: 'Supervised learning: model learns from labeled examples (e.g., classifying spam/not-spam). Unsupervised learning: finds structure in unlabeled data (e.g., clustering customers by behavior).'
  },
  {
    id: 'ds-b-02', domain: 'datascience', difficulty: 'beginner', topic: 'Model Evaluation',
    text: 'What is overfitting in machine learning?',
    options: [
      'When a model is too simple to capture the underlying patterns',
      'When a model learns the training data too well including noise, performing poorly on new data',
      'When a model takes too long to train',
      'When there is too much training data'
    ],
    correctIndex: 1,
    explanation: 'Overfitting: the model memorizes training data (including noise), achieving high training accuracy but poor generalization to unseen data. Underfitting is the opposite — model too simple to capture patterns.'
  },
  {
    id: 'ds-b-03', domain: 'datascience', difficulty: 'beginner', topic: 'Evaluation',
    text: 'What does a confusion matrix show?',
    options: [
      'The model\'s training time vs accuracy trade-off',
      'A table showing predicted vs actual class labels to visualize TP, FP, TN, FN',
      'Feature correlations in the dataset',
      'The model\'s parameter weights'
    ],
    correctIndex: 1,
    explanation: 'A confusion matrix is an N×N table (N = classes) comparing actual vs. predicted labels. For binary classification: True Positives, False Positives, True Negatives, False Negatives — enabling calculation of precision, recall, F1, etc.'
  },
  {
    id: 'ds-b-04', domain: 'datascience', difficulty: 'beginner', topic: 'Data Preprocessing',
    text: 'Why do we normalize/standardize features before training many ML models?',
    options: [
      'To reduce the size of the dataset',
      'To bring features to comparable scales so distance-based or gradient-based algorithms work correctly',
      'To remove missing values',
      'To convert categorical data to numerical'
    ],
    correctIndex: 1,
    explanation: 'Features on different scales can dominate distance calculations (KNN, SVM) or cause poor gradient flow (neural networks). Normalization (0-1) and standardization (z-score) ensure equal contribution from all features.'
  },
  {
    id: 'ds-b-05', domain: 'datascience', difficulty: 'beginner', topic: 'Statistics',
    text: 'What is the purpose of the train/validation/test split in ML?',
    options: [
      'To train faster by using smaller datasets',
      'Train on training set, tune hyperparameters on validation set, and report unbiased final performance on test set',
      'To save storage space by using only part of the data',
      'All three splits are used for training simultaneously'
    ],
    correctIndex: 1,
    explanation: 'Train set: model learns parameters. Validation set: tune hyperparameters without contaminating test set. Test set: final unbiased evaluation. Using test set for tuning leads to data leakage and overoptimistic metrics.'
  },
  {
    id: 'ds-i-01', domain: 'datascience', difficulty: 'intermediate', topic: 'Optimization',
    text: 'In gradient descent, what role does the learning rate play?',
    options: [
      'It determines the number of training epochs',
      'It controls the step size when updating model parameters — too high causes divergence, too low causes slow convergence',
      'It sets the batch size for mini-batch training',
      'It controls model regularization strength'
    ],
    correctIndex: 1,
    explanation: 'The learning rate scales the gradient before subtracting from weights. Too large: oscillates/diverges. Too small: very slow convergence. Learning rate schedulers (warmup, cosine decay) adaptively adjust it during training.'
  },
  {
    id: 'ds-i-02', domain: 'datascience', difficulty: 'intermediate', topic: 'Regularization',
    text: 'What is the key difference between L1 and L2 regularization?',
    options: [
      'L1 is for classification; L2 is for regression',
      'L1 (Lasso) adds absolute value of weights — can zero out features (sparse); L2 (Ridge) adds squared weights — shrinks all weights toward zero',
      'L1 and L2 produce identical results',
      'L2 requires more computation than L1'
    ],
    correctIndex: 1,
    explanation: 'L1 regularization (|w|) creates sparse models by driving some weights to exactly zero — useful for feature selection. L2 (w²) distributes shrinkage across all weights. Elastic Net combines both.'
  },
  {
    id: 'ds-i-03', domain: 'datascience', difficulty: 'intermediate', topic: 'Evaluation',
    text: 'When should you prefer recall over precision as your primary metric?',
    options: [
      'When false positives are more costly than false negatives',
      'When false negatives are more costly than false positives (e.g., cancer screening)',
      'When the dataset is perfectly balanced',
      'Precision is always more important than recall'
    ],
    correctIndex: 1,
    explanation: 'Recall = TP/(TP+FN). High recall means few false negatives. In cancer screening, missing a cancer (FN) is far worse than a false alarm (FP), so recall is prioritized. Precision matters more when FPs are costly (e.g., spam filtering).'
  },
  {
    id: 'ds-i-04', domain: 'datascience', difficulty: 'intermediate', topic: 'Cross-Validation',
    text: 'What is k-fold cross-validation and why is it preferred over a single train/test split?',
    options: [
      'It trains k models simultaneously to average predictions',
      'It splits data into k folds, trains on k-1, tests on 1, rotates k times — providing lower-variance performance estimates',
      'It randomly samples k% of data for training',
      'It reduces training time by using k% of the data'
    ],
    correctIndex: 1,
    explanation: 'k-fold CV partitions data into k equal folds, uses each fold as test set once (k iterations). The average metric across folds is more reliable than a single split, especially with limited data, as it uses all data for both training and evaluation.'
  },
  {
    id: 'ds-a-01', domain: 'datascience', difficulty: 'advanced', topic: 'Deep Learning',
    text: 'What is the vanishing gradient problem in deep neural networks?',
    options: [
      'Gradients become very large, causing weight overflow',
      'Gradients shrink exponentially as they backpropagate through many layers, making early layers learn very slowly or not at all',
      'The model converges too quickly to a local optimum',
      'Memory runs out during backpropagation'
    ],
    correctIndex: 1,
    explanation: 'In deep networks, gradients are multiplied through layers during backpropagation. With activation functions like sigmoid/tanh (<1 derivatives), gradients shrink exponentially. Solutions: ReLU activations, batch normalization, residual connections (ResNets), gradient clipping.'
  },
  {
    id: 'ds-a-02', domain: 'datascience', difficulty: 'advanced', topic: 'Transformers',
    text: 'What is the key mechanism in the Transformer architecture that enables parallelization and captures long-range dependencies?',
    options: [
      'Recurrent connections with LSTM gates',
      'Self-attention: each token attends to all other tokens simultaneously, computing weighted contextual representations',
      'Convolutional filters with large receptive fields',
      'Hierarchical pooling across sequence positions'
    ],
    correctIndex: 1,
    explanation: 'Self-attention computes queries, keys, values from each position. Attention scores (QKᵀ/√d) determine how much each position attends to every other. This is O(n²) but fully parallelizable unlike RNNs, and captures arbitrarily long dependencies directly.'
  },
  {
    id: 'ds-a-03', domain: 'datascience', difficulty: 'advanced', topic: 'Transfer Learning',
    text: 'What is transfer learning and why is it powerful in deep learning?',
    options: [
      'Moving a trained model from one server to another',
      'Using representations learned by a model on a large dataset as the starting point for a new task, reducing data and compute requirements',
      'Converting models between different deep learning frameworks',
      'Training multiple models and combining their predictions'
    ],
    correctIndex: 1,
    explanation: 'Transfer learning leverages pre-trained weights (e.g., BERT, ResNet) that encode general representations. Fine-tuning on a small task-specific dataset dramatically outperforms training from scratch, especially when labeled data is limited.'
  },
  {
    id: 'ds-e-01', domain: 'datascience', difficulty: 'expert', topic: 'RLHF',
    text: 'What is RLHF (Reinforcement Learning from Human Feedback) and what problem does it solve in LLM training?',
    options: [
      'A data augmentation technique for training with limited labels',
      'A training paradigm where human preferences train a reward model, which then guides policy optimization via RL to align model outputs with human values',
      'A method to compress large language models for deployment',
      'A technique to speed up LLM inference using hardware accelerators'
    ],
    correctIndex: 1,
    explanation: 'RLHF: (1) supervised fine-tuning on demonstrations, (2) train reward model from human preference comparisons, (3) optimize the LLM policy using PPO against the reward model. Solves the alignment problem — making models helpful, harmless, and honest rather than just predicting next tokens.'
  },
  {
    id: 'ds-e-02', domain: 'datascience', difficulty: 'expert', topic: 'Generative Models',
    text: 'In a Variational Autoencoder (VAE), what is the role of the reparameterization trick?',
    options: [
      'It reduces the number of parameters in the encoder network',
      'It allows gradients to flow through the stochastic sampling step by expressing the sample as deterministic function of parameters plus separate noise variable',
      'It ensures the decoder output is normalized to [0,1]',
      'It regularizes the latent space by penalizing large activations'
    ],
    correctIndex: 1,
    explanation: 'VAE samples z ~ N(μ, σ²), but sampling is non-differentiable. The reparameterization trick: z = μ + σ·ε where ε ~ N(0,1). Now gradients can flow through μ and σ during backpropagation, enabling end-to-end training of the encoder-decoder.'
  },

  // ======== DEVOPS ========
  {
    id: 'do-b-01', domain: 'devops', difficulty: 'beginner', topic: 'Containers',
    text: 'What is the primary difference between a container and a virtual machine?',
    options: [
      'Containers are slower than VMs',
      'Containers share the host OS kernel and are lightweight; VMs include a full OS with their own kernel, using more resources',
      'VMs are only used for Linux, containers for Windows',
      'Containers cannot run multiple processes'
    ],
    correctIndex: 1,
    explanation: 'VMs virtualize hardware and include a full guest OS. Containers share the host OS kernel and isolate processes using namespaces/cgroups. Containers start in milliseconds and use less memory/storage vs. VMs which take minutes and GBs.'
  },
  {
    id: 'do-b-02', domain: 'devops', difficulty: 'beginner', topic: 'CI/CD',
    text: 'What does CI/CD stand for and what is its purpose?',
    options: [
      'Continuous Installation/Continuous Deployment — automating software packaging',
      'Continuous Integration/Continuous Delivery (or Deployment) — automating build, test, and release pipelines',
      'Cloud Infrastructure/Cloud Deployment — managing cloud resources',
      'Code Inspection/Code Distribution — auditing and sharing code'
    ],
    correctIndex: 1,
    explanation: 'CI: automatically build and test code on every commit. CD (Delivery): automatically prepare releases. CD (Deployment): automatically deploy to production. CI/CD reduces manual errors, enables frequent safe releases, and catches bugs early.'
  },
  {
    id: 'do-b-03', domain: 'devops', difficulty: 'beginner', topic: 'Docker',
    text: 'What is the purpose of a Dockerfile?',
    options: [
      'A configuration file for orchestrating multiple containers',
      'A text file with instructions to build a Docker image layer by layer',
      'A file that defines network policies between containers',
      'A monitoring configuration for Docker containers'
    ],
    correctIndex: 1,
    explanation: 'A Dockerfile contains sequential instructions (FROM, RUN, COPY, CMD, etc.) that Docker executes to build an image. Each instruction creates a cacheable layer, enabling efficient rebuilds.'
  },
  {
    id: 'do-b-04', domain: 'devops', difficulty: 'beginner', topic: 'Cloud',
    text: 'What is Infrastructure as Code (IaC)?',
    options: [
      'Writing application code that runs on cloud infrastructure',
      'Managing and provisioning infrastructure through machine-readable configuration files rather than manual processes',
      'A programming language designed for cloud applications',
      'Converting infrastructure diagrams to code documentation'
    ],
    correctIndex: 1,
    explanation: 'IaC (tools: Terraform, Pulumi, AWS CDK) lets you define infrastructure in code — enabling version control, repeatability, and automation. Changes are reviewed in PRs like application code.'
  },
  {
    id: 'do-i-01', domain: 'devops', difficulty: 'intermediate', topic: 'Kubernetes',
    text: 'What problem does Kubernetes primarily solve?',
    options: [
      'Building Docker images faster',
      'Container orchestration: automating deployment, scaling, load balancing, self-healing, and rollouts of containerized applications',
      'Providing a managed database service',
      'Encrypting container network traffic'
    ],
    correctIndex: 1,
    explanation: 'Kubernetes manages containerized workloads at scale: scheduling containers onto nodes, auto-scaling, rolling updates, service discovery, self-healing (restarting failed pods), and load balancing across a cluster.'
  },
  {
    id: 'do-i-02', domain: 'devops', difficulty: 'intermediate', topic: 'Deployment',
    text: 'What is blue-green deployment?',
    options: [
      'Deploying to blue (production) and green (staging) regions simultaneously',
      'Maintaining two identical environments; traffic switches from the old (blue) to new (green) instantly, with easy rollback by switching back',
      'Gradually rolling out a new version to increasing percentages of users',
      'A deployment strategy for microservices using color-coded service meshes'
    ],
    correctIndex: 1,
    explanation: 'Blue-green: two identical environments (blue=live, green=new). Deploy to green, run tests, then switch the load balancer to green. Rollback is instant — switch back to blue. Eliminates downtime but doubles infrastructure cost temporarily.'
  },
  {
    id: 'do-i-03', domain: 'devops', difficulty: 'intermediate', topic: 'Networking',
    text: 'What does a load balancer do in a distributed system?',
    options: [
      'Balances CPU load across application threads',
      'Distributes incoming network traffic across multiple backend servers to ensure no single server is overwhelmed',
      'Compresses network packets for faster transmission',
      'Monitors server memory usage and triggers auto-scaling'
    ],
    correctIndex: 1,
    explanation: 'Load balancers distribute traffic across server pools using algorithms (round-robin, least connections, IP hash). They improve availability (traffic shifts from failed servers) and scalability (horizontal scaling).'
  },
  {
    id: 'do-a-01', domain: 'devops', difficulty: 'advanced', topic: 'Service Mesh',
    text: 'What is a service mesh and what problems does it solve?',
    options: [
      'A mesh network topology for connecting cloud regions',
      'An infrastructure layer (sidecar proxies like Envoy) that handles service-to-service communication: retries, circuit breaking, mutual TLS, observability — without changing application code',
      'A Kubernetes plugin for managing network policies',
      'A tool for visualizing microservice dependencies'
    ],
    correctIndex: 1,
    explanation: 'A service mesh (Istio, Linkerd) deploys sidecar proxies alongside each service. They intercept all traffic to provide: mTLS between services, automatic retries, circuit breakers, traffic shaping, and distributed tracing — as infrastructure concerns separate from business logic.'
  },
  {
    id: 'do-a-02', domain: 'devops', difficulty: 'advanced', topic: 'Kubernetes',
    text: 'What is the difference between a Kubernetes Deployment and a StatefulSet?',
    options: [
      'Deployments are for production; StatefulSets are for staging',
      'Deployments manage stateless pods with interchangeable identities; StatefulSets provide stable pod identities, ordered deployment, and persistent storage for stateful apps like databases',
      'StatefulSets automatically scale based on CPU; Deployments do not',
      'They are identical but with different naming conventions'
    ],
    correctIndex: 1,
    explanation: 'Deployments: pods are interchangeable, can be created/deleted in any order, share storage. StatefulSets: each pod has a sticky identity (pod-0, pod-1), ordered startup/shutdown, individual PersistentVolumeClaims — required for databases, Kafka, etc.'
  },
  {
    id: 'do-e-01', domain: 'devops', difficulty: 'expert', topic: 'K8s Internals',
    text: 'What are the main components of the Kubernetes control plane?',
    options: [
      'kubelet, kube-proxy, and container runtime',
      'kube-apiserver (API gateway), etcd (state store), kube-scheduler (pod placement), kube-controller-manager (reconciliation loops)',
      'Ingress controller, CoreDNS, and CNI plugin',
      'Helm, kubectl, and kubeconfig'
    ],
    correctIndex: 1,
    explanation: 'Control plane: API server (all cluster communication goes through it), etcd (distributed KV store for all cluster state), scheduler (assigns pods to nodes based on resources/affinity), controller manager (runs reconciliation loops: deployment, replicaset, node controllers, etc.).'
  },
  {
    id: 'do-e-02', domain: 'devops', difficulty: 'expert', topic: 'eBPF',
    text: 'What is eBPF and why is it revolutionary for cloud-native observability and networking?',
    options: [
      'An extended version of BIOS firmware for cloud servers',
      'A Linux kernel technology that runs sandboxed programs in the kernel without modifying kernel source or loading modules, enabling low-overhead observability, networking, and security',
      'A protocol for encrypted communication between pods',
      'A benchmark framework for measuring cloud infrastructure performance'
    ],
    correctIndex: 1,
    explanation: 'eBPF programs are loaded into the Linux kernel and verified for safety. They can hook into system calls, network events, and tracepoints with minimal overhead. Used by Cilium (networking), Falco (security), and many observability tools to instrument the OS without code changes.'
  },

  // ======== MOBILE ========
  {
    id: 'mo-b-01', domain: 'mobile', difficulty: 'beginner', topic: 'React Native',
    text: 'What is the main advantage of React Native over native iOS/Android development?',
    options: [
      'React Native apps always perform better than native apps',
      'Write once in JavaScript/React and share code across iOS and Android platforms',
      'React Native apps can only run on Android',
      'React Native eliminates the need for an app store'
    ],
    correctIndex: 1,
    explanation: 'React Native allows JavaScript/React code to run on both iOS and Android, sharing business logic and UI components. Trade-off: near-native (not identical) performance, and platform-specific edge cases still require native knowledge.'
  },
  {
    id: 'mo-b-02', domain: 'mobile', difficulty: 'beginner', topic: 'React Native',
    text: 'What is FlatList in React Native and why is it preferred over mapping an array directly?',
    options: [
      'FlatList is a styling component for flat UI designs',
      'FlatList virtualizes long lists — only rendering items in the viewport — improving memory efficiency and scroll performance',
      'FlatList is identical to rendering an array with map()',
      'FlatList is only used for horizontal scrolling'
    ],
    correctIndex: 1,
    explanation: 'Mapping an array renders all items at once, causing memory issues with large lists. FlatList uses virtualization (recycling off-screen item views), rendering only what\'s visible. This keeps memory usage constant regardless of list size.'
  },
  {
    id: 'mo-i-01', domain: 'mobile', difficulty: 'intermediate', topic: 'Architecture',
    text: 'What is the old React Native bridge architecture and what problem did it have?',
    options: [
      'The bridge used WebSockets to communicate with native code, causing security issues',
      'The JavaScript and native threads communicated asynchronously via JSON serialization over a bridge, causing bottlenecks with large data and preventing synchronous native access',
      'The bridge was synchronous, blocking the UI thread',
      'The bridge only supported Android, not iOS'
    ],
    correctIndex: 1,
    explanation: 'In the old architecture, JS and native code ran on separate threads, communicating via asynchronous JSON messages over a "bridge." This meant no synchronous native API calls, serialization overhead, and jank when the bridge was saturated with messages.'
  },
  {
    id: 'mo-i-02', domain: 'mobile', difficulty: 'intermediate', topic: 'New Architecture',
    text: 'What is JSI (JavaScript Interface) in React Native\'s new architecture?',
    options: [
      'A new JavaScript parser for React Native',
      'A C++ layer that allows JavaScript to hold direct references to native objects and call native methods synchronously without serialization',
      'A testing interface for mocking native modules',
      'A JavaScript Standard Interface for ES modules'
    ],
    correctIndex: 1,
    explanation: 'JSI replaces the bridge with a C++ abstraction that lets the JS engine hold direct references to C++ objects. This enables synchronous native calls, eliminates JSON serialization overhead, and is the foundation for TurboModules and Fabric.'
  },
  {
    id: 'mo-a-01', domain: 'mobile', difficulty: 'advanced', topic: 'Performance',
    text: 'How does the Hermes JavaScript engine improve React Native app startup?',
    options: [
      'Hermes uses JIT compilation for faster execution like V8',
      'Hermes is an AOT-compiled engine that generates bytecode at build time, reducing parse/compile time at startup and lowering memory usage',
      'Hermes parallelizes JavaScript execution across CPU cores',
      'Hermes replaces the native layer entirely with a JavaScript VM'
    ],
    correctIndex: 1,
    explanation: 'Hermes pre-compiles JavaScript to bytecode during the build process. At runtime, the app loads and executes bytecode directly, skipping the parse and JIT-compile steps. This significantly reduces Time-to-Interactive, memory footprint, and APK/IPA size.'
  },
  {
    id: 'mo-e-01', domain: 'mobile', difficulty: 'expert', topic: 'Native Modules',
    text: 'What is Codegen in the new React Native architecture and why is it important?',
    options: [
      'A code linting tool for React Native projects',
      'A build-time tool that generates type-safe native bindings from TypeScript interface definitions, ensuring JS-native contract correctness at compile time rather than runtime',
      'An automatic code optimizer for React Native bundles',
      'A generator for React Native component boilerplate code'
    ],
    correctIndex: 1,
    explanation: 'Codegen reads TypeScript/Flow specifications of TurboModules and Fabric components and generates native (Objective-C/Swift/Java/Kotlin) code at build time. This enforces the JS-native contract at compile time, catching type mismatches before runtime and enabling static analysis.'
  },

  // ======== GENERAL / FULL STACK ========
  {
    id: 'gen-b-01', domain: 'general', difficulty: 'beginner', topic: 'Version Control',
    text: 'What is the purpose of git branching?',
    options: [
      'To create copies of the repository on different servers',
      'To create separate lines of development that can be worked on independently and merged later',
      'To back up code to cloud storage',
      'To assign code ownership to different developers'
    ],
    correctIndex: 1,
    explanation: 'Git branches allow parallel development: feature branches isolate work in progress, while the main/master branch remains stable. Branches can be merged, rebased, or cherry-picked.'
  },
  {
    id: 'gen-b-02', domain: 'general', difficulty: 'beginner', topic: 'Algorithms',
    text: 'What is the time complexity of binary search on a sorted array?',
    options: ['O(n)', 'O(n²)', 'O(log n)', 'O(1)'],
    correctIndex: 2,
    explanation: 'Binary search halves the search space on each iteration. Starting with n elements, after k steps there\'s n/2^k elements. When 1 element remains: k = log₂n. Hence O(log n).'
  },
  {
    id: 'gen-i-01', domain: 'general', difficulty: 'intermediate', topic: 'System Design',
    text: 'What is the purpose of a message queue (e.g., RabbitMQ, Kafka) in system design?',
    options: [
      'To store user session data between requests',
      'To decouple producers and consumers: producers send messages asynchronously without waiting for processing, enabling load buffering and fault tolerance',
      'To cache database query results for faster access',
      'To route HTTP requests to different microservices'
    ],
    correctIndex: 1,
    explanation: 'Message queues decouple services: producers publish without knowing consumers. Consumers process at their own pace, buffering traffic spikes. If a consumer fails, messages persist for retry. Enables async processing, event-driven architecture, and resilience.'
  },
  {
    id: 'gen-i-02', domain: 'general', difficulty: 'intermediate', topic: 'Design Patterns',
    text: 'What is the Observer pattern and a common use case?',
    options: [
      'A pattern where one object monitors another\'s CPU usage; used for performance profiling',
      'A pattern where subjects maintain a list of observers and notify them of state changes; used in event systems, React state, and pub/sub messaging',
      'A pattern for observing code changes in version control systems',
      'A pattern for monitoring database query performance'
    ],
    correctIndex: 1,
    explanation: 'Observer (pub/sub): a subject maintains observers and calls their update method on state change. Used in: DOM event listeners, React\'s state system, Redux store subscriptions, WebSocket event handlers, and message brokers.'
  },
  {
    id: 'gen-a-01', domain: 'general', difficulty: 'advanced', topic: 'System Design',
    text: 'How would you design a distributed rate limiter for a public API serving millions of requests?',
    options: [
      'Use a single Redis instance to count requests per user per time window using atomic INCR with TTL',
      'Use a distributed token bucket or sliding window algorithm with Redis (cluster mode) for shared state, with local in-memory fallback for the fixed window, accepting some over-counting for resilience',
      'Use a database row per user updated on each request',
      'Rate limiting should be done entirely at the client side'
    ],
    correctIndex: 1,
    explanation: 'Distributed rate limiting: Redis with atomic Lua scripts or INCR+TTL per user/time window is the foundation. For resilience, combine local (in-memory) + global (Redis) counters. Redis Cluster shards by user key. Token bucket allows burst capacity. Consider sliding window log for precision vs. fixed window for efficiency.'
  },
  {
    id: 'gen-e-01', domain: 'general', difficulty: 'expert', topic: 'Distributed Systems',
    text: 'What is the Two Generals Problem and what does it imply about distributed systems?',
    options: [
      'A problem about load balancing between two data centers',
      'A thought experiment showing it\'s impossible to achieve guaranteed consensus between two nodes over an unreliable channel — no protocol can guarantee both nodes will act simultaneously',
      'A problem about synchronizing two database replicas',
      'A security problem about authentication between two services'
    ],
    correctIndex: 1,
    explanation: 'The Two Generals Problem proves that achieving guaranteed consensus over an unreliable (lossy) network is impossible — any acknowledgment can itself be lost. This is a fundamental theoretical limit implying that all distributed systems must accept some probability of failure or inconsistency in their commit protocols.'
  },
];
