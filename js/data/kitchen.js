// The kitchen version of every meal: exact amounts and complete steps, in Indonesian
// for the cooks and in English (the same text, line for line) for Rashed to check.
// Built from MEALS and MEAL_NOTES in meals.js and PRE_GYM in program.js, so the
// protein and calories still match the app.
//
// KITCHEN[id]: name { en, id }, serves, time (minutes, start to plate), optional wait
// { en, id } for passive time such as overnight marinating, ing, steps, optional notes.
// ing: item = the exact meals.js item string (extra: true marks the only additions:
// water for grains, salt, black pepper and sumac); q = amount, null means "to taste";
// u = 'g' | 'ml' | '' (a count, which can be 0.5 for a half). en and id never repeat q.
// Cooked grains are given as dry weights plus water. Indonesian uses a decimal comma.
//
// KITCHEN_BATCH[id]: the batch cook for each meal that has a batch in meals.js.
// KITCHEN_UI: labels for the recipe card and the WhatsApp text, {n} placeholders.
// KITCHEN_CHECKS: every assumption Rashed should confirm.

const SALT = { item: 'salt', q: null, u: '', extra: true, en: "Salt", id: "Garam" };
const PEPPER = { item: 'black pepper', q: null, u: '', extra: true, en: "Black pepper, ground", id: "Lada hitam bubuk" };

export const KITCHEN = {
  // Breakfast
  'greek-yogurt-power-bowl': {
    name: { en: "Greek yogurt power bowl", id: "Mangkuk Greek yogurt dengan oat dan buah beri" },
    serves: 1,
    time: 5,
    ing: [
      { item: 'Greek yogurt', q: 250, u: 'g', en: "Greek yogurt, plain, 2 % fat", id: "Greek yogurt (yogurt kental), tawar, lemak 2 %" },
      { item: 'oats', q: 40, u: 'g', en: "Rolled oats", id: "Oat (havermut), jenis rolled oats" },
      { item: 'berries', q: 100, u: 'g', en: "Mixed berries, fresh or frozen", id: "Buah beri campur (stroberi, blueberry, raspberry), segar atau beku" },
      { item: 'honey', q: 15, u: 'g', en: "Honey", id: "Madu" },
      { item: 'flaked almonds', q: 10, u: 'g', en: "Flaked almonds", id: "Almond iris (almond flakes)" }
    ],
    steps: [
      { en: "Put a bowl on the scale, set it to zero and weigh in 250 g of Greek yogurt.", id: "Taruh mangkuk di atas timbangan, nolkan, lalu timbang 250 g Greek yogurt ke dalamnya." },
      { en: "Set the scale to zero again, add 40 g of oats and stir them in.", id: "Nolkan lagi timbangan, tambahkan 40 g oat, lalu aduk rata." },
      { en: "Set the scale to zero and add 100 g of berries on top. Frozen berries can go in straight from the freezer.", id: "Nolkan timbangan, lalu taruh 100 g buah beri di atasnya. Buah beri beku boleh langsung dimasukkan dari freezer." },
      { en: "Set the scale to zero and drizzle 15 g of honey over the top.", id: "Nolkan timbangan, lalu tuang 15 g madu di atasnya." },
      { en: "Set the scale to zero and sprinkle 10 g of flaked almonds over the top.", id: "Nolkan timbangan, lalu taburkan 10 g almond iris di atasnya." },
      { en: "Serve straight away. No cooking is needed.", id: "Langsung sajikan. Tidak perlu dimasak." }
    ],
    notes: [
      { en: "Use plain Greek yogurt, not a sweetened or flavoured one.", id: "Pakai Greek yogurt tawar (plain), bukan yang manis atau berperasa." },
      { en: "For a softer bowl, mix the yogurt and oats the night before (see Batch for the week).", id: "Kalau mau lebih lembut, campur yogurt dan oat malam sebelumnya (lihat Masak untuk seminggu)." }
    ]
  },

  'eggs-labneh-toast': {
    name: { en: "Eggs & labneh toast", id: "Roti panggang telur dan labneh" },
    serves: 1,
    time: 10,
    ing: [
      { item: 'eggs', q: 3, u: '', en: "Eggs (about 50 g each)", id: "Telur (sekitar 50 g per butir)" },
      { item: 'labneh', q: 50, u: 'g', en: "Labneh, full-fat", id: "Labneh (yogurt kental khas Arab), lemak penuh" },
      { item: 'sourdough', q: 60, u: 'g', en: "Sourdough bread, usually 1 to 2 slices: weigh it", id: "Roti sourdough (roti asam), biasanya 1 sampai 2 iris: timbang dulu" },
      { item: 'avocado', q: 50, u: 'g', en: "Avocado, peeled and stoned (about ⅓ of one)", id: "Alpukat, sudah dikupas dan dibuang bijinya (sekitar ⅓ buah)" },
      { item: 'chilli flakes', q: 1, u: 'g', en: "Chilli flakes (about ½ teaspoon)", id: "Cabai kering bubuk kasar / chilli flakes (sekitar ½ sendok teh)" },
      { item: 'olive oil', q: 5, u: 'g', en: "Olive oil, for drizzling on top", id: "Minyak zaitun, untuk disiram di atas" },
      { item: 'sumac', q: 1, u: 'g', extra: true, en: "Sumac (a big pinch, about ⅓ teaspoon)", id: "Sumac (bubuk rempah merah asam), sejumput besar, sekitar ⅓ sendok teh" },
      SALT,
      PEPPER
    ],
    steps: [
      { en: "Crack 3 eggs into a bowl, add a pinch of salt and beat with a fork until smooth.", id: "Pecahkan 3 telur ke dalam mangkuk, beri sejumput garam, lalu kocok dengan garpu sampai rata." },
      { en: "Weigh 60 g of sourdough and toast it in a toaster or a dry pan until golden and crisp, 2 to 3 minutes.", id: "Timbang 60 g roti sourdough, lalu panggang di toaster atau wajan kering tanpa minyak sampai kecokelatan dan renyah, 2 sampai 3 menit." },
      { en: "Spread 50 g of labneh over the toast.", id: "Oleskan 50 g labneh di atas roti panggang." },
      { en: "Slice 50 g of avocado thinly.", id: "Iris tipis 50 g alpukat." },
      { en: "Heat a non-stick pan on low heat. Do not add oil.", id: "Panaskan wajan anti lengket dengan api kecil. Jangan pakai minyak." },
      { en: "Pour in the eggs and stir slowly with a spatula for 2 to 3 minutes, until just set but still soft and creamy.", id: "Tuang telur, lalu aduk pelan-pelan dengan spatula selama 2 sampai 3 menit, sampai telur baru matang tapi masih lembut." },
      { en: "Take the pan off the heat while the eggs still look slightly wet: they keep cooking.", id: "Angkat wajan dari api selagi telur masih terlihat sedikit basah, karena telur akan terus matang sendiri." },
      { en: "Spoon the eggs onto the toast and lay the avocado on top.", id: "Taruh telur di atas roti, lalu susun irisan alpukat di atasnya." },
      { en: "Sprinkle with 1 g of chilli flakes, a big pinch of sumac and a little black pepper.", id: "Taburi 1 g chilli flakes, sejumput besar sumac, dan sedikit lada hitam." },
      { en: "Put the plate on the scale, set it to zero and drizzle 5 g of olive oil over the top.", id: "Taruh piring di atas timbangan, nolkan, lalu siram 5 g minyak zaitun di atasnya." },
      { en: "Serve straight away.", id: "Langsung sajikan." }
    ],
    notes: [
      { en: "The eggs cook in a dry non-stick pan so that the 5 g of olive oil can go on top. Do not add butter or oil to the pan.", id: "Telur dimasak di wajan anti lengket tanpa minyak supaya 5 g minyak zaitun bisa disiram di atas. Jangan tambah mentega atau minyak ke wajan." }
    ]
  },

  'chicken-sausage-shakshuka': {
    name: { en: "Chicken sausage shakshuka", id: "Shakshuka sosis ayam (telur dalam saus tomat)" },
    serves: 1,
    time: 30,
    ing: [
      { item: 'eggs', q: 3, u: '', en: "Eggs (about 50 g each)", id: "Telur (sekitar 50 g per butir)" },
      { item: 'chicken sausage', q: 100, u: 'g', en: "Chicken sausages", id: "Sosis ayam" },
      { item: 'tomato', q: 200, u: 'g', en: "Tomatoes, chopped (fresh, or tinned chopped tomatoes)", id: "Tomat, potong dadu (tomat segar, atau tomat cincang kalengan)" },
      { item: 'onion', q: 0.5, u: '', en: "Onion (about 55 g)", id: "Bawang bombay (sekitar 55 g)" },
      { item: 'pepper', q: 1, u: '', en: "Pepper (capsicum, about 120 g)", id: "Paprika, sayur, bukan bubuk (sekitar 120 g)" },
      { item: 'olive oil', q: 10, u: 'g', en: "Olive oil", id: "Minyak zaitun" },
      { item: 'cumin', q: 1, u: 'g', en: "Ground cumin (about ½ teaspoon)", id: "Jinten bubuk (sekitar ½ sendok teh)" },
      { item: 'paprika', q: 2, u: 'g', en: "Ground paprika (about 1 teaspoon)", id: "Bubuk paprika (sekitar 1 sendok teh)" },
      SALT,
      PEPPER
    ],
    steps: [
      { en: "Chop the onion finely.", id: "Cincang halus bawang bombay." },
      { en: "Cut the pepper in half, take out the seeds and slice it into thin strips.", id: "Belah paprika, buang bijinya, lalu iris memanjang tipis-tipis." },
      { en: "Slice 100 g of chicken sausages into rounds about 1 cm thick.", id: "Potong 100 g sosis ayam bulat-bulat setebal sekitar 1 cm." },
      { en: "Put a non-stick frying pan with a lid (about 24 cm) on the scale, set it to zero and weigh in 10 g of olive oil.", id: "Taruh wajan anti lengket yang ada tutupnya (sekitar 24 cm) di atas timbangan, nolkan, lalu timbang 10 g minyak zaitun ke dalamnya." },
      { en: "Heat the oil on medium heat, add the sausage and fry for 4 to 5 minutes, turning, until browned on all sides.", id: "Panaskan minyak dengan api sedang, masukkan sosis, lalu goreng 4 sampai 5 menit sambil dibalik-balik sampai kecokelatan di semua sisi." },
      { en: "Add the onion and pepper and cook for 5 minutes, stirring, until soft.", id: "Masukkan bawang bombay dan paprika, lalu tumis 5 menit sambil diaduk sampai layu." },
      { en: "Add 1 g of cumin and 2 g of paprika and stir for 30 seconds, until fragrant.", id: "Masukkan 1 g jinten bubuk dan 2 g bubuk paprika, aduk 30 detik sampai harum." },
      { en: "Add 200 g of chopped tomato and a pinch of salt and stir.", id: "Masukkan 200 g tomat dan sejumput garam, lalu aduk." },
      { en: "Simmer without the lid on low to medium heat for 10 minutes, stirring now and then, until the sauce is thick.", id: "Masak tanpa tutup dengan api kecil sampai sedang selama 10 menit, sesekali diaduk, sampai sausnya kental." },
      { en: "Make 3 hollows in the sauce with a spoon and crack 1 egg into each one.", id: "Buat 3 lubang di saus dengan sendok, lalu pecahkan 1 telur ke setiap lubang." },
      { en: "Put the lid on and cook on low heat for 5 minutes, until the egg whites are white all through and set, and the yolks are still soft.", id: "Tutup wajan dan masak dengan api kecil selama 5 menit, sampai putih telur sudah putih semua dan padat, tapi kuningnya masih lembut." },
      { en: "Sprinkle with black pepper and serve in the pan.", id: "Taburi lada hitam, lalu sajikan langsung di wajannya." }
    ],
    notes: [
      { en: "For firm yolks, cook 2 to 3 minutes longer with the lid on.", id: "Kalau mau kuning telur matang penuh, masak 2 sampai 3 menit lagi dengan wajan tertutup." },
      { en: "If the sausages were bought raw, cut one open before serving: there must be no pink inside.", id: "Kalau sosisnya dibeli mentah, belah satu sosis sebelum disajikan: bagian dalamnya tidak boleh ada warna merah muda." },
      { en: "Use only the 10 g of oil, even if the pan looks dry.", id: "Pakai hanya 10 g minyak, walaupun wajan terlihat kering." }
    ]
  },

  'protein-oats': {
    name: { en: "Protein oats", id: "Bubur oat protein" },
    serves: 1,
    time: 10,
    ing: [
      { item: 'oats', q: 60, u: 'g', en: "Rolled oats", id: "Oat (havermut), jenis rolled oats" },
      { item: 'semi-skimmed milk', q: 250, u: 'ml', en: "Semi-skimmed milk (about 1.5 % fat)", id: "Susu rendah lemak / semi-skim (sekitar 1,5 % lemak)" },
      { item: 'protein powder', q: 30, u: 'g', en: "Whey protein powder, unflavoured or vanilla (about 1 scoop)", id: "Bubuk protein whey (protein susu), rasa original atau vanila (sekitar 1 sendok takar)" },
      { item: 'peanut butter', q: 15, u: 'g', en: "Peanut butter", id: "Selai kacang" },
      { item: 'banana', q: 0.5, u: '', en: "Banana (about 60 g peeled)", id: "Pisang (sekitar 60 g setelah dikupas)" }
    ],
    steps: [
      { en: "Put a small saucepan on the scale, set it to zero and weigh in 60 g of oats.", id: "Taruh panci kecil di atas timbangan, nolkan, lalu timbang 60 g oat ke dalamnya." },
      { en: "Add 250 ml of milk (258 g on the scale).", id: "Tambahkan 250 ml susu (258 g di timbangan)." },
      { en: "Heat on medium heat until it just starts to bubble.", id: "Panaskan dengan api sedang sampai mulai sedikit mendidih." },
      { en: "Turn to low heat and cook for 4 to 5 minutes, stirring often, until thick and creamy. Do not let it boil over.", id: "Kecilkan api dan masak 4 sampai 5 menit sambil sering diaduk, sampai kental dan lembut. Jangan sampai meluap." },
      { en: "Take the pan off the heat and wait 1 minute.", id: "Angkat panci dari api dan tunggu 1 menit." },
      { en: "Add 30 g of protein powder and stir well until smooth, with no lumps.", id: "Masukkan 30 g bubuk protein, lalu aduk rata sampai halus dan tidak menggumpal." },
      { en: "Pour into a bowl.", id: "Tuang ke mangkuk." },
      { en: "Put the bowl on the scale, set it to zero and add 15 g of peanut butter on top.", id: "Taruh mangkuk di atas timbangan, nolkan, lalu tambahkan 15 g selai kacang di atasnya." },
      { en: "Slice ½ banana (about 60 g), lay it on top and serve.", id: "Iris ½ buah pisang (sekitar 60 g), taruh di atasnya, lalu sajikan." }
    ],
    notes: [
      { en: "Never cook the protein powder: add it only after the pan is off the heat, or it goes rubbery.", id: "Jangan pernah memasak bubuk protein di atas api: masukkan hanya setelah panci diangkat, kalau tidak teksturnya jadi kenyal seperti karet." },
      { en: "Use only the unflavoured or vanilla whey. Never use the clear, juice-style protein (NXT beef protein isolate) here: it curdles milk.", id: "Pakai hanya whey rasa original atau vanila. Jangan pernah pakai protein bening rasa jus (NXT Beef Protein Isolate) di resep ini: susunya akan pecah dan menggumpal." },
      { en: "This is the highest-calorie breakfast. Make it on gym days: Monday, Wednesday and Friday.", id: "Ini sarapan dengan kalori paling tinggi. Buat pada hari gym: Senin, Rabu, dan Jumat." }
    ]
  },

  // Lunch
  'chicken-shawarma-bowl': {
    name: { en: "Chicken shawarma bowl", id: "Mangkuk shawarma ayam" },
    serves: 1,
    time: 30,
    wait: { en: "Plus overnight marinating", id: "Ditambah marinasi semalaman" },
    ing: [
      { item: 'chicken thigh', q: 180, u: 'g', en: "Chicken thigh, boneless and skinless, raw", id: "Paha ayam tanpa tulang dan tanpa kulit, mentah" },
      { item: 'rice', q: 50, u: 'g', en: "White rice, basmati or other long-grain, dry (makes about 150 g cooked)", id: "Beras putih, basmati atau beras panjang lain, mentah (jadi sekitar 150 g nasi)" },
      { item: 'salad', q: 100, u: 'g', en: "Salad: lettuce, cucumber and tomato, chopped, no dressing", id: "Salad sayur: selada, timun, dan tomat, dipotong-potong, tanpa saus" },
      { item: 'garlic sauce', q: 30, u: 'g', en: "Garlic sauce (toum), shop-bought", id: "Saus bawang putih khas Arab (toum / garlic sauce), beli jadi" },
      { item: 'yogurt', q: 50, u: 'g', en: "Plain yogurt, for the marinade", id: "Yogurt tawar (plain), untuk bumbu marinasi" },
      { item: 'garlic', q: 2, u: '', en: "Garlic cloves (about 10 g), crushed, for the marinade", id: "Siung bawang putih (sekitar 10 g), dihaluskan, untuk bumbu marinasi" },
      { item: 'lemon', q: 0.5, u: '', en: "Lemon, juice only (about 15 ml), for the marinade", id: "Buah lemon, ambil airnya saja (sekitar 15 ml), untuk bumbu marinasi" },
      { item: 'baharat', q: 2, u: 'g', en: "Baharat (about 1 teaspoon), for the marinade", id: "Baharat (campuran rempah Arab), sekitar 1 sendok teh, untuk bumbu marinasi" },
      { item: 'water', q: 120, u: 'ml', extra: true, en: "Water, for the rice", id: "Air, untuk memasak nasi" },
      SALT
    ],
    steps: [
      { en: "The day before: in a bowl, mix 50 g of yogurt, the crushed garlic, the lemon juice, 2 g of baharat and a pinch of salt.", id: "Sehari sebelumnya: di dalam mangkuk, campur 50 g yogurt, bawang putih yang sudah dihaluskan, air lemon, 2 g baharat, dan sejumput garam." },
      { en: "Add 180 g of chicken thigh and turn it until it is fully coated.", id: "Masukkan 180 g paha ayam, lalu bolak-balik sampai seluruhnya terlumuri bumbu." },
      { en: "Cover the bowl and keep it in the fridge overnight, 8 to 24 hours.", id: "Tutup mangkuk dan simpan di kulkas semalaman, 8 sampai 24 jam." },
      { en: "On the day: rinse 50 g of rice in cold water until the water runs clear, then drain it.", id: "Pada hari memasak: cuci 50 g beras dengan air dingin sampai airnya bening, lalu tiriskan." },
      { en: "Put the rice in a small pot with 120 ml of water and a pinch of salt and bring it to the boil on high heat.", id: "Masukkan beras ke panci kecil bersama 120 ml air dan sejumput garam, lalu didihkan dengan api besar." },
      { en: "Put the lid on, turn to the lowest heat and cook for 12 minutes.", id: "Tutup panci, kecilkan api sekecil-kecilnya, lalu masak 12 menit." },
      { en: "Turn off the heat and leave the lid on for 5 minutes, then fluff the rice with a fork.", id: "Matikan api dan biarkan panci tetap tertutup 5 menit, lalu urai nasi dengan garpu." },
      { en: "While the rice cooks, heat a grill pan on high heat for 5 minutes, until very hot. No oil is needed.", id: "Sambil menunggu nasi, panaskan wajan panggangan (grill pan) dengan api besar selama 5 menit sampai sangat panas. Tidak perlu minyak." },
      { en: "Lift the chicken out of the marinade and let the extra drip off. Throw away the leftover marinade.", id: "Angkat ayam dari bumbu marinasi dan biarkan sisa bumbunya menetes. Buang sisa bumbu marinasi." },
      { en: "Grill the chicken for 5 to 6 minutes on each side, until it has dark char marks and is cooked through: no pink inside, clear juices, 75 °C in the middle if you have a thermometer.", id: "Panggang ayam 5 sampai 6 menit per sisi, sampai ada bekas bakaran yang gelap dan matang sampai dalam: tidak ada warna merah muda di dalam, airnya bening, dan 75 °C di bagian tengah kalau ada termometer." },
      { en: "Rest the chicken for 3 minutes, then slice it into strips.", id: "Diamkan ayam 3 menit, lalu iris memanjang." },
      { en: "Put a bowl on the scale and add all of the cooked rice (about 150 g) and 100 g of salad.", id: "Taruh mangkuk di atas timbangan, lalu masukkan semua nasi yang sudah matang (sekitar 150 g) dan 100 g salad." },
      { en: "Lay the sliced chicken on top.", id: "Susun irisan ayam di atasnya." },
      { en: "Set the scale to zero and add 30 g of garlic sauce.", id: "Nolkan timbangan, lalu tambahkan 30 g saus bawang putih." }
    ],
    notes: [
      { en: "Weigh the garlic sauce every time: 30 g is about 135 kcal, and it is the easiest place for calories to creep in.", id: "Selalu timbang saus bawang putih: 30 g sudah sekitar 135 kkal, dan dari sinilah kalori paling mudah bertambah." },
      { en: "Use all of the rice from 50 g dry. The calories are in the dry rice, so the cooked weight can be a little more or less than 150 g.", id: "Pakai semua nasi dari 50 g beras. Kalorinya ada di beras mentahnya, jadi berat nasi matang boleh sedikit lebih atau kurang dari 150 g." },
      { en: "Raw chicken: wash your hands, the board and the knife with soap after touching it.", id: "Ayam mentah: cuci tangan, talenan, dan pisau dengan sabun setelah menyentuhnya." },
      { en: "To cook the chicken for the whole week, see Batch for the week (700 g of chicken on Sunday).", id: "Untuk memasak ayam untuk seminggu, lihat Masak untuk seminggu (700 g ayam pada hari Minggu)." }
    ]
  },

  'beef-kofta-plate': {
    name: { en: "Beef kofta plate", id: "Kofta daging sapi dengan roti dan salad" },
    serves: 1,
    time: 35,
    ing: [
      { item: 'lean beef mince', q: 200, u: 'g', en: "Lean beef mince, 10 % fat, raw", id: "Daging sapi giling rendah lemak (10 % lemak), mentah" },
      { item: 'flatbread', q: 60, u: 'g', en: "Arabic flatbread (khubz), about 1 small round: weigh it", id: "Roti pipih Arab (khubz / roti pita), sekitar 1 lembar kecil: timbang dulu" },
      { item: 'fattoush salad', q: 150, u: 'g', en: "Fattoush salad, lightly dressed", id: "Salad fattoush (salad sayur Lebanon dengan roti garing), dengan sedikit saus" },
      { item: 'hummus', q: 50, u: 'g', en: "Hummus", id: "Hummus (pasta kacang arab)" },
      { item: 'parsley', q: 10, u: 'g', en: "Flat-leaf parsley", id: "Peterseli (daun parsley)" },
      { item: 'onion', q: 40, u: 'g', en: "Onion", id: "Bawang bombay" },
      { item: '7-spice', q: 2, u: 'g', en: "7-spice (about 1 teaspoon)", id: "7-spice (bumbu tujuh rempah Lebanon), sekitar 1 sendok teh" },
      SALT,
      PEPPER
    ],
    steps: [
      { en: "If you use wooden skewers, soak 3 of them in water for 30 minutes so they do not burn. Metal skewers need no soaking.", id: "Kalau pakai tusuk sate kayu, rendam 3 tusuk dalam air selama 30 menit supaya tidak gosong. Tusuk sate besi tidak perlu direndam." },
      { en: "Grate 40 g of onion on the fine side of a grater.", id: "Parut 40 g bawang bombay dengan sisi parutan yang halus." },
      { en: "Squeeze the grated onion in your hand and pour away the juice, so the kofta stays on the skewer.", id: "Peras parutan bawang dengan tangan dan buang airnya, supaya kofta tidak lepas dari tusukan." },
      { en: "Chop 10 g of parsley very finely.", id: "Cincang 10 g peterseli sampai sangat halus." },
      { en: "In a bowl, mix 200 g of mince with the onion, the parsley, 2 g of 7-spice, a pinch of salt and a little black pepper.", id: "Di dalam mangkuk, campur 200 g daging giling dengan bawang, peterseli, 2 g 7-spice, sejumput garam, dan sedikit lada hitam." },
      { en: "Knead with your hands for 2 minutes, until the mixture is sticky.", id: "Uleni dengan tangan selama 2 menit sampai adonan lengket." },
      { en: "Weigh the mixture and divide it into 3 equal pieces (about 80 g each).", id: "Timbang adonan, lalu bagi menjadi 3 bagian yang sama (sekitar 80 g per bagian)." },
      { en: "With wet hands, press each piece around a skewer into a long sausage shape, about 12 cm long.", id: "Dengan tangan basah, tekan setiap bagian di sekeliling tusuk sate sampai berbentuk sosis panjang, sekitar 12 cm." },
      { en: "Heat a grill pan on medium-high heat for 5 minutes. No oil is needed.", id: "Panaskan wajan panggangan (grill pan) dengan api sedang-besar selama 5 menit. Tidak perlu minyak." },
      { en: "Grill the kofta for 8 to 10 minutes, turning every 2 minutes, until browned all over and cooked through: no pink in the middle, 71 °C if you have a thermometer.", id: "Panggang kofta 8 sampai 10 menit, dibalik setiap 2 menit, sampai kecokelatan di semua sisi dan matang sampai dalam: tidak ada warna merah muda di tengah, 71 °C kalau ada termometer." },
      { en: "Warm the flatbread in a dry pan for 30 seconds on each side.", id: "Hangatkan roti pipih di wajan kering tanpa minyak, 30 detik per sisi." },
      { en: "Put a plate on the scale. Add the flatbread, the kofta, 150 g of fattoush and 50 g of hummus, setting the scale to zero before each one.", id: "Taruh piring di atas timbangan. Masukkan roti, kofta, 150 g fattoush, dan 50 g hummus, nolkan timbangan sebelum setiap bahan." }
    ],
    notes: [
      { en: "Ready-made fattoush often carries a lot of oil and fried bread. Choose a lightly dressed one, or make it at home: lettuce, tomato, cucumber, radish and mint with lemon juice, a little sumac, no more than 5 g of olive oil and a few pieces of toasted (not fried) bread.", id: "Fattoush yang dibeli jadi sering banyak minyak dan roti gorengnya. Pilih yang sausnya sedikit, atau buat sendiri: selada, tomat, timun, lobak merah, dan daun mint dengan air lemon, sedikit sumac, minyak zaitun tidak lebih dari 5 g, dan sedikit roti yang dipanggang (bukan digoreng)." },
      { en: "Minced meat must always be cooked right through. Never serve it pink.", id: "Daging giling harus selalu matang sampai dalam. Jangan pernah disajikan masih merah muda." },
      { en: "To freeze raw kofta for the week, see Batch for the week.", id: "Untuk membekukan kofta mentah untuk seminggu, lihat Masak untuk seminggu." }
    ]
  },

  'tuna-white-bean-salad': {
    name: { en: "Tuna & white bean salad", id: "Salad tuna dan kacang putih" },
    serves: 1,
    time: 10,
    ing: [
      { item: 'tuna in water', q: 160, u: 'g', en: "Tuna in water (not oil), weighed after draining", id: "Tuna kaleng dalam air (bukan dalam minyak), ditimbang setelah ditiriskan" },
      { item: 'cannellini beans', q: 150, u: 'g', en: "Cannellini beans, tinned, weighed after draining and rinsing", id: "Kacang cannellini (kacang putih) kalengan, ditimbang setelah ditiriskan dan dibilas" },
      { item: 'red onion', q: 30, u: 'g', en: "Red onion", id: "Bawang bombay merah" },
      { item: 'parsley', q: 10, u: 'g', en: "Flat-leaf parsley", id: "Peterseli (daun parsley)" },
      { item: 'olive oil', q: 10, u: 'g', en: "Olive oil", id: "Minyak zaitun" },
      { item: 'lemon', q: 0.5, u: '', en: "Lemon, juice only (about 15 ml)", id: "Buah lemon, ambil airnya saja (sekitar 15 ml)" },
      SALT,
      PEPPER
    ],
    steps: [
      { en: "Open the tuna, press the lid down to drain off all the water, and weigh 160 g into a large bowl.", id: "Buka kaleng tuna, tekan tutupnya untuk membuang semua airnya, lalu timbang 160 g ke dalam mangkuk besar." },
      { en: "Tip the beans into a sieve, rinse them under cold water and shake them dry.", id: "Tuang kacang ke saringan, bilas dengan air dingin, lalu goyangkan sampai kering." },
      { en: "Weigh 150 g of beans into the bowl.", id: "Timbang 150 g kacang ke dalam mangkuk." },
      { en: "Slice 30 g of red onion very thinly and add it.", id: "Iris 30 g bawang bombay merah setipis mungkin, lalu masukkan." },
      { en: "Chop 10 g of parsley and add it.", id: "Cincang 10 g peterseli, lalu masukkan." },
      { en: "Put the bowl on the scale, set it to zero and add 10 g of olive oil.", id: "Taruh mangkuk di atas timbangan, nolkan, lalu tambahkan 10 g minyak zaitun." },
      { en: "Squeeze in the juice of ½ lemon, keeping the seeds out.", id: "Peras air dari ½ buah lemon ke dalamnya, jangan sampai bijinya masuk." },
      { en: "Season with salt and black pepper and toss gently, without mashing the beans.", id: "Bumbui dengan garam dan lada hitam, lalu aduk pelan-pelan supaya kacangnya tidak hancur." }
    ],
    notes: [
      { en: "No cooking. It keeps for 1 day in a closed box in the fridge.", id: "Tidak perlu dimasak. Tahan 1 hari dalam wadah tertutup di kulkas." },
      { en: "Keep leftover beans in a closed box in the fridge and use them within 3 days. Never store them in the opened tin.", id: "Simpan sisa kacang dalam wadah tertutup di kulkas dan pakai dalam 3 hari. Jangan disimpan di kaleng yang sudah dibuka." }
    ]
  },

  'smoked-chicken-potato': {
    name: { en: "Smoked chicken & potato", id: "Ayam asap dan kentang" },
    serves: 1,
    time: 105,
    ing: [
      { item: 'chicken thigh', q: 200, u: 'g', en: "Chicken thighs, boneless, skin removed, raw", id: "Paha ayam tanpa tulang, kulit dibuang, mentah" },
      { item: 'potato', q: 200, u: 'g', en: "Potatoes, raw", id: "Kentang, mentah" },
      { item: 'green beans', q: 100, u: 'g', en: "Green beans", id: "Buncis" },
      { item: 'olive oil', q: 10, u: 'g', en: "Olive oil, for the potatoes", id: "Minyak zaitun, untuk kentang" },
      { item: 'paprika rub', q: 5, u: 'g', en: "Paprika rub, ready-made, or just smoked paprika (about 2 teaspoons)", id: "Bumbu oles paprika (paprika rub) siap pakai, atau cukup bubuk paprika asap / smoked paprika (sekitar 2 sendok teh)" },
      SALT,
      PEPPER
    ],
    steps: [
      { en: "If the chicken has skin, pull it off and throw it away. Cut off any large pieces of fat.", id: "Kalau ayamnya masih berkulit, tarik kulitnya dan buang. Potong juga lemak yang besar." },
      { en: "Weigh 200 g of chicken and pat it dry with kitchen paper.", id: "Timbang 200 g ayam, lalu keringkan dengan tisu dapur." },
      { en: "Rub 5 g of paprika rub all over the chicken. If the rub has no salt in it, add a pinch of salt.", id: "Lumuri seluruh ayam dengan 5 g bumbu paprika. Kalau bumbunya tidak mengandung garam, tambahkan sejumput garam." },
      { en: "Heat the smoker to 120 °C.", id: "Panaskan smoker (alat pengasap) sampai 120 °C." },
      { en: "Put the chicken on the smoker rack and smoke it for 60 to 90 minutes, until the thickest part reaches 75 °C. Use a thermometer: smoked chicken can stay pink even when it is cooked.", id: "Taruh ayam di rak smoker dan asapi 60 sampai 90 menit, sampai bagian paling tebal mencapai 75 °C. Pakai termometer: ayam asap bisa tetap terlihat merah muda walaupun sudah matang." },
      { en: "When the chicken has about 45 minutes left, heat the oven to 200 °C (180 °C for a fan oven).", id: "Saat waktu ayam tinggal sekitar 45 menit, panaskan oven 200 °C (180 °C untuk oven dengan kipas)." },
      { en: "Cut 200 g of potatoes into 3 cm chunks. Peeling them is optional.", id: "Potong 200 g kentang ukuran 3 cm. Boleh dikupas, boleh tidak." },
      { en: "Put a bowl on the scale, set it to zero and weigh in 10 g of olive oil.", id: "Taruh mangkuk di atas timbangan, nolkan, lalu timbang 10 g minyak zaitun." },
      { en: "Add the potatoes, a pinch of salt and some black pepper, and toss.", id: "Masukkan kentang, sejumput garam, dan sedikit lada hitam, lalu aduk rata." },
      { en: "Spread the potatoes on a tray lined with baking paper and roast for 35 to 40 minutes, turning them halfway, until golden outside and soft inside (a knife slides in easily).", id: "Ratakan kentang di loyang yang dialasi kertas roti, lalu panggang 35 sampai 40 menit, dibalik di tengah waktu, sampai keemasan di luar dan empuk di dalam (pisau mudah masuk)." },
      { en: "Trim the ends off 100 g of green beans.", id: "Buang ujung 100 g buncis." },
      { en: "Boil them in salted water for 4 to 5 minutes, until bright green and just tender, then drain.", id: "Rebus buncis dalam air mendidih yang diberi garam selama 4 sampai 5 menit, sampai hijau cerah dan baru empuk, lalu tiriskan." },
      { en: "Rest the chicken for 5 minutes, then serve it with the potatoes and green beans.", id: "Diamkan ayam 5 menit, lalu sajikan bersama kentang dan buncis." }
    ],
    notes: [
      { en: "No smoker: roast the chicken in the oven at 200 °C on the same tray as the potatoes. Put the potatoes in first; after 10 minutes add the chicken and roast both for 25 to 30 minutes more, until the chicken reaches 75 °C, with no pink and clear juices. Use smoked paprika in the rub for the smoky taste.", id: "Tanpa smoker: panggang ayam di oven 200 °C di loyang yang sama dengan kentang. Masukkan kentang dulu; setelah 10 menit masukkan ayam, lalu panggang keduanya 25 sampai 30 menit lagi, sampai ayam mencapai 75 °C, tidak ada warna merah muda, dan airnya bening. Pakai bubuk paprika asap (smoked paprika) supaya tetap ada rasa asap." },
      { en: "Only the potatoes get oil. The chicken goes on the smoker with the rub only.", id: "Hanya kentang yang diberi minyak. Ayam masuk smoker hanya dengan bumbu oles." }
    ]
  },

  // Dinner
  'grilled-salmon-freekeh': {
    name: { en: "Grilled salmon + freekeh", id: "Salmon panggang + freekeh" },
    serves: 1,
    time: 40,
    ing: [
      { item: 'salmon', q: 180, u: 'g', en: "Salmon fillet, skin on, raw", id: "Fillet salmon, dengan kulit, mentah" },
      { item: 'freekeh', q: 60, u: 'g', en: "Freekeh, dry (makes about 150 g cooked)", id: "Freekeh kering (gandum hijau sangrai), jadi sekitar 150 g setelah dimasak" },
      { item: 'courgette', q: 75, u: 'g', en: "Courgette (zucchini)", id: "Zukini" },
      { item: 'pepper', q: 75, u: 'g', en: "Pepper (capsicum), about ⅔ of one", id: "Paprika, sayur, bukan bubuk (sekitar ⅔ buah)" },
      { item: 'lemon', q: 0.5, u: '', en: "Lemon, cut into 2 wedges", id: "Buah lemon, potong menjadi 2 juring" },
      { item: 'olive oil', q: 8, u: 'g', en: "Olive oil, for the vegetables", id: "Minyak zaitun, untuk sayuran" },
      { item: 'water', q: 200, u: 'ml', extra: true, en: "Water, for the freekeh", id: "Air, untuk memasak freekeh" },
      SALT,
      PEPPER
    ],
    steps: [
      { en: "Heat the oven to 200 °C (180 °C for a fan oven).", id: "Panaskan oven 200 °C (180 °C untuk oven dengan kipas)." },
      { en: "Rinse 60 g of freekeh in a sieve under cold water.", id: "Cuci 60 g freekeh di saringan dengan air dingin." },
      { en: "Put the freekeh in a small pot with 200 ml of water and a pinch of salt and bring it to the boil on high heat.", id: "Masukkan freekeh ke panci kecil bersama 200 ml air dan sejumput garam, lalu didihkan dengan api besar." },
      { en: "Put the lid on, turn to low heat and simmer for 20 minutes, until tender but still a little chewy.", id: "Tutup panci, kecilkan api, lalu masak 20 menit sampai empuk tapi masih sedikit kenyal." },
      { en: "Drain off any water that is left and put the lid back on.", id: "Buang sisa air kalau masih ada, lalu tutup lagi pancinya." },
      { en: "While the freekeh cooks, cut the courgette into 1 cm half-moons and the pepper into 2 cm pieces. Weigh 75 g of each.", id: "Sambil menunggu freekeh, potong zukini setengah lingkaran setebal 1 cm dan paprika ukuran 2 cm. Timbang masing-masing 75 g." },
      { en: "Put a bowl on the scale, set it to zero and weigh in 8 g of olive oil.", id: "Taruh mangkuk di atas timbangan, nolkan, lalu timbang 8 g minyak zaitun." },
      { en: "Add the vegetables, a pinch of salt and some black pepper, and toss.", id: "Masukkan sayuran, sejumput garam, dan sedikit lada hitam, lalu aduk rata." },
      { en: "Spread them on a tray lined with baking paper and roast for 20 to 25 minutes, until soft and browned at the edges.", id: "Ratakan di loyang yang dialasi kertas roti, lalu panggang 20 sampai 25 menit sampai empuk dan pinggirnya kecokelatan." },
      { en: "Pat the salmon dry with kitchen paper and season both sides with salt and black pepper.", id: "Keringkan salmon dengan tisu dapur, lalu bumbui kedua sisinya dengan garam dan lada hitam." },
      { en: "Heat a non-stick frying pan on high heat for 2 minutes, with no oil.", id: "Panaskan wajan anti lengket dengan api besar selama 2 menit, tanpa minyak." },
      { en: "Lay the salmon in skin-side down and press it gently with a spatula for the first 30 seconds so the skin stays flat.", id: "Taruh salmon dengan sisi kulit di bawah, lalu tekan pelan dengan spatula selama 30 detik pertama supaya kulitnya tetap rata." },
      { en: "Cook for 4 minutes without moving it.", id: "Masak 4 menit tanpa digeser." },
      { en: "Flip it and cook for 1 minute more.", id: "Balik salmon dan masak 1 menit lagi." },
      { en: "Check it is done: the flesh is opaque all the way to the centre and flakes when pressed with a fork. If the centre still looks glassy, cook 1 to 2 minutes more on low heat.", id: "Cek kematangannya: dagingnya sudah tidak bening (buram) sampai ke tengah dan mudah terpisah bila ditekan garpu. Kalau bagian tengah masih terlihat bening seperti kaca, masak 1 sampai 2 menit lagi dengan api kecil." },
      { en: "Put all of the freekeh on a plate (about 150 g), add the vegetables and lay the salmon on top. Serve with the lemon wedges.", id: "Taruh semua freekeh di piring (sekitar 150 g), tambahkan sayuran, lalu taruh salmon di atasnya. Sajikan dengan potongan lemon." }
    ],
    notes: [
      { en: "The pan stays dry: salmon skin has enough fat of its own. The 8 g of oil is only for the vegetables.", id: "Wajan tetap kering: kulit salmon sudah cukup berminyak. Minyak 8 g hanya untuk sayuran." },
      { en: "If the packet says whole freekeh (not cracked), use 250 ml of water and simmer for 35 to 40 minutes.", id: "Kalau di kemasan tertulis freekeh utuh (bukan pecah / cracked), pakai 250 ml air dan masak 35 sampai 40 menit." },
      { en: "Use all of the freekeh from 60 g dry: the calories are in the dry grain.", id: "Pakai semua freekeh dari 60 g kering: kalorinya ada di biji keringnya." }
    ]
  },

  'lightened-chicken-machboos': {
    name: { en: "Lightened chicken machboos", id: "Nasi machboos ayam (versi ringan)" },
    serves: 1,
    time: 55,
    ing: [
      { item: 'chicken breast', q: 200, u: 'g', en: "Chicken breast, skinless, raw", id: "Dada ayam tanpa kulit, mentah" },
      { item: 'basmati', q: 50, u: 'g', en: "Basmati rice, dry (makes about 150 g cooked)", id: "Beras basmati, mentah (jadi sekitar 150 g nasi)" },
      { item: 'loomi', q: 1, u: '', en: "Loomi (dried black lime), whole", id: "Loomi (jeruk nipis kering hitam), utuh" },
      { item: 'tomato', q: 120, u: 'g', en: "Tomato, chopped", id: "Tomat, potong dadu" },
      { item: 'onion', q: 60, u: 'g', en: "Onion, finely chopped", id: "Bawang bombay, cincang halus" },
      { item: 'baharat', q: 2, u: 'g', en: "Baharat (about 1 teaspoon)", id: "Baharat (campuran rempah Arab), sekitar 1 sendok teh" },
      { item: 'ghee', q: 8, u: 'g', en: "Ghee", id: "Ghee (minyak samin)" },
      { item: 'water', q: 250, u: 'ml', extra: true, en: "Water, for simmering the chicken and cooking the rice", id: "Air, untuk merebus ayam dan memasak nasi" },
      SALT
    ],
    steps: [
      { en: "Cut 200 g of chicken breast into 4 large pieces.", id: "Potong 200 g dada ayam menjadi 4 potong besar." },
      { en: "Rinse 50 g of basmati in cold water until the water runs clear, then leave it to drain.", id: "Cuci 50 g beras basmati dengan air dingin sampai airnya bening, lalu tiriskan." },
      { en: "Pierce the loomi 2 or 3 times with the tip of a knife.", id: "Tusuk loomi 2 atau 3 kali dengan ujung pisau." },
      { en: "Put a small pot with a lid on the scale, set it to zero and weigh in 8 g of ghee.", id: "Taruh panci kecil yang ada tutupnya di atas timbangan, nolkan, lalu timbang 8 g ghee ke dalamnya." },
      { en: "Melt the ghee on medium heat, add 60 g of onion and cook for 5 minutes, stirring, until soft and lightly golden.", id: "Lelehkan ghee dengan api sedang, masukkan 60 g bawang bombay, lalu tumis 5 menit sambil diaduk sampai layu dan sedikit keemasan." },
      { en: "Add 2 g of baharat and stir for 30 seconds, until fragrant.", id: "Masukkan 2 g baharat, aduk 30 detik sampai harum." },
      { en: "Add 120 g of tomato and the loomi and cook for 3 minutes, until the tomato is soft.", id: "Masukkan 120 g tomat dan loomi, lalu masak 3 menit sampai tomat layu." },
      { en: "Add the chicken and a pinch of salt and stir for 2 minutes to coat it in the spices.", id: "Masukkan ayam dan sejumput garam, aduk 2 menit sampai ayam terbalut bumbu." },
      { en: "Pour in 250 ml of water and bring it to the boil.", id: "Tuang 250 ml air, lalu didihkan." },
      { en: "Put the lid on, turn to low heat and simmer for 15 minutes, until the chicken is cooked through: no pink inside, clear juices, 75 °C if you have a thermometer.", id: "Tutup panci, kecilkan api, lalu masak 15 menit sampai ayam matang sampai dalam: tidak ada warna merah muda, airnya bening, 75 °C kalau ada termometer." },
      { en: "Lift the chicken and the loomi out onto a plate and cover them.", id: "Angkat ayam dan loomi ke piring, lalu tutup." },
      { en: "Pour the liquid into a measuring jug. You need 120 ml: if there is less, top it up with water; if there is more, keep the extra in a cup to spoon over at the end.", id: "Tuang kuahnya ke gelas ukur. Yang dibutuhkan 120 ml: kalau kurang, tambahkan air; kalau lebih, simpan sisanya di cangkir untuk disiramkan di akhir." },
      { en: "Pour the 120 ml back into the pot, bring it to the boil and add the rice. Stir once.", id: "Tuang lagi 120 ml kuah ke panci, didihkan, lalu masukkan beras. Aduk sekali saja." },
      { en: "Put the lid on, turn to the lowest heat and cook for 12 minutes.", id: "Tutup panci, kecilkan api sekecil-kecilnya, lalu masak 12 menit." },
      { en: "Turn off the heat, lay the chicken and the loomi on top of the rice, put the lid back on and leave it for 5 minutes.", id: "Matikan api, taruh ayam dan loomi di atas nasi, tutup lagi pancinya, lalu diamkan 5 menit." },
      { en: "Serve the rice with the chicken on top and spoon over any liquid you kept. The loomi is only for flavour: leave it at the side of the plate.", id: "Sajikan nasi dengan ayam di atasnya, lalu siramkan sisa kuah yang disimpan. Loomi hanya untuk rasa: taruh di pinggir piring." }
    ],
    notes: [
      { en: "The rice cooks in the spiced liquid from the chicken, as in a traditional machboos. Use all of the rice from 50 g dry.", id: "Nasi dimasak dengan kuah rempah dari ayam, seperti machboos tradisional. Pakai semua nasi dari 50 g beras." },
      { en: "Only the 8 g of ghee: do not add more ghee or oil at any point.", id: "Hanya 8 g ghee: jangan tambah ghee atau minyak lagi di langkah mana pun." }
    ]
  },

  'harra-prawns-bulgur': {
    name: { en: "Harra prawns + bulgur", id: "Udang harra (udang pedas) + bulgur" },
    serves: 1,
    time: 20,
    ing: [
      { item: 'prawns', q: 200, u: 'g', en: "Prawns, raw, peeled and deveined (weight without shells)", id: "Udang mentah, sudah dikupas dan dibuang kotorannya (berat tanpa kulit)" },
      { item: 'bulgur', q: 55, u: 'g', en: "Coarse bulgur, dry (makes about 150 g cooked)", id: "Bulgur (gandum pecah) kasar, kering (jadi sekitar 150 g setelah dimasak)" },
      { item: 'tomato', q: 150, u: 'g', en: "Tomato", id: "Tomat" },
      { item: 'garlic', q: 2, u: '', en: "Garlic cloves (about 10 g)", id: "Siung bawang putih (sekitar 10 g)" },
      { item: 'chilli', q: 1, u: '', en: "Fresh chilli (about 10 g)", id: "Cabai segar (sekitar 10 g)" },
      { item: 'coriander', q: 10, u: 'g', en: "Fresh coriander", id: "Daun ketumbar segar" },
      { item: 'olive oil', q: 8, u: 'g', en: "Olive oil", id: "Minyak zaitun" },
      { item: 'water', q: 130, u: 'ml', extra: true, en: "Water, for the bulgur", id: "Air, untuk memasak bulgur" },
      SALT
    ],
    steps: [
      { en: "If the prawns are frozen, thaw them first: overnight in the fridge, or in a sealed bag under cold running water for 10 to 15 minutes. Weigh 200 g after thawing.", id: "Kalau udangnya beku, cairkan dulu: semalaman di kulkas, atau dalam plastik tertutup di bawah air keran dingin yang mengalir selama 10 sampai 15 menit. Timbang 200 g setelah cair." },
      { en: "Rinse 55 g of bulgur in a sieve.", id: "Cuci 55 g bulgur di saringan." },
      { en: "Put it in a small pot with 130 ml of water and a pinch of salt and bring it to the boil on high heat.", id: "Masukkan ke panci kecil bersama 130 ml air dan sejumput garam, lalu didihkan dengan api besar." },
      { en: "Put the lid on, turn to the lowest heat and cook for 10 minutes.", id: "Tutup panci, kecilkan api sekecil-kecilnya, lalu masak 10 menit." },
      { en: "Turn off the heat and leave the lid on for 5 minutes, then fluff it with a fork.", id: "Matikan api, biarkan tertutup 5 menit, lalu urai dengan garpu." },
      { en: "While the bulgur cooks, finely chop the garlic and the chilli, chop 150 g of tomato and chop 10 g of coriander.", id: "Sambil menunggu bulgur, cincang halus bawang putih dan cabai, potong dadu 150 g tomat, dan cincang 10 g daun ketumbar." },
      { en: "Pat the prawns dry with kitchen paper.", id: "Keringkan udang dengan tisu dapur." },
      { en: "Put a frying pan on the scale, set it to zero and weigh in 8 g of olive oil.", id: "Taruh wajan di atas timbangan, nolkan, lalu timbang 8 g minyak zaitun." },
      { en: "Heat it on medium heat, add the garlic and chilli and stir for 1 minute, until fragrant. Do not let the garlic brown.", id: "Panaskan dengan api sedang, masukkan bawang putih dan cabai, lalu tumis 1 menit sampai harum. Jangan sampai bawang putihnya kecokelatan." },
      { en: "Add the tomato and a pinch of salt and cook for 4 to 5 minutes, stirring, until soft and saucy.", id: "Masukkan tomat dan sejumput garam, lalu masak 4 sampai 5 menit sambil diaduk sampai layu dan menjadi saus." },
      { en: "Add the prawns in one layer and cook for 2 to 3 minutes, turning once, until they turn pink all over and curl. Do not cook them longer or they go rubbery.", id: "Masukkan udang dalam satu lapisan, masak 2 sampai 3 menit dan balik sekali, sampai udang berubah merah muda semua dan melengkung. Jangan dimasak lebih lama supaya udang tidak alot." },
      { en: "Turn off the heat and stir in the coriander.", id: "Matikan api, lalu aduk rata dengan daun ketumbar." },
      { en: "Put all of the bulgur on a plate (about 150 g) and spoon the prawns and sauce on top.", id: "Taruh semua bulgur di piring (sekitar 150 g), lalu tuang udang dan sausnya di atasnya." }
    ],
    notes: [
      { en: "For less heat, take the seeds out of the chilli before chopping it.", id: "Kalau mau tidak terlalu pedas, buang biji cabai sebelum dicincang." },
      { en: "Fine bulgur does not need cooking: pour 130 ml of boiling water over it, cover it and leave it for 15 minutes.", id: "Bulgur halus tidak perlu dimasak: siram dengan 130 ml air mendidih, tutup, lalu diamkan 15 menit." }
    ]
  },

  'steak-sweet-potato': {
    name: { en: "Steak & sweet potato", id: "Steak sapi dan ubi jalar" },
    serves: 1,
    time: 35,
    ing: [
      { item: 'sirloin', q: 180, u: 'g', en: "Sirloin steak, raw, weighed after the fat is trimmed off", id: "Daging sapi has luar (sirloin), mentah, ditimbang setelah lemaknya dibuang" },
      { item: 'sweet potato', q: 150, u: 'g', en: "Sweet potato, raw, peeled", id: "Ubi jalar oranye, mentah, dikupas" },
      { item: 'large salad', q: 200, u: 'g', en: "Large salad: lettuce or mixed leaves, cucumber and tomato", id: "Salad sayur porsi besar: selada atau daun campur, timun, dan tomat" },
      { item: 'olive oil', q: 10, u: 'g', en: "Olive oil: 3 g for the steak, 7 g for the salad", id: "Minyak zaitun: 3 g untuk steak, 7 g untuk salad" },
      SALT,
      PEPPER
    ],
    steps: [
      { en: "Take the steak out of the fridge 20 minutes before cooking.", id: "Keluarkan steak dari kulkas 20 menit sebelum dimasak." },
      { en: "Cut the thick strip of white fat off the edge of the sirloin with a sharp knife, then weigh 180 g.", id: "Potong lapisan lemak putih yang tebal di pinggir daging dengan pisau tajam, lalu timbang 180 g." },
      { en: "Peel the sweet potato, cut it into 3 cm chunks and weigh 150 g.", id: "Kupas ubi jalar, potong ukuran 3 cm, lalu timbang 150 g." },
      { en: "Steam the sweet potato for 15 minutes, until a knife slides in easily.", id: "Kukus ubi jalar selama 15 menit sampai pisau mudah masuk." },
      { en: "Chop 200 g of salad vegetables into a bowl.", id: "Potong-potong 200 g sayuran salad ke dalam mangkuk." },
      { en: "Pat the steak dry with kitchen paper and season both sides with salt and black pepper.", id: "Keringkan steak dengan tisu dapur, lalu bumbui kedua sisinya dengan garam dan lada hitam." },
      { en: "Put the steak on a plate on the scale, set it to zero, add 3 g of olive oil and rub it over both sides.", id: "Taruh steak di piring di atas timbangan, nolkan, tambahkan 3 g minyak zaitun, lalu ratakan di kedua sisinya." },
      { en: "Heat a heavy frying pan or grill pan on high heat for 3 minutes, until it is smoking hot. Do not add oil to the pan.", id: "Panaskan wajan tebal atau wajan panggangan dengan api besar selama 3 menit sampai sangat panas dan berasap. Jangan tambah minyak ke wajan." },
      { en: "Cook the steak for 4 minutes without moving it.", id: "Masak steak 4 menit tanpa digeser." },
      { en: "Flip it and cook for 3 to 4 minutes more for medium: pink in the centre, 60 °C if you have a thermometer.", id: "Balik steak dan masak 3 sampai 4 menit lagi untuk tingkat matang medium: bagian tengah merah muda, 60 °C kalau ada termometer." },
      { en: "Rest the steak on a board for 5 minutes. Do not cut it before then.", id: "Diamkan steak di talenan selama 5 menit. Jangan dipotong sebelum itu." },
      { en: "Put the salad bowl on the scale, set it to zero, add 7 g of olive oil and a pinch of salt, and toss.", id: "Taruh mangkuk salad di atas timbangan, nolkan, tambahkan 7 g minyak zaitun dan sejumput garam, lalu aduk rata." },
      { en: "Slice the steak across the grain and serve it with the sweet potato and the salad.", id: "Iris steak melawan arah serat daging, lalu sajikan dengan ubi jalar dan salad." }
    ],
    notes: [
      { en: "Times are for a steak about 2 cm thick, per side: rare 2 to 3 minutes (52 °C), medium 3 to 4 minutes (60 °C), well done 5 to 6 minutes (70 °C).", id: "Waktu ini untuk steak setebal sekitar 2 cm, per sisi: rare (setengah matang) 2 sampai 3 menit (52 °C), medium 3 sampai 4 menit (60 °C), well done (matang penuh) 5 sampai 6 menit (70 °C)." },
      { en: "Trimming the fat is where the calories are saved. The 5 minutes of rest matter more than how the steak was cooked.", id: "Membuang lemak adalah cara menghemat kalori. Mendiamkan steak 5 menit lebih penting daripada cara memasaknya." },
      { en: "No steamer: boil the sweet potato chunks in water for 12 to 15 minutes, then drain.", id: "Kalau tidak ada kukusan: rebus potongan ubi dalam air 12 sampai 15 menit, lalu tiriskan." }
    ]
  },

  // Snacks
  'cottage-cheese-dates': {
    name: { en: "Cottage cheese + dates", id: "Keju cottage + kurma" },
    serves: 1,
    time: 5,
    ing: [
      { item: 'cottage cheese', q: 200, u: 'g', en: "Cottage cheese, regular (about 4 % fat)", id: "Keju cottage (keju lembut berbutir), biasa (sekitar 4 % lemak)" },
      { item: 'dates', q: 2, u: '', en: "Dates, medium (about 12 g each)", id: "Kurma ukuran sedang (sekitar 12 g per buah)" },
      { item: 'cinnamon', q: 1, u: 'g', en: "Ground cinnamon (about ½ teaspoon)", id: "Kayu manis bubuk (sekitar ½ sendok teh)" }
    ],
    steps: [
      { en: "Put a bowl on the scale, set it to zero and weigh in 200 g of cottage cheese.", id: "Taruh mangkuk di atas timbangan, nolkan, lalu timbang 200 g keju cottage." },
      { en: "Cut the 2 dates open, take out the stones and chop the dates.", id: "Belah 2 kurma, buang bijinya, lalu potong-potong." },
      { en: "Add the dates to the bowl.", id: "Masukkan kurma ke mangkuk." },
      { en: "Dust with 1 g of cinnamon.", id: "Taburi 1 g kayu manis bubuk." },
      { en: "Serve, or cover it and keep it in the fridge until needed.", id: "Sajikan, atau tutup dan simpan di kulkas sampai waktunya." }
    ],
    notes: [
      { en: "On tennis days this is eaten 90 minutes before court, around 17:00. It can be made in the morning and kept covered in the fridge.", id: "Pada hari tenis, ini dimakan 90 menit sebelum main, sekitar pukul 17.00. Boleh dibuat pagi hari dan disimpan tertutup di kulkas." },
      { en: "If the dates are large (Medjool), weigh 24 g of dates in total with the stones instead of counting 2.", id: "Kalau kurmanya besar (Medjool), timbang total 24 g kurma dengan bijinya, jangan hitung 2 buah." }
    ]
  },

  'ice-blast-shake': {
    name: { en: "Ice blast shake", id: "Shake protein Ice Blast" },
    serves: 1,
    time: 3,
    ing: [
      { item: 'NXT beef protein isolate', q: 30, u: 'g', en: "NXT beef protein isolate, the clear juice-style protein (about ¾ scoop)", id: "Protein NXT Beef Protein Isolate, protein bening rasa jus (sekitar ¾ sendok takar)" },
      { item: 'water', q: 400, u: 'ml', en: "Cold water", id: "Air dingin" },
      { item: 'ice', q: 100, u: 'g', en: "Ice cubes (about 5)", id: "Es batu (sekitar 5 buah)" }
    ],
    steps: [
      { en: "Put a shaker or bottle on the scale, set it to zero and weigh in 30 g of protein powder (about ¾ scoop).", id: "Taruh shaker atau botol di atas timbangan, nolkan, lalu timbang 30 g bubuk protein (sekitar ¾ sendok takar)." },
      { en: "Add 400 ml of cold water (400 g on the scale).", id: "Tambahkan 400 ml air dingin (400 g di timbangan)." },
      { en: "Close the lid and shake hard for 20 seconds, until there are no lumps.", id: "Tutup rapat dan kocok kuat-kuat selama 20 detik sampai tidak ada gumpalan." },
      { en: "Put 100 g of ice in a tall glass and pour the shake over it.", id: "Masukkan 100 g es batu ke gelas tinggi, lalu tuang shake di atasnya." }
    ],
    notes: [
      { en: "Water only, never milk: the citric acid in this protein curdles milk.", id: "Hanya dengan air, jangan pernah dengan susu: asam sitrat di protein ini membuat susu pecah dan menggumpal." },
      { en: "This is not the whey used in the protein oats. Keep the two tubs apart.", id: "Ini bukan whey yang dipakai untuk bubur oat protein. Jangan sampai tertukar." },
      { en: "Serve it alongside a meal, not instead of one.", id: "Sajikan bersama makanan, bukan sebagai pengganti makan." }
    ]
  },

  'eggs-labneh': {
    name: { en: "Eggs & labneh", id: "Telur rebus dan labneh" },
    serves: 1,
    time: 15,
    ing: [
      { item: 'eggs', q: 2, u: '', en: "Eggs, hard-boiled (about 50 g each)", id: "Telur, direbus matang (sekitar 50 g per butir)" },
      { item: 'labneh', q: 50, u: 'g', en: "Labneh, full-fat", id: "Labneh (yogurt kental khas Arab), lemak penuh" },
      { item: "za'atar", q: 3, u: 'g', en: "Za'atar (about 1 teaspoon)", id: "Za'atar (campuran rempah thyme dan wijen), sekitar 1 sendok teh" },
      { item: 'olive oil', q: 5, u: 'g', en: "Olive oil, for drizzling on top", id: "Minyak zaitun, untuk disiram di atas" }
    ],
    steps: [
      { en: "If there are boiled eggs left from the Sunday batch, take 2 and go straight to step 5.", id: "Kalau masih ada telur rebus dari masakan hari Minggu, ambil 2 butir dan langsung ke langkah 5." },
      { en: "Bring a small pot of water to the boil, then gently lower in 2 eggs with a spoon.", id: "Didihkan air di panci kecil, lalu masukkan 2 telur pelan-pelan dengan sendok." },
      { en: "Boil for 10 minutes on medium heat.", id: "Rebus 10 menit dengan api sedang." },
      { en: "Move the eggs into a bowl of cold water for 5 minutes.", id: "Pindahkan telur ke mangkuk berisi air dingin selama 5 menit." },
      { en: "Peel the eggs and cut them in half.", id: "Kupas telur, lalu belah dua." },
      { en: "Put a plate on the scale, set it to zero and spread 50 g of labneh on it.", id: "Taruh piring di atas timbangan, nolkan, lalu oleskan 50 g labneh di piring." },
      { en: "Lay the eggs on the labneh.", id: "Taruh telur di atas labneh." },
      { en: "Sprinkle with 3 g of za'atar.", id: "Taburi 3 g za'atar." },
      { en: "Set the scale to zero and drizzle 5 g of olive oil over the top.", id: "Nolkan timbangan, lalu siram 5 g minyak zaitun di atasnya." }
    ],
    notes: [
      { en: "To boil eggs for the whole week, see Batch for the week.", id: "Untuk merebus telur untuk seminggu, lihat Masak untuk seminggu." }
    ]
  },

  'smoked-turkey-roll-ups': {
    name: { en: "Smoked turkey roll-ups", id: "Gulungan kalkun asap" },
    serves: 1,
    time: 5,
    ing: [
      { item: 'smoked turkey breast', q: 90, u: 'g', en: "Smoked turkey breast, sliced (usually 4 to 6 slices)", id: "Dada kalkun asap, iris (biasanya 4 sampai 6 lembar)" },
      { item: 'light cream cheese', q: 30, u: 'g', en: "Light cream cheese", id: "Keju krim rendah lemak (light cream cheese)" },
      { item: 'cucumber', q: 100, u: 'g', en: "Cucumber", id: "Timun" }
    ],
    steps: [
      { en: "Wash the cucumber and cut it into sticks about 8 cm long and 1 cm thick. Weigh 100 g.", id: "Cuci timun, lalu potong batang panjang sekitar 8 cm dan tebal 1 cm. Timbang 100 g." },
      { en: "Weigh 90 g of turkey and lay the slices flat on a board.", id: "Timbang 90 g kalkun, lalu bentangkan lembarannya di atas talenan." },
      { en: "Spread 30 g of cream cheese thinly over the slices, sharing it between them.", id: "Oleskan 30 g keju krim tipis-tipis di atas lembaran kalkun, bagi rata ke semua lembar." },
      { en: "Lay a cucumber stick at one end of each slice and roll it up tightly.", id: "Taruh satu batang timun di ujung setiap lembar, lalu gulung dengan rapat." },
      { en: "Put the rolls and any spare cucumber sticks in a closed box and keep it in the fridge.", id: "Masukkan gulungan dan sisa batang timun ke wadah tertutup, lalu simpan di kulkas." }
    ],
    notes: [
      { en: "For the office: pack the box in a cool bag with an ice pack, and eat it the same day.", id: "Untuk dibawa ke kantor: masukkan wadahnya ke tas pendingin dengan ice pack, dan habiskan di hari yang sama." }
    ]
  },

  // Pre-gym (PRE_GYM in program.js)
  'coffee-banana': {
    name: { en: "Black coffee + 1 banana", id: "Kopi hitam + 1 pisang" },
    serves: 1,
    time: 5,
    ing: [
      { item: 'banana', q: 1, u: '', en: "Banana, medium (about 120 g peeled)", id: "Pisang ukuran sedang (sekitar 120 g setelah dikupas)" },
      { item: 'black coffee', q: 250, u: 'ml', en: "Black coffee, no milk, no sugar", id: "Kopi hitam, tanpa susu, tanpa gula" }
    ],
    steps: [
      { en: "Make a cup of black coffee (about 250 ml), with no milk and no sugar.", id: "Buat secangkir kopi hitam (sekitar 250 ml), tanpa susu dan tanpa gula." },
      { en: "Serve it with 1 banana before the gym, around 07:00.", id: "Sajikan bersama 1 pisang sebelum ke gym, sekitar pukul 07.00." }
    ],
    notes: [
      { en: "This is optional: on some mornings nothing is eaten before the gym.", id: "Ini opsional: kadang-kadang tidak makan apa-apa sebelum ke gym." }
    ]
  }
};

// Batch cooks, one per meal with a batch in meals.js. item, q and u repeat meals.js
// (q filled in where meals.js has none). portions = servings it makes; fridgeDays and
// freezerMonths are how long it keeps.
export const KITCHEN_BATCH = {
  'greek-yogurt-power-bowl': {
    item: 'oats', q: 40, u: 'g',
    optional: true,
    portions: 1,
    fridgeDays: 2,
    when: { en: "The night before", id: "Malam sebelumnya" },
    ing: [
      { item: 'Greek yogurt', q: 250, u: 'g', en: "Greek yogurt, plain, 2 % fat", id: "Greek yogurt (yogurt kental), tawar, lemak 2 %" },
      { item: 'oats', q: 40, u: 'g', en: "Rolled oats", id: "Oat (havermut), jenis rolled oats" }
    ],
    steps: [
      { en: "The night before, weigh 250 g of Greek yogurt and 40 g of oats into a container with a lid and stir.", id: "Malam sebelumnya, timbang 250 g Greek yogurt dan 40 g oat ke dalam wadah bertutup, lalu aduk." },
      { en: "Close the lid and keep it in the fridge overnight.", id: "Tutup wadahnya dan simpan di kulkas semalaman." },
      { en: "In the morning, add 100 g of berries, 15 g of honey and 10 g of flaked almonds on top.", id: "Pagi harinya, tambahkan 100 g buah beri, 15 g madu, dan 10 g almond iris di atasnya." }
    ],
    notes: [
      { en: "Optional: only if a softer bowl is wanted. It can be mixed up to 2 days ahead; add the toppings only on the morning it is eaten.", id: "Opsional: hanya kalau mau tekstur yang lebih lembut. Boleh dicampur paling lama 2 hari sebelumnya; tambahkan topping hanya pada pagi hari saat dimakan." }
    ]
  },

  'chicken-shawarma-bowl': {
    item: 'chicken thigh', q: 700, u: 'g',
    portions: 4,
    fridgeDays: 3,
    freezerMonths: 3,
    when: { en: "Marinate on Saturday night, grill on Sunday", id: "Marinasi Sabtu malam, panggang hari Minggu" },
    ing: [
      { item: 'chicken thigh', q: 700, u: 'g', en: "Chicken thighs, boneless and skinless, raw", id: "Paha ayam tanpa tulang dan tanpa kulit, mentah" },
      { item: 'yogurt', q: 200, u: 'g', en: "Plain yogurt", id: "Yogurt tawar (plain)" },
      { item: 'garlic', q: 8, u: '', en: "Garlic cloves (about 40 g), crushed", id: "Siung bawang putih (sekitar 40 g), dihaluskan" },
      { item: 'lemon', q: 2, u: '', en: "Lemons, juice only (about 60 ml)", id: "Buah lemon, ambil airnya saja (sekitar 60 ml)" },
      { item: 'baharat', q: 8, u: 'g', en: "Baharat (about 4 teaspoons)", id: "Baharat (campuran rempah Arab), sekitar 4 sendok teh" },
      SALT
    ],
    steps: [
      { en: "Saturday night: in a large bowl, mix 200 g of yogurt, the 8 crushed garlic cloves, the juice of 2 lemons, 8 g of baharat and about 1 teaspoon of salt.", id: "Sabtu malam: di dalam mangkuk besar, campur 200 g yogurt, 8 siung bawang putih yang sudah dihaluskan, air dari 2 buah lemon, 8 g baharat, dan sekitar 1 sendok teh garam." },
      { en: "Weigh 700 g of chicken thighs, add them to the bowl and turn them until fully coated.", id: "Timbang 700 g paha ayam, masukkan ke mangkuk, lalu bolak-balik sampai terlumuri bumbu semua." },
      { en: "Cover the bowl and keep it in the fridge overnight, 8 to 24 hours.", id: "Tutup mangkuk dan simpan di kulkas semalaman, 8 sampai 24 jam." },
      { en: "Sunday: heat a grill pan or the barbecue on high heat until very hot.", id: "Hari Minggu: panaskan wajan panggangan atau panggangan arang dengan api besar sampai sangat panas." },
      { en: "Lift the chicken out of the marinade and throw away the leftover marinade.", id: "Angkat ayam dari bumbu marinasi, lalu buang sisa bumbunya." },
      { en: "Grill the thighs in batches, without crowding the pan, for 5 to 6 minutes on each side, until charred and cooked through: no pink inside, clear juices, 75 °C if you have a thermometer.", id: "Panggang paha ayam bertahap, jangan terlalu penuh, 5 sampai 6 menit per sisi, sampai ada bekas bakaran dan matang sampai dalam: tidak ada warna merah muda, airnya bening, 75 °C kalau ada termometer." },
      { en: "Spread the chicken on a clean tray to cool. Do not leave it out for more than 1 hour.", id: "Ratakan ayam di nampan bersih supaya cepat dingin. Jangan dibiarkan di luar kulkas lebih dari 1 jam." },
      { en: "Weigh all of the cooked chicken and divide that weight by 4.", id: "Timbang semua ayam yang sudah matang, lalu bagi beratnya dengan 4." },
      { en: "Put that amount into each of 4 airtight boxes and label the boxes Monday, Tuesday, Wednesday and Thursday.", id: "Masukkan jumlah itu ke masing-masing 4 wadah kedap udara, lalu beri label Senin, Selasa, Rabu, dan Kamis." },
      { en: "Put the Monday, Tuesday and Wednesday boxes in the fridge and the Thursday box in the freezer.", id: "Simpan wadah Senin, Selasa, dan Rabu di kulkas, dan wadah Kamis di freezer." },
      { en: "On Wednesday night, move the Thursday box from the freezer to the fridge to thaw.", id: "Rabu malam, pindahkan wadah Kamis dari freezer ke kulkas supaya mencair." },
      { en: "To serve: slice the chicken and heat it in the microwave for 1½ to 2 minutes, until steaming hot all the way through.", id: "Saat akan disajikan: iris ayam, lalu panaskan di microwave 1½ sampai 2 menit sampai panas mengepul sampai ke dalam." }
    ],
    notes: [
      { en: "700 g of raw chicken makes 4 lunches of 175 g raw each. Do not weigh out 180 g of cooked chicken per box: cooked chicken is lighter, so that would be about 250 g raw and about 100 kcal more.", id: "700 g ayam mentah menjadi 4 porsi makan siang, masing-masing 175 g mentah. Jangan menimbang 180 g ayam matang per wadah: ayam matang lebih ringan, jadi itu sama dengan sekitar 250 g mentah dan sekitar 100 kkal lebih banyak." },
      { en: "Cook the rice fresh each day. If rice is cooked ahead, cool it within 1 hour, keep it in the fridge, use it within 1 day and reheat it only once, until steaming hot.", id: "Masak nasi baru setiap hari. Kalau nasi dimasak lebih dulu, dinginkan dalam 1 jam, simpan di kulkas, pakai dalam 1 hari, dan panaskan hanya sekali sampai panas mengepul." },
      { en: "Raw chicken: wash your hands, the board, the bowl and the knife with soap afterwards.", id: "Ayam mentah: cuci tangan, talenan, mangkuk, dan pisau dengan sabun setelahnya." }
    ]
  },

  'beef-kofta-plate': {
    item: 'lean beef mince', q: 800, u: 'g',
    portions: 4,
    freezerMonths: 3,
    when: { en: "Any day, then straight into the freezer", id: "Hari apa saja, lalu langsung masuk freezer" },
    ing: [
      { item: 'lean beef mince', q: 800, u: 'g', en: "Lean beef mince, 10 % fat, raw", id: "Daging sapi giling rendah lemak (10 % lemak), mentah" },
      { item: 'onion', q: 160, u: 'g', en: "Onion", id: "Bawang bombay" },
      { item: 'parsley', q: 40, u: 'g', en: "Flat-leaf parsley", id: "Peterseli (daun parsley)" },
      { item: '7-spice', q: 8, u: 'g', en: "7-spice (about 4 teaspoons)", id: "7-spice (bumbu tujuh rempah Lebanon), sekitar 4 sendok teh" },
      SALT,
      PEPPER
    ],
    steps: [
      { en: "Grate 160 g of onion, squeeze out the juice with your hands and pour the juice away.", id: "Parut 160 g bawang bombay, peras dengan tangan, lalu buang airnya." },
      { en: "Chop 40 g of parsley very finely.", id: "Cincang 40 g peterseli sampai sangat halus." },
      { en: "In a large bowl, mix 800 g of mince with the onion, the parsley, 8 g of 7-spice, about 1 teaspoon of salt and some black pepper.", id: "Di dalam mangkuk besar, campur 800 g daging giling dengan bawang, peterseli, 8 g 7-spice, sekitar 1 sendok teh garam, dan sedikit lada hitam." },
      { en: "Knead with your hands for 3 minutes, until the mixture is sticky.", id: "Uleni dengan tangan selama 3 menit sampai adonan lengket." },
      { en: "Weigh the whole mixture and divide it into 4 equal portions.", id: "Timbang seluruh adonan, lalu bagi menjadi 4 porsi yang sama berat." },
      { en: "Shape each portion into 3 long kofta about 12 cm long, 12 in total. Leave out the skewers: they freeze better without.", id: "Bentuk setiap porsi menjadi 3 kofta panjang sekitar 12 cm, jadi totalnya 12. Tidak perlu tusuk sate: lebih mudah dibekukan tanpa tusukan." },
      { en: "Lay them on a tray lined with baking paper, not touching, and freeze for 2 hours until hard.", id: "Susun di loyang yang dialasi kertas roti, jangan sampai bersentuhan, lalu bekukan 2 jam sampai keras." },
      { en: "Put each portion of 3 kofta into its own freezer bag, press out the air and write the date on it.", id: "Masukkan setiap porsi (3 kofta) ke kantong freezer masing-masing, keluarkan udaranya, lalu tulis tanggalnya." },
      { en: "Keep them in the freezer for up to 3 months.", id: "Simpan di freezer paling lama 3 bulan." },
      { en: "To cook from frozen, without thawing: grill on medium heat for 14 to 16 minutes, turning every 2 to 3 minutes, until cooked through: no pink in the middle, 71 °C if you have a thermometer.", id: "Untuk memasak langsung dari beku, tanpa dicairkan: panggang dengan api sedang 14 sampai 16 menit, dibalik setiap 2 sampai 3 menit, sampai matang sampai dalam: tidak ada warna merah muda di tengah, 71 °C kalau ada termometer." }
    ],
    notes: [
      { en: "One bag is one portion: 200 g of raw mince, 3 kofta.", id: "Satu kantong adalah satu porsi: 200 g daging giling mentah, 3 kofta." },
      { en: "Raw mince: wash your hands, the board and the bowl with soap afterwards.", id: "Daging giling mentah: cuci tangan, talenan, dan mangkuk dengan sabun setelahnya." }
    ]
  },

  'eggs-labneh': {
    item: 'eggs', q: 6, u: '',
    portions: 3,
    fridgeDays: 7,
    when: { en: "Sunday", id: "Hari Minggu" },
    ing: [
      { item: 'eggs', q: 6, u: '', en: "Eggs (about 50 g each)", id: "Telur (sekitar 50 g per butir)" }
    ],
    steps: [
      { en: "Bring a pot of water to the boil, deep enough to cover the eggs by 2 cm.", id: "Didihkan air di panci, cukup banyak sampai telur terendam 2 cm." },
      { en: "Gently lower in 6 eggs with a spoon.", id: "Masukkan 6 telur pelan-pelan dengan sendok." },
      { en: "Boil for 10 minutes on medium heat.", id: "Rebus 10 menit dengan api sedang." },
      { en: "Move the eggs into a bowl of cold water for 10 minutes.", id: "Pindahkan telur ke mangkuk berisi air dingin selama 10 menit." },
      { en: "Dry them and put them, still in their shells, in a closed box in the fridge. Write the date on the box.", id: "Keringkan, lalu simpan telur yang masih berkulit dalam wadah tertutup di kulkas. Tulis tanggalnya di wadah." },
      { en: "Keep them for up to 7 days, and peel each egg just before serving.", id: "Tahan paling lama 7 hari. Kupas telur sesaat sebelum disajikan." }
    ],
    notes: [
      { en: "6 eggs make 3 snacks of 2 eggs.", id: "6 telur cukup untuk 3 porsi camilan, masing-masing 2 telur." }
    ]
  }
};

export const KITCHEN_UI = {
  id: {
    title: "Untuk dapur",
    recipe: "Resep",
    ingredients: "Bahan",
    alsoNeeded: "Juga perlu",
    method: "Cara memasak",
    notes: "Catatan",
    batch: "Masak untuk seminggu",
    serves: "Untuk {n} porsi",
    minutes: "{n} menit",
    hoursMinutes: "{h} jam {m} menit",
    protein: "Protein",
    kcal: "kkal",
    proteinG: "{n} g protein",
    kcalN: "{n} kkal",
    perServing: "Per porsi: {p} g protein, {k} kkal",
    scale: "Timbang semua bahan dengan timbangan dapur.",
    tare: "Nolkan timbangan: taruh wadah di atas timbangan, lalu tekan tombol TARE atau ZERO sampai angkanya 0.",
    oil: "Minyak juga ditimbang: taruh wajan atau mangkuk di atas timbangan, nolkan, lalu tuang minyaknya pelan-pelan.",
    noExtras: "Jangan tambah minyak, mentega, gula, atau saus di luar resep. Semua jumlah sudah dihitung.",
    ask: "Kalau ada yang kurang jelas, tanya dulu sebelum mengubah resep.",
    toTaste: "secukupnya",
    step: "Langkah {n}",
    portions: "{n} porsi",
    makes: "Jadi {n} porsi",
    fridgeDays: "Tahan {n} hari di kulkas",
    freezerMonths: "Tahan {n} bulan di freezer",
    when: "Kapan",
    optional: "Opsional",
    wait: "Waktu tunggu",
    raw: "mentah",
    cooked: "matang",
    dry: "kering",
    g: "g",
    ml: "ml",
    half: "½",
    cats: { breakfast: "Sarapan", lunch: "Makan siang", dinner: "Makan malam", snack: "Camilan", pre: "Sebelum gym" },
    lang: "Bahasa Indonesia",
    switchTo: "English",
    send: "Kirim ke dapur",
    share: "Bagikan",
    copy: "Salin teks",
    copied: "Teks tersalin",
    greeting: "Halo, ini resepnya:",
    thanks: "Terima kasih."
  },
  en: {
    title: "For the kitchen",
    recipe: "Recipe",
    ingredients: "Ingredients",
    alsoNeeded: "Also needed",
    method: "Method",
    notes: "Notes",
    batch: "Batch for the week",
    serves: "Serves {n}",
    minutes: "{n} minutes",
    hoursMinutes: "{h} h {m} min",
    protein: "Protein",
    kcal: "kcal",
    proteinG: "{n} g protein",
    kcalN: "{n} kcal",
    perServing: "Per serving: {p} g protein, {k} kcal",
    scale: "Weigh everything with a kitchen scale.",
    tare: "Set the scale to zero: put the container on the scale, then press TARE or ZERO until it reads 0.",
    oil: "Weigh the oil too: put the pan or bowl on the scale, set it to zero, then pour the oil in slowly.",
    noExtras: "Do not add oil, butter, sugar or sauce beyond the recipe. Every amount is counted.",
    ask: "If anything is unclear, ask before changing the recipe.",
    toTaste: "to taste",
    step: "Step {n}",
    portions: "{n} portions",
    makes: "Makes {n} portions",
    fridgeDays: "Keeps {n} days in the fridge",
    freezerMonths: "Keeps {n} months in the freezer",
    when: "When",
    optional: "Optional",
    wait: "Waiting time",
    raw: "raw",
    cooked: "cooked",
    dry: "dry",
    g: "g",
    ml: "ml",
    half: "½",
    cats: { breakfast: "Breakfast", lunch: "Lunch", dinner: "Dinner", snack: "Snack", pre: "Pre-gym" },
    lang: "English",
    switchTo: "Bahasa Indonesia",
    send: "Send to the kitchen",
    share: "Share",
    copy: "Copy text",
    copied: "Text copied",
    greeting: "Hello, here is the recipe:",
    thanks: "Thank you."
  }
};

export const KITCHEN_CHECKS = [
  "Grains are given dry, not cooked: rice and basmati 50 g dry with 120 ml of water (about 3 times its weight cooked, so about 150 g), freekeh 60 g dry with 200 ml of water (about 2.5 times, cracked freekeh, 20 minutes; whole freekeh 250 ml and 35 to 40 minutes), bulgur 55 g coarse with 130 ml of water (about 2.7 times). The cook is told to use all of the cooked grain from the dry weight, because the calories follow the dry weight, not the cooked one.",
  "Chicken shawarma bowl: meals.js says only 'rice'. It is written as basmati or other long-grain white rice.",
  "Shawarma batch: 700 g of raw thigh makes 4 portions of 175 g raw, slightly under the recipe's 180 g. Buy 720 g if you want it exact. The cook divides the cooked chicken by weight into 4 boxes and is warned not to weigh 180 g of cooked chicken (that would be about 250 g raw and about 100 kcal more). Boxes are labelled Monday to Thursday: 3 in the fridge (3 days) and Thursday's frozen and thawed on Wednesday night. Change the days if the lunches fall elsewhere.",
  "Rice cooked ahead is limited to 1 day in the fridge and one reheat (food safety). Cooked chicken 3 days in the fridge, boiled eggs 7 days in their shells, raw frozen kofta 3 months.",
  "The unmeasured items use the MEAL_NOTES portions: salad 100 g, large salad 200 g, fattoush 150 g, green beans 100 g, courgette and pepper 75 g each, cucumber 100 g, red onion 30 g, kofta onion 40 g, machboos tomato 120 g and onion 60 g, garlic 2 cloves (about 10 g), lemon juice of half (about 15 ml), parsley and coriander 10 g, chilli 1 (about 10 g), loomi 1, olive oil drizzle 5 g, spices 1 to 2 g, paprika rub 5 g, za'atar 3 g. Added to make them countable: chilli flakes 1 g, cumin 1 g, paprika 2 g, baharat 2 g, 7-spice 2 g, cinnamon 1 g, ice 100 g, black coffee 250 ml, banana 120 g peeled.",
  "Spices of 1 to 2 g are hard to read on a kitchen scale, so each also gives a teaspoon guide. The teaspoons are approximate.",
  "'Salad' (shawarma) is written as lettuce, cucumber and tomato with no dressing; 'large salad' (steak) as lettuce or mixed leaves, cucumber and tomato.",
  "Steak & sweet potato: meals.js puts all 10 g of oil on the salad. Here 3 g is rubbed on the steak so it does not stick and 7 g dresses the salad; the total is the same. The steak is written as medium (60 °C) for a 2 cm cut, with rare and well-done times in a note: tell the cook your preference. The 180 g is read as the weight after trimming. The sweet potato is steamed (boiled if there is no steamer), as the brief gives no method.",
  "Eggs & labneh toast: the eggs are scrambled in a dry non-stick pan so that all 5 g of oil goes on top as the brief's finish. Sumac (1 g) is added as an extra because the brief's method uses it.",
  "Chicken sausage shakshuka: '200 g chopped tomato' is written as fresh or tinned chopped tomatoes. Some chicken sausages are sold raw, so the cook checks one has no pink.",
  "Lightened chicken machboos: the brief gives no method. It is cooked the traditional way, with the chicken simmered in 250 ml of water with the spices and the rice cooked in 120 ml of that liquid, rather than the rice cooked separately as in the app's steps. Same ingredients, same ghee. The loomi is pierced, cooked whole and left on the plate.",
  "Beef kofta plate: 3 kofta of about 80 g per portion, grilled dry, cooked to 71 °C. The batch size (800 g, 4 portions, 12 kofta, shaped without skewers for the freezer, grilled from frozen in 14 to 16 minutes) is my choice; the brief gives no amount.",
  "Fattoush: costed in the app as 150 g lightly dressed (about 95 kcal). Shop or restaurant fattoush with fried bread and a lot of oil can be well over that. A note tells the cook how to make a light one (lettuce, tomato, cucumber, radish, mint, lemon, sumac, at most 5 g of oil, toasted bread); those parts are not in the app's ingredient list.",
  "Smoked chicken & potato: the smoker type is unknown, so it is written as 120 °C for 60 to 90 minutes to 75 °C, checked with a thermometer. The potatoes roast in the oven at 200 °C alongside rather than in the smoker. A note gives the oven-only version. 'Paprika rub' is a ready-made rub or smoked paprika alone.",
  "Grilled salmon + freekeh: the brief's 4 minutes skin-side down and 1 minute on the other side are kept, with a done check that allows 1 to 2 minutes more for a thick fillet. The pan stays dry; all 8 g of oil roasts the vegetables at 200 °C.",
  "Harra prawns + bulgur: prawns are weighed raw and peeled, thawed first if frozen. The bulgur is coarse and simmered; a note covers fine bulgur, which only needs soaking.",
  "Cottage cheese + dates: dates are medium, about 12 g each. If they are large Medjool, the cook weighs 24 g in total instead of counting 2.",
  "Times are honest estimates for a cook who weighs everything, so a few differ from the brief: harra prawns 20 minutes against the brief's 12 (the bulgur alone needs 15), and tuna & white bean salad 10 against 5.",
  "Most methods are standard home methods because the brief gives only a line or none: the grain cooking, grill times for the shawarma and kofta, the machboos, the prawns, the steak, the sweet potato, the green beans, the soft scramble, the boiled eggs and the roll-ups. The brief's own methods are kept where it gives one (salmon 4 + 1 minutes, shawarma marinated overnight and grilled hard, kofta with grated onion on skewers, smoker for the chicken, protein powder off the heat, shakshuka 10 + 5 minutes, steak rested 5 minutes).",
  "The Indonesian was written without a native speaker's check. Have the cooks read one recipe back to you before relying on all of them. Numbers in the Indonesian use a decimal comma (1,5 %) and times use a full stop (pukul 17.00)."
];
