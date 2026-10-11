/* ====== Chapter 2 — Motion in One Dimension (Serway Ch.2 + Dr. Karim's slides & question sets) ======
   A new chapter = a file with this same shape + one <script> line in index.html (see README).
   Math is written in LaTeX between $...$ (inline) or $$...$$ (display). g = 10 m/s² in this course. */
(function (root) {
  'use strict';
  const V = root.VIS, R = String.raw;
  const TEXT = (html) => ({ k: 'text', html });
  const LIST = (items) => ({ k: 'list', items });
  const LAW = (id) => ({ k: 'law', id });
  const EX = (o) => Object.assign({ k: 'ex' }, o);
  const SUM = (items) => ({ k: 'sum', items });
  const PIT = (html) => ({ k: 'pit', html });
  const TIP = (html) => ({ k: 'tip', html });
  const FIG = (html) => ({ k: 'fig', html });
  const IMG = (id) => ({ k: 'img', id });
  const MOUNT = (id) => ({ k: 'mount', id });
  const AR = (html) => ({ k: 'ar', html });
  const TBL = (head, rows) => ({ k: 'tbl', head, rows });

  /* ---------------------------------------------------------------- formulas */
  const E = (t) => `<span class="en">${t}</span>`;
  const laws = [
    { id: 'disp', sec: 1, name: 'Displacement', tex: R`\Delta x = x_f - x_i`, note: 'Final minus initial. Depends only on the two end points.', when: 'You are given a start and an end position.',
      ar: R`الإزاحة ${E('Displacement')} هي التغير في الموقع: <b>النهاية ناقص البداية</b>. لا يهمك ماذا حصل في الطريق، فقط نقطتا البداية والنهاية. وقد تكون سالبة إذا انتهيت على يسار مكان البداية.`,
      tip: R`Displacement can be negative or zero. Distance can never be.`,
      ex: { src: 'Textbook · Example 2.1', p: R`A car is at $x=30\ \text{m}$ at $t=0$ and at $x=-53\ \text{m}$ at $t=50\ \text{s}$. Find the displacement.`, steps: [R`$\Delta x = x_f - x_i = -53 - 30$`], a: R`$\Delta x = -83\ \text{m}$ (to the left)`, ar: 'الإشارة السالبة تعني أن السيارة انتهت على يسار موقعها الأول.' } },
    { id: 'dist', sec: 1, name: 'Distance', tex: R`d = \sum |\Delta x_i| \;\ge\; 0`, note: 'Total length of the path. Always positive.', when: 'The question says “distance travelled”, or the object turns around.',
      ar: R`المسافة ${E('Distance')} هي طول المسار كاملاً. اجمع طول كل جزء <b>كرقم موجب</b> حتى لو تغير الاتجاه.`,
      tip: R`If the object turns around, split the path at the turning point and add the pieces as positive numbers.`,
      ex: { src: 'Lecture slides · palm-tree car', p: R`A car drives from $O$ ($x=0$) to $F$ ($x=60\ \text{m}$), then turns back to $B$ ($x=20\ \text{m}$). Find the displacement and the distance.`, steps: [R`$O\to F$: $+60\ \text{m}$; $\;F\to B$: $20-60=-40\ \text{m}$`, R`Displacement: $\Delta x = x_B - x_O = 20 - 0 = +20\ \text{m}$`, R`Distance: $d = 60 + 40 = 100\ \text{m}$`], a: R`$\Delta x = +20\ \text{m}$, $\quad d = 100\ \text{m}$`, ar: 'الإزاحة تنظر للبداية والنهاية فقط (20 م)، أما المسافة فتحسب كل خطوة (100 م).' } },
    { id: 'avgv', sec: 1, name: 'Average velocity', tex: R`\bar v_x = \frac{\Delta x}{\Delta t} = \frac{x_f - x_i}{t_f - t_i}`, note: 'Signed. Uses displacement.', when: 'Two positions and two times are given.',
      ar: R`السرعة المتجهة المتوسطة ${E('Average velocity')} = <b>الإزاحة ÷ الزمن</b>. لها إشارة (اتجاه). وإذا رجع الجسم لنقطة البداية فهي صفر.`,
      tip: R`Only the two end points matter, not the curve between them. Back at the start ⇒ $\bar v = 0$.`,
      ex: { src: 'Doctor’s questions · Q15', p: R`A parabolic $x$–$t$ graph passes through $x(1)=11\ \text{m}$ and $x(3)=3\ \text{m}$. Find the average velocity from $t=1\ \text{s}$ to $t=3\ \text{s}$.`, steps: [R`$\bar v = \dfrac{x_f - x_i}{t_f - t_i} = \dfrac{3-11}{3-1}$`], a: R`$\bar v = -4\ \text{m/s}$`, ar: 'السالب يعني أن الجسم يتحرك بمعدل 4 م/ث نحو الاتجاه السالب خلال هذه الفترة.' } },
    { id: 'avgs', sec: 1, name: 'Average speed', tex: R`\text{average speed} = \frac{d}{\Delta t} \;\ge\; 0`, note: 'Uses distance, not displacement.', when: 'The question says “speed” with no direction.',
      ar: R`السرعة القياسية المتوسطة ${E('Average speed')} = <b>المسافة ÷ الزمن</b>. دائماً موجبة وليس لها اتجاه.`,
      tip: R`A runner who finishes where he started has $\bar v = 0$ but a positive average speed.`,
      ex: { src: 'Textbook · Problem 6 (variant)', p: R`A car drives a distance $d$ at $60\ \text{mi/h}$, then returns the same distance $d$ at $20\ \text{mi/h}$. Find the average speed and the average velocity.`, steps: [R`Total distance $= 2d$`, R`Total time $= \dfrac{d}{60} + \dfrac{d}{20} = \dfrac{d}{15}$`, R`Average speed $= \dfrac{2d}{d/15} = 30\ \text{mi/h}$`, R`Back at the start ⇒ $\Delta x = 0 \Rightarrow \bar v = 0$`], a: R`speed $= 30\ \text{mi/h}$, velocity $= 0$`, ar: 'انتبه: السرعة المتوسطة ليست متوسط السرعتين (40)، لأن الزمن عند السرعة الأقل أطول.' } },
    { id: 'unif', sec: 2, name: 'Constant velocity', tex: R`x(t) = x_0 + v\,t`, note: 'Zero acceleration. Slope of the $x$–$t$ graph is $v$.', when: 'The velocity is constant and you need a position at some time.',
      ar: R`إذا كانت السرعة ثابتة فالتسارع صفر، والموقع يزداد بمقدار ثابت كل ثانية. الرسم $x$–$t$ خط مستقيم و<b>ميله = السرعة</b>.`,
      tip: R`km/h → m/s: <b>divide by 3.6</b> (and m/s × 3.6 = km/h).`,
      ex: { src: 'Lecture slides · King Faisal Hwy', p: R`A car travels at $36\ \text{km/h}$ past palm trees spaced $10\ \text{m}$ apart. Find its speed in m/s, the time between two palms, and its position after $5\ \text{s}$ if it starts at $x_0 = 10\ \text{m}$.`, steps: [R`$v = 36/3.6 = 10\ \text{m/s}$`, R`$\Delta t = 10\ \text{m} \,/\, 10\ \text{m/s} = 1\ \text{s}$`, R`$x(5) = 10 + 10(5) = 60\ \text{m}$`], a: R`$v = 10\ \text{m/s}$, one palm per second, $x(5) = 60\ \text{m}$`, ar: 'حوّل الوحدات أولاً ثم طبّق القانون. هنا وحدة الزمن بالثواني فحوّلنا km/h إلى m/s.' } },
    { id: 'catch', sec: 2, name: 'Catch-up problems', tex: R`x_1(t) = x_2(t) \;\Rightarrow\; t = \frac{d}{v_1 - v_2}`, note: 'Write both positions from the same origin, then set them equal.', when: 'One object chases another (dog/cat, police/truck).',
      ar: R`عندما يلحق جسم بجسم آخر: اكتب موقع كل منهما بالنسبة لنفس نقطة الأصل، ثم <b>ساوِ بين الموقعين</b> وحل لـ $t$. أو اختصاراً: المسافة بينهما ÷ فرق السرعتين.`,
      tip: R`Choose one origin. The chased object starts at $x = d$ (the gap), the chaser at $x=0$.`,
      ex: { src: 'Doctor’s questions · Q11', p: R`A dog runs at $10\ \text{m/s}$, $25\ \text{m}$ behind a cat running at $5\ \text{m/s}$. When does the dog catch the cat?`, steps: [R`Dog: $x_D = 10t$. Cat: $x_C = 25 + 5t$`, R`Set equal: $10t = 25 + 5t \Rightarrow 5t = 25$`], a: R`$t = 5\ \text{s}$`, ar: 'الكلب يقترب من القط بمعدل 5 م كل ثانية (فرق السرعتين)، والفجوة 25 م، فيحتاج 5 ثوانٍ.' } },
    { id: 'inst', sec: 3, name: 'Instantaneous velocity', tex: R`v_x = \frac{dx}{dt}`, note: 'Slope of the tangent to the $x$–$t$ curve.', when: '$x$ is given as a function of $t$ and you need $v$ at an instant.',
      ar: R`السرعة اللحظية ${E('Instantaneous velocity')} هي <b>مشتقة الموقع</b> بالنسبة للزمن، أي ميل المماس لمنحنى $x$–$t$ عند تلك اللحظة.`,
      tip: R`Differentiate first, <b>then</b> substitute the time. Power rule: $\dfrac{d}{dt}t^n = n\,t^{n-1}$; derivative of a constant is $0$.`,
      ex: { src: 'Doctor’s questions · Q25', p: R`$x = 2t^2 + 5t + 10$ (SI units). Find the velocity at $t=4\ \text{s}$.`, steps: [R`$v = \dfrac{dx}{dt} = 4t + 5$`, R`$v(4) = 4(4) + 5$`], a: R`$v = 21\ \text{m/s}$`, ar: 'اشتق أولاً، ثم عوّض $t=4$. التعويض قبل الاشتقاق خطأ شائع.' } },
    { id: 'inst2', sec: 3, name: 'Instantaneous acceleration', tex: R`a_x = \frac{dv}{dt} = \frac{d^2x}{dt^2}`, note: 'Slope of the $v$–$t$ graph.', when: '$v(t)$ or $x(t)$ is given and you need $a$.',
      ar: R`التسارع اللحظي ${E('Instantaneous acceleration')} هو <b>مشتقة السرعة</b>، أي مشتقة ثانية للموقع. هو ميل الرسم $v$–$t$.`,
      tip: R`From $x(t)$ you differentiate twice. A constant answer means the acceleration is the same at every instant.`,
      ex: { src: 'Lecture slides', p: R`$x = t^3 - 2t^2 + 5t - 8$ (SI units). Find the acceleration at $t=1\ \text{s}$.`, steps: [R`$v = \dfrac{dx}{dt} = 3t^2 - 4t + 5$`, R`$a = \dfrac{dv}{dt} = 6t - 4$`, R`$a(1) = 6 - 4$`], a: R`$a = 2\ \text{m/s}^2$`, ar: 'اشتقاقان متتاليان ثم التعويض في النهاية.' } },
    { id: 'avga', sec: 3, name: 'Average acceleration', tex: R`\bar a_x = \frac{\Delta v}{\Delta t} = \frac{v_f - v_i}{t_f - t_i}`, note: 'Units: m/s².', when: 'Two velocities and two times are given.',
      ar: R`التسارع المتوسط ${E('Average acceleration')} = <b>التغير في السرعة ÷ الزمن</b>. يقول لك كم تتغير السرعة كل ثانية.`,
      tip: R`If you are given $x(t)$, differentiate to get $v(t)$ first, then take $\Delta v/\Delta t$.`,
      ex: { src: 'Lecture slides', p: R`A car goes from $0$ to $24\ \text{m/s}$ in $5\ \text{s}$ at a steady rate. Find the acceleration.`, steps: [R`$a = \dfrac{\Delta v}{\Delta t} = \dfrac{24 - 0}{5}$`], a: R`$a = 4.8\ \text{m/s}^2$`, ar: 'السرعة تزيد 4.8 م/ث في كل ثانية.' } },
    { id: 'eq2', sec: 4, name: 'Velocity equation', tex: R`v_f = v_i + a\,t`, note: 'Missing variable: $\Delta x$.', when: 'There is no distance in the problem.',
      ar: R`هذه معادلة السرعة. استخدمها عندما <b>لا يوجد</b> ذكر للمسافة أو الإزاحة في المسألة. تربط السرعة النهائية بالابتدائية والتسارع والزمن.`,
      tip: R`“Comes to a stop” means $v_f = 0$.`,
      ex: { src: 'Doctor’s questions · Q3', p: R`An object at $30\ \text{m/s}$ slows with constant acceleration $-5\ \text{m/s}^2$. How long until it stops?`, steps: [R`$v_f = 0$, so $0 = 30 + (-5)\,t$`], a: R`$t = 6\ \text{s}$`, ar: 'لا توجد مسافة في المسألة، فنختار المعادلة التي لا تحتوي Δx.' } },
    { id: 'eq1', sec: 4, name: 'Position equation', tex: R`\Delta x = v_i\,t + \tfrac{1}{2}\,a\,t^2`, note: 'Missing variable: $v_f$.', when: '$v_f$ is not in the problem.',
      ar: R`استخدمها عندما <b>لا تعرف السرعة النهائية</b> ولا تحتاجها. تعطيك الإزاحة من السرعة الابتدائية والتسارع والزمن.`,
      tip: R`Two roots? Time cannot be negative: keep the positive root.`,
      ex: { src: 'Textbook · Problem 17', p: R`An object with uniform acceleration has $v_i = 12.0\ \text{cm/s}$ at $x=3.00\ \text{cm}$. Two seconds later it is at $x = 25.00\ \text{cm}$. Find the acceleration.`, steps: [R`$\Delta x = 25 - 3 = 22\ \text{cm}$`, R`$22 = 12(2) + \tfrac12 a(2)^2 = 24 + 2a$`, R`$2a = -2$`], a: R`$a = -1.00\ \text{cm/s}^2$`, ar: 'المعطيات: vi وΔx وt والمطلوب a، وvf غير موجودة، إذن نستخدم هذه المعادلة.' } },
    { id: 'eq3', sec: 4, name: 'Time-free equation', tex: R`v_f^{\,2} = v_i^{\,2} + 2a\,\Delta x`, note: 'Missing variable: $t$.', when: 'There is no time in the problem (e.g. stopping distance).',
      ar: R`استخدمها عندما <b>لا يوجد زمن</b> في المسألة. مفيدة جداً في مسائل مسافة التوقف.`,
      tip: R`Distance is positive. If you get $-50\ \text{m}$ for a stopping distance, check the sign of $a$.`,
      ex: { src: 'Lecture slides · Q5', p: R`A car moving at $10\ \text{m/s}$ brakes with $a = -1\ \text{m/s}^2$. How far does it go before stopping?`, steps: [R`“Stops” ⇒ $v_f = 0$; no time given ⇒ use $v_f^2 = v_i^2 + 2a\Delta x$`, R`$0 = 10^2 + 2(-1)\Delta x \Rightarrow \Delta x = \dfrac{100}{2}$`], a: R`$\Delta x = 50\ \text{m}$`, ar: 'كلمة «يتوقف» تعني vf = 0، وبدون زمن نستخدم هذه المعادلة.' } },
    { id: 'vbar', sec: 4, name: 'Average velocity (constant a)', tex: R`\bar v = \frac{v_i + v_f}{2} \quad\Rightarrow\quad \Delta x = \frac{v_i + v_f}{2}\,t`, note: 'Only valid when the acceleration is constant.', when: 'You know $v_i$, $v_f$ and $t$ (acceleration not needed).',
      ar: R`عندما يكون التسارع ثابتاً، السرعة المتوسطة = متوسط السرعتين. استخدمها عندما تعرف <b>السرعة الابتدائية والنهائية والزمن</b> وليس لك حاجة بالتسارع.`,
      tip: R`This shortcut is <b>only</b> for constant acceleration.`,
      ex: { src: 'Lecture slides · Q6', p: R`A car speeds up from $10\ \text{m/s}$ to $25\ \text{m/s}$ in $20\ \text{s}$. Find the distance.`, steps: [R`$\Delta x = \dfrac{v_i + v_f}{2}\,t = \dfrac{10+25}{2}(20)$`, R`$= 17.5 \times 20$`], a: R`$\Delta x = 350\ \text{m}$`, ar: 'متوسط السرعة 17.5 م/ث لمدة 20 ثانية.' } },
    { id: 'area', sec: 5, name: 'Area under v–t', tex: R`\Delta x = \int v\,dt \qquad d = \int |v|\,dt`, note: 'Area below the axis is negative displacement but positive distance.', when: 'A $v$–$t$ graph is given and you need displacement or distance.',
      ar: R`المساحة تحت منحنى $v$–$t$ تساوي <b>الإزاحة</b>. المساحة فوق المحور موجبة وتحته سالبة. للمسافة اجمع المساحات كلها كأرقام موجبة.`,
      tip: R`Split the graph into triangles and rectangles. Triangle $=\tfrac12 \cdot \text{base}\cdot\text{height}$.`,
      ex: { src: 'Lecture slides · Q7', p: R`$v$ decreases linearly from $12\ \text{m/s}$ to $0$ in $5\ \text{s}$. Find the distance travelled.`, steps: [R`The area under the line is a triangle`, R`$d = \tfrac12(5)(12)$`], a: R`$d = 30\ \text{m}$`, ar: 'المثلث قاعدته الزمن وارتفاعه السرعة.' } },
    { id: 'free', sec: 6, name: 'Free fall', tex: R`a_y = -g = -10\ \text{m/s}^2 \qquad v = v_i - g\,t \qquad y = y_i + v_i t - \tfrac{1}{2} g t^2`, note: 'Up is positive. Same $a$ going up, at the top, and coming down.', when: 'Anything thrown or dropped, with no air resistance.',
      ar: R`السقوط الحر ${E('Free fall')}: الجاذبية وحدها تؤثر. التسارع <b>ثابت دائماً</b> $-10\ \text{m/s}^2$ (للأسفل) أثناء الصعود وعند القمة وأثناء الهبوط. هي نفس معادلات التسارع الثابت مع $a=-g$.`,
      tip: R`Choose up $=$ positive once, then $a=-g$ and downward velocities are negative. Mass does not matter.`,
      ex: { src: 'Doctor’s questions · Q1', p: R`A stone is dropped from rest from the top of an $80\ \text{m}$ building. Find its speed when it hits the ground.`, steps: [R`Dropped from rest: $v_i = 0$; no time given ⇒ $v^2 = 2gh$`, R`$v^2 = 2(10)(80) = 1600$`], a: R`$v = 40\ \text{m/s}$ (downward)`, ar: 'السقوط من السكون ومعك الارتفاع بدون زمن، فاستخدم معادلة السرعة التربيعية.' } },
    { id: 'up', sec: 6, name: 'Throwing upward', tex: R`t_{up} = \frac{v_i}{g} \qquad y_{max} = \frac{v_i^{2}}{2g} \qquad t_{total} = 2\,t_{up}`, note: 'Back at the same level: $v = -v_i$.', when: 'The peak of the path, or the return to the launch level.',
      ar: R`عند أعلى نقطة تكون السرعة صفراً للحظة. منها نحصل على زمن الصعود وأقصى ارتفاع. الصعود والنزول <b>متماثلان</b>: نفس الزمن ونفس السرعة عند نفس المستوى.`,
      tip: R`At the top $v=0$ but $a=-10\ \text{m/s}^2$ (not zero).`,
      ex: { src: 'Doctor’s questions · Q4', p: R`You throw a ball straight up and catch it $3.2\ \text{s}$ later at the same place. Find the maximum height.`, steps: [R`$t_{up} = 3.2/2 = 1.6\ \text{s}$`, R`$y_{max} = \tfrac12 g\,t_{up}^2 = 5(1.6)^2$`], a: R`$y_{max} = 12.8\ \text{m}$`, ar: 'زمن الصعود نصف الزمن الكلي، ثم نحسب الارتفاع.' } }
  ];

  const traps = [
    'Distance is always $\\ge 0$; displacement has a sign.',
    'Returned to the start? Average **velocity** is 0, average **speed** is not.',
    'km/h → m/s: **divide** by 3.6 (not multiply).',
    'Differentiate first, then substitute the time: $v = dx/dt$, then plug in $t$.',
    '$\\bar v = (v_i + v_f)/2$ is valid for **constant acceleration only**.',
    'Negative $a$ does not mean slowing down. Same signs of $v$ and $a$ ⇒ speeding up; opposite signs ⇒ slowing down.',
    '“Comes to a stop” means $v_f = 0$. Distance stays positive.',
    'Multi-stage motion: restart the clock at $t=0$ for every stage; the end of one stage is the start of the next.',
    'At the top of a throw $v = 0$ but $a = -10\\ \\text{m/s}^2$ (not zero).',
    'Quadratic in $t$? Keep the positive root only.',
    'Pick “up = positive” once, then $a = -g$ and downward velocities are negative.',
    'Average velocity between two points uses only those two points, not the path between them.',
    'A dropped object (e.g. a mailbag from a rising helicopter) starts with the carrier’s velocity, not from rest.',
    'In vacuum all objects fall together: mass does not matter.'
  ].map((html, i) => ({ id: 't' + (i + 1), html: html.replace(/\*\*(.+?)\*\*/g, '<b>$1</b>') }));

  const quick = [
    R`$\Delta x = x_f - x_i$ (signed) · $d = \sum|\Delta x|$ (always $\ge 0$).`,
    R`$\bar v = \Delta x/\Delta t$ (signed) · average speed $= d/\Delta t$.`,
    R`$v = dx/dt$ (slope of $x$–$t$) · $a = dv/dt$ (slope of $v$–$t$) · area under $v$–$t$ is $\Delta x$.`,
    R`Constant $a$: $\;v = v_i + at \;|\; \Delta x = v_it + \tfrac12 at^2 \;|\; v^2 = v_i^2 + 2a\Delta x \;|\; \Delta x = \tfrac{v_i+v_f}{2}t$.`,
    'Choose the equation by crossing out the variable that is not in the problem. “Stops” means $v_f = 0$.',
    R`Same signs of $v$ and $a$ ⇒ speeding up; opposite signs ⇒ slowing down.`,
    R`Free fall: $a = -10\ \text{m/s}^2$ always, even at the top. $t_{up} = v_i/g$, $y_{max} = v_i^2/2g$.`,
    'Multi-stage: restart $t = 0$ in each stage. Quadratic in $t$: positive root. Chasing: set the positions equal.'
  ];

  /* ---------------------------------------------------------------- lessons */
  const H = (title) => ({ k: 'h', title });
  const ARX = (html) => ({ k: 'arx', html });
  const LAWS = (title, ids) => ({ k: 'laws', title, ids });
  const sections = [
    { id: 1, title: 'Position, Displacement & Distance', tr: 'الموقع والإزاحة والمسافة', blocks: [
      H('The idea: position and direction'),
      ARX(R`الحركة في بُعد واحد ${E('1-D motion')} تكون على خط مستقيم، لذلك الاتجاه مجرد <b>إشارة</b>: موجب (+) لليمين أو للأعلى، وسالب (−) لليسار أو للأسفل. الموقع $x$ يُقاس من نقطة أصل تختارها أنت.`),
      FIG(V.disp()),
      H('Displacement and distance'),
      ARX(R`هناك كميتان تبدوان متشابهتين لكنهما مختلفتان: <b>الإزاحة</b> تهتم بالبداية والنهاية فقط وقد تكون سالبة، و<b>المسافة</b> هي طول الطريق كله وتكون موجبة دائماً.`),
      LAWS('Displacement & distance', ['disp', 'dist']),
      H('Average velocity and average speed'),
      ARX(R`نفس الفكرة بالنسبة للزمن: السرعة المتجهة تستعمل الإزاحة، والسرعة القياسية تستعمل المسافة.`),
      LAWS('Average velocity & average speed', ['avgv', 'avgs']),
      PIT(R`Back where you started? $\Delta x = 0$ so $\bar v_x = 0$ — but the average speed is <b>not</b> zero (think of a marathon runner).`),
      EX({ src: 'Textbook · Example 2.1 (several ideas together)', p: R`A car is at $x=30\ \text{m}$ at $t=0$ and at $x=-53\ \text{m}$ at $t=50\ \text{s}$. Along the way it travelled a total path of $127\ \text{m}$. Find $\Delta x$, $\bar v_x$ and the average speed.`,
        steps: [R`$\Delta x = -53-30 = -83\ \text{m}$`, R`$\bar v_x = -83/50 \approx -1.7\ \text{m/s}$ (to the left)`, R`Average speed $= 127/50 \approx 2.5\ \text{m/s}$`],
        a: R`$\Delta x=-83\ \text{m},\;\; \bar v_x=-1.7\ \text{m/s},\;\; \text{speed}=2.5\ \text{m/s}$`, ar: 'لاحظ أن السرعة المتجهة (1.7) تختلف عن السرعة القياسية (2.5) لأن المسار أطول من الإزاحة.' }),
      SUM([R`Displacement = final − initial (signed); distance = path length (positive).`, R`Average velocity uses $\Delta x$; average speed uses $d$.`])
    ] },
    { id: 2, title: 'Constant Velocity', tr: 'السرعة الثابتة', blocks: [
      H('Motion at constant velocity'),
      ARX(R`عندما لا تتغير السرعة يكون التسارع صفراً، والرسم $x$–$t$ خط مستقيم <b>ميله هو السرعة</b>. خط أفقي يعني أن الجسم ساكن، وميل موجب يعني حركة في الاتجاه الموجب.`),
      LAWS('Constant velocity', ['unif']),
      FIG(V.uniform()),
      IMG('palm'),
      H('Catch-up problems'),
      ARX(R`في مسائل «من يلحق من» لا نحتاج قانوناً جديداً، فقط نكتب موقع كل جسم بنفس الأصل ونساوي بينهما.`),
      LAWS('Chasing', ['catch']),
      EX({ src: 'Doctor’s questions · Q20', p: R`A truck moves at constant $21\ \text{m/s}$, $100\ \text{m}$ ahead of a police car moving at constant $25\ \text{m/s}$. When does the police car catch the truck?`,
        steps: [R`Police: $x_P = 25t$. Truck: $x_T = 100 + 21t$`, R`Equal: $25t = 100 + 21t \Rightarrow 4t = 100$`], a: R`$t = 25\ \text{s}$`, ar: 'نفس فكرة الكلب والقط: فرق السرعتين هو 4 م/ث، والفجوة 100 م.' }),
      SUM([R`Constant velocity: $x = x_0 + vt$; slope of $x$–$t$ is $v$.`, 'Horizontal $x$–$t$ line = at rest. Chasing: set the two positions equal.'])
    ] },
    { id: 3, title: 'Instantaneous Velocity & Acceleration', tr: 'السرعة اللحظية والتسارع', blocks: [
      H('Derivatives: velocity and acceleration'),
      ARX(R`إذا أُعطيت الموقع $x$ كدالة في الزمن فالسرعة هي <b>مشتقة</b> $x$ والتسارع هو مشتقة السرعة. اشتق أولاً ثم عوّض الزمن المطلوب.`),
      LAWS('Instantaneous velocity & acceleration', ['inst', 'inst2']),
      H('Average acceleration'),
      LAWS('Average acceleration', ['avga']),
      EX({ src: 'Doctor’s questions · Q2 (derivative + average)', p: R`$x = 2t^3 + 5t$ (SI units). Find the average acceleration between $t=0$ and $t=4\ \text{s}$.`,
        steps: [R`$v = \dfrac{dx}{dt} = 6t^2 + 5$`, R`$v(0) = 5\ \text{m/s}, \quad v(4) = 6(16) + 5 = 101\ \text{m/s}$`, R`$\bar a = \dfrac{101 - 5}{4 - 0}$`], a: R`$\bar a = 24\ \text{m/s}^2$`, ar: 'هذا مثال يجمع فكرتين: الاشتقاق ثم القانون المتوسط.' }),
      H('Do $v$ and $a$ mean speeding up or slowing down?'),
      FIG(V.accSign()),
      ARX(R`إذا كانت $v$ و$a$ بنفس الإشارة فالجسم <b>يتسارع</b> (تزداد سرعته)، وإذا اختلفت الإشارتان فهو <b>يتباطأ</b>. التسارع السالب وحده لا يعني تباطؤاً.`),
      PIT(R`A negative acceleration does <b>not</b> mean slowing down. If $v<0$ and $a<0$ the object is speeding up (in the − direction). The textbook avoids “deceleration”; the doctor uses it for “speed decreasing”.`),
      SUM([R`$v = dx/dt$, $a = dv/dt$. Differentiate first, then substitute.`, 'Same sign for $v$ and $a$: speeding up. Opposite signs: slowing down.'])
    ] },
    { id: 4, title: 'Constant Acceleration', tr: 'التسارع الثابت', blocks: [
      H('Which equation do I use?'),
      ARX(R`عندما يكون التسارع ثابتاً لدينا أربع معادلات مترابطة. القاعدة الذهبية: <b>اختر المعادلة التي لا تحتوي المتغير الذي لم تذكره المسألة</b>.`),
      TBL(['Missing from the problem', 'Use'], [[R`$v_f$`, R`$\Delta x = v_it + \tfrac12at^2$`], [R`$\Delta x$`, R`$v_f = v_i + at$`], [R`$t$`, R`$v_f^2 = v_i^2 + 2a\Delta x$`], [R`$a$`, R`$\Delta x = \tfrac{v_i+v_f}{2}\,t$`]]),
      LAWS('The equations of constant acceleration', ['eq2', 'eq1', 'eq3', 'vbar']),
      H('Multi-stage motion'),
      ARX(R`في المسائل متعددة المراحل قسّم الحركة إلى أجزاء، <b>وأعد الساعة إلى صفر</b> في كل مرحلة، وانقل السرعة والموقع النهائيين من مرحلة إلى المرحلة التي بعدها.`),
      EX({ src: 'Lecture slides · traffic-light car (stage 1)', p: R`A car starts from rest at $x=-30\ \text{m}$ and accelerates for $4\ \text{s}$ to reach $x=-10\ \text{m}$ (stage 1). Then it drives at constant velocity for $3\ \text{s}$ (stage 2). Describe stage 1.`,
        steps: [R`$\Delta x = \tfrac12 a t^2 \Rightarrow 20 = \tfrac12 a (16) \Rightarrow a = 2.5\ \text{m/s}^2$`, R`$v_B = at = 10\ \text{m/s}$ — this is the velocity of stage 2 (restart $t=0$ there)`], a: R`Stage 1: $x = -30 + 1.25\,t^2$; stage 2: $x = -10 + 10\,t$`, ar: 'سرعة نهاية المرحلة الأولى هي سرعة بداية الثانية.' }),
      EX({ src: 'Doctor’s questions · Q40 (three stages)', p: R`A car starts from rest and accelerates at $3\ \text{m/s}^2$ for $30\ \text{s}$, then moves at constant speed for $60\ \text{s}$, then slows at $1.0\ \text{m/s}^2$ until it stops. Find the total time.`,
        steps: [R`Stage 1: $v = at = 3 \times 30 = 90\ \text{m/s}$`, R`Stage 2: constant speed, $60\ \text{s}$`, R`Stage 3: $0 = 90 - 1.0\,t \Rightarrow t = 90\ \text{s}$`, R`Total $= 30 + 60 + 90$`], a: R`$180\ \text{s}$`, ar: 'كل مرحلة لها معادلتها، وناتج المرحلة الأولى (90 م/ث) هو مدخل الثالثة.' }),
      PIT(R`A quadratic in $t$ gives two roots — keep the positive one.`),
      SUM([R`Equations hold only for constant $a$. Cross out the missing variable to choose.`, R`“Stops” ⇒ $v_f = 0$. Multi-stage: restart $t=0$ each stage.`])
    ] },
    { id: 5, title: 'Reading Motion Graphs', tr: 'قراءة رسومات الحركة', blocks: [
      H('Slope and area'),
      ARX(R`كل رسم يخبرك بقصة: <b>الميل</b> يعطي الكمية المشتقة، و<b>المساحة تحت الرسم</b> تعطي الكمية المتراكمة. احفظ الجدول التالي.`),
      TBL(['Graph', 'Slope means', 'Area means'], [[R`$x$–$t$`, 'velocity $v$', '—'], [R`$v$–$t$`, 'acceleration $a$', R`displacement $\Delta x$`], [R`$a$–$t$`, '—', R`change in velocity $\Delta v$`]]),
      LAWS('Area under the v–t graph', ['area']),
      H('A full graph example'),
      FIG(V.docGraph()),
      EX({ src: 'Doctor’s questions · Q17–18 (several ideas)', p: R`A $v$–$t$ graph: $v=-10$ until $t=4$, rises linearly to $+20$ at $t=10$, stays at $20$ until $t=13$, then falls to $0$ at $t=18$. Find the displacement and the distance.`,
        steps: [R`Signed areas: $-40$; then $+30$ (this is $-10$ for $2$ s and $+40$ for $4$ s); then $+60$; then $+50$`, R`Displacement: $-40+30+60+50 = 100$`, R`Distance: $40 + 10 + 40 + 60 + 50 = 200$`], a: R`$\Delta x = 100\ \text{m}$ and $d = 200\ \text{m}$`, ar: 'المقطع الذي يقطع محور الزمن يجب تقسيمه عند نقطة التقاطع عند حساب المسافة.' }),
      H('Interactive: the traffic-light car'),
      TEXT('The doctor’s example in seven stages — drag the slider and watch $x$, $v$ and $a$ together.'),
      MOUNT('car'),
      SUM([R`Slope of $x$–$t$ is $v$; slope of $v$–$t$ is $a$; area under $v$–$t$ is $\Delta x$.`, R`Distance = add the areas as positive numbers.`])
    ] },
    { id: 6, title: 'Free Fall', tr: 'السقوط الحر', blocks: [
      H('Free fall: the idea'),
      ARX(R`السقوط الحر معناه أن الجاذبية هي القوة الوحيدة. اختر <b>الأعلى موجباً</b>، فيكون التسارع $-10\ \text{m/s}^2$ دائماً: عند الصعود وعند القمة وعند الهبوط.`),
      LAWS('Free fall', ['free']),
      IMG('drop'),
      H('Thrown upward'),
      LAWS('Throwing upward', ['up']),
      IMG('updown'),
      PIT(R`At the top the velocity is zero for an instant but the acceleration is still $-10\ \text{m/s}^2$.`),
      H('Thrown from a height'),
      ARX(R`إذا رميت من مبنى فالموقع النهائي سالب بالنسبة ليدك (تحتها). ضع $y=0$ عند اليد وحل المعادلة التربيعية وخذ الجذر الموجب.`),
      IMG('building'),
      EX({ src: 'Lecture slides · building example (4 parts)', p: R`A stone is thrown straight up at $20\ \text{m/s}$ from the roof of a $50\ \text{m}$ building. (a) When does it reach the top? (b) How high above the hand? (c) Its velocity when it comes back to hand level? (d) Its position and velocity at $t=5\ \text{s}$?`,
        steps: [R`(a) $t = v_i/g = 20/10 = 2\ \text{s}$`, R`(b) $y_{max} = v_i^2/2g = 400/20 = 20\ \text{m}$`, R`(c) $v = -v_i = -20\ \text{m/s}$`, R`(d) $y = 20(5) - 5(25) = -25\ \text{m}$ (below the hand), $v = 20 - 10(5) = -30\ \text{m/s}$`],
        a: R`$2\ \text{s}$ · $20\ \text{m}$ · $-20\ \text{m/s}$ · $y=-25\ \text{m},\ v=-30\ \text{m/s}$`, ar: 'أربعة أسئلة من نفس المسألة، كل واحد يستخدم قانوناً مختلفاً من قوانين الرمي للأعلى.' }),
      EX({ src: 'Doctor’s questions · Q13 (dropped from a rising helicopter)', p: R`A helicopter’s height is $h = t^2$. At $t=7\ \text{s}$ it releases a mailbag. How long until the bag hits the ground?`,
        steps: [R`$h(7) = 49\ \text{m}$ and the helicopter is rising at $v = 2t = 14\ \text{m/s}$, so the bag starts with $+14\ \text{m/s}$`, R`$0 = 49 + 14t - 5t^2 \Rightarrow 5t^2 - 14t - 49 = 0$`, R`$t = \dfrac{14 + \sqrt{196 + 980}}{10}$`], a: R`$t \approx 4.83\ \text{s}$`, ar: 'الكيس لا يبدأ من السكون: سرعته الابتدائية هي سرعة المروحية لحظة إفلاته.' }),
      SUM([R`$a = -10\ \text{m/s}^2$ at every point of the flight.`, R`Up and down legs are symmetric: same $t$, same speed at the same height.`, 'In vacuum all masses fall together.'])
    ] }
  ];

  /* ---------------------------------------------------------------- glossary (EN → AR) */
  const glossary = [
    ['Displacement', 'الإزاحة'], ['Distance', 'المسافة'], ['Velocity', 'السرعة المتجهة'], ['Speed', 'السرعة القياسية'], ['Acceleration', 'التسارع'], ['Deceleration', 'التباطؤ (تناقص السرعة)'],
    ['Average', 'المتوسط'], ['Instantaneous', 'اللحظي'], ['Slope', 'الميل'], ['Tangent', 'المماس'], ['Derivative', 'المشتقة'], ['Constant', 'ثابت'], ['Uniform', 'منتظم'],
    ['Free fall', 'السقوط الحر'], ['Maximum height', 'أقصى ارتفاع'], ['Initial / final', 'ابتدائي / نهائي'], ['Scalar', 'كمية قياسية'], ['Vector', 'كمية متجهة'], ['At rest', 'ساكن'], ['Catch up', 'يلحق بـ']
  ];

  /* ---------------------------------------------------------------- questions */
  const Q = [];
  const ask = (s) => `<p class="ask">${s}</p>`;
  const mcq = (id, sec, html, opts, ok, expl, o) => Q.push(Object.assign({ id, sec, imp: 3, kind: 'mcq', html, options: opts.map((t, i) => ({ t, ok: i === ok })), expl }, o));
  const numq = (id, sec, html, ans, unit, expl, o) => Q.push(Object.assign({ id, sec, imp: 3, kind: 'num', html, ans, unit, expl }, o));
  const gx = (pts, o) => root.FIG.graph(Object.assign({ xs: 1 }, o, { lines: [{ pts }], dots: pts.slice(0, 1) }));
  const Gr = (pts, o) => root.FIG.graph(Object.assign({ xs: 1 }, o, { lines: [{ pts }] }));
  const mini = (pts) => { const xs = pts.map((p) => p[0]), ys = pts.map((p) => p[1]); const x1 = Math.max.apply(null, xs), y0 = Math.min.apply(null, ys.concat(0)), y1 = Math.max.apply(null, ys.concat(0)); const sx = (x) => 10 + x / x1 * 100, sy = (y) => 8 + (y1 - y) / (y1 - y0 || 1) * 54; return `<svg viewBox="0 0 120 70" class="graph" style="max-width:150px;margin:0" role="img" aria-label="v-t graph option"><line class="g-axis" x1="10" y1="${sy(0)}" x2="115" y2="${sy(0)}"/><line class="g-axis" x1="10" y1="4" x2="10" y2="66"/><polyline class="g-line" fill="none" points="${pts.map((p) => sx(p[0]).toFixed(1) + ',' + sy(p[1]).toFixed(1)).join(' ')}"/></svg>`; };

  /* ---- Lecture slides ---- */
  mcq('d1', 3, ask(R`An object’s position is $x(t) = t^2$ (SI units). Its velocity at $t = 2\ \text{s}$ (m/s) is:`), ['2', '4', '6', '8', '10'], 1, R`$v = dx/dt = 2t \Rightarrow v(2) = 4\ \text{m/s}$.`);
  mcq('d2', 3, ask(R`$x = t^3 - 2t^2 + 5t - 8$ (SI units). The acceleration at $t = 1\ \text{s}$ (m/s²) is:`), ['2', '8', '14', '20'], 0, R`$a = d^2x/dt^2 = 6t - 4 \Rightarrow a(1) = 2\ \text{m/s}^2$.`);
  numq('d3', 3, ask(R`An object moves along a line with $v = 4.20\,t$ (SI units). Find its acceleration at $t = 3\ \text{s}$.`), 4.2, 'm/s²', R`$a = dv/dt = 4.20\ \text{m/s}^2$ — constant, so the same at every $t$.`);
  numq('d4', 3, `<p>The $v_x$–$t$ graph of an object (velocity in cm/s):</p>${gx([[0, 8], [7, -8 / 6]], { xmin: 0, xmax: 7, ymin: -2, ymax: 8, ys: 2, xl: 't (s)', yl: 'v (cm/s)', h: 210, label: 'v-t' })}${ask('Find its acceleration (cm/s²).')}`, -8 / 6, 'cm/s²', R`$a = \Delta v/\Delta t = (0-8)/(6-0) = -1.33\ \text{cm/s}^2$. Constant, so the $a$–$t$ graph is a horizontal line at $-1.33$.`, { tol: 0.03 });
  mcq('d5', 4, ask(R`A car with $v_0 = 10\ \text{m/s}$ has constant acceleration $-1\ \text{m/s}^2$. How far does it travel before stopping (m)?`), ['−50', '25', '50', '−25', '−10'], 2, R`$0 = v_0^2 + 2a\Delta x \Rightarrow \Delta x = -100/(2\cdot(-1)) = 50\ \text{m}$. Distance is positive — $-50$ is the trap.`);
  mcq('d6', 4, ask(R`A car speeds up from $10\ \text{m/s}$ to $25\ \text{m/s}$ in $20\ \text{s}$. The distance travelled (m) is:`), ['300', '350', '400', '450', '500'], 1, R`$\Delta x = \dfrac{v_i+v_f}{2}\,t = 17.5\times 20 = 350\ \text{m}$.`);
  mcq('d7', 5, `<p>Velocity–time graph of an object moving along $x$:</p>${gx([[0, 12], [5, 0]], { xmin: 0, xmax: 5, ymin: 0, ymax: 14, ys: 2, xl: 't (s)', yl: 'v (m/s)', h: 210, label: 'v-t' })}${ask('Total distance from t = 0 to t = 5 s (m):')}`, ['15', '30', '−30', '60', '−60'], 1, R`Area $= \tfrac12(5)(12) = 30\ \text{m}$. Distance is positive.`);
  mcq('d8', 6, ask(R`A person jumps off a trampoline and rises $2\ \text{m}$. At the highest point the instantaneous velocity is zero. The acceleration (m/s²) is:`), ['10 upward', '0', '2 downward', '2 upward', '10 downward'], 4, R`Free-fall acceleration is $10\ \text{m/s}^2$ downward at every point — including the top.`);
  mcq('d9', 6, ask(R`A ball thrown straight up returns to the thrower’s hand after $10\ \text{s}$. Its initial speed is:`), ['100 m/s', '50 m/s', '25 m/s', '10 m/s', 'None of these'], 1, R`$t_{up} = 5\ \text{s} \Rightarrow v_0 = g\,t_{up} = 10\times 5 = 50\ \text{m/s}$.`);
  mcq('d10', 6, ask(R`A stone dropped from rest from a building hits the ground after $5\ \text{s}$. The building’s height (m) is:`), ['20', '45', '80', '125', '180'], 3, R`$h = \tfrac12 g t^2 = 5\times 25 = 125\ \text{m}$.`);
  mcq('d11', 6, ask(R`A stone is thrown straight up at $5\ \text{m/s}$ from a $100\ \text{m}$ building. Time to hit the ground (s):`), ['2', '3', '4', '5'], 3, R`$-100 = 5t - 5t^2 \Rightarrow t^2 - t - 20 = 0 \Rightarrow t = 5\ \text{s}$ (positive root).`);
  numq('d12', 5, `<p>Position–time graph of an object on the positive $x$ axis:</p>${V.xtTest()}${ask('Find its average velocity between A and D (m/s).')}`, 40 / 3, 'm/s', R`$\bar v = \Delta x/\Delta t = 40/3.0 \approx 13.3\ \text{m/s}$.`, { tol: 0.4 });
  numq('d13a', 6, '<p>A stone is thrown straight up at $20.0\\ \\text{m/s}$ from a $50.0\\ \\text{m}$ building (point A, $t_A = 0$, $g=10$).</p>' + ask('When does it reach its maximum height (s)?'), 2, 's', R`$t = v_0/g = 20/10 = 2\ \text{s}$.`, { grp: 'Building example' });
  numq('d13b', 6, '<p>Same stone.</p>' + ask('Maximum height <b>above the hand</b> (m)?'), 20, 'm', R`$\Delta y = v_0^2/2g = 400/20 = 20\ \text{m}$.`, { grp: 'Building example' });
  numq('d13c', 6, '<p>Same stone.</p>' + ask('Its velocity when it returns to hand level (m/s)?'), -20, 'm/s', R`$v = -v_0 = -20\ \text{m/s}$: same speed, opposite direction.`, { grp: 'Building example' });
  numq('d13d', 6, '<p>Same stone.</p>' + ask(R`Its position $y$ relative to the hand at $t = 5.00\ \text{s}$ (m)?`), -25, 'm', R`$y = 20(5) - 5(25) = -25\ \text{m}$, i.e. $25\ \text{m}$ below the hand. Velocity there: $-30\ \text{m/s}$.`, { grp: 'Building example' });
  numq('d14a', 5, `<p>Use the graph (A is at $10\ \text{m}$ at $t=0$; points are 1 s apart up to F):</p>${V.docGraph()}${ask('Displacement from E to the <b>second C</b> (E = 50 m, 2nd C = 30 m) in m?')}`, -20, 'm', R`$\Delta x = x_f - x_i = 30 - 50 = -20\ \text{m}$.`, { grp: 'Palm-tree car graph' });
  numq('d14b', 5, '<p>Same graph (E at $t=4\\ \\text{s}$; second D at $t=8\\ \\text{s}$, $x=40\\ \\text{m}$).</p>' + ask('Average velocity from E to the second D (m/s)?'), -2.5, 'm/s', R`$\Delta x = 40-50 = -10\ \text{m}$ in $\Delta t = 4\ \text{s}$ ⇒ $-2.5\ \text{m/s}$.`, { grp: 'Palm-tree car graph' });
  numq('d14c', 5, '<p>Same graph: from E ($50\\ \\text{m}$) up to G ($\\approx 65\\ \\text{m}$) then down to the second D ($40\\ \\text{m}$) in $4\\ \\text{s}$.</p>' + ask('Average speed from E to the second D (m/s, approx.)?'), 10, 'm/s', R`Distance $= 15 + 25 = 40\ \text{m}$ in $4\ \text{s}$ ⇒ $10\ \text{m/s}$.`, { tol: 0.6, grp: 'Palm-tree car graph' });
  numq('d14d', 5, ask(R`Same graph: average velocity between the first D ($t=3\ \text{s}$) and the second D ($t=8\ \text{s}$) (m/s)?`), 0, 'm/s', R`$x_f = x_i = 40\ \text{m}$ ⇒ $\Delta x = 0 \Rightarrow \bar v = 0$ (even though the distance is $50\ \text{m}$).`, { grp: 'Palm-tree car graph' });
  numq('d14e', 5, ask('Same graph: what is the speed at point G (the peak)?'), 0, 'm/s', R`At G the tangent is horizontal (slope $0$) ⇒ $v = 0$.`, { grp: 'Palm-tree car graph' });
  numq('d15a', 5, '<p>A car starts from rest at $x=-30\\ \\text{m}$ and reaches $B$ at $x=-10\\ \\text{m}$ with $v=10\\ \\text{m/s}$ after $4\\ \\text{s}$ (stage 1).</p>' + ask('Its acceleration (m/s²)?'), 2.5, 'm/s²', R`$a = \Delta v/\Delta t = 10/4 = 2.5\ \text{m/s}^2$. Check: $\tfrac12(2.5)(16) = 20\ \text{m}$ ✔`, { grp: 'Traffic-light car' });
  numq('d15b', 5, '<p>Stage 3: the car slows from $10\\ \\text{m/s}$ to rest in $2\\ \\text{s}$ (from $x=20$ to $x=30\\ \\text{m}$).</p>' + ask('Its acceleration (m/s²)?'), -5, 'm/s²', R`$a = (0-10)/2 = -5\ \text{m/s}^2$.`, { grp: 'Traffic-light car' });
  numq('d15c', 5, '<p>Stage 5: from rest at $x=30\\ \\text{m}$ the car moves to $x=20\\ \\text{m}$ and reaches $-15\\ \\text{m/s}$.</p>' + ask('Its acceleration (m/s²)?'), -11.25, 'm/s²', R`$v^2 = v_i^2 + 2a\Delta x \Rightarrow 225 = 2a(-10) \Rightarrow a = -11.25\ \text{m/s}^2$ (negative: motion in the − direction, speeding up).`, { tol: 0.05, grp: 'Traffic-light car' });

  /* ---- Doctor's question set (answer-key PDF) ---- */
  const k = (n, ...a) => { const f = a[0] === 'm' ? mcq : numq; f.apply(null, ['k' + n].concat(a.slice(1))); };
  k(1, 'n', 6, ask(R`A stone is dropped from rest from the top of an $80\ \text{m}$ building. Its speed when it hits the ground (m/s)?`), 40, 'm/s', R`$v^2 = 2gh = 2(10)(80) = 1600 \Rightarrow v = 40\ \text{m/s}$.`);
  k(2, 'n', 3, ask(R`$x = 2t^3 + 5t$ (m). Average acceleration between $t=0$ and $t=4\ \text{s}$ (m/s²)?`), 24, 'm/s²', R`$v = 6t^2 + 5 \Rightarrow v(0) = 5,\ v(4) = 101 \Rightarrow \bar a = (101-5)/4 = 24\ \text{m/s}^2$. Differentiate first.`);
  k(3, 'n', 4, ask(R`An object at $30\ \text{m/s}$ slows with constant acceleration $-5\ \text{m/s}^2$. Time to stop (s)?`), 6, 's', R`$0 = 30 - 5t \Rightarrow t = 6\ \text{s}$.`);
  k(4, 'm', 6, ask(R`You throw a ball straight up and catch it $3.2\ \text{s}$ later at the same place. The maximum height (m) is:`), ['1.8', '3.2', '6.0', '12.8', '21.0'], 3, R`$t_{up} = 1.6\ \text{s} \Rightarrow h = \tfrac12(10)(1.6)^2 = 12.8\ \text{m}$.`);
  k(5, 'm', 5, `<p>Velocity–time graph of an object thrown upward:</p>${Gr([[0, 15], [3, -15]], { xmin: 0, xmax: 3.5, ymin: -15, ymax: 15, xs: 0.5, ys: 5, xl: 't (s)', yl: 'v (m/s)', h: 220, label: 'v-t' })}${ask('Total distance travelled (m)?')}`, ['22.5', '40.0', '62.5', '90', 'More information is required'], 0, R`Rising: $t = 15/10 = 1.5\ \text{s}$, area $\tfrac12(1.5)(15) = 11.25\ \text{m}$; falling: the same. $d = 22.5\ \text{m}$ (add the areas as positive numbers).`);
  k(6, 'm', 6, ask('An egg is thrown upward. Which statement is <b>wrong</b>?'), ['The total displacement is zero', 'The total distance is $2h$', 'The acceleration at maximum height is zero', 'The speed decreases as it goes up', 'The velocity $v_y$ is negative as it falls'], 2, R`At the top $v=0$ but $a=-g\neq 0$. This is the most-tested trap.`);
  k(7, 'm', 1, `<p>Position–time graph (points A at $t=0.5\\ \\text{s}$, $x=4\\ \\text{m}$ and B at $t=1.5\\ \\text{s}$, $x=8\\ \\text{m}$):</p>${Gr([[0, 0], [0.25, 2.2], [0.5, 4], [1, 6.5], [1.5, 8], [2.5, 9.4], [3.5, 10]], { xmin: 0, xmax: 3.5, ymin: 0, ymax: 10, xs: 0.5, ys: 2, xl: 't (s)', yl: 'x (m)', h: 220, label: 'x-t', dots: [[0.5, 4], [1.5, 8]], texts: [{ x: 0.75, y: 3.2, t: 'A' }, { x: 1.85, y: 7.2, t: 'B' }] })}${ask('Average velocity between A and B (m/s)?')}`, ['−4', '−1', '0', '1', '4'], 4, R`$\bar v = \dfrac{8-4}{1.5-0.5} = 4\ \text{m/s}$ — only the two points matter, not the curve between them.`);
  k(8, 'm', 4, ask(R`A car at $v_i = 22.4\ \text{m/s}$ stops in $3\ \text{s}$ (uniform acceleration). Distance travelled (m)?`), ['22.4', '33.6', '44.8', '56.0', '67.2'], 1, R`$\Delta x = \dfrac{v_i+v_f}{2}t = 11.2\times 3 = 33.6\ \text{m}$.`);
  k(9, 'm', 4, ask(R`A racing car accelerates uniformly from rest to $27.8\ \text{m/s}$ over $25.1\ \text{m}$. Its acceleration (m/s²)?`), ['15.4', '12.8', '11.6', '10.7', '9.93'], 0, R`$v^2 = 2a\Delta x \Rightarrow a = \dfrac{27.8^2}{2(25.1)} = \dfrac{772.84}{50.2} \approx 15.4\ \text{m/s}^2$.`);
  k(10, 'm', 6, ask('Which statement is <b>wrong</b> for one-dimensional motion?'), ['Average velocity equals instantaneous velocity when the acceleration is zero', 'The $x$–$t$ graph is always a straight line when the velocity is constant', 'The $v$–$t$ graph is a straight line when the acceleration is constant', 'At the maximum height of an upward throw, velocity and acceleration are both zero', 'The distance fallen by a free-falling body increases each second'], 3, R`At the top only $v=0$; $a$ stays $-g$.`);
  k(11, 'n', 2, ask(R`A dog runs at $10\ \text{m/s}$, $25\ \text{m}$ behind a cat running at $5\ \text{m/s}$. Time for the dog to catch the cat (s)?`), 5, 's', R`$10t = 25 + 5t \Rightarrow t = 5\ \text{s}$ (or $t = d/(v_1-v_2) = 25/5$).`);
  k(12, 'n', 2, `<p>Position–time graph: a straight line from $(0,\\ 6\\ \\text{m})$ to $(6\\ \\text{s},\\ 0)$.</p>${Gr([[0, 6], [6, 0]], { xmin: 0, xmax: 6, ymin: 0, ymax: 6, xs: 1, ys: 1, xl: 't (s)', yl: 'x (m)', h: 210, label: 'x-t' })}${ask('The speed at $t = 1\\ \\text{s}$ (m/s)?')}`, 1, 'm/s', R`Slope $= (0-6)/6 = -1\ \text{m/s}$ ⇒ speed $= |v| = 1\ \text{m/s}$.`);
  k(13, 'n', 6, ask(R`A helicopter’s height is $h = t^2$ (m, s). At $t = 7\ \text{s}$ it releases a mailbag. How long after release does the bag reach the ground (s)?`), 4.83, 's', R`$h(7) = 49\ \text{m}$, helicopter velocity $2t = 14\ \text{m/s}$ upward. For the bag: $0 = 49 + 14t - 5t^2 \Rightarrow t = \dfrac{14+\sqrt{1176}}{10} \approx 4.83\ \text{s}$. The bag starts with the helicopter’s velocity.`, { tol: 0.1 });
  k(14, 'm', 4, ask(R`A racing car starts from rest and reaches speed $v$ at time $t$ with constant acceleration. Which is true?`), ['The magnitude of the acceleration is $v/t$', 'The velocity stays constant', 'The car travels a distance $vt$', 'None of the statements is true', 'The average speed is $v/4$'], 0, R`$a = \Delta v/\Delta t = v/t$. The distance is $\tfrac12 vt$ and the average speed $v/2$.`);
  k(15, 'n', 1, `<p>Position–time graph (parabola): $x(1)=11$, $x(2)=6$, $x(3)=3$, $x(4)=2$, $x(5)=3$, $x(6)=6$, $x(7)=11$ (m).</p>${Gr([[1, 11], [2, 6], [3, 3], [4, 2], [5, 3], [6, 6], [7, 11]], { xmin: 0, xmax: 7, ymin: 0, ymax: 12, xs: 1, ys: 2, xl: 't (s)', yl: 'x (m)', h: 220, label: 'x-t' })}${ask('Average velocity from t = 1 s to t = 3 s (m/s)?')}`, -4, 'm/s', R`$\bar v = (3-11)/(3-1) = -4\ \text{m/s}$.`);
  k(16, 'm', 1, ask('If the average velocity of an object is zero over some interval, what can you say about its displacement?'), ['$\\Delta x < 0$', '$\\Delta x > 0$', '$\\Delta x \\neq 0$', '$\\Delta x$ can be less than, equal to, or greater than zero', '$\\Delta x = 0$'], 4, R`$\bar v = \Delta x/\Delta t = 0 \Rightarrow \Delta x = 0$ (even if the distance travelled is not zero).`);
  const VT = [[0, -10], [4, -10], [10, 20], [13, 20], [18, 0]];
  const vtd = '<p>An object starts at $x=0$ at $t=0$ and moves according to this velocity–time graph:</p>' + Gr(VT, { xmin: 0, xmax: 18, ymin: -10, ymax: 20, xs: 2, ys: 10, xl: 't (s)', yl: 'vx (m/s)', h: 230, label: 'v-t' });
  k(17, 'n', 5, vtd + ask('Final position $x_f$ at $t = 18\\ \\text{s}$ (m)?'), 100, 'm', R`Signed areas: $-10\times 4 = -40$; $\tfrac12(-10+20)\times 6 = +30$; $20\times 3 = +60$; $\tfrac12\times 20\times 5 = +50$. Sum $= 100\ \text{m}$.`, { grp: 'Same v–t graph' });
  k(18, 'n', 5, vtd + ask('Total distance moved between $t=0$ and $t=18\\ \\text{s}$ (m)?'), 200, 'm', R`Add the areas as positive numbers: $40 + 10 + 40 + 60 + 50 = 200\ \text{m}$ (the $+30$ segment is really $-10$ for $2\ \text{s}$ and $+40$ for $4\ \text{s}$).`, { grp: 'Same v–t graph' });
  k(19, 'n', 5, '<p>Same graph ($v = 20\\ \\text{m/s}$ from $t=10$ to $t=13\\ \\text{s}$).</p>' + ask('Acceleration between $t=10\\ \\text{s}$ and $t=13\\ \\text{s}$ (m/s²)?'), 0, 'm/s²', R`$v$ is constant ⇒ slope $0$ ⇒ $a = 0$.`, { grp: 'Same v–t graph' });
  k(20, 'n', 2, ask(R`A truck moves at constant $21\ \text{m/s}$, $100\ \text{m}$ ahead of a police car moving at constant $25\ \text{m/s}$. Time for the police to catch the truck (s)?`), 25, 's', R`$25t = 100 + 21t \Rightarrow 4t = 100 \Rightarrow t = 25\ \text{s}$.`);
  k(21, 'n', 5, `<p>A particle starts from rest; its acceleration–time graph:</p>${Gr([[0, 2], [10, 2], [10, 0], [15, 0], [15, -3], [20, -3]], { xmin: 0, xmax: 20, ymin: -3, ymax: 2, xs: 5, ys: 1, xl: 't (s)', yl: 'a (m/s²)', h: 200, label: 'a-t' })}${ask('Speed at $t = 8\\ \\text{s}$ (m/s)?')}`, 16, 'm/s', R`Area under $a$–$t$ is $\Delta v$: $v(8) = 2\times 8 = 16\ \text{m/s}$.`);
  k(22, 'm', 1, ask('Which quantity is <b>not</b> a vector?'), ['Momentum', 'Velocity', 'Acceleration', 'Power', 'Impulse'], 3, 'Power is a scalar.');
  k(23, 'm', 1, ask('Which quantity is a vector?'), ['Time', 'Volume of your room', 'Acceleration', 'Speed', 'Mass'], 2, 'Acceleration is a vector; time, volume, speed and mass are scalars.');
  k(24, 'm', 5, `<p>Velocity–time graph of a particle on a straight line:</p>${Gr([[0, 0], [2, 10], [8, 10], [10.5, 0], [12, -6]], { xmin: 0, xmax: 12, ymin: -6, ymax: 12, xs: 2, ys: 6, xl: 't (s)', yl: 'v (m/s)', h: 210, label: 'v-t' })}${ask('The velocity between $t=2\\ \\text{s}$ and $t=8\\ \\text{s}$ can be described as:')}`, ['Increasing from zero at constant acceleration', 'Constant, so the acceleration is zero and the motion is uniform', 'Decreasing at constant negative acceleration', 'The object stops momentarily and then reverses'], 1, 'A horizontal segment on a $v$–$t$ graph means constant velocity ⇒ slope $0$ ⇒ $a=0$.');
  k(25, 'n', 3, ask(R`$x = 2t^2 + 5t + 10$ (SI units). Instantaneous velocity at $t = 4\ \text{s}$ (m/s)?`), 21, 'm/s', R`$v = dx/dt = 4t + 5 \Rightarrow v(4) = 21\ \text{m/s}$.`);
  k(28, 'm', 6, ask('Ball A (1 kg) and ball B (10 kg) are dropped from rest from a roof at the same time. Which lands first?'), ['Both at the same time', 'Ball A', 'Ball B', 'Depends on the building’s height', 'Depends on $g$'], 0, 'Every object has the same free-fall acceleration (no air resistance), so mass does not matter.');
  k(29, 'n', 6, ask(R`A ball is thrown straight up at $15\ \text{m/s}$. Its acceleration at maximum height (m/s²)?`), -10, 'm/s²', R`$a = -g = -10\ \text{m/s}^2$ at every point (up is positive).`);
  k(30, 'm', 6, ask(R`A boy on a building throws a ball straight up at $4\ \text{m/s}$; it hits the ground at $14\ \text{m/s}$. Building height (m)?`), ['90', '9', '0', '−9', '−90'], 1, R`$v^2 = v_0^2 + 2gh \Rightarrow 196 = 16 + 20h \Rightarrow h = 9\ \text{m}$ (the final speed is squared, so the launch direction does not matter).`);
  k(31, 'm', 6, ask(R`A boy on a cliff throws a stone straight down at $5\ \text{m/s}$; it lands after $2\ \text{s}$. Cliff height (m)?`), ['−30', '−10', '5', '10', '30'], 4, R`$h = v_0 t + \tfrac12 g t^2 = 5(2) + 5(4) = 30\ \text{m}$.`);
  k(32, 'n', 4, ask(R`A car at $4\ \text{m/s}$ accelerates at $2\ \text{m/s}^2$. Time to reach $10\ \text{m/s}$ (s)?`), 3, 's', R`$t = (10-4)/2 = 3\ \text{s}$.`);
  const q33 = [[[1, 1], [5, 5]], [[2, 1], [6, 3]], [[0, 5], [4, 6]], [[1, 4], [5, 6]]];
  k(33, 'm', 5, `<p>Five particles A–E move along $x$; their positions vs time are shown (E is the flat line at the bottom; the dashed line marks $t_0 = 3$):</p>${root.FIG.graph({ xmin: 0, xmax: 6.5, ymin: 0, ymax: 6.5, xs: 1, ys: 1, xl: 't', yl: 'x', h: 230, label: 'x-t five particles', lines: q33.map((p) => ({ pts: p })).concat([{ pts: [[1.5, 0.4], [5.2, 0.4]] }, { pts: [[3, 0], [3, 6.5]], cls: 'g-dash' }]), texts: [{ x: 4.2, y: 3.7, t: 'A' }, { x: 5.5, y: 2.5, t: 'B' }, { x: 0.8, y: 5.6, t: 'C' }, { x: 3.6, y: 5.3, t: 'D' }, { x: 3.4, y: 0.8, t: 'E' }] })}${ask('At $t_0$, which particle has the greatest instantaneous velocity?')}`, ['A', 'B', 'C', 'D', 'E'], 0, 'Velocity = slope. Line A is the steepest (slope 1); B and D have slope 0.5, C less, E zero.');
  k(34, 'n', 3, ask(R`$x(t) = 4t^2 - 16t - 12$ (SI units). At what time is the particle momentarily at rest (s)?`), 2, 's', R`$v = 8t - 16 = 0 \Rightarrow t = 2\ \text{s}$.`);
  k(35, 'n', 4, ask(R`You drive at $40\ \text{m/s}$ and brake to a stop $39\ \text{m}$ before a fallen tree. What minimum acceleration (m/s²) is needed?`), -20.5, 'm/s²', R`$0 = 40^2 + 2a(39) \Rightarrow a = -1600/78 \approx -20.5\ \text{m/s}^2$ (negative: slowing down).`, { tol: 0.1 });
  const segP = [[0, -1], [4, 2], [10, 2], [11, 0], [15, 0], [19, -2]], segT = [{ x: 1.4, y: 0.7, t: 'A' }, { x: 7, y: 1.6, t: 'B' }, { x: 10.9, y: 1.1, t: 'C' }, { x: 13, y: 0.5, t: 'D' }, { x: 17.4, y: -1, t: 'E' }];
  const segG = Gr(segP, { xmin: 0, xmax: 19, ymin: -2, ymax: 2, xs: 2, ys: 1, xl: 't (s)', yl: 'x (m)', h: 200, label: 'x-t segments', texts: segT });
  k(36, 'm', 5, `<p>An object’s position-vs-time graph; segments A–E each have constant slope:</p>${segG}${ask('In which segment is the object moving to the left?')}`, ['A', 'B', 'C', 'D', 'E'], 4, R`Moving left means $v<0$: $x$ decreases (negative slope). The answer key gives E. Note that C also slopes downward, so be ready to justify your choice if the options differ.`);
  k(37, 'm', 6, ask(R`A boy on a bridge throws stone A straight down and stone B straight up, both at speed $v_0$. Which hits the water faster (greater speed)?`), ['A', 'B', 'Both have the same speed', 'The one with the longer flight time', 'The heavier stone'], 2, R`B returns to the bridge level with speed $v_0$ downward, exactly like A, then both fall the same height: $v^2 = v_0^2 + 2gh$.`);
  k(38, 'm', 5, `<p>Same position-vs-time graph (segments A–E have constant slope):</p>${segG}${ask('In which segments is the object at rest?')}`, ['B and D', 'A', 'C and E'], 0, R`At rest means slope $0$: the horizontal segments B and D. (Horizontal anywhere counts, not only at $x=0$.)`);
  k(39, 'm', 5, ask('A particle is thrown vertically upward from the ground and returns to it. Which $v$–$t$ graph describes the whole trip? (up is positive)'), [mini([[0, 10], [1, -10]]), mini([[0, -10], [1, 10]]), mini([[0, 10], [0.5, 0], [1, 10]]), mini([[0, 0], [0.25, 8], [0.5, 10], [0.75, 8], [1, 0]])], 0, R`$v$ starts positive, decreases at a constant rate ($a=-g$), crosses zero at the top and becomes negative: one straight descending line.`);
  k(40, 'n', 4, ask(R`A car starts from rest and accelerates at $3\ \text{m/s}^2$ for $30\ \text{s}$, then moves at constant speed for $60\ \text{s}$, then slows at $1.0\ \text{m/s}^2$ until it stops. Total time (s)?`), 180, 's', R`Stage 1: $v = 3\times 30 = 90\ \text{m/s}$. Stage 3: $t = 90/1 = 90\ \text{s}$. Total $= 30+60+90 = 180\ \text{s}$.`);
  k(41, 'm', 6, ask('A 5.0 kg bowling ball and a 10 g feather are dropped together in a 10 m vacuum tube. When do they reach the bottom?'), ['At the same time', 'The ball first', 'The feather first', 'The feather never arrives'], 0, 'No air ⇒ the same acceleration $g$ for every object.');
  k(42, 'm', 3, ask('For which position function is the velocity in the negative $x$ direction?'), ['$x = \\dfrac{5}{t^3} - 5$', '$x = -\\dfrac{25}{t^2}$', '$x = -\\dfrac{18}{t^2} + 5$'], 0, R`$v=dx/dt$: (A) $-15/t^4<0$ ✔; (B) $+50/t^3>0$ ✘; (C) $+36/t^3>0$ ✘.`);

  /* ---- Textbook (Serway) ---- */
  mcq('b1', 1, ask('Quick Quiz 2.2: Under which condition is the magnitude of the average velocity smaller than the average speed?'), ['The particle moves in the $+x$ direction without reversing', 'The particle moves in the $-x$ direction without reversing', 'The particle moves in $+x$ and then reverses', 'There is no such condition'], 2, R`Distance exceeds $|\Delta x|$ only when the direction reverses.`);
  mcq('b2', 3, ask('Quick Quiz 2.5: A car travelling east is slowing down. What is the direction of the force that slows it?'), ['East', 'West', 'Neither east nor west'], 1, 'Slowing down means the acceleration points opposite to the velocity, so the net force points west.');
  mcq('b3', 3, ask('Quick Quiz 2.6: Which statement is true?'), ['A car travelling east must have an eastward acceleration', 'A slowing car must have a negative acceleration', 'A particle with constant acceleration can never stop and stay stopped'], 2, 'If it stopped and stayed stopped, its acceleration would be zero after stopping — not constant. At the top of a throw it stops only for an instant.');
  mcq('b4', 6, ask('Quick Quiz 2.8 (i): After a ball is thrown upward, what happens to its <b>acceleration</b>?'), ['Increases', 'Decreases', 'Increases then decreases', 'Decreases then increases', 'Stays the same'], 4, 'The acceleration is $g$ downward for the whole flight.');
  mcq('b5', 6, ask('Quick Quiz 2.8 (ii): What happens to the ball’s <b>speed</b>?'), ['Increases', 'Decreases', 'Increases then decreases', 'Decreases then increases', 'Stays the same'], 3, 'It decreases to zero at the top, then increases on the way down.');
  numq('b6', 1, '<p>Example 2.1: a car is at $x = 30\\ \\text{m}$ at $t=0$ and at $x=-53\\ \\text{m}$ at $t = 50\\ \\text{s}$.</p>' + ask('Displacement (m)?'), -83, 'm', R`$\Delta x = -53 - 30 = -83\ \text{m}$ (to the left).`, { grp: 'Example 2.1' });
  numq('b7', 1, '<p>Same car ($\\Delta x = -83\\ \\text{m}$ in $50\\ \\text{s}$).</p>' + ask('Average velocity (m/s)?'), -1.7, 'm/s', R`$\bar v = -83/50 \approx -1.7\ \text{m/s}$.`, { tol: 0.05, grp: 'Example 2.1' });
  numq('b8', 1, '<p>Same car: total path length $127\\ \\text{m}$ in $50\\ \\text{s}$.</p>' + ask('Average speed (m/s)?'), 2.54, 'm/s', R`$127/50 \approx 2.5\ \text{m/s}$ — positive, and different from $|\bar v| = 1.7$.`, { tol: 0.06, grp: 'Example 2.1' });
  numq('b9', 1, '<p>Problem 2: a particle moves according to $x = 10t^2$ (SI units).</p>' + ask('Average velocity from $t = 2.00\\ \\text{s}$ to $3.00\\ \\text{s}$ (m/s)?'), 50, 'm/s', R`$x(3)=90,\ x(2)=40 \Rightarrow \Delta x = 50\ \text{m}$ in $1\ \text{s}$ ⇒ $50\ \text{m/s}$.`, { grp: 'Problem 2' });
  numq('b10', 3, '<p>Same particle, $x = 10t^2$.</p>' + ask('Average velocity from $t = 2.00$ to $2.10\\ \\text{s}$ (m/s)?'), 41, 'm/s', R`$x(2.1)=44.1 \Rightarrow \Delta x=4.1\ \text{m}$ in $0.1\ \text{s}$ ⇒ $41\ \text{m/s}$. As the interval shrinks this approaches the instantaneous velocity $v(2) = 40\ \text{m/s}$.`, { tol: 0.2, grp: 'Problem 2' });
  const tab3 = '<p>Problem 3 — position of a car: $t=0,1,2,3,4,5\\ \\text{s}$ → $x = 0,\\ 2.3,\\ 9.2,\\ 20.7,\\ 36.8,\\ 57.5\\ \\text{m}$.</p>';
  numq('b11', 1, tab3 + ask('Average velocity during the first second (m/s)?'), 2.3, 'm/s', R`$(2.3-0)/1 = 2.3\ \text{m/s}$.`, { grp: 'Problem 3' });
  numq('b12', 1, tab3 + ask('Average velocity over the last $3\\ \\text{s}$ ($t=2$ to $5\\ \\text{s}$) (m/s)?'), 16.1, 'm/s', R`$(57.5-9.2)/3 = 16.1\ \text{m/s}$.`, { tol: 0.05, grp: 'Problem 3' });
  numq('b13', 1, tab3 + ask('Average velocity over the entire period (m/s)?'), 11.5, 'm/s', R`$57.5/5 = 11.5\ \text{m/s}$.`, { tol: 0.05, grp: 'Problem 3' });
  numq('b14', 2, '<p>Problem 6: a car travels a distance $d$ at $60.0\\ \\text{mi/h}$, then another distance $d$ in the same direction at a second constant speed. The average velocity for the whole trip is $30.0\\ \\text{mi/h}$.</p>' + ask('The second speed (mi/h)?'), 20, 'mi/h', R`$\bar v = \dfrac{2d}{d/60 + d/v} = 30 \Rightarrow \dfrac1{60}+\dfrac1v = \dfrac1{15} \Rightarrow v = 20\ \text{mi/h}$. (Not the simple mean of the speeds!)`, { grp: 'Problem 6' });
  numq('b15', 1, '<p>Same problem, but the second distance $d$ is driven in the <b>opposite</b> direction at $20\\ \\text{mi/h}$ (returning home).</p>' + ask('Average velocity for the whole trip (mi/h)?'), 0, 'mi/h', R`Back at the start ⇒ $\Delta x = 0 \Rightarrow \bar v = 0$. (Average speed $= 2d/(d/60 + d/20) = 30\ \text{mi/h}$.)`, { grp: 'Problem 6' });
  numq('b16', 1, '<p>Problem 7: a person drives at constant $89.5\\ \\text{km/h}$ except for a $22.0\\ \\text{min}$ rest stop. The average speed for the trip is $77.8\\ \\text{km/h}$.</p>' + ask('Total time of the trip (h)?'), 2.8, 'h', R`$89.5\,(T - 0.3667) = 77.8\,T \Rightarrow 11.7\,T = 32.82 \Rightarrow T \approx 2.80\ \text{h}$. (Distance $= 77.8\times 2.805 \approx 218\ \text{km}$.)`, { tol: 0.03, grp: 'Problem 7' });
  numq('b17', 4, '<p>Problem 17: an object with uniform acceleration has $v = 12.0\\ \\text{cm/s}$ (positive $x$) at $x = 3.00\\ \\text{cm}$. Two seconds later $x = 25.00\\ \\text{cm}$.</p>' + ask('Its acceleration (cm/s²)?'), -1, 'cm/s²', R`$25 = 3 + 12(2) + \tfrac12 a(4) \Rightarrow 22 = 24 + 2a \Rightarrow a = -1.00\ \text{cm/s}^2$.`, { tol: 0.03 });
  numq('b18', 4, '<p>Problem 16: a jet lands at $100\\ \\text{m/s}$; the largest acceleration it can have is $5.00\\ \\text{m/s}^2$ in magnitude.</p>' + ask('Minimum time to stop (s)?'), 20, 's', R`$t = (0-100)/(-5) = 20\ \text{s}$.`, { grp: 'Problem 16' });
  mcq('b19', 4, '<p>Same jet (Problem 16).</p>' + ask('Can it land on an island runway $0.800\\ \\text{km}$ long?'), ['Yes', 'No'], 1, R`Minimum distance $= v^2/2a = 10000/10 = 1000\ \text{m} = 1.00\ \text{km} > 0.800\ \text{km}$ ⇒ no.`, { grp: 'Problem 16' });
  mcq('b20', 4, ask('Problem 20: a rhinoceros starts from rest and moves $50.0\\ \\text{m}$ in $10.0\\ \\text{s}$ with constant acceleration, reaching $8.00\\ \\text{m/s}$. Why is this impossible?'), ['The displacement would be negative', 'Average velocity $5\\ \\text{m/s}$ requires a final speed of $10\\ \\text{m/s}$, not $8$', 'The acceleration would be zero', 'The time is too long'], 1, R`From rest with constant $a$: $\bar v = v_f/2 \Rightarrow v_f = 2(50/10) = 10\ \text{m/s} \neq 8\ \text{m/s}$.`);
  numq('b21', 6, '<p>Problem 28: a ball is thrown up from the ground at $25\\ \\text{m/s}$; at the same instant another ball is dropped from a $15\\ \\text{m}$ building.</p>' + ask('After how long are they at the same height (s)?'), 0.6, 's', R`$25t - 5t^2 = 15 - 5t^2 \Rightarrow t = 15/25 = 0.60\ \text{s}$. The $t^2$ terms cancel, so $g$ is not needed.`, { tol: 0.02 });
  numq('b22', 6, '<p>Problem 31 (simplified): a defendant can throw at $20\\ \\text{m/s}$. Treat the throw as straight up at $20\\ \\text{m/s}$ ($g=10$). The window is $19.0\\ \\text{m}$ above the sidewalk.</p>' + ask('Maximum height reached (m)?'), 20, 'm', R`$y_{max} = v^2/2g = 400/20 = 20\ \text{m} > 19\ \text{m}$ ⇒ he can reach the window.`, { tol: 0.5 });

  /* ---------------------------------------------------------------- hints (hidden until the student asks) */
  const HD = { 1: ['Displacement / velocity concept', ['disp', 'avgv'], 'ابدأ بتحديد الموقعين والزمنين ثم طبّق القانون المناسب.'], 2: ['Constant velocity', ['unif', 'catch'], 'السرعة ثابتة: الموقع = البداية + السرعة × الزمن.'], 3: ['Derivatives', ['inst', 'inst2'], 'اشتق أولاً ثم عوّض.'], 4: ['Constant acceleration', ['eq2', 'eq1', 'eq3', 'vbar'], 'اشطب المتغير غير المذكور واختر المعادلة الباقية.'], 5: ['Reading graphs', ['area'], 'الميل والمساحة هما مفتاح الرسم.'], 6: ['Free fall', ['free', 'up'], 'اجعل الأعلى موجباً ثم a = −10.'] };
  const HT = {
    d1: ['Instantaneous velocity from x(t)', ['inst'], 'عندك الموقع كدالة في الزمن: اشتق أولاً ثم عوّض قيمة الزمن.'],
    d2: ['Acceleration from x(t)', ['inst', 'inst2'], 'اشتق مرتين (الموقع ثم السرعة) وبعدها عوّض t.'],
    d3: ['Acceleration from v(t)', ['inst2'], 'اشتق السرعة بالنسبة للزمن. إذا خرج رقم ثابت فهو التسارع.'],
    d4: ['Average acceleration from a v–t graph', ['avga'], 'اقرأ قيمتين للسرعة وزمنيهما من الرسم ثم Δv ÷ Δt.'],
    d5: ['Stopping distance (no time given)', ['eq3'], 'كلمة «يتوقف» تعني vf = 0، ولا يوجد زمن، فاستخدم المعادلة الخالية من t.'],
    d6: ['Distance from vi, vf and t', ['vbar'], 'عندك السرعتان والزمن بدون تسارع: متوسط السرعتين × الزمن.'],
    d7: ['Distance from a v–t graph', ['area'], 'المسافة = المساحة تحت الخط (مثلث في هذه المسألة).'],
    d8: ['Concept: acceleration at the top', ['free'], 'التسارع في السقوط الحر ثابت (10 م/ث² للأسفل) حتى عند أعلى نقطة.'],
    d9: ['Return time ⇒ initial speed', ['up'], 'زمن الصعود نصف الزمن الكلي، ثم vi = g × زمن الصعود.'],
    d10: ['Dropped from rest: height', ['free'], 'السقوط من السكون (vi = 0): الارتفاع = ½ g t².'],
    d11: ['Thrown from a height: time to the ground', ['free'], 'ضع y = −100 عند الأرض، تحصل معادلة تربيعية في t، وخذ الجذر الموجب.'],
    d12: ['Average velocity from an x–t graph', ['avgv'], 'اقرأ الموقعين والزمنين من الرسم ثم Δx ÷ Δt.'],
    d13a: ['Time to the peak', ['up'], 'زمن الصعود = vi ÷ g.'],
    d13b: ['Maximum height above the launch point', ['up'], 'أقصى ارتفاع = vi² ÷ 2g، ويُقاس من نقطة الرمي.'],
    d13c: ['Velocity back at the launch level', ['up'], 'عند نفس المستوى تكون السرعة نفسها بالاتجاه المعاكس: v = −vi.'],
    d13d: ['Position at a given time', ['free'], 'عوّض في y = vi·t − ½ g t². الإشارة السالبة تعني أسفل نقطة الرمي.'],
    d14a: ['Displacement from an x–t graph', ['disp'], 'النهاية ناقص البداية: اقرأ x عند النقطتين.'],
    d14b: ['Average velocity from a graph', ['avgv'], 'Δx ÷ Δt بين النقطتين فقط.'],
    d14c: ['Average speed (path length)', ['avgs', 'dist'], 'اجمع طول كل جزء من المسار كأرقام موجبة ثم اقسم على الزمن.'],
    d14d: ['Same start and end position', ['avgv'], 'نفس الموقع ⇒ Δx = 0 ⇒ السرعة المتجهة المتوسطة صفر.'],
    d14e: ['Speed at a peak of an x–t graph', ['inst'], 'السرعة اللحظية = ميل المماس، وعند القمة المماس أفقي.'],
    d15a: ['Acceleration from rest', ['avga'], 'a = Δv ÷ Δt مع البداية من السكون.'],
    d15b: ['Braking acceleration', ['avga'], 'السرعة النهائية صفر، لذلك التسارع سالب.'],
    d15c: ['Acceleration with no time given', ['eq3'], 'عندك الإزاحة والسرعتان بدون زمن؛ انتبه لإشارة Δx.'],
    k1: ['Dropped from rest: final speed', ['eq3', 'free'], 'vi = 0 ولا يوجد زمن: v² = 2gh.'],
    k2: ['Average acceleration from x(t)', ['inst', 'avga'], 'اشتق لتحصل على v(t)، احسب v عند الزمنين ثم Δv ÷ Δt.'],
    k3: ['Time to stop', ['eq2'], 'vf = 0، لذلك t = (vf − vi) ÷ a.'],
    k4: ['Round-trip time ⇒ maximum height', ['up'], 'زمن الصعود نصف الكلي، ثم الارتفاع = ½ g t².'],
    k5: ['Distance from a v–t graph that crosses zero', ['area'], 'اجمع المساحتين (فوق المحور وتحته) كأرقام موجبة.'],
    k6: ['Concept: thrown object', ['free'], 'ابحث عن الجملة الخاطئة: التسارع لا يساوي صفراً عند القمة.'],
    k7: ['Average velocity from an x–t graph', ['avgv'], 'نقطتان فقط، تجاهل شكل المنحنى بينهما.'],
    k8: ['Stopping distance with time', ['vbar'], 'عندك الزمن وvi وvf = 0: المسافة = متوسط السرعتين × الزمن.'],
    k9: ['Acceleration from rest, distance given', ['eq3'], 'vi = 0 وبدون زمن: a = v² ÷ 2Δx.'],
    k10: ['Concept: which statement is wrong', ['free'], 'تذكر: عند القمة v = 0 لكن a = −g.'],
    k11: ['Catch-up', ['catch'], 'اكتب موقع كل واحد من نفس الأصل وساوِ بينهما.'],
    k12: ['Speed from the slope of an x–t graph', ['inst'], 'الميل = السرعة، والسرعة القياسية هي القيمة المطلقة للميل.'],
    k13: ['Dropped from a rising carrier', ['free', 'inst'], 'سرعة الكيس الابتدائية = سرعة المروحية (اشتق h)، ثم y = 0 عند الأرض.'],
    k14: ['Concept: constant acceleration from rest', ['avga'], 'a = Δv ÷ Δt مع البدء من السكون.'],
    k15: ['Average velocity from a graph', ['avgv'], 'Δx ÷ Δt بين t = 1 وt = 3.'],
    k16: ['Concept: average velocity is zero', ['avgv'], 'v̄ = Δx ÷ Δt، فإذا كانت صفراً فالإزاحة صفر.'],
    k17: ['Final position from a v–t graph', ['area'], 'اجمع المساحات بإشاراتها (تحت المحور سالبة).'],
    k18: ['Total distance from a v–t graph', ['area', 'dist'], 'اجمع المساحات كلها موجبة، وقسّم المقطع الذي يقطع الصفر.'],
    k19: ['Acceleration on a flat v–t segment', ['inst2'], 'خط أفقي ⇒ ميل صفر ⇒ a = 0.'],
    k20: ['Catch-up', ['catch'], 'ساوِ بين موقعي الشرطة والشاحنة.'],
    k21: ['Speed from an a–t graph', ['area'], 'المساحة تحت منحنى a–t تساوي التغير في السرعة Δv.'],
    k22: ['Concept: scalar vs vector', ['disp'], 'المتجه له اتجاه (إزاحة، سرعة متجهة، تسارع). القدرة كمية قياسية.'],
    k23: ['Concept: scalar vs vector', ['disp'], 'المتجه له اتجاه، والكميات القياسية فقط مقدار.'],
    k24: ['Reading a flat part of a v–t graph', ['inst2'], 'خط أفقي في v–t يعني سرعة ثابتة وتسارعاً يساوي صفراً.'],
    k25: ['Instantaneous velocity from x(t)', ['inst'], 'اشتق ثم عوّض t = 4.'],
    k28: ['Concept: does mass matter?', ['free'], 'g نفسها لكل الأجسام عند إهمال مقاومة الهواء.'],
    k29: ['Acceleration at the top', ['free'], 'a = −g عند كل نقطة من الحركة.'],
    k30: ['Thrown up from a height: height from final speed', ['eq3'], 'v² = vi² + 2aΔy. السرعة النهائية تُربّع فلا يهم الاتجاه.'],
    k31: ['Thrown down from a cliff', ['free'], 'vi للأسفل: الارتفاع = vi·t + ½ g t².'],
    k32: ['Time to reach a speed', ['eq2'], 't = (vf − vi) ÷ a.'],
    k33: ['Compare slopes on an x–t graph', ['inst'], 'السرعة اللحظية = ميل المماس. الأكبر ميلاً هو الأسرع.'],
    k34: ['At rest ⇒ v = 0', ['inst'], 'اشتق، ساوِ v بصفر، ثم حل t.'],
    k35: ['Minimum braking acceleration', ['eq3'], 'vf = 0 وبدون زمن: a = −vi² ÷ 2Δx.'],
    k36: ['Direction from the slope of x–t', ['inst'], 'الميل السالب يعني حركة نحو اليسار.'],
    k37: ['Concept: symmetric throw', ['free', 'up'], 'الجسم الصاعد يعود لمستوى الرمي بنفس السرعة نزولاً.'],
    k38: ['At rest on an x–t graph', ['inst'], 'ميل صفر (خط أفقي) = ساكن.'],
    k39: ['Pick the correct v–t graph', ['free'], 'المطلوب خط مستقيم ميله −g يقطع الصفر عند القمة.'],
    k40: ['Multi-stage: total time', ['eq2'], 'قسّم الحركة لمراحل وأعد الساعة في كل مرحلة.'],
    k41: ['Concept: vacuum', ['free'], 'بدون هواء كل الأجسام لها نفس التسارع g.'],
    k42: ['Sign of velocity from x(t)', ['inst'], 'اشتق وانظر إلى إشارة المشتقة.'],
    b1: ['Concept: velocity vs speed', ['avgv', 'avgs'], 'تكون السرعة المتجهة أصغر من القياسية فقط عند عكس الاتجاه.'],
    b2: ['Concept: slowing down', ['avga'], 'التباطؤ يعني أن التسارع عكس اتجاه السرعة.'],
    b3: ['Concept: constant acceleration', ['eq2'], 'فكّر: هل يمكن أن يتوقف جسم ويبقى متوقفاً مع تسارع ثابت غير صفري؟'],
    b4: ['Concept: ball thrown up', ['free'], 'التسارع ثابت g للأسفل طوال الرحلة.'],
    b5: ['Concept: ball thrown up', ['free'], 'السرعة تتناقص إلى الصفر ثم تزداد.'],
    b6: ['Displacement', ['disp'], 'النهاية ناقص البداية.'], b7: ['Average velocity', ['avgv'], 'Δx ÷ Δt.'], b8: ['Average speed', ['avgs'], 'المسافة ÷ الزمن.'],
    b9: ['Average velocity from x(t)', ['avgv'], 'احسب x عند الزمنين ثم Δx ÷ Δt.'], b10: ['Average velocity over a short interval', ['avgv'], 'نفس الطريقة بفترة أقصر؛ تقترب من السرعة اللحظية.'],
    b11: ['Average velocity from a table', ['avgv'], 'اقرأ الموقعين من الجدول ثم Δx ÷ Δt.'], b12: ['Average velocity from a table', ['avgv'], 'اقرأ الموقعين من الجدول ثم Δx ÷ Δt.'], b13: ['Average velocity from a table', ['avgv'], 'اقرأ الموقعين من الجدول ثم Δx ÷ Δt.'],
    b14: ['Average velocity over two legs', ['avgv'], 'الزمن الكلي = d/v1 + d/v2. لا تأخذ متوسط السرعتين.'],
    b15: ['Round trip', ['avgv'], 'رجع إلى البداية ⇒ Δx = 0.'],
    b16: ['Average speed with a rest stop', ['avgs'], 'السرعة المتوسطة = المسافة ÷ الزمن الكلي (والتوقف يُحسب في الزمن).'],
    b17: ['Find a from displacement', ['eq1'], 'عندك vi وΔx وt والمطلوب a: Δx = vi·t + ½ a t².'],
    b18: ['Minimum stopping time', ['eq2'], 'vf = 0، فالزمن = (0 − vi) ÷ a.'],
    b19: ['Minimum stopping distance', ['eq3'], 'قارن أقل مسافة توقف مع طول المدرج.'],
    b20: ['Is this motion possible?', ['vbar'], 'من السكون: السرعة المتوسطة = vf ÷ 2.'],
    b21: ['Two balls meet', ['free'], 'اكتب ارتفاع كل كرة بدلالة t وساوِ بينهما.'],
    b22: ['Throw upward', ['up'], 'أقصى ارتفاع = vi² ÷ 2g.']
  };
  Q.forEach((q) => { const h = HT[q.id] || HD[q.sec]; q.hint = { type: h[0], laws: h[1], ar: h[2] }; });

  /* references shown under each question + metadata */
  const BREF = { b1: 'Textbook · Quick Quiz 2.2', b2: 'Textbook · Quick Quiz 2.5', b3: 'Textbook · Quick Quiz 2.6', b4: 'Textbook · Quick Quiz 2.8', b5: 'Textbook · Quick Quiz 2.8', b6: 'Textbook · Example 2.1', b7: 'Textbook · Example 2.1', b8: 'Textbook · Example 2.1', b9: 'Textbook · Problem 2', b10: 'Textbook · Problem 2', b11: 'Textbook · Problem 3', b12: 'Textbook · Problem 3', b13: 'Textbook · Problem 3', b14: 'Textbook · Problem 6', b15: 'Textbook · Problem 6', b16: 'Textbook · Problem 7', b17: 'Textbook · Problem 17', b18: 'Textbook · Problem 16', b19: 'Textbook · Problem 16', b20: 'Textbook · Problem 20', b21: 'Textbook · Problem 28', b22: 'Textbook · Problem 31' };
  Q.forEach((q) => {
    q.ref = q.id[0] === 'k' ? 'Doctor’s question set · Q' + q.id.slice(1) : q.id[0] === 'd' ? 'Lecture slides' + (q.grp ? ' · ' + q.grp : '') : BREF[q.id];
    q.src = q.id[0] === 'b' ? 'book' : 'doc';
  });

  /* ---------------------------------------------------------------- images */
  const STYLE = 'Flat vector infographic style for a university physics study site. Canvas 1600 x 1000 px (16:10 landscape), exported as PNG, sRGB. Solid warm paper background #FFFDF8 (no transparency, no gradient, no texture, no vignette). Colour palette ONLY: teal #0E6E68 (primary shapes), blue #2457C5 (velocity v arrows), red #C0392B (acceleration a arrows and downward emphasis), green #1A7F43 (top/peak markers), amber #B45309 (highlights), ink #1C2733 (all text and axes), light grey #E0DACB (guide lines, grid). Stroke width 6 px for arrows, 3 px for guide lines, rounded line caps. Flat colours, NO shadows, NO 3D, NO gradients, NO photographic realism, NO decorative clutter. All text in clean sans-serif (Inter or Helvetica), ink colour, ENGLISH/Latin characters and digits only, minimum label height 36 px so it stays readable on a phone. Generous margins of 60 px. No watermark, no signature, no logo, no border.';
  const images = [
    { id: 'drop', file: 'free-fall-drop.png', alt: 'Free fall from rest: positions, velocity and acceleration', where: 'Lesson 6 “Free Fall”, under the free-fall formula', fallback: V.fall(),
      prompt: 'Draw a vertical free-fall diagram of a ball DROPPED FROM REST (no air resistance). A thin light-grey vertical dashed guide line in the centre-left (x = 480 px) with a horizontal tick-ruler on its left side. Show FIVE positions of the same circle-shaped ball (diameter 90 px, fill teal #0E6E68) stacked from top to bottom, with spacing that grows (distances proportional to 0, 5, 20, 45, 80 m, i.e. y = 0 / -5 / -20 / -45 / -80): labels to the left of the ball in ink: "t = 0 s  y = 0", "t = 1 s  y = -5 m", "t = 2 s  y = -20 m", "t = 3 s  y = -45 m", "t = 4 s  y = -80 m". At the right of each ball draw a BLUE (#2457C5) downward arrow for velocity whose length grows linearly (0, 50, 100, 150, 200 px) with label "v = 0", "v = -10 m/s", "v = -20", "v = -30", "v = -40" next to it (arrow at x = 700 px). At x = 1000 px draw an identical RED (#C0392B) downward arrow of the SAME constant length (100 px) beside every ball labelled "a = -10 m/s2" once at the top and once at the bottom only. Add a small up-pointing axis arrow at the far left labelled "+y (up is positive)". Add a legend box at bottom-right: blue arrow = "velocity v", red arrow = "acceleration a (constant)". Title at top-centre in ink, 56 px bold: "Free fall from rest". Nothing else.\n\nSTYLE SPEC: ' + STYLE },
    { id: 'updown', file: 'free-fall-up-down.png', alt: 'Ball thrown upward: v and a at each point', where: 'Lesson 6 “Free Fall”, under the throwing-upward formula', fallback: V.updown(),
      prompt: 'Draw a vertical diagram of a ball THROWN STRAIGHT UP with initial speed v_i = 20 m/s and returning to the hand, g = 10 m/s2. Use TWO side-by-side vertical lanes so nothing overlaps: left lane (x = 450 px) labelled "UP" and right lane (x = 1150 px) labelled "DOWN", joined at the top by a smooth thin grey curved arc. A horizontal light-grey dashed line at the bottom marks "hand level, y = 0" across the whole width. Ball = teal #0E6E68 circle, diameter 80 px. Left lane positions (from bottom to top): t = 0 s y = 0 v = +20 m/s; t = 1 s y = +15 m v = +10 m/s; t = 2 s y = +20 m v = 0 (colour this ball GREEN #1A7F43 and write "peak: v = 0 but a = -10" in green next to it). Right lane (top to bottom): t = 3 s y = +15 m v = -10 m/s; t = 4 s y = 0 v = -20 m/s. Next to each ball draw a BLUE #2457C5 arrow for velocity (length 12 px per m/s, up for +, down for -, none at the peak) and a RED #C0392B arrow pointing DOWN of constant length 120 px for acceleration "a = -10 m/s2" (including at the peak). Write "t_up = v_i/g = 2 s" and "y_max = v_i^2/(2g) = 20 m" in an ink rounded box at the top centre. Legend bottom-right: blue = v, red = a. Title top-left, 56 px bold: "Throw up and return".\n\nSTYLE SPEC: ' + STYLE },
    { id: 'building', file: 'building-stone-problem.png', alt: 'Stone thrown up from a 50 m roof (lecture example)', where: 'Lesson 6 “Free Fall”, before the building example', fallback: V.building(),
      prompt: 'Draw a side-view diagram of the doctor\'s example: a person standing on the flat roof of a 50 m tall building throws a stone straight up at 20 m/s. Building: a plain rectangle at the left-centre (x 200-520 px, from y = 900 px ground up to y = 400 px roof), fill light teal #D9EFEC with a teal #0E6E68 outline, simple 4 x 6 window grid in white-teal. A flat green ground strip at the bottom (#1A7F43, 40 px tall). A simple flat stick-figure person (ink colour) on the roof edge with the raised hand at "A". Draw a vertical dashed grey line right of the building (x = 760 px) from the ground to above the roof containing marked points: A = hand level (y = 0, t = 0, v = +20 m/s) at roof height; B = peak (y = +20 m, t = 2 s, v = 0) coloured green, 100 px above A; C = back at hand level (t = 4 s, v = -20 m/s); D = below the roof (t = 5 s, y = -25 m, v = -30 m/s); G = ground (y = -50 m, building height 50 m). Draw the stone path as a thin amber #B45309 curve from A up to B and back down past A to D and G, slightly offset to the right so up and down are distinguishable, with small arrowheads. Mark each point with a teal dot and a bold ink letter A, B, C, D, G and small ink value labels. Add a vertical double-headed arrow on the building labelled "50 m". Add a small axis arrow at the far right "+y up". Title top-left 56 px bold "Stone thrown up from a roof (g = 10)".\n\nSTYLE SPEC: ' + STYLE },
    { id: 'palm', file: 'palm-cars-road.png', alt: 'Car passing palm trees at 36 km/h (10 m/s)', where: 'Lesson 2 “Constant Velocity”, after the unit-conversion tip', fallback: V.palmRoad(),
      prompt: 'Draw a flat side-view illustration of King Faisal Highway: a horizontal grey asphalt road (#8A949E, 120 px tall, y 560-680) with a white dashed centre line, a light-sand verge (#EFE6D2) above it, and SIX identical stylised flat palm trees (trunk brown #7A5A3A, 5 teal-green #1A7F43 fronds) evenly spaced along the road every 220 px, each with a ground label under the road: "x = 10 m", "20", "30", "40", "50", "60". Place a simple flat side-view car (body teal #0E6E68, windows light, black wheels) at the left end of the road driving to the right with a BLUE #2457C5 rightward arrow above it labelled "v = 36 km/h = 10 m/s". Above the palms draw a thin ink timeline arrow with ticks "t = 0 s ... 5 s" aligned with the palms (one second per palm) and a bracket between two palms labelled "10 m in 1 s". A horizontal x-axis arrow below the road labelled "x (m)". Title top-left 56 px bold: "Uniform motion: 10 m every second". Keep it clean and uncluttered.\n\nSTYLE SPEC: ' + STYLE }
  ];

  root.CHAPTERS = root.CHAPTERS || [];
  root.CHAPTERS.push({ id: 2, key: 'ch02', icon: 'arrow', title: 'Motion in One Dimension', glossary, sections, laws, traps, quick, questions: Q, images, videos: [] });
})(typeof window !== 'undefined' ? window : globalThis);
