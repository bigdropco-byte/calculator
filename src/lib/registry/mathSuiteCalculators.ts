import { CalculatorDefinition } from '../types';

export const MATH_SUITE_CALCULATORS: CalculatorDefinition[] = [
  // ==========================================
  // 1. EQUATIONS
  // ==========================================
  {
    slug: 'linear-equation-calculator',
    name: 'Linear Equation Calculator',
    shortDescription: 'Solve linear algebraic equations of the form ax + b = c with full step-by-step mathematical deduction and solution classification.',
    category: 'math',
    secondaryCategories: ['education'],
    keywords: ['linear equation calculator', 'solve linear equation', 'ax + b = c', 'first degree equation', 'algebra solver'],
    tags: ['Math', 'Algebra', 'Equations', 'Linear'],
    icon: 'Hash',
    status: 'published',
    featured: true,
    popular: true,
    addedDate: '2025-02-10',
    seo: {
      title: 'Linear Equation Calculator – Solve ax + b = c with Steps',
      metaDescription: 'Free online linear equation calculator. Solve single-variable first-degree algebraic equations ax + b = c with step-by-step deduction.',
      keywords: ['linear equation solver', 'solve ax+b=c', 'linear algebra calculator', 'step by step equation solver'],
    },
    relatedCalculators: ['quadratic-equation-calculator', 'system-of-linear-equations-calculator', 'average-calculator'],
    editorial: {
      whatIs: 'A linear equation in one variable is a first-degree polynomial equation of the canonical form ax + b = c, where a and b are constants and a ≠ 0. It represents a straight line and has exactly one unique real solution.',
      howToUse: [
        'Enter coefficient a, constant b, and the right-hand constant c.',
        'View the exact decimal solution for x.',
        'Follow the step-by-step balance method showing subtraction and division on both sides.',
      ],
      formula: {
        title: 'Linear Equation Isolation Formula',
        expression: 'ax + b = c \\implies ax = c - b \\implies x = \\frac{c - b}{a}',
        explanation: 'Subtract constant b from both sides of the equation, then divide by coefficient a to isolate the variable x.',
      },
      example: {
        scenario: 'Solve 3x + 7 = 22',
        steps: [
          'Given equation: 3x + 7 = 22',
          'Subtract 7 from both sides: 3x = 22 - 7 = 15',
          'Divide both sides by 3: x = 15 / 3 = 5',
        ],
        result: 'x = 5',
      },
      tips: [
        'If a = 0 and b = c, the equation simplifies to 0 = 0, which means there are infinitely many solutions.',
        'If a = 0 and b ≠ c, the equation simplifies to 0 = non-zero, meaning no solution exists.',
        'Always check your solution by substituting the value of x back into the original equation.',
      ],
      faqs: [
        {
          question: 'What constitutes a linear equation?',
          answer: 'A linear equation has an exponent of 1 on all variables. Its graph on a Cartesian coordinate plane is always a straight line.',
        },
        {
          question: 'What happens if coefficient a is 0?',
          answer: 'If a = 0, the variable x vanishes. If the remaining statement is true (e.g. 5 = 5), any real number is a solution; if false (e.g. 5 = 10), no solution exists.',
        },
        {
          question: 'Can this solver handle negative numbers and decimals?',
          answer: 'Yes, coefficients can be positive, negative, integers, or floating-point decimal values.',
        },
        {
          question: 'How do you check if a linear solution is correct?',
          answer: 'Substitute your calculated x value back into the left side: if the computed result equals the right side (c), the solution is verified.',
        },
      ],
    },
  },
  {
    slug: 'quadratic-equation-calculator',
    name: 'Quadratic Equation Calculator',
    shortDescription: 'Solve quadratic equations ax² + bx + c = 0 using the quadratic formula. Computes discriminant Δ, real and complex conjugate roots, vertex, and axis of symmetry.',
    category: 'math',
    secondaryCategories: ['education'],
    keywords: ['quadratic equation calculator', 'quadratic formula', 'discriminant calculator', 'solve ax2+bx+c=0', 'roots of quadratic'],
    tags: ['Math', 'Algebra', 'Quadratic', 'Polynomials'],
    icon: 'Activity',
    status: 'published',
    featured: true,
    popular: true,
    addedDate: '2025-02-10',
    seo: {
      title: 'Quadratic Equation Calculator – Quadratic Formula & Discriminant Steps',
      metaDescription: 'Solve quadratic equations ax² + bx + c = 0 with real and complex roots, discriminant analysis, vertex coordinates, and step-by-step math.',
      keywords: ['quadratic formula calculator', 'solve quadratic equation', 'discriminant solver', 'complex roots calculator'],
    },
    relatedCalculators: ['linear-equation-calculator', 'system-of-linear-equations-calculator', 'square-root-calculator'],
    editorial: {
      whatIs: 'A quadratic equation is a second-order polynomial equation of the standard form ax² + bx + c = 0, where a ≠ 0. The solutions are called roots or zeros, geometrically representing the points where the parabola crosses the x-axis.',
      howToUse: [
        'Enter coefficients a (for x²), b (for x), and constant c.',
        'View the discriminant Δ = b² - 4ac and classification of roots.',
        'Review the real roots or complex conjugate pairs, parabola vertex, and step-by-step algebra.',
      ],
      formula: {
        title: 'Quadratic Formula & Discriminant',
        expression: 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}, \\quad \\Delta = b^2 - 4ac',
        explanation: 'If Δ > 0, there are two distinct real roots. If Δ = 0, there is one repeated real root. If Δ < 0, there are two complex conjugate roots.',
      },
      example: {
        scenario: 'Solve 2x² - 4x - 6 = 0',
        steps: [
          'Identify coefficients: a = 2, b = -4, c = -6',
          'Compute discriminant: Δ = (-4)² - 4(2)(-6) = 16 + 48 = 64',
          'Apply quadratic formula: x = (4 ± √64) / (2 × 2) = (4 ± 8) / 4',
          'x₁ = (4 + 8)/4 = 3, x₂ = (4 - 8)/4 = -1',
        ],
        result: 'x₁ = 3, x₂ = -1',
      },
      tips: [
        'The vertex of the parabola always occurs at x = -b / (2a).',
        'When b = 0, the equation reduces to ax² + c = 0, which can be solved directly by taking square roots: x = ±√(-c/a).',
        'If the discriminant is a perfect square, the quadratic can be factored over rational numbers.',
      ],
      faqs: [
        {
          question: 'What does a negative discriminant mean?',
          answer: 'When Δ < 0, the square root involves a negative number, meaning the parabola does not touch the real x-axis and the roots are complex conjugate numbers (p ± qi).',
        },
        {
          question: 'Why must coefficient a not equal 0?',
          answer: 'If a = 0, the x² term disappears, turning the quadratic equation into a first-degree linear equation (bx + c = 0).',
        },
        {
          question: 'How do you find the vertex of a parabola from coefficients?',
          answer: 'The x-coordinate of the vertex is h = -b / (2a), and the y-coordinate is k = c - b² / (4a).',
        },
        {
          question: 'What is the axis of symmetry?',
          answer: 'The axis of symmetry is the vertical line x = -b / (2a) that divides the parabola into two mirrored halves.',
        },
      ],
    },
  },
  {
    slug: 'system-of-linear-equations-calculator',
    name: 'System of Linear Equations Calculator',
    shortDescription: 'Solve simultaneous 2x2 and 3x3 systems of linear equations using Cramer’s Rule and matrix determinants with step-by-step work.',
    category: 'math',
    secondaryCategories: ['education'],
    keywords: ['system of linear equations calculator', 'simultaneous equations solver', 'cramers rule calculator', '2x2 system solver', '3x3 system solver'],
    tags: ['Math', 'Algebra', 'Linear Algebra', 'Systems'],
    icon: 'Layers',
    status: 'published',
    featured: true,
    popular: true,
    addedDate: '2025-02-10',
    seo: {
      title: 'System of Linear Equations Calculator – 2x2 & 3x3 Solver with Steps',
      metaDescription: 'Solve 2x2 and 3x3 systems of linear equations using Cramer’s Rule and determinants. Detailed step-by-step matrix deduction.',
      keywords: ['system of equations calculator', 'cramers rule solver', 'solve 2x2 system', 'solve 3x3 system', 'simultaneous equations'],
    },
    relatedCalculators: ['linear-equation-calculator', 'quadratic-equation-calculator', 'average-calculator'],
    editorial: {
      whatIs: 'A system of linear equations is a collection of two or more linear equations involving the same set of variables. A solution is an assignment of values to the variables that satisfies all equations simultaneously.',
      howToUse: [
        'Select 2×2 (two variables x and y) or 3×3 (three variables x, y, and z).',
        'Input the numeric coefficients and constants for each equation.',
        'View the exact solution vector along with determinant values and Cramer’s Rule steps.',
      ],
      formula: {
        title: 'Cramer’s Rule Determinant Formula',
        expression: 'x_i = \\frac{\\det(A_i)}{\\det(A)}, \\quad \\text{where } \\det(A) \\neq 0',
        explanation: 'Each variable x_i is calculated as the ratio of the determinant of matrix A with column i replaced by the constants vector, divided by the determinant of the coefficient matrix A.',
      },
      example: {
        scenario: 'Solve: 2x + y = 7 and x + 3y = 11',
        steps: [
          'Coefficient determinant: D = (2)(3) - (1)(1) = 6 - 1 = 5',
          'x-determinant: Dx = (7)(3) - (11)(1) = 21 - 11 = 10',
          'y-determinant: Dy = (2)(11) - (1)(7) = 22 - 7 = 15',
          'Solutions: x = Dx / D = 10 / 5 = 2, y = Dy / D = 15 / 5 = 3',
        ],
        result: 'x = 2, y = 3',
      },
      tips: [
        'If determinant D = 0 and all numerator determinants are 0, the system has infinitely many solutions (dependent system).',
        'If D = 0 but at least one numerator determinant is non-zero, the lines/planes are parallel and no solution exists (inconsistent system).',
        'Check solutions by substituting the values into both original equations.',
      ],
      faqs: [
        {
          question: 'What is Cramer’s Rule?',
          answer: 'Cramer’s Rule is an explicit formula for solving a system of linear equations with as many equations as unknowns, valid whenever the system has a unique solution (D ≠ 0).',
        },
        {
          question: 'What does it mean if determinant D is 0?',
          answer: 'If D = 0, the system does not have a unique solution; it is either inconsistent (no solutions, parallel lines) or dependent (infinitely many solutions, overlapping lines).',
        },
        {
          question: 'Can this solve 3 variables?',
          answer: 'Yes, switch to the 3×3 tab to solve three simultaneous equations with variables x, y, and z.',
        },
        {
          question: 'How do you check simultaneous equation results?',
          answer: 'Substitute the values of x and y into each equation and check if both sides evaluate to identical numbers.',
        },
      ],
    },
  },

  // ==========================================
  // 2. AREA AND PERIMETER (2D GEOMETRY)
  // ==========================================
  {
    slug: 'circle-calculator',
    name: 'Circle Calculator',
    shortDescription: 'Calculate circle area, circumference, diameter, radius, arc length, and sector area with step-by-step geometric derivations.',
    category: 'math',
    secondaryCategories: ['education', 'construction'],
    keywords: ['circle calculator', 'circle area calculator', 'circumference calculator', 'radius to diameter', 'arc length calculator', 'sector area'],
    tags: ['Math', 'Geometry', 'Circle', 'Area'],
    icon: 'Circle',
    status: 'published',
    featured: true,
    popular: true,
    addedDate: '2025-02-10',
    seo: {
      title: 'Circle Calculator – Area, Circumference, Diameter & Sector',
      metaDescription: 'Free circle calculator. Compute area, circumference, radius, diameter, arc length, and sector area with step-by-step formulas.',
      keywords: ['circle area calculator', 'circumference calculator', 'calculate circle', 'circle geometry'],
    },
    relatedCalculators: ['sphere-calculator', 'cylinder-calculator', 'triangle-calculator'],
    editorial: {
      whatIs: 'A circle is the set of all points in a two-dimensional plane that are equidistant from a central point. The distance from the center to any point on the boundary is the radius (r), and the boundary distance is the circumference (C).',
      howToUse: [
        'Enter the circle radius (or adjust central angle for arc/sector calculations).',
        'Instantly view the calculated Area (A), Circumference (C), and Diameter (d).',
        'Review the step-by-step mathematical substitutions using π ≈ 3.14159265.',
      ],
      formula: {
        title: 'Circle Area and Circumference Formulas',
        expression: 'A = \\pi r^2, \\quad C = 2\\pi r = \\pi d, \\quad A_{\\text{sector}} = \\frac{\\theta}{360^\\circ}\\pi r^2',
        explanation: 'Area is calculated by multiplying pi by radius squared. Circumference is 2 times pi times radius. Sector area is the proportion of the central angle theta over 360 degrees.',
      },
      example: {
        scenario: 'Find area and circumference of a circle with radius r = 7 cm',
        steps: [
          'Diameter: d = 2 × 7 = 14 cm',
          'Circumference: C = 2 × π × 7 ≈ 43.9823 cm',
          'Area: A = π × (7)² = 49π ≈ 153.938 cm²',
        ],
        result: 'Area ≈ 153.94 cm², Circumference ≈ 43.98 cm',
      },
      tips: [
        'If you know diameter instead of radius, simply divide diameter by 2.',
        'To find radius from circumference, divide circumference by 2π (approx. 6.28318).',
        'To find radius from area, divide area by π, then take the square root.',
      ],
      faqs: [
        {
          question: 'What is the relationship between diameter and radius?',
          answer: 'The diameter is exactly twice the length of the radius: d = 2r, or r = d / 2.',
        },
        {
          question: 'How do you find the area of a circle sector?',
          answer: 'Multiply the full circle area (πr²) by the fraction of the circle subtended by the central angle: (θ / 360°).',
        },
        {
          question: 'What is arc length?',
          answer: 'Arc length is the curved distance along the circumference corresponding to a central angle: s = (θ / 360°) × 2πr.',
        },
        {
          question: 'Why is pi used in circle calculations?',
          answer: 'Pi (π ≈ 3.14159) represents the universal ratio of any circle’s circumference to its diameter (C / d).',
        },
      ],
    },
  },
  {
    slug: 'triangle-calculator',
    name: 'Triangle Calculator',
    shortDescription: 'Calculate triangle area using Heron’s formula or base and height, perimeter, semi-perimeter, inradius, and classification.',
    category: 'math',
    secondaryCategories: ['education', 'construction'],
    keywords: ['triangle calculator', 'triangle area calculator', 'herons formula calculator', 'perimeter of triangle', 'triangle solver'],
    tags: ['Math', 'Geometry', 'Triangle', 'Area'],
    icon: 'Triangle',
    status: 'published',
    featured: true,
    popular: true,
    addedDate: '2025-02-10',
    seo: {
      title: 'Triangle Calculator – Area, Perimeter, Heron’s Formula & Inradius',
      metaDescription: 'Calculate triangle area, perimeter, inradius, circumradius, and classification using side lengths or base and height with Heron’s formula.',
      keywords: ['triangle calculator', 'herons formula solver', 'triangle area', 'perimeter of triangle'],
    },
    relatedCalculators: ['right-triangle-calculator', 'pythagorean-theorem-calculator', 'rectangle-calculator'],
    editorial: {
      whatIs: 'A triangle is a fundamental three-sided polygon with three vertices and interior angles summing to 180°. Triangles are classified by side lengths (equilateral, isosceles, scalene) or by internal angles (acute, right, obtuse).',
      howToUse: [
        'Enter side lengths a, b, and c.',
        'View the calculated area using Heron’s formula, perimeter, inradius, and circumradius.',
        'Check the geometric classification (equilateral, isosceles, right, or scalene).',
      ],
      formula: {
        title: 'Heron’s Area Formula',
        expression: 's = \\frac{a+b+c}{2}, \\quad A = \\sqrt{s(s-a)(s-b)(s-c)}',
        explanation: 'Heron’s formula calculates the area of any valid triangle using only the lengths of its three sides and the semi-perimeter s.',
      },
      example: {
        scenario: 'Find area of a triangle with sides a = 7, b = 8, c = 9',
        steps: [
          'Perimeter: P = 7 + 8 + 9 = 24',
          'Semi-perimeter: s = 24 / 2 = 12',
          'Heron’s formula: A = √(12 × (12 - 7) × (12 - 8) × (12 - 9))',
          'A = √(12 × 5 × 4 × 3) = √720 ≈ 26.8328',
        ],
        result: 'Area ≈ 26.83, Perimeter = 24',
      },
      tips: [
        'Triangle Inequality: The sum of any two sides must be strictly greater than the third side (a + b > c).',
        'For right-angled triangles, area is simply half the product of the two legs (½ × a × b).',
        'Inradius is the radius of the largest circle that fits completely inside the triangle: r = A / s.',
      ],
      faqs: [
        {
          question: 'What is Heron’s formula?',
          answer: 'Heron’s formula allows you to calculate the area of any triangle when all three side lengths are known, without needing to know any angles or perpendicular heights.',
        },
        {
          question: 'What happens if the triangle inequality is violated?',
          answer: 'If the sum of two sides is less than or equal to the third, the sides cannot connect in 2D space to form a closed triangle.',
        },
        {
          question: 'How do you classify a triangle by sides?',
          answer: 'Equilateral: all 3 sides equal; Isosceles: 2 sides equal; Scalene: all 3 sides distinct.',
        },
        {
          question: 'What is the semi-perimeter?',
          answer: 'The semi-perimeter (s) is half of the total perimeter: s = (a + b + c) / 2.',
        },
      ],
    },
  },
  {
    slug: 'right-triangle-calculator',
    name: 'Right-Angled Triangle Calculator',
    shortDescription: 'Solve right triangles with hypotenuse, legs, area, perimeter, altitude, and acute angles using trigonometry and the Pythagorean theorem.',
    category: 'math',
    secondaryCategories: ['education', 'construction'],
    keywords: ['right triangle calculator', 'right angled triangle', 'hypotenuse calculator', 'pythagorean triangle', 'solve right triangle'],
    tags: ['Math', 'Geometry', 'Right Triangle', 'Trigonometry'],
    icon: 'Compass',
    status: 'published',
    featured: true,
    popular: true,
    addedDate: '2025-02-10',
    seo: {
      title: 'Right-Angled Triangle Calculator – Hypotenuse, Area & Angles',
      metaDescription: 'Solve right-angled triangles online. Compute hypotenuse, legs, area, perimeter, altitude, and acute angles with step-by-step math.',
      keywords: ['right triangle solver', 'hypotenuse calculator', 'right angled triangle area', 'acute angles triangle'],
    },
    relatedCalculators: ['pythagorean-theorem-calculator', 'triangle-calculator', 'sine-calculator'],
    editorial: {
      whatIs: 'A right-angled triangle is a triangle in which one interior angle is exactly 90 degrees (a right angle). The side opposite the right angle is called the hypotenuse, and the other two sides are called legs or catheti.',
      howToUse: [
        'Enter leg a and leg b.',
        'Review the calculated hypotenuse (c), area, perimeter, and altitude.',
        'View the acute angles α and β in degrees.',
      ],
      formula: {
        title: 'Right Triangle Geometric Formulas',
        expression: 'c = \\sqrt{a^2 + b^2}, \\quad A = \\frac{1}{2}ab, \\quad h_c = \\frac{ab}{c}, \\quad \\alpha = \\arctan\\left(\\frac{a}{b}\\right)',
        explanation: 'Hypotenuse c is found using Pythagorean theorem. Area is half base times height. Altitude to hypotenuse is the product of legs divided by hypotenuse.',
      },
      example: {
        scenario: 'Find hypotenuse and area for legs a = 6 and b = 8',
        steps: [
          'Hypotenuse: c = √(6² + 8²) = √(36 + 64) = √100 = 10',
          'Area: A = ½ × 6 × 8 = 24',
          'Perimeter: P = 6 + 8 + 10 = 24',
          'Angle α = arctan(6/8) ≈ 36.87°, Angle β = 90° - 36.87° = 53.13°',
        ],
        result: 'Hypotenuse = 10, Area = 24, Angles: 36.87° and 53.13°',
      },
      tips: [
        'The two non-right angles in a right triangle are always complementary (they sum to 90°).',
        'Common Pythagorean triples include 3-4-5, 5-12-13, 8-15-17, and 7-24-25.',
        'The hypotenuse is always the longest side of any right triangle.',
      ],
      faqs: [
        {
          question: 'What is the hypotenuse?',
          answer: 'The hypotenuse is the side opposite the 90-degree right angle and is always the longest side of a right-angled triangle.',
        },
        {
          question: 'How do you find acute angles in a right triangle?',
          answer: 'Use inverse trigonometric functions: angle α = arctan(opposite / adjacent) or arcsin(opposite / hypotenuse).',
        },
        {
          question: 'What is the altitude to the hypotenuse?',
          answer: 'It is the perpendicular distance from the 90° vertex to the hypotenuse: h = (a × b) / c.',
        },
        {
          question: 'What are special right triangles?',
          answer: 'Special right triangles include 45°-45°-90° (isosceles right triangle, ratio 1:1:√2) and 30°-60°-90° (ratio 1:√3:2).',
        },
      ],
    },
  },
  {
    slug: 'square-calculator',
    name: 'Square Calculator',
    shortDescription: 'Calculate square area, perimeter, diagonal, inradius, and circumradius from side length with step-by-step formulas.',
    category: 'math',
    secondaryCategories: ['education', 'construction'],
    keywords: ['square calculator', 'square area calculator', 'square perimeter', 'diagonal of square', 'square geometry'],
    tags: ['Math', 'Geometry', 'Square', 'Area'],
    icon: 'Square',
    status: 'published',
    featured: true,
    popular: true,
    addedDate: '2025-02-10',
    seo: {
      title: 'Square Calculator – Area, Perimeter, Diagonal & Inradius',
      metaDescription: 'Calculate square area, perimeter, diagonal length, and inscribed/circumscribed circle radii from side length.',
      keywords: ['square area calculator', 'diagonal of a square', 'perimeter of square', 'square formulas'],
    },
    relatedCalculators: ['rectangle-calculator', 'cube-calculator', 'rhombus-calculator'],
    editorial: {
      whatIs: 'A square is a regular quadrilateral with four equal sides and four right angles (90°). It is a special case of a rectangle, rhombus, and parallelogram.',
      howToUse: [
        'Enter the side length (a) of the square.',
        'View the calculated area, perimeter, diagonal, inradius, and circumradius.',
        'Follow the exact mathematical steps.',
      ],
      formula: {
        title: 'Square Geometry Formulas',
        expression: 'A = a^2, \\quad P = 4a, \\quad d = a\\sqrt{2}, \\quad r = \\frac{a}{2}, \\quad R = \\frac{a}{\\sqrt{2}}',
        explanation: 'Area is side squared, perimeter is 4 times side, and the diagonal is side times square root of 2.',
      },
      example: {
        scenario: 'Calculate properties of a square with side a = 8 cm',
        steps: [
          'Area: A = 8² = 64 cm²',
          'Perimeter: P = 4 × 8 = 32 cm',
          'Diagonal: d = 8√2 ≈ 11.3137 cm',
          'Inradius: r = 8 / 2 = 4 cm',
        ],
        result: 'Area = 64 cm², Perimeter = 32 cm, Diagonal ≈ 11.31 cm',
      },
      tips: [
        'To find side from area, take the square root of the area: a = √A.',
        'To find side from perimeter, divide perimeter by 4: a = P / 4.',
        'To find side from diagonal, divide diagonal by √2: a = d / √2.',
      ],
      faqs: [
        {
          question: 'What is the difference between a square and a rhombus?',
          answer: 'All squares are rhombuses (four equal sides), but a square also requires four 90-degree right angles.',
        },
        {
          question: 'How do you find the diagonal of a square?',
          answer: 'By the Pythagorean theorem, d = √(a² + a²) = √(2a²) = a√2 ≈ 1.4142 × a.',
        },
        {
          question: 'What is the inradius of a square?',
          answer: 'The inradius is the radius of the circle inscribed inside the square, which equals half the side length: r = a / 2.',
        },
        {
          question: 'What is the circumradius of a square?',
          answer: 'The circumradius is the radius of the circumscribed circle touching all four vertices, which equals half the diagonal: R = d / 2 = a / √2.',
        },
      ],
    },
  },
  {
    slug: 'rectangle-calculator',
    name: 'Rectangle Calculator',
    shortDescription: 'Calculate rectangle area, perimeter, diagonal, and aspect ratio from length and width with complete mathematical steps.',
    category: 'math',
    secondaryCategories: ['education', 'construction'],
    keywords: ['rectangle calculator', 'rectangle area calculator', 'rectangle perimeter', 'diagonal of rectangle', 'aspect ratio calculator'],
    tags: ['Math', 'Geometry', 'Rectangle', 'Area'],
    icon: 'Maximize2',
    status: 'published',
    featured: true,
    popular: true,
    addedDate: '2025-02-10',
    seo: {
      title: 'Rectangle Calculator – Area, Perimeter, Diagonal & Aspect Ratio',
      metaDescription: 'Free online rectangle calculator. Calculate area, perimeter, diagonal length, and aspect ratio from length and width.',
      keywords: ['rectangle area calculator', 'perimeter of rectangle', 'diagonal of rectangle', 'rectangle dimensions'],
    },
    relatedCalculators: ['square-calculator', 'cuboid-calculator', 'parallelogram-calculator'],
    editorial: {
      whatIs: 'A rectangle is a four-sided quadrilateral with four right angles (90°). Opposite sides are parallel and equal in length, and both diagonals are equal in length and bisect each other.',
      howToUse: [
        'Enter the length (l) and width (w) of the rectangle.',
        'View the calculated Area, Perimeter, Diagonal, and simplified Aspect Ratio.',
        'Review the step-by-step mathematical calculations.',
      ],
      formula: {
        title: 'Rectangle Dimensions Formulas',
        expression: 'A = l \\times w, \\quad P = 2(l + w), \\quad d = \\sqrt{l^2 + w^2}',
        explanation: 'Area is the product of length and width. Perimeter is twice the sum of length and width. Diagonal is found via the Pythagorean theorem.',
      },
      example: {
        scenario: 'Calculate a rectangle with length l = 10 m and width w = 6 m',
        steps: [
          'Area: A = 10 × 6 = 60 m²',
          'Perimeter: P = 2 × (10 + 6) = 2 × 16 = 32 m',
          'Diagonal: d = √(10² + 6²) = √(100 + 36) = √136 ≈ 11.6619 m',
          'Aspect Ratio: 10:6 reduces to 5:3',
        ],
        result: 'Area = 60 m², Perimeter = 32 m, Diagonal ≈ 11.66 m, Ratio = 5:3',
      },
      tips: [
        'If length equals width, the rectangle is a square.',
        'The diagonal splits the rectangle into two congruent right-angled triangles.',
        'To find length given area and width, divide area by width: l = A / w.',
      ],
      faqs: [
        {
          question: 'How do you calculate the diagonal of a rectangle?',
          answer: 'Apply the Pythagorean theorem: d = √(length² + width²).',
        },
        {
          question: 'Is a square considered a rectangle?',
          answer: 'Yes, a square is an equiangular quadrilateral with four 90° angles, making it a special equilateral rectangle.',
        },
        {
          question: 'What is aspect ratio?',
          answer: 'Aspect ratio is the proportional relationship between width and height, expressed as two integers separated by a colon (e.g. 16:9, 4:3).',
        },
        {
          question: 'How do you find the perimeter of a rectangle?',
          answer: 'Add length and width together, then multiply by 2: P = 2(l + w).',
        },
      ],
    },
  },
  {
    slug: 'rhombus-calculator',
    name: 'Rhombus Calculator',
    shortDescription: 'Calculate rhombus area, perimeter, side length, diagonals, altitude, and inradius with step-by-step geometric solutions.',
    category: 'math',
    secondaryCategories: ['education'],
    keywords: ['rhombus calculator', 'rhombus area calculator', 'rhombus diagonals', 'perimeter of rhombus', 'rhombus side'],
    tags: ['Math', 'Geometry', 'Rhombus', 'Area'],
    icon: 'Diamond',
    status: 'published',
    featured: false,
    popular: true,
    addedDate: '2025-02-10',
    seo: {
      title: 'Rhombus Calculator – Area, Diagonals, Perimeter & Side Length',
      metaDescription: 'Calculate rhombus area from diagonals or side and height, perimeter, side length, and inradius with step-by-step geometric math.',
      keywords: ['rhombus area calculator', 'rhombus diagonals', 'perimeter of rhombus', 'rhombus geometry'],
    },
    relatedCalculators: ['parallelogram-calculator', 'square-calculator', 'trapezium-calculator'],
    editorial: {
      whatIs: 'A rhombus is a quadrilateral whose four sides all have equal length. Opposite sides are parallel, and diagonals intersect perpendicularly (at 90°) while bisecting each other.',
      howToUse: [
        'Enter diagonal 1 (d₁) and diagonal 2 (d₂).',
        'View the calculated Area, Perimeter, Side Length, Height, and Inradius.',
        'Follow the step-by-step geometric deductions.',
      ],
      formula: {
        title: 'Rhombus Diagonals & Area Formulas',
        expression: 'A = \\frac{1}{2}d_1 d_2, \\quad s = \\sqrt{\\left(\\frac{d_1}{2}\\right)^2 + \\left(\\frac{d_2}{2}\\right)^2}, \\quad P = 4s',
        explanation: 'Area is half the product of the two perpendicular diagonals. Side length is found via right triangles formed by the intersecting semi-diagonals.',
      },
      example: {
        scenario: 'Find area and perimeter for diagonals d₁ = 12 and d₂ = 16',
        steps: [
          'Area: A = ½ × 12 × 16 = 96',
          'Semi-diagonals: 12/2 = 6, 16/2 = 8',
          'Side length: s = √(6² + 8²) = √(36 + 64) = √100 = 10',
          'Perimeter: P = 4 × 10 = 40',
        ],
        result: 'Area = 96, Side = 10, Perimeter = 40',
      },
      tips: [
        'The diagonals of a rhombus always meet at right angles (90°).',
        'If the angles of a rhombus are all 90°, it is a square.',
        'Area can also be calculated as base times height: A = s × h.',
      ],
      faqs: [
        {
          question: 'Why does area equal half the product of diagonals?',
          answer: 'The diagonals divide the rhombus into four congruent right triangles. Summing their areas yields ½ × d₁ × d₂.',
        },
        {
          question: 'Are opposite angles equal in a rhombus?',
          answer: 'Yes, opposite angles of a rhombus are equal, and adjacent angles are supplementary (they sum to 180°).',
        },
        {
          question: 'Can you calculate rhombus area with side and angle?',
          answer: 'Yes, Area = s² × sin(θ), where θ is any interior angle.',
        },
        {
          question: 'What is the inradius of a rhombus?',
          answer: 'The inradius is r = (d₁ × d₂) / (4s) = h / 2, representing the radius of the inscribed circle.',
        },
      ],
    },
  },
  {
    slug: 'parallelogram-calculator',
    name: 'Parallelogram Calculator',
    shortDescription: 'Calculate parallelogram area, perimeter, base, height, and side lengths with step-by-step geometric formulas.',
    category: 'math',
    secondaryCategories: ['education', 'construction'],
    keywords: ['parallelogram calculator', 'parallelogram area calculator', 'perimeter of parallelogram', 'parallelogram geometry'],
    tags: ['Math', 'Geometry', 'Parallelogram', 'Area'],
    icon: 'Box',
    status: 'published',
    featured: false,
    popular: true,
    addedDate: '2025-02-10',
    seo: {
      title: 'Parallelogram Calculator – Area, Perimeter, Base & Height',
      metaDescription: 'Free parallelogram calculator. Calculate area, perimeter, base, height, and slant side with step-by-step geometric solutions.',
      keywords: ['parallelogram area calculator', 'perimeter of parallelogram', 'parallelogram solver', 'calculate parallelogram'],
    },
    relatedCalculators: ['rhombus-calculator', 'rectangle-calculator', 'trapezium-calculator'],
    editorial: {
      whatIs: 'A parallelogram is a quadrilateral with opposite sides parallel and equal in length. Opposite interior angles are equal, and consecutive angles are supplementary (sum to 180°).',
      howToUse: [
        'Enter the base (b), height (h), and slant side (a).',
        'View the calculated Area and Perimeter.',
        'Follow the step-by-step calculations.',
      ],
      formula: {
        title: 'Parallelogram Area and Perimeter Formulas',
        expression: 'A = b \\times h, \\quad P = 2(a + b)',
        explanation: 'Area is the product of the base and perpendicular height. Perimeter is twice the sum of adjacent sides a and b.',
      },
      example: {
        scenario: 'Find area and perimeter for base b = 15 cm, height h = 8 cm, side a = 10 cm',
        steps: [
          'Area: A = b × h = 15 × 8 = 120 cm²',
          'Perimeter: P = 2 × (10 + 15) = 2 × 25 = 50 cm',
        ],
        result: 'Area = 120 cm², Perimeter = 50 cm',
      },
      tips: [
        'Height must be measured perpendicular to the base, not along the slanted side.',
        'If the interior angles are 90°, the parallelogram is a rectangle.',
        'Diagonals of a parallelogram bisect each other.',
      ],
      faqs: [
        {
          question: 'What is the difference between slant side and height?',
          answer: 'The slant side is the actual edge of the shape, while height is the perpendicular (shortest) distance between parallel sides.',
        },
        {
          question: 'Can you calculate area from sides and angle?',
          answer: 'Yes, Area = a × b × sin(θ), where θ is the angle between sides a and b.',
        },
        {
          question: 'Do diagonals bisect each other in a parallelogram?',
          answer: 'Yes, the two diagonals cross at their exact midpoints, though they are not generally equal in length.',
        },
        {
          question: 'What shapes are parallelograms?',
          answer: 'Squares, rectangles, and rhombuses are all special types of parallelograms.',
        },
      ],
    },
  },
  {
    slug: 'trapezium-calculator',
    name: 'Trapezium Calculator',
    shortDescription: 'Calculate trapezium (trapezoid) area, perimeter, mid-segment (median), bases, and height with step-by-step mathematical steps.',
    category: 'math',
    secondaryCategories: ['education', 'construction'],
    keywords: ['trapezium calculator', 'trapezoid calculator', 'trapezoid area calculator', 'perimeter of trapezium', 'mid-segment of trapezoid'],
    tags: ['Math', 'Geometry', 'Trapezium', 'Area'],
    icon: 'Shield',
    status: 'published',
    featured: false,
    popular: true,
    addedDate: '2025-02-10',
    seo: {
      title: 'Trapezium Calculator – Area, Perimeter, Bases & Mid-Segment',
      metaDescription: 'Calculate trapezium (trapezoid) area, perimeter, mid-segment, and heights with step-by-step geometric deduction.',
      keywords: ['trapezium area calculator', 'trapezoid calculator', 'perimeter of trapezoid', 'midsegment calculator'],
    },
    relatedCalculators: ['parallelogram-calculator', 'triangle-calculator', 'rectangle-calculator'],
    editorial: {
      whatIs: 'A trapezium (known as a trapezoid in American English) is a four-sided convex quadrilateral with at least one pair of parallel sides, called the bases (a and b). The non-parallel sides are called legs.',
      howToUse: [
        'Enter parallel bases a and b, and the perpendicular height h.',
        'View the calculated Area, Mid-Segment (median), and estimated Perimeter.',
        'Review the step-by-step mathematical solution.',
      ],
      formula: {
        title: 'Trapezium Area & Mid-Segment Formulas',
        expression: 'A = \\frac{a + b}{2} \\times h = m \\times h, \\quad m = \\frac{a + b}{2}',
        explanation: 'Area is the average of the two parallel bases multiplied by the perpendicular height. The average of bases is also the mid-segment m.',
      },
      example: {
        scenario: 'Calculate area of a trapezium with bases a = 12 cm, b = 8 cm, height h = 6 cm',
        steps: [
          'Mid-segment: m = (12 + 8) / 2 = 20 / 2 = 10 cm',
          'Area: A = m × h = 10 × 6 = 60 cm²',
        ],
        result: 'Area = 60 cm², Mid-segment = 10 cm',
      },
      tips: [
        'Height must be measured perpendicular to the parallel bases.',
        'An isosceles trapezium has non-parallel legs of equal length and symmetric base angles.',
        'The mid-segment is parallel to both bases and its length is their arithmetic mean.',
      ],
      faqs: [
        {
          question: 'What is the difference between a trapezium and a trapezoid?',
          answer: 'In British English, a trapezium has one pair of parallel sides. In American English, the exact same shape is called a trapezoid.',
        },
        {
          question: 'What is the mid-segment of a trapezium?',
          answer: 'The mid-segment (or median) connects the midpoints of the two non-parallel legs. Its length is m = (a + b) / 2.',
        },
        {
          question: 'How do you find perimeter of a trapezium?',
          answer: 'Perimeter is the sum of all four outer boundaries: P = a + b + c + d, where c and d are the legs.',
        },
        {
          question: 'What is a right trapezium?',
          answer: 'A right trapezium has two adjacent right angles (one leg is perpendicular to both parallel bases).',
        },
      ],
    },
  },
  {
    slug: 'pentagon-calculator',
    name: 'Pentagon Calculator',
    shortDescription: 'Calculate regular pentagon area, perimeter, apothem, diagonals, and interior angles from side length with step-by-step math.',
    category: 'math',
    secondaryCategories: ['education'],
    keywords: ['pentagon calculator', 'regular pentagon area', 'perimeter of pentagon', 'pentagon apothem', 'pentagon diagonal'],
    tags: ['Math', 'Geometry', 'Pentagon', 'Polygons'],
    icon: 'Pentagon',
    status: 'published',
    featured: false,
    popular: true,
    addedDate: '2025-02-10',
    seo: {
      title: 'Pentagon Calculator – Regular Pentagon Area, Perimeter & Apothem',
      metaDescription: 'Calculate regular pentagon area, perimeter, apothem, and interior angles from side length with step-by-step geometric deduction.',
      keywords: ['pentagon calculator', 'regular pentagon area', 'perimeter of pentagon', 'pentagon apothem'],
    },
    relatedCalculators: ['hexagon-calculator', 'polygon-calculator', 'circle-calculator'],
    editorial: {
      whatIs: 'A regular pentagon is a five-sided polygon with all sides equal in length and all interior angles equal to 108°. It exhibits five lines of reflective symmetry and rotational symmetry of order 5.',
      howToUse: [
        'Enter the side length (s) of the regular pentagon.',
        'View the Area, Perimeter, Apothem, and Interior Angles.',
        'Follow the step-by-step geometric derivations.',
      ],
      formula: {
        title: 'Regular Pentagon Area & Apothem Formulas',
        expression: 'A = \\frac{1}{4}\\sqrt{5(5 + 2\\sqrt{5})} s^2 \\approx 1.72048 s^2, \\quad a = \\frac{s}{2\\tan(36^\\circ)}',
        explanation: 'Area relates to side length squared using exact radical geometry involving the golden ratio (φ). Apothem is the inradius.',
      },
      example: {
        scenario: 'Find area and perimeter of a regular pentagon with side s = 6 cm',
        steps: [
          'Perimeter: P = 5 × 6 = 30 cm',
          'Apothem: a = 6 / (2 × tan(36°)) ≈ 4.1291 cm',
          'Area: A = ½ × P × a = 0.5 × 30 × 4.1291 ≈ 61.9372 cm²',
        ],
        result: 'Area ≈ 61.94 cm², Perimeter = 30 cm, Apothem ≈ 4.13 cm',
      },
      tips: [
        'The interior angle of every regular pentagon is exactly 108°, and exterior angle is 72°.',
        'The ratio of a pentagon’s diagonal to its side equals the golden ratio: d / s = (1 + √5)/2 ≈ 1.618034.',
        'The sum of all interior angles of a pentagon is (5 - 2) × 180° = 540°.',
      ],
      faqs: [
        {
          question: 'What is the apothem of a pentagon?',
          answer: 'The apothem is the perpendicular distance from the center of the pentagon to the midpoint of any side.',
        },
        {
          question: 'What is the sum of interior angles in a pentagon?',
          answer: 'The sum is always (5 - 2) × 180° = 540°. In a regular pentagon, each of the 5 angles is 540° / 5 = 108°.',
        },
        {
          question: 'How is the golden ratio related to a pentagon?',
          answer: 'The diagonal of a regular pentagon divided by its side length equals the golden ratio φ = (1 + √5)/2 ≈ 1.618.',
        },
        {
          question: 'How do you calculate pentagon area using apothem?',
          answer: 'Area = ½ × Perimeter × Apothem = ½ × 5s × a.',
        },
      ],
    },
  },
  {
    slug: 'hexagon-calculator',
    name: 'Hexagon Calculator',
    shortDescription: 'Calculate regular hexagon area, perimeter, apothem, long diagonal, short diagonal, and circumradius with step-by-step steps.',
    category: 'math',
    secondaryCategories: ['education', 'construction'],
    keywords: ['hexagon calculator', 'regular hexagon area', 'perimeter of hexagon', 'hexagon apothem', 'hexagon diagonals'],
    tags: ['Math', 'Geometry', 'Hexagon', 'Polygons'],
    icon: 'Hexagon',
    status: 'published',
    featured: false,
    popular: true,
    addedDate: '2025-02-10',
    seo: {
      title: 'Hexagon Calculator – Regular Hexagon Area, Perimeter & Diagonals',
      metaDescription: 'Calculate regular hexagon area, perimeter, apothem, long diagonal (2s), and short diagonal (s√3) from side length.',
      keywords: ['hexagon area calculator', 'regular hexagon calculator', 'perimeter of hexagon', 'hexagon diagonals'],
    },
    relatedCalculators: ['pentagon-calculator', 'polygon-calculator', 'circle-calculator'],
    editorial: {
      whatIs: 'A regular hexagon is a six-sided polygon with six equal sides and six equal interior angles of 120°. It is composed of six congruent equilateral triangles meeting at the center.',
      howToUse: [
        'Enter the side length (s) of the regular hexagon.',
        'View the calculated Area, Perimeter, Long Diagonal, Short Diagonal, and Apothem.',
        'Review the step-by-step geometric derivations.',
      ],
      formula: {
        title: 'Regular Hexagon Geometric Formulas',
        expression: 'A = \\frac{3\\sqrt{3}}{2}s^2 \\approx 2.59808s^2, \\quad P = 6s, \\quad d_{\\text{long}} = 2s, \\quad d_{\\text{short}} = s\\sqrt{3}',
        explanation: 'Because a regular hexagon consists of 6 equilateral triangles of area (√3/4)s², total area is 6 × (√3/4)s² = (3√3/2)s².',
      },
      example: {
        scenario: 'Find area and diagonals for a regular hexagon with side s = 8 cm',
        steps: [
          'Perimeter: P = 6 × 8 = 48 cm',
          'Area: A = (3√3 / 2) × 8² = (3√3 / 2) × 64 = 96√3 ≈ 166.2769 cm²',
          'Long diagonal: d_long = 2 × 8 = 16 cm',
          'Short diagonal: d_short = 8√3 ≈ 13.8564 cm',
        ],
        result: 'Area ≈ 166.28 cm², Perimeter = 48 cm, Diagonals: 16 cm & 13.86 cm',
      },
      tips: [
        'The circumradius (radius of circle passing through vertices) equals the side length: R = s.',
        'The apothem (inradius) is (s√3) / 2 ≈ 0.866025 × s.',
        'Hexagons tessellate perfectly without gaps, which is why honeybees build hexagonal honeycombs.',
      ],
      faqs: [
        {
          question: 'Why do regular hexagons tile the plane?',
          answer: 'Each interior angle is 120°. Three hexagons meet at a vertex: 120° × 3 = 360°, leaving no gaps and no overlap.',
        },
        {
          question: 'What is the long diagonal vs short diagonal?',
          answer: 'The long diagonal connects opposite vertices through the center (d = 2s). The short diagonal connects vertices separated by one corner (d = s√3).',
        },
        {
          question: 'What is the sum of interior angles in a hexagon?',
          answer: 'The sum is (6 - 2) × 180° = 720°. Divided by 6, each angle is 120°.',
        },
        {
          question: 'How do you find the area from the perimeter?',
          answer: 'First divide perimeter by 6 to find side s, then apply A = (3√3/2)s².',
        },
      ],
    },
  },
  {
    slug: 'polygon-calculator',
    name: 'Regular Polygon Calculator',
    shortDescription: 'Calculate regular n-sided polygon area, perimeter, apothem, circumradius, interior angles, and exterior angles with step-by-step steps.',
    category: 'math',
    secondaryCategories: ['education'],
    keywords: ['polygon calculator', 'regular polygon area', 'n-sided polygon calculator', 'interior angle polygon', 'apothem calculator'],
    tags: ['Math', 'Geometry', 'Polygons', 'Angles'],
    icon: 'Maximize',
    status: 'published',
    featured: false,
    popular: true,
    addedDate: '2025-02-10',
    seo: {
      title: 'Regular Polygon Calculator – Area, Perimeter, Apothem & Angles',
      metaDescription: 'Calculate regular n-sided polygon area, perimeter, apothem, circumradius, and interior/exterior angles from number of sides and side length.',
      keywords: ['regular polygon calculator', 'polygon area formula', 'apothem of polygon', 'interior angles polygon'],
    },
    relatedCalculators: ['pentagon-calculator', 'hexagon-calculator', 'circle-calculator'],
    editorial: {
      whatIs: 'A regular polygon is an n-sided polygon that is both equiangular (all angles are equal) and equilateral (all sides have equal length). As the number of sides approaches infinity, the regular polygon approaches a circle.',
      howToUse: [
        'Enter the number of sides (n ≥ 3) and side length (s).',
        'View the calculated Area, Perimeter, Apothem, Circumradius, and Angles.',
        'Review the generalized trigonometric formulas.',
      ],
      formula: {
        title: 'Regular n-gon Geometric Formulas',
        expression: 'A = \\frac{n s^2}{4\\tan\\left(\\frac{\\pi}{n}\\right)}, \\quad a = \\frac{s}{2\\tan\\left(\\frac{\\pi}{n}\\right)}, \\quad \\theta_{\\text{int}} = \\frac{(n-2)\\times 180^\\circ}{n}',
        explanation: 'Area is calculated using trigonometry by dividing the n-gon into n isosceles triangles. Interior angle uses the polygon angle sum theorem.',
      },
      example: {
        scenario: 'Calculate regular octagon (n = 8) with side length s = 5 cm',
        steps: [
          'Perimeter: P = 8 × 5 = 40 cm',
          'Interior angle: (8 - 2) × 180° / 8 = 1080° / 8 = 135°',
          'Apothem: a = 5 / (2 × tan(180° / 8)) = 5 / (2 × tan(22.5°)) ≈ 6.0355 cm',
          'Area: A = ½ × 40 × 6.0355 ≈ 120.7107 cm²',
        ],
        result: 'Area ≈ 120.71 cm², Perimeter = 40 cm, Interior Angle = 135°',
      },
      tips: [
        'Exterior angles of any convex polygon always sum to 360°; for an n-gon, each exterior angle is 360° / n.',
        'The interior and exterior angles at any vertex are supplementary: θ_int + θ_ext = 180°.',
        'The circumradius is R = s / (2 × sin(π/n)).',
      ],
      faqs: [
        {
          question: 'What is the smallest number of sides a polygon can have?',
          answer: 'A polygon must have at least 3 sides (a triangle).',
        },
        {
          question: 'What is the difference between inradius and circumradius of a polygon?',
          answer: 'The inradius (apothem) is the radius of the inscribed circle touching the sides; the circumradius is the radius of the circle passing through the vertices.',
        },
        {
          question: 'What is an apothem?',
          answer: 'The apothem is a line segment from the center of a regular polygon perpendicular to one of its sides.',
        },
        {
          question: 'How do you find the total sum of angles in an n-gon?',
          answer: 'The sum of interior angles is always (n - 2) × 180 degrees.',
        },
      ],
    },
  },
  {
    slug: 'pythagorean-theorem-calculator',
    name: 'Pythagorean Theorem Calculator',
    shortDescription: 'Solve a² + b² = c² for missing hypotenuse or leg with step-by-step radical simplification and exact decimal solutions.',
    category: 'math',
    secondaryCategories: ['education', 'construction'],
    keywords: ['pythagorean theorem calculator', 'a2+b2=c2', 'hypotenuse solver', 'pythagoras calculator', 'find missing side of right triangle'],
    tags: ['Math', 'Geometry', 'Pythagoras', 'Triangles'],
    icon: 'Triangle',
    status: 'published',
    featured: true,
    popular: true,
    addedDate: '2025-02-10',
    seo: {
      title: 'Pythagorean Theorem Calculator – Solve a² + b² = c² with Steps',
      metaDescription: 'Free Pythagorean theorem calculator. Solve for hypotenuse c or leg a/b with step-by-step radical simplification and exact decimal results.',
      keywords: ['pythagorean theorem calculator', 'solve a2+b2=c2', 'hypotenuse calculator', 'find side of right triangle'],
    },
    relatedCalculators: ['right-triangle-calculator', 'triangle-calculator', 'square-root-calculator'],
    editorial: {
      whatIs: 'The Pythagorean theorem states that in any right-angled triangle, the area of the square whose side is the hypotenuse (c) is equal to the sum of the areas of the squares on the other two sides (legs a and b): a² + b² = c².',
      howToUse: [
        'Choose whether to solve for Hypotenuse (c) or Leg (b).',
        'Enter the known positive side lengths.',
        'View the exact simplified radical form (e.g. 5√2) and decimal approximation with full step-by-step substitution.',
      ],
      formula: {
        title: 'Pythagorean Equation',
        expression: 'c = \\sqrt{a^2 + b^2}, \\quad a = \\sqrt{c^2 - b^2}, \\quad b = \\sqrt{c^2 - a^2}',
        explanation: 'To find hypotenuse c, sum the squares of the legs and take the square root. To find a leg, subtract the known leg squared from hypotenuse squared and take the root.',
      },
      example: {
        scenario: 'Find hypotenuse c for legs a = 9 and b = 12',
        steps: [
          'Apply theorem: c² = a² + b²',
          'Substitute values: c² = 9² + 12² = 81 + 144 = 225',
          'Solve for c: c = √225 = 15',
        ],
        result: 'c = 15',
      },
      tips: [
        'Hypotenuse c must always be strictly greater than either leg a or b.',
        'If a² + b² = c², the triangle is right-angled. If a² + b² > c², it is acute. If a² + b² < c², it is obtuse.',
        'Pythagorean triples (like 3-4-5 and 5-12-13) are sets of three positive integers that satisfy a² + b² = c².',
      ],
      faqs: [
        {
          question: 'Can the Pythagorean theorem be used on non-right triangles?',
          answer: 'No. The Pythagorean theorem only applies to right triangles (90° angle). For general triangles, use the Law of Cosines (c² = a² + b² - 2ab cos C).',
        },
        {
          question: 'Who proved the Pythagorean theorem?',
          answer: 'Attributed to ancient Greek mathematician Pythagoras of Samos (c. 570–495 BC), though Babylonian and Indian mathematicians knew the relationship centuries earlier.',
        },
        {
          question: 'What is a Pythagorean triple?',
          answer: 'A Pythagorean triple consists of three positive integers (a, b, c) such that a² + b² = c², such as (3, 4, 5) and (5, 12, 13).',
        },
        {
          question: 'How do you simplify radicals in the Pythagorean theorem?',
          answer: 'Factor out perfect squares from under the square root. For example, √72 = √(36 × 2) = 6√2.',
        },
      ],
    },
  },

  // ==========================================
  // 3. VOLUME AND SURFACE AREA (3D GEOMETRY)
  // ==========================================
  {
    slug: 'cube-calculator',
    name: 'Cube Calculator',
    shortDescription: 'Calculate cube volume, total surface area, lateral surface area, space diagonal, and inradius from side length with step-by-step steps.',
    category: 'math',
    secondaryCategories: ['education', 'construction'],
    keywords: ['cube calculator', 'cube volume calculator', 'cube surface area', 'diagonal of cube', 'cube geometry'],
    tags: ['Math', '3D Geometry', 'Cube', 'Volume'],
    icon: 'Box',
    status: 'published',
    featured: true,
    popular: true,
    addedDate: '2025-02-10',
    seo: {
      title: 'Cube Calculator – Volume, Total Surface Area & Diagonal',
      metaDescription: 'Calculate cube volume, total surface area, lateral area, space diagonal, and inscribed sphere radius from edge length.',
      keywords: ['cube volume calculator', 'surface area of cube', 'space diagonal of cube', 'cube geometry'],
    },
    relatedCalculators: ['cuboid-calculator', 'square-calculator', 'sphere-calculator'],
    editorial: {
      whatIs: 'A cube is a regular three-dimensional hexahedron bounded by six square faces, with three faces meeting at each of its eight vertices. It is one of the five Platonic solids.',
      howToUse: [
        'Enter the side length (s) of the cube.',
        'View the calculated Volume, Total Surface Area, Lateral Surface Area, and Space Diagonal.',
        'Review the step-by-step algebraic substitutions.',
      ],
      formula: {
        title: 'Cube Geometric Formulas',
        expression: 'V = s^3, \\quad A_{\\text{total}} = 6s^2, \\quad A_{\\text{lat}} = 4s^2, \\quad d_{\\text{space}} = s\\sqrt{3}',
        explanation: 'Volume is side cubed. Total surface area is 6 times side squared (six faces). Space diagonal connects opposite corners through the interior.',
      },
      example: {
        scenario: 'Find volume and surface area of a cube with side s = 5 cm',
        steps: [
          'Volume: V = 5³ = 125 cm³',
          'Total Surface Area: A = 6 × 5² = 6 × 25 = 150 cm²',
          'Lateral Surface Area: A_lat = 4 × 25 = 100 cm²',
          'Space diagonal: d = 5√3 ≈ 8.6603 cm',
        ],
        result: 'Volume = 125 cm³, Surface Area = 150 cm², Space Diagonal ≈ 8.66 cm',
      },
      tips: [
        'To find side length from volume, take the cube root: s = ∛V.',
        'To find side length from surface area, divide area by 6 and take square root: s = √(A / 6).',
        'The radius of an inscribed sphere inside the cube is r = s / 2.',
      ],
      faqs: [
        {
          question: 'How many faces, edges, and vertices does a cube have?',
          answer: 'A cube has 6 square faces, 12 straight edges of equal length, and 8 vertices.',
        },
        {
          question: 'What is the space diagonal of a cube?',
          answer: 'The space diagonal connects opposite opposite vertices passing through the center: d = √(s² + s² + s²) = s√3.',
        },
        {
          question: 'What is the difference between total surface area and lateral surface area?',
          answer: 'Total surface area includes all 6 faces (6s²). Lateral surface area includes only the 4 vertical side faces (4s²), excluding top and bottom bases.',
        },
        {
          question: 'How do you calculate the circumscribed sphere of a cube?',
          answer: 'The circumscribed sphere touches all 8 vertices, with radius equal to half the space diagonal: R = (s√3) / 2.',
        },
      ],
    },
  },
  {
    slug: 'cuboid-calculator',
    name: 'Cuboid Calculator',
    shortDescription: 'Calculate cuboid (rectangular prism) volume, total surface area, lateral area, and space diagonal from length, width, and height.',
    category: 'math',
    secondaryCategories: ['education', 'construction'],
    keywords: ['cuboid calculator', 'rectangular prism volume', 'surface area of cuboid', 'space diagonal cuboid', 'cuboid dimensions'],
    tags: ['Math', '3D Geometry', 'Cuboid', 'Volume'],
    icon: 'Layers',
    status: 'published',
    featured: false,
    popular: true,
    addedDate: '2025-02-10',
    seo: {
      title: 'Cuboid Calculator – Rectangular Prism Volume & Surface Area',
      metaDescription: 'Calculate cuboid (rectangular prism) volume, total surface area, lateral area, and space diagonal with step-by-step math.',
      keywords: ['cuboid volume calculator', 'rectangular prism calculator', 'surface area cuboid', 'diagonal of cuboid'],
    },
    relatedCalculators: ['cube-calculator', 'rectangle-calculator', 'cylinder-calculator'],
    editorial: {
      whatIs: 'A cuboid (or rectangular prism) is a convex polyhedron bounded by six rectangular faces. Opposite faces are congruent rectangles, meeting at right angles (90°).',
      howToUse: [
        'Enter length (l), width (w), and height (h).',
        'View the calculated Volume, Total Surface Area, Lateral Area, and Space Diagonal.',
        'Review the step-by-step geometric calculations.',
      ],
      formula: {
        title: 'Cuboid Volume and Surface Area Formulas',
        expression: 'V = lwh, \\quad A_{\\text{total}} = 2(lw + lh + wh), \\quad d = \\sqrt{l^2 + w^2 + h^2}',
        explanation: 'Volume is the product of length, width, and height. Total surface area is the sum of the areas of the three pairs of opposing rectangular faces.',
      },
      example: {
        scenario: 'Calculate cuboid with length l = 8 m, width w = 5 m, height h = 3 m',
        steps: [
          'Volume: V = 8 × 5 × 3 = 120 m³',
          'Surface Area: A = 2 × (8×5 + 8×3 + 5×3) = 2 × (40 + 24 + 15) = 2 × 79 = 158 m²',
          'Lateral Area: A_lat = 2 × 3 × (8 + 5) = 6 × 13 = 78 m²',
          'Space Diagonal: d = √(8² + 5² + 3²) = √(64 + 25 + 9) = √98 ≈ 9.8995 m',
        ],
        result: 'Volume = 120 m³, Surface Area = 158 m², Space Diagonal ≈ 9.90 m',
      },
      tips: [
        'If length, width, and height are all equal, the cuboid is a cube.',
        'The space diagonal is the longest straight line segment that fits inside the cuboid.',
        'Lateral surface area represents the four vertical walls of a room: 2h(l + w).',
      ],
      faqs: [
        {
          question: 'What is the difference between a cuboid and a cube?',
          answer: 'A cube is a special cuboid where length, width, and height are identical (all 6 faces are squares).',
        },
        {
          question: 'How do you find the space diagonal of a cuboid?',
          answer: 'Apply 3D Pythagorean theorem: d = √(length² + width² + height²).',
        },
        {
          question: 'What is lateral surface area of a cuboid?',
          answer: 'It is the area of the four side faces: A_lat = 2h(l + w), excluding the top and bottom faces.',
        },
        {
          question: 'How many edges and vertices does a cuboid have?',
          answer: 'A cuboid has 6 faces, 12 edges (4 lengths, 4 widths, 4 heights), and 8 vertices.',
        },
      ],
    },
  },
  {
    slug: 'cylinder-calculator',
    name: 'Cylinder Calculator',
    shortDescription: 'Calculate right circular cylinder volume, total surface area, lateral (curved) surface area, and base area from radius and height.',
    category: 'math',
    secondaryCategories: ['education', 'construction'],
    keywords: ['cylinder calculator', 'cylinder volume calculator', 'surface area of cylinder', 'curved surface area cylinder', 'cylinder dimensions'],
    tags: ['Math', '3D Geometry', 'Cylinder', 'Volume'],
    icon: 'Database',
    status: 'published',
    featured: true,
    popular: true,
    addedDate: '2025-02-10',
    seo: {
      title: 'Cylinder Calculator – Volume, Total & Lateral Surface Area',
      metaDescription: 'Free online cylinder calculator. Calculate volume, total surface area, curved surface area, and base area with step-by-step formulas.',
      keywords: ['cylinder volume calculator', 'surface area of cylinder', 'cylinder formula', 'cylinder geometry'],
    },
    relatedCalculators: ['cone-calculator', 'sphere-calculator', 'circle-calculator'],
    editorial: {
      whatIs: 'A right circular cylinder is a three-dimensional solid formed by two congruent circular bases in parallel planes connected by a curved surface perpendicular to both bases.',
      howToUse: [
        'Enter the radius (r) and height (h) of the cylinder.',
        'View the calculated Volume, Total Surface Area, Lateral Surface Area, and Base Area.',
        'Review the step-by-step mathematical breakdown using π ≈ 3.14159265.',
      ],
      formula: {
        title: 'Cylinder Volume and Surface Area Formulas',
        expression: 'V = \\pi r^2 h, \\quad A_{\\text{lat}} = 2\\pi r h, \\quad A_{\\text{total}} = 2\\pi r(r + h)',
        explanation: 'Volume equals base circular area (πr²) multiplied by height. Lateral area unrolls into a rectangle of width 2πr and height h.',
      },
      example: {
        scenario: 'Find volume and surface area of a cylinder with radius r = 3 cm and height h = 10 cm',
        steps: [
          'Base Area: A_base = π × 3² = 9π ≈ 28.2743 cm²',
          'Volume: V = 9π × 10 = 90π ≈ 282.7433 cm³',
          'Lateral Area: A_lat = 2 × π × 3 × 10 = 60π ≈ 188.4956 cm²',
          'Total Surface Area: A_total = 2(28.2743) + 188.4956 ≈ 245.0442 cm²',
        ],
        result: 'Volume ≈ 282.74 cm³, Total Surface Area ≈ 245.04 cm²',
      },
      tips: [
        'If you know diameter, divide by 2 to get radius before calculating.',
        'The unrolled lateral surface of a cylinder is a flat rectangle with dimensions 2πr by h.',
        'To find capacity in liters from cubic centimeters (cm³), divide volume by 1,000.',
      ],
      faqs: [
        {
          question: 'What is the curved surface area of a cylinder?',
          answer: 'The curved (lateral) surface area is 2πrh, representing only the outer cylinder wall without the circular top and bottom caps.',
        },
        {
          question: 'How do you find cylinder volume from diameter?',
          answer: 'Radius is diameter / 2. Then V = π × (d/2)² × h = (π/4) × d² × h.',
        },
        {
          question: 'What is an oblique cylinder?',
          answer: 'An oblique cylinder is one where the centers of the circular bases are not aligned perpendicularly. By Cavalieri’s principle, its volume is still V = πr²h.',
        },
        {
          question: 'How do you find height if volume and radius are known?',
          answer: 'Divide volume by base area: h = V / (πr²).',
        },
      ],
    },
  },
  {
    slug: 'cone-calculator',
    name: 'Cone Calculator',
    shortDescription: 'Calculate right circular cone volume, total surface area, lateral (conical) surface area, slant height, and base area with step-by-step steps.',
    category: 'math',
    secondaryCategories: ['education', 'construction'],
    keywords: ['cone calculator', 'cone volume calculator', 'surface area of cone', 'slant height cone', 'cone geometry'],
    tags: ['Math', '3D Geometry', 'Cone', 'Volume'],
    icon: 'Cone',
    status: 'published',
    featured: false,
    popular: true,
    addedDate: '2025-02-10',
    seo: {
      title: 'Cone Calculator – Volume, Surface Area & Slant Height',
      metaDescription: 'Calculate cone volume, total surface area, lateral surface area, and slant height from radius and vertical height.',
      keywords: ['cone volume calculator', 'surface area of a cone', 'slant height of cone', 'cone formulas'],
    },
    relatedCalculators: ['cylinder-calculator', 'sphere-calculator', 'pyramid-calculator'],
    editorial: {
      whatIs: 'A right circular cone is a three-dimensional geometric shape that tapers smoothly from a flat circular base to a point called the apex or vertex, positioned directly above the center of the base.',
      howToUse: [
        'Enter base radius (r) and vertical height (h).',
        'View the calculated Volume, Slant Height (l), Total Surface Area, and Lateral Area.',
        'Review the step-by-step derivation using Pythagorean theorem and circular sectors.',
      ],
      formula: {
        title: 'Cone Volume, Slant Height & Surface Area Formulas',
        expression: 'l = \\sqrt{r^2 + h^2}, \\quad V = \\frac{1}{3}\\pi r^2 h, \\quad A_{\\text{lat}} = \\pi r l, \\quad A_{\\text{total}} = \\pi r(r + l)',
        explanation: 'Slant height l is the hypotenuse of the right triangle formed by radius and height. Volume is exactly one-third the volume of a cylinder with identical radius and height.',
      },
      example: {
        scenario: 'Find volume and slant height of a cone with radius r = 3 cm and height h = 4 cm',
        steps: [
          'Slant height: l = √(3² + 4²) = √(9 + 16) = √25 = 5 cm',
          'Volume: V = ⅓ × π × 3² × 4 = ⅓ × π × 9 × 4 = 12π ≈ 37.6991 cm³',
          'Lateral area: A_lat = π × 3 × 5 = 15π ≈ 47.1239 cm²',
          'Total Surface Area: A_total = π × 3 × (3 + 5) = 24π ≈ 75.3982 cm²',
        ],
        result: 'Volume ≈ 37.70 cm³, Slant Height = 5 cm, Total Area ≈ 75.40 cm²',
      },
      tips: [
        'A cone has exactly one-third the volume of a cylinder with the same radius and height.',
        'Slant height (l) is always strictly greater than vertical height (h).',
        'When the lateral surface of a cone is flattened out, it forms a sector of a larger circle of radius l.',
      ],
      faqs: [
        {
          question: 'What is the difference between height and slant height?',
          answer: 'Vertical height (h) is the perpendicular distance from the center of the base to the apex. Slant height (l) is the distance from the base perimeter to the apex along the curved surface.',
        },
        {
          question: 'Why is the volume of a cone 1/3 of a cylinder?',
          answer: 'Calculus and Archimedes’ exhaustion method prove that any pyramid or cone occupies exactly one-third the volume of a prism or cylinder with matching base and height.',
        },
        {
          question: 'What is a truncated cone (frustum)?',
          answer: 'A cone frustum is the solid remaining after the top apex section is sliced off by a plane parallel to the base.',
        },
        {
          question: 'How do you find the slant height of a cone?',
          answer: 'Use the Pythagorean theorem on the cross-sectional triangle: l = √(r² + h²).',
        },
      ],
    },
  },
  {
    slug: 'sphere-calculator',
    name: 'Sphere Calculator',
    shortDescription: 'Calculate sphere volume, surface area, diameter, and great circle circumference from radius with step-by-step mathematical deduction.',
    category: 'math',
    secondaryCategories: ['education', 'science'],
    keywords: ['sphere calculator', 'sphere volume calculator', 'surface area of sphere', 'sphere radius to volume', 'sphere geometry'],
    tags: ['Math', '3D Geometry', 'Sphere', 'Volume'],
    icon: 'Globe',
    status: 'published',
    featured: true,
    popular: true,
    addedDate: '2025-02-10',
    seo: {
      title: 'Sphere Calculator – Volume, Surface Area & Circumference',
      metaDescription: 'Free sphere calculator. Compute volume, surface area, diameter, and circumference from radius with step-by-step mathematical steps.',
      keywords: ['sphere volume calculator', 'surface area of a sphere', 'volume of sphere formula', 'sphere geometry'],
    },
    relatedCalculators: ['circle-calculator', 'cylinder-calculator', 'cone-calculator'],
    editorial: {
      whatIs: 'A sphere is a perfectly round three-dimensional geometrical object consisting of all points in space that are at an equal distance (radius r) from a central point.',
      howToUse: [
        'Enter the radius (r) of the sphere.',
        'View the calculated Volume, Surface Area, Diameter, and Great Circle Circumference.',
        'Follow the step-by-step algebraic steps.',
      ],
      formula: {
        title: 'Sphere Volume and Surface Area Formulas',
        expression: 'V = \\frac{4}{3}\\pi r^3, \\quad A = 4\\pi r^2, \\quad C = 2\\pi r, \\quad d = 2r',
        explanation: 'Surface area is exactly four times the area of its great circle (4πr²). Volume is four-thirds pi radius cubed, proven historically by Archimedes.',
      },
      example: {
        scenario: 'Find volume and surface area of a sphere with radius r = 6 cm',
        steps: [
          'Diameter: d = 2 × 6 = 12 cm',
          'Circumference: C = 2 × π × 6 = 12π ≈ 37.6991 cm',
          'Surface Area: A = 4 × π × 6² = 4 × π × 36 = 144π ≈ 452.3893 cm²',
          'Volume: V = ⁴⁄₃ × π × 6³ = ⁴⁄₃ × π × 216 = 288π ≈ 904.7787 cm³',
        ],
        result: 'Volume ≈ 904.78 cm³, Surface Area ≈ 452.39 cm²',
      },
      tips: [
        'A sphere has the smallest surface area of any geometric shape for a given volume.',
        'To find radius from volume, isolate r: r = ∛(3V / (4π)).',
        'To find radius from surface area, isolate r: r = √(A / (4π)).',
      ],
      faqs: [
        {
          question: 'What is a great circle on a sphere?',
          answer: 'A great circle is the largest circle that can be drawn on a sphere, formed by the intersection of the sphere with a plane passing through its center.',
        },
        {
          question: 'What is a hemisphere?',
          answer: 'A hemisphere is exactly half of a sphere. Its volume is (2/3)πr³ and total surface area (including circular base) is 3πr².',
        },
        {
          question: 'How did Archimedes discover the sphere formula?',
          answer: 'Archimedes proved that a sphere inscribed in a cylinder has exactly 2/3 the volume and 2/3 the surface area of the cylinder.',
        },
        {
          question: 'How do you find the diameter of a sphere?',
          answer: 'Diameter is simply double the radius: d = 2r.',
        },
      ],
    },
  },
  {
    slug: 'prism-calculator',
    name: 'Prism Calculator',
    shortDescription: 'Calculate volume, lateral surface area, total surface area, and base parameters for triangular, rectangular, and hexagonal prisms.',
    category: 'math',
    secondaryCategories: ['education', 'construction'],
    keywords: ['prism calculator', 'prism volume calculator', 'surface area of prism', 'triangular prism', 'hexagonal prism'],
    tags: ['Math', '3D Geometry', 'Prism', 'Volume'],
    icon: 'Package',
    status: 'published',
    featured: false,
    popular: true,
    addedDate: '2025-02-10',
    seo: {
      title: 'Prism Calculator – Triangular, Rectangular & Hexagonal Prisms',
      metaDescription: 'Calculate volume, lateral surface area, and total surface area for triangular, rectangular, and hexagonal prisms with step-by-step math.',
      keywords: ['prism volume calculator', 'surface area of prism', 'triangular prism calculator', 'prism geometry'],
    },
    relatedCalculators: ['cuboid-calculator', 'cylinder-calculator', 'pyramid-calculator'],
    editorial: {
      whatIs: 'A prism is a polyhedron comprising an n-sided polygonal base, a second translated copy of that base in a parallel plane, and n rectangular faces joining corresponding sides of the two bases.',
      howToUse: [
        'Select the base cross-section: Triangular, Rectangular, or Hexagonal.',
        'Enter base dimensions and prism height (H).',
        'View the calculated Volume, Total Surface Area, Lateral Surface Area, and Base Area.',
      ],
      formula: {
        title: 'Prism Volume and Surface Area Formulas',
        expression: 'V = B \\times H, \\quad A_{\\text{lat}} = P \\times H, \\quad A_{\\text{total}} = 2B + A_{\\text{lat}}',
        explanation: 'Volume is base area B multiplied by height H. Lateral area is base perimeter P multiplied by height. Total surface area adds both top and bottom bases.',
      },
      example: {
        scenario: 'Find volume and surface area of a triangular prism with legs 3 and 4, height H = 10',
        steps: [
          'Base Area: B = ½ × 3 × 4 = 6',
          'Hypotenuse of base: √(3² + 4²) = 5',
          'Base perimeter: P = 3 + 4 + 5 = 12',
          'Volume: V = B × H = 6 × 10 = 60',
          'Lateral area: A_lat = P × H = 12 × 10 = 120',
          'Total area: A_total = 2(6) + 120 = 132',
        ],
        result: 'Volume = 60, Total Surface Area = 132',
      },
      tips: [
        'A cylinder is effectively a prism with an infinite number of infinitesimal polygonal sides.',
        'Lateral faces of a right prism are always rectangles perpendicular to the bases.',
        'Volume depends strictly on base area and height, regardless of base shape.',
      ],
      faqs: [
        {
          question: 'What defines a right prism?',
          answer: 'In a right prism, the lateral joining edges are strictly perpendicular to the base planes.',
        },
        {
          question: 'How do you find the volume of any prism?',
          answer: 'Multiply the cross-sectional area of the base (B) by the vertical prism height (H): V = B × H.',
        },
        {
          question: 'What is the difference between a prism and a pyramid?',
          answer: 'A prism has two identical parallel bases connected by rectangular sides; a pyramid has one base tapering to a single apex vertex.',
        },
        {
          question: 'Is a cuboid considered a prism?',
          answer: 'Yes, a cuboid is a right rectangular prism.',
        },
      ],
    },
  },
  {
    slug: 'pyramid-calculator',
    name: 'Pyramid Calculator',
    shortDescription: 'Calculate pyramid volume, total surface area, lateral area, and slant heights for square and rectangular pyramids with step-by-step steps.',
    category: 'math',
    secondaryCategories: ['education', 'construction'],
    keywords: ['pyramid calculator', 'pyramid volume calculator', 'surface area of pyramid', 'slant height pyramid', 'square pyramid'],
    tags: ['Math', '3D Geometry', 'Pyramid', 'Volume'],
    icon: 'TrendingUp',
    status: 'published',
    featured: false,
    popular: true,
    addedDate: '2025-02-10',
    seo: {
      title: 'Pyramid Calculator – Volume, Surface Area & Slant Heights',
      metaDescription: 'Calculate volume, lateral surface area, total surface area, and slant heights of square and rectangular pyramids.',
      keywords: ['pyramid volume calculator', 'surface area of a pyramid', 'square pyramid calculator', 'slant height of pyramid'],
    },
    relatedCalculators: ['cone-calculator', 'prism-calculator', 'cube-calculator'],
    editorial: {
      whatIs: 'A pyramid is a polyhedron formed by connecting a polygonal base and a point called the apex. Each base edge and the apex form a triangular lateral face.',
      howToUse: [
        'Enter base length, base width, and vertical height.',
        'View the calculated Volume, Slant Heights, Lateral Area, and Total Surface Area.',
        'Review the step-by-step mathematical deductions.',
      ],
      formula: {
        title: 'Pyramid Volume and Surface Area Formulas',
        expression: 'V = \\frac{1}{3}A_{\\text{base}} h = \\frac{1}{3}lwh, \\quad s_l = \\sqrt{h^2 + (w/2)^2}, \\quad s_w = \\sqrt{h^2 + (l/2)^2}',
        explanation: 'Volume is one-third base area times vertical height. Lateral surface area is the sum of the four triangular side faces calculated from slant heights.',
      },
      example: {
        scenario: 'Find volume and surface area of a square pyramid with base 6×6 and height 4',
        steps: [
          'Base Area: A_base = 6 × 6 = 36',
          'Volume: V = ⅓ × 36 × 4 = 48',
          'Slant height: s = √(4² + 3²) = √(16 + 9) = 5',
          'Lateral area: 4 triangles = 4 × (½ × 6 × 5) = 60',
          'Total Surface Area: A_total = 36 + 60 = 96',
        ],
        result: 'Volume = 48, Total Surface Area = 96, Slant Height = 5',
      },
      tips: [
        'A pyramid has exactly one-third the volume of a prism with the same base and height.',
        'For a square pyramid, all four triangular lateral faces are congruent isosceles triangles.',
        'The slant height is measured from the center of a base edge up the face to the apex.',
      ],
      faqs: [
        {
          question: 'What is the formula for the volume of a pyramid?',
          answer: 'V = (1/3) × Base Area × Height.',
        },
        {
          question: 'How do you calculate the slant height of a pyramid?',
          answer: 'Apply the Pythagorean theorem to the right triangle inside: slant height = √(height² + (half_base)²).',
        },
        {
          question: 'How many faces and vertices does a square pyramid have?',
          answer: 'A square pyramid has 5 faces (1 square base + 4 triangular sides), 8 edges, and 5 vertices.',
        },
        {
          question: 'What is a tetrahedron?',
          answer: 'A tetrahedron is a triangular pyramid where all four faces (including the base) are triangles.',
        },
      ],
    },
  },

  // ==========================================
  // 4. AVERAGE
  // ==========================================
  {
    slug: 'arithmetic-mean-calculator',
    name: 'Arithmetic Mean Calculator',
    shortDescription: 'Calculate the arithmetic mean, median, sum, count, variance, and standard deviation for any dataset with step-by-step steps.',
    category: 'math',
    secondaryCategories: ['statistics', 'education'],
    keywords: ['arithmetic mean calculator', 'mean calculator', 'calculate mean', 'average finder', 'statistical mean'],
    tags: ['Math', 'Statistics', 'Mean', 'Average'],
    icon: 'BarChart2',
    status: 'published',
    featured: true,
    popular: true,
    addedDate: '2025-02-10',
    seo: {
      title: 'Arithmetic Mean Calculator – Mean, Median, Variance & Standard Deviation',
      metaDescription: 'Free arithmetic mean calculator. Calculate the average, sum, count, median, and variance of comma-separated or space-separated numbers.',
      keywords: ['arithmetic mean calculator', 'calculate mean', 'sample mean calculator', 'mean median mode'],
    },
    relatedCalculators: ['average-calculator', 'weighted-average-calculator', 'percentage-calculator'],
    editorial: {
      whatIs: 'The arithmetic mean (commonly called the average) is the central tendency measure calculated by dividing the sum of a collection of numbers by the total count of numbers in the collection.',
      howToUse: [
        'Enter your dataset numbers separated by commas or spaces.',
        'View the calculated Arithmetic Mean (x̄), Median, Sum, and Standard Deviation.',
        'Review the step-by-step summation and division steps.',
      ],
      formula: {
        title: 'Arithmetic Mean Formula',
        expression: '\\bar{x} = \\frac{1}{n}\\sum_{i=1}^n x_i = \\frac{x_1 + x_2 + \\dots + x_n}{n}',
        explanation: 'Sum all values x_i in the dataset, then divide by the sample size n.',
      },
      example: {
        scenario: 'Find the arithmetic mean of 12, 18, 25, 30, 40',
        steps: [
          'Count items: n = 5',
          'Sum items: Σx = 12 + 18 + 25 + 30 + 40 = 125',
          'Compute mean: x̄ = 125 / 5 = 25',
          'Median: The middle value in sorted order is 25',
        ],
        result: 'Mean = 25, Sum = 125, Count = 5',
      },
      tips: [
        'The arithmetic mean is sensitive to extreme outliers; if data is skewed, consider using the median.',
        'The sum of the signed deviations of each data point from the arithmetic mean is always equal to 0.',
        'For grouped data or values with unequal importance, use the Weighted Arithmetic Mean.',
      ],
      faqs: [
        {
          question: 'What is the difference between mean and average?',
          answer: 'In general speech, average refers to the arithmetic mean. In statistics, average can refer to any measure of central tendency including mean, median, or mode.',
        },
        {
          question: 'How do outliers affect the mean?',
          answer: 'Because the mean incorporates every value equally, unusually large or small values will pull the mean toward the extreme, potentially distorting the representative center.',
        },
        {
          question: 'What is the difference between sample mean and population mean?',
          answer: 'Sample mean (x̄) is computed from a subset of a population, while population mean (μ) is the true mean of all members in the entire population.',
        },
        {
          question: 'Can the arithmetic mean be negative?',
          answer: 'Yes, if the sum of the numbers in the dataset is negative, the resulting arithmetic mean will be negative.',
        },
      ],
    },
  },
  {
    slug: 'weighted-average-calculator',
    name: 'Weighted Average Calculator',
    shortDescription: 'Calculate weighted arithmetic mean, sum of products, total weights, and percentage distribution with customizable data pairs.',
    category: 'math',
    secondaryCategories: ['education', 'finance', 'statistics'],
    keywords: ['weighted average calculator', 'weighted mean calculator', 'weighted arithmetic mean', 'calculate weighted grade', 'weighted gpa'],
    tags: ['Math', 'Statistics', 'Weighted Average', 'Grades'],
    icon: 'Sliders',
    status: 'published',
    featured: true,
    popular: true,
    addedDate: '2025-02-10',
    seo: {
      title: 'Weighted Average Calculator – Weighted Arithmetic Mean with Steps',
      metaDescription: 'Free weighted average calculator. Calculate weighted mean for grades, GPA, portfolio returns, and survey data with step-by-step breakdown.',
      keywords: ['weighted average calculator', 'weighted mean solver', 'calculate weighted average', 'weighted score calculator'],
    },
    relatedCalculators: ['arithmetic-mean-calculator', 'average-calculator', 'percentage-calculator'],
    editorial: {
      whatIs: 'A weighted average (or weighted arithmetic mean) is an average where each data value is multiplied by a predetermined weight reflecting its relative importance, proportion, or frequency before summing and dividing by the total weight.',
      howToUse: [
        'Add or edit value (x) and weight (w) pairs.',
        'View the calculated Weighted Arithmetic Mean, sum of products, and total weights.',
        'Review the step-by-step calculation showing individual contributions.',
      ],
      formula: {
        title: 'Weighted Arithmetic Mean Formula',
        expression: '\\bar{x}_w = \\frac{\\sum_{i=1}^n (w_i \\cdot x_i)}{\\sum_{i=1}^n w_i} = \\frac{w_1 x_1 + w_2 x_2 + \\dots + w_n x_n}{w_1 + w_2 + \\dots + w_n}',
        explanation: 'Multiply each value x_i by its weight w_i, sum all resulting products, and divide by the sum of all weights.',
      },
      example: {
        scenario: 'Calculate final grade: Homework (85, 20% weight), Midterm (90, 30% weight), Final Exam (95, 50% weight)',
        steps: [
          'Products: (85 × 20) + (90 × 30) + (95 × 50) = 1,700 + 2,700 + 4,750 = 9,150',
          'Total weights: 20 + 30 + 50 = 100',
          'Weighted mean: 9,150 / 100 = 91.5',
        ],
        result: 'Weighted Average Grade = 91.5%',
      },
      tips: [
        'Weights do not need to add up to 100 or 1; the formula normalizes the weights automatically by dividing by their total sum.',
        'Frequently used for GPA, college course grading rubrics, and investment portfolio returns.',
        'If all weights are equal, the weighted average is identical to the regular arithmetic mean.',
      ],
      faqs: [
        {
          question: 'Do weights have to sum to 100%?',
          answer: 'No. Any non-negative numbers can serve as weights (e.g. credits, counts, probabilities). The formula divides by the total weight sum.',
        },
        {
          question: 'When should I use a weighted average instead of a regular average?',
          answer: 'Use a weighted average whenever some data points contribute more significance or represent a larger portion of the total than others (such as credit hours in GPA).',
        },
        {
          question: 'Can a weight be zero or negative?',
          answer: 'A weight can be zero (which ignores the item completely), but weights in physical and statistical contexts should not be negative.',
        },
        {
          question: 'How does this calculate portfolio returns?',
          answer: 'Enter each asset’s percentage return as the value and the dollar amount or portfolio percentage allocated to that asset as the weight.',
        },
      ],
    },
  },

  // ==========================================
  // 5. POWERS AND ROOTS
  // ==========================================
  {
    slug: 'square-power-calculator',
    name: 'Square Calculator (x²)',
    shortDescription: 'Calculate the square of any positive or negative number (x² = x × x) with scientific notation and step-by-step arithmetic.',
    category: 'math',
    secondaryCategories: ['education'],
    keywords: ['square calculator', 'square of a number', 'number squared', 'x2 calculator', 'squaring numbers'],
    tags: ['Math', 'Algebra', 'Powers', 'Exponents'],
    icon: 'ChevronsUp',
    status: 'published',
    featured: false,
    popular: true,
    addedDate: '2025-02-10',
    seo: {
      title: 'Square Calculator – Square of a Number (x²) with Steps',
      metaDescription: 'Calculate the square of any number (x²). Fast online squaring calculator with scientific notation and step-by-step multiplication.',
      keywords: ['square calculator', 'calculate square of number', 'square a number', 'x squared'],
    },
    relatedCalculators: ['cube-power-calculator', 'nth-power-calculator', 'square-root-calculator'],
    editorial: {
      whatIs: 'In mathematics, squaring a number is the result of multiplying a number by itself: x² = x × x. The operation is an exponentiation with a power of 2.',
      howToUse: [
        'Enter any positive or negative integer or decimal number.',
        'View the squared result and its scientific notation.',
        'Review the step-by-step multiplication explanation.',
      ],
      formula: {
        title: 'Square Power Formula',
        expression: 'x^2 = x \\times x, \\quad (-x)^2 = x^2',
        explanation: 'Multiplying a number by itself always yields a non-negative real result, because negative times negative is positive.',
      },
      example: {
        scenario: 'Calculate the square of -15',
        steps: [
          'Given: x = -15',
          'Operation: (-15)² = (-15) × (-15)',
          'Result: 225',
        ],
        result: '(-15)² = 225',
      },
      tips: [
        'The square of any non-zero real number is always strictly positive.',
        'Squaring a fraction between 0 and 1 produces a smaller number (e.g. (0.5)² = 0.25).',
        'Squaring is the inverse operation of finding the principal square root.',
      ],
      faqs: [
        {
          question: 'Can the square of a real number ever be negative?',
          answer: 'No. The product of two positive numbers is positive, and the product of two negative numbers is also positive. Only imaginary numbers (like i) have negative squares (i² = -1).',
        },
        {
          question: 'What are the first ten perfect squares?',
          answer: '1, 4, 9, 16, 25, 36, 49, 64, 81, and 100.',
        },
        {
          question: 'Why is it called "squaring"?',
          answer: 'Because multiplying a side length by itself calculates the geometric area of a square: Area = s².',
        },
        {
          question: 'How do you square a decimal?',
          answer: 'Multiply the decimal by itself. The result will have twice as many decimal places as the original number (e.g. 0.3 × 0.3 = 0.09).',
        },
      ],
    },
  },
  {
    slug: 'cube-power-calculator',
    name: 'Cube Calculator (x³)',
    shortDescription: 'Calculate the cube of any positive or negative number (x³ = x × x × x) with scientific notation and step-by-step arithmetic.',
    category: 'math',
    secondaryCategories: ['education'],
    keywords: ['cube calculator', 'cube of a number', 'number cubed', 'x3 calculator', 'cubing numbers'],
    tags: ['Math', 'Algebra', 'Powers', 'Exponents'],
    icon: 'Maximize2',
    status: 'published',
    featured: false,
    popular: true,
    addedDate: '2025-02-10',
    seo: {
      title: 'Cube Calculator – Cube of a Number (x³) with Steps',
      metaDescription: 'Calculate the cube of any number (x³ = x × x × x). Fast cubing calculator with scientific notation and mathematical steps.',
      keywords: ['cube calculator', 'calculate cube of number', 'cube a number', 'x cubed'],
    },
    relatedCalculators: ['square-power-calculator', 'nth-power-calculator', 'cube-root-calculator'],
    editorial: {
      whatIs: 'In arithmetic and algebra, the cube of a number n is its third power, that is, the result of multiplying three instances of n together: n³ = n × n × n.',
      howToUse: [
        'Enter any positive or negative real number.',
        'View the cubed result along with scientific notation.',
        'Review the step-by-step multiplication explanation.',
      ],
      formula: {
        title: 'Cube Power Formula',
        expression: 'x^3 = x \\times x \\times x, \\quad (-x)^3 = -x^3',
        explanation: 'Unlike squares, cubing preserves the sign of the original number: positive cubed is positive, negative cubed is negative.',
      },
      example: {
        scenario: 'Calculate the cube of -4',
        steps: [
          'Given: x = -4',
          'Operation: (-4)³ = (-4) × (-4) × (-4)',
          'First multiplication: (-4) × (-4) = 16',
          'Second multiplication: 16 × (-4) = -64',
        ],
        result: '(-4)³ = -64',
      },
      tips: [
        'Because an odd number of negatives produces a negative, (-x)³ = -(x³).',
        'Cubing numbers grows extremely quickly (e.g. 10³ = 1,000, 20³ = 8,000).',
        'Cubing is the inverse operation of finding the cube root (∛x).',
      ],
      faqs: [
        {
          question: 'Why is it called "cubing"?',
          answer: 'Because calculating the geometric volume of a three-dimensional cube with edge length s is s³: Volume = s³.',
        },
        {
          question: 'What are the first ten positive perfect cubes?',
          answer: '1, 8, 27, 64, 125, 216, 343, 512, 729, and 1,000.',
        },
        {
          question: 'Can the cube of a number be negative?',
          answer: 'Yes. Any negative number cubed produces a negative result because negative × negative × negative = negative.',
        },
        {
          question: 'How do you cube a fraction?',
          answer: 'Cube the numerator and denominator independently: (a/b)³ = a³ / b³.',
        },
      ],
    },
  },
  {
    slug: 'nth-power-calculator',
    name: 'Nth Power Calculator',
    shortDescription: 'Calculate any base raised to the power of n (x^n) for positive, negative, and fractional exponents with step-by-step exponent laws.',
    category: 'math',
    secondaryCategories: ['education'],
    keywords: ['nth power calculator', 'exponent calculator', 'power calculator', 'x to the power of n', 'calculate exponents'],
    tags: ['Math', 'Algebra', 'Powers', 'Exponents'],
    icon: 'Zap',
    status: 'published',
    featured: true,
    popular: true,
    addedDate: '2025-02-10',
    seo: {
      title: 'Nth Power Calculator – Exponent & Power Calculator (x^n)',
      metaDescription: 'Calculate base x raised to power n (x^n). Supports positive, negative, and decimal exponents with exponent laws and scientific notation.',
      keywords: ['nth power calculator', 'exponent calculator', 'power solver', 'x to power of y'],
    },
    relatedCalculators: ['square-power-calculator', 'cube-power-calculator', 'nth-root-calculator'],
    editorial: {
      whatIs: 'Exponentiation is a mathematical operation written as b^n, involving two numbers: the base b and the exponent or power n. When n is a positive integer, it represents repeated multiplication.',
      howToUse: [
        'Enter the base number (b) and the exponent (n).',
        'View the calculated power result in standard and scientific notation.',
        'Follow the step-by-step explanation applying laws of exponents.',
      ],
      formula: {
        title: 'Laws of Exponents',
        expression: 'b^n = \\underbrace{b \\times b \\times \\dots \\times b}_{n \\text{ times}}, \\quad b^{-n} = \\frac{1}{b^n}, \\quad b^0 = 1 \\quad (b \\neq 0)',
        explanation: 'Negative exponents invert the base. Any non-zero base raised to the zero power equals 1.',
      },
      example: {
        scenario: 'Calculate 2 raised to the power of 10',
        steps: [
          'Base: b = 2, Exponent: n = 10',
          'Operation: 2¹⁰ = 2 × 2 × 2 × 2 × 2 × 2 × 2 × 2 × 2 × 2',
          'Result: 1,024',
        ],
        result: '2¹⁰ = 1,024',
      },
      tips: [
        'Negative exponent rule: b^(-n) = 1 / (b^n). For example, 2^(-3) = 1 / 8 = 0.125.',
        'Fractional exponent rule: b^(1/n) = ⁿ√b. For example, 9^(1/2) = √9 = 3.',
        'Power of zero rule: Any non-zero number raised to the 0 power equals 1.',
      ],
      faqs: [
        {
          question: 'What is 0 to the power of 0?',
          answer: 'In algebra and combinatorics, 0⁰ is commonly defined as 1, while in mathematical analysis it is considered an indeterminate form.',
        },
        {
          question: 'How do negative exponents work?',
          answer: 'A negative exponent indicates reciprocal division: x^(-n) = 1 / (x^n). For instance, 10^(-2) = 1 / 100 = 0.01.',
        },
        {
          question: 'What is a fractional exponent?',
          answer: 'A fractional exponent represents a radical root: x^(m/n) = ⁿ√(x^m). For example, 8^(2/3) = (∛8)² = 2² = 4.',
        },
        {
          question: 'What happens when you multiply powers with the same base?',
          answer: 'Add the exponents together: b^m × b^n = b^(m + n).',
        },
      ],
    },
  },
  {
    slug: 'square-root-calculator',
    name: 'Square Root Calculator',
    shortDescription: 'Calculate the square root of positive and negative numbers (√x). Provides radical simplification, perfect square check, and imaginary roots.',
    category: 'math',
    secondaryCategories: ['education'],
    keywords: ['square root calculator', 'sqrt calculator', 'calculate square root', 'radical calculator', 'square root of negative number'],
    tags: ['Math', 'Algebra', 'Radicals', 'Square Root'],
    icon: 'Hash',
    status: 'published',
    featured: true,
    popular: true,
    addedDate: '2025-02-10',
    seo: {
      title: 'Square Root Calculator – Radical Simplifier & Square Roots',
      metaDescription: 'Calculate principal square roots (√x) with radical simplification, nearest perfect squares, and complex imaginary roots for negative numbers.',
      keywords: ['square root calculator', 'sqrt solver', 'simplify radicals', 'square root of negative number'],
    },
    relatedCalculators: ['square-power-calculator', 'cube-root-calculator', 'nth-root-calculator'],
    editorial: {
      whatIs: 'A square root of a number x is a number y such that y² = x. Every positive real number has two square roots (one positive and one negative); the non-negative one is called the principal square root, denoted √x.',
      howToUse: [
        'Enter any positive or negative real number.',
        'View the principal real square root or complex root (e.g. ±4i).',
        'Review the simplified radical notation and step-by-step breakdown.',
      ],
      formula: {
        title: 'Square Root Definition',
        expression: 'y = \\sqrt{x} \\iff y^2 = x \\quad (y \\ge 0), \\quad \\sqrt{-x} = i\\sqrt{x}',
        explanation: 'The radical symbol denotes the principal non-negative square root. For negative numbers, i represents the imaginary unit √(-1).',
      },
      example: {
        scenario: 'Find square root of 72',
        steps: [
          'Given: x = 72',
          'Decimal root: √72 ≈ 8.485281',
          'Factor into primes: 72 = 36 × 2',
          'Simplify radical: √(36 × 2) = √36 × √2 = 6√2',
        ],
        result: '√72 = 6√2 ≈ 8.4853',
      },
      tips: [
        'For negative numbers, the square root involves the imaginary unit: √(-16) = 4i.',
        'To simplify radicals by hand, factor out the largest perfect square (4, 9, 16, 25, 36, etc.).',
        'In exponential notation, √x is written as x^(1/2).',
      ],
      faqs: [
        {
          question: 'Can you take the square root of a negative number?',
          answer: 'Not within real numbers, but in complex numbers: √(-a) = i√a, where i = √(-1). For example, √(-25) = 5i.',
        },
        {
          question: 'Why does √25 only equal 5 and not -5?',
          answer: 'By mathematical convention, the radical sign √ denotes the principal (non-negative) root. The equation x² = 25 has two solutions (±5), but √25 = 5.',
        },
        {
          question: 'What is an irrational square root?',
          answer: 'If a whole number is not a perfect square, its square root is an irrational number with non-repeating, non-terminating decimals (like √2 ≈ 1.4142).',
        },
        {
          question: 'How do you estimate square roots without a calculator?',
          answer: 'Find the two closest perfect squares. For √50: 7² = 49 and 8² = 64, so √50 is slightly greater than 7 (≈ 7.07).',
        },
      ],
    },
  },
  {
    slug: 'nth-root-calculator',
    name: 'Nth Root Calculator',
    shortDescription: 'Calculate the nth root of any number (ⁿ√x). Supports even and odd roots, real roots, radical expressions, and step-by-step solutions.',
    category: 'math',
    secondaryCategories: ['education'],
    keywords: ['nth root calculator', 'n root calculator', 'radical calculator', 'calculate nth root', 'higher order roots'],
    tags: ['Math', 'Algebra', 'Radicals', 'Exponents'],
    icon: 'Radio',
    status: 'published',
    featured: false,
    popular: true,
    addedDate: '2025-02-10',
    seo: {
      title: 'Nth Root Calculator – Calculate Any Degree Radical (ⁿ√x)',
      metaDescription: 'Calculate nth roots of any number (ⁿ√x = x^(1/n)). Supports real roots, odd and even root degree, and step-by-step exponent rules.',
      keywords: ['nth root calculator', 'radical root solver', 'calculate n root', 'principal root calculator'],
    },
    relatedCalculators: ['square-root-calculator', 'cube-root-calculator', 'nth-power-calculator'],
    editorial: {
      whatIs: 'An nth root of a number x is a number r which, when raised to the power n, yields x: r^n = x. Here, n is a positive integer called the index or degree of the radical.',
      howToUse: [
        'Enter the radicand (x) and root degree (n ≥ 1).',
        'View the principal real root or complex root indication.',
        'Review the exponential relationship x^(1/n).',
      ],
      formula: {
        title: 'Nth Root & Fractional Exponent Relationship',
        expression: 'r = \\sqrt[n]{x} \\iff r^n = x, \\quad \\sqrt[n]{x} = x^{1/n}',
        explanation: 'Taking the nth root is mathematically equivalent to raising the radicand to the power of 1/n.',
      },
      example: {
        scenario: 'Find the 5th root of 32',
        steps: [
          'Radicand: x = 32, Degree: n = 5',
          'Search for r such that r⁵ = 32',
          'Notice 2⁵ = 2 × 2 × 2 × 2 × 2 = 32',
          'Result: ⁵√32 = 2',
        ],
        result: '⁵√32 = 2',
      },
      tips: [
        'Odd roots of negative numbers are real and negative: ∛(-8) = -2, ⁵√(-32) = -2.',
        'Even roots of negative numbers have no real solution; their roots are complex numbers.',
        'In calculus, fractional exponents x^(1/n) make power rule differentiation much simpler.',
      ],
      faqs: [
        {
          question: 'Can you take an odd root of a negative number?',
          answer: 'Yes! Because a negative number raised to an odd power remains negative, odd roots of negative numbers exist on the real number line (e.g. ∛(-27) = -3).',
        },
        {
          question: 'What is the index of a radical?',
          answer: 'The index is the small number n sitting in the crook of the radical sign that specifies which root is being taken.',
        },
        {
          question: 'How are roots related to exponents?',
          answer: 'The nth root of x is identical to raising x to the reciprocal power: ⁿ√x = x^(1/n).',
        },
        {
          question: 'How do you multiply radicals with different indices?',
          answer: 'Convert radicals to fractional exponents with a common denominator, then multiply using exponent laws.',
        },
      ],
    },
  },

  // ==========================================
  // 6. TRIGONOMETRIC FUNCTIONS
  // ==========================================
  {
    slug: 'sine-calculator',
    name: 'Sine Calculator (sin)',
    shortDescription: 'Calculate the sine of any angle in degrees or radians. Shows unit circle coordinates, exact values for special angles, and step-by-step steps.',
    category: 'math',
    secondaryCategories: ['education', 'science'],
    keywords: ['sine calculator', 'sin calculator', 'calculate sine', 'sin of angle', 'trigonometric sine'],
    tags: ['Math', 'Trigonometry', 'Sine', 'Angles'],
    icon: 'Activity',
    status: 'published',
    featured: true,
    popular: true,
    addedDate: '2025-02-10',
    seo: {
      title: 'Sine Calculator – Calculate sin(θ) in Degrees & Radians',
      metaDescription: 'Free online sine calculator. Compute sin(θ) in degrees or radians with exact values for special angles and unit circle coordinates.',
      keywords: ['sine calculator', 'sin calculator', 'calculate sin', 'unit circle sine'],
    },
    relatedCalculators: ['cosine-calculator', 'tangent-calculator', 'cotangent-calculator'],
    editorial: {
      whatIs: 'In mathematics, the sine is a fundamental trigonometric function. In a right-angled triangle, the sine of an acute angle is the ratio of the length of the side opposite the angle to the hypotenuse: sin(θ) = Opposite / Hypotenuse.',
      howToUse: [
        'Enter the angle θ and select angle mode (Degrees or Radians).',
        'View the decimal sine value and exact special angle representation.',
        'Examine the unit circle coordinates (cos θ, sin θ) and step-by-step derivation.',
      ],
      formula: {
        title: 'Sine Trigonometric Definition',
        expression: '\\sin(\\theta) = \\frac{\\text{Opposite}}{\\text{Hypotenuse}} = y_{\\text{unit circle}}',
        explanation: 'On the unit circle (radius 1), sine corresponds directly to the vertical y-coordinate of the terminal angle point.',
      },
      example: {
        scenario: 'Calculate sin(30°)',
        steps: [
          'Given: θ = 30° = π / 6 radians',
          'In a 30°-60°-90° triangle, the side opposite 30° is half the hypotenuse.',
          'sin(30°) = 1 / 2 = 0.5',
        ],
        result: 'sin(30°) = 0.5 (Exact: 1/2)',
      },
      tips: [
        'The range of the real sine function is strictly bounded between -1 and 1: -1 ≤ sin(θ) ≤ 1.',
        'Sine is an odd function: sin(-θ) = -sin(θ).',
        'The period of the sine function is 360° (or 2π radians).',
      ],
      faqs: [
        {
          question: 'What are the exact values of sine for common angles?',
          answer: 'sin(0°) = 0, sin(30°) = 1/2, sin(45°) = √2/2, sin(60°) = √3/2, sin(90°) = 1.',
        },
        {
          question: 'What is the period of the sine function?',
          answer: 'The sine wave repeats its cycle every 360° or 2π radians: sin(θ + 2π) = sin(θ).',
        },
        {
          question: 'How do you convert degrees to radians?',
          answer: 'Multiply degrees by π / 180: radians = degrees × (π / 180).',
        },
        {
          question: 'What is the reciprocal of the sine function?',
          answer: 'The reciprocal of sine is cosecant: csc(θ) = 1 / sin(θ).',
        },
      ],
    },
  },
  {
    slug: 'cosine-calculator',
    name: 'Cosine Calculator (cos)',
    shortDescription: 'Calculate the cosine of any angle in degrees or radians. Shows unit circle coordinates, exact values for special angles, and step-by-step steps.',
    category: 'math',
    secondaryCategories: ['education', 'science'],
    keywords: ['cosine calculator', 'cos calculator', 'calculate cosine', 'cos of angle', 'trigonometric cosine'],
    tags: ['Math', 'Trigonometry', 'Cosine', 'Angles'],
    icon: 'Radio',
    status: 'published',
    featured: true,
    popular: true,
    addedDate: '2025-02-10',
    seo: {
      title: 'Cosine Calculator – Calculate cos(θ) in Degrees & Radians',
      metaDescription: 'Free online cosine calculator. Compute cos(θ) in degrees or radians with exact values for special angles and unit circle coordinates.',
      keywords: ['cosine calculator', 'cos calculator', 'calculate cos', 'unit circle cosine'],
    },
    relatedCalculators: ['sine-calculator', 'tangent-calculator', 'cotangent-calculator'],
    editorial: {
      whatIs: 'In mathematics, the cosine is a fundamental trigonometric function. In a right triangle, the cosine of an acute angle is the ratio of the length of the adjacent leg to the hypotenuse: cos(θ) = Adjacent / Hypotenuse.',
      howToUse: [
        'Enter the angle θ and select Degrees or Radians.',
        'View the decimal cosine value and exact special angle representation.',
        'Examine the unit circle coordinates (cos θ, sin θ) and step-by-step derivation.',
      ],
      formula: {
        title: 'Cosine Trigonometric Definition',
        expression: '\\cos(\\theta) = \\frac{\\text{Adjacent}}{\\text{Hypotenuse}} = x_{\\text{unit circle}}',
        explanation: 'On the Cartesian unit circle of radius 1, cosine corresponds directly to the horizontal x-coordinate of the terminal point.',
      },
      example: {
        scenario: 'Calculate cos(60°)',
        steps: [
          'Given: θ = 60° = π / 3 radians',
          'In a 30°-60°-90° triangle, the adjacent leg to 60° is half the hypotenuse.',
          'cos(60°) = 1 / 2 = 0.5',
        ],
        result: 'cos(60°) = 0.5 (Exact: 1/2)',
      },
      tips: [
        'The range of cosine is strictly bounded between -1 and 1: -1 ≤ cos(θ) ≤ 1.',
        'Cosine is an even function: cos(-θ) = cos(θ).',
        'Pythagorean identity: sin²(θ) + cos²(θ) = 1 for all real angles θ.',
      ],
      faqs: [
        {
          question: 'What are the exact values of cosine for common angles?',
          answer: 'cos(0°) = 1, cos(30°) = √3/2, cos(45°) = √2/2, cos(60°) = 1/2, cos(90°) = 0.',
        },
        {
          question: 'What is the relationship between sine and cosine?',
          answer: 'Sine and cosine are cofunctions: cos(θ) = sin(90° - θ). A cosine wave is a sine wave shifted 90° to the left.',
        },
        {
          question: 'What is the reciprocal of the cosine function?',
          answer: 'The reciprocal of cosine is secant: sec(θ) = 1 / cos(θ).',
        },
        {
          question: 'Why is cos(90°) equal to zero?',
          answer: 'At 90°, the terminal ray points vertically straight up along the y-axis, where the horizontal x-coordinate is 0.',
        },
      ],
    },
  },
  {
    slug: 'tangent-calculator',
    name: 'Tangent Calculator (tan)',
    shortDescription: 'Calculate the tangent of any angle in degrees or radians. Identifies vertical asymptotes, exact values for special angles, and ratios.',
    category: 'math',
    secondaryCategories: ['education', 'science'],
    keywords: ['tangent calculator', 'tan calculator', 'calculate tangent', 'tan of angle', 'trigonometric tangent'],
    tags: ['Math', 'Trigonometry', 'Tangent', 'Angles'],
    icon: 'Maximize',
    status: 'published',
    featured: true,
    popular: true,
    addedDate: '2025-02-10',
    seo: {
      title: 'Tangent Calculator – Calculate tan(θ) in Degrees & Radians',
      metaDescription: 'Free online tangent calculator. Compute tan(θ) in degrees or radians with exact values, asymptotes, and slope interpretation.',
      keywords: ['tangent calculator', 'tan calculator', 'calculate tan', 'tangent of angle'],
    },
    relatedCalculators: ['sine-calculator', 'cosine-calculator', 'cotangent-calculator'],
    editorial: {
      whatIs: 'In trigonometry, the tangent of an angle is the ratio of the opposite leg to the adjacent leg in a right triangle: tan(θ) = Opposite / Adjacent = sin(θ) / cos(θ). It also represents the slope of the terminal ray.',
      howToUse: [
        'Enter the angle θ and choose Degrees or Radians.',
        'View the decimal tangent value or undefined asymptote warning.',
        'Review the exact fractional value and step-by-step deduction.',
      ],
      formula: {
        title: 'Tangent Trigonometric Definition',
        expression: '\\tan(\\theta) = \\frac{\\text{Opposite}}{\\text{Adjacent}} = \\frac{\\sin(\\theta)}{\\cos(\\theta)} = \\text{slope } m',
        explanation: 'Tangent is undefined whenever cos(θ) = 0, which occurs at odd multiples of 90° (±90°, ±270°, etc.).',
      },
      example: {
        scenario: 'Calculate tan(45°)',
        steps: [
          'Given: θ = 45°',
          'In a 45°-45°-90° triangle, opposite leg equals adjacent leg.',
          'tan(45°) = sin(45°) / cos(45°) = (√2/2) / (√2/2) = 1',
        ],
        result: 'tan(45°) = 1',
      },
      tips: [
        'Tangent has vertical asymptotes at 90° + k·180° because dividing by zero is undefined.',
        'The period of the tangent function is 180° (or π radians), unlike sine and cosine which repeat every 360°.',
        'The tangent of an angle equals the slope (rise over run) of the line passing through that angle.',
      ],
      faqs: [
        {
          question: 'Why is tan(90°) undefined?',
          answer: 'At 90°, cos(90°) = 0. Because tan(θ) = sin(θ) / cos(θ), evaluating tan(90°) requires dividing by zero (1 / 0), which is mathematically undefined.',
        },
        {
          question: 'What are common exact tangent values?',
          answer: 'tan(0°) = 0, tan(30°) = √3/3 ≈ 0.577, tan(45°) = 1, tan(60°) = √3 ≈ 1.732.',
        },
        {
          question: 'What is the period of the tangent function?',
          answer: 'The period of tangent is 180° (or π radians): tan(θ + π) = tan(θ).',
        },
        {
          question: 'What is the reciprocal of tangent?',
          answer: 'The reciprocal of tangent is cotangent: cot(θ) = 1 / tan(θ) = cos(θ) / sin(θ).',
        },
      ],
    },
  },
  {
    slug: 'cotangent-calculator',
    name: 'Cotangent Calculator (cot)',
    shortDescription: 'Calculate the cotangent of any angle in degrees or radians. Identifies undefined points, exact values for special angles, and reciprocal trig.',
    category: 'math',
    secondaryCategories: ['education', 'science'],
    keywords: ['cotangent calculator', 'cot calculator', 'calculate cotangent', 'cot of angle', 'reciprocal trig'],
    tags: ['Math', 'Trigonometry', 'Cotangent', 'Angles'],
    icon: 'Sliders',
    status: 'published',
    featured: false,
    popular: true,
    addedDate: '2025-02-10',
    seo: {
      title: 'Cotangent Calculator – Calculate cot(θ) in Degrees & Radians',
      metaDescription: 'Free online cotangent calculator. Compute cot(θ) = 1/tan(θ) = cos(θ)/sin(θ) in degrees or radians with step-by-step mathematical deduction.',
      keywords: ['cotangent calculator', 'cot calculator', 'calculate cot', 'cotangent formula'],
    },
    relatedCalculators: ['tangent-calculator', 'cosine-calculator', 'sine-calculator'],
    editorial: {
      whatIs: 'Cotangent is the reciprocal trigonometric function of tangent. In a right triangle, cot(θ) is the ratio of the adjacent leg to the opposite leg: cot(θ) = Adjacent / Opposite = cos(θ) / sin(θ) = 1 / tan(θ).',
      howToUse: [
        'Enter angle θ and select Degrees or Radians.',
        'View the calculated cotangent value or vertical asymptote alert.',
        'Review the exact mathematical derivation.',
      ],
      formula: {
        title: 'Cotangent Trigonometric Definition',
        expression: '\\cot(\\theta) = \\frac{\\text{Adjacent}}{\\text{Opposite}} = \\frac{1}{\\tan(\\theta)} = \\frac{\\cos(\\theta)}{\\sin(\\theta)}',
        explanation: 'Cotangent is undefined whenever sin(θ) = 0, which occurs at integer multiples of 180° (0°, ±180°, ±360°, etc.).',
      },
      example: {
        scenario: 'Calculate cot(30°)',
        steps: [
          'Given: θ = 30°',
          'cos(30°) = √3 / 2, sin(30°) = 1 / 2',
          'cot(30°) = cos(30°) / sin(30°) = (√3/2) / (1/2) = √3 ≈ 1.732051',
        ],
        result: 'cot(30°) = √3 ≈ 1.7321',
      },
      tips: [
        'Cotangent is undefined at 0°, 180°, 360° because sin(θ) = 0 at those angles.',
        'Like tangent, cotangent has a period of 180° (or π radians).',
        'At 45°, tan(45°) = 1 and cot(45°) = 1.',
      ],
      faqs: [
        {
          question: 'Why is cot(0°) undefined?',
          answer: 'At 0°, sin(0°) = 0. Because cot(θ) = cos(θ) / sin(θ), evaluating cot(0°) requires dividing by zero (1 / 0), which is undefined.',
        },
        {
          question: 'What is the relationship between tan and cot?',
          answer: 'They are reciprocals: cot(θ) = 1 / tan(θ) and tan(θ) = 1 / cot(θ). They are also cofunctions: cot(θ) = tan(90° - θ).',
        },
        {
          question: 'What are common exact values of cotangent?',
          answer: 'cot(30°) = √3, cot(45°) = 1, cot(60°) = √3/3 ≈ 0.577, cot(90°) = 0.',
        },
        {
          question: 'What is the domain and range of cotangent?',
          answer: 'Domain: all real numbers except θ = kπ (k integer). Range: all real numbers (-∞, +∞).',
        },
      ],
    },
  },

  // ==========================================
  // 7. LOGARITHMS
  // ==========================================
  {
    slug: 'logarithm-calculator',
    name: 'Logarithm Calculator',
    shortDescription: 'Calculate logarithms with any arbitrary positive base (log_b x) using the change of base formula with step-by-step mathematical steps.',
    category: 'math',
    secondaryCategories: ['education', 'science'],
    keywords: ['logarithm calculator', 'log calculator', 'log base b calculator', 'change of base formula', 'calculate logarithm'],
    tags: ['Math', 'Algebra', 'Logarithms', 'Exponents'],
    icon: 'Hash',
    status: 'published',
    featured: true,
    popular: true,
    addedDate: '2025-02-10',
    seo: {
      title: 'Logarithm Calculator – Calculate log_b(x) with Any Base',
      metaDescription: 'Calculate logarithms for any base b and argument x (log_b(x)). Step-by-step change of base formula and exponential equivalents.',
      keywords: ['logarithm calculator', 'log calculator with base', 'change of base calculator', 'solve logarithm'],
    },
    relatedCalculators: ['natural-logarithm-calculator', 'common-logarithm-calculator', 'nth-power-calculator'],
    editorial: {
      whatIs: 'A logarithm is the inverse operation to exponentiation. The logarithm of a number x with respect to base b is the exponent to which b must be raised to produce x: log_b(x) = y if and only if b^y = x.',
      howToUse: [
        'Enter the argument (x > 0) and the base (b > 0, b ≠ 1).',
        'View the calculated logarithmic value.',
        'Review the change-of-base formula steps and equivalent exponential identity.',
      ],
      formula: {
        title: 'Change of Base Formula',
        expression: '\\log_b(x) = y \\iff b^y = x, \\quad \\log_b(x) = \\frac{\\ln(x)}{\\ln(b)} = \\frac{\\log_{10}(x)}{\\log_{10}(b)}',
        explanation: 'To compute a logarithm to any base on standard computing hardware, divide the natural logarithm of x by the natural logarithm of base b.',
      },
      example: {
        scenario: 'Calculate log₂(32)',
        steps: [
          'Given: argument x = 32, base b = 2',
          'By change of base: log₂(32) = ln(32) / ln(2)',
          'Notice that 2⁵ = 32',
          'Result: log₂(32) = 5',
        ],
        result: 'log₂(32) = 5',
      },
      tips: [
        'The argument x must be strictly positive (x > 0); real logarithms of negative numbers and zero are undefined.',
        'The base b must be strictly positive and cannot equal 1 (b > 0, b ≠ 1).',
        'Product rule: log_b(xy) = log_b(x) + log_b(y). Quotient rule: log_b(x/y) = log_b(x) - log_b(y).',
      ],
      faqs: [
        {
          question: 'What is the change of base formula?',
          answer: 'The change of base formula allows you to evaluate any base b logarithm using natural log or common log: log_b(x) = ln(x) / ln(b).',
        },
        {
          question: 'Why can’t the base of a logarithm equal 1?',
          answer: 'Because 1 raised to any power is always 1 (1^y = 1). Therefore, you cannot solve 1^y = x for any number other than 1.',
        },
        {
          question: 'Why can’t you take the log of a negative number?',
          answer: 'In the real number system, raising a positive base b to any real power always yields a positive number (b^y > 0). Negative arguments require complex logarithms.',
        },
        {
          question: 'What is log_b(1)?',
          answer: 'For any valid base b, log_b(1) = 0 because b⁰ = 1.',
        },
      ],
    },
  },
  {
    slug: 'natural-logarithm-calculator',
    name: 'Natural Logarithm Calculator (ln)',
    shortDescription: 'Calculate the natural logarithm (ln x = log_e x) with base e ≈ 2.718281828 with step-by-step calculus and exponential properties.',
    category: 'math',
    secondaryCategories: ['education', 'science'],
    keywords: ['natural logarithm calculator', 'ln calculator', 'log base e calculator', 'calculate natural log', 'eulers number logarithm'],
    tags: ['Math', 'Calculus', 'Logarithms', 'Euler'],
    icon: 'Radio',
    status: 'published',
    featured: true,
    popular: true,
    addedDate: '2025-02-10',
    seo: {
      title: 'Natural Logarithm Calculator – Calculate ln(x) Online Free',
      metaDescription: 'Free natural logarithm calculator. Calculate ln(x) with base e ≈ 2.71828 with step-by-step calculus insights and exponential equations.',
      keywords: ['natural logarithm calculator', 'ln calculator', 'calculate ln', 'log base e'],
    },
    relatedCalculators: ['logarithm-calculator', 'common-logarithm-calculator', 'nth-power-calculator'],
    editorial: {
      whatIs: 'The natural logarithm is the logarithm to the base of the mathematical constant e, where e is an irrational and transcendental number approximately equal to 2.718281828459. It is denoted as ln(x) or log_e(x).',
      howToUse: [
        'Enter any positive real argument (x > 0).',
        'View the calculated natural log value.',
        'Review the exponential relationship e^y = x and calculus properties.',
      ],
      formula: {
        title: 'Natural Logarithm Definition',
        expression: '\\ln(x) = y \\iff e^y = x, \\quad \\ln(x) = \\int_1^x \\frac{1}{t}\\,dt',
        explanation: 'The natural logarithm of x is defined analytically as the area under the hyperbola 1/t from t = 1 to t = x.',
      },
      example: {
        scenario: 'Calculate ln(20)',
        steps: [
          'Given: x = 20',
          'Operation: ln(20) = log_e(20)',
          'Since e² ≈ 7.389 and e³ ≈ 20.085, the answer is slightly less than 3.',
          'Result: ln(20) ≈ 2.995732',
        ],
        result: 'ln(20) ≈ 2.9957',
      },
      tips: [
        'ln(e) = 1, ln(1) = 0, and ln(e^k) = k.',
        'The derivative of ln(x) is 1/x for all x > 0.',
        'Natural logarithms are standard in modeling exponential continuous growth, radioactive decay, and finance continuous compounding.',
      ],
      faqs: [
        {
          question: 'What is Euler’s number e?',
          answer: 'Euler’s number e ≈ 2.71828 is a fundamental mathematical constant defined as the limit of (1 + 1/n)^n as n approaches infinity.',
        },
        {
          question: 'Why is it called the "natural" logarithm?',
          answer: 'It is natural because its derivative is simply 1/x without any scaling constants, making it the most natural base for calculus, differential equations, and physics.',
        },
        {
          question: 'What is ln(1)?',
          answer: 'ln(1) = 0 because e⁰ = 1.',
        },
        {
          question: 'How is ln related to log10?',
          answer: 'ln(x) ≈ 2.302585 × log₁₀(x), or log₁₀(x) = ln(x) / ln(10).',
        },
      ],
    },
  },
  {
    slug: 'common-logarithm-calculator',
    name: 'Common Logarithm Calculator (log₁₀)',
    shortDescription: 'Calculate common base-10 logarithms (log₁₀ x) with characteristic, mantissa, and scientific notation connections.',
    category: 'math',
    secondaryCategories: ['education', 'science'],
    keywords: ['common logarithm calculator', 'log10 calculator', 'base 10 log', 'calculate common log', 'log calculator'],
    tags: ['Math', 'Algebra', 'Logarithms', 'Base 10'],
    icon: 'Percent',
    status: 'published',
    featured: true,
    popular: true,
    addedDate: '2025-02-10',
    seo: {
      title: 'Common Logarithm Calculator – Base 10 Log (log₁₀ x)',
      metaDescription: 'Free common logarithm calculator. Calculate log₁₀(x) with powers of 10, characteristic, mantissa, and scientific notation.',
      keywords: ['common logarithm calculator', 'log10 calculator', 'base 10 log', 'calculate log10'],
    },
    relatedCalculators: ['logarithm-calculator', 'natural-logarithm-calculator', 'nth-power-calculator'],
    editorial: {
      whatIs: 'The common logarithm is the logarithm with base 10, denoted as log₁₀(x) or simply log(x). It measures how many times 10 must be multiplied by itself to reach a given number.',
      howToUse: [
        'Enter any positive real number (x > 0).',
        'View the common logarithm result.',
        'Review the power of 10 relationship: 10^y = x.',
      ],
      formula: {
        title: 'Common Logarithm Formula',
        expression: '\\log_{10}(x) = y \\iff 10^y = x',
        explanation: 'For powers of 10, log₁₀(10^k) = k. For example, log₁₀(1,000) = 3 because 10³ = 1,000.',
      },
      example: {
        scenario: 'Calculate log₁₀(500)',
        steps: [
          'Given: x = 500 = 5 × 10²',
          'log₁₀(5 × 10²) = log₁₀(5) + log₁₀(10²)',
          'log₁₀(5) ≈ 0.69897, log₁₀(10²) = 2',
          'Result: 2 + 0.69897 = 2.69897',
        ],
        result: 'log₁₀(500) ≈ 2.6990',
      },
      tips: [
        'The integer part of the common log is called the characteristic; the decimal part is the mantissa.',
        'The decibel (dB) scale in acoustics, the Richter scale in seismology, and pH in chemistry are all logarithmic scales based on log₁₀.',
        'log₁₀(1) = 0, log₁₀(10) = 1, log₁₀(100) = 2, log₁₀(1000) = 3.',
      ],
      faqs: [
        {
          question: 'What is the common logarithm used for?',
          answer: 'Common logarithms are widely used in engineering, chemistry (pH = -log₁₀[H+]), acoustics (decibels), and earthquake measurement (Richter scale) to compress wide ranges of magnitude onto manageable scales.',
        },
        {
          question: 'What is the characteristic and mantissa?',
          answer: 'For a common log result like 3.477: 3 is the characteristic (indicating the order of magnitude 10³), and 0.477 is the mantissa.',
        },
        {
          question: 'What is log₁₀(0)?',
          answer: 'log₁₀(0) is undefined. As x approaches 0 from the right, log₁₀(x) approaches negative infinity (-∞).',
        },
        {
          question: 'How do you undo a common logarithm?',
          answer: 'Take 10 to the power of the number: if log₁₀(x) = y, then x = 10^y.',
        },
      ],
    },
  },
];
