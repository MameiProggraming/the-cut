/* Ingredient photos, one per thing a recipe asks for. Packs are Open Food Facts product photos of what is
   sold in the UAE (uae: true) where a licensed one exists; fresh food and the rest come from Wikimedia Commons.
   Every photo is openly licensed and credited on its card (author, licence, source). Built from the photo
   manifest; "find" is the search phrase for the Carrefour UAE link, "ar" the Arabic of "what". */
export const INGREDIENTS = [
  {
    "slug": "greek-yogurt",
    "items": [
      "Greek yogurt"
    ],
    "file": "art/ing/greek-yogurt.webp",
    "kind": "product",
    "product": "Al Rawabi Greek Yoghurt Plain",
    "source": "https://world.openfoodfacts.org/product/6291030006429",
    "author": "Open Food Facts contributors",
    "licence": "CC BY-SA 3.0",
    "licenceUrl": "https://creativecommons.org/licenses/by-sa/3.0/",
    "uae": true,
    "what": "Greek yogurt: thick strained yogurt with about twice the protein of regular yogurt. Use the 2 % fat kind.",
    "find": "greek yoghurt",
    "ar": "زبادي يوناني: زبادي مصفّى كثيف فيه نحو ضعف بروتين الزبادي العادي. اختر النوع قليل الدسم 2 %."
  },
  {
    "slug": "oats",
    "items": [
      "oats"
    ],
    "file": "art/ing/oats.webp",
    "kind": "product",
    "product": "Quaker Whole Oats",
    "source": "https://world.openfoodfacts.org/product/6290400013425",
    "author": "Open Food Facts contributors",
    "licence": "CC BY-SA 3.0",
    "licenceUrl": "https://creativecommons.org/licenses/by-sa/3.0/",
    "uae": true,
    "what": "Rolled oats: flattened oat flakes for porridge and overnight oats, not instant sachets.",
    "find": "rolled oats",
    "ar": "شوفان: رقائق شوفان كاملة للعصيدة والشوفان المنقوع، وليس الأكياس سريعة التحضير."
  },
  {
    "slug": "berries",
    "items": [
      "berries"
    ],
    "file": "art/ing/berries.webp",
    "kind": "fresh",
    "product": null,
    "source": "https://commons.wikimedia.org/wiki/File:Red_fruits.jpg",
    "author": "Ester2021",
    "licence": "CC BY-SA 4.0",
    "licenceUrl": "https://creativecommons.org/licenses/by-sa/4.0/",
    "uae": false,
    "what": "Mixed berries: blueberries, raspberries or strawberries, fresh or frozen.",
    "find": "mixed berries",
    "ar": "توت مشكّل: توت أزرق أو توت العليق أو فراولة، طازج أو مجمّد."
  },
  {
    "slug": "honey",
    "items": [
      "honey"
    ],
    "file": "art/ing/honey.webp",
    "kind": "product",
    "product": "Langnese Pure Bee Honey",
    "source": "https://world.openfoodfacts.org/product/4023300850300",
    "author": "Open Food Facts contributors",
    "licence": "CC BY-SA 3.0",
    "licenceUrl": "https://creativecommons.org/licenses/by-sa/3.0/",
    "uae": true,
    "what": "Honey: plain runny honey, any kind.",
    "find": "honey",
    "ar": "عسل: عسل سائل عادي، أي نوع."
  },
  {
    "slug": "flaked-almonds",
    "items": [
      "flaked almonds"
    ],
    "file": "art/ing/flaked-almonds.webp",
    "kind": "product",
    "product": null,
    "source": "https://commons.wikimedia.org/wiki/File:Almond_slices.jpg",
    "author": "Fumikas Sagisavas",
    "licence": "CC0",
    "licenceUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
    "uae": false,
    "what": "Flaked almonds: almonds cut into thin slices, sold in small bags in the baking aisle.",
    "find": "sliced almonds",
    "ar": "لوز شرائح: لوز مقطّع شرائح رقيقة، يُباع في أكياس صغيرة في قسم مستلزمات الخبز."
  },
  {
    "slug": "eggs",
    "items": [
      "eggs"
    ],
    "file": "art/ing/eggs.webp",
    "kind": "fresh",
    "product": null,
    "source": "https://commons.wikimedia.org/wiki/File:6-Pack-Chicken-Eggs.jpg",
    "author": "Evan-Amos",
    "licence": "Public domain",
    "licenceUrl": "https://creativecommons.org/publicdomain/mark/1.0/",
    "uae": false,
    "what": "Eggs: ordinary large hen's eggs.",
    "find": "eggs",
    "ar": "بيض: بيض دجاج كبير عادي."
  },
  {
    "slug": "labneh",
    "items": [
      "labneh"
    ],
    "file": "art/ing/labneh.webp",
    "kind": "product",
    "product": "Pinar Creamy Labneh",
    "source": "https://world.openfoodfacts.org/product/8690565040720",
    "author": "Open Food Facts contributors",
    "licence": "CC BY-SA 3.0",
    "licenceUrl": "https://creativecommons.org/licenses/by-sa/3.0/",
    "uae": true,
    "what": "Labneh: thick, tangy strained yogurt spread, sold in tubs in the dairy fridge.",
    "find": "labneh",
    "ar": "لبنة: زبادي مصفّى كثيف بطعم حامض خفيف، تُباع في علب في ثلاجة الألبان."
  },
  {
    "slug": "sourdough",
    "items": [
      "sourdough"
    ],
    "file": "art/ing/sourdough.webp",
    "kind": "product",
    "product": "Suchali's Artisan Soft Sourdough Sandwich Bread",
    "source": "https://world.openfoodfacts.org/product/8908018729925",
    "author": "Open Food Facts contributors",
    "licence": "CC BY-SA 3.0",
    "licenceUrl": "https://creativecommons.org/licenses/by-sa/3.0/",
    "uae": true,
    "what": "Sourdough: a crusty loaf made with natural yeast, sliced for toast.",
    "find": "sourdough bread",
    "ar": "خبز العجين المخمّر (ساوردو): رغيف بقشرة مقرمشة مصنوع بخميرة طبيعية، يُقطّع شرائح للتحميص."
  },
  {
    "slug": "avocado",
    "items": [
      "avocado"
    ],
    "file": "art/ing/avocado.webp",
    "kind": "fresh",
    "product": null,
    "source": "https://commons.wikimedia.org/wiki/File:Avocado_Hass_-_single_and_halved.jpg",
    "author": "Ivar Leidus",
    "licence": "CC BY-SA 4.0",
    "licenceUrl": "https://creativecommons.org/licenses/by-sa/4.0/",
    "uae": false,
    "what": "Avocado: ripe when it gives slightly to a gentle press.",
    "find": "avocado",
    "ar": "أفوكادو: تكون ناضجة حين تلين قليلًا عند الضغط عليها برفق."
  },
  {
    "slug": "chilli-flakes",
    "items": [
      "chilli flakes"
    ],
    "file": "art/ing/chilli-flakes.webp",
    "kind": "product",
    "product": "Bayara Chili Crushed",
    "source": "https://world.openfoodfacts.org/product/3434410014550",
    "author": "Open Food Facts contributors",
    "licence": "CC BY-SA 3.0",
    "licenceUrl": "https://creativecommons.org/licenses/by-sa/3.0/",
    "uae": true,
    "what": "Chilli flakes: dried, crushed red chilli. A pinch adds heat.",
    "find": "chilli flakes",
    "ar": "فلفل أحمر مجروش: فلفل أحمر مجفّف ومجروش. رشّة صغيرة تكفي للحرارة."
  },
  {
    "slug": "olive-oil",
    "items": [
      "olive oil"
    ],
    "file": "art/ing/olive-oil.webp",
    "kind": "product",
    "product": "Al Alokozay Extra Virgin Olive Oil",
    "source": "https://world.openfoodfacts.org/product/6291101137359",
    "author": "Open Food Facts contributors",
    "licence": "CC BY-SA 3.0",
    "licenceUrl": "https://creativecommons.org/licenses/by-sa/3.0/",
    "uae": true,
    "what": "Extra virgin olive oil: the green-gold oil for cooking and drizzling.",
    "find": "extra virgin olive oil",
    "ar": "زيت زيتون بكر ممتاز: الزيت الأخضر الذهبي للطبخ والرشّ."
  },
  {
    "slug": "chicken-sausage",
    "items": [
      "chicken sausage"
    ],
    "file": "art/ing/chicken-sausage.webp",
    "kind": "product",
    "product": "Seara Chicken Franks",
    "source": "https://world.openfoodfacts.org/product/7894904000081",
    "author": "Open Food Facts contributors",
    "licence": "CC BY-SA 3.0",
    "licenceUrl": "https://creativecommons.org/licenses/by-sa/3.0/",
    "uae": true,
    "what": "Chicken sausages: ready-made sausages of chicken meat, from the chilled meat section.",
    "find": "chicken sausage",
    "ar": "نقانق دجاج: نقانق جاهزة من لحم الدجاج، من قسم اللحوم المبرّدة."
  },
  {
    "slug": "tomato",
    "items": [
      "tomato"
    ],
    "file": "art/ing/tomato.webp",
    "kind": "fresh",
    "product": null,
    "source": "https://commons.wikimedia.org/wiki/File:Red_tomatoes._img_07.jpg",
    "author": "Dmitry Makeev",
    "licence": "CC BY-SA 4.0",
    "licenceUrl": "https://creativecommons.org/licenses/by-sa/4.0/",
    "uae": false,
    "what": "Tomatoes: ordinary red tomatoes.",
    "find": "tomato",
    "ar": "طماطم: طماطم حمراء عادية."
  },
  {
    "slug": "onion",
    "items": [
      "onion"
    ],
    "file": "art/ing/onion.webp",
    "kind": "fresh",
    "product": null,
    "source": "https://commons.wikimedia.org/wiki/File:Onion_on_White.JPG",
    "author": "Colin",
    "licence": "CC BY-SA 3.0",
    "licenceUrl": "https://creativecommons.org/licenses/by-sa/3.0/",
    "uae": false,
    "what": "Onion: the ordinary brown-skinned cooking onion.",
    "find": "brown onion",
    "ar": "بصل: البصل العادي ذو القشرة البنية للطبخ."
  },
  {
    "slug": "bell-pepper",
    "items": [
      "pepper"
    ],
    "file": "art/ing/bell-pepper.webp",
    "kind": "fresh",
    "product": null,
    "source": "https://commons.wikimedia.org/wiki/File:Capsicum_annuum_fruits_IMGP0049.jpg",
    "author": "Nikodem Nijaki",
    "licence": "CC BY-SA 3.0",
    "licenceUrl": "https://creativecommons.org/licenses/by-sa/3.0/",
    "uae": false,
    "what": "Bell pepper (capsicum): the large sweet pepper, any colour. Not a hot chilli.",
    "find": "capsicum",
    "ar": "فلفل رومي (فلفل حلو): الفلفل الكبير الحلو بأي لون. ليس الفلفل الحار."
  },
  {
    "slug": "cumin",
    "items": [
      "cumin"
    ],
    "file": "art/ing/cumin.webp",
    "kind": "product",
    "product": "Topaz and Ducros ground cumin",
    "source": "https://commons.wikimedia.org/wiki/File:Cumin.JPG",
    "author": "KVDP at English Wikipedia",
    "licence": "Public domain",
    "licenceUrl": "https://creativecommons.org/publicdomain/mark/1.0/",
    "uae": false,
    "what": "Ground cumin: a warm, earthy brown spice powder.",
    "find": "cumin powder",
    "ar": "كمون مطحون: بهار بني بنكهة دافئة ترابية."
  },
  {
    "slug": "paprika",
    "items": [
      "paprika",
      "paprika rub"
    ],
    "file": "art/ing/paprika.webp",
    "kind": "product",
    "product": "Bayara Smoked Paprika",
    "source": "https://world.openfoodfacts.org/product/6291109767299",
    "author": "Open Food Facts contributors",
    "licence": "CC BY-SA 3.0",
    "licenceUrl": "https://creativecommons.org/licenses/by-sa/3.0/",
    "uae": true,
    "what": "Paprika: mild red pepper powder. For the paprika rub, mix it with salt, garlic powder and a little oil.",
    "find": "paprika",
    "ar": "بابريكا: مسحوق فلفل أحمر خفيف. لتتبيلة البابريكا اخلطها بالملح ومسحوق الثوم وقليل من الزيت."
  },
  {
    "slug": "semi-skimmed-milk",
    "items": [
      "semi-skimmed milk"
    ],
    "file": "art/ing/semi-skimmed-milk.webp",
    "kind": "product",
    "product": "Almarai Low Fat Milk",
    "source": "https://world.openfoodfacts.org/product/6281007032575",
    "author": "Open Food Facts contributors",
    "licence": "CC BY-SA 3.0",
    "licenceUrl": "https://creativecommons.org/licenses/by-sa/3.0/",
    "uae": true,
    "what": "Semi-skimmed milk: cow's milk with about 1.5 % fat, sold in the UAE as low-fat milk.",
    "find": "low fat milk",
    "ar": "حليب نصف دسم: حليب بقر فيه نحو 1.5 % دسم، يُباع في الإمارات باسم حليب قليل الدسم."
  },
  {
    "slug": "protein-powder",
    "items": [
      "protein powder"
    ],
    "file": "art/ing/protein-powder.webp",
    "kind": "product",
    "product": "Myprotein Impact Whey Protein",
    "source": "https://world.openfoodfacts.org/product/5059883231150",
    "author": "Open Food Facts contributors",
    "licence": "CC BY-SA 3.0",
    "licenceUrl": "https://creativecommons.org/licenses/by-sa/3.0/",
    "uae": true,
    "what": "Protein powder: whey protein for shakes and oats. One scoop is about 30 g.",
    "find": "whey protein",
    "ar": "بروتين مسحوق: بروتين مصل اللبن (واي) للمخفوقات والشوفان. المغرفة الواحدة نحو 30 غرامًا."
  },
  {
    "slug": "peanut-butter",
    "items": [
      "peanut butter"
    ],
    "file": "art/ing/peanut-butter.webp",
    "kind": "product",
    "product": "Whole Earth Smooth Organic Peanut Butter",
    "source": "https://world.openfoodfacts.org/product/5011835101232",
    "author": "Open Food Facts contributors",
    "licence": "CC BY-SA 3.0",
    "licenceUrl": "https://creativecommons.org/licenses/by-sa/3.0/",
    "uae": true,
    "what": "Peanut butter: ground roasted peanuts. The kind with only peanuts and salt is best.",
    "find": "peanut butter",
    "ar": "زبدة الفول السوداني: فول سوداني محمّص ومطحون. الأفضل ما فيه فول سوداني وملح فقط."
  },
  {
    "slug": "banana",
    "items": [
      "banana"
    ],
    "file": "art/ing/banana.webp",
    "kind": "fresh",
    "product": null,
    "source": "https://commons.wikimedia.org/wiki/File:Bananas_white_background_DS.jpg",
    "author": "Augustus Binu",
    "licence": "CC BY-SA 3.0",
    "licenceUrl": "https://creativecommons.org/licenses/by-sa/3.0/",
    "uae": false,
    "what": "Banana: an ordinary ripe banana.",
    "find": "banana",
    "ar": "موز: موزة ناضجة عادية."
  },
  {
    "slug": "chicken-thigh",
    "items": [
      "chicken thigh"
    ],
    "file": "art/ing/chicken-thigh.webp",
    "kind": "fresh",
    "product": null,
    "source": "https://commons.wikimedia.org/wiki/File:Raw_chicken_thighs.jpg",
    "author": "gran",
    "licence": "CC BY 3.0",
    "licenceUrl": "https://creativecommons.org/licenses/by/3.0/",
    "uae": false,
    "what": "Chicken thigh: boneless, skinless thigh fillets. Juicier than breast and ideal for shawarma.",
    "find": "boneless chicken thigh",
    "ar": "أفخاذ دجاج: شرائح فخذ منزوعة العظم والجلد. أطرى من الصدر ومثالية للشاورما."
  },
  {
    "slug": "basmati-rice",
    "items": [
      "rice",
      "basmati"
    ],
    "file": "art/ing/basmati-rice.webp",
    "kind": "product",
    "product": "Tilda Pure Basmati Rice",
    "source": "https://world.openfoodfacts.org/product/8901144102006",
    "author": "Open Food Facts contributors",
    "licence": "CC BY-SA 3.0",
    "licenceUrl": "https://creativecommons.org/licenses/by-sa/3.0/",
    "uae": true,
    "what": "Basmati rice: long-grain rice that cooks up fluffy. Used for the shawarma bowl and the machboos.",
    "find": "basmati rice",
    "ar": "أرز بسمتي: أرز طويل الحبة يُطبخ منفوشًا. يُستخدم في وعاء الشاورما والمكبوس."
  },
  {
    "slug": "mixed-salad",
    "items": [
      "salad",
      "large salad"
    ],
    "file": "art/ing/mixed-salad.webp",
    "kind": "fresh",
    "product": null,
    "source": "https://commons.wikimedia.org/wiki/File:SEILunchMesclunMix.jpg",
    "author": "DanielPenfield",
    "licence": "CC BY-SA 4.0",
    "licenceUrl": "https://creativecommons.org/licenses/by-sa/4.0/",
    "uae": false,
    "what": "Mixed salad leaves: lettuce and leaves, with cucumber and tomato if you like.",
    "find": "mixed salad leaves",
    "ar": "سلطة خضراء مشكّلة: خس وأوراق خضراء، مع خيار وطماطم إن أردت."
  },
  {
    "slug": "garlic-sauce",
    "items": [
      "garlic sauce"
    ],
    "file": "art/ing/garlic-sauce.webp",
    "kind": "product",
    "product": "Talia Garlic Sauce",
    "source": "https://world.openfoodfacts.org/product/6295513800078",
    "author": "Open Food Facts contributors",
    "licence": "CC BY-SA 3.0",
    "licenceUrl": "https://creativecommons.org/licenses/by-sa/3.0/",
    "uae": true,
    "what": "Garlic sauce (toum): the white Lebanese garlic sauce served with shawarma.",
    "find": "garlic sauce",
    "ar": "صلصة الثوم (الثومية): صلصة الثوم البيضاء اللبنانية التي تُقدَّم مع الشاورما."
  },
  {
    "slug": "yogurt",
    "items": [
      "yogurt"
    ],
    "file": "art/ing/yogurt.webp",
    "kind": "product",
    "product": "Al Ain Farms Fresh Yoghurt (full cream)",
    "source": "https://world.openfoodfacts.org/product/6291056068012",
    "author": "Open Food Facts contributors",
    "licence": "CC BY-SA 3.0",
    "licenceUrl": "https://creativecommons.org/licenses/by-sa/3.0/",
    "uae": true,
    "what": "Plain yogurt: ordinary unsweetened yogurt (laban zabadi), used here to marinate the chicken.",
    "find": "plain yoghurt",
    "ar": "زبادي عادي: زبادي غير محلّى، يُستخدم هنا لتتبيل الدجاج."
  },
  {
    "slug": "garlic",
    "items": [
      "garlic"
    ],
    "file": "art/ing/garlic.webp",
    "kind": "fresh",
    "product": null,
    "source": "https://commons.wikimedia.org/wiki/File:Garlic_bulbs_and_cloves.jpg",
    "author": "Ivar Leidus",
    "licence": "CC BY-SA 4.0",
    "licenceUrl": "https://creativecommons.org/licenses/by-sa/4.0/",
    "uae": false,
    "what": "Garlic: a fresh head of garlic; peel the cloves before use.",
    "find": "garlic",
    "ar": "ثوم: رأس ثوم طازج، تُقشَّر فصوصه قبل الاستخدام."
  },
  {
    "slug": "lemon",
    "items": [
      "lemon"
    ],
    "file": "art/ing/lemon.webp",
    "kind": "fresh",
    "product": null,
    "source": "https://commons.wikimedia.org/wiki/File:Lemon.jpg",
    "author": "André Karwath aka Aka",
    "licence": "CC BY-SA 2.5",
    "licenceUrl": "https://creativecommons.org/licenses/by-sa/2.5/",
    "uae": false,
    "what": "Lemon: a fresh yellow lemon for juice.",
    "find": "lemon",
    "ar": "ليمون: ليمونة صفراء طازجة للعصير."
  },
  {
    "slug": "baharat",
    "items": [
      "baharat"
    ],
    "file": "art/ing/baharat.webp",
    "kind": "product",
    "product": "Lunas Mix Baharat",
    "source": "https://commons.wikimedia.org/wiki/File:Lunas_Mix_-_Baharat.jpg",
    "author": "Myigamel",
    "licence": "CC BY-SA 3.0",
    "licenceUrl": "https://creativecommons.org/licenses/by-sa/3.0/",
    "uae": false,
    "what": "Baharat: the Gulf mixed spice of black pepper, cumin, coriander, cinnamon, cardamom and clove.",
    "find": "baharat",
    "ar": "بهارات: الخلطة الخليجية من الفلفل الأسود والكمون والكزبرة والقرفة والهيل والقرنفل."
  },
  {
    "slug": "lean-beef-mince",
    "items": [
      "lean beef mince"
    ],
    "file": "art/ing/lean-beef-mince.webp",
    "kind": "fresh",
    "product": null,
    "source": "https://commons.wikimedia.org/wiki/File:Hakket-oksekoed.jpg",
    "author": "Gajda-13 at Danish Wikipedia",
    "licence": "CC BY-SA 3.0",
    "licenceUrl": "https://creativecommons.org/licenses/by-sa/3.0/",
    "uae": false,
    "what": "Lean beef mince: ground beef with about 10 % fat, for the kofta.",
    "find": "lean beef mince",
    "ar": "لحم بقري مفروم قليل الدسم: لحم بقر مفروم فيه نحو 10 % دسم، للكفتة."
  },
  {
    "slug": "arabic-bread",
    "items": [
      "flatbread"
    ],
    "file": "art/ing/arabic-bread.webp",
    "kind": "product",
    "product": "The Cottage Loaf Arabic Bread",
    "source": "https://world.openfoodfacts.org/product/6299200035811",
    "author": "Open Food Facts contributors",
    "licence": "CC BY-SA 3.0",
    "licenceUrl": "https://creativecommons.org/licenses/by-sa/3.0/",
    "uae": true,
    "what": "Arabic bread (khubz): the round, thin flatbread sold in bags.",
    "find": "arabic bread",
    "ar": "خبز عربي: الخبز الرقيق المستدير الذي يُباع في أكياس."
  },
  {
    "slug": "fattoush-salad",
    "items": [
      "fattoush salad"
    ],
    "file": "art/ing/fattoush-salad.webp",
    "kind": "fresh",
    "product": null,
    "source": "https://commons.wikimedia.org/wiki/File:Arab_Salad.jpg",
    "author": "smart mohsin12 from Pixabay",
    "licence": "CC0",
    "licenceUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
    "uae": false,
    "what": "Fattoush: a Levantine salad of lettuce, tomato, cucumber, radish and herbs with crisp bread pieces and a sumac dressing.",
    "find": "fattoush",
    "ar": "فتوش: سلطة شامية من الخس والطماطم والخيار والفجل والأعشاب، مع قطع خبز مقرمشة وتتبيلة السماق."
  },
  {
    "slug": "hummus",
    "items": [
      "hummus"
    ],
    "file": "art/ing/hummus.webp",
    "kind": "product",
    "product": "Talia Hummus Tahina",
    "source": "https://world.openfoodfacts.org/product/6295513800047",
    "author": "Open Food Facts contributors",
    "licence": "CC BY-SA 3.0",
    "licenceUrl": "https://creativecommons.org/licenses/by-sa/3.0/",
    "uae": true,
    "what": "Hummus: chickpea and tahini dip, sold in tubs in the dairy fridge.",
    "find": "hummus",
    "ar": "حمص: غموس الحمص بالطحينة، يُباع في علب في ثلاجة الألبان."
  },
  {
    "slug": "parsley",
    "items": [
      "parsley"
    ],
    "file": "art/ing/parsley.webp",
    "kind": "fresh",
    "product": null,
    "source": "https://commons.wikimedia.org/wiki/File:Parsley_Leaves.jpg",
    "author": "Etopalrux",
    "licence": "CC BY-SA 4.0",
    "licenceUrl": "https://creativecommons.org/licenses/by-sa/4.0/",
    "uae": false,
    "what": "Flat-leaf parsley: the bright green herb used in tabbouleh. Not coriander, which smells stronger.",
    "find": "parsley",
    "ar": "بقدونس: العشبة الخضراء الزاهية التي تُستخدم في التبولة. ليست الكزبرة، فرائحتها أقوى."
  },
  {
    "slug": "seven-spice",
    "items": [
      "7-spice"
    ],
    "file": "art/ing/seven-spice.webp",
    "kind": "product",
    "product": "Sadaf Seven Spice Seasoning",
    "source": "https://world.openfoodfacts.org/product/0052851810031",
    "author": "Open Food Facts contributors",
    "licence": "CC BY-SA 3.0",
    "licenceUrl": "https://creativecommons.org/licenses/by-sa/3.0/",
    "uae": false,
    "what": "Seven spices (sabaa baharat): the Lebanese blend of allspice, black pepper, cinnamon, clove, nutmeg, coriander and ginger.",
    "find": "7 spices",
    "ar": "سبع بهارات: الخلطة اللبنانية من البهار الحلو والفلفل الأسود والقرفة والقرنفل وجوزة الطيب والكزبرة والزنجبيل."
  },
  {
    "slug": "tuna-in-water",
    "items": [
      "tuna in water"
    ],
    "file": "art/ing/tuna-in-water.webp",
    "kind": "product",
    "product": "John West Light Meat Tuna Solid in Water",
    "source": "https://world.openfoodfacts.org/product/5000171054128",
    "author": "Open Food Facts contributors",
    "licence": "CC BY-SA 3.0",
    "licenceUrl": "https://creativecommons.org/licenses/by-sa/3.0/",
    "uae": true,
    "what": "Tuna in water: canned tuna packed in water or brine, not oil.",
    "find": "tuna in water",
    "ar": "تونة بالماء: تونة معلّبة في الماء أو الماء المملّح، لا في الزيت."
  },
  {
    "slug": "cannellini-beans",
    "items": [
      "cannellini beans"
    ],
    "file": "art/ing/cannellini-beans.webp",
    "kind": "product",
    "product": "Del Monte White Beans",
    "source": "https://world.openfoodfacts.org/product/0024000130116",
    "author": "Open Food Facts contributors",
    "licence": "CC BY-SA 3.0",
    "licenceUrl": "https://creativecommons.org/licenses/by-sa/3.0/",
    "uae": true,
    "what": "Cannellini beans: canned white kidney beans; rinse before use.",
    "find": "white beans",
    "ar": "فاصوليا بيضاء (كانيليني): فاصوليا بيضاء معلّبة، تُشطف قبل الاستخدام."
  },
  {
    "slug": "red-onion",
    "items": [
      "red onion"
    ],
    "file": "art/ing/red-onion.webp",
    "kind": "fresh",
    "product": null,
    "source": "https://commons.wikimedia.org/wiki/File:Red_Onion_on_White.JPG",
    "author": "Colin",
    "licence": "CC BY-SA 3.0",
    "licenceUrl": "https://creativecommons.org/licenses/by-sa/3.0/",
    "uae": false,
    "what": "Red onion: the purple onion, milder and sweeter, good raw in salads.",
    "find": "red onion",
    "ar": "بصل أحمر: البصل البنفسجي، أخفّ وأحلى، ويؤكل نيئًا في السلطات."
  },
  {
    "slug": "potato",
    "items": [
      "potato"
    ],
    "file": "art/ing/potato.webp",
    "kind": "fresh",
    "product": null,
    "source": "https://commons.wikimedia.org/wiki/File:Potatoes_2.jpg",
    "author": "Tiia Monto",
    "licence": "CC BY-SA 3.0",
    "licenceUrl": "https://creativecommons.org/licenses/by-sa/3.0/",
    "uae": false,
    "what": "Potatoes: ordinary white potatoes for roasting.",
    "find": "potato",
    "ar": "بطاطس: بطاطس بيضاء عادية للشوي في الفرن."
  },
  {
    "slug": "green-beans",
    "items": [
      "green beans"
    ],
    "file": "art/ing/green-beans.webp",
    "kind": "fresh",
    "product": null,
    "source": "https://commons.wikimedia.org/wiki/File:38_-_CIMG1598.JPG",
    "author": "Susan Slater",
    "licence": "CC BY-SA 4.0",
    "licenceUrl": "https://creativecommons.org/licenses/by-sa/4.0/",
    "uae": false,
    "what": "Green beans: thin fresh green beans (fasolia).",
    "find": "green beans",
    "ar": "فاصوليا خضراء: فاصوليا خضراء طازجة رفيعة."
  },
  {
    "slug": "salmon",
    "items": [
      "salmon"
    ],
    "file": "art/ing/salmon.webp",
    "kind": "fresh",
    "product": null,
    "source": "https://commons.wikimedia.org/wiki/File:Salmon2.jpg",
    "author": "Tiia Monto",
    "licence": "CC BY-SA 3.0",
    "licenceUrl": "https://creativecommons.org/licenses/by-sa/3.0/",
    "uae": false,
    "what": "Salmon fillet: a raw portion of salmon, skin on.",
    "find": "salmon fillet",
    "ar": "فيليه سلمون: قطعة سلمون نيئة بجلدها."
  },
  {
    "slug": "freekeh",
    "items": [
      "freekeh"
    ],
    "file": "art/ing/freekeh.webp",
    "kind": "product",
    "product": null,
    "source": "https://commons.wikimedia.org/wiki/File:Raw_Freek.jpg",
    "author": "Reem Al-Kashif",
    "licence": "CC BY-SA 4.0",
    "licenceUrl": "https://creativecommons.org/licenses/by-sa/4.0/",
    "uae": false,
    "what": "Freekeh: young green wheat, roasted and cracked. Smoky and nutty, cooked like rice.",
    "find": "freekeh",
    "ar": "فريكة: قمح أخضر صغير يُحمَّص ويُجرش. نكهتها مدخّنة وجوزية، وتُطبخ مثل الأرز."
  },
  {
    "slug": "courgette",
    "items": [
      "courgette"
    ],
    "file": "art/ing/courgette.webp",
    "kind": "fresh",
    "product": null,
    "source": "https://commons.wikimedia.org/wiki/File:Five_Zucchini_(30066254678).jpg",
    "author": "Willis Lam",
    "licence": "CC BY-SA 2.0",
    "licenceUrl": "https://creativecommons.org/licenses/by-sa/2.0/",
    "uae": false,
    "what": "Courgette (zucchini, kousa): the long green summer squash.",
    "find": "zucchini",
    "ar": "كوسا: القرع الأخضر الطويل."
  },
  {
    "slug": "chicken-breast",
    "items": [
      "chicken breast"
    ],
    "file": "art/ing/chicken-breast.webp",
    "kind": "fresh",
    "product": null,
    "source": "https://commons.wikimedia.org/wiki/File:Pechugas_de_pollo.jpg",
    "author": "Juan Emilio Prades Bel",
    "licence": "CC BY 4.0",
    "licenceUrl": "https://creativecommons.org/licenses/by/4.0/",
    "uae": false,
    "what": "Chicken breast: boneless, skinless breast fillet.",
    "find": "chicken breast",
    "ar": "صدر دجاج: شرائح صدر منزوعة العظم والجلد."
  },
  {
    "slug": "loomi",
    "items": [
      "loomi"
    ],
    "file": "art/ing/loomi.webp",
    "kind": "product",
    "product": null,
    "source": "https://commons.wikimedia.org/wiki/File:%D7%9C%D7%99%D7%9E%D7%95%D7%9F_%D7%A4%D7%A8%D7%A1%D7%99.JPG",
    "author": "אריאל פלמון Ariel Palmon",
    "licence": "CC BY 3.0",
    "licenceUrl": "https://creativecommons.org/licenses/by/3.0/",
    "uae": false,
    "what": "Loomi: whole dried black lime. Pierce it and drop it in the pot for a sour, smoky flavour; take it out before serving.",
    "find": "dried black lemon",
    "ar": "لومي: ليمون أسود مجفّف كامل. يُثقب ويوضع في القدر لنكهة حامضة مدخّنة، ويُخرج قبل التقديم."
  },
  {
    "slug": "ghee",
    "items": [
      "ghee"
    ],
    "file": "art/ing/ghee.webp",
    "kind": "product",
    "product": "QBB Pure Ghee",
    "source": "https://world.openfoodfacts.org/product/5060208990188",
    "author": "Open Food Facts contributors",
    "licence": "CC BY-SA 3.0",
    "licenceUrl": "https://creativecommons.org/licenses/by-sa/3.0/",
    "uae": true,
    "what": "Ghee: clarified butter, sold in jars or tins.",
    "find": "ghee",
    "ar": "سمن: زبدة مصفّاة، يُباع في برطمانات أو علب معدنية."
  },
  {
    "slug": "prawns",
    "items": [
      "prawns"
    ],
    "file": "art/ing/prawns.webp",
    "kind": "fresh",
    "product": null,
    "source": "https://commons.wikimedia.org/wiki/File:Raw_Shrimp.jpg",
    "author": "Perplexing",
    "licence": "CC BY 3.0",
    "licenceUrl": "https://creativecommons.org/licenses/by/3.0/",
    "uae": false,
    "what": "Prawns (shrimp, rubyan): raw, peeled and deveined, fresh or frozen.",
    "find": "raw prawns",
    "ar": "روبيان: نيء ومقشّر ومنظّف، طازج أو مجمّد."
  },
  {
    "slug": "bulgur",
    "items": [
      "bulgur"
    ],
    "file": "art/ing/bulgur.webp",
    "kind": "product",
    "product": null,
    "source": "https://commons.wikimedia.org/wiki/File:BULGHUR_WHEAT_-_HEALTHY_EATING_-_WELLBEING_-_FREE_FOR_COMMERCIAL_USE_-_FFCU_-FREEFCU_(27457312691).jpg",
    "author": "Free for Commercial Use",
    "licence": "CC BY-SA 2.0",
    "licenceUrl": "https://creativecommons.org/licenses/by-sa/2.0/",
    "uae": false,
    "what": "Bulgur (burghul): cracked, parboiled wheat. Coarse bulgur is the one for cooking like rice.",
    "find": "bulgur",
    "ar": "برغل: قمح مسلوق ومجروش. البرغل الخشن هو الذي يُطبخ مثل الأرز."
  },
  {
    "slug": "chilli",
    "items": [
      "chilli"
    ],
    "file": "art/ing/chilli.webp",
    "kind": "fresh",
    "product": null,
    "source": "https://commons.wikimedia.org/wiki/File:Chili_3.jpg",
    "author": "GTSPACE",
    "licence": "CC BY-SA 4.0",
    "licenceUrl": "https://creativecommons.org/licenses/by-sa/4.0/",
    "uae": false,
    "what": "Fresh green chilli: a small hot pepper. Not the large sweet bell pepper.",
    "find": "green chilli",
    "ar": "فلفل أخضر حار: فلفل صغير حار. ليس الفلفل الرومي الكبير الحلو."
  },
  {
    "slug": "coriander",
    "items": [
      "coriander"
    ],
    "file": "art/ing/coriander.webp",
    "kind": "fresh",
    "product": null,
    "source": "https://commons.wikimedia.org/wiki/File:Coriander_Leaves.jpg",
    "author": "Rupeshm364",
    "licence": "CC BY-SA 4.0",
    "licenceUrl": "https://creativecommons.org/licenses/by-sa/4.0/",
    "uae": false,
    "what": "Fresh coriander (cilantro, kuzbara): the leafy herb with a strong fresh smell. Not parsley.",
    "find": "coriander",
    "ar": "كزبرة خضراء: العشبة الورقية ذات الرائحة القوية المنعشة. ليست البقدونس."
  },
  {
    "slug": "sirloin",
    "items": [
      "sirloin"
    ],
    "file": "art/ing/sirloin.webp",
    "kind": "fresh",
    "product": null,
    "source": "https://commons.wikimedia.org/wiki/File:-2020-11-20_Sirloin_steak,_Trimingham,_Norfolk_(2).JPG",
    "author": "Kolforn",
    "licence": "CC BY-SA 4.0",
    "licenceUrl": "https://creativecommons.org/licenses/by-sa/4.0/",
    "uae": false,
    "what": "Sirloin steak: a lean beef steak; trim the fat strip before cooking.",
    "find": "sirloin steak",
    "ar": "ستيك سيرلوين: شريحة لحم بقري قليلة الدهن، تُزال حافة الدهن قبل الطبخ."
  },
  {
    "slug": "sweet-potato",
    "items": [
      "sweet potato"
    ],
    "file": "art/ing/sweet-potato.webp",
    "kind": "fresh",
    "product": null,
    "source": "https://commons.wikimedia.org/wiki/File:Ipomoea_batatas_006.JPG",
    "author": "Llez",
    "licence": "CC BY-SA 3.0",
    "licenceUrl": "https://creativecommons.org/licenses/by-sa/3.0/",
    "uae": false,
    "what": "Sweet potato: the orange-fleshed kind with reddish skin.",
    "find": "sweet potato",
    "ar": "بطاطا حلوة: النوع ذو اللب البرتقالي والقشرة المحمرّة."
  },
  {
    "slug": "cottage-cheese",
    "items": [
      "cottage cheese"
    ],
    "file": "art/ing/cottage-cheese.webp",
    "kind": "product",
    "product": "Président Cottage Cheese",
    "source": "https://world.openfoodfacts.org/product/4820096018835",
    "author": "Open Food Facts contributors",
    "licence": "CC BY-SA 3.0",
    "licenceUrl": "https://creativecommons.org/licenses/by-sa/3.0/",
    "uae": true,
    "what": "Cottage cheese: soft, lumpy fresh cheese, high in protein, sold in tubs.",
    "find": "cottage cheese",
    "ar": "جبن قريش (كوتيج): جبن طري طازج متكتّل، غني بالبروتين، يُباع في علب."
  },
  {
    "slug": "dates",
    "items": [
      "dates"
    ],
    "file": "art/ing/dates.webp",
    "kind": "product",
    "product": "Al Fakhra Khidri Dates",
    "source": "https://world.openfoodfacts.org/product/6291108632390",
    "author": "Open Food Facts contributors",
    "licence": "CC BY-SA 3.0",
    "licenceUrl": "https://creativecommons.org/licenses/by-sa/3.0/",
    "uae": true,
    "what": "Dates: soft dried dates, any variety (Khalas, Sukkari, Medjool).",
    "find": "dates",
    "ar": "تمر: تمر طري من أي صنف (خلاص، سكري، مجدول)."
  },
  {
    "slug": "cinnamon",
    "items": [
      "cinnamon"
    ],
    "file": "art/ing/cinnamon.webp",
    "kind": "product",
    "product": null,
    "source": "https://commons.wikimedia.org/wiki/File:Ground_Cinnamon_Powder_and_a_Cinnamon_Stick.jpg",
    "author": "formulatehealth",
    "licence": "CC BY 2.0",
    "licenceUrl": "https://creativecommons.org/licenses/by/2.0/",
    "uae": false,
    "what": "Ground cinnamon: the sweet brown spice powder.",
    "find": "cinnamon powder",
    "ar": "قرفة مطحونة: البهار البني الحلو."
  },
  {
    "slug": "nxt-beef-protein",
    "items": [
      "NXT beef protein isolate"
    ],
    "file": "art/ing/nxt-beef-protein.webp",
    "kind": "product",
    "product": "NXT Nutrition Beef Protein Isolate",
    "source": "https://world.openfoodfacts.org/product/7427135378959",
    "author": "Open Food Facts contributors",
    "licence": "CC BY-SA 3.0",
    "licenceUrl": "https://creativecommons.org/licenses/by-sa/3.0/",
    "uae": false,
    "what": "NXT beef protein isolate: a protein powder made from beef instead of milk, by NXT Nutrition.",
    "find": "NXT beef protein",
    "ar": "بروتين اللحم البقري المعزول: مسحوق بروتين مصنوع من اللحم البقري بدل الحليب، من NXT Nutrition."
  },
  {
    "slug": "zaatar",
    "items": [
      "za'atar"
    ],
    "file": "art/ing/zaatar.webp",
    "kind": "product",
    "product": "Nature's Choice Zatar Powder",
    "source": "https://world.openfoodfacts.org/product/6294004544361",
    "author": "Open Food Facts contributors",
    "licence": "CC BY-SA 3.0",
    "licenceUrl": "https://creativecommons.org/licenses/by-sa/3.0/",
    "uae": true,
    "what": "Za'atar: the green-brown mix of dried thyme, sumac and sesame seeds.",
    "find": "zaatar",
    "ar": "زعتر: خلطة الزعتر المجفّف والسماق والسمسم."
  },
  {
    "slug": "smoked-turkey-breast",
    "items": [
      "smoked turkey breast"
    ],
    "file": "art/ing/smoked-turkey-breast.webp",
    "kind": "product",
    "product": "Al Rawdah Smoked Turkey Breast",
    "source": "https://world.openfoodfacts.org/product/6291038222029",
    "author": "Open Food Facts contributors",
    "licence": "CC BY-SA 3.0",
    "licenceUrl": "https://creativecommons.org/licenses/by-sa/3.0/",
    "uae": true,
    "what": "Smoked turkey breast: thin cold-cut slices from the deli fridge.",
    "find": "smoked turkey breast",
    "ar": "صدر ديك رومي مدخّن: شرائح باردة رقيقة من ثلاجة اللحوم الباردة."
  },
  {
    "slug": "light-cream-cheese",
    "items": [
      "light cream cheese"
    ],
    "file": "art/ing/light-cream-cheese.webp",
    "kind": "product",
    "product": "Milba Cream Cheese Light",
    "source": "https://world.openfoodfacts.org/product/6299200049351",
    "author": "Open Food Facts contributors",
    "licence": "CC BY-SA 3.0",
    "licenceUrl": "https://creativecommons.org/licenses/by-sa/3.0/",
    "uae": true,
    "what": "Light cream cheese: a reduced-fat spreadable cream cheese.",
    "find": "light cream cheese",
    "ar": "جبن كريمي خفيف: جبن كريمي قليل الدسم قابل للدهن."
  },
  {
    "slug": "cucumber",
    "items": [
      "cucumber"
    ],
    "file": "art/ing/cucumber.webp",
    "kind": "fresh",
    "product": null,
    "source": "https://commons.wikimedia.org/wiki/File:Ryerson_Market_cucumbers_on_sale.jpg",
    "author": "Jason Zhang",
    "licence": "CC BY-SA 3.0",
    "licenceUrl": "https://creativecommons.org/licenses/by-sa/3.0/",
    "uae": false,
    "what": "Cucumber: the small local cucumbers, cut into sticks.",
    "find": "cucumber",
    "ar": "خيار: الخيار المحلي الصغير، يُقطّع أصابع."
  },
  {
    "slug": "sumac",
    "items": [
      "sumac"
    ],
    "file": "art/ing/sumac.webp",
    "kind": "product",
    "product": null,
    "source": "https://commons.wikimedia.org/wiki/File:Sumach_Gew%C3%BCrz.jpg",
    "author": "Copyflow",
    "licence": "CC BY-SA 4.0",
    "licenceUrl": "https://creativecommons.org/licenses/by-sa/4.0/",
    "uae": false,
    "what": "Sumac: a deep red, lemony spice powder sprinkled over eggs and salads.",
    "find": "sumac",
    "ar": "سماق: بهار أحمر داكن بطعم الليمون، يُرشّ على البيض والسلطات."
  }
];
