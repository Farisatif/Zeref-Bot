let handler = m => m;

handler.all = async function (m) {
    let chat = global.db.data.chats[m.chat];
    // أوامر تشغيل/إيقاف الردود التلقائية بنقطة في البداية
 
    // إذا الردود معطلة، لا ينفذ شيء
    if (chat.autoReply === false) return;

     if (m.key.fromMe) {
   console.log(`📤 رسالة أرسلها البوت : ${m.text || m.message}`);
   return; // لا ترد على نفسك
 }


    let responses;

     if (/^مابعرف|ما اعرف|ماادري|ما ادري$/i.test(m.text)) {
    responses = [
      `*حتى انا*`,
      `*همم طيب*`,
      `*حسبنا الله ونعم الوكيل*`,
    ];
  }

  if (/^بووت|بوووت|بوتت|البوت|بووووت|بوت| بوت $/i.test(m.text)) {
    responses = [
      `*اسـمي شادو بـوت بعيـنك*`,
      `*يبدو ان دماغك معطل هل نصلحه*`,
      `*ناديني شادو ياعزيزي*`,
      `*اسمي شادو*`,
      `*انا انسان وليس بوت يااحمق*`,
      `*اذهــب الى الجحيـم*`,
      `*بـاكــا اسمي شادو*`,
      `*هههه بس انقـلع قـال بـوت*`,
      `*ان شاء الله تتحول بـوت اسمي شادو*`,
      `*كم مره يجب علي قول ذالك ..*`,
      `*والله اسمي شادو وعع آس؁تــا دخلني بمكان حسبي الله بس*`,
      `*ما يجي منك الا بوت .. ان شاءالله تكون بوت*`,
      `*مليت منك .. فقط اخرس*`,
    ];
  }

  if (/^اوهايو | اوهايو|اوهايو$/i.test(m.text)) {
    responses = [`*اوهايـو كزايـمـس*`];
  }

  if (/^امزح|مزح$/i.test(m.text)) {
    responses = [
      `*لاتقول امزح ترا مزحك ثقيل*`,
      `*تجرح في كلامك ثم تقول بهزر*`,
      `*اش مـن امزح تع المحكـمه*`,
    ];
  }

  if (/^تست$/i.test(m.text)) {
    responses = [`*تسـت تسـت*`, `*تسـت*`, `*تستات*`];
  }

  if (/^تحبني|تحبني | تحبني | تحبني$/i.test(m.text)) {
    responses = [
      `*احبـك نص بس*`,
      `*امـوت فيك*`,
      `*لا اكرهــكك*`,
      `*بفـــكر*`,
      `*ان شاء اللــه*`,
      `*احتـرم نفســك*`,
    ];
  }

  if (/^انا جيت|اجيت|رجعت|اتيت|جيت$/i.test(m.text)) {
    responses = [
      `*نـورت يـقلبي*`,
      `*ارجع مـن حيث اتيـت*`,
      `*كنا مرتاحين في غيابك*`,
      `*ليش جيـت اصلا*`,
      `*لاتجـي انقلع*`,
      `*نورت اكيد*`,
      `*منور بنوري*`,
      `*هلا فيك نورت*`,
    ];
  }

  if (/^اخرسي|اخرس$/i.test(m.text)) {
    responses = [
      `*تبي اصـلح دماغك*`,
      `*اخرس انـت*`,
      `*وميـن انت ع شان تتكلـم معي كذا*`,
      `*احـــمق*`,
      `*حاضر*`,
    ];
  }

  if (/^حرامي|سارق$/i.test(m.text)) {
    responses = [
      `*تتهـم بدون ادله يا احمـق*`,
      `*كيف عرفت مسوي دور المحقق*`,
      `*بس اسكـت خلي الناس بحـالها*`,
      `*شــووف نفسـك*`,
    ];
  }

  if (/^ملل|مللل|ملللل$/i.test(m.text)) {
    responses = [
      `*عارفين ف اسكـت احسن لك*`,
      `*طيب والحـل*`,
      `*تبي تلـعب يعني*`,
    ];
  }

  if (/^فخم|نايس|حلو | حلو| حلو |حلو|نايس $/i.test(m.text)) {
    responses = [
      `*مـن ذوقك ياعزيزي الصغير*`,
      `*عيــووونك*`,
      `*مو احـــلا منـــك*`,
      `*انـــت احـــلا*`,
    ];
  }

  if (/^نعم$/i.test(m.text)) {
    responses = [
      `*حد نـاداك*`,
      `*ميـن ناداك ياابااكا*`,
      `*حـد نادا باسمـك؟*`,
    ];
  }

  if (/^دوم|دووم|دوووم|دووووم|دووووووم|دووووووووم$/i.test(m.text)) {
    responses = [`نبضك..❤️‍🔥`, `ايامكم الحلوه..🙂`, `عزك ..🫂`, `بدواااامك.. 🙃`];
  }

  if (/^أحبك|احبك|شادو اموت فيك|احبك يا شادو|حبيبي|حبيبي $/i.test(m.text)) {
    responses = [
      `*وانا لا ..🐦*`,
      'شكرا',
      'بفكر في الامر',
      'و انا',
      'خجلتني',
      'خلاص لا تخجلني',
      'اسكتتتتت ترا اضربك عيب وش هل كلام',
      'طيب و بعدين',
    ];
  }

  if (/^زق|كلزق|زق عليك|زق | زق | زق|خرا |خرا| خرا| خرا |أمك|امك|امك | امك $/i.test(m.text)) {
    responses = [
      `*عيب ..🐦*`,
      `*وسخ تأدب .. 🐦*`,
      `*الله يهديك*`,
      '*عيب يا طفل ..🗿*',
    ];
  }

  if (/^متأكد|متاكد|واثق من كلامك |واثق |واثق$/i.test(m.text)) {
    responses = [
      '*يب .. 🙃*',
      '*متأكدد .. 👤*',
      'يب 99.99% .. 👤',
      '*اعتقد هذا .. 😒*',
    ];
  }

  if (/^كفو|كفو | كفو |كفوو|كفوو |كفوووو| كفوووو|وربي كفو|كفوووو $/i.test(m.text)) {
    responses = [`*كفووك الطيب*`, `*كفوك*`, `*كفو من رباك*`];
  }

  if (/^اها | اها |اها$/i.test(m.text)) {
    responses = [`*يب*`, `*بضبط*`, `*اعتقد هذا*`];
  }

  if (/^الا$/i.test(m.text)) {
    responses = [`*لا*`, `*حرفيا لا*`, `*لا يعني لا*`, 'اوفااااا', 'افهم', 'طيب'];
  }

  if (/^ههه|هههه|ههههه|ههههههه|هههههههه|ههههههههه|ههههههههههه|ههههههههههههه|هيهيه$/i.test(m.text)) {
    responses = [
      'دوم هل ضحكة',
      'دايمه',
      'دوم يا رب',
      'ههه',
      'ههههههههه',
      'ايش لي يضحك',
      'اضحك معاك؟',
      'دوم',
    ];
  }

  // ردود إضافية أقترحها:
  if (/^جميل|جميييل$/i.test(m.text)) {
    responses = [
      'جمالك الحقيقي ✨',
      'انت الاجمل 🌟',
      'عيونك الجميلة تشوف كل شي جميل',
    ];
  }

  if (/^تصبح على خير$/i.test(m.text)) {
    responses = [
      'وانت من اهله',
      'احلام سعيده',
      'تصبح على الف خير',
    ];
  }

    if (/^يا ورع|يا باكا|ورع|باكا|باكا+|ورع+| باكا$/i.test(m.text)) {
    responses = [
      'ايوااه',
      'ايوه يا باكااا',
      'ايوه يا ورع',
    ];
  }

    if (/^(وش جديدك |فيه شي جديد |وش اخبارك |ايش اخبارك |ايش اخبارك)$/i.test(m.text)) {
    responses = ["كل يوم أتعلم شي جديد", "جديدي دائمًا بيد المطور، تابع التحديثات","لا شيئ جديد وانت ؟"];
  }

    if (/^(تم| تم)$/i.test(m.text)) {
    responses = ["حلو","افراحك"];
    }

  if (/^(تعرفني |تتذكرني|تتذكرني | تتذكرني |تعرفني | تعرفني)$/i.test(m.text)) {
    responses = ["أكيد أذكرك، كيف أنساك؟","الله كيف انساك؟", "طبعًا، محفوظ في الذاكرة الداخليه تبع النظام .. بس ذكرني من انت لأني ناسي لك"];
  }

  if (/^(نكتة|قل نكتة)$/i.test(m.text)) {
    responses = ["ليش الكمبيوتر ما يغني؟ لأنه نوتاته غلط!", "مره دجاجه دخلت مطعم، قالوا لها أهلًا بيك يا فراخ"];
  }


    if (/^(كيفك|كيف حالك|كيف انت|كيف أمورك|كيف صاير|عامل ايه|كيف حالك |كيفك)$/i.test(m.text)) {
        responses = [
            "بخير والحمد لله، أنت؟",
            "تمام، كيفك إنت؟",
            "الحمد لله، طمني عليك",
            "في أفضل حال، كيفك؟",
            "أمورنا طيبة إن شاء الله، كيف حالك؟"
        ];
    }

    if (/^(من المطور|مين صنعك|من سواك|مين المبرمج |من المبرمج |من المبرمج| من المطور| من المطور |من المطور )$/i.test(m.text)) {
        responses = [
            "مطور البوت هو فارس، ما تحتاج تعرف أكثر",
            "الفضل كله يرجع لفارس",
            "اللي طورني شخص محترف اسمه فارس",
            "أنا مجرد أداة، وفارس هو اللي خلاني أكون هنا",
            "المطور؟ فارس، من أفضل المبرمجين"
        ];
    }

    if (/^(شكرا|شكرا|مشكور|تسلم|يعطيك العافية|شكرًا )$/i.test(m.text)) {
        responses = [
            "العفو",
            "تسلم",
            "الله يعافيك",
            "واجبي .. اعتقد",
            "ولا يهمك"
        ];
    }

    if (/^(وينك |وين انت | أين أنت|فينك | مختفي|وينك| وين انت |وين انت|وين انت)$/i.test(m.text)) {
        responses = [
            "موجود",
            "أنا هنا",
            "ما غبت",
            "أتابع بصمت",
            "توني جيت"
        ];
    }

    if (/^(صباح الخير|صباحك|صباح الورد|صباح الفل|صباح الياسمين)$/i.test(m.text)) {
        responses = [
            "صباح الخير",
            "عادني هنام .. تصبح على خير",
            "صباحك",
            "صباح الورد",
            "يااا صباحوو"
        ];
    }

if (/^اوف|اوف |رقدت|رقدت |😂|😂 😂| 😂😂😂 | 😂😂 | 😂😂| 😂😂😂|😭😭|😭😭😭| 😭😭| 😭😭😭| 😭😭 | 😭😭😭 |هههه|ههههه|هههههه|ههههههه|هههههههه|ههههههههه$/i.test(m.text) ) {responses = [ 
          `😂😂💔`,
          `😂😂💔`, 
          `🙄😂`, 
     
];
} 
    if (/^(😂){2,}$/i.test(m.text) ) {responses = [ 
          `😂😂`,
          `😂😂😂`, 
          `😂😂😂`, 
        `🤣🤣🤣`
     
];
} 
    if (/^(😭){2,}$/i.test(m.text) ) {responses = [ 
          `😂😂`,
          `😂😂😂`, 
          `ا😂😂😂`, 
        `🤣🤣🤣`
     
];
} 
    if (/^(🤣){2,}$/i.test(m.text) ) {responses = [ 
          ` 😂😂`,
          `😂😂😂`, 
          `😂😂😂`, 
        `🤣🤣🤣`
     
];
} 
    
    if (/^هاي|هاي |هايي|هاييي|هايييي|هاييييي|هايييييي|هاييييييي|هاي$/i.test(m.text) ){responses = [
        `هاي`,
        `اهلا`,
        `هلا`
    ]}
        
 if (/^اسمع|تسمع $/i.test(m.text) ) {responses = [ 
          `اكيد بسمعك`,
          `تفضل رغم بشوف ما بسمع`, 
          `ايوه`,
          `بسمعك`
     
];
}    
    if (/^دووم|دوم|تدوم| دوم| دووم| تدووم|دوم |دووم |دووووم |تدوووم $/i.test(m.text) ) {responses = [ 
          `بدوامكك`,
          `وآيااك`, 
          `بدوامك يارب`,
          `حبيبي والله`
     
];
} 

    if (/^(احبك|بحبك|احبك|أحبك |احبك | احبك يا فارس )$/i.test(m.text)) {
        responses = [
          "وانا احبك","اي والله وانا احبك","خلاص لا تحرجني","اسمع هذا الكلام محظور دوليا","احبك اكثر منك","وانا ما احبك "
            
        ];
    }
if (/^عرفت؟| كنت عرفت$/i.test(m.text) ) {responses = [ 
          `اعتقد`,
          `اعتقد .. يب`, 
          `يمكن .. ما أعرف`, 
     
];
} 
       
   if (/^سلام|سلام عليكم$/.test(m.text) ) {responses = [ 
          `وعليكم السلام ورحمة الله وبركاته`,
          `وعليكم السلام`, 
          `وعليكم السلاام ..`,
          `وعليك السلام`
     
];
} 

if (/^كيفك | كيفك | كيفك|كيفك|كيف حالك | كيف انت | كيف حالك |كيفنت | كيف انت | كيف انت$/i.test(m.text) ) {responses = [ 
          `بخيير`,
          `بخير الحمد لله`, 
          `بخير دامك بخير`, 
          `بخير الحمد لله .. وانت؟`,
          `الحمد لله وانت ؟`,
          `لله الحمد والشكر .. وانت كيف حالك؟`,
          `في افضل ما يكون .. الحمد لله`,
          'بخييير .. وانت؟',
          
     
];
} 

if (/^يا فارس|استا|آستا|يا آستا|فارس|زيريف|يا مطور|ي فارس|قهوه|قهوة| قهوه| قهوه | قهوه| قهوه | قهوه| قهوة| ولد |ولد$/i.test(m.text) ) {responses = [ 
          `ايوه .. معك`,
          `تفضل`, 
          `هاا`, 
          `هنا`,
          `نعم`,
          `هلاا`,
          `ايش`
     
];
} 

if (/^بوت |بوت |بوت| بوت $/i.test(m.text) ) {responses = [ 
          `تقريبا ..بوت بس تكلم`,
          `طيب .. تكلم بلذي تريده وهيجي يشوف الدردشه لما يفضى ..`, 
          `يب وش تريد ؟ `, 
          `لخص الموضوع .. بدون كلام زائد`,
          `طيب .. وبعدين؟`,
          `طيب ايش تريد ؟`,
          `طيب`
          
     
];
} 

if (/^انقلع | انقلع | انقلع|انقلع|دز|دزز|دز | دز| دز | اخرس | اسكت |اسكت|اخرس |اخرس| اخرس| اسكت |اسكت| اسكت$/i.test(m.text) ) {responses = [ 
          `ليش؟`,
          `انت تعرف انك في منطقتي؟`, 
          `وبعدين؟ هتنقلع؟`, 
          `والسبب ؟`,
          `لو ما عجبك كلامي اشتكي لاعند فارس .. مثل الاطفال`,
          `طيب يا فيلسوف ..`,
          `اك خلص وقول لي انك خلصت`,
          `لا تنسى لما تخلص تقول لي انك خلصت`,`خلص كلامك بسرعه`,
          `بتظن ان عندي وقت لك؟ لولا المطور بس خلاني بدله`,
          `اوكي .. استمر`
          
     
];
} 

if (/^ااحا|احاا|احااا|احاااا|احا |احاا |احاااا| احاااا |احااا|احاا |احا$/i.test(m.text) ) {responses = [ 
          `لا احاا ولا شي .. ايش فيك ؟`,
          `همممم`, 
          `احا؟ ليش`, 
          `احتين`,
          `خير ايش في؟`,
          `ايش؟؟`,
          `خليك واضح ايش حصل؟`,
          `الله يعينك`
          
     
];
} 
    if (/^هلا|هلا $/i.test(m.text) ) {responses = [ 
          `يا هلا فيك`,
          `هلا وغلا وكرتون حلا`, 
          `هلا فيك`,
     `ارحب`
];
} 

if (/^خلصت|خلصت | خلصت| خلصت |كملت| كملت|تم | تم$/i.test(m.text) ) {responses = [ 
          `اوكي`,
          `طيب`, 
          `اوك`, 
          `تمام`
     
];
} 

if (/^هدير|هدهد|هدورتك|ران|هيدو$/i.test(m.text) ) {responses = [ 
          `دلوعة ريسو ♥︎`,
          `دلوعة استوته ♥︎`, 
          `هيدوووو دلوعة ريسووو ♡`, 
          `دلوعتيييي ♥︎`
     
];
} 

if (/^مساء الخير|مساء ال |مسائك$/i.test(m.text) ) {responses = [ 
          `مساء النووور`,
          `مساء الورد .. هلا وغلا`, 
          `هلا .. مساء الخير`, 
          `ارحب`
     
];
} 


if (/^تفهم| تفهم$/i.test(m.text) ) {responses = [ 
          `اكيد من بعدك`,
          `من بعدك`, 
          `من بعدك اكيدد`
     
];
} 

if (/^وينك | وينك | وينك| وين انت |وين انت| وين انت | وين انت|وينك|ويننت|ويننت |اين؟|اين$/i.test(m.text) ) {responses = [ 
          `هنا معك`,
          `في قلبك`, 
          `موجود`, 
          `هلا .. موجود`,
          `معك`,
        `هنا في الشات`
          
     
];
} 

if (/^ليش|والسبب|ماذا |وش|ليش |والسبب |وش |ايش| ايش|ليش | ليش | والسبب | وشش | وش |لماذا| لماذا| لماذا |لماذا|كييف| لييش| لييش $/i.test(m.text) ) {responses = [ 
          `مابعرفش .. كذا`,
          `لو أعرف .. هقولك`, 
          `مدريي .. بس كذا`, 
          `بنسبه لي مابعرف .. اذا انت ما تعرف كيف هعرف انا ؟`,
          `مابعرف`,
          `واضح مسألة معقده ..`,
          `ماأدري بس هفكر ..`,
          
     
];
} 
    if (/^كذا| هكذا |كذا |هكذا $/i.test(m.text) ) {responses = [ 
          `طيب`,
          `احم`, 
          `اوكي`, 
     
];
} 
    if (/^يب$/i.test(m.text) ) {responses = [ 
          `هممم`,
          `يب`,
          `همممم`, 
          `هممممم`, 
     
];
} 

if (/^ماأدري| ماأدري|ماادري|ما ادري| ماأدري| ماأدري| ماأدري|مدري| مدري| ماادري|مابعرف| مابعرف| ما بعرف$/i.test(m.text) ) {responses = [ 
          `مسألة معقدة توقعت`,
          `طيب`, 
          `حتى انا`, 
          `سهل هتنحل`
     
];
} 

if (/^بخير | بخير الحمد لله |الحمد لله | بخير|بخير |بخير|بخيير$/i.test(m.text) ) {responses = [ 
          `دوم`,
          `دوم حمد الله`, 
          `يدوووم`, 
          `لله الحمد`,
          `الحمد لله`
     
];
} 

    if (/^ما دخلك|مادخلك|ما دخلك |مادخلك | ما تدخل| ما تدخل | مادخلك | مادخلك |ماتدخل| ما تدخل|ما دخلك$/i.test(m.text) ) {responses = [ 
          `انت في منطقتي`,
          `وانت ؟`, 
          `ضحكت .. طيب`, 
        `الله يعينني عليك`
     
];
}
   if (responses) { 
     let randomIndex = Math.floor(Math.random() * responses.length); 
     conn.reply(m.chat, responses[randomIndex], m); 
   } 
   return !0 
 }; 
  
 export default handler;
