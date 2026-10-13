/* ====== Chapter 3 — Vectors (Dr. Karim's slides, Dr. Khalil's slides, doctor's answer-key set, tutorial) ======
   Same data contract as ch02.js. Math in LaTeX: $..$ inline, $$..$$ display. g = 10 m/s² in this course. */
(function (root) {
  'use strict';
  const V = root.VEC, R = String.raw;
  const TEXT = (html) => ({ k: 'text', html });
  const LIST = (items) => ({ k: 'list', items });
  const EX = (o) => Object.assign({ k: 'ex' }, o);
  const SUM = (items) => ({ k: 'sum', items });
  const PIT = (html) => ({ k: 'pit', html });
  const TIP = (html) => ({ k: 'tip', html });
  const FIG = (html) => ({ k: 'fig', html });
  const IMG = (id) => ({ k: 'img', id });
  const TBL = (head, rows) => ({ k: 'tbl', head, rows });
  const H = (title) => ({ k: 'h', title });
  const ARX = (html) => ({ k: 'arx', html });
  const LAWS = (title, ids) => ({ k: 'laws', title, ids });
  const E = (t) => `<span class="en">${t}</span>`;

  /* ---------------------------------------------------------------- formulas */
  const laws = [
    { id: 'p2c', sec: 1, name: 'Polar → Cartesian', tex: R`x = r\cos\theta \qquad y = r\sin\theta`, note: R`$\theta$ is measured from the $+x$ axis, counter-clockwise.`, when: R`You know the distance $r$ and the angle $\theta$ and need $x$ and $y$.`,
      ar: R`إذا عرفت البعد $r$ عن نقطة الأصل والزاوية $\theta$ فهذان القانونان يعطيانك الإحداثيين $x$ و$y$. الإشارة تأتي تلقائياً من $\cos$ و$\sin$ حسب الربع.`,
      tip: R`Calculator in <b>degree</b> mode. A negative result is correct: it simply means the point is left of / below the origin.`,
      ex: { src: 'Lecture slides · Example 3.1 (reverse)', p: R`A point has $r = 4.30$ and $\theta = 216^\circ$. Find $x$ and $y$.`, steps: [R`$x = 4.30\cos 216^\circ$ (use a calculator) $= -3.48$`, R`$y = 4.30\sin 216^\circ = -2.53$`], a: R`$(x,y) \approx (-3.50,\,-2.50)$`, ar: 'الزاوية 216° في الربع الثالث، لذلك $x$ و$y$ كلاهما سالب.' } },
    { id: 'c2p', sec: 1, name: 'Cartesian → polar', tex: R`r = \sqrt{x^2 + y^2} \qquad \theta = \tan^{-1}\!\frac{y}{x}\ \ (+180^\circ \text{ if } x<0)`, note: R`The calculator’s $\tan^{-1}$ only returns angles in the 1st or 4th quadrant.`, when: R`You know $x$ and $y$ and need the length and the direction.`,
      ar: R`نحسب الطول $r$ بفيثاغورس، ثم الزاوية بـ $\tan^{-1}(y/x)$. <b>انتبه:</b> الآلة الحاسبة تعطيك زاوية الربع الأول أو الرابع فقط، فإذا كانت $x$ سالبة أضف $180^\circ$.`,
      tip: R`Draw a quick sketch of the point first: it tells you the quadrant, so you know whether to add $180^\circ$.`,
      ex: { src: 'Lecture slides · Example 3.1', p: R`The Cartesian coordinates of a point are $(x,y) = (-3.50,\,-2.50)$ m. Find its polar coordinates.`, steps: [R`$r = \sqrt{(-3.50)^2 + (-2.50)^2} = 4.30\ \text{m}$`, R`$\tan^{-1}(2.50/3.50) = 35.5^\circ$ (calculator)`, R`$x<0$ (third quadrant) $\Rightarrow \theta = 180^\circ + 35.5^\circ$`], a: R`$r = 4.30\ \text{m},\;\; \theta = 216^\circ$`, ar: 'الحاسبة تعطي 35.5° فقط، والنقطة في الربع الثالث فنضيف 180°.' } },
    { id: 'rules', sec: 3, name: 'Vector algebra rules', tex: R`\vec A + \vec B = \vec B + \vec A \qquad \vec A - \vec B = \vec A + (-\vec B)`, note: R`Order does not matter for addition. $-\vec B$ is $\vec B$ reversed.`, when: 'Adding or subtracting vectors graphically, or simplifying an expression.',
      ar: R`الجمع <b>تبادلي</b> (الترتيب لا يهم) و<b>تجميعي</b>. أما الطرح فهو جمع المتجه المعاكس: $\vec A-\vec B$ يعني اقلب $\vec B$ ثم اجمعه إلى $\vec A$.`,
      tip: R`$\vec B - \vec A$ is the <b>opposite</b> of $\vec A - \vec B$ (same length, reversed direction).`,
      ex: { src: 'Doctor’s question set · Q8', p: R`$\vec A$ points into the 2nd quadrant, $\vec B$ into the 4th. Which quadrant does $\vec B - \vec A$ point into? Take $\vec A = (-2,3)$, $\vec B = (4,-1)$.`, steps: [R`$\vec B - \vec A = (4-(-2),\,-1-3) = (6,\,-4)$`], a: R`$(+,-)$: the 4th quadrant (True)`, ar: 'الطرح بالمركبات: اطرح كل مركبة من نظيرتها، والإشارات تحدد الربع.' } },
    { id: 'maxmin', sec: 3, name: 'Maximum and minimum resultant', tex: R`R_{max} = A + B \;(\theta = 0^\circ) \qquad R_{min} = |A - B| \;(\theta = 180^\circ) \qquad |A-B| \le R \le A+B`, note: R`$R = 0$ only if the vectors are equal in size and opposite in direction.`, when: 'Only the magnitudes are given (“unspecified direction”).',
      ar: R`إذا لم يُذكر الاتجاه فالمحصلة تتراوح بين قيمتين: <b>أكبر</b> ما يمكن عندما يكون المتجهان في نفس الاتجاه (نجمع الطولين)، و<b>أصغر</b> ما يمكن عندما يكونان متعاكسين (نطرح الطولين).`,
      tip: R`Same direction: add the lengths. Opposite directions: subtract the lengths. Any other angle gives something in between.`,
      ex: { src: 'Lecture slides · Quick Quiz 3.2', p: R`$|\vec A| = 12$ and $|\vec B| = 8$. Find the largest and smallest possible $|\vec A + \vec B|$.`, steps: [R`Largest: $12 + 8 = 20$ (parallel)`, R`Smallest: $12 - 8 = 4$ (opposite)`], a: R`$R_{max} = 20,\;\; R_{min} = 4$`, ar: 'أي زاوية أخرى بين المتجهين تعطي محصلة بين 4 و20.' } },
    { id: 'lawcos', sec: 3, name: 'Law of cosines (two vectors)', tex: R`R = \sqrt{A^2 + B^2 + 2AB\cos\phi} \qquad \frac{\sin\beta}{B} = \frac{\sin\phi}{R}`, note: R`$\phi$ = angle between $\vec A$ and $\vec B$ when they start from the same point. $\beta$ = angle of $\vec R$ from $\vec A$.`, when: R`Two vectors with a known angle between them and you want the size of $\vec R$ without components.`,
      ar: R`عندما يكون لديك متجهان والزاوية $\phi$ بينهما (عند رسمهما من نفس النقطة) يمكنك إيجاد مقدار المحصلة مباشرة. ثم قانون الجيب يعطيك اتجاهها. بدلاً من ذلك يمكنك دائماً استخدام <b>المركبات</b>.`,
      tip: R`If $\phi = 90^\circ$ this reduces to Pythagoras. With $\phi = 0^\circ$ you get $A+B$, with $180^\circ$ you get $|A-B|$.`,
      ex: { src: 'Lecture slides · Example 3.2', p: R`A car goes $20.0$ km north, then $35.0$ km at $60^\circ$ west of north. Find the magnitude and direction of the resultant.`, steps: [R`$R^2 = 20^2 + 35^2 + 2(20)(35)\cos 60^\circ = 2325$`, R`$R = 48.2\ \text{km}$`, R`$\sin\beta = \dfrac{35\sin 60^\circ}{48.2}$ (calculator) $\Rightarrow \beta = 39.0^\circ$`], a: R`$R = 48.2\ \text{km}$ at $39.0^\circ$ west of north (polar angle $129^\circ$)`, ar: 'الزاوية بين المتجهين عند رسمهما من نفس النقطة هي 60°.' } },
    { id: 'avgvec', sec: 2, name: 'Average velocity vs average speed', tex: R`\bar{\vec v} = \frac{\Delta\vec r}{\Delta t} \qquad \text{average speed} = \frac{\text{total path length}}{\Delta t}`, note: 'Velocity uses the straight line start → end. Speed uses the path actually travelled.', when: 'A trip is made of several straight legs (e.g. east then north).',
      ar: R`السرعة المتجهة المتوسطة = <b>الإزاحة</b> (الخط المستقيم من البداية للنهاية) ÷ الزمن الكلي. السرعة القياسية المتوسطة = <b>طول المسار كله</b> ÷ الزمن الكلي. لذلك الأولى دائماً أصغر أو تساوي الثانية.`,
      tip: R`Add the legs <b>as vectors</b> for velocity and <b>as plain lengths</b> for speed. Convert minutes to hours first.`,
      ex: { src: 'Doctor’s question set · Q4 and Q5 (together)', p: R`A plane flies $30$ km east in $60$ min, then $40$ km north in $40$ min. Find the magnitude of its average velocity and its average speed.`, steps: [R`$|\Delta\vec r| = \sqrt{30^2 + 40^2} = 50\ \text{km}$`, R`$\Delta t = 100\ \text{min} = 5/3\ \text{h}$`, R`$|\bar v| = 50\big/(5/3) = 30\ \text{km/h}$`, R`Path $= 30+40 = 70$ km $\Rightarrow$ speed $= 70\big/(5/3) = 42\ \text{km/h}$`], a: R`$|\bar{\vec v}| = 30\ \text{km/h}$, $\;$ average speed $= 42\ \text{km/h}$`, ar: 'الإزاحة 50 كم لكن المسافة المقطوعة 70 كم، فتختلف النتيجتان.' } },
    { id: 'comp', sec: 4, name: 'Components of a vector', tex: R`A_x = A\cos\theta \qquad A_y = A\sin\theta \qquad A = \sqrt{A_x^2 + A_y^2} \qquad \theta = \tan^{-1}\!\frac{A_y}{A_x}`, note: R`Same maths as Lesson 1, now applied to a vector. $\theta$ is from the $+x$ axis.`, when: 'You break a tilted vector (force, displacement, velocity) into horizontal and vertical parts, or rebuild it.',
      ar: R`أي متجه مائل يُحلَّل إلى جزء أفقي $A_x$ وجزء رأسي $A_y$. الجزء المجاور للزاوية يأخذ $\cos$، والمقابل يأخذ $\sin$. ولإعادة التركيب نستخدم فيثاغورس و$\tan^{-1}$.`,
      tip: R`<b>Component never exceeds the magnitude</b>: $|A_x| \le A$. If the angle is from the $y$ axis, swap $\cos$ and $\sin$.`,
      ex: { src: 'Dr. Khalil · Test problem (dog on a leash)', p: R`A dog is held by a $100$ N force at $37^\circ$ above the horizontal. Find the horizontal and vertical components.`, steps: [R`$F_x = 100\cos 37^\circ \approx 80\ \text{N}$`, R`$F_y = 100\sin 37^\circ \approx 60\ \text{N}$`], a: R`$F_x \approx 80\ \text{N}, \;\; F_y \approx 60\ \text{N}$`, ar: 'الزاوية 37° من الأفقي، لذلك المركبة الأفقية بـ cos والرأسية بـ sin.' } },
    { id: 'unit', sec: 4, name: 'Unit-vector notation', tex: R`\vec A = A_x\,\hat i + A_y\,\hat j + A_z\,\hat k \qquad |\hat i| = |\hat j| = |\hat k| = 1`, note: R`$\hat i,\hat j,\hat k$ point along $+x,+y,+z$ and have length 1.`, when: R`A vector is written as $2\hat i + 3\hat j$, or you want to write one that way.`,
      ar: R`متجهات الوحدة $\hat i,\hat j,\hat k$ طول كل منها 1 وتشير إلى محاور $x,y,z$. كتابة المتجه بهذا الشكل تعني ببساطة <b>مركباته</b> مضروبة في اتجاهاتها.`,
      tip: R`$\hat i$-coefficient = $x$-component, $\hat j$-coefficient = $y$-component. The magnitude never includes the $\hat i,\hat j$ symbols.`,
      ex: { src: 'Lecture slides · Example 3.5 (first leg)', p: R`A hiker walks $25.0$ km at $45^\circ$ south of east. Write this displacement in unit-vector form and check its magnitude.`, steps: [R`$A_x = 25\cos 45^\circ = +17.7$ km; $\;A_y = -25\sin 45^\circ = -17.7$ km`, R`$\vec A = 17.7\,\hat i - 17.7\,\hat j$ km`, R`$|\vec A| = \sqrt{17.7^2 + 17.7^2} = 25.0$ km`], a: R`$\vec A = (17.7\,\hat i - 17.7\,\hat j)$ km`, ar: 'جنوب الشرق يعني x موجبة وy سالبة.' } },
    { id: 'addc', sec: 5, name: 'Add by components', tex: R`R_x = A_x + B_x + \dots \qquad R_y = A_y + B_y + \dots \qquad R = \sqrt{R_x^2 + R_y^2} \qquad \theta = \tan^{-1}\!\frac{R_y}{R_x}`, note: 'Works for any number of vectors. Add $x$ with $x$ and $y$ with $y$ only.', when: R`Two or more vectors are given by size and angle (or in $\hat i,\hat j$ form).`,
      ar: R`هذه هي الطريقة الأساسية: حلّل كل متجه إلى $x$ و$y$ ثم اجمع كل المركبات الأفقية معاً وكل الرأسية معاً. بعدها أعد التركيب لتحصل على مقدار المحصلة واتجاهها. <b>الجدول</b> يساعدك على عدم نسيان شيء.`,
      tip: R`Make a table: one row per vector, columns $x$ and $y$. Get the quadrant from the signs of $(R_x,R_y)$ before trusting $\tan^{-1}$.`,
      ex: { src: 'Lecture slides · Example 3.3', p: R`$\vec A = 2\hat i + 2\hat j$ and $\vec B = 2\hat i - 4\hat j$. Find $\vec R = \vec A + \vec B$, its magnitude and its direction.`, steps: [R`$R_x = 2+2 = 4,\;\; R_y = 2-4 = -2 \Rightarrow \vec R = 4\hat i - 2\hat j$`, R`$R = \sqrt{4^2 + 2^2} = 4.5$`, R`$\tan^{-1}(2/4) = 26.6^\circ$ below $+x$ $\Rightarrow \theta = 360^\circ - 26.6^\circ$`], a: R`$\vec R = 4\hat i - 2\hat j,\;\; R = 4.5,\;\; \theta = 333^\circ$`, ar: 'Rx موجبة وRy سالبة: الربع الرابع، أي 333° أو −26.6°.' } },
    { id: 'subc', sec: 5, name: 'Subtract by components', tex: R`\vec A - \vec B = (A_x - B_x)\,\hat i + (A_y - B_y)\,\hat j`, note: 'Subtract each component from its partner.', when: R`The question asks for $\vec A - \vec B$, or the vector that must be added to reach a target.`,
      ar: R`اطرح المركبة من نظيرتها ($x$ من $x$ و$y$ من $y$). ثم احسب المقدار كالمعتاد. إذا طُلب «المتجه الذي يلغي المحصلة» فهو سالب المحصلة.`,
      tip: R`Careful with double negatives: $A_x - B_x$ with $B_x = -4$ becomes $A_x + 4$.`,
      ex: { src: 'Doctor’s question set · Q15', p: R`$A_x = 5,\ A_y = 7$ and $B_x = 3,\ B_y = 2$. Find $|\vec A - \vec B|$.`, steps: [R`$\vec A - \vec B = (5-3)\hat i + (7-2)\hat j = 2\hat i + 5\hat j$`, R`$|\vec A - \vec B| = \sqrt{2^2 + 5^2}$`], a: R`$|\vec A - \vec B| = 5.4$`, ar: 'اطرح أولاً ثم احسب الطول.' } },
    { id: 'angbet', sec: 5, name: 'Angle between two vectors', tex: R`\phi = |\theta_A - \theta_B| \qquad \text{with } \theta = \tan^{-1}\!\frac{y}{x}\text{ for each vector}`, note: 'Find each vector’s direction first, then subtract the two angles.', when: R`The question asks for “the angle between $\vec A$ and $\vec B$”.`,
      ar: R`أوجد زاوية كل متجه من المحور $+x$ ثم اطرح الزاويتين. (اختصار يأتي لاحقاً في الدورة هو الضرب القياسي، لكنه ليس مطلوباً هنا).`,
      tip: R`Perpendicular vectors: $A_xB_x + A_yB_y = 0$. This is a quick check for “is the angle $90^\circ$?”.`,
      ex: { src: 'Doctor’s question set · Q24', p: R`Find the angle between $\vec A = 2\hat i + 3\hat j$ and $\vec B = 6\hat i - 4\hat j$.`, steps: [R`$\theta_A = \tan^{-1}(3/2) = 56.3^\circ$`, R`$\theta_B = \tan^{-1}(-4/6) = -33.7^\circ$`, R`$\phi = 56.3 - (-33.7)$`], a: R`$\phi = 90^\circ$`, ar: 'تحقق سريع: 2×6 + 3×(−4) = 0، فالمتجهان متعامدان.' } },
    { id: 'mag3d', sec: 6, name: '3-D magnitude', tex: R`R = \sqrt{R_x^2 + R_y^2 + R_z^2}`, note: 'Pythagoras with one more term.', when: R`A vector has $\hat k$ (a $z$-component).`,
      ar: R`في ثلاثة أبعاد نضيف مركبة $z$ تحت الجذر. أما الجمع والطرح فهما نفس الفكرة: كل محور وحده.`,
      tip: R`Do the addition/subtraction per axis first, <b>then</b> take one square root at the end.`,
      ex: { src: 'Doctor’s question set · Q1', p: R`$\vec A = 3\hat i - 2\hat j - 3\hat k$ and $\vec B = -4\hat i - 2\hat j - \hat k$. Find $|\vec A - \vec B|$.`, steps: [R`$\vec A - \vec B = (3+4)\hat i + (-2+2)\hat j + (-3+1)\hat k = 7\hat i + 0\hat j - 2\hat k$`, R`$|\vec A - \vec B| = \sqrt{7^2 + 0 + 2^2} = \sqrt{53}$`], a: R`$|\vec A - \vec B| = 7.3$`, ar: 'المركبة j تلاشت، ثم جذر واحد في النهاية.' } },
    { id: 'dircos', sec: 6, name: 'Direction cosines', tex: R`\cos\theta_x = \frac{R_x}{R} \quad \cos\theta_y = \frac{R_y}{R} \quad \cos\theta_z = \frac{R_z}{R} \qquad \cos^2\theta_x + \cos^2\theta_y + \cos^2\theta_z = 1`, note: 'Each angle is measured from its own axis.', when: R`You need the angles a 3-D vector makes with $x$, $y$ and $z$.`,
      ar: R`في ثلاثة أبعاد نصف الاتجاه بثلاث زوايا، كل واحدة مع محورها: جيب التمام = المركبة ÷ المقدار. ومجموع مربعات الثلاثة يساوي 1 (للتحقق من حسابك).`,
      tip: R`Use $\sum\cos^2 = 1$ as a free check on your three angles.`,
      ex: { src: 'Lecture slides · Example 3.4', p: R`A displacement is $\vec R = (25\hat i + 31\hat j + 7\hat k)$ cm. Find $R$ and the angles with the three axes.`, steps: [R`$R = \sqrt{25^2 + 31^2 + 7^2} = 40.4$ cm`, R`$\theta_x = \cos^{-1}(25/40.4) = 51.8^\circ$ (calculator)`, R`$\theta_y = \cos^{-1}(31/40.4) = 39.9^\circ$`, R`$\theta_z = \cos^{-1}(7/40.4) = 80.0^\circ$`], a: R`$R = 40.4\ \text{cm};\;\; \theta_x = 51.8^\circ,\; \theta_y = 39.9^\circ,\; \theta_z = 80.0^\circ$`, ar: 'كل زاوية تُحسب من المحور المقابل لها.' } }
  ];

  const traps = [
    'The calculator’s $\\tan^{-1}$ never returns a 2nd/3rd-quadrant angle. If $x<0$ add $180^\\circ$; look at the signs of $(x,y)$ first.',
    '**Add components, not magnitudes.** $|\\vec A + \\vec B| \\ne |\\vec A| + |\\vec B|$ unless they point the same way.',
    '“$30^\\circ$ south of east” means start from **east** and turn $30^\\circ$ toward south: $A_x = A\\cos 30^\\circ$, $A_y = -A\\sin 30^\\circ$.',
    'If the angle is measured from the $y$ axis, $\\cos$ and $\\sin$ swap roles.',
    'A component can never be larger than the vector: $|A_x| \\le A$.',
    '$\\vec B - \\vec A$ is **not** $\\vec A - \\vec B$: it is the reverse vector.',
    'Distance $\\ne$ displacement: displacement is the straight line from start to finish; distance is the path length. Average speed uses distance, average velocity uses displacement.',
    'Unspecified directions: $R_{max} = A+B$ (same direction), $R_{min} = |A-B|$ (opposite), and $R = 0$ needs equal sizes and opposite directions.',
    'Minutes to hours before dividing: $40\\ \\text{min} = 2/3\\ \\text{h}$.',
    'A magnitude is never negative. A negative $|\\vec A|$ means a mistake.',
    'A vector in unit-vector form has no angle in its coefficients: $2\\hat i + 3\\hat j$ means $A_x = 2, A_y = 3$.',
    'Calculator in **degree** mode, not radian.',
    'The angle between two vectors is the **difference** of their direction angles (use $|\\theta_A-\\theta_B|$).',
    'Return trip: the vector that brings you back is the **negative** of the resultant (same size, opposite direction).'
  ].map((html, i) => ({ id: 't' + (i + 1), html: html.replace(/\*\*(.+?)\*\*/g, '<b>$1</b>') }));

  const quick = [
    R`Polar ⇄ Cartesian: $x = r\cos\theta,\; y = r\sin\theta$ · $r = \sqrt{x^2 + y^2},\; \theta = \tan^{-1}(y/x)$ (+180° if $x<0$).`,
    R`Scalar: size only (distance, speed, time, mass). Vector: size + direction (displacement, velocity, force).`,
    R`$R_{max} = A+B$ (same direction) · $R_{min} = |A-B|$ (opposite) · $R = 0$: equal and opposite.`,
    R`Components: $A_x = A\cos\theta,\; A_y = A\sin\theta$; a component is never bigger than the vector.`,
    R`Add by components: $R_x = \sum x,\; R_y = \sum y$, then $R = \sqrt{R_x^2 + R_y^2}$ and $\theta = \tan^{-1}(R_y/R_x)$.`,
    R`$\vec A - \vec B$: subtract each component. Unit vectors $\hat i,\hat j,\hat k$ have length 1.`,
    R`3-D: $R = \sqrt{R_x^2 + R_y^2 + R_z^2}$, $\cos\theta_x = R_x/R$ and $\sum\cos^2 = 1$.`,
    R`Average velocity = (straight-line displacement) ÷ time; average speed = (total path) ÷ time.`
  ];

  const glossary = [
    ['Scalar', 'كمية قياسية (مقدار فقط)'], ['Vector', 'كمية متجهة (مقدار واتجاه)'], ['Magnitude', 'المقدار / الطول'], ['Direction', 'الاتجاه'], ['Resultant', 'المحصلة'],
    ['Component', 'مركبة'], ['Unit vector', 'متجه وحدة'], ['Polar coordinates', 'الإحداثيات القطبية'], ['Cartesian coordinates', 'الإحداثيات الكارتيزية'], ['Quadrant', 'ربع (من المستوى)'],
    ['Displacement', 'الإزاحة'], ['Distance', 'المسافة'], ['Due east / north', 'شرقاً / شمالاً تماماً'], ['North of east', 'شمال الشرق (من الشرق نحو الشمال)'], ['Tail / head', 'ذيل / رأس المتجه'],
    ['Negative of a vector', 'معاكس المتجه'], ['Law of cosines', 'قانون جيب التمام'], ['Direction cosines', 'جيوب تمام الاتجاه'], ['Perpendicular', 'متعامد']
  ];
  /* ---------------------------------------------------------------- lessons */
  const sections = [
    { id: 1, title: 'Coordinates: Cartesian and Polar', tr: 'الإحداثيات الكارتيزية والقطبية', blocks: [
      H('Two ways to name a point'),
      ARX(R`نحدد نقطة في المستوى بطريقتين: <b>كارتيزية</b> $(x,y)$ أي كم نتحرك أفقياً ورأسياً، أو <b>قطبية</b> $(r,\theta)$ أي كم نبعد عن الأصل وبأي زاوية من المحور $+x$. المهم أن تتقن الانتقال بين الطريقتين لأنه أساس كل الفصل.`),
      FIG(V.polar()),
      LAWS('Polar → Cartesian and back', ['p2c', 'c2p']),
      H('The quadrant trap'),
      ARX(R`الحاسبة تعطيك دائماً زاوية بين $-90^\circ$ و$90^\circ$. فإذا كانت النقطة على يسار المحور $y$ (أي $x<0$) فالزاوية الصحيحة هي ما تعطيه الحاسبة <b>زائد</b> $180^\circ$. ارسم النقطة أولاً وسترى الربع فوراً.`),
      FIG(V.quad()),
      PIT(R`Point $(-3.50,-2.50)$: the calculator shows $35.5^\circ$, but the point is in the 3rd quadrant, so $\theta = 180^\circ + 35.5^\circ = 216^\circ$.`),
      TBL(['Signs of $(x, y)$', 'Quadrant', 'True angle'], [[R`$(+,+)$`, '1st', R`$\tan^{-1}(y/x)$`], [R`$(-,+)$`, '2nd', R`$180^\circ + \tan^{-1}(y/x)$ (negative result)`], [R`$(-,-)$`, '3rd', R`$180^\circ + \tan^{-1}(y/x)$`], [R`$(+,-)$`, '4th', R`$360^\circ + \tan^{-1}(y/x)$, or just the negative angle`]]),
      SUM([R`$x = r\cos\theta,\; y = r\sin\theta$ · $r = \sqrt{x^2+y^2}$.`, R`$x<0 \Rightarrow$ add $180^\circ$ to the calculator’s angle.`])
    ] },
    { id: 2, title: 'Scalars and Vectors', tr: 'الكميات القياسية والمتجهة', blocks: [
      H('Scalar or vector?'),
      ARX(R`<b>الكمية القياسية</b> ${E('scalar')} لها مقدار فقط: المسافة، السرعة القياسية، الزمن، الكتلة، درجة الحرارة. <b>الكمية المتجهة</b> ${E('vector')} لها مقدار واتجاه: الإزاحة، السرعة المتجهة، التسارع، القوة. نرمز للمتجه بسهم فوق الحرف $\vec A$ والمقدار $|\vec A|=A$.`),
      TBL(['Scalar (size only)', 'Vector (size + direction)'], [['Distance', 'Displacement'], ['Speed', 'Velocity'], ['Time, mass, temperature', 'Acceleration, force']]),
      H('Displacement vs distance'),
      ARX(R`الإزاحة هي الخط المستقيم من نقطة البداية إلى نقطة النهاية. المسافة هي طول الطريق الذي مشيته فعلاً. المسافة أكبر أو تساوي مقدار الإزاحة دائماً.`),
      EX({ src: 'Dr. Khalil · skier example', p: R`A skier goes $A \to B \to C \to D$, reversing direction at each point: $AB = 180$ m, $BC = 140$ m, $CD = 100$ m, and $D$ is $140$ m east of $A$. Find the distance and the displacement.`,
        steps: [R`Distance $= 180 + 140 + 100 = 420\ \text{m}$`, R`Displacement $= \overline{AD} = 140\ \text{m}$ due east`], a: R`Distance $=420$ m, displacement $=140$ m east`, ar: 'المسافة تجمع كل الأجزاء، والإزاحة تنظر للبداية والنهاية فقط.' }),
      H('Velocity vs speed with several legs'),
      LAWS('Average velocity and average speed', ['avgvec']),
      PIT(R`Convert minutes to hours <b>before</b> dividing: $40\ \text{min} = 2/3\ \text{h}$.`),
      SUM([R`Vectors have a direction; scalars do not.`, R`Velocity ↔ displacement; speed ↔ distance.`])
    ] },
    { id: 3, title: 'Adding and Subtracting Vectors', tr: 'جمع المتجهات وطرحها (هندسياً)', blocks: [
      H('Head-to-tail addition'),
      ARX(R`لجمع متجهين ارسم الثاني بحيث يبدأ <b>ذيله</b> من <b>رأس</b> الأول. المحصلة $\vec R$ هي السهم من ذيل الأول إلى رأس الثاني. الترتيب غير مهم، وهذا يعطي نفس النتيجة لأي عدد من المتجهات.`),
      FIG(V.addFig()),
      H('Subtraction and the rules'),
      ARX(R`الطرح $\vec A-\vec B$ هو نفسه $\vec A+(-\vec B)$: اقلب اتجاه $\vec B$ ثم اجمع.`),
      FIG(V.subFig()),
      LAWS('Rules of vector algebra', ['rules']),
      H('Largest and smallest resultant'),
      ARX(R`إذا أُعطيت المقدارين فقط تتحدد المحصلة بين حدين، تبعاً للزاوية بين المتجهين.`),
      FIG(V.maxmin()),
      LAWS('Maximum and minimum', ['maxmin']),
      EX({ src: 'Lecture slides · Quick Quiz 3.3', p: R`Two vectors have magnitudes $12$ and $8$. What must be true for $\vec A + \vec B = 0$?`, steps: [R`The sizes must be equal, but $12 \ne 8$, so it is impossible for these two.`, R`In general: $\vec A + \vec B = 0$ needs equal sizes and opposite directions.`], a: R`Impossible here; in general only equal sizes + opposite directions`, ar: 'المحصلة صفر تحتاج شرطين معاً: نفس الطول واتجاهان متعاكسان.' }),
      H('Law of cosines for two vectors'),
      FIG(V.car()),
      LAWS('Law of cosines', ['lawcos']),
      TIP(R`Two vectors only, and the angle is easy to read? Law of cosines is fast. Three or more vectors? Always use components (Lesson 5).`),
      SUM([R`Head-to-tail; order does not matter.`, R`$R_{max} = A+B$, $R_{min} = |A-B|$.`, R`$R = \sqrt{A^2+B^2+2AB\cos\phi}$.`])
    ] },
    { id: 4, title: 'Components and Unit Vectors', tr: 'المركبات ومتجهات الوحدة', blocks: [
      H('Breaking a vector into $x$ and $y$'),
      ARX(R`يمكن استبدال أي متجه بمتجهين متعامدين: واحد أفقي $A_x$ وواحد رأسي $A_y$. هما ضلعا المثلث القائم الذي وتره المتجه نفسه. لذلك المركبة لا تكون أكبر من المتجه أبداً.`),
      FIG(V.comps()),
      LAWS('Components', ['comp']),
      H('Direction words: “north of east”, “west of south”'),
      ARX(R`العبارة «$\theta$ شمال الشرق» تعني: ابدأ من اتجاه الشرق ثم دُر بمقدار $\theta$ نحو الشمال. الكلمة الأولى بعد الزاوية هي <b>الاتجاه الذي ننطلق منه</b>، والكلمة الثانية هي <b>الجهة التي ننحرف إليها</b>.`),
      FIG(V.bearing()),
      PIT(R`“$37^\circ$ south of east”: $A_x = +A\cos 37^\circ$ and $A_y = -A\sin 37^\circ$. If the problem says “$37^\circ$ with the $y$ axis”, then $\cos$ and $\sin$ swap.`),
      EX({ src: 'Dr. Khalil · superman and tow-truck examples', p: R`(a) A $100$ m displacement at $330^\circ$: find $D_x, D_y$. (b) A cable tension of $1000$ N at $60^\circ$ to the horizontal: find the vertical component that lifts the car.`,
        steps: [R`(a) $D_x = 100\cos 330^\circ = +86.6$ m; $\;D_y = 100\sin 330^\circ = -50.0$ m (calculator)`, R`(b) $F_y = 1000\sin 60^\circ = 866$ N`], a: R`(a) $(86.6,\,-50.0)$ m  (b) $F_y \approx 866$ N`, ar: 'الزاوية 330° في الربع الرابع، لذلك x موجبة وy سالبة.' }),
      H('Unit vectors'),
      ARX(R`بدل أن نقول «3 في اتجاه $x$ و4 في اتجاه $y$» نكتب $3\hat i + 4\hat j$. المتجه $\hat i$ طوله 1 على المحور $x$، و$\hat j$ على $y$، و$\hat k$ على $z$.`),
      LAWS('Unit-vector notation', ['unit']),
      SUM([R`$A_x = A\cos\theta$, $A_y = A\sin\theta$; $|A_x| \le A$.`, R`Read direction words carefully: the first word is where you start from.`, R`$\vec A = A_x\hat i + A_y\hat j$.`])
    ] },
    { id: 5, title: 'Adding Vectors by Components', tr: 'جمع المتجهات بالمركبات', blocks: [
      H('The component method'),
      ARX(R`هذه هي الطريقة الأهم في الاختبار. الخطوات: (1) ارسم مخططاً سريعاً. (2) حلّل كل متجه إلى $x$ و$y$ في جدول. (3) اجمع عمود $x$ وعمود $y$. (4) احسب $R$ و$\theta$ مع مراعاة الربع.`),
      LAWS('Add and subtract by components', ['addc', 'subc']),
      TBL(['Vector', 'Angle', '$x$-component', '$y$-component'], [['$A$', R`$\theta_A$`, R`$A\cos\theta_A$`, R`$A\sin\theta_A$`], ['$B$', R`$\theta_B$`, R`$B\cos\theta_B$`, R`$B\sin\theta_B$`], ['$R$', '', R`$R_x = \sum x$`, R`$R_y = \sum y$`]]),
      EX({ src: 'Lecture slides · Example 3.5 (hiker, several ideas)', p: R`Day 1: $25.0$ km at $45^\circ$ south of east. Day 2: $40.0$ km at $60^\circ$ north of east. Find the total displacement, and the vector that brings the hiker back to camp.`,
        steps: [R`Day 1: $(+17.7,\,-17.7)$ km. Day 2: $(40\cos 60^\circ,\,40\sin 60^\circ) = (+20.0,\,+34.6)$ km (calculator)`, R`$R_x = 17.7 + 20.0 = 37.7,\;\; R_y = -17.7 + 34.6 = 17.0$`, R`$R = \sqrt{37.7^2 + 17.0^2} = 41.4$ km, $\;\tan^{-1}(17.0/37.7) = 24.3^\circ$ north of east`, R`Return vector $= -\vec R$: $41.4$ km at $24.3^\circ$ south of west`], a: R`$\vec R = (37.7\,\hat i + 17.0\,\hat j)$ km, $R = 41.4$ km; return $=41.4$ km, $24.3^\circ$ south of west`, ar: 'الرجوع هو المعاكس تماماً: نفس الطول واتجاه معاكس.' }),
      FIG(V.hiker()),
      H('Three or more vectors and cancelling forces'),
      ARX(R`إذا أردنا قوة رابعة $\vec D$ تلغي القوى الثلاث فالمطلوب: $\vec A+\vec B+\vec C+\vec D=0$، أي أن $\vec D$ هي سالب مجموع القوى الثلاث.`),
      EX({ src: 'Dr. Khalil · fourth force that cancels', p: R`Three forces pull a box: $100$ N at $30^\circ$, $80$ N at $120^\circ$, $40$ N at $233^\circ$. Find the fourth force that makes the resultant zero.`,
        steps: [R`$x$: $86.6 - 40.0 - 24.1 = 22.5$ ; $\;y$: $50.0 + 69.3 - 31.9 = 87.4$ (calculator)`, R`$\vec D = (-22.5,\,-87.4)$ N`, R`$D = \sqrt{22.5^2 + 87.4^2} = 90.2$ N, in the 3rd quadrant`], a: R`$D = 90.2$ N (opposite to the sum of the three)`, ar: 'القوة الرابعة هي معاكس المحصلة.' }),
      H('Angle between two vectors'),
      LAWS('Angle between vectors', ['angbet']),
      SUM([R`Table method: $\sum x$, $\sum y$, then $R$ and $\theta$.`, R`Cancelling vector $= -\vec R$.`, R`Check the quadrant from the signs of $(R_x,R_y)$.`])
    ] },
    { id: 6, title: 'Vectors in 3-D', tr: 'المتجهات في ثلاثة أبعاد', blocks: [
      H('A third component'),
      ARX(R`في ثلاثة أبعاد نضيف المحور $z$ والمتجه $\hat k$. كل الأفكار السابقة تبقى كما هي: اجمع واطرح كل محور وحده، وعند الحاجة للطول نضيف حداً ثالثاً تحت الجذر.`),
      FIG(V.box3d()),
      LAWS('3-D magnitude and direction', ['mag3d', 'dircos']),
      EX({ src: 'Dr. Khalil · row-vector form', p: R`Write $(2,\,3,\,-5)$ with unit vectors, then find its magnitude and the angle with the $z$ axis.`, steps: [R`$(2,3,-5) = 2\hat i + 3\hat j - 5\hat k$`, R`$R = \sqrt{4 + 9 + 25} = \sqrt{38} = 6.16$`, R`$\cos\theta_z = -5/6.16 \Rightarrow \theta_z = 144.2^\circ$ (calculator)`], a: R`$R = 6.16$, $\theta_z \approx 144^\circ$`, ar: 'الزاوية أكبر من 90° لأن مركبة z سالبة.' }),
      SUM([R`$R = \sqrt{R_x^2+R_y^2+R_z^2}$.`, R`$\cos\theta_i = R_i/R$ and $\sum\cos^2 = 1$.`])
    ] }
  ];

  /* ---------------------------------------------------------------- questions */
  const Q = [];
  const ask = (s) => `<p class="ask">${s}</p>`;
  const mcq = (id, sec, html, opts, ok, expl, o) => Q.push(Object.assign({ id, sec, imp: 3, kind: 'mcq', html, options: opts.map((t, i) => ({ t, ok: i === ok })), expl }, o));
  const numq = (id, sec, html, ans, unit, expl, o) => Q.push(Object.assign({ id, sec, imp: 3, kind: 'num', html, ans, unit, expl }, o));
  const TF = ['True', 'False'];

  /* ---- Lecture slides and Dr. Khalil's examples ---- */
  numq('d1a', 1, ask(R`Example 3.1: a point has Cartesian coordinates $(x,y) = (-3.50,\,-2.50)$ m. Find $r$ (m).`), 4.30, 'm', R`$r = \sqrt{3.50^2 + 2.50^2} = 4.30\ \text{m}$.`, { grp: 'Example 3.1' });
  numq('d1b', 1, ask(R`Same point: find $\theta$ measured from the $+x$ axis (degrees).`), 216, '°', R`Calculator: $\tan^{-1}(2.5/3.5) = 35.5^\circ$; the point is in the 3rd quadrant, so $\theta = 180^\circ + 35.5^\circ \approx 216^\circ$.`, { tol: 1, grp: 'Example 3.1' });
  numq('d2', 1, ask(R`A point is at $r = 8.00$ m and $\theta = 30^\circ$. Find its $x$ coordinate (m).`), 6.93, 'm', R`$x = 8\cos 30^\circ = 6.93\ \text{m}$ (and $y = 8\sin 30^\circ = 4.00$ m).`, { ref: 'Practice (from Lecture slides · Example 3.1)' });
  mcq('d3', 2, ask('Which of these is a <b>scalar</b>?'), ['Displacement', 'Velocity', 'Force', 'Speed', 'Acceleration'], 3, 'Speed has size only. The others all have a direction.');
  numq('d4a', 2, ask(R`Skier: $AB = 180$ m, $BC = 140$ m, $CD = 100$ m, reversing direction at each point, ending $140$ m east of $A$. The distance travelled (m)?`), 420, 'm', R`$180 + 140 + 100 = 420\ \text{m}$.`, { grp: 'Skier example', ref: 'Dr. Khalil · skier example' });
  numq('d4b', 2, ask('Same skier: the magnitude of the displacement (m)?'), 140, 'm', 'Displacement = straight line from A to D = 140 m east.', { grp: 'Skier example', ref: 'Dr. Khalil · skier example' });
  mcq('d5', 3, ask(R`Quick Quiz 3.3: two vectors have magnitudes $12$ and $8$. Which is true about $\vec A + \vec B$?`), ['It can be 0', 'It is at least 4 and at most 20', 'It is always 20', 'It is always 4'], 1, R`$R_{min} = 12-8 = 4$ and $R_{max} = 12+8 = 20$. Zero needs equal sizes.`);
  numq('d6a', 3, ask(R`Example 3.2: a car drives $20.0$ km north then $35.0$ km at $60^\circ$ west of north. The magnitude of the resultant displacement (km)?`), 48.2, 'km', R`$R^2 = 20^2 + 35^2 + 2(20)(35)\cos 60^\circ = 2325 \Rightarrow R = 48.2\ \text{km}$.`, { grp: 'Example 3.2' });
  numq('d6b', 3, ask(R`Same car: the angle of the resultant measured from north towards west (degrees)?`), 39.0, '°', R`$\sin\beta = 35\sin 60^\circ/48.2 \Rightarrow \beta = 39.0^\circ$ west of north (polar angle $90^\circ + 39.0^\circ = 129^\circ$).`, { tol: 0.6, grp: 'Example 3.2' });
  numq('d18', 3, ask(R`A student walks $1$ km due north then $2$ km due east. Find the magnitude of the resultant displacement (km).`), 2.24, 'km', R`$R = \sqrt{2^2 + 1^2} = \sqrt5 = 2.24\ \text{km}$, at $63.4^\circ$ east of north.`, { tol: 0.04, ref: 'Dr. Khalil · test problem' });
  mcq('d7', 4, ask(R`Quick Quiz 3.4: the magnitude of a component of a vector can be larger than the magnitude of the vector.`), TF, 1, R`False. $A_x = A\cos\theta$ and $|\cos\theta| \le 1$.`);
  numq('d8a', 4, ask(R`A dog is held by a $100$ N force at $37^\circ$ above the horizontal. The horizontal component (N)?`), 80, 'N', R`$F_x = 100\cos 37^\circ \approx 80\ \text{N}$.`, { tol: 1.5, grp: 'Dog on a leash', ref: 'Dr. Khalil · test problem' });
  numq('d8b', 4, ask('Same force: the vertical component (N)?'), 60, 'N', R`$F_y = 100\sin 37^\circ \approx 60\ \text{N}$.`, { tol: 1.5, grp: 'Dog on a leash', ref: 'Dr. Khalil · test problem' });
  numq('d9a', 4, ask(R`Superman’s displacement is $100$ m at $330^\circ$. Its $x$-component (m)?`), 86.6, 'm', R`$D_x = 100\cos 330^\circ = +86.6\ \text{m}$.`, { grp: 'Superman', ref: 'Dr. Khalil · example' });
  numq('d9b', 4, ask('Same displacement: its $y$-component (m)?'), -50, 'm', R`$D_y = 100\sin 330^\circ = -50.0\ \text{m}$ (4th quadrant: negative).`, { grp: 'Superman', ref: 'Dr. Khalil · example' });
  numq('d10', 4, ask(R`A tow-truck cable has tension $1000$ N at $60^\circ$ to the horizontal. The vertical component (N) that lifts the car?`), 866, 'N', R`$F_y = 1000\sin 60^\circ = 866\ \text{N}$.`, { ref: 'Dr. Khalil · example' });
  mcq('d11', 4, ask(R`A velocity has $V_x = 20$ and $V_y = 5$. Its direction with the $x$ axis is:`), ['76°', '60°', '40°', '14°', '10°'], 3, R`$\tan\theta = 5/20 = 0.25 \Rightarrow \theta = 14^\circ$.`, { ref: 'Dr. Khalil · example' });
  numq('d12', 5, ask(R`Example 3.3: $\vec A = 2\hat i + 2\hat j$, $\vec B = 2\hat i - 4\hat j$. The magnitude of $\vec A + \vec B$?`), 4.47, 'units', R`$\vec R = 4\hat i - 2\hat j \Rightarrow R = \sqrt{20} = 4.5$; direction $333^\circ$ (4th quadrant).`, { tol: 0.1, ref: 'Lecture slides · Example 3.3' });
  numq('d13', 5, ask(R`Example 3.5: a hiker’s day 1 is $(17.7,\,-17.7)$ km and day 2 is $(20.0,\,34.6)$ km. The magnitude of the total displacement (km)?`), 41.4, 'km', R`$\vec R = (37.7,\,17.0) \Rightarrow R = 41.4\ \text{km}$.`, { tol: 0.4, ref: 'Lecture slides · Example 3.5' });
  numq('d14', 5, ask(R`$F_1 = 50$ N at $53^\circ$ above $+x$ and $F_2 = 50$ N at $37^\circ$ above $-x$. The magnitude of the net force (N)?`), 70.7, 'N', R`$F_x = 30 - 40 = -10$, $F_y = 40 + 30 = 70 \Rightarrow F = \sqrt{5000} = 70.7\ \text{N}$.`, { tol: 0.7, ref: 'Dr. Khalil · test problem (figure described in words)' });
  numq('d15', 5, ask(R`A postman walks $2.6$ km at $90^\circ$, $4.0$ km at $0^\circ$ and $3.1$ km at $45^\circ$. The magnitude of the total displacement (km)?`), 7.84, 'km', R`$R_x = 0 + 4.0 + 2.2 = 6.2$, $R_y = 2.6 + 0 + 2.2 = 4.8 \Rightarrow R = 7.8\ \text{km}$ at $37.7^\circ$.`, { tol: 0.12, ref: 'Dr. Khalil · postman example' });
  numq('d16', 5, ask(R`Forces $100$ N at $30^\circ$, $80$ N at $120^\circ$ and $40$ N at $233^\circ$ act on a box. The magnitude of the fourth force that cancels the resultant (N)?`), 90.2, 'N', R`Sum $= (22.5,\,87.4)$ N, so $D = -(22.5,\,87.4)$, $D = 90.2\ \text{N}$ (3rd quadrant).`, { tol: 1, ref: 'Dr. Khalil · fourth force' });
  numq('d17', 5, ask(R`Two vectors: $12$ at $20^\circ$ and $25$ at $60^\circ$. The magnitude of the resultant?`), 35.1, 'units', R`$R_x = 11.3 + 12.5 = 23.8$, $R_y = 4.1 + 21.7 = 25.8 \Rightarrow R = 35.1$, at $47.3^\circ$.`, { tol: 0.5, ref: 'Dr. Khalil · table example' });
  mcq('d20', 5, ask(R`Forces $\vec F_1 = (-10\hat i + 5\hat j)$ N and $\vec F_2 = (10\hat i + 15\hat j)$ N act on an object. The magnitude of the total force is:`), ['20 N', '25 N', '30 N', '35 N', '40 N'], 0, R`$\vec F = 0\hat i + 20\hat j \Rightarrow F = 20\ \text{N}$.`, { ref: 'Dr. Khalil · test problem' });
  numq('d19a', 6, ask(R`Example 3.4: a total displacement is $\vec R = (25\hat i + 31\hat j + 7\hat k)$ cm. Find $R$ (cm).`), 40.4, 'cm', R`$R = \sqrt{625 + 961 + 49} = 40.4\ \text{cm}$.`, { tol: 0.4, grp: 'Example 3.4' });
  numq('d19b', 6, ask('Same vector: the angle with the $x$ axis (degrees).'), 51.8, '°', R`$\cos\theta_x = 25/40.4 = 0.619 \Rightarrow \theta_x = 51.8^\circ$.`, { tol: 0.8, grp: 'Example 3.4' });
  numq('d21', 6, ask(R`The vector $(2,\,3,\,-5)$: find its magnitude.`), 6.16, 'units', R`$\sqrt{4+9+25} = \sqrt{38} = 6.16$.`, { tol: 0.1, ref: 'Dr. Khalil · row-vector form' });
  mcq('d22', 6, ask(R`For any 3-D vector, $\cos^2\theta_x + \cos^2\theta_y + \cos^2\theta_z$ equals:`), ['0', '1', '2', '3'], 1, R`Always $1$: each term is $(R_i/R)^2$ and $R_x^2 + R_y^2 + R_z^2 = R^2$.`, { ref: 'Lecture slides · 3-D vectors' });

  /* ---- Doctor's question set (answer-key PDF) ---- */
  const k = (n, ...a) => { const f = a[0] === 'm' ? mcq : numq; f.apply(null, ['k' + n].concat(a.slice(1))); };
  k(1, 'm', 6, ask(R`$\vec A = 3\hat i - 2\hat j - 3\hat k$ and $\vec B = -4\hat i - 2\hat j - \hat k$. The magnitude $|\vec A - \vec B|$ is closest to:`), ['1.6', '7.3', '10', '23.5'], 1, R`$\vec A - \vec B = 7\hat i + 0\hat j - 2\hat k \Rightarrow \sqrt{49 + 4} = 7.3$.`);
  k(2, 'm', 5, ask(R`A car travels $6$ km due east, then $8$ km due north, and finally $3$ km at $30^\circ$ south of east. The magnitude of the resultant displacement (km) is:`), ['10.2', '7.33', '8.22', '9.24', 'None of the above'], 3, R`<b>The answer key gives 9.24.</b> That matches the last leg making $30^\circ$ with the <i>south</i> axis: $(6+3\cos 60^\circ,\;8-3\sin 60^\circ) = (7.5,\,5.4) \Rightarrow 9.24$. Read literally as $30^\circ$ below east you would get $10.8$ km. In the exam, follow the figure.`);
  k(3, 'm', 5, ask(R`A hiker walks $10$ km due north, then $12$ km due east, then $6.0$ km due north. The magnitude of the overall displacement (km) is:`), ['5', '10', '15', '20', 'None of the above'], 3, R`North: $10 + 6 = 16$, east: $12 \Rightarrow \sqrt{16^2 + 12^2} = 20\ \text{km}$ (a 3-4-5 triangle times 4).`);
  k(4, 'm', 5, ask(R`A plane flies $30$ km due east for $10$ min, then $40$ km due north for $40$ min. The average <b>speed</b> (km/h) is:`), ['42.9', '50.0', '70.0', '84.0', '30.0'], 3, R`Speed uses the path: $70\ \text{km}$ in $50\ \text{min} = 5/6\ \text{h} \Rightarrow 84\ \text{km/h}$.`);
  k(5, 'm', 5, ask(R`A plane flies $30$ km due east for $60$ min, then $40$ km due north for $40$ min. The magnitude of the average <b>velocity</b> (km/h) is:`), ['30.0', '33.3', '42.9', '50.0', '60.0'], 0, R`Displacement $= 50$ km in $100\ \text{min} = 5/3\ \text{h} \Rightarrow 30\ \text{km/h}$.`);
  k(6, 'm', 4, ask(R`$\vec A = -1.0\hat i - 4.0\hat j$ and $\vec B = 3.0\hat i + 4.0\hat j$. The angle of their resultant with the $x$ axis is:`), ['56°', '45°', '25°', '27°', '0.0°'], 4, R`$\vec R = 2\hat i + 0\hat j$ lies along $+x$, so the angle is $0^\circ$.`);
  k(7, 'm', 5, ask(R`Mustafa walks $3.0$ km due north, then $3$ km at $37^\circ$ south of east, then $4$ km due west. The magnitude of his total displacement is:`), ['4', '3', '2', '1'], 2, R`Leg 2: $(2.4,\,-1.8)$. Total: $x = 2.4 - 4 = -1.6$, $y = 3 - 1.8 = 1.2 \Rightarrow \sqrt{1.6^2 + 1.2^2} = 2\ \text{km}$.`);
  k(8, 'm', 3, ask(R`$\vec A$ points from the origin into the 2nd quadrant and $\vec B$ into the 4th. The vector $\vec B - \vec A$ must be in the 4th quadrant.`), TF, 0, R`True. $\vec B = (+,-)$ and $-\vec A = (+,-)$, so the sum is $(+,-)$.`);
  k(9, 'm', 5, ask(R`A boy undergoes displacements $\vec D_1 = (3\hat i + 2\hat j)$ m and $\vec D_2 = (-2\hat i + 2\hat j)$ m. The direction of $\vec D_1 + \vec D_2$ is:`), ['76°', '90°', '−14°', '0°'], 0, R`$\vec R = \hat i + 4\hat j \Rightarrow \tan^{-1}(4/1) = 76^\circ$.`);
  k(10, 'm', 4, ask(R`Vector $\vec A$ has an $x$ component of $3$ and a $y$ component of $4$. The angle with the $x$ axis is:`), ['53.1°', '36.9°', '45°', '23.1°'], 0, R`$\tan\theta = 4/3 \Rightarrow \theta = 53.1^\circ$ (calculator).`);
  k(11, 'm', 5, ask(R`$|\vec A| = 5$ at $30^\circ$ with the $x$ axis; $|\vec B| = 10$ at $60^\circ$ with the $x$ axis. The magnitude of the resultant is:`), ['12.3', '14.5', '15', '8'], 1, R`Angle between them is $30^\circ$: $R^2 = 25 + 100 + 2(5)(10)\cos 30^\circ = 211.6 \Rightarrow R = 14.5$. (Components give the same.)`);
  k(12, 'm', 3, ask('Two vectors have magnitudes 2 and 4 (unspecified direction). The <b>maximum</b> magnitude of their sum is:'), ['6', '2', '4.24', '8'], 0, R`$R_{max} = 2 + 4 = 6$ (same direction).`, { grp: 'Magnitudes 2 and 4' });
  k(13, 'm', 3, ask('The same two vectors (2 and 4): the <b>minimum</b> magnitude of their sum is:'), ['zero', '2', '4', '1'], 1, R`$R_{min} = |4 - 2| = 2$ (opposite directions).`, { grp: 'Magnitudes 2 and 4' });
  k(14, 'm', 4, ask('The magnitude of a vector can be less than the magnitude of one of its components.'), TF, 1, R`False: $|A_x| = A|\cos\theta| \le A$.`);
  k(15, 'm', 5, ask(R`$A_x = 5,\ A_y = 7$ and $B_x = 3,\ B_y = 2$. The magnitude of $\vec A - \vec B$ is:`), ['12.1', '5.4', '5.0', '7.2'], 1, R`$(2,\,5) \Rightarrow \sqrt{29} = 5.4$.`);
  k(16, 'm', 5, ask(R`When $\vec B$ is subtracted from $\vec A$ ($A_x = 3,\ A_y = 4$), the result points along $+x$ and has the same magnitude as $\vec A$. The magnitude of $\vec B$ is:`), ['4.5', '6.1', '0', '5'], 0, R`$\vec A - \vec B = (5,\,0) \Rightarrow \vec B = (3-5,\,4-0) = (-2,\,4) \Rightarrow B = \sqrt{20} = 4.5$.`);
  k(17, 'm', 5, ask(R`$A = (3,4)$, $B = (5,12)$, $C = (1,2)$. The magnitude of $\vec A - \vec B - \vec C$ is:`), ['13.1', '10.4', '−9.5', '3.0'], 1, R`$(3-5-1,\;4-12-2) = (-3,\,-10) \Rightarrow \sqrt{109} = 10.4$. Magnitudes are never negative.`, { grp: 'A − B − C' });
  k(18, 'm', 5, ask(R`For the previous vector $\vec A - \vec B - \vec C = (-3,-10)$, it points in the:`), ['first quadrant', 'second quadrant', 'third quadrant', 'fourth quadrant'], 2, R`Both components negative $\Rightarrow$ 3rd quadrant.`, { grp: 'A − B − C' });
  k(19, 'm', 5, ask(R`You walk $100$ m due south, then $50$ m in a direction $45^\circ$ north of east. Your total displacement is:`), ['150 m', '135.4 m', '73.7 m', '64.6 m'], 2, R`Leg 2: $(35.4,\,35.4)$. Total: $(35.4,\,-64.6) \Rightarrow R = 73.7\ \text{m}$.`, { grp: '100 m south, then 50 m' });
  k(20, 'm', 5, ask('For the previous walk, the displacement makes what angle with the $x$ axis?'), ['61.3°', '−61.3°', '−26.6°', '−45°'], 1, R`$\tan^{-1}(-64.6/35.4) = -61.3^\circ$ (4th quadrant: $x>0,\ y<0$).`, { grp: '100 m south, then 50 m' });
  k(21, 'm', 5, ask(R`$|\vec A| = 3.6$ at $70^\circ$ with the $x$ axis; $|\vec B| = 2.4$ at $30^\circ$ with the negative $x$ axis. The magnitude of $\vec A + \vec B$ is:`), ['2.3', '3.4', '5.5', '6.3'], 0, R`<b>Key: 2.3.</b> This matches $\vec B$ pointing $30^\circ$ <i>below</i> the $-x$ axis: $\vec A = (1.23,\,3.38)$, $\vec B = (-2.08,\,-1.2) \Rightarrow (-0.85,\,2.18) \Rightarrow 2.3$. If $\vec B$ pointed above the axis you would get $4.7$. Check the figure in the exam.`);
  k(23, 'm', 5, ask(R`The magnitude of the difference of the two unit vectors $\hat i$ and $\hat j$ is:`), ['2', '0', '1.4', '0.7'], 2, R`$\hat i - \hat j = (1,\,-1) \Rightarrow \sqrt2 = 1.4$.`);
  k(24, 'm', 5, ask(R`The angle between $\vec A = 2\hat i + 3\hat j$ and $\vec B = 6\hat i - 4\hat j$ is:`), ['56.3°', '90.0°', '123.7°', '0°'], 1, R`$\theta_A = 56.3^\circ$, $\theta_B = -33.7^\circ$, difference $= 90^\circ$. Check: $2\cdot 6 + 3\cdot(-4) = 0$.`);

  /* ---- Tutorial ---- */
  mcq('t1', 3, ask(R`A car travels $3$ km due east and then $4$ km due north. The magnitude of the displacement (km) is:`), ['5', '10', '15', '20'], 0, R`$\sqrt{3^2 + 4^2} = 5\ \text{km}$.`, { ref: 'Tutorial · Q1' });
  mcq('t2', 2, ask(R`A plane flies $30$ km east for $15$ min, then $40$ km north for $60$ min. The magnitude of the average velocity (km/h) is:`), ['40', '50', '66.7', '100', '110'], 0, R`$|\Delta\vec r| = 50$ km; $\Delta t = 75\ \text{min} = 1.25\ \text{h} \Rightarrow 40\ \text{km/h}$. (The average <i>speed</i> would be $70/1.25 = 56$.)`, { ref: 'Tutorial · Q2' });
  mcq('t4', 5, ask(R`A man walks $d_1 = 10$ m along $+x$, then $d_2 = 5$ m parallel to $+y$, then $d_3 = 21$ m at $37^\circ$ with the negative $x$ axis (up and to the left). The magnitude of the resultant displacement (m) is:`), ['12.8', '15.6', '18.9', '21.5', '24.2'], 2, R`$x = 10 - 21\cos 37^\circ = -6.8$, $y = 5 + 21\sin 37^\circ = 17.6 \Rightarrow R = 18.9\ \text{m}$ (calculator). The figure is described in words here.`, { ref: 'Tutorial · Q4 (figure described in words)' });

  /* ---------------------------------------------------------------- hints */
  const HD = { 1: ['Polar ⇄ Cartesian', ['p2c', 'c2p'], 'ارسم النقطة لتعرف الربع ثم طبّق القانون.'], 2: ['Scalar / vector / velocity vs speed', ['avgvec'], 'فرّق بين الإزاحة والمسافة.'], 3: ['Graphical addition', ['maxmin', 'lawcos'], 'ارسم رأس-إلى-ذيل أو استخدم قانون جيب التمام.'], 4: ['Components', ['comp', 'unit'], 'المجاور للزاوية cos والمقابل sin.'], 5: ['Component method', ['addc', 'subc'], 'جدول x وy ثم اجمع.'], 6: ['3-D vectors', ['mag3d', 'dircos'], 'جذر ثلاثة حدود.'] };
  const HT = {
    d1a: ['Cartesian → r', ['c2p'], 'فيثاغورس: r = √(x² + y²).'], d1b: ['Cartesian → angle (3rd quadrant)', ['c2p'], 'الحاسبة تعطي 35.5°، والنقطة في الربع الثالث فأضف 180°.'], d2: ['Polar → x', ['p2c'], 'x = r cos θ.'],
    d3: ['Concept: scalar', ['avgvec'], 'الكمية القياسية لا اتجاه لها.'], d4a: ['Distance', ['avgvec'], 'اجمع أطوال كل الأجزاء.'], d4b: ['Displacement', ['avgvec'], 'الخط المستقيم من البداية للنهاية.'],
    d5: ['Concept: resultant range', ['maxmin'], 'المحصلة بين |A−B| وA+B.'], d6a: ['Law of cosines', ['lawcos'], 'الزاوية بين المتجهين 60° عند رسمهما من نفس النقطة.'], d6b: ['Direction with the law of sines', ['lawcos'], 'sin β = B sin φ ÷ R.'], d18: ['Right-angle sum', ['lawcos'], 'شمال وشرق متعامدان: فيثاغورس.'],
    d7: ['Concept: component vs magnitude', ['comp'], '|cos θ| ≤ 1.'], d8a: ['Horizontal component', ['comp'], 'Fx = F cos θ.'], d8b: ['Vertical component', ['comp'], 'Fy = F sin θ.'], d9a: ['x-component at 330°', ['comp'], 'Dx = D cos 330°.'], d9b: ['y-component at 330°', ['comp'], 'الربع الرابع: y سالبة.'], d10: ['Vertical component', ['comp'], 'F sin θ مع θ من الأفقي.'], d11: ['Direction from components', ['comp'], 'tan θ = Vy ÷ Vx.'],
    d12: ['Add in unit-vector form', ['addc'], 'اجمع الـ i معاً والـ j معاً.'], d13: ['Magnitude of a sum', ['addc'], 'اجمع x وy ثم فيثاغورس.'], d14: ['Net force from two forces', ['addc'], 'حلّل كل قوة ثم اجمع.'], d15: ['Component table', ['addc'], 'جدول مركبات لثلاثة إزاحات.'], d16: ['Cancelling force', ['addc', 'subc'], 'D = −(مجموع القوى).'], d17: ['Component table', ['addc'], 'حلّل كل متجه ثم اجمع.'], d20: ['Add in unit-vector form', ['addc'], 'اجمع المركبات: الـ i تلغي بعضها.'],
    d19a: ['3-D magnitude', ['mag3d'], 'جذر مجموع المربعات الثلاثة.'], d19b: ['Direction cosine', ['dircos'], 'cos θx = Rx ÷ R.'], d21: ['3-D magnitude', ['mag3d'], '√(4 + 9 + 25).'], d22: ['Concept: direction cosines', ['dircos'], 'مجموع مربعات جيوب التمام = 1.'],
    k1: ['3-D subtraction and magnitude', ['subc', 'mag3d'], 'اطرح كل محور ثم جذر ثلاثة حدود.'], k2: ['Multi-leg displacement (note: key mismatch)', ['addc'], 'حلّل كل مرحلة ثم اجمع. انتبه لملاحظة المفتاح.'], k3: ['Collinear legs + right angle', ['addc'], 'اجمع الشمال مع الشمال ثم فيثاغورس.'], k4: ['Average speed', ['avgvec'], 'المسافة الكلية ÷ الزمن (بالساعات).'], k5: ['Average velocity', ['avgvec'], 'الإزاحة ÷ الزمن الكلي.'],
    k6: ['Direction of a sum', ['addc'], 'احسب المجموع أولاً؛ إذا Ry = 0 فالزاوية 0°.'], k7: ['Multi-leg displacement', ['addc'], 'مركبات كل مرحلة ثم المجموع.'], k8: ['Concept: quadrant of B − A', ['rules', 'subc'], 'B − A = B + (−A).'], k9: ['Direction of a sum', ['addc'], 'اجمع المركبات ثم tan⁻¹(Ry/Rx).'], k10: ['Angle from components', ['comp'], 'tan θ = Ay ÷ Ax.'],
    k11: ['Two vectors by size and angle', ['lawcos', 'addc'], 'الزاوية بينهما 30°: قانون جيب التمام أو المركبات.'], k12: ['Max resultant', ['maxmin'], 'اجمع الطولين.'], k13: ['Min resultant', ['maxmin'], 'اطرح الطولين.'], k14: ['Concept: component vs magnitude', ['comp'], 'المركبة لا تتجاوز المتجه.'], k15: ['Subtract and magnitude', ['subc'], 'اطرح المركبات ثم فيثاغورس.'], k16: ['Find B from A − B', ['subc'], 'B = A − (A − B).'], k17: ['Three-vector subtraction', ['subc'], 'اطرح كل مركبة من الاثنتين.'], k18: ['Quadrant from signs', ['subc'], 'إشارة x وy تحدد الربع.'],
    k19: ['Displacement from two legs', ['addc'], 'جنوب = y سالب. حلّل الثاني 45° ثم اجمع.'], k20: ['Direction in the 4th quadrant', ['c2p'], 'x موجبة وy سالبة: الزاوية سالبة.'], k21: ['Two vectors by size and angle (note: key mismatch)', ['addc'], 'حلّل كل متجه ثم اجمع. انتبه لملاحظة المفتاح.'], k23: ['Magnitude of i − j', ['subc'], 'i − j = (1, −1).'], k24: ['Angle between vectors', ['angbet'], 'اطرح زاويتي المتجهين، أو تحقق بالضرب AxBx + AyBy = 0.'],
    t1: ['Right-angle sum', ['lawcos'], 'شرق وشمال متعامدان.'], t2: ['Average velocity', ['avgvec'], 'الإزاحة ÷ الزمن الكلي بالساعات.'], t4: ['Component addition', ['addc'], 'الزاوية مع محور x السالب: x سالبة وy موجبة.']
  };
  Q.forEach((q) => { const h = HT[q.id] || HD[q.sec]; q.hint = { type: h[0], laws: h[1], ar: h[2] }; });
  Q.forEach((q) => {
    if (!q.ref) q.ref = q.id[0] === 'k' ? 'Doctor’s question set · Q' + q.id.slice(1) : 'Lecture slides' + (q.grp ? ' · ' + q.grp : '');
    q.src = 'doc';
  });

  /* ---------------------------------------------------------------- images */
  const STYLE = 'STYLE: flat vector infographic style for a university physics study site. Canvas 1600 x 1000 px (16:10 landscape), exported as PNG, sRGB. Solid warm paper background #FFFDF8 (no transparency, no gradient, no texture). Palette ONLY: teal #0E6E68, blue #2457C5, red #C0392B, green #1A7F43, amber #B45309, ink #1C2733 (all text and axes), light grey #E0DACB for guides. Font: clean sans-serif (Inter), minimum 28 px for labels. Nothing may overlap; keep 60 px margins.';
  const images = [
    { id: 'forces', file: 'box-three-forces.png', alt: 'A box pulled by three people with forces at angles', where: 'Lesson 5, before the cancelling-force example', fallback: V.scene({ axes: true, label: 'three forces on a box', items: [{ a: [0, 0], b: [4.3, 2.5], c: 'a', t: '100 N, 30°', tp: [0, -8] }, { a: [0, 0], b: [-2, 3.5], c: 'b', t: '80 N, 120°', tp: [0, -8] }, { a: [0, 0], b: [-2.4, -3.2], c: 'g', t: '40 N, 233°', tp: [0, 14] }] }),
      prompt: STYLE + ' Top-down view of a box (a 200 x 200 px square, fill light teal #D9EFEC, teal outline) at the exact centre (800, 500). Three people (simple flat stick figures in ink) pull it with ropes: person 1 to the upper right with a blue arrow labelled "100 N" at 30 degrees above the +x axis; person 2 to the upper left with a red arrow labelled "80 N" at 120 degrees from the +x axis; person 3 to the lower left with a green arrow labelled "40 N" at 233 degrees from the +x axis. Draw thin light-grey x and y axes through the box centre with arrowheads, and small angle arcs (ink) with the angle values written beside each arc. Arrow lengths proportional to force. A dashed amber arrow labelled "D = ?" pointing to the lower right (the fourth force). Title at top-left: "Find the fourth force D that makes the resultant zero".' },
    { id: 'skier', file: 'skier-distance-displacement.png', alt: 'Skier path A to B to C to D', where: 'Lesson 2, before the skier example', fallback: V.scene({ axes: false, label: 'skier path', items: [{ a: [0, 0], b: [5, 0], c: 'a', t: 'AB 180 m', tp: [0, -10] }, { a: [5, 0.6], b: [1, 0.6], c: 'b', t: 'BC 140 m', tp: [0, -8] }, { a: [1, 1.2], b: [3.5, 1.2], c: 'g', t: 'CD 100 m', tp: [0, -8] }] }),
      prompt: STYLE + ' A single horizontal snow line (y = 560, from x = 160 to x = 1440) with a pale-blue snow strip under it. Mark four points with ink dots and letters A (x = 200), B (x = 1000), C (x = 360), D (x = 820), where the skier goes A to B, back to C, then forward to D. Show each leg as a separate curved arrow arc ABOVE the line at three different heights so they never overlap: AB in blue (label "180 m"), BC in red (label "140 m"), CD in green (label "100 m"). Below the line, a thick amber double-headed bracket from A to D labelled "displacement = 140 m east". Top-left title: "Distance = 420 m, displacement = 140 m".' }
  ];

  root.CHAPTERS = root.CHAPTERS || [];
  root.CHAPTERS.push({ id: 3, key: 'ch03', icon: 'arrow', title: 'Vectors', glossary, sections, laws, traps, quick, questions: Q, images, videos: [] });
})(typeof window !== 'undefined' ? window : globalThis);
