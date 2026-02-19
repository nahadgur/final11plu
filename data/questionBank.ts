import { Subject, Question, QuizType } from '../types';

// Comprehensive question bank for all subjects and question types
export const questionBank: Record<Subject, Partial<Record<QuizType, Question[]>>> = {
  [Subject.Maths]: {
    'multiple-choice': [
      {
        id: 'math-mc-1',
        text: 'What is 25% of 80?',
        options: ['15', '20', '25', '30'],
        correctAnswer: '20',
        explanation: '25% is the same as 1/4. To find 1/4 of 80, divide 80 by 4 = 20.',
        topic: 'Percentages'
      },
      {
        id: 'math-mc-2',
        text: 'A rectangle has a length of 12cm and width of 5cm. What is its area?',
        options: ['17 cm²', '34 cm²', '60 cm²', '70 cm²'],
        correctAnswer: '60 cm²',
        explanation: 'Area of rectangle = length × width = 12 × 5 = 60 cm²',
        topic: 'Area and Perimeter'
      },
      {
        id: 'math-mc-3',
        text: 'What is 7 × 8?',
        options: ['54', '56', '58', '64'],
        correctAnswer: '56',
        explanation: '7 × 8 = 56. This is a key times table fact.',
        topic: 'Multiplication'
      },
      {
        id: 'math-mc-4',
        text: 'What is 144 ÷ 12?',
        options: ['11', '12', '13', '14'],
        correctAnswer: '12',
        explanation: '144 ÷ 12 = 12. You can check: 12 × 12 = 144.',
        topic: 'Division'
      },
      {
        id: 'math-mc-5',
        text: 'What is the next number in the sequence: 3, 6, 9, 12, ?',
        options: ['13', '14', '15', '16'],
        correctAnswer: '15',
        explanation: 'This sequence increases by 3 each time. 12 + 3 = 15.',
        topic: 'Number Sequences'
      },
      {
        id: 'math-mc-6',
        text: 'If a train travels at 60 mph for 2 hours, how far does it travel?',
        options: ['100 miles', '110 miles', '120 miles', '130 miles'],
        correctAnswer: '120 miles',
        explanation: 'Distance = Speed × Time = 60 × 2 = 120 miles.',
        topic: 'Speed, Distance, Time'
      },
      {
        id: 'math-mc-7',
        text: 'What is 3/4 + 1/4?',
        options: ['1/2', '3/4', '4/4', '5/4'],
        correctAnswer: '4/4',
        explanation: '3/4 + 1/4 = 4/4 = 1 whole. When denominators are the same, add the numerators.',
        topic: 'Fractions'
      },
      {
        id: 'math-mc-8',
        text: 'A circle has a diameter of 10cm. What is its radius?',
        options: ['3cm', '5cm', '10cm', '20cm'],
        correctAnswer: '5cm',
        explanation: 'Radius is half of the diameter. 10 ÷ 2 = 5cm.',
        topic: 'Circles'
      }
    ],
    'true-false': [
      {
        id: 'math-tf-1',
        text: 'A square has 4 equal sides and 4 right angles.',
        options: ['True', 'False'],
        correctAnswer: 'True',
        explanation: 'This is the definition of a square - all sides equal, all angles 90°.',
        topic: 'Shapes'
      },
      {
        id: 'math-tf-2',
        text: 'Prime numbers can only be divided by 1 and themselves.',
        options: ['True', 'False'],
        correctAnswer: 'True',
        explanation: 'By definition, prime numbers have exactly two factors: 1 and the number itself.',
        topic: 'Prime Numbers'
      },
      {
        id: 'math-tf-3',
        text: 'The sum of angles in a triangle is 180 degrees.',
        options: ['True', 'False'],
        correctAnswer: 'True',
        explanation: 'This is a fundamental property of triangles - all interior angles sum to 180°.',
        topic: 'Angles'
      },
      {
        id: 'math-tf-4',
        text: '0.5 is equal to 50%.',
        options: ['True', 'False'],
        correctAnswer: 'True',
        explanation: 'To convert decimals to percentages, multiply by 100. 0.5 × 100 = 50%.',
        topic: 'Decimals and Percentages'
      },
      {
        id: 'math-tf-5',
        text: 'An obtuse angle is less than 90 degrees.',
        options: ['True', 'False'],
        correctAnswer: 'False',
        explanation: 'Obtuse angles are MORE than 90° but less than 180°. Acute angles are less than 90°.',
        topic: 'Angles'
      }
    ],
    'fill-in-the-blank': [
      {
        id: 'math-fb-1',
        text: 'The perimeter of a square with side length 5cm is _____ cm.',
        options: ['15', '20', '25', '30'],
        correctAnswer: '20',
        explanation: 'Perimeter = 4 × side length = 4 × 5 = 20cm.',
        topic: 'Perimeter'
      },
      {
        id: 'math-fb-2',
        text: 'Half of 100 is _____.',
        options: ['40', '45', '50', '55'],
        correctAnswer: '50',
        explanation: '100 ÷ 2 = 50.',
        topic: 'Division'
      },
      {
        id: 'math-fb-3',
        text: 'A triangle with all sides equal is called an _____ triangle.',
        options: ['equilateral', 'isosceles', 'scalene', 'right'],
        correctAnswer: 'equilateral',
        explanation: 'An equilateral triangle has all three sides equal and all angles are 60°.',
        topic: 'Triangles'
      },
      {
        id: 'math-fb-4',
        text: '1000 millilitres equals _____ litre.',
        options: ['0.1', '1', '10', '100'],
        correctAnswer: '1',
        explanation: 'There are 1000ml in 1 litre.',
        topic: 'Measurement'
      },
      {
        id: 'math-fb-5',
        text: '3 squared (3²) equals _____.',
        options: ['6', '9', '12', '27'],
        correctAnswer: '9',
        explanation: '3² = 3 × 3 = 9.',
        topic: 'Powers'
      }
    ],
    'ordering': [
      {
        id: 'math-ord-1',
        text: 'Arrange these fractions from smallest to largest:',
        options: ['1/2', '1/4', '3/4', '1/8'],
        correctAnswer: '1/8,1/4,1/2,3/4',
        explanation: 'When fractions have the same numerator, the larger the denominator, the smaller the fraction. When comparing different fractions, find common denominators.',
        topic: 'Fractions'
      },
      {
        id: 'math-ord-2',
        text: 'Order these numbers from smallest to largest:',
        options: ['0.75', '0.5', '0.25', '0.9'],
        correctAnswer: '0.25,0.5,0.75,0.9',
        explanation: 'Compare decimals by looking at the tenths place first, then hundredths if needed.',
        topic: 'Decimals'
      },
      {
        id: 'math-ord-3',
        text: 'Order these shapes by number of sides (fewest to most):',
        options: ['Pentagon', 'Triangle', 'Hexagon', 'Square'],
        correctAnswer: 'Triangle,Square,Pentagon,Hexagon',
        explanation: 'Triangle (3 sides), Square (4 sides), Pentagon (5 sides), Hexagon (6 sides).',
        topic: 'Shapes'
      },
      {
        id: 'math-ord-4',
        text: 'Order these steps to solve 3x + 5 = 14:',
        options: ['Subtract 5 from both sides', 'Divide both sides by 3', 'Get x = 3', 'Get 3x = 9'],
        correctAnswer: 'Subtract 5 from both sides,Get 3x = 9,Divide both sides by 3,Get x = 3',
        explanation: 'First isolate the term with x by subtracting 5, then divide to find x.',
        topic: 'Algebra'
      },
      {
        id: 'math-ord-5',
        text: 'Order these units from smallest to largest:',
        options: ['Kilometre', 'Centimetre', 'Metre', 'Millimetre'],
        correctAnswer: 'Millimetre,Centimetre,Metre,Kilometre',
        explanation: 'Millimetre (0.001m), Centimetre (0.01m), Metre (1m), Kilometre (1000m).',
        topic: 'Measurement'
      }
    ]
  },

  [Subject.English]: {
    'multiple-choice': [
      {
        id: 'eng-mc-1',
        text: 'Which word is a synonym for "happy"?',
        options: ['Sad', 'Joyful', 'Angry', 'Tired'],
        correctAnswer: 'Joyful',
        explanation: 'A synonym is a word with similar meaning. Joyful means happy or delighted.',
        topic: 'Vocabulary'
      },
      {
        id: 'eng-mc-2',
        text: 'What type of word is "quickly"?',
        options: ['Noun', 'Verb', 'Adjective', 'Adverb'],
        correctAnswer: 'Adverb',
        explanation: 'Adverbs describe how an action is done. "Quickly" describes the manner of doing something.',
        topic: 'Parts of Speech'
      },
      {
        id: 'eng-mc-3',
        text: 'Which sentence is correctly punctuated?',
        options: [
          'I like apples oranges and bananas',
          'I like apples, oranges, and bananas',
          'I like apples oranges, and bananas',
          'I like apples, oranges and, bananas'
        ],
        correctAnswer: 'I like apples, oranges, and bananas',
        explanation: 'When listing items, separate them with commas. The final comma before "and" is called the Oxford comma.',
        topic: 'Punctuation'
      },
      {
        id: 'eng-mc-4',
        text: 'What is the past tense of "run"?',
        options: ['Runned', 'Ran', 'Running', 'Runs'],
        correctAnswer: 'Ran',
        explanation: '"Run" is an irregular verb. The past tense is "ran", not "runned".',
        topic: 'Verb Tenses'
      },
      {
        id: 'eng-mc-5',
        text: 'Which word is spelled correctly?',
        options: ['Definately', 'Definitely', 'Definatly', 'Definetly'],
        correctAnswer: 'Definitely',
        explanation: 'The correct spelling is "definitely" - think "finite" in the middle.',
        topic: 'Spelling'
      },
      {
        id: 'eng-mc-6',
        text: 'What does the prefix "un-" mean in "unhappy"?',
        options: ['Very', 'Not', 'Again', 'Before'],
        correctAnswer: 'Not',
        explanation: 'The prefix "un-" means "not" or "opposite of". Unhappy = not happy.',
        topic: 'Word Structure'
      },
      {
        id: 'eng-mc-7',
        text: 'Which is an example of alliteration?',
        options: [
          'The sun shone brightly',
          'Peter Piper picked peppers',
          'It was as cold as ice',
          'The leaves danced in the wind'
        ],
        correctAnswer: 'Peter Piper picked peppers',
        explanation: 'Alliteration is repetition of the same sound at the start of words. "Peter Piper picked peppers" repeats the "p" sound.',
        topic: 'Literary Devices'
      },
      {
        id: 'eng-mc-8',
        text: 'What is the plural of "child"?',
        options: ['Childs', 'Children', 'Childes', 'Childrens'],
        correctAnswer: 'Children',
        explanation: '"Child" is an irregular noun. Its plural form is "children", not "childs".',
        topic: 'Plurals'
      }
    ],
    'true-false': [
      {
        id: 'eng-tf-1',
        text: 'A noun is a naming word for a person, place, or thing.',
        options: ['True', 'False'],
        correctAnswer: 'True',
        explanation: 'Nouns name people (teacher), places (London), things (book), or ideas (happiness).',
        topic: 'Parts of Speech'
      },
      {
        id: 'eng-tf-2',
        text: 'An adjective describes a verb.',
        options: ['True', 'False'],
        correctAnswer: 'False',
        explanation: 'Adjectives describe nouns (e.g., "big dog"). Adverbs describe verbs (e.g., "run quickly").',
        topic: 'Parts of Speech'
      },
      {
        id: 'eng-tf-3',
        text: 'Every sentence must have a capital letter at the start and a full stop at the end.',
        options: ['True', 'False'],
        correctAnswer: 'True',
        explanation: 'This is a basic punctuation rule for all complete sentences.',
        topic: 'Punctuation'
      },
      {
        id: 'eng-tf-4',
        text: 'A simile compares two things using "like" or "as".',
        options: ['True', 'False'],
        correctAnswer: 'True',
        explanation: 'Similes use "like" or "as" for comparison, e.g., "as brave as a lion".',
        topic: 'Literary Devices'
      },
      {
        id: 'eng-tf-5',
        text: 'The words "their", "there", and "they\'re" have the same meaning.',
        options: ['True', 'False'],
        correctAnswer: 'False',
        explanation: 'These are homophones (sound alike) but mean different things: "their" (belonging), "there" (place), "they\'re" (they are).',
        topic: 'Homophones'
      }
    ],
    'fill-in-the-blank': [
      {
        id: 'eng-fb-1',
        text: 'A word that describes a noun is called an _____.',
        options: ['adverb', 'adjective', 'verb', 'pronoun'],
        correctAnswer: 'adjective',
        explanation: 'Adjectives describe or modify nouns, e.g., "beautiful flower", "tall building".',
        topic: 'Parts of Speech'
      },
      {
        id: 'eng-fb-2',
        text: 'The opposite of "hot" is _____.',
        options: ['warm', 'cold', 'cool', 'freezing'],
        correctAnswer: 'cold',
        explanation: 'Cold is the direct antonym (opposite) of hot.',
        topic: 'Vocabulary'
      },
      {
        id: 'eng-fb-3',
        text: 'A group of words that contains a subject and verb is called a _____.',
        options: ['phrase', 'clause', 'paragraph', 'sentence'],
        correctAnswer: 'clause',
        explanation: 'A clause contains a subject and a verb. It can be independent or dependent.',
        topic: 'Grammar'
      },
      {
        id: 'eng-fb-4',
        text: 'Words that sound the same but have different meanings are called _____.',
        options: ['synonyms', 'antonyms', 'homophones', 'adjectives'],
        correctAnswer: 'homophones',
        explanation: 'Homophones sound identical but differ in meaning or spelling, e.g., "flour" and "flower".',
        topic: 'Vocabulary'
      },
      {
        id: 'eng-fb-5',
        text: 'The punctuation mark used to show possession is called an _____.',
        options: ['comma', 'apostrophe', 'colon', 'semicolon'],
        correctAnswer: 'apostrophe',
        explanation: 'Apostrophes show possession (John\'s book) or contractions (don\'t).',
        topic: 'Punctuation'
      }
    ],
    'ordering': [
      {
        id: 'eng-ord-1',
        text: 'Arrange these words alphabetically:',
        options: ['Zebra', 'Apple', 'Mountain', 'Balloon'],
        correctAnswer: 'Apple,Balloon,Mountain,Zebra',
        explanation: 'Alphabetical order follows A-Z. Look at the first letter, then second if needed.',
        topic: 'Alphabetical Order'
      },
      {
        id: 'eng-ord-2',
        text: 'Order these to form a correct sentence:',
        options: ['the park', 'walked to', 'We', 'yesterday'],
        correctAnswer: 'We,walked to,the park,yesterday',
        explanation: 'Sentences follow Subject-Verb-Object structure: "We walked to the park yesterday".',
        topic: 'Sentence Structure'
      },
      {
        id: 'eng-ord-3',
        text: 'Order the stages of writing process:',
        options: ['Editing', 'Planning', 'Publishing', 'Drafting'],
        correctAnswer: 'Planning,Drafting,Editing,Publishing',
        explanation: 'The writing process: Plan (ideas), Draft (write), Edit (improve), Publish (share).',
        topic: 'Writing Process'
      },
      {
        id: 'eng-ord-4',
        text: 'Order these story elements chronologically in a typical plot:',
        options: ['Resolution', 'Climax', 'Introduction', 'Rising Action'],
        correctAnswer: 'Introduction,Rising Action,Climax,Resolution',
        explanation: 'Story structure: Introduction → Rising Action → Climax → Resolution.',
        topic: 'Story Structure'
      },
      {
        id: 'eng-ord-5',
        text: 'Order these from smallest to largest text unit:',
        options: ['Paragraph', 'Sentence', 'Chapter', 'Word'],
        correctAnswer: 'Word,Sentence,Paragraph,Chapter',
        explanation: 'Words form sentences, sentences form paragraphs, paragraphs form chapters.',
        topic: 'Text Structure'
      }
    ]
  },

  [Subject.VerbalReasoning]: {
    'multiple-choice': [
      {
        id: 'vr-mc-1',
        text: 'Complete the analogy: Hot is to Cold as Day is to _____',
        options: ['Sun', 'Night', 'Light', 'Morning'],
        correctAnswer: 'Night',
        explanation: 'Hot and cold are opposites, just as day and night are opposites.',
        topic: 'Analogies'
      },
      {
        id: 'vr-mc-2',
        text: 'Which word does NOT belong? Apple, Banana, Carrot, Orange',
        options: ['Apple', 'Banana', 'Carrot', 'Orange'],
        correctAnswer: 'Carrot',
        explanation: 'Carrot is a vegetable, while the others are all fruits.',
        topic: 'Odd One Out'
      },
      {
        id: 'vr-mc-3',
        text: 'Find the missing letters: AB, CD, EF, __',
        options: ['GH', 'HI', 'FG', 'EG'],
        correctAnswer: 'GH',
        explanation: 'The pattern shows consecutive letter pairs: AB, CD, EF, GH.',
        topic: 'Letter Sequences'
      },
      {
        id: 'vr-mc-4',
        text: 'If CODE is written as DPEF, how is GAME written?',
        options: ['HBNF', 'FZLD', 'HBMF', 'GZMD'],
        correctAnswer: 'HBNF',
        explanation: 'Each letter moves forward one position in the alphabet: G→H, A→B, M→N, E→F.',
        topic: 'Codes'
      },
      {
        id: 'vr-mc-5',
        text: 'Which word is closest in meaning to "brave"?',
        options: ['Fearful', 'Courageous', 'Weak', 'Timid'],
        correctAnswer: 'Courageous',
        explanation: 'Courageous is a synonym of brave - both mean showing courage and not being afraid.',
        topic: 'Synonyms'
      },
      {
        id: 'vr-mc-6',
        text: 'Complete: BCDE is to FGHI as JKLM is to _____',
        options: ['MNOP', 'NOPQ', 'LMNO', 'OPQR'],
        correctAnswer: 'NOPQ',
        explanation: 'FGHI is 4 letters after BCDE. NOPQ is 4 letters after JKLM.',
        topic: 'Analogies'
      },
      {
        id: 'vr-mc-7',
        text: 'Which two words are most similar: HAPPY, SAD, JOYFUL, ANGRY',
        options: ['HAPPY and SAD', 'HAPPY and JOYFUL', 'SAD and JOYFUL', 'SAD and ANGRY'],
        correctAnswer: 'HAPPY and JOYFUL',
        explanation: 'Happy and joyful are synonyms - they both mean feeling pleasure or contentment.',
        topic: 'Synonyms'
      },
      {
        id: 'vr-mc-8',
        text: 'Find the odd one out: Dog, Cat, Bird, Table',
        options: ['Dog', 'Cat', 'Bird', 'Table'],
        correctAnswer: 'Table',
        explanation: 'Table is not a living thing, while dog, cat, and bird are all animals.',
        topic: 'Odd One Out'
      }
    ],
    'true-false': [
      {
        id: 'vr-tf-1',
        text: 'An antonym is a word with the opposite meaning.',
        options: ['True', 'False'],
        correctAnswer: 'True',
        explanation: 'Antonyms are words with opposite meanings, like hot/cold or big/small.',
        topic: 'Vocabulary'
      },
      {
        id: 'vr-tf-2',
        text: 'In the sequence 2, 4, 6, 8, the next number is 9.',
        options: ['True', 'False'],
        correctAnswer: 'False',
        explanation: 'The pattern adds 2 each time. 8 + 2 = 10, not 9.',
        topic: 'Number Sequences'
      },
      {
        id: 'vr-tf-3',
        text: 'All birds can fly.',
        options: ['True', 'False'],
        correctAnswer: 'False',
        explanation: 'Some birds like penguins and ostriches cannot fly, even though they are birds.',
        topic: 'Logic'
      },
      {
        id: 'vr-tf-4',
        text: 'The word "synonym" means words that sound the same.',
        options: ['True', 'False'],
        correctAnswer: 'False',
        explanation: 'Synonyms are words with similar meanings. Words that sound the same are homophones.',
        topic: 'Vocabulary'
      },
      {
        id: 'vr-tf-5',
        text: 'In a code where A=1, B=2, C=3, the word CAT would be 3-1-20.',
        options: ['True', 'False'],
        correctAnswer: 'True',
        explanation: 'C=3, A=1, T=20 (T is the 20th letter), so CAT = 3-1-20.',
        topic: 'Codes'
      }
    ],
    'fill-in-the-blank': [
      {
        id: 'vr-fb-1',
        text: 'Fish is to Water as Bird is to _____.',
        options: ['nest', 'sky', 'tree', 'wing'],
        correctAnswer: 'sky',
        explanation: 'Fish live in water, birds fly in the sky. This is an analogy about natural habitats.',
        topic: 'Analogies'
      },
      {
        id: 'vr-fb-2',
        text: 'The opposite of "light" is _____.',
        options: ['bright', 'dark', 'heavy', 'dim'],
        correctAnswer: 'dark',
        explanation: 'Dark is the antonym (opposite) of light when referring to brightness.',
        topic: 'Antonyms'
      },
      {
        id: 'vr-fb-3',
        text: 'Complete the sequence: Monday, Tuesday, Wednesday, _____.',
        options: ['Friday', 'Thursday', 'Saturday', 'Sunday'],
        correctAnswer: 'Thursday',
        explanation: 'This follows the days of the week in order.',
        topic: 'Sequences'
      },
      {
        id: 'vr-fb-4',
        text: 'If 1=A, 2=B, 3=C, then 2-5-4 spells _____.',
        options: ['BED', 'BAD', 'BEE', 'CAB'],
        correctAnswer: 'BED',
        explanation: '2=B, 5=E (fifth letter), 4=D (fourth letter), so 2-5-4 = BED.',
        topic: 'Codes'
      },
      {
        id: 'vr-fb-5',
        text: 'Summer, Autumn, Winter, _____ are the four seasons.',
        options: ['Spring', 'Fall', 'Rain', 'Snow'],
        correctAnswer: 'Spring',
        explanation: 'The four seasons in order are Spring, Summer, Autumn, Winter.',
        topic: 'General Knowledge'
      }
    ],
    'ordering': [
      {
        id: 'vr-ord-1',
        text: 'Arrange these words to make a logical sentence:',
        options: ['sky', 'the', 'blue', 'is'],
        correctAnswer: 'the,sky,is,blue',
        explanation: 'Proper sentence order: "The sky is blue".',
        topic: 'Sentence Formation'
      },
      {
        id: 'vr-ord-2',
        text: 'Order these from smallest to largest animal:',
        options: ['Elephant', 'Mouse', 'Dog', 'Cat'],
        correctAnswer: 'Mouse,Cat,Dog,Elephant',
        explanation: 'Typical size order: Mouse (smallest) → Cat → Dog → Elephant (largest).',
        topic: 'Logic'
      },
      {
        id: 'vr-ord-3',
        text: 'Order these events in a typical day:',
        options: ['Dinner', 'Breakfast', 'Bedtime', 'Lunch'],
        correctAnswer: 'Breakfast,Lunch,Dinner,Bedtime',
        explanation: 'Chronological order of daily meals and activities.',
        topic: 'Sequencing'
      },
      {
        id: 'vr-ord-4',
        text: 'Order these transport methods from slowest to fastest:',
        options: ['Aeroplane', 'Bicycle', 'Car', 'Walking'],
        correctAnswer: 'Walking,Bicycle,Car,Aeroplane',
        explanation: 'Speed order: Walking (slowest) → Bicycle → Car → Aeroplane (fastest).',
        topic: 'Logic'
      },
      {
        id: 'vr-ord-5',
        text: 'Order the months: December, September, June, March',
        options: ['December', 'September', 'June', 'March'],
        correctAnswer: 'March,June,September,December',
        explanation: 'Calendar order: March (3rd), June (6th), September (9th), December (12th).',
        topic: 'Sequencing'
      }
    ]
  },

  [Subject.NonVerbalReasoning]: {
    'multiple-choice': [
      {
        id: 'nvr-mc-1',
        text: 'A pattern shows: Square, Circle, Triangle, Square, Circle, ___. What comes next?',
        options: ['Square', 'Circle', 'Triangle', 'Diamond'],
        correctAnswer: 'Triangle',
        explanation: 'The pattern repeats every 3 shapes: Square, Circle, Triangle. Next is Triangle.',
        topic: 'Pattern Recognition'
      },
      {
        id: 'nvr-mc-2',
        text: 'Shape A is rotated 90° clockwise. If it was pointing UP, where does it point now?',
        options: ['Up', 'Down', 'Left', 'Right'],
        correctAnswer: 'Right',
        explanation: 'Rotating 90° clockwise from UP moves the arrow to point RIGHT.',
        topic: 'Rotation'
      },
      {
        id: 'nvr-mc-3',
        text: 'A 3x3 grid has shapes in corners. Top-left: Circle, Top-right: Square, Bottom-left: Triangle. What completes the pattern at Bottom-right?',
        options: ['Circle', 'Square', 'Triangle', 'Star'],
        correctAnswer: 'Square',
        explanation: 'The pattern alternates diagonally. Opposite corners should match.',
        topic: 'Spatial Reasoning'
      },
      {
        id: 'nvr-mc-4',
        text: 'Which shape is the mirror image of a RIGHT-facing arrow?',
        options: ['Right-facing arrow', 'Left-facing arrow', 'Up-facing arrow', 'Down-facing arrow'],
        correctAnswer: 'Left-facing arrow',
        explanation: 'A mirror reflection reverses horizontal direction. Right becomes Left.',
        topic: 'Reflection'
      },
      {
        id: 'nvr-mc-5',
        text: 'A black square has a white circle inside. What is the net (opposite) pattern?',
        options: ['White square, black circle', 'Black square, white circle', 'Black circle, white square', 'All white'],
        correctAnswer: 'White square, black circle',
        explanation: 'The net pattern inverts all colours: black↔white.',
        topic: 'Pattern Logic'
      },
      {
        id: 'nvr-mc-6',
        text: 'If a cube is unfolded, which face is opposite to the top face?',
        options: ['Bottom', 'Front', 'Left', 'Right'],
        correctAnswer: 'Bottom',
        explanation: 'In a cube, opposite faces are: top-bottom, front-back, left-right.',
        topic: '3D Shapes'
      },
      {
        id: 'nvr-mc-7',
        text: 'Pattern: 1 dot, 2 dots, 3 dots, 4 dots. What comes next?',
        options: ['3 dots', '4 dots', '5 dots', '6 dots'],
        correctAnswer: '5 dots',
        explanation: 'Simple counting sequence increasing by 1 each time.',
        topic: 'Number Patterns'
      },
      {
        id: 'nvr-mc-8',
        text: 'A shape is folded in half. The left side has 2 holes. How many holes when unfolded?',
        options: ['1', '2', '3', '4'],
        correctAnswer: '4',
        explanation: 'When folded, 2 holes create 4 holes total (2 on each side when unfolded).',
        topic: 'Paper Folding'
      }
    ],
    'true-false': [
      {
        id: 'nvr-tf-1',
        text: 'A square rotated 90° looks different from the original.',
        options: ['True', 'False'],
        correctAnswer: 'False',
        explanation: 'A square has rotational symmetry - it looks the same after 90° rotation.',
        topic: 'Rotation'
      },
      {
        id: 'nvr-tf-2',
        text: 'Reflection reverses left and right but keeps up and down the same.',
        options: ['True', 'False'],
        correctAnswer: 'True',
        explanation: 'Mirror reflection flips horizontal direction but maintains vertical position.',
        topic: 'Reflection'
      },
      {
        id: 'nvr-tf-3',
        text: 'A cube has 8 faces.',
        options: ['True', 'False'],
        correctAnswer: 'False',
        explanation: 'A cube has 6 faces, not 8. It has 8 vertices (corners).',
        topic: '3D Shapes'
      },
      {
        id: 'nvr-tf-4',
        text: 'Rotating a triangle 180° creates the same orientation as flipping it upside down.',
        options: ['True', 'False'],
        correctAnswer: 'True',
        explanation: 'A 180° rotation and a vertical flip produce the same result.',
        topic: 'Rotation'
      },
      {
        id: 'nvr-tf-5',
        text: 'A pattern that repeats every 4 items will have the 9th item match the 5th item.',
        options: ['True', 'False'],
        correctAnswer: 'True',
        explanation: 'If pattern repeats every 4: items 1,5,9,13... are the same. 5+4=9.',
        topic: 'Pattern Recognition'
      }
    ],
    'fill-in-the-blank': [
      {
        id: 'nvr-fb-1',
        text: 'A shape with four equal sides and four right angles is a _____.',
        options: ['rectangle', 'square', 'triangle', 'circle'],
        correctAnswer: 'square',
        explanation: 'A square has all equal sides and all 90° angles.',
        topic: 'Shapes'
      },
      {
        id: 'nvr-fb-2',
        text: 'When a 2D shape is rotated _____ degrees, it makes one complete turn.',
        options: ['90', '180', '270', '360'],
        correctAnswer: '360',
        explanation: 'A full rotation is 360 degrees, returning to the starting position.',
        topic: 'Rotation'
      },
      {
        id: 'nvr-fb-3',
        text: 'The line down the middle of a symmetrical shape is called the line of _____.',
        options: ['reflection', 'symmetry', 'rotation', 'pattern'],
        correctAnswer: 'symmetry',
        explanation: 'The line of symmetry divides a shape into two identical halves.',
        topic: 'Symmetry'
      },
      {
        id: 'nvr-fb-4',
        text: 'A triangle has _____ sides.',
        options: ['2', '3', '4', '5'],
        correctAnswer: '3',
        explanation: 'By definition, a triangle has exactly 3 sides.',
        topic: 'Shapes'
      },
      {
        id: 'nvr-fb-5',
        text: 'Shapes that fit together without gaps are called _____.',
        options: ['patterns', 'tessellations', 'sequences', 'rotations'],
        correctAnswer: 'tessellations',
        explanation: 'Tessellations are repeated shapes that fit together perfectly with no gaps.',
        topic: 'Tessellation'
      }
    ],
    'ordering': [
      {
        id: 'nvr-ord-1',
        text: 'Order these shapes by number of sides (fewest to most):',
        options: ['Hexagon', 'Triangle', 'Pentagon', 'Square'],
        correctAnswer: 'Triangle,Square,Pentagon,Hexagon',
        explanation: 'Triangle (3), Square (4), Pentagon (5), Hexagon (6) sides.',
        topic: 'Shapes'
      },
      {
        id: 'nvr-ord-2',
        text: 'Order rotations from smallest to largest turn:',
        options: ['360°', '90°', '180°', '45°'],
        correctAnswer: '45°,90°,180°,360°',
        explanation: 'Degrees increase: 45° (eighth turn) → 90° (quarter) → 180° (half) → 360° (full).',
        topic: 'Rotation'
      },
      {
        id: 'nvr-ord-3',
        text: 'Order these by complexity (simplest to most complex shape):',
        options: ['Hexagon', 'Circle', 'Triangle', 'Square'],
        correctAnswer: 'Circle,Triangle,Square,Hexagon',
        explanation: 'Generally: Circle (0 sides/corners) → Triangle (3) → Square (4) → Hexagon (6).',
        topic: 'Shapes'
      },
      {
        id: 'nvr-ord-4',
        text: 'Order transformation sequence: Original shape, then:',
        options: ['Rotate 180°', 'Reflect', 'Rotate 90°', 'Rotate 270°'],
        correctAnswer: 'Rotate 90°,Rotate 180°,Rotate 270°,Reflect',
        explanation: 'Logical progression: 90° → 180° → 270° rotations, then different transformation (reflect).',
        topic: 'Transformations'
      },
      {
        id: 'nvr-ord-5',
        text: 'Order these 3D shapes by number of faces:',
        options: ['Cube', 'Cylinder', 'Sphere', 'Triangular Prism'],
        correctAnswer: 'Sphere,Cylinder,Triangular Prism,Cube',
        explanation: 'Sphere (0 flat faces), Cylinder (2+1 curved = 3), Triangular Prism (5), Cube (6).',
        topic: '3D Shapes'
      }
    ]
  }
};

// Helper function to get random questions
function normalizeSubject(input: any): Subject {
  // Accept either enum values (e.g. "English") or slugs (e.g. "english").
  const raw = String(input ?? '').trim();
  // If it's already one of the enum values, keep it.
  const asEnum = (Object.values(Subject) as string[]).find((v) => v === raw);
  if (asEnum) return asEnum as Subject;

  const s = raw.toLowerCase();
  if (s.includes('english') || s === 'eng') return Subject.English;
  if (s.includes('non') && s.includes('verbal')) return Subject.NonVerbalReasoning;
  if (s.includes('verbal')) return Subject.VerbalReasoning;
  if (s.includes('math')) return Subject.Maths;
  return Subject.Maths;
}

function normalizeQuizType(input: any): QuizType {
  const raw = String(input ?? '').trim();
  const lower = raw.toLowerCase();

  // Accept exact values first
  const allowed = new Set<QuizType>([
    'multiple-choice',
    'true-false',
    'fill-in-the-blank',
    'ordering',
    'short-answer'
  ]);
  if (allowed.has(raw as QuizType)) return raw as QuizType;
  if (allowed.has(lower as QuizType)) return lower as QuizType;

  // Common aliases
  if (lower === 'mcq' || lower === 'multiple choice' || lower === 'multiplechoice') return 'multiple-choice';
  if (lower === 'short answer' || lower === 'free-text' || lower === 'text') return 'short-answer';
  if (lower === 'fill' || lower === 'fill blank' || lower === 'fill blank') return 'fill-in-the-blank';
  if (lower === 'tf' || lower === 'true false' || lower === 'true/false') return 'true-false';
  return 'multiple-choice';
}

export function getRandomQuestions(
  subject: Subject | string,
  quizType: QuizType | string,
  count: number = 5,
  topic?: string
): Question[] {
  const normalizedSubject = normalizeSubject(subject);
  const normalizedQuizType = normalizeQuizType(quizType);
  const questions = questionBank?.[normalizedSubject]?.[normalizedQuizType] || [];

  // Filter by topic if specified
  let filteredQuestions = topic
    ? questions.filter((q) => q.topic.toLowerCase().includes(topic.toLowerCase()))
    : questions;

  // If not enough questions after filtering, fall back to the full set
  if (filteredQuestions.length < 1) {
    filteredQuestions = questions;
  }

  // Shuffle once
  const shuffled = [...filteredQuestions].sort(() => Math.random() - 0.5);

  const usedTexts = new Set<string>();
  const result: Question[] = [];

  // Take as many unique bank questions as we can
  for (let i = 0; i < shuffled.length && result.length < count; i++) {
    const q = shuffled[i];
    if (!usedTexts.has(q.text)) {
      usedTexts.add(q.text);
      result.push({ ...q, id: `${q.id}` });
    }
  }

  // If we still need more, generate procedural questions (prevents obvious repeats in long exams)
  if (result.length < count) {
    const needed = count - result.length;
    const generated = generateProceduralQuestions(
      normalizedSubject,
      normalizedQuizType,
      needed,
      topic,
      usedTexts
    );
    result.push(...generated);
  }

  // As a final safety net, if we still can't hit count, allow cycling with id suffixes
  if (result.length < count && shuffled.length > 0) {
    let cycle = 2;
    while (result.length < count) {
      for (let i = 0; i < shuffled.length && result.length < count; i++) {
        const base = shuffled[i];
        result.push({ ...base, id: `${base.id}-v${cycle}` });
      }
      cycle += 1;
      if (cycle > 10) break; // avoid runaway
    }
  }

  return result.slice(0, count);
}

function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function makeOptions(correct: string, distractors: string[], desired = 4): string[] {
  const opts = [correct, ...distractors].filter(Boolean);
  const unique = Array.from(new Set(opts));
  const trimmed = unique.slice(0, desired);
  while (trimmed.length < desired) trimmed.push(correct); // fallback
  return shuffle(trimmed);
}

function generateProceduralQuestions(
  subject: Subject,
  quizType: QuizType,
  count: number,
  topic: string | undefined,
  usedTexts: Set<string>
): Question[] {
  const out: Question[] = [];
  let attempts = 0;

  // Template pools
  const mathsTopics = [
    'Percentages',
    'Fractions',
    'Ratio',
    'Algebra',
    'Sequences',
    'Area and Perimeter',
    'Time and Speed',
    'Averages'
  ];

  const englishTopics = [
    'Vocabulary',
    'Punctuation',
    'Grammar',
    "Writer's Methods",
    'Comprehension'
  ];

  while (out.length < count && attempts < count * 30) {
    attempts += 1;

    if (subject === Subject.Maths) {
      const t = topic || mathsTopics[randInt(0, mathsTopics.length - 1)];

      const q = buildMathsQuestion(quizType, t);
      if (q && !usedTexts.has(q.text)) {
        usedTexts.add(q.text);
        out.push({ ...q, id: `gen-math-${out.length + 1}-${Date.now()}-${attempts}` });
      }
      continue;
    }

    if (subject === Subject.English) {
      const t = topic || englishTopics[randInt(0, englishTopics.length - 1)];

      const q = buildEnglishQuestion(quizType, t);
      if (q && !usedTexts.has(q.text)) {
        usedTexts.add(q.text);
        out.push({ ...q, id: `gen-eng-${out.length + 1}-${Date.now()}-${attempts}` });
      }
      continue;
    }

    // For other subjects not yet implemented, do nothing (will fall back to cycling)
  }

  return out;
}

function buildMathsQuestion(quizType: QuizType, topic: string): Omit<Question, 'id'> | null {
  // Force supported styles to match our current UI
  const qt = quizType === 'true-false' ? 'true-false' : 'multiple-choice';

  // Choose a template by topic
  if (topic.toLowerCase().includes('percent')) {
    const base = randInt(40, 240);
    const pct = [10, 12.5, 20, 25, 30, 40, 50][randInt(0, 6)];
    const correct = (base * pct) / 100;
    const correctStr = Number.isInteger(correct) ? String(correct) : String(correct);
    const distractors = [
      String((base * (pct + 5)) / 100),
      String((base * (pct - 5)) / 100),
      String((base * pct) / 10)
    ];
    return {
      text: `What is ${pct}% of ${base}?`,
      options: qt === 'true-false' ? ['True', 'False'] : makeOptions(correctStr, distractors),
      correctAnswer: qt === 'true-false' ? 'False' : correctStr,
      explanation: `${pct}% means ${pct}/100. Multiply ${base} by ${pct} and divide by 100.`,
      topic: 'Percentages'
    };
  }

  if (topic.toLowerCase().includes('fraction')) {
    const denom = [2, 3, 4, 5, 6, 8, 10, 12][randInt(0, 7)];
    const num = randInt(1, denom - 1);
    const multiple = randInt(6, 30);
    const total = denom * multiple;
    const correct = (num * total) / denom;
    const correctStr = String(correct);
    const distractors = [String(correct + multiple), String(correct - multiple), String(total - correct)];
    return {
      text: `What is ${num}/${denom} of ${total}?`,
      options: qt === 'true-false' ? ['True', 'False'] : makeOptions(correctStr, distractors),
      correctAnswer: qt === 'true-false' ? 'False' : correctStr,
      explanation: `To find ${num}/${denom} of ${total}, divide ${total} by ${denom} then multiply by ${num}.`,
      topic: 'Fractions'
    };
  }

  if (topic.toLowerCase().includes('ratio')) {
    const a = randInt(2, 9);
    const b = randInt(2, 9);
    const totalParts = a + b;
    const total = totalParts * randInt(5, 25);
    const shareA = (a * total) / totalParts;
    const correctStr = String(shareA);
    const distractors = [String(shareA + totalParts), String(shareA - totalParts), String(total - shareA)];
    return {
      text: `£${total} is shared in the ratio ${a}:${b}. How much does the first person get?`,
      options: qt === 'true-false' ? ['True', 'False'] : makeOptions(correctStr, distractors),
      correctAnswer: qt === 'true-false' ? 'False' : correctStr,
      explanation: `Total parts = ${a}+${b}=${totalParts}. First share = ${a}/${totalParts} of ${total}.`,
      topic: 'Ratio'
    };
  }

  if (topic.toLowerCase().includes('algebra')) {
    const x = randInt(3, 15);
    const m = randInt(2, 9);
    const c = randInt(1, 20);
    const rhs = m * x + c;
    const correctStr = String(x);
    const distractors = [String(x + 1), String(x - 1), String(Math.max(1, x + 2))];
    return {
      text: `Solve for x: ${m}x + ${c} = ${rhs}`,
      options: qt === 'true-false' ? ['True', 'False'] : makeOptions(correctStr, distractors),
      correctAnswer: qt === 'true-false' ? 'False' : correctStr,
      explanation: `Subtract ${c} from both sides: ${m}x = ${rhs - c}. Then divide by ${m}: x = ${x}.`,
      topic: 'Algebra'
    };
  }

  if (topic.toLowerCase().includes('sequence')) {
    const step = randInt(2, 12);
    const start = randInt(1, 30);
    const terms = [start, start + step, start + 2 * step, start + 3 * step];
    const correct = start + 4 * step;
    const correctStr = String(correct);
    const distractors = [String(correct + step), String(correct - step), String(start + 5 * step)];
    return {
      text: `What is the next number in the sequence: ${terms.join(', ')}, ... ?`,
      options: qt === 'true-false' ? ['True', 'False'] : makeOptions(correctStr, distractors),
      correctAnswer: qt === 'true-false' ? 'False' : correctStr,
      explanation: `This is an arithmetic sequence adding ${step} each time.`,
      topic: 'Sequences'
    };
  }

  if (topic.toLowerCase().includes('area') || topic.toLowerCase().includes('perimeter')) {
    const l = randInt(4, 25);
    const w = randInt(3, 18);
    const area = l * w;
    const correctStr = `${area} cm²`;
    const distractors = [`${2*(l+w)} cm`, `${l+w} cm²`, `${area + l} cm²`];
    return {
      text: `A rectangle is ${l}cm by ${w}cm. What is its area?`,
      options: qt === 'true-false' ? ['True', 'False'] : makeOptions(correctStr, distractors),
      correctAnswer: qt === 'true-false' ? 'False' : correctStr,
      explanation: `Area = length × width = ${l} × ${w} = ${area} cm².`,
      topic: 'Area and Perimeter'
    };
  }

  if (topic.toLowerCase().includes('time') || topic.toLowerCase().includes('speed')) {
    const speed = randInt(20, 70);
    const time = randInt(1, 4);
    const dist = speed * time;
    const correctStr = `${dist} km`;
    const distractors = [`${dist + speed} km`, `${dist - speed} km`, `${speed + time} km`];
    return {
      text: `A car travels at ${speed} km/h for ${time} hours. How far does it travel?`,
      options: qt === 'true-false' ? ['True', 'False'] : makeOptions(correctStr, distractors),
      correctAnswer: qt === 'true-false' ? 'False' : correctStr,
      explanation: `Distance = speed × time = ${speed} × ${time} = ${dist} km.`,
      topic: 'Time and Speed'
    };
  }

  // Averages
  const a = randInt(5, 30);
  const b = randInt(5, 30);
  const c = randInt(5, 30);
  const mean = (a + b + c) / 3;
  const correctStr = mean % 1 === 0 ? String(mean) : mean.toFixed(1);
  const distractors = [String((a + b) / 2), String(a + b + c), String(Math.round(mean))];
  return {
    text: `What is the mean (average) of ${a}, ${b} and ${c}?`,
    options: qt === 'true-false' ? ['True', 'False'] : makeOptions(correctStr, distractors),
    correctAnswer: qt === 'true-false' ? 'False' : correctStr,
    explanation: `Add them: ${a}+${b}+${c}=${a+b+c}. Then divide by 3.`,
    topic: 'Averages'
  };
}

function buildEnglishQuestion(quizType: QuizType, topic: string): Omit<Question, 'id'> | null {
  const qt = quizType === 'true-false' ? 'true-false' : 'multiple-choice';

  // Vocabulary: synonym / meaning in context (sentence-based)
  if (topic.toLowerCase().includes('vocab')) {
    const pairs = [
      { word: 'reluctant', correct: 'unwilling', wrong: ['excited', 'confused', 'careless'] },
      { word: 'glimpse', correct: 'quick look', wrong: ['loud noise', 'slow walk', 'strong smell'] },
      { word: 'dwindle', correct: 'decrease', wrong: ['explode', 'decorate', 'listen'] },
      { word: 'cautious', correct: 'careful', wrong: ['angry', 'noisy', 'famous'] },
      { word: 'bewildered', correct: 'confused', wrong: ['proud', 'sleepy', 'hungry'] },
    ];
    const p = pairs[randInt(0, pairs.length - 1)];
    const correctStr = p.correct;
    const distractors = p.wrong;
    return {
      text: `Which option is closest in meaning to “${p.word}”?`,
      options: qt === 'true-false' ? ['True', 'False'] : makeOptions(correctStr, distractors),
      correctAnswer: qt === 'true-false' ? 'False' : correctStr,
      explanation: `“${p.word}” means ${p.correct}.`,
      topic: 'Vocabulary'
    };
  }

  // Punctuation: choose correct sentence
  if (topic.toLowerCase().includes('punct')) {
    const items = [
      {
        stem: 'Choose the sentence with correct punctuation:',
        correct: 'After lunch, we went to the park.',
        wrong: ['After lunch we went, to the park.', 'After lunch we went to, the park.', 'After lunch we went to the park,']
      },
      {
        stem: 'Choose the sentence with correct punctuation:',
        correct: '“Stop!” shouted Mum.',
        wrong: ['“Stop”! shouted Mum.', '“Stop,” shouted Mum!', 'Stop! shouted Mum.']
      },
      {
        stem: 'Choose the sentence with correct punctuation:',
        correct: 'It was cold; however, we carried on.',
        wrong: ['It was cold, however; we carried on.', 'It was cold however, we carried on.', 'It was cold: however we carried on.']
      },
    ];
    const it = items[randInt(0, items.length - 1)];
    return {
      text: it.stem,
      options: qt === 'true-false' ? ['True', 'False'] : makeOptions(it.correct, it.wrong),
      correctAnswer: qt === 'true-false' ? 'False' : it.correct,
      explanation: 'The correct option uses punctuation in the right place.',
      topic: 'Punctuation'
    };
  }

  // Grammar: verb agreement / tense
  if (topic.toLowerCase().includes('grammar')) {
    const items = [
      { text: 'Which sentence is grammatically correct?', correct: 'The group of boys is ready.', wrong: ['The group of boys are ready.', 'The group of boys be ready.', 'The group of boys were ready is.'] },
      { text: 'Which sentence is grammatically correct?', correct: 'Neither of the answers is correct.', wrong: ['Neither of the answers are correct.', 'Neither of the answers were correct is.', 'Neither of the answers correct.'] },
      { text: 'Choose the correct verb form:', correct: 'She has eaten her lunch.', wrong: ['She have eaten her lunch.', 'She eaten has her lunch.', 'She has ate her lunch.'] },
    ];
    const it = items[randInt(0, items.length - 1)];
    return {
      text: it.text,
      options: qt === 'true-false' ? ['True', 'False'] : makeOptions(it.correct, it.wrong),
      correctAnswer: qt === 'true-false' ? 'False' : it.correct,
      explanation: 'Check subject–verb agreement and tense.',
      topic: 'Grammar'
    };
  }

  // Writer's methods: metaphor/personification
  if (topic.toLowerCase().includes('writer')) {
    const items = [
      { text: 'Which phrase is an example of personification?', correct: 'The wind whispered through the trees.', wrong: ['The wind was strong today.', 'The trees were tall and green.', 'The air felt cold on my face.'] },
      { text: 'Which phrase is a metaphor?', correct: 'Time is a thief.', wrong: ['Time passed quickly.', 'Time is important.', 'Time can be measured.'] },
      { text: 'Which phrase uses a simile?', correct: 'Her smile was like sunshine.', wrong: ['Her smile was bright.', 'Her smile warmed the room.', 'Her smile appeared suddenly.'] },
    ];
    const it = items[randInt(0, items.length - 1)];
    return {
      text: it.text,
      options: qt === 'true-false' ? ['True', 'False'] : makeOptions(it.correct, it.wrong),
      correctAnswer: qt === 'true-false' ? 'False' : it.correct,
      explanation: 'Look for comparisons (simile/metaphor) or human actions given to non-human things (personification).',
      topic: "Writer's Methods"
    };
  }

  // Comprehension-style (mini excerpt)
  const excerpts = [
    {
      excerpt: 'The corridor was silent, except for the steady drip of water somewhere in the dark.',
      q: 'What atmosphere does the sentence create?',
      correct: 'A tense and mysterious mood',
      wrong: ['A cheerful and playful mood', 'A relaxed and sunny mood', 'A busy and noisy mood']
    },
    {
      excerpt: 'He tightened his grip on the handle and took one careful step forward.',
      q: 'What does “careful” suggest about him?',
      correct: 'He is cautious or nervous',
      wrong: ['He is bored', 'He is angry', 'He is laughing']
    },
  ];
  const ex = excerpts[randInt(0, excerpts.length - 1)];
  const correctStr = ex.correct;
  const distractors = ex.wrong;
  return {
    text: `${ex.excerpt}\n\n${ex.q}`,
    options: qt === 'true-false' ? ['True', 'False'] : makeOptions(correctStr, distractors),
    correctAnswer: qt === 'true-false' ? 'False' : correctStr,
    explanation: 'Choose the option best supported by the wording in the excerpt.',
    topic: 'Comprehension'
  };
}

// Get all available topics for a subject
export function getTopicsForSubject(subject: Subject): string[] {
  const allQuestions = Object.values(questionBank[subject]).flat();
  const topics = new Set(allQuestions.map(q => q.topic));
  return Array.from(topics).sort();
}
