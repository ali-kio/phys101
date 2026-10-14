/* ====== Chapter 3 — extensions (v4): see ch02-ext.js for what this file adds. ====== */
(function (root) {
  'use strict';
  const R = String.raw;
  const ch = (root.CHAPTERS || []).find((c) => c.key === 'ch03'); if (!ch) return;

  const L = {
    p2c: { exlaw: R`x = r\cos\theta \qquad y = r\sin\theta`, noteAr: R`$\theta$ تُقاس من المحور $+x$ عكس عقارب الساعة.`, whenAr: R`عندما تعرف البعد $r$ والزاوية $\theta$ وتريد $x$ و$y$.`, tipAr: 'اجعل الحاسبة على وضع الدرجات (degree). النتيجة السالبة صحيحة: تعني أن النقطة على يسار أو أسفل نقطة الأصل.',
      not: 'You already have $x$ and $y$ and want the length and the angle (use the reverse law).', notAr: 'عندما يكون عندك $x$ و$y$ وتريد الطول والزاوية (استخدم القانون المعاكس).',
      alt: 'Right triangle: $x$ is the side next to $\\theta$ (cos) and $y$ the side opposite (sin).', altAr: R`مثلث قائم: $x$ هو الضلع المجاور للزاوية (cos) و$y$ المقابل (sin).`,
      from: { ids: [], en: 'Right-triangle trigonometry.', ar: 'من حساب المثلثات في المثلث القائم.' } },
    c2p: { exlaw: R`r = \sqrt{x^2+y^2} \qquad \theta = \tan^{-1}\frac{y}{x}\ (+180^\circ \text{ if } x<0)`, noteAr: R`الحاسبة تعطي زاوية الربع الأول أو الرابع فقط.`, whenAr: 'عندما تعرف x وy وتريد الطول والاتجاه.', tipAr: 'ارسم النقطة أولاً: سترى الربع فتعرف هل تضيف 180°.',
      not: 'You already have $r$ and $\\theta$.', notAr: R`عندما يكون عندك $r$ و$\theta$ أصلاً.`,
      alt: 'If you only need the length, Pythagoras alone is enough.', altAr: 'إذا أردت الطول فقط يكفيك فيثاغورس.',
      from: { ids: ['p2c'], en: 'The reverse of the polar → Cartesian law.', ar: 'هو عكس قانون التحويل من قطبي إلى كارتيزي.' } },
    rules: { exlaw: R`\vec B - \vec A = \vec B + (-\vec A)`, noteAr: R`ترتيب الجمع لا يهم. $-\vec B$ هو $\vec B$ بعد عكس اتجاهه.`, whenAr: 'عند جمع المتجهات أو طرحها هندسياً، أو عند تبسيط عبارة.', tipAr: R`$\vec B - \vec A$ هو <b>عكس</b> $\vec A - \vec B$ (نفس الطول واتجاه معاكس).`,
      not: 'You need a number (a magnitude): use components. These rules only say where the arrows point.', notAr: 'عندما تحتاج رقماً (مقداراً): استخدم المركبات. هذه القواعد تخبرك فقط أين تتجه الأسهم.',
      alt: 'Components: do the same sums on $x$ and $y$ separately.', altAr: 'المركبات: نفّذ نفس العمليات على x وy كلٌّ على حدة.' },
    maxmin: { exlaw: R`R_{max} = A+B \qquad R_{min} = |A-B|`, noteAr: 'المحصلة صفر فقط إذا تساوى الطولان واختلف الاتجاه تماماً.', whenAr: 'عندما يُعطى المقداران فقط («اتجاه غير محدد»).', tipAr: 'نفس الاتجاه: اجمع الطولين. اتجاهان متعاكسان: اطرح الطولين. أي زاوية أخرى تعطي قيمة بين الاثنين.',
      not: 'The angle between the vectors is given (then compute the exact $R$ with the law of cosines or components).', notAr: 'عندما تُعطى الزاوية بين المتجهين (احسب $R$ بدقة بقانون جيب التمام أو المركبات).',
      alt: R`Law of cosines with $\phi = 0^\circ$ or $180^\circ$.`, altAr: R`قانون جيب التمام عند $\phi = 0^\circ$ أو $180^\circ$.`,
      from: { ids: ['lawcos'], en: R`Law of cosines at $\phi = 0^\circ$ and $\phi = 180^\circ$.`, ar: R`قانون جيب التمام عند $\phi = 0^\circ$ و$\phi = 180^\circ$.` } },
    lawcos: { exlaw: R`R = \sqrt{A^2 + B^2 + 2AB\cos\phi}`, noteAr: R`$\phi$ هي الزاوية بين المتجهين عند رسمهما من نفس النقطة.`, whenAr: 'متجهان وزاوية معروفة بينهما، وتريد مقدار المحصلة بدون مركبات.', tipAr: R`إذا كانت $\phi = 90^\circ$ يصبح القانون فيثاغورس. عند $0^\circ$ تحصل على $A+B$ وعند $180^\circ$ على $|A-B|$.`,
      not: 'Three or more vectors (use components).', notAr: 'ثلاثة متجهات أو أكثر (استخدم المركبات).',
      alt: 'Components give the same result and are safer.', altAr: 'المركبات تعطي نفس النتيجة وهي أكثر أماناً.',
      from: { ids: ['addc'], en: 'The component method for two vectors, written without components.', ar: 'هو طريقة المركبات لمتجهين لكنه مكتوب بدون مركبات.' } },
    avgvec: { exlaw: R`|\bar{\vec v}| = \frac{|\Delta\vec r|}{\Delta t} \qquad \text{speed} = \frac{d}{\Delta t}`, noteAr: 'السرعة المتجهة تستخدم الخط المستقيم من البداية للنهاية، والقياسية تستخدم المسار الفعلي.', whenAr: 'رحلة مكونة من عدة أجزاء مستقيمة (مثل شرقاً ثم شمالاً).', tipAr: 'اجمع الأجزاء <b>كمتجهات</b> للسرعة المتجهة و<b>كأطوال</b> للسرعة القياسية. حوّل الدقائق إلى ساعات أولاً.',
      not: 'You need the speed at one instant, or the motion is not made of straight legs.', notAr: 'عندما تريد السرعة عند لحظة واحدة، أو لا تتكون الحركة من أجزاء مستقيمة.',
      alt: 'If the legs are perpendicular (east then north), Pythagoras gives $|\\Delta\\vec r|$ at once.', altAr: R`إذا كانت الأجزاء متعامدة (شرق ثم شمال) فيفيثاغورس يعطيك $|\Delta\vec r|$ مباشرة.`,
      from: { ids: [], en: R`Chapter 2: $\bar v = \Delta x/\Delta t$, now written with vectors.`, ar: R`من الفصل 2: $\bar v = \Delta x/\Delta t$ لكن بالمتجهات.` } },
    comp: { exlaw: R`F_x = F\cos\theta \qquad F_y = F\sin\theta`, noteAr: R`نفس رياضيات الدرس الأول لكن على متجه. $\theta$ من المحور $+x$.`, whenAr: 'عندما تحلل متجهاً مائلاً (قوة، إزاحة، سرعة) إلى جزء أفقي وجزء رأسي، أو تعيد تركيبه.', tipAr: R`<b>المركبة لا تتجاوز المقدار</b>: $|A_x| \le A$. إذا كانت الزاوية من المحور $y$ فبدّل $\cos$ و$\sin$.`,
      not: R`The vector is already given as $A_x\hat i + A_y\hat j$ (nothing to resolve).`, notAr: R`عندما يكون المتجه معطى أصلاً بالمركبات $A_x\hat i + A_y\hat j$.`,
      alt: 'Similar triangles (3-4-5) when the angle is $37^\\circ$ or $53^\\circ$.', altAr: R`مثلثات متشابهة (3-4-5) عندما تكون الزاوية $37^\circ$ أو $53^\circ$.`,
      from: { ids: ['p2c'], en: 'Exactly the polar → Cartesian law, applied to a vector.', ar: 'هو بالضبط قانون التحويل من قطبي إلى كارتيزي لكن على متجه.' } },
    unit: { exlaw: R`\vec A = A_x\,\hat i + A_y\,\hat j`, noteAr: R`$\hat i,\hat j,\hat k$ تشير إلى $+x,+y,+z$ وطول كل منها 1.`, whenAr: R`عندما يُكتب المتجه $2\hat i + 3\hat j$ أو تريد كتابته بهذا الشكل.`, tipAr: R`معامل $\hat i$ هو مركبة $x$ ومعامل $\hat j$ هو مركبة $y$. المقدار لا يحتوي على الرمزين $\hat i,\hat j$.`,
      not: 'You need the angle or the length straight away (convert with the component laws).', notAr: 'عندما تريد الزاوية أو الطول مباشرة (حوّل بقوانين المركبات).',
      from: { ids: ['comp'], en: 'It is just the two components, each multiplied by its direction.', ar: 'هو المركبتان فقط، كل واحدة مضروبة في اتجاهها.' } },
    addc: { exlaw: R`R_x = \sum x \qquad R_y = \sum y \qquad R = \sqrt{R_x^2 + R_y^2} \qquad \theta = \tan^{-1}\frac{R_y}{R_x}`, noteAr: 'تصح لأي عدد من المتجهات: اجمع x مع x وy مع y فقط.', whenAr: R`عندما يُعطى متجهان أو أكثر بالمقدار والزاوية (أو بصيغة $\hat i,\hat j$).`, tipAr: 'اعمل جدولاً: صف لكل متجه وعمودان x وy. اعرف الربع من إشارتي (Rx, Ry) قبل أن تثق بـ tan⁻¹.',
      not: 'Only two vectors with a clear angle and no direction needed (the law of cosines is quicker).', notAr: 'متجهان فقط وزاوية واضحة ولا تحتاج الاتجاه (قانون جيب التمام أسرع).',
      alt: 'Law of cosines (two vectors), or a scale drawing.', altAr: 'قانون جيب التمام (لمتجهين)، أو رسم بمقياس.',
      from: { ids: ['comp', 'rules'], en: 'Resolve each vector, then add the like components.', ar: 'حلّل كل متجه ثم اجمع المركبات المتشابهة.' } },
    subc: { exlaw: R`\vec A - \vec B = (A_x - B_x)\,\hat i + (A_y - B_y)\,\hat j`, noteAr: 'اطرح كل مركبة من نظيرتها.', whenAr: R`عندما يطلب السؤال $\vec A - \vec B$، أو المتجه الذي يجب إضافته للوصول إلى هدف.`, tipAr: R`انتبه للإشارات المزدوجة: $A_x - B_x$ مع $B_x = -4$ تصبح $A_x + 4$.`,
      not: 'You are asked for the sum, not the difference.', notAr: 'عندما يُطلب المجموع وليس الفرق.',
      from: { ids: ['addc', 'rules'], en: R`$\vec A - \vec B = \vec A + (-\vec B)$ done component by component.`, ar: R`هو $\vec A + (-\vec B)$ لكن مركبة مركبة.` } },
    angbet: { exlaw: R`\phi = |\theta_A - \theta_B|`, noteAr: 'أوجد اتجاه كل متجه أولاً ثم اطرح الزاويتين.', whenAr: R`عندما يسأل السؤال عن «الزاوية بين $\vec A$ و$\vec B$».`, tipAr: R`المتجهان المتعامدان: $A_xB_x + A_yB_y = 0$. فحص سريع لسؤال «هل الزاوية $90^\circ$؟».`,
      not: 'The vectors have a $z$ component (3-D).', notAr: R`عندما يوجد مركبة $z$ (ثلاثة أبعاد).`,
      alt: R`Dot product (later in the course): $\cos\phi = \frac{\vec A\cdot\vec B}{AB}$.`, altAr: R`الضرب القياسي (لاحقاً في المقرر): $\cos\phi = \frac{\vec A\cdot\vec B}{AB}$.`,
      from: { ids: ['c2p'], en: R`Each direction angle comes from $\tan^{-1}(y/x)$.`, ar: R`زاوية كل اتجاه تأتي من $\tan^{-1}(y/x)$.` } },
    mag3d: { exlaw: R`R = \sqrt{R_x^2 + R_y^2 + R_z^2}`, noteAr: 'فيثاغورس مع حد إضافي.', whenAr: R`عندما يحتوي المتجه على $\hat k$ (مركبة $z$).`, tipAr: 'اجمع أو اطرح كل محور أولاً ثم خذ جذراً واحداً في النهاية.',
      not: 'The vector is 2-D (no $z$ term).', notAr: R`عندما يكون المتجه ثنائي الأبعاد (بدون حد $z$).`,
      from: { ids: ['c2p'], en: 'Pythagoras used twice: first in the $xy$ plane, then with $z$.', ar: 'فيثاغورس مرتين: مرة في المستوى xy ثم مع z.' } },
    dircos: { exlaw: R`\cos\theta_z = \frac{R_z}{R}`, noteAr: 'كل زاوية تُقاس من محورها الخاص.', whenAr: R`عندما تريد الزوايا التي يصنعها متجه ثلاثي الأبعاد مع $x$ و$y$ و$z$.`, tipAr: R`استخدم $\sum\cos^2 = 1$ للتحقق من الزوايا الثلاث مجاناً.`,
      not: 'You need the angle with a plane, or the angle between two vectors.', notAr: 'عندما تريد الزاوية مع مستوى، أو الزاوية بين متجهين.',
      from: { ids: ['mag3d'], en: 'Each cosine is a component divided by the magnitude.', ar: 'كل جيب تمام هو مركبة مقسومة على المقدار.' } }
  };
  Object.keys(L).forEach((id) => {
    const l = ch.laws.find((x) => x.id === id), o = L[id]; if (!l) throw new Error('ext law ' + id);
    Object.keys(o).forEach((k) => { if (k === 'exlaw') l.ex.law = o[k]; else l[k] = o[k]; });
  });

  ch.families = [
    { id: 'coords', title: 'Coordinates', titleAr: 'الإحداثيات', secs: [1], use: 'You are naming one point in two different ways: $(x,y)$ or $(r,\\theta)$.', useAr: R`تسمّي نقطة واحدة بطريقتين: $(x,y)$ أو $(r,\theta)$.`,
      groups: [{ label: 'Polar → Cartesian', ar: 'من قطبي إلى كارتيزي', ids: ['p2c'] }, { label: 'Cartesian → polar', ar: 'من كارتيزي إلى قطبي', ids: ['c2p'] }],
      not: 'You are adding vectors (use the component method).', notAr: 'عندما تجمع متجهات (استخدم طريقة المركبات).', links: [{ a: 'p2c', b: 'c2p', en: 'the reverse of each other', ar: 'كل منهما عكس الآخر' }] },
    { id: 'tripvec', title: 'Trips and vector motion', titleAr: 'الرحلات والحركة المتجهة', secs: [2], use: 'A journey made of several straight legs, and the question mixes displacement/velocity with distance/speed.', useAr: 'رحلة من عدة أجزاء مستقيمة والسؤال يخلط بين الإزاحة/السرعة المتجهة والمسافة/السرعة القياسية.',
      groups: [{ label: 'Velocity and speed of a trip', ar: 'سرعة الرحلة', ids: ['avgvec'] }], not: 'One-dimensional motion with a formula for $x(t)$ (Chapter 2).', notAr: R`حركة في بُعد واحد مع صيغة لـ $x(t)$ (الفصل 2).`, links: [] },
    { id: 'graphic', title: 'Adding vectors by drawing', titleAr: 'جمع المتجهات بالرسم', secs: [3], use: 'Two vectors, and you want the resultant or its possible range without breaking into components.', useAr: 'متجهان وتريد المحصلة أو مداها الممكن بدون تحليل إلى مركبات.',
      groups: [{ label: 'The rules', ar: 'القواعد', ids: ['rules'] }, { label: 'Only magnitudes known', ar: 'المقداران فقط معروفان', ids: ['maxmin'] }, { label: 'Magnitudes and the angle between them', ar: 'المقداران والزاوية بينهما', ids: ['lawcos'] }],
      not: 'Three or more vectors: use components.', notAr: 'ثلاثة متجهات أو أكثر: استخدم المركبات.', links: [{ a: 'lawcos', b: 'maxmin', en: R`special cases $\phi = 0^\circ, 180^\circ$`, ar: R`حالتان خاصتان $\phi = 0^\circ, 180^\circ$` }] },
    { id: 'components', title: 'Components', titleAr: 'المركبات', secs: [4], use: 'A vector is tilted and you need its horizontal and vertical parts (or its unit-vector form).', useAr: 'المتجه مائل وتريد جزأيه الأفقي والرأسي (أو صيغة متجهات الوحدة).',
      groups: [{ label: 'Resolve / rebuild', ar: 'تحليل وإعادة تركيب', ids: ['comp'] }, { label: 'Write with unit vectors', ar: 'الكتابة بمتجهات الوحدة', ids: ['unit'] }],
      not: 'The vector is already given by components.', notAr: 'عندما يكون المتجه معطى أصلاً بالمركبات.', links: [{ a: 'p2c', b: 'comp', en: 'same law, applied to a vector', ar: 'نفس القانون لكن على متجه' }, { a: 'comp', b: 'unit', en: 'components written with $\\hat i, \\hat j$', ar: R`المركبات مكتوبة بـ $\hat i, \hat j$` }] },
    { id: 'compmethod', title: 'The component method', titleAr: 'طريقة المركبات', secs: [5], use: 'Two or more vectors to add or subtract, or a vector that must cancel others, or the angle between two vectors.', useAr: 'متجهان أو أكثر للجمع أو الطرح، أو متجه يجب أن يلغي غيره، أو الزاوية بين متجهين.',
      groups: [{ label: 'Add', ar: 'الجمع', ids: ['addc'] }, { label: 'Subtract', ar: 'الطرح', ids: ['subc'] }, { label: 'Angle between two vectors', ar: 'الزاوية بين متجهين', ids: ['angbet'] }],
      not: 'The vectors are in 3-D without a $z$-term table: add the third column first (Lesson 6).', notAr: 'عندما تكون المتجهات ثلاثية الأبعاد: أضف عمود z (الدرس 6).',
      links: [{ a: 'comp', b: 'addc', en: 'resolve first, then add', ar: 'حلّل أولاً ثم اجمع' }, { a: 'addc', b: 'subc', en: R`$\vec A - \vec B = \vec A + (-\vec B)$`, ar: R`$\vec A - \vec B = \vec A + (-\vec B)$` }, { a: 'c2p', b: 'angbet', en: 'find each direction', ar: 'أوجد اتجاه كل متجه' }] },
    { id: 'threed', title: 'Vectors in 3-D', titleAr: 'المتجهات في ثلاثة أبعاد', secs: [6], use: R`A vector has a $\hat k$ term, or you need its angles with all three axes.`, useAr: R`المتجه فيه حد $\hat k$، أو تريد زواياه مع المحاور الثلاثة.`,
      groups: [{ label: 'Length', ar: 'الطول', ids: ['mag3d'] }, { label: 'Direction', ar: 'الاتجاه', ids: ['dircos'] }], not: 'Flat (2-D) problems.', notAr: 'المسائل المستوية (ثنائية الأبعاد).', links: [{ a: 'mag3d', b: 'dircos', en: 'component ÷ magnitude', ar: 'المركبة ÷ المقدار' }] }
  ];

  const TRAPS_AR = [
    R`$\tan^{-1}$ في الحاسبة لا تعطي أبداً زاوية الربع الثاني أو الثالث. إذا كانت $x<0$ أضف $180^\circ$، وانظر إلى إشارتي $(x,y)$ أولاً.`,
    R`<b>اجمع المركبات وليس المقادير.</b> $|\vec A + \vec B| \ne |\vec A| + |\vec B|$ إلا إذا كانا في نفس الاتجاه.`,
    R`«$30^\circ$ جنوب الشرق» تعني ابدأ من <b>الشرق</b> وانحرف $30^\circ$ نحو الجنوب: $A_x = A\cos 30^\circ$ و$A_y = -A\sin 30^\circ$.`,
    R`إذا كانت الزاوية مقاسة من المحور $y$ فيتبدل دور $\cos$ و$\sin$.`,
    R`المركبة لا تكون أكبر من المتجه أبداً: $|A_x| \le A$.`,
    R`$\vec B - \vec A$ <b>ليس</b> $\vec A - \vec B$: هو المتجه المعاكس.`,
    'المسافة ≠ الإزاحة: الإزاحة هي الخط المستقيم من البداية للنهاية، والمسافة طول المسار. السرعة القياسية تستخدم المسافة والمتجهة تستخدم الإزاحة.',
    R`الاتجاه غير المحدد: $R_{max} = A+B$ (نفس الاتجاه) و$R_{min} = |A-B|$ (متعاكسان)، و$R = 0$ يحتاج طولين متساويين واتجاهين متعاكسين.`,
    R`حوّل الدقائق إلى ساعات قبل القسمة: $40\ \text{min} = 2/3\ \text{h}$.`,
    'المقدار لا يكون سالباً أبداً. إذا حصلت على مقدار سالب فهناك خطأ.',
    R`المتجه بصيغة متجهات الوحدة لا يحتوي زاوية: $2\hat i + 3\hat j$ تعني $A_x = 2$ و$A_y = 3$.`,
    'اجعل الحاسبة على وضع الدرجات (degree) وليس الراديان.',
    R`الزاوية بين متجهين هي <b>الفرق</b> بين زاويتي اتجاههما: $|\theta_A - \theta_B|$.`,
    'متجه العودة هو <b>سالب</b> المحصلة (نفس الطول واتجاه معاكس).'
  ];
  ch.traps.forEach((t, i) => { t.ar = TRAPS_AR[i]; });
  ch.quickAr = [
    R`قطبي ⇄ كارتيزي: $x = r\cos\theta,\ y = r\sin\theta$ و$r = \sqrt{x^2+y^2},\ \theta = \tan^{-1}(y/x)$ (+180° إذا $x<0$).`,
    'القياسية: مقدار فقط (مسافة، سرعة قياسية، زمن، كتلة). المتجهة: مقدار واتجاه (إزاحة، سرعة متجهة، قوة).',
    R`$R_{max} = A+B$ (نفس الاتجاه) و$R_{min} = |A-B|$ (متعاكسان) و$R = 0$: متساويان ومتعاكسان.`,
    'المركبات: Aₓ = A cos θ وA_y = A sin θ، والمركبة لا تتجاوز المتجه.',
    R`الجمع بالمركبات: $R_x = \sum x$ و$R_y = \sum y$ ثم $R=\sqrt{R_x^2+R_y^2}$ و$\theta = \tan^{-1}(R_y/R_x)$.`,
    R`$\vec A - \vec B$: اطرح كل مركبة. متجهات الوحدة $\hat i,\hat j,\hat k$ طول كل منها 1.`,
    R`ثلاثي الأبعاد: $R = \sqrt{R_x^2+R_y^2+R_z^2}$ و$\cos\theta_x = R_x/R$ و$\sum\cos^2 = 1$.`,
    'السرعة المتجهة المتوسطة = الإزاحة المستقيمة ÷ الزمن، والقياسية = المسار الكلي ÷ الزمن.'
  ];

  const SEC = {
    1: { pit: [R`النقطة $(-3.50,-2.50)$: الحاسبة تعطي $35.5^\circ$ لكن النقطة في الربع الثالث، فالزاوية الصحيحة $180^\circ + 35.5^\circ = 216^\circ$.`], sum: [[R`$x = r\cos\theta$ و$y = r\sin\theta$ ، و$r = \sqrt{x^2+y^2}$.`, R`إذا كانت $x<0$ فأضف $180^\circ$ إلى زاوية الحاسبة.`]],
      notebook: { notes: [['The calculator’s $\\tan^{-1}$ only gives 1st/4th-quadrant angles.', 'الحاسبة تعطي زوايا الربعين الأول والرابع فقط.']], tricks: [['Sketch the point first to see the quadrant.', 'ارسم النقطة أولاً لتعرف الربع.']], problems: ['d1a', 'd1b'] } },
    2: { pit: [R`حوّل الدقائق إلى ساعات <b>قبل</b> القسمة: $40\ \text{min} = 2/3\ \text{h}$.`], sum: [['المتجهات لها اتجاه والقياسية ليس لها.', 'السرعة المتجهة ↔ الإزاحة ، والقياسية ↔ المسافة.']],
      notebook: { notes: [['Scalar: size only. Vector: size and direction.', 'القياسية: مقدار فقط. المتجهة: مقدار واتجاه.'], ['Velocity ↔ displacement; speed ↔ distance.', 'السرعة المتجهة ↔ الإزاحة، والقياسية ↔ المسافة.']], tricks: [['Minutes → hours before dividing.', 'حوّل الدقائق إلى ساعات قبل القسمة.']], problems: ['k4', 'k5', 't2'] } },
    3: { tip: ['متجهان فقط والزاوية سهلة القراءة؟ قانون جيب التمام سريع. ثلاثة متجهات أو أكثر؟ استخدم المركبات دائماً (الدرس 5).'], sum: [['رأس إلى ذيل، والترتيب لا يهم.', R`$R_{max} = A+B$ و$R_{min} = |A-B|$.`, R`$R = \sqrt{A^2+B^2+2AB\cos\phi}$.`]],
      notebook: { notes: [['Head-to-tail; order does not matter.', 'رأس إلى ذيل والترتيب لا يهم.'], ['$R = 0$ needs equal sizes and opposite directions.', 'المحصلة صفر تحتاج طولين متساويين واتجاهين متعاكسين.']], tricks: [['Only two vectors + angle: law of cosines. More than two: components.', 'متجهان وزاوية: قانون جيب التمام. أكثر من ذلك: المركبات.']], problems: ['d6a', 'k12', 'k13'] } },
    4: { pit: [R`«$37^\circ$ جنوب الشرق»: $A_x = +A\cos 37^\circ$ و$A_y = -A\sin 37^\circ$. وإذا قال «$37^\circ$ مع محور $y$» فيتبدل $\cos$ و$\sin$.`], sum: [[R`$A_x = A\cos\theta$ و$A_y = A\sin\theta$، و$|A_x| \le A$.`, 'اقرأ كلمات الاتجاه بدقة: الكلمة الأولى هي نقطة الانطلاق.', R`$\vec A = A_x\hat i + A_y\hat j$.`]],
      notebook: { notes: [['The component never exceeds the vector.', 'المركبة لا تتجاوز المتجه.'], ['“Angle N of E”: start from East, turn toward North.', '«زاوية شمال الشرق»: ابدأ من الشرق وانحرف نحو الشمال.']], tricks: [['Angle from the $y$ axis: swap cos and sin.', 'الزاوية من محور y: بدّل cos وsin.']], problems: ['d8a', 'd9a', 'd9b'] } },
    5: { sum: [[R`طريقة الجدول: $\sum x$ و$\sum y$ ثم $R$ و$\theta$.`, R`المتجه الذي يلغي المحصلة $= -\vec R$.`, R`اعرف الربع من إشارتي $(R_x,R_y)$.`]],
      notebook: { notes: [['Table: one row per vector, columns $x$ and $y$; add the columns.', 'جدول: صف لكل متجه وعمودان x وy؛ اجمع العمودين.'], ['The vector that cancels $\\vec R$ is $-\\vec R$.', R`المتجه الذي يلغي $\vec R$ هو $-\vec R$.`]], tricks: [['Quadrant from the signs of $(R_x, R_y)$ before $\\tan^{-1}$.', R`الربع من إشارتي $(R_x,R_y)$ قبل $\tan^{-1}$.`]], problems: ['k19', 'k20', 'd16'] } },
    6: { sum: [[R`$R = \sqrt{R_x^2+R_y^2+R_z^2}$.`, R`$\cos\theta_i = R_i/R$ و$\sum\cos^2 = 1$.`]],
      notebook: { notes: [['3-D: add the $z$ term under the root.', 'ثلاثي الأبعاد: أضف حد z تحت الجذر.']], tricks: [['Check the three angles with $\\sum\\cos^2 = 1$.', R`تحقق من الزوايا الثلاث بـ $\sum\cos^2 = 1$.`]], problems: ['k1', 'd19a', 'd19b'] } }
  };
  const EXLAW = {
    '2:0': R`\text{distance} = \sum \text{legs} \qquad \text{displacement} = \overline{AD}`,
    '3:0': R`\vec A + \vec B = 0 \;\Rightarrow\; |\vec A| = |\vec B| \text{ and opposite directions}`,
    '4:0': R`A_x = A\cos\theta \qquad A_y = A\sin\theta`,
    '5:0': R`R_x = \sum x \qquad R_y = \sum y \qquad R = \sqrt{R_x^2+R_y^2} \qquad \theta = \tan^{-1}\frac{R_y}{R_x}`,
    '5:1': R`\vec A + \vec B + \vec C + \vec D = 0 \;\Rightarrow\; \vec D = -(\vec A + \vec B + \vec C)`,
    '6:0': R`R = \sqrt{R_x^2+R_y^2+R_z^2} \qquad \cos\theta_z = \frac{R_z}{R}`
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

  /* ---------- lesson-check questions ---------- */
  const ask = (x) => `<p class="ask">${x}</p>`;
  const cap = (q, hint, sol) => { q.cap = true; q.imp = 3; q.src = 'doc'; q.ref = 'Lesson check · lesson ' + q.sec; q.hint = hint; q.sol = sol; q.expl = q.expl || ' '; ch.questions.push(q); };
  const opts = (arr, ok) => arr.map((t, i) => ({ t, ok: i === ok }));
  cap({ id: 'c1', sec: 1, kind: 'mcq', html: ask(R`A point has polar coordinates $r = 10$ m and $\theta = 143^\circ$ (from the $+x$ axis). Its Cartesian coordinates $(x, y)$ are closest to:`), options: opts(['(−8.0, 6.0) m', '(8.0, 6.0) m', '(−6.0, 8.0) m', '(6.0, −8.0) m'], 0) },
  { type: 'Polar → Cartesian in the 2nd quadrant', laws: ['p2c'], ar: 'الزاوية 143° في الربع الثاني: x سالبة وy موجبة.' },
  { law: R`x = r\cos\theta \qquad y = r\sin\theta`, steps: [R`$x = 10\cos 143^\circ = -8.0\ \text{m}$ (use a calculator)`, R`$y = 10\sin 143^\circ = +6.0\ \text{m}$`], note: 'Check the signs first: 143° is in the 2nd quadrant, so $x<0$ and $y>0$. That already leaves only one option.' });
  cap({ id: 'c2', sec: 2, kind: 'num', html: ask(R`A hiker walks $6$ km north in $1.5$ h, then $8$ km east in $2.5$ h. Find the magnitude of his average <b>velocity</b> for the whole trip (km/h).`), ans: 2.5, unit: 'km/h', expl: '' },
  { type: 'Average velocity of a two-leg trip', laws: ['avgvec'], ar: 'الإزاحة بفيثاغورس (شمال وشرق متعامدان)، والزمن الكلي ساعتان ونصف زائد ساعة ونصف.' },
  { law: R`|\bar{\vec v}| = \frac{|\Delta\vec r|}{\Delta t}`, steps: [R`$|\Delta\vec r| = \sqrt{6^2 + 8^2} = 10\ \text{km}$`, R`$\Delta t = 1.5 + 2.5 = 4\ \text{h}$`, R`$|\bar{\vec v}| = 10/4 = 2.5\ \text{km/h}$`], note: 'The average speed would be $14/4 = 3.5$ km/h (path length, not displacement).' });
  cap({ id: 'c3', sec: 3, kind: 'mcq', html: ask(R`Two vectors have magnitudes $9$ and $5$. Which of the following can <b>not</b> be the magnitude of their sum?`), options: opts(['4', '10', '14', '15'], 3) },
  { type: 'Possible range of a resultant', laws: ['maxmin'], ar: 'المدى الممكن من |9−5| إلى 9+5.' },
  { law: R`|A-B| \le R \le A+B`, steps: [R`$R_{min} = |9-5| = 4$`, R`$R_{max} = 9+5 = 14$`, R`So $4 \le R \le 14$, and $15$ is outside the range.`] });
  cap({ id: 'c4', sec: 4, kind: 'mcq', html: ask(R`A $200$ N force points to the right and $30^\circ$ <b>below</b> the horizontal. Its components $(F_x, F_y)$ are:`), options: opts(['(173 N, −100 N)', '(100 N, −173 N)', '(173 N, +100 N)', '(−173 N, −100 N)'], 0) },
  { type: 'Components with “below the horizontal”', laws: ['comp'], ar: 'الزاوية مع الأفقي: Fx بـ cos وFy بـ sin، والإشارة سالبة لأنها للأسفل.' },
  { law: R`F_x = F\cos\theta \qquad F_y = F\sin\theta`, steps: [R`$F_x = 200\cos 30^\circ = +173\ \text{N}$`, R`$F_y = -200\sin 30^\circ = -100\ \text{N}$ (pointing down)`] });
  cap({ id: 'c5', sec: 5, kind: 'num', html: ask(R`Three forces act on a body: $50$ N along $+x$ ($0^\circ$), $30$ N along $+y$ ($90^\circ$) and $20$ N along $-x$ ($180^\circ$). Find the magnitude of the net force (N).`), ans: 42.4, unit: 'N', expl: '', tol: 0.5 },
  { type: 'Component method with three vectors', laws: ['addc'], ar: 'اجمع x مع x وy مع y ثم فيثاغورس.' },
  { law: R`R_x = \sum x \qquad R_y = \sum y \qquad R = \sqrt{R_x^2+R_y^2}`, steps: [R`$R_x = 50 + 0 - 20 = 30\ \text{N}$`, R`$R_y = 0 + 30 + 0 = 30\ \text{N}$`, R`$R = \sqrt{30^2 + 30^2} = 42.4\ \text{N}$ at $45^\circ$`] });
  cap({ id: 'c6', sec: 6, kind: 'num', html: ask(R`$\vec A = 3\hat i + 2\hat j - \hat k$ and $\vec B = \hat i - 2\hat j + 3\hat k$. Find the magnitude $|\vec A + \vec B|$.`), ans: 4.47, unit: 'units', expl: '', tol: 0.08 },
  { type: '3-D sum and magnitude', laws: ['mag3d'], ar: 'اجمع كل محور أولاً ثم جذر واحد.' },
  { law: R`R = \sqrt{R_x^2+R_y^2+R_z^2}`, steps: [R`$\vec A + \vec B = (3+1)\hat i + (2-2)\hat j + (-1+3)\hat k = 4\hat i + 0\hat j + 2\hat k$`, R`$|\vec A + \vec B| = \sqrt{16 + 0 + 4} = \sqrt{20} = 4.47$`] });

  ch.words = [
    ['resultant', 'المحصلة'], ['magnitude', 'المقدار'], ['due east', 'شرقاً تماماً'], ['due north', 'شمالاً تماماً'], ['due south', 'جنوباً تماماً'], ['due west', 'غرباً تماماً'], ['east', 'الشرق'], ['north', 'الشمال'], ['south', 'الجنوب'], ['west', 'الغرب'],
    ['north of east', 'شمال الشرق'], ['south of east', 'جنوب الشرق'], ['west of north', 'غرب الشمال'], ['west of south', 'غرب الجنوب'], ['below the horizontal', 'أسفل الأفقي'], ['above the horizontal', 'أعلى الأفقي'], ['horizontal', 'أفقي'], ['vertical', 'رأسي'],
    ['quadrant', 'ربع (من المستوى الإحداثي)'], ['negative x axis', 'محور x السالب'], ['unit vector', 'متجه الوحدة'], ['component', 'مركبة'], ['unspecified', 'غير محدد'], ['closest', 'الأقرب'], ['hiker', 'متنزه (يمشي لمسافات)'], ['plane', 'طائرة'],
    ['displacement', 'الإزاحة'], ['distance', 'المسافة'], ['average velocity', 'السرعة المتجهة المتوسطة'], ['average speed', 'السرعة القياسية المتوسطة'], ['overall', 'إجمالي'], ['respectively', 'على الترتيب'], ['perpendicular', 'متعامد'], ['opposite', 'معاكس'],
    ['cancel', 'يُلغي'], ['force', 'قوة'], ['tension', 'قوة الشد'], ['cable', 'كابل'], ['skier', 'متزلج'], ['postman', 'ساعي بريد'], ['reverse', 'يعكس'], ['reverses', 'يعكس'], ['direction', 'الاتجاه'], ['angle', 'زاوية'],
    ['sum', 'المجموع'], ['difference', 'الفرق'], ['velocity', 'السرعة المتجهة'], ['speed', 'السرعة القياسية'], ['median', 'الوسيط'], ['trip', 'رحلة'], ['leg', 'جزء من الرحلة'], ['walks', 'يمشي'], ['points', 'يشير']
  ];

  /* ---------- "Which law?" chooser and easily-confused pairs ---------- */
  ch.chooser = [
    { given: R`A point $(x,y)$`, need: R`Its length $r$ and angle $\theta$`, law: 'c2p', ar: 'فيثاغورس ثم tan⁻¹، وأضف 180° إذا كانت x سالبة.' },
    { given: R`$r$ and $\theta$`, need: R`$x$ and $y$`, law: 'p2c', ar: 'x = r cos θ و y = r sin θ.' },
    { given: R`Size and direction of a tilted vector`, need: 'Its horizontal and vertical parts', law: 'comp', ar: 'المجاور cos والمقابل sin.' },
    { given: R`Vector written with $\hat i$, $\hat j$`, need: 'Its meaning or magnitude', law: 'unit', ar: 'المعاملات هي المركبات.' },
    { given: 'Only the magnitudes of two vectors (no angle)', need: 'Largest or smallest sum', law: 'maxmin', ar: 'اجمع الطولين أو اطرحهما.' },
    { given: 'Two vectors with the angle between them', need: 'Size of the sum', law: 'lawcos', ar: 'أو استخدم المركبات.' },
    { given: 'Three or more vectors, or any directions', need: 'Resultant size and direction', law: 'addc', ar: 'جدول مركبات: اجمع x معاً و y معاً.' },
    { given: R`$\vec A - \vec B$ asked`, need: 'Difference vector', law: 'subc', ar: 'اطرح كل مركبة من نظيرتها.' },
    { given: 'A trip with several legs and times', need: 'Average velocity or speed', law: 'avgvec', ar: 'الإزاحة للسرعة المتجهة، والمسار الكلي للقياسية.' },
    { given: R`Two vectors in $\hat i,\hat j$ form`, need: 'The angle between them', law: 'angbet', ar: 'اطرح زاويتيهما.' },
    { given: R`A vector with $\hat k$ (3-D)`, need: 'Its length', law: 'mag3d', ar: 'جذر ثلاثة حدود.' },
    { given: '3-D vector', need: 'Angles with the axes', law: 'dircos', ar: 'cos θ = المركبة ÷ المقدار.' }
  ];
  ch.pairs = [
    { a: 'Law of cosines', b: 'Components', ea: 'Fast for exactly two vectors with a known angle.', eb: 'Works for any number of vectors and also gives the direction.', rule: 'In doubt, use components.', ar: 'عند الشك استخدم المركبات.' },
    { a: 'Displacement', b: 'Distance', ea: 'Straight line start → end.', eb: 'Whole path.', rule: 'Velocity ↔ displacement; speed ↔ distance.', ar: 'السرعة المتجهة مع الإزاحة، والقياسية مع المسافة.' },
    { a: R`$\vec A - \vec B$`, b: R`$\vec B - \vec A$`, ea: R`$\vec A + (-\vec B)$.`, eb: 'The exact reverse of the other one.', rule: 'Same size, opposite direction.', ar: 'نفس الطول واتجاه معاكس.' },
    { a: R`Angle from the $+x$ axis`, b: '“North of east”', ea: R`$\theta$ counted counter-clockwise from $+x$.`, eb: 'Start at east, turn toward north.', rule: R`Convert to a standard angle before using $\cos$ and $\sin$.`, ar: 'حوّل الاتجاه اللفظي إلى زاوية من محور x أولاً.' },
    { a: 'Component', b: 'Magnitude', ea: R`$A_x=A\cos\theta$, can be negative.`, eb: R`$A=\sqrt{A_x^2+A_y^2}$, never negative.`, rule: 'A component is never larger than the magnitude.', ar: 'المركبة لا تتجاوز المقدار أبداً.' }
  ];
})(typeof window !== 'undefined' ? window : globalThis);
