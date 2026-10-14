/* ====== Chapter 2 — extensions (v4): when NOT to use, other methods, "comes from", Arabic under English,
   law families, section notebook boxes, lesson-check questions, hard words.
   Loaded after ch02.js; it only adds fields, so the original chapter file stays untouched. ====== */
(function (root) {
  'use strict';
  const R = String.raw;
  const ch = (root.CHAPTERS || []).find((c) => c.key === 'ch02'); if (!ch) return;

  /* ---------- per-law extras ---------- */
  const L = {
    disp: { exlaw: R`\Delta x = x_f - x_i`, noteAr: 'النهاية ناقص البداية. تعتمد على النقطتين فقط.', whenAr: 'عندما تُعطى نقطة البداية ونقطة النهاية.', tipAr: 'الإزاحة قد تكون سالبة أو صفراً، أما المسافة فلا تكون سالبة أبداً.',
      not: 'The question asks how far the object travelled in total (that is distance).', notAr: 'عندما يسأل السؤال عن المسافة الكلية المقطوعة (هذه هي المسافة).',
      alt: R`On a $v$–$t$ graph: displacement is the signed area under the curve.`, altAr: R`من رسم $v$–$t$: الإزاحة هي المساحة تحت المنحنى بإشارتها.` },
    dist: { exlaw: R`d = \sum |\Delta x_i|`, noteAr: 'طول المسار الكلي، وهي موجبة دائماً.', whenAr: 'عندما يقول السؤال «المسافة المقطوعة» أو يعكس الجسم اتجاهه.', tipAr: 'إذا عكس الجسم اتجاهه فقسّم المسار عند نقطة الانعكاس واجمع الأجزاء كأرقام موجبة.',
      not: 'The question asks for the straight-line change in position (that is displacement).', notAr: 'عندما يُطلب التغير الصافي في الموقع (هذه هي الإزاحة).',
      alt: 'Graph: distance is the total area between the $v$–$t$ curve and the time axis, all counted positive.', altAr: R`من الرسم: المسافة هي مجموع المساحات بين منحنى $v$–$t$ ومحور الزمن، كلها موجبة.` },
    avgv: { exlaw: R`\bar v_x = \frac{x_f - x_i}{t_f - t_i}`, noteAr: 'لها إشارة وتستخدم الإزاحة.', whenAr: 'عندما يُعطى موقعان وزمنان.', tipAr: R`يهمك الموقعان فقط وليس شكل المنحنى بينهما. العودة لنقطة البداية تعني $\bar v = 0$.`,
      not: 'You only have two speeds for two equal distances: do not average the speeds, find the total time first.', notAr: 'عندك سرعتان لمسافتين متساويتين: لا تأخذ متوسط السرعتين، بل احسب الزمن الكلي أولاً.',
      alt: 'On an $x$–$t$ graph: the slope of the straight line joining the two points.', altAr: R`من رسم $x$–$t$: ميل الخط المستقيم الواصل بين النقطتين.` },
    avgs: { exlaw: R`\text{average speed} = \frac{d}{\Delta t}`, noteAr: 'تستخدم المسافة وليس الإزاحة.', whenAr: 'عندما يقول السؤال «سرعة» بدون ذكر الاتجاه.', tipAr: R`العدّاء الذي ينتهي من حيث بدأ سرعته المتجهة صفر لكن سرعته القياسية موجبة.`,
      not: 'The question wants a sign or a direction (that is velocity).', notAr: 'عندما يُطلب اتجاه أو قيمة بإشارة (هذه هي السرعة المتجهة).' },
    unif: { exlaw: R`x = x_0 + v\,t`, noteAr: R`التسارع صفر، وميل رسم $x$–$t$ يساوي السرعة.`, whenAr: 'عندما تكون السرعة ثابتة وتريد الموقع بعد زمن معين.', tipAr: R`من km/h إلى m/s: <b>اقسم على 3.6</b> (والعكس اضرب).`,
      not: 'The speed is changing (there is acceleration): use the constant-acceleration equations.', notAr: 'عندما تتغير السرعة (يوجد تسارع): استخدم معادلات التسارع الثابت.',
      alt: R`Graph: the area under a flat $v$–$t$ line is a rectangle, $\Delta x = v\,t$.`, altAr: R`من الرسم: المساحة تحت خط أفقي في $v$–$t$ مستطيل، $\Delta x = v\,t$.` },
    catch: { exlaw: R`x_1(t) = x_2(t)`, noteAr: 'اكتب موقع كل جسم من نفس نقطة الأصل ثم ساوِ بينهما.', whenAr: 'عندما يلحق جسم بجسم آخر (كلب وقط، شرطة وشاحنة).', tipAr: R`اختر نقطة أصل واحدة. الجسم المُطارَد يبدأ من $x = d$ (الفاصل) والمُطارِد من $x = 0$.`,
      not: R`One of the objects accelerates: the shortcut $t = d/(v_1 - v_2)$ fails. Still set the positions equal, but use $x = x_0 + v_it + \tfrac12 at^2$.`, notAr: R`إذا كان أحد الجسمين يتسارع فالاختصار $t = d/(v_1-v_2)$ لا يصح. ما زلنا نساوي الموقعين لكن بمعادلة الموقع مع التسارع.`,
      alt: 'Relative motion: treat one object as at rest and use the relative speed.', altAr: 'الحركة النسبية: اعتبر أحد الجسمين ساكناً واستخدم السرعة النسبية.',
      from: { ids: ['unif'], en: 'Two copies of the constant-velocity law set equal.', ar: 'نسختان من قانون السرعة الثابتة نساوي بينهما.' } },
    inst: { exlaw: R`v_x = \frac{dx}{dt}`, noteAr: R`ميل المماس لمنحنى $x$–$t$.`, whenAr: R`عندما يُعطى $x$ كدالة في الزمن وتريد $v$ عند لحظة معينة.`, tipAr: R`اشتق أولاً ثم عوّض الزمن. قاعدة القوة: $\frac{d}{dt}t^n = n\,t^{n-1}$، ومشتقة الثابت صفر.`,
      not: 'You only have two positions and two times (that gives the average velocity, not the instantaneous one).', notAr: 'عندك موقعان وزمنان فقط (هذا يعطي السرعة المتوسطة وليس اللحظية).',
      alt: 'Graph: read the slope of the tangent line at that time.', altAr: 'من الرسم: اقرأ ميل المماس عند ذلك الزمن.',
      from: { ids: ['avgv'], en: R`The limit of the average velocity as $\Delta t \to 0$.`, ar: R`هي نهاية السرعة المتوسطة عندما يقترب $\Delta t$ من الصفر.` } },
    inst2: { exlaw: R`a_x = \frac{dv}{dt}`, noteAr: R`ميل رسم $v$–$t$.`, whenAr: R`عندما يُعطى $v(t)$ أو $x(t)$ وتريد $a$.`, tipAr: R`من $x(t)$ تشتق مرتين. الناتج الثابت يعني أن التسارع نفسه في كل لحظة.`,
      not: R`The acceleration is constant and $v_i$, $v_f$, $t$ are given: simply use $a = (v_f - v_i)/t$.`, notAr: R`إذا كان التسارع ثابتاً وعندك $v_i$ و$v_f$ و$t$ فاستخدم $a = (v_f - v_i)/t$ مباشرة.`,
      alt: R`Graph: the slope of the $v$–$t$ line.`, altAr: R`من الرسم: ميل خط $v$–$t$.`,
      from: { ids: ['inst'], en: R`The derivative of velocity: differentiate $x(t)$ twice.`, ar: R`مشتقة السرعة: اشتق $x(t)$ مرتين.` } },
    avga: { exlaw: R`\bar a_x = \frac{v_f - v_i}{t_f - t_i}`, noteAr: R`الوحدة: m/s².`, whenAr: 'عندما تُعطى سرعتان وزمنان.', tipAr: R`إذا أُعطيت $x(t)$ فاشتق أولاً لتحصل على $v(t)$ ثم احسب $\Delta v/\Delta t$.`,
      not: 'You need the acceleration at one single instant (differentiate $v(t)$ instead).', notAr: R`عندما تريد التسارع عند لحظة واحدة (اشتق $v(t)$ بدلاً من ذلك).`,
      alt: R`Graph: the slope of the straight line joining two points on the $v$–$t$ graph.`, altAr: R`من الرسم: ميل الخط الواصل بين نقطتين على رسم $v$–$t$.`,
      from: { ids: ['avgv'], en: R`Same idea as average velocity, with $v$ in place of $x$.`, ar: R`نفس فكرة السرعة المتوسطة لكن مع $v$ بدل $x$.` } },
    eq2: { note: R`Missing variable: $\Delta x$.`, noteAr: R`المتغير الغائب: $\Delta x$.`, exlaw: R`v_f = v_i + a\,t`, whenAr: 'عندما لا توجد مسافة في المسألة.', tipAr: R`«يتوقف» تعني $v_f = 0$.`,
      not: 'The acceleration is not constant, or a distance is involved and the time is missing (use the time-free equation).', notAr: 'عندما يتغير التسارع، أو يكون الزمن غائباً والمسافة موجودة (استخدم المعادلة الخالية من الزمن).',
      alt: R`Graph: the area under the $a$–$t$ graph equals $\Delta v$.`, altAr: R`من الرسم: المساحة تحت رسم $a$–$t$ تساوي $\Delta v$.`,
      from: { ids: ['avga'], en: R`Average acceleration rearranged: $a = (v_f - v_i)/t$.`, ar: R`هي قانون التسارع المتوسط بعد إعادة ترتيبه.` } },
    eq1: { exlaw: R`\Delta x = v_i t + \tfrac12 a t^2`, noteAr: R`المتغير الغائب: $v_f$.`, whenAr: R`عندما لا يوجد $v_f$ في المسألة.`, tipAr: 'جذران؟ الزمن لا يكون سالباً، فخذ الجذر الموجب.',
      not: 'The acceleration is not constant, or $v_f$ is given and no time is needed (use the time-free equation).', notAr: R`عندما يتغير التسارع، أو يكون $v_f$ معطى ولا تحتاج الزمن (استخدم المعادلة الخالية من الزمن).`,
      alt: R`Graph: the area under the $v$–$t$ line (a rectangle plus a triangle).`, altAr: R`من الرسم: المساحة تحت خط $v$–$t$ (مستطيل زائد مثلث).`,
      from: { ids: ['eq2', 'vbar'], en: R`Put $v_f = v_i + at$ into $\Delta x = \frac{v_i + v_f}{2}\,t$.`, ar: R`عوّض $v_f = v_i + at$ في $\Delta x = \frac{v_i+v_f}{2}t$.` } },
    eq3: { exlaw: R`v_f^{\,2} = v_i^{\,2} + 2a\,\Delta x`, noteAr: R`المتغير الغائب: $t$.`, whenAr: 'عندما لا يوجد زمن في المسألة (مثل مسافة التوقف).', tipAr: R`المسافة موجبة. إذا حصلت على $-50\ \text{m}$ فراجع إشارة $a$.`,
      not: 'The acceleration changes, or the question asks for the time directly (use an equation that contains $t$).', notAr: R`عندما يتغير التسارع، أو يسأل السؤال عن الزمن مباشرة (استخدم معادلة فيها $t$).`,
      from: { ids: ['eq2', 'eq1'], en: R`Eliminate $t$ between the velocity and position equations.`, ar: 'احذف الزمن t بين معادلة السرعة ومعادلة الموقع.' } },
    vbar: { exlaw: R`\Delta x = \frac{v_i + v_f}{2}\,t`, noteAr: 'تصح فقط عندما يكون التسارع ثابتاً.', whenAr: 'عندما تعرف السرعة الابتدائية والنهائية والزمن (لا تحتاج التسارع).', tipAr: 'هذا الاختصار يصح <b>فقط</b> للتسارع الثابت.',
      not: R`The acceleration is not constant (for example $x = t^3$).`, notAr: R`عندما لا يكون التسارع ثابتاً (مثل $x = t^3$).`,
      alt: R`Graph: the area of the trapezoid under the $v$–$t$ line.`, altAr: R`من الرسم: مساحة شبه المنحرف تحت خط $v$–$t$.`,
      from: { ids: ['eq2'], en: 'For constant $a$ the velocity is a straight line, so its average is the middle value.', ar: 'عندما يكون التسارع ثابتاً تكون السرعة خطاً مستقيماً، فمتوسطها هو القيمة التي في المنتصف.' } },
    area: { exlaw: R`d = \int |v|\,dt`, noteAr: 'المساحة تحت المحور تعني إزاحة سالبة لكنها مسافة موجبة.', whenAr: R`عندما يُعطى رسم $v$–$t$ وتريد الإزاحة أو المسافة.`, tipAr: 'قسّم الرسم إلى مثلثات ومستطيلات. مساحة المثلث = ½ × القاعدة × الارتفاع.',
      not: 'You need an acceleration or an instantaneous velocity (use slopes, not areas).', notAr: 'عندما تريد التسارع أو السرعة اللحظية (استخدم الميل وليس المساحة).',
      alt: 'Constant acceleration with numbers given: the equations are faster than drawing the graph.', altAr: 'تسارع ثابت ومعطيات رقمية: المعادلات أسرع من رسم الرسم البياني.',
      from: { ids: ['inst'], en: 'The reverse of $v = dx/dt$: integrate velocity to get position.', ar: 'عكس $v = dx/dt$: نكامل السرعة لنحصل على الموقع.' } },
    free: { exlaw: R`v = v_i - g\,t \qquad y = y_i + v_i t - \tfrac12 g t^2`, noteAr: 'الأعلى موجب. نفس التسارع أثناء الصعود وعند القمة وأثناء النزول.', whenAr: 'لأي جسم مرمي أو مُسقَط بدون مقاومة هواء.', tipAr: R`اختر «الأعلى موجب» مرة واحدة، فيصبح $a=-g$ وسرعات النزول سالبة. الكتلة لا تهم.`,
      not: 'The object also moves sideways (a projectile): use free fall for the vertical part only, with the Chapter 4 laws. Also not when air resistance or an engine matters.', notAr: 'إذا كان الجسم يتحرك أفقياً أيضاً (قذيفة) فاستخدمه للجزء الرأسي فقط ضمن قوانين الفصل 4. ولا يصح عند وجود مقاومة هواء أو محرك يدفع الجسم.',
      from: { ids: ['eq2', 'eq1'], en: R`The constant-acceleration equations with $a = -g$.`, ar: R`هي معادلات التسارع الثابت مع $a = -g$.` } },
    up: { exlaw: R`t_{up} = \frac{v_i}{g} \qquad y_{max} = \frac{v_i^{2}}{2g}`, noteAr: R`عند العودة لنفس المستوى: $v = -v_i$.`, whenAr: 'عند أعلى نقطة في المسار أو عند العودة لمستوى الرمي.', tipAr: R`عند القمة $v=0$ لكن $a=-10\ \text{m/s}^2$ (وليس صفراً).`,
      not: R`The landing level differs from the launch level: use the full equation $y = v_it - \tfrac12 gt^2$ instead of doubling $t_{up}$.`, notAr: R`إذا كان مستوى الهبوط مختلفاً عن مستوى الرمي فاستخدم المعادلة الكاملة $y = v_it - \tfrac12 gt^2$ ولا تضاعف $t_{up}$.`,
      from: { ids: ['free'], en: R`Put $v = 0$ at the top into the free-fall equations.`, ar: R`ضع $v = 0$ عند القمة في معادلات السقوط الحر.` } }
  };
  Object.keys(L).forEach((id) => {
    const l = ch.laws.find((x) => x.id === id), o = L[id]; if (!l) throw new Error('ext law ' + id);
    Object.keys(o).forEach((k) => { if (k === 'exlaw') l.ex.law = o[k]; else l[k] = o[k]; });
  });

  /* ---------- law families (concept map cards) ---------- */
  ch.families = [
    { id: 'describe', title: 'Describing motion', titleAr: 'وصف الحركة', secs: [1, 2], use: 'You only describe what happened between two instants (positions and times). No acceleration is involved.', useAr: 'أنت تصف ما حدث بين لحظتين (مواقع وأزمنة) بدون تسارع.',
      groups: [{ label: 'Where and how far', ar: 'أين وكم', ids: ['disp', 'dist'] }, { label: 'How fast (averages)', ar: 'السرعة المتوسطة', ids: ['avgv', 'avgs'] }, { label: 'Constant velocity and chasing', ar: 'سرعة ثابتة واللحاق', ids: ['unif', 'catch'] }],
      not: 'The velocity changes with time: go to the calculus family or the constant-acceleration family.', notAr: 'إذا تغيرت السرعة مع الزمن فانتقل إلى عائلة التفاضل أو عائلة التسارع الثابت.',
      links: [{ a: 'avgv', b: 'inst', en: R`shrink $\Delta t$ to zero`, ar: 'قلّص الزمن إلى الصفر' }, { a: 'unif', b: 'catch', en: 'two copies set equal', ar: 'نسختان نساوي بينهما' }] },
    { id: 'calculus', title: 'Instantaneous rates (calculus)', titleAr: 'المعدلات اللحظية (التفاضل)', secs: [3], use: R`$x(t)$ or $v(t)$ is given as a formula, or you need a value at one instant.`, useAr: R`أُعطيت $x(t)$ أو $v(t)$ كصيغة، أو تريد قيمة عند لحظة واحدة.`,
      groups: [{ label: 'At one instant', ar: 'عند لحظة واحدة', ids: ['inst', 'inst2'] }, { label: 'Over an interval', ar: 'خلال فترة', ids: ['avga'] }],
      not: 'The acceleration is constant and no formula for $x(t)$ is given: the constant-acceleration equations are faster.', notAr: R`إذا كان التسارع ثابتاً ولا توجد صيغة لـ $x(t)$ فمعادلات التسارع الثابت أسرع.`,
      links: [{ a: 'inst', b: 'inst2', en: 'differentiate once more', ar: 'اشتق مرة ثانية' }, { a: 'avgv', b: 'avga', en: 'same idea, $v$ instead of $x$', ar: R`نفس الفكرة بـ $v$ بدل $x$` }] },
    { id: 'constacc', title: 'Constant acceleration', titleAr: 'التسارع الثابت', secs: [4], use: R`The acceleration is constant (one stage of the motion) and you know three of the five quantities $v_i, v_f, a, t, \Delta x$.`, useAr: R`التسارع ثابت (مرحلة واحدة من الحركة) وتعرف ثلاثاً من الخمس: $v_i, v_f, a, t, \Delta x$.`,
      groups: [{ label: 'No distance in the problem', ar: 'لا توجد مسافة', ids: ['eq2'] }, { label: 'No final velocity', ar: 'لا توجد سرعة نهائية', ids: ['eq1'] }, { label: 'No time', ar: 'لا يوجد زمن', ids: ['eq3'] }, { label: 'No acceleration', ar: 'لا يوجد تسارع', ids: ['vbar'] }],
      not: 'The acceleration changes (for example $x = t^3$), or there are several stages: split the motion into stages first.', notAr: R`عندما يتغير التسارع (مثل $x=t^3$) أو توجد عدة مراحل: قسّم الحركة إلى مراحل أولاً.`,
      links: [{ a: 'eq2', b: 'eq1', en: 'substitute into the average-velocity form', ar: 'بالتعويض في صيغة السرعة المتوسطة' }, { a: 'vbar', b: 'eq1', en: 'same', ar: 'نفسه' }, { a: 'eq1', b: 'eq3', en: 'eliminate $t$', ar: R`بحذف $t$` }] },
    { id: 'graphs', title: 'Reading graphs', titleAr: 'قراءة الرسوم', secs: [5], use: 'The problem gives you a graph instead of numbers.', useAr: 'المسألة تعطيك رسماً بيانياً بدل الأرقام.',
      groups: [{ label: 'Slopes', ar: 'الميل', ids: ['inst', 'inst2'] }, { label: 'Areas', ar: 'المساحة', ids: ['area'] }],
      not: 'Constant acceleration with numbers given: use the equations.', notAr: 'تسارع ثابت ومعطيات رقمية: استخدم المعادلات.',
      links: [{ a: 'inst', b: 'area', en: 'area is the reverse of slope', ar: 'المساحة هي عكس الميل' }] },
    { id: 'freefall', title: 'Free fall', titleAr: 'السقوط الحر', secs: [6], use: 'Vertical motion under gravity alone ($a = -10\\ \\text{m/s}^2$).', useAr: R`حركة رأسية تحت تأثير الجاذبية فقط ($a=-10\ \text{m/s}^2$).`,
      groups: [{ label: 'Anything dropped or thrown', ar: 'أي جسم مُسقَط أو مرمي', ids: ['free', 'up'] }],
      not: 'Sideways motion or a two-dimensional flight (projectile motion, Chapter 4).', notAr: 'الحركة الأفقية أو الطيران ثنائي البعد (القذائف، الفصل 4).',
      links: [{ a: 'eq2', b: 'free', en: R`same equations with $a=-g$`, ar: R`نفس المعادلات مع $a=-g$` }, { a: 'free', b: 'up', en: R`set $v=0$ at the top`, ar: R`ضع $v=0$ عند القمة` }] }
  ];

  /* ---------- Arabic for pitfalls, 3-minute sheet ---------- */
  const TRAPS_AR = [
    'المسافة دائماً أكبر من أو تساوي صفر، أما الإزاحة فلها إشارة.',
    R`إذا عدت إلى نقطة البداية فالسرعة <b>المتجهة</b> المتوسطة صفر، لكن السرعة <b>القياسية</b> المتوسطة ليست صفراً.`,
    R`من km/h إلى m/s: <b>اقسم</b> على 3.6 (لا تضرب).`,
    R`اشتق أولاً ثم عوّض الزمن: $v = dx/dt$ ثم ضع قيمة $t$.`,
    R`القانون $\bar v = (v_i + v_f)/2$ يصح <b>فقط عندما يكون التسارع ثابتاً</b>.`,
    R`التسارع السالب لا يعني دائماً التباطؤ. نفس إشارة $v$ و$a$ ⇐ يتسارع، وإشارتان مختلفتان ⇐ يتباطأ.`,
    R`«يتوقف» تعني $v_f = 0$. والمسافة تبقى موجبة.`,
    R`الحركة متعددة المراحل: ابدأ الساعة من $t=0$ في كل مرحلة، ونهاية المرحلة هي بداية التي بعدها.`,
    R`عند أعلى نقطة $v = 0$ لكن $a = -10\ \text{m/s}^2$ (وليس صفراً).`,
    R`معادلة تربيعية في $t$؟ خذ الجذر الموجب فقط.`,
    R`اختر «الأعلى موجب» مرة واحدة، فيصبح $a=-g$ وسرعات النزول سالبة.`,
    'السرعة المتوسطة بين نقطتين تعتمد على النقطتين فقط وليس على المسار بينهما.',
    'الجسم الساقط من مروحية صاعدة يبدأ بسرعة المروحية وليس من السكون.',
    'في الفراغ تسقط كل الأجسام معاً: الكتلة لا تهم.'
  ];
  ch.traps.forEach((t, i) => { t.ar = TRAPS_AR[i]; });
  ch.quickAr = [
    R`الإزاحة = النهاية − البداية (بإشارة)، والمسافة = طول المسار (موجبة).`,
    R`السرعة المتجهة المتوسطة = $\Delta x/\Delta t$، والسرعة القياسية المتوسطة = $d/\Delta t$.`,
    R`$v = dx/dt$ (ميل $x$–$t$)، $a = dv/dt$ (ميل $v$–$t$)، والمساحة تحت $v$–$t$ هي $\Delta x$.`,
    'معادلات التسارع الثابت الأربع (كل واحدة تفتقد متغيراً).',
    R`اختر المعادلة بشطب المتغير غير المذكور. «يتوقف» تعني $v_f = 0$.`,
    R`نفس إشارة $v$ و$a$ ⇐ تسارع. إشارتان مختلفتان ⇐ تباطؤ.`,
    R`السقوط الحر: $a = -10$ دائماً حتى عند القمة. $t_{up} = v_i/g$ و$y_{max} = v_i^2/2g$.`,
    'مراحل: أعد t = 0. تربيعية: الجذر الموجب. اللحاق: ساوِ الموقعين.'
  ];

  /* ---------- Arabic for in-lesson notes + lesson notebook boxes ---------- */
  const SEC = {
    1: { pit: [R`إذا رجعت لنقطة البداية فإن $\Delta x = 0$ وبالتالي السرعة المتجهة المتوسطة صفر، لكن السرعة القياسية المتوسطة ليست صفراً (مثل عدّاء الماراثون).`], sum: [['الإزاحة = النهاية − البداية (بإشارة)، والمسافة = طول المسار (موجبة).', R`السرعة المتجهة تستخدم $\Delta x$ والقياسية تستخدم $d$.`]],
      notebook: { notes: [['Displacement is a vector (it has a sign); distance is a scalar.', 'الإزاحة متجه لها إشارة، والمسافة كمية قياسية.'], ['Back at the start: average velocity = 0, average speed is not.', 'العودة للبداية: السرعة المتجهة المتوسطة صفر والقياسية ليست صفراً.']], tricks: [['Split the path at every turning point.', 'قسّم المسار عند كل نقطة انعكاس.']], problems: ['h4', 'd14d'] } },
    2: { sum: [[R`السرعة الثابتة: $x = x_0 + vt$، وميل $x$–$t$ هو $v$.`, R`خط أفقي في $x$–$t$ يعني ساكن. اللحاق: ساوِ الموقعين.`]],
      notebook: { notes: [['Slope of the $x$–$t$ graph = velocity.', R`ميل رسم $x$–$t$ = السرعة.`], ['km/h ÷ 3.6 = m/s.', 'km/h ÷ 3.6 = m/s']], tricks: [['Chase: one origin, set the two positions equal.', 'اللحاق: نقطة أصل واحدة وساوِ الموقعين.']], problems: ['k11', 'k20'] } },
    3: { pit: [R`التسارع السالب لا يعني التباطؤ. إذا كانت $v<0$ و$a<0$ فالجسم يتسارع في الاتجاه السالب.`], sum: [[R`$v = dx/dt$ و$a = dv/dt$. اشتق أولاً ثم عوّض.`, R`نفس إشارة $v$ و$a$: تسارع. إشارتان مختلفتان: تباطؤ.`]],
      notebook: { notes: [['$v$ is the derivative of $x$; $a$ is the derivative of $v$.', R`$v$ مشتقة $x$، و$a$ مشتقة $v$.`], ['Power rule: $\\frac{d}{dt}t^n = n t^{n-1}$.', R`قاعدة القوة: $\frac{d}{dt}t^n = n t^{n-1}$.`]], tricks: [['Differentiate first, then substitute the time.', 'اشتق أولاً ثم عوّض الزمن.'], ['“At rest” means set $v = 0$.', R`«ساكن» تعني ضع $v=0$.`]], problems: ['k2', 'k25', 'h1a'] } },
    4: { pit: ['المعادلة التربيعية في t لها جذران، خذ الجذر الموجب.'], sum: [[R`المعادلات تصح فقط للتسارع الثابت. اشطب المتغير الغائب لتختار.`, R`«يتوقف» ⇐ $v_f = 0$. المراحل المتعددة: ابدأ $t=0$ في كل مرحلة.`]],
      notebook: { notes: [['The 5 quantities: $v_i, v_f, a, t, \\Delta x$. Each equation misses one.', R`الكميات الخمس: $v_i, v_f, a, t, \Delta x$ وكل معادلة تفتقد واحدة.`]], tricks: [['Cross out the missing variable to choose the equation.', 'اشطب المتغير الغائب لتختار المعادلة.'], ['“Stops” means $v_f = 0$.', R`«يتوقف» تعني $v_f=0$.`]], problems: ['d5', 'k40', 'h8'] } },
    5: { sum: [[R`ميل $x$–$t$ هو $v$، وميل $v$–$t$ هو $a$، والمساحة تحت $v$–$t$ هي $\Delta x$.`, 'المسافة = اجمع المساحات كلها كأرقام موجبة.']],
      notebook: { notes: [['Slope of $x$–$t$ = $v$; slope of $v$–$t$ = $a$; area under $v$–$t$ = $\\Delta x$.', R`ميل $x$–$t$ = $v$، وميل $v$–$t$ = $a$، والمساحة تحت $v$–$t$ = $\Delta x$.`]], tricks: [['Distance: add all areas as positive numbers.', 'المسافة: اجمع كل المساحات كأرقام موجبة.']], problems: ['d7', 'k17', 'k18'] } },
    6: { pit: [R`عند أعلى نقطة تكون السرعة صفراً للحظة لكن التسارع ما زال $-10\ \text{m/s}^2$.`], sum: [[R`$a = -10\ \text{m/s}^2$ في كل نقطة من الرحلة.`, 'الصعود والنزول متماثلان: نفس الزمن ونفس السرعة عند نفس الارتفاع.', 'في الفراغ تسقط كل الكتل معاً.']],
      notebook: { notes: [['Free fall: $a = -10\\ \\text{m/s}^2$ at every point, even at the top.', R`السقوط الحر: $a=-10\ \text{m/s}^2$ في كل نقطة حتى عند القمة.`]], tricks: [['Choose “up = positive” once.', 'اختر «الأعلى موجب» مرة واحدة.'], ['Different landing level: use the full equation, do not double $t_{up}$.', R`مستوى هبوط مختلف: استخدم المعادلة الكاملة ولا تضاعف $t_{up}$.`]], problems: ['d13a', 'k13', 'h11'] } }
  };
  const EXLAW = {
    '1:0': R`\Delta x = x_f - x_i \qquad \bar v_x = \frac{\Delta x}{\Delta t} \qquad \text{speed} = \frac{d}{\Delta t}`,
    '2:0': R`x = x_0 + v\,t \qquad x_{police} = x_{truck}`,
    '3:0': R`v = \frac{dx}{dt} \qquad \bar a = \frac{\Delta v}{\Delta t}`,
    '4:0': R`\Delta x = \tfrac12 a t^2 \;(v_i = 0) \qquad v = a\,t`,
    '4:1': R`v = v_i + a\,t`,
    '5:0': R`\Delta x = \int v\,dt \qquad d = \int |v|\,dt`,
    '6:0': R`t_{up} = \frac{v_i}{g} \qquad y_{max} = \frac{v_i^{2}}{2g} \qquad y = v_i t - \tfrac12 g t^2`,
    '6:1': R`y = y_i + v_i t - \tfrac12 g t^2`
  };
  ch.sections.forEach((s) => {
    const o = SEC[s.id] || {}; let p = 0, t = 0, u = 0, e = 0;
    s.blocks.forEach((b) => {
      if (b.k === 'pit' && o.pit) b.ar = o.pit[p++];
      else if (b.k === 'tip' && o.tip) b.ar = o.tip[t++];
      else if (b.k === 'sum' && o.sum) b.arItems = o.sum[u++];
      else if (b.k === 'ex') { const k = s.id + ':' + (e++); if (EXLAW[k]) b.law = EXLAW[k]; }
    });
    if (o.notebook) s.notebook = o.notebook;
  });

  /* ---------- lesson-check questions (one per lesson, exam style) ---------- */
  const ask = (x) => `<p class="ask">${x}</p>`;
  const cap = (q, hint, sol) => { q.cap = true; q.imp = 3; q.src = 'doc'; q.ref = 'Lesson check · lesson ' + q.sec; q.hint = hint; q.sol = sol; ch.questions.push(q); };
  const opts = (arr, ok) => arr.map((t, i) => ({ t, ok: i === ok }));
  cap({ id: 'c1', sec: 1, kind: 'mcq', html: ask(R`A runner jogs $400$ m east in $100$ s, turns around and jogs $100$ m west in $25$ s. For the whole trip, which statement is correct?`), expl: '',
    options: opts([R`Average velocity $2.4$ m/s east; average speed $4.0$ m/s`, R`Average velocity $4.0$ m/s east; average speed $4.0$ m/s`, R`Average velocity $4.0$ m/s east; average speed $2.4$ m/s`, R`Average velocity $2.4$ m/s east; average speed $2.4$ m/s`], 0) },
  { type: 'Velocity vs speed over a trip with a turn', laws: ['avgv', 'avgs'], ar: 'الإزاحة الصافية للسرعة المتجهة، والمسافة الكلية للسرعة القياسية.' },
  { law: R`\bar v = \frac{\Delta x}{\Delta t} \qquad \text{speed} = \frac{d}{\Delta t}`, steps: [R`$\Delta x = 400 - 100 = 300\ \text{m}, \quad d = 400 + 100 = 500\ \text{m}, \quad \Delta t = 125\ \text{s}$`, R`$\bar v = 300/125 = 2.4\ \text{m/s}$ east`, R`$\text{speed} = 500/125 = 4.0\ \text{m/s}$`] });
  cap({ id: 'c2', sec: 2, kind: 'num', html: ask(R`A truck moves at $36$ km/h. A car $200$ m behind it moves in the same direction at $54$ km/h. How long until the car catches the truck (s)?`), ans: 40, unit: 's', expl: '' },
  { type: 'Unit conversion + catch-up', laws: ['unif', 'catch'], ar: 'حوّل km/h إلى m/s أولاً، ثم ساوِ الموقعين من نفس نقطة الأصل.' },
  { law: R`x = x_0 + v\,t \qquad x_{car} = x_{truck}`, steps: [R`$v_T = 36/3.6 = 10\ \text{m/s}, \quad v_C = 54/3.6 = 15\ \text{m/s}$`, R`$15\,t = 200 + 10\,t$`, R`$5\,t = 200 \Rightarrow t = 40\ \text{s}$`] });
  cap({ id: 'c3', sec: 3, kind: 'num', html: ask(R`A particle moves with $x = t^3 - 6t^2 + 9t$ (SI units). At the <b>later</b> time when it is momentarily at rest, what is its acceleration (m/s²)?`), ans: 6, unit: 'm/s²', expl: '' },
  { type: 'Derivatives: at rest, then acceleration', laws: ['inst', 'inst2'], ar: 'ساكن يعني v = 0: اشتق، حل المعادلة، ثم اشتق مرة ثانية وعوّض.' },
  { law: R`v = \frac{dx}{dt} \qquad a = \frac{dv}{dt}`, steps: [R`$v = 3t^2 - 12t + 9 = 3(t-1)(t-3)$`, R`$v = 0 \Rightarrow t = 1\ \text{s}$ or $t = 3\ \text{s}$; the later one is $t = 3\ \text{s}$`, R`$a = 6t - 12 \Rightarrow a(3) = 6\ \text{m/s}^2$`] });
  cap({ id: 'c4', sec: 4, kind: 'num', html: ask(R`A car moving at $20$ m/s brakes uniformly with $a = -4\ \text{m/s}^2$. What distance does it travel in the first $8$ s (m)?`), ans: 50, unit: 'm', expl: '' },
  { type: 'Constant acceleration: the car stops before the time ends', laws: ['eq2', 'eq3'], ar: 'اسأل أولاً: متى يتوقف؟ إذا توقف قبل 8 ثوانٍ فالمسافة هي مسافة التوقف.' },
  { law: R`v_f = v_i + a\,t \qquad v_f^{\,2} = v_i^{\,2} + 2a\,\Delta x`, steps: [R`Stopping time: $0 = 20 - 4t \Rightarrow t = 5\ \text{s}$, which is less than $8\ \text{s}$`, R`So the car is at rest after $5\ \text{s}$: $0 = 20^2 + 2(-4)\,\Delta x$`, R`$\Delta x = 400/8 = 50\ \text{m}$`], note: 'Putting $t = 8$ s into the position equation gives 32 m, which is wrong: the car would be moving backwards.' });
  cap({ id: 'c5', sec: 5, kind: 'num', html: `<p>The velocity–time graph of a body moving along a straight line:</p>${root.FIG.graph({ xmin: 0, xmax: 10, ymin: 0, ymax: 10, xs: 2, ys: 2, xl: 't (s)', yl: 'v (m/s)', h: 210, label: 'v-t graph', lines: [{ pts: [[0, 0], [4, 8], [8, 8], [10, 0]] }] })}${ask('Find the displacement from $t = 0$ to $t = 10$ s (m).')}`, ans: 56, unit: 'm', expl: '' },
  { type: 'Area under a v–t graph', laws: ['area'], ar: 'قسّم الشكل إلى مثلث ثم مستطيل ثم مثلث واجمع المساحات.' },
  { law: R`\Delta x = \text{area under the } v\text{–}t \text{ graph}`, steps: [R`Triangle $0$–$4$ s: $\tfrac12(4)(8) = 16$`, R`Rectangle $4$–$8$ s: $(4)(8) = 32$`, R`Triangle $8$–$10$ s: $\tfrac12(2)(8) = 8$`, R`$\Delta x = 16 + 32 + 8 = 56\ \text{m}$`] });
  cap({ id: 'c6', sec: 6, kind: 'num', html: ask(R`A ball is thrown straight up at $20$ m/s from the edge of a $25$ m cliff and lands at the foot of the cliff. How long is it in the air (s)? ($g = 10\ \text{m/s}^2$)`), ans: 5, unit: 's', expl: '' },
  { type: 'Free fall from a height (different landing level)', laws: ['free'], ar: 'ضع y = −25 عند القاع، تحصل معادلة تربيعية في t، وخذ الجذر الموجب.' },
  { law: R`y = y_i + v_i t - \tfrac12 g t^2`, steps: [R`$-25 = 20\,t - 5\,t^2$`, R`$t^2 - 4t - 5 = 0 \Rightarrow (t-5)(t+1) = 0$`, R`$t = 5\ \text{s}$ (reject $t = -1$)`] });
  ch.questions.forEach((q) => { q.expl = q.expl || ' '; });

  /* ---------- hard words (hover on laptop, tap on phone/iPad) ---------- */
  ch.words = [
    ['accelerate', 'يتسارع'], ['decelerate', 'يتباطأ'], ['brake', 'يضغط على الفرامل'], ['travel', 'يقطع / يسافر'], ['particle', 'جسيم'], ['object', 'جسم'], ['overtake', 'يتجاوز'], ['chase', 'يلاحق'],
    ['ahead', 'أمام'], ['behind', 'خلف'], ['momentarily', 'للحظة'], ['maximum', 'أقصى'], ['minimum', 'أدنى'], ['thrown', 'مرمي'], ['throw', 'يرمي'], ['drop', 'يُسقِط'], ['dropped', 'أُسقِط'], ['release', 'يُفلِت'],
    ['ground', 'الأرض'], ['height', 'الارتفاع'], ['cliff', 'جرف صخري'], ['helicopter', 'مروحية'], ['mailbag', 'كيس بريد'], ['window', 'نافذة'], ['roof', 'سطح المبنى'], ['upward', 'إلى الأعلى'], ['downward', 'إلى الأسفل'],
    ['rising', 'صاعد'], ['stop', 'يتوقف'], ['rate', 'معدل'], ['interval', 'فترة زمنية'], ['consecutive', 'متتالية'], ['respectively', 'على الترتيب'], ['approximately', 'تقريباً'], ['neglect', 'يُهمل'],
    ['air resistance', 'مقاومة الهواء'], ['graph', 'رسم بياني'], ['parabolic', 'على شكل قطع مكافئ'], ['curve', 'منحنى'], ['horizontal', 'أفقي'], ['vertical', 'رأسي'], ['straight line', 'خط مستقيم'],
    ['round trip', 'رحلة ذهاب وإياب'], ['turns around', 'يستدير ويعكس اتجاهه'], ['stage', 'مرحلة'], ['truck', 'شاحنة'], ['police', 'شرطة'], ['motorcycle', 'دراجة نارية'], ['collide', 'يتصادم'],
    ['approach', 'يقترب'], ['instant', 'لحظة'], ['unspecified', 'غير محدد'], ['uniformly', 'بانتظام'], ['reaches', 'يصل إلى'], ['starts from rest', 'يبدأ من السكون'], ['steady', 'منتظم']
  ];

  /* ---------- "Which law?" chooser and easily-confused pairs ---------- */
  ch.chooser = [
    { given: 'Two positions and the two times', need: 'Average velocity', law: 'avgv', ar: 'الإزاحة ÷ الزمن.' },
    { given: 'Total path length and the time', need: 'Average speed', law: 'avgs', ar: 'المسافة الكلية ÷ الزمن.' },
    { given: R`$x(t)$ as a formula`, need: R`Velocity at an instant`, law: 'inst', ar: 'اشتق ثم عوّض الزمن.' },
    { given: R`$v(t)$ or $x(t)$ as a formula`, need: 'Acceleration at an instant', law: 'inst2', ar: 'اشتق السرعة (أو اشتق الموقع مرتين).' },
    { given: R`$v_i$, $v_f$ and $t$ (no $a$ needed)`, need: 'Distance travelled', law: 'vbar', ar: 'متوسط السرعتين × الزمن (تسارع ثابت فقط).' },
    { given: 'No distance mentioned in the problem', need: R`$v_f$, $a$ or $t$`, law: 'eq2', ar: 'اشطب Δx فتبقى معادلة السرعة.' },
    { given: R`No final velocity ($v_f$) in the problem`, need: R`$\Delta x$, $a$ or $t$`, law: 'eq1', ar: 'اشطب vf فتبقى معادلة الموقع.' },
    { given: 'No time in the problem (e.g. stopping distance)', need: R`$v_f$, $a$ or $\Delta x$`, law: 'eq3', ar: 'اشطب t فتبقى المعادلة الخالية من الزمن.' },
    { given: R`A $v$–$t$ graph`, need: 'Displacement or distance', law: 'area', ar: 'المساحة تحت الرسم.' },
    { given: 'One object chasing another', need: 'The time they meet', law: 'catch', ar: 'ساوِ بين الموقعين.' },
    { given: 'Anything dropped or thrown (no air resistance)', need: 'Velocity or position at some time', law: 'free', ar: 'نفس معادلات التسارع الثابت مع a = −g.' },
    { given: 'A ball thrown up and the peak or the return level is asked', need: 'Top height or flight time', law: 'up', ar: 'القمة: v = 0. الصعود والنزول متماثلان.' }
  ];
  ch.pairs = [
    { a: 'Displacement', b: 'Distance', ea: 'Straight line start → end, has a sign, can be 0.', eb: 'Whole path length, always positive.', rule: 'Question says “how far did it travel” → distance. “Change in position” → displacement.', ar: 'عبارة «كم قطع» تعني المسافة، و«التغير في الموقع» تعني الإزاحة.' },
    { a: 'Average velocity', b: 'Average speed', ea: 'Uses displacement, signed.', eb: 'Uses distance, never negative.', rule: 'Round trip: velocity is 0, speed is not.', ar: 'في رحلة ذهاب وإياب السرعة المتجهة صفر، والقياسية لا.' },
    { a: 'Velocity = 0', b: 'Acceleration = 0', ea: 'At the top of a throw the velocity is 0 for an instant.', eb: R`At the top $a$ is still $-10\ \text{m/s}^2$.`, rule: 'Never say “a = 0 at the top”.', ar: 'عند القمة السرعة صفر لكن التسارع ما زال −10.' },
    { a: R`$\tfrac{v_i+v_f}{2}$ (average of speeds)`, b: R`$\Delta x/\Delta t$`, ea: 'Valid for constant acceleration only.', eb: 'Always valid for the average velocity.', rule: 'If a changes (e.g. $x(t)$ is a cubic), use $\Delta x/\Delta t$.', ar: 'متوسط السرعتين لا يصح إلا إذا كان التسارع ثابتاً.' },
    { a: 'Free-fall laws', b: 'Projectile motion (Chapter 4)', ea: 'Straight vertical line: use $a=-g$ with these equations.', eb: R`Two directions: vertical uses the same laws, horizontal has $a=0$ and $x=v_xt$.`, rule: 'Free-fall laws are for the vertical part only; never use them for the horizontal motion.', ar: 'قوانين السقوط الحر للحركة الرأسية فقط، أما الأفقية في المقذوفات فتسارعها صفر.' }
  ];
})(typeof window !== 'undefined' ? window : globalThis);
