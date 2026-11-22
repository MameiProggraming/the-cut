/* Exercise content for the three sessions in training-brief.html, plus the approved swaps.
   Sets and reps live in program.js. This file holds what each move is, what it needs and how to do it.

   EQUIPMENT  every piece of kit any move below needs, for the "what this gym has" filter.
   EXERCISES  id -> move. pattern: squat | hinge | lunge | push | pull | carry | rotation | core | arms.
              kind sets the rest timer: compound 90 s, isolation 60 s.
              equipment lists every id needed to do the move; an empty list means none.
              load says how the last weight is recorded:
                total  machine or barbell total kg
                each   kg per dumbbell, kettlebell or hand
                stack  cable stack kg
                assist assistance kg (less is harder)
                body   bodyweight, optional added kg (also used for band moves, which have no kg)
              view, start and end brief the two-frame line drawing of each move.
   ALTS       programme move id -> 2 or 3 swaps, best match first. Swaps keep the movement pattern and
              where possible need different kit, so a missing machine always has a way out.
              Exception: leg press under the Bulgarian split squat is a squat, not a lunge. It stays
              because it is the swap Rashed has actually used. */

export const EQUIPMENT = [
  { id: 'dumbbells', name: 'Dumbbells' },
  { id: 'kettlebells', name: 'Kettlebells' },
  { id: 'barbell', name: 'Barbell and plates' },
  { id: 'ez-bar', name: 'EZ curl bar' },
  { id: 'trap-bar', name: 'Trap bar' },
  { id: 'squat-rack', name: 'Squat rack' },
  { id: 'bench-station', name: 'Bench press station' },
  { id: 'smith-machine', name: 'Smith machine' },
  { id: 'bench', name: 'Flat bench' },
  { id: 'adjustable-bench', name: 'Adjustable bench' },
  { id: 'box', name: 'Box or step' },
  { id: 'leg-press', name: 'Leg press' },
  { id: 'leg-curl', name: 'Leg curl machine' },
  { id: 'back-extension', name: 'Back extension bench' },
  { id: 'chest-press-machine', name: 'Chest press machine' },
  { id: 'shoulder-press-machine', name: 'Shoulder press machine' },
  { id: 'lateral-raise-machine', name: 'Lateral raise machine' },
  { id: 'pec-deck', name: 'Pec deck' },
  { id: 'lat-pulldown', name: 'Lat pulldown' },
  { id: 'assisted-pull-up', name: 'Assisted pull-up machine' },
  { id: 'cable-row', name: 'Seated cable row' },
  { id: 'cable', name: 'Adjustable cable pulley' },
  { id: 'rope', name: 'Rope attachment' },
  { id: 't-bar', name: 'T-bar row' },
  { id: 'pull-up-bar', name: 'Pull-up bar' },
  { id: 'captains-chair', name: "Captain's chair" },
  { id: 'resistance-band', name: 'Resistance band' },
  { id: 'stability-ball', name: 'Stability ball' },
  { id: 'slam-ball', name: 'Slam ball' }
];

export const EXERCISES = {

  /* ---------- Session A: Squat & Push ---------- */

  'leg-press': {
    name: 'Leg press',
    pattern: 'squat', kind: 'compound', equipment: ['leg-press'], load: 'total',
    cues: ['Feet shoulder-width, mid-platform', 'Lower until knees reach 90°', 'Drive through the whole foot'],
    mistake: 'Lowering so deep that the hips curl off the pad and the lower back rounds.',
    tennis: 'Quad and glute strength to load the legs in your serve and push hard into your first step.',
    view: 'side',
    start: 'Seated in the leg press, torso reclined about 45° on the back pad, feet on the platform above and in front of the hips, legs straight with knees soft.',
    end: 'Same seat, knees bent to 90° and drawn towards the chest, platform lowered, hips and lower back still flat on the pad.'
  },

  'goblet-squat': {
    name: 'Goblet squat',
    pattern: 'squat', kind: 'compound', equipment: ['dumbbells'], load: 'each',
    cues: ['Hold one dumbbell vertically at the chest', 'Sit between the heels, chest tall', 'Elbows track inside the knees'],
    mistake: 'Letting the heels lift and the knees cave inwards as you reach the bottom.',
    tennis: 'Trains a deep, upright squat under control, the position you need to stay low on wide balls.',
    view: 'side',
    start: 'Standing tall, feet slightly wider than hips with toes turned out a little, one dumbbell held vertically against the chest by its top end, elbows down.',
    end: 'Full squat, thighs at or just below parallel, torso upright with a slight forward lean, knees over the toes, dumbbell still at the chest, elbows inside the knees.'
  },

  'back-squat': {
    name: 'Back squat',
    pattern: 'squat', kind: 'compound', equipment: ['barbell', 'squat-rack'], load: 'total',
    cues: ['Bar across upper back, grip tight', 'Brace, then bend hips and knees together', 'Stand up without hips rising first'],
    mistake: 'Cutting depth short as the weight climbs, so the last sets become quarter squats.',
    tennis: 'Builds whole-leg strength under a free bar, the base for leg drive in the serve and first-step push-off.',
    view: 'side',
    start: 'Standing upright, feet shoulder-width, bar resting across the upper back below the neck, hands gripping it just outside the shoulders.',
    end: 'Bottom of the squat, thighs parallel to the floor, torso leaning forward about 30–40°, knees forward over the toes, bar stacked over mid-foot.'
  },

  'incline-db-press': {
    name: 'Incline dumbbell press',
    pattern: 'push', kind: 'compound', equipment: ['dumbbells', 'adjustable-bench'], load: 'each',
    cues: ['Bench at 30°, shoulder blades pinned back', 'Lower until dumbbells reach chest height', 'Press up and slightly in'],
    mistake: 'Flaring the elbows out to 90°, which loads the front of the shoulder instead of the chest.',
    tennis: 'Strengthens the chest and front shoulder that help accelerate the arm through the serve and forehand.',
    view: 'side',
    start: 'Lying on a bench inclined 30°, feet flat on the floor, arms straight above the upper chest holding a dumbbell in each hand, palms facing forward.',
    end: 'Same bench, elbows bent and lowered just below the bench line at about 45° from the torso, dumbbells beside the upper chest, forearms vertical.'
  },

  'incline-smith-press': {
    name: 'Incline Smith machine press',
    pattern: 'push', kind: 'compound', equipment: ['smith-machine', 'adjustable-bench'], load: 'total',
    cues: ['Bench at 30°, bar over upper chest', 'Grip just wider than shoulders', 'Touch the upper chest, press straight up'],
    mistake: 'Placing the bench so the bar lands on the neck or mid-chest instead of the upper chest.',
    tennis: 'Strengthens the chest that helps accelerate your arm through the serve, with a fixed path that spares tired stabilisers.',
    view: 'side',
    start: 'Lying on a bench inclined 30° under a Smith bar, feet flat, arms straight with the bar locked out directly above the upper chest.',
    end: 'Bar lowered vertically to touch the upper chest just below the collarbones, elbows bent and tucked about 45° from the torso.'
  },

  'machine-chest-press': {
    name: 'Machine chest press',
    pattern: 'push', kind: 'compound', equipment: ['chest-press-machine'], load: 'total',
    cues: ['Set handles level with mid-chest', 'Keep shoulder blades against the pad', 'Press out without locking the elbows'],
    mistake: 'Setting the seat too low so the handles sit at the shoulders and the front delts take over.',
    tennis: 'Trains the chest that accelerates your arm in the serve, with no balance demand to tire the shoulder before tennis.',
    view: 'side',
    start: 'Seated upright on the machine, back against the pad, hands on the handles level with mid-chest, elbows bent behind the torso line.',
    end: 'Same seat, arms extended forward at chest height with the elbows just short of locked, back still on the pad.'
  },

  'feet-elevated-push-up': {
    name: 'Feet-elevated push-up',
    pattern: 'push', kind: 'compound', equipment: ['bench'], load: 'body',
    cues: ['Feet on a bench, hands under shoulders', 'Body in one straight line', 'Lower chest to just above floor'],
    mistake: 'Letting the hips sag so the lower back arches and the chest never gets close to the floor.',
    tennis: 'Upper-chest pressing plus a rigid trunk, the bracing that carries leg drive into your serve.',
    view: 'side',
    start: 'Plank on straight arms, hands on the floor under the shoulders, feet resting on a flat bench behind, body angled head-down in one straight line.',
    end: 'Elbows bent about 45° from the torso, chest lowered to just above the floor, body still in one straight line from heels to head.'
  },

  'lat-pulldown': {
    name: 'Lat pulldown',
    pattern: 'pull', kind: 'compound', equipment: ['lat-pulldown'], load: 'stack',
    cues: ['Neutral-grip handle, thighs locked under pad', 'Lead with the elbows, not hands', 'Pull to upper chest, lean back slightly'],
    mistake: 'Leaning far back and swinging, which turns it into a row driven by momentum.',
    tennis: 'The lats help accelerate your arm through the serve and smash; a neutral grip is easier on the shoulder.',
    view: 'side',
    start: 'Seated at the pulldown, thighs under the pad, torso upright, arms fully extended overhead holding the neutral-grip handle, palms facing each other.',
    end: 'Torso leaning back about 10–15°, elbows bent and driven down beside the ribs, handle at the upper chest.'
  },

  'assisted-pull-up': {
    name: 'Assisted pull-up',
    pattern: 'pull', kind: 'compound', equipment: ['assisted-pull-up'], load: 'assist',
    cues: ['Kneel on the pad, neutral handles', 'Start from a full hang', 'Pull chest towards the handles'],
    mistake: 'Using so much assistance that sets finish easily, far more than two reps left in the tank.',
    tennis: 'Builds the pulling strength for full pull-ups, and the lats that help accelerate the arm in the serve.',
    view: 'side',
    start: 'Kneeling on the assist pad, arms fully extended overhead gripping the neutral handles, body hanging vertically.',
    end: 'Elbows bent and pulled down to the ribs, chin above the handles, body still vertical, knees on the pad.'
  },

  'single-arm-cable-pulldown': {
    name: 'Single-arm cable pulldown',
    pattern: 'pull', kind: 'compound', equipment: ['cable'], load: 'stack',
    cues: ['Kneel, pulley set high, one handle', 'Pull elbow down to your hip', 'Keep the ribs down, no twisting'],
    mistake: 'Rotating the torso to finish the rep instead of letting the shoulder blade drive down.',
    tennis: 'Trains each lat alone through a long overhead range, the same reach your serving arm works through.',
    view: 'front',
    start: 'Kneeling upright facing a high pulley, one arm fully extended overhead holding the handle, other hand on the hip, torso vertical.',
    end: 'Same kneel, working elbow bent and pulled down to the side of the ribs, hand at shoulder height, torso still vertical.'
  },

  'db-shoulder-press': {
    name: 'Dumbbell shoulder press',
    pattern: 'push', kind: 'compound', equipment: ['dumbbells', 'adjustable-bench'], load: 'each',
    cues: ['Bench upright, back flat on pad', 'Start with dumbbells at ear height', 'Press up until arms are straight'],
    mistake: 'Arching the lower back off the pad, which shifts the strain into the spine as sets get hard.',
    tennis: 'Overhead strength through the full range the serving arm uses, with the back supported so the shoulders do the work.',
    view: 'front',
    start: 'Seated on an upright bench, back on the pad, feet flat, dumbbells at ear height with elbows bent 90° and slightly forward of the torso, palms forward.',
    end: 'Same seat, arms straight overhead, dumbbells above the shoulders and close together, back still on the pad.'
  },

  'machine-shoulder-press': {
    name: 'Machine shoulder press',
    pattern: 'push', kind: 'compound', equipment: ['shoulder-press-machine'], load: 'total',
    cues: ['Seat so handles start at shoulders', 'Back and head against the pad', 'Press up, stop short of locking'],
    mistake: 'Setting the seat too low, so the handles start above the shoulders and half the range is lost.',
    tennis: 'Builds overhead strength for your serving shoulder on a fixed path that needs no balancing.',
    view: 'front',
    start: 'Seated upright, back against the pad, hands on the handles at shoulder height, elbows bent and below the hands.',
    end: 'Same seat, arms extended overhead with the elbows just short of locked, back still on the pad.'
  },

  'half-kneeling-db-press': {
    name: 'Half-kneeling dumbbell press',
    pattern: 'push', kind: 'compound', equipment: ['dumbbells'], load: 'each',
    cues: ['One dumbbell, kneel on that side', 'Squeeze the glute of the down leg', 'Press up without leaning away'],
    mistake: 'Leaning the torso away from the dumbbell to finish the rep instead of reaching straight up.',
    tennis: 'Trains one arm overhead with the trunk braced, the same one-sided demand your serve places on the shoulder and core.',
    view: 'front',
    start: 'Half-kneeling, down knee under the hip and front knee at 90°, torso upright, one dumbbell at shoulder height on the down-knee side, elbow bent below it.',
    end: 'Same kneel, working arm straight overhead with the dumbbell above the shoulder, torso still upright, free hand on the hip.'
  },

  'lateral-raise': {
    name: 'Lateral raises',
    pattern: 'push', kind: 'isolation', equipment: ['dumbbells'], load: 'each',
    cues: ['Slight bend in the elbows', 'Raise until arms reach shoulder height', 'Lead with the elbows, lower slowly'],
    mistake: 'Going too heavy and swinging the dumbbells up with the hips and traps.',
    tennis: 'Builds the side deltoids that keep the arm raised at serving height, adding shoulder endurance across long matches.',
    view: 'front',
    start: 'Standing tall, feet hip-width, arms hanging at the sides holding a dumbbell in each hand, elbows slightly bent.',
    end: 'Arms raised out to the sides to shoulder height, elbows slightly bent and level with the hands, torso upright.'
  },

  'cable-lateral-raise': {
    name: 'Cable lateral raise',
    pattern: 'push', kind: 'isolation', equipment: ['cable'], load: 'stack',
    cues: ['Pulley at the lowest setting', 'Stand side-on, cable across the body', 'Raise to shoulder height, lower slowly'],
    mistake: 'Leaning away and yanking the handle, so momentum does the work the deltoid should.',
    tennis: 'Keeps tension on the side deltoid at the bottom, where dumbbells go slack, building shoulder strength for serving.',
    view: 'front',
    start: 'Standing side-on to a low pulley, the far hand holding the handle in front of the hips with the cable crossing the body, arm nearly straight.',
    end: 'Working arm raised out to the side to shoulder height, cable running diagonally down across the body, torso upright.'
  },

  'machine-lateral-raise': {
    name: 'Machine lateral raise',
    pattern: 'push', kind: 'isolation', equipment: ['lateral-raise-machine'], load: 'total',
    cues: ['Shoulders level with the machine pivot', 'Arms against the pads, chest tall', 'Raise to shoulder height, lower slowly'],
    mistake: 'Shrugging the shoulders up to lift the pads, which shifts the work to the upper traps.',
    tennis: 'Isolates the side deltoids with no swinging possible, building the shoulder strength that holds the arm up in the serve.',
    view: 'front',
    start: 'Seated upright on the machine, shoulders aligned with the pivots, upper arms down by the sides against the pads, elbows bent.',
    end: 'Same seat, upper arms raised out to the sides to shoulder height against the pads, torso upright.'
  },

  'pallof-press': {
    name: 'Pallof press',
    pattern: 'rotation', kind: 'isolation', equipment: ['cable'], load: 'stack',
    cues: ['Stand side-on, pulley at chest height', 'Press the handle straight out', 'Resist the twist, hold two seconds'],
    mistake: 'Letting the hips and shoulders turn towards the pulley as the arms press out.',
    tennis: 'Trains the trunk to resist rotation, so the force from your legs reaches the racket instead of leaking out mid-stroke.',
    view: 'side',
    start: 'Standing side-on to a pulley set at chest height, feet shoulder-width, knees soft, both hands holding the handle against the sternum.',
    end: 'Same stance, arms pressed straight out in front of the sternum at chest height, torso and hips still square to the front.'
  },

  'band-pallof-press': {
    name: 'Band Pallof press',
    pattern: 'rotation', kind: 'isolation', equipment: ['resistance-band'], load: 'body',
    cues: ['Anchor band at chest height', 'Step out until the band is taut', 'Press out, hold, resist the twist'],
    mistake: 'Standing too close to the anchor, so the band is slack and the trunk barely works.',
    tennis: 'The same anti-rotation training as the cable version, keeping your trunk stiff so leg drive reaches the racket.',
    view: 'side',
    start: 'Standing side-on to a band anchored at chest height, feet shoulder-width, knees soft, both hands holding the band against the sternum.',
    end: 'Same stance, arms pressed straight out in front of the sternum, band stretched, torso square to the front.'
  },

  'plank-shoulder-tap': {
    name: 'Plank shoulder tap',
    pattern: 'rotation', kind: 'isolation', equipment: [], load: 'body',
    cues: ['High plank, feet wider than hips', 'Tap the opposite shoulder slowly', 'Keep the hips level, no rocking'],
    mistake: 'Rushing the taps and letting the hips rock side to side with each one.',
    tennis: 'Builds anti-rotation control with no equipment, the trunk bracing that transfers leg drive into your strokes.',
    view: 'side',
    start: 'High plank on straight arms, hands under the shoulders, feet slightly wider than hips, body in one straight line.',
    end: 'Same plank, one hand lifted to touch the opposite shoulder, weight on the other arm, hips still level.'
  },

  'farmers-carry': {
    name: "Farmer's carry",
    pattern: 'carry', kind: 'compound', equipment: ['dumbbells'], load: 'each',
    cues: ['Heavy dumbbells, shoulders down and back', 'Walk tall with short, quick steps', 'Squeeze the handles hard throughout'],
    mistake: 'Picking dumbbells that are too light, so it becomes a walk instead of a grip and trunk test.',
    tennis: 'Builds grip strength and trunk bracing under load, the bracing that carries leg drive into your serve and groundstrokes.',
    view: 'side',
    start: 'Standing tall, feet hip-width, arms straight at the sides holding a heavy dumbbell in each hand, shoulders back.',
    end: 'Mid-stride walking forward, one foot ahead of the other, torso upright, dumbbells hanging still at the sides.'
  },

  'kettlebell-farmers-carry': {
    name: "Kettlebell farmer's carry",
    pattern: 'carry', kind: 'compound', equipment: ['kettlebells'], load: 'each',
    cues: ['Kettlebells at your sides, arms long', 'Shoulders down, chest up', 'Walk with short, controlled steps'],
    mistake: 'Letting the shoulders round forward and the head drop as the grip starts to fade.',
    tennis: 'The same grip and trunk-bracing demand as the dumbbell carry, the bracing that carries leg drive into your strokes.',
    view: 'side',
    start: 'Standing tall, feet hip-width, arms straight at the sides holding a kettlebell in each hand, shoulders back.',
    end: 'Mid-stride walking forward, one foot ahead of the other, torso upright, kettlebells hanging at the sides.'
  },

  'trap-bar-carry': {
    name: 'Trap bar carry',
    pattern: 'carry', kind: 'compound', equipment: ['trap-bar'], load: 'total',
    cues: ['Stand centred inside the trap bar', 'Lift with legs, chest up', 'Walk tall with short, steady steps'],
    mistake: 'Letting the bar tip forwards or backwards because the hands are off-centre on the handles.',
    tennis: 'Lets you carry more total load than dumbbells allow, building the grip and trunk bracing your strokes rely on.',
    view: 'side',
    start: 'Standing tall inside a loaded trap bar, arms straight at the sides gripping the handles, bar held at hip height.',
    end: 'Mid-stride walking forward inside the bar, one foot ahead of the other, torso upright, arms straight, bar level at hip height.'
  },

  /* ---------- Session B: Hinge & Pull ---------- */

  'romanian-deadlift': {
    name: 'Romanian deadlift',
    pattern: 'hinge', kind: 'compound', equipment: ['barbell'], load: 'total',
    cues: ['Soft knees, push the hips back', 'Bar slides down the thighs', 'Lower until hamstrings stop you, back flat'],
    mistake: 'Chasing depth until the lower back rounds, instead of stopping when the hamstrings reach full stretch.',
    tennis: 'Builds hamstring and glute strength through a long range, which you use to brake hard and change direction.',
    view: 'side',
    start: 'Standing tall, feet hip-width, knees soft, arms straight holding the bar against the front of the thighs.',
    end: 'Hips pushed back, torso hinged forward to roughly 30° above horizontal with a flat back, knees slightly bent, bar at mid-shin close to the legs.'
  },

  'db-romanian-deadlift': {
    name: 'Dumbbell Romanian deadlift',
    pattern: 'hinge', kind: 'compound', equipment: ['dumbbells'], load: 'each',
    cues: ['Dumbbells against the front of thighs', 'Push the hips back, knees soft', 'Keep the dumbbells close to legs'],
    mistake: 'Letting the dumbbells drift away from the legs, which moves the strain into the lower back.',
    tennis: 'The same hamstring and glute work as the barbell version, building the braking strength you need to change direction.',
    view: 'side',
    start: 'Standing tall, feet hip-width, knees soft, a dumbbell in each hand resting against the front of the thighs.',
    end: 'Hips pushed back, torso hinged forward to roughly 30° above horizontal with a flat back, knees slightly bent, dumbbells at mid-shin.'
  },

  'cable-pull-through': {
    name: 'Cable pull-through',
    pattern: 'hinge', kind: 'compound', equipment: ['cable', 'rope'], load: 'stack',
    cues: ['Face away, rope between the legs', 'Hinge back until the hamstrings stretch', 'Drive the hips forward to stand'],
    mistake: 'Pulling with the arms or squatting down, instead of hinging at the hips with straight arms.',
    tennis: 'Trains the hinge with less spinal load than a barbell, building the hip drive behind your serve and first step.',
    view: 'side',
    start: 'Standing tall facing away from a low pulley, feet wider than hips, arms straight with the rope held in front of the hips, cable running back between the legs.',
    end: 'Hips hinged back, torso forward to about 45° with a flat back, knees slightly bent, hands drawn back between the thighs by the cable.'
  },

  'back-extension': {
    name: '45° back extension',
    pattern: 'hinge', kind: 'compound', equipment: ['back-extension'], load: 'body',
    cues: ['Pad just below the hip bones', 'Hinge at the hips, back flat', 'Rise to a straight line, no higher'],
    mistake: 'Arching past a straight line at the top, which loads the lower back instead of the glutes.',
    tennis: 'Builds glute and hamstring strength for hip drive, plus the back endurance that holds a low ready position.',
    view: 'side',
    start: 'Body in one straight line on a 45° back extension bench, heels under the foot pads, hip pad just below the hip bones, arms crossed on the chest.',
    end: 'Hinged forward at the hips over the pad, torso pointing down towards the floor with a flat back, legs still straight on the 45° line.'
  },

  'seated-cable-row': {
    name: 'Seated cable row',
    pattern: 'pull', kind: 'compound', equipment: ['cable-row'], load: 'stack',
    cues: ['Chest tall, slight bend in knees', 'Pull handle to the lower ribs', 'Squeeze shoulder blades, then reach forward'],
    mistake: 'Rocking the torso back and forth so momentum, not the back muscles, moves the weight.',
    tennis: 'Strengthens the mid-back muscles that control the shoulder blades, which a healthy serving shoulder depends on.',
    view: 'side',
    start: 'Seated on the row bench, feet on the platform, knees slightly bent, torso upright, arms extended forward holding the V-handle, shoulder blades drawn forward.',
    end: 'Torso still upright, elbows bent and pulled back past the ribs, handle touching the lower ribs, shoulder blades squeezed together.'
  },

  'flat-db-press': {
    name: 'Flat dumbbell press',
    pattern: 'push', kind: 'compound', equipment: ['dumbbells', 'bench'], load: 'each',
    cues: ['Shoulder blades squeezed back into the bench', 'Lower until dumbbells reach chest level', 'Feet planted, press up and in'],
    mistake: 'Dropping the dumbbells too deep with flared elbows, stretching the front of the shoulder under load.',
    tennis: 'Chest and triceps strength for the forward swing of the forehand and the acceleration phase of the serve.',
    view: 'side',
    start: 'Lying flat on a bench, feet on the floor, arms straight above the chest holding a dumbbell in each hand.',
    end: 'Elbows bent and lowered to about 45° from the torso, dumbbells at chest level beside the chest, forearms vertical.'
  },

  'barbell-bench-press': {
    name: 'Barbell bench press',
    pattern: 'push', kind: 'compound', equipment: ['barbell', 'bench-station'], load: 'total',
    cues: ['Eyes under the bar, shoulder blades pinned', 'Lower to the lower chest', 'Press back up over the shoulders'],
    mistake: 'Bouncing the bar off the chest, so momentum does the hardest part of the lift.',
    tennis: 'Heavier pressing for chest and triceps strength, which feed the arm acceleration in your serve and forehand.',
    view: 'side',
    start: 'Lying flat on the bench, feet on the floor, arms straight holding the bar directly above the shoulders, grip just wider than shoulder-width.',
    end: 'Bar lowered to touch the lower chest, elbows bent about 45–60° from the torso, forearms vertical under the bar.'
  },

  'push-up': {
    name: 'Push-up',
    pattern: 'push', kind: 'compound', equipment: [], load: 'body',
    cues: ['Hands just wider than shoulders', 'Squeeze glutes, body one straight line', 'Chest to a fist above floor'],
    mistake: 'Shortening the range as fatigue sets in, so the last reps stop halfway down.',
    tennis: 'Pressing strength with the shoulder blades free to move, which keeps the serratus working for a healthy serving shoulder.',
    view: 'side',
    start: 'Plank on straight arms, hands on the floor just wider than the shoulders, body in one straight line from heels to head.',
    end: 'Elbows bent about 45° from the torso, chest a fist-height above the floor, body still straight.'
  },

  'leg-curl': {
    name: 'Leg curl',
    pattern: 'hinge', kind: 'isolation', equipment: ['leg-curl'], load: 'total',
    cues: ['Knee in line with the machine pivot', 'Curl the pad fully, squeeze hard', 'Lower slowly over three seconds'],
    mistake: 'Letting the hips lift and swinging the weight up instead of curling with the hamstrings alone.',
    tennis: 'Strengthens the hamstrings at the knee, which work hard to slow the leg in every sprint to the ball.',
    view: 'side',
    start: 'Seated in the leg curl machine, back on the pad, thigh pad holding the thighs down, legs nearly straight with the roller behind the lower calves.',
    end: 'Same seat, knees bent past 90° with the roller pulled under the seat, thighs still pinned by the pad.'
  },

  'stability-ball-leg-curl': {
    name: 'Stability ball leg curl',
    pattern: 'hinge', kind: 'isolation', equipment: ['stability-ball'], load: 'body',
    cues: ['Heels on the ball, hips lifted', 'Curl the ball in, hips stay high', 'Roll out slowly to straight legs'],
    mistake: 'Letting the hips sag as the ball rolls in, which cuts the work the hamstrings do.',
    tennis: 'Works the hamstrings at both the hip and knee at once, the way they work when you sprint and stop.',
    view: 'side',
    start: 'Lying on the back, arms on the floor by the sides, heels on a stability ball, hips lifted so the body forms a straight line from shoulders to heels.',
    end: 'Hips still lifted high, knees bent to about 90°, ball rolled in towards the glutes with the feet flat on it.'
  },

  'slider-leg-curl': {
    name: 'Slider leg curl',
    pattern: 'hinge', kind: 'isolation', equipment: [], load: 'body',
    cues: ['Heels on sliders or a towel', 'Lift hips into a bridge first', 'Slide heels out slowly, hips high'],
    mistake: 'Sliding out too fast and dropping the hips, which skips the slow lowering that does the work.',
    tennis: 'A slow eccentric hamstring exercise with no machine, building the braking strength you use when stopping and turning.',
    view: 'side',
    start: 'Lying on the back on a smooth floor, heels on sliders or a folded towel, knees bent to 90°, hips lifted into a bridge.',
    end: 'Hips still lifted, legs slid out almost straight, body in a near-straight line from shoulders to heels.'
  },

  'face-pull': {
    name: 'Face pulls',
    pattern: 'pull', kind: 'isolation', equipment: ['cable', 'rope'], load: 'stack',
    cues: ['Pulley just above head height', 'Pull rope apart towards your eyes', 'Finish with knuckles back, elbows high'],
    mistake: 'Going too heavy and leaning back, turning it into a row that misses the rear shoulder.',
    tennis: 'Strengthens the rear shoulder and rotator cuff that slow your arm after every serve and are often weak in tennis players.',
    view: 'side',
    start: 'Standing facing a pulley set just above head height, arms extended forward and up holding the rope ends, palms facing each other.',
    end: 'Same stance, elbows bent and pulled back high and out to the sides, hands beside the ears with the rope spread apart.'
  },

  'band-face-pull': {
    name: 'Band face pull',
    pattern: 'pull', kind: 'isolation', equipment: ['resistance-band'], load: 'body',
    cues: ['Anchor the band at head height', 'Pull apart towards your eyes', 'Elbows high, squeeze rear shoulders, pause'],
    mistake: 'Shrugging the shoulders up towards the ears as the band stretches, letting the upper traps take over.',
    tennis: 'The same rear-shoulder and rotator-cuff work as the cable version; a band also works as a pre-tennis warm-up.',
    view: 'side',
    start: 'Standing facing a band anchored at head height, arms extended forward and up holding the band, band taut.',
    end: 'Elbows bent and pulled back high and wide, hands beside the ears, band stretched apart.'
  },

  'reverse-db-fly': {
    name: 'Reverse dumbbell fly',
    pattern: 'pull', kind: 'isolation', equipment: ['dumbbells'], load: 'each',
    cues: ['Hinge forward until torso is near flat', 'Raise arms out wide, elbows soft', 'Pause at the top, lower slowly'],
    mistake: 'Using weights so heavy that the torso bobs up and the traps do the lifting.',
    tennis: 'Strengthens the rear deltoids that help slow the arm after the serve, balancing all the forward pressing.',
    view: 'front',
    start: 'Standing hinged forward at the hips, torso nearly parallel to the floor, back flat, knees soft, arms hanging straight down holding a dumbbell in each hand.',
    end: 'Same hinge, arms raised out to the sides to torso level, elbows slightly bent, forming a T.'
  },

  'reverse-pec-deck': {
    name: 'Reverse pec deck',
    pattern: 'pull', kind: 'isolation', equipment: ['pec-deck'], load: 'total',
    cues: ['Face the pad, handles at shoulder height', 'Sweep arms back in a wide arc', 'Stop when arms line up with shoulders'],
    mistake: 'Pulling the shoulder blades together hard and shrugging, which shifts the work away from the rear deltoids.',
    tennis: 'Isolates the rear deltoids on a fixed path, the muscles that help decelerate your arm after every serve.',
    view: 'front',
    start: 'Seated facing the machine, chest against the pad, arms straight out in front at shoulder height holding the handles.',
    end: 'Same seat, arms swept back and out to the sides in line with the shoulders, elbows slightly bent, forming a T.'
  },

  'cable-woodchop': {
    name: 'Cable woodchop',
    pattern: 'rotation', kind: 'isolation', equipment: ['cable'], load: 'stack',
    cues: ['Pulley high, side-on, feet wide', 'Arms long, chop down to opposite knee', 'Turn from the hips, pivot back foot'],
    mistake: 'Pulling with the arms and bending forward instead of rotating through the hips and upper back.',
    tennis: 'Trains hips-to-trunk rotation on a high-to-low path, close to the path of your serve and smash follow-through.',
    view: 'front',
    start: 'Standing side-on to a high pulley, feet wider than shoulders, torso turned towards the pulley, both arms extended up and across holding the handle above the near shoulder.',
    end: 'Torso rotated away from the pulley, arms straight and pulled diagonally down across the body, hands outside the far knee, back foot pivoted.'
  },

  'band-woodchop': {
    name: 'Band woodchop',
    pattern: 'rotation', kind: 'isolation', equipment: ['resistance-band'], load: 'body',
    cues: ['Anchor the band high, stand side-on', 'Arms long, chop down across body', 'Turn from the hips, pivot back foot'],
    mistake: 'Standing so close to the anchor that the band is slack at the start of each chop.',
    tennis: 'The same high-to-low rotation as the cable chop, and easy to pack for a warm-up before tennis.',
    view: 'front',
    start: 'Standing side-on to a band anchored high, feet wider than shoulders, torso turned towards the anchor, arms extended up holding the band above the near shoulder.',
    end: 'Torso rotated away from the anchor, arms straight and pulled diagonally down across the body, hands outside the far knee, band stretched.'
  },

  'rotational-ball-slam': {
    name: 'Rotational ball slam',
    pattern: 'rotation', kind: 'isolation', equipment: ['slam-ball'], load: 'total',
    cues: ['Ball overhead, rise onto the toes', 'Slam down beside the outside foot', 'Turn the hips, alternate sides each rep'],
    mistake: 'Bending forward and throwing with the arms, instead of turning the hips and slamming through the trunk.',
    tennis: 'Trains fast rotation from the hips through the trunk, the speed your serve and smash need.',
    view: 'front',
    start: 'Standing tall, feet shoulder-width, up on the balls of the feet, arms extended overhead holding the slam ball, torso facing forward.',
    end: 'Hips and torso rotated to one side, knees bent, torso flexed forward, arms driven down with the ball hitting the floor outside the turned foot.'
  },

  'hanging-leg-raise': {
    name: 'Hanging leg raise',
    pattern: 'core', kind: 'isolation', equipment: ['pull-up-bar'], load: 'body',
    cues: ['Dead hang, shoulders engaged', 'Curl the pelvis up, not just legs', 'Lower slowly, no swinging'],
    mistake: 'Swinging up with momentum and lifting only with the hip flexors, so the abs do little.',
    tennis: 'Strengthens the abdominals that drive the trunk forward and down through the serve.',
    view: 'side',
    start: 'Hanging from a pull-up bar with arms straight and shoulders engaged, body vertical, legs straight down.',
    end: 'Still hanging, legs raised straight in front to at least hip height with the pelvis tilted up, hips flexed to about 90°.'
  },

  'captains-chair-leg-raise': {
    name: "Captain's chair leg raise",
    pattern: 'core', kind: 'isolation', equipment: ['captains-chair'], load: 'body',
    cues: ['Forearms on pads, back against the pad', 'Raise straight legs to hip height', 'Curl pelvis up, lower under control'],
    mistake: 'Kicking the legs up fast and dropping them, letting momentum and the hip flexors do the work.',
    tennis: 'The same trunk-flexion work as the hanging version without grip fatigue, training the abs that drive your serve.',
    view: 'side',
    start: "Supported on the forearm pads of a captain's chair, back against the back pad, legs hanging straight down.",
    end: 'Same support, legs raised straight in front to hip height, pelvis tilted up, back still against the pad.'
  },

  'hanging-knee-raise': {
    name: 'Hanging knee raise',
    pattern: 'core', kind: 'isolation', equipment: ['pull-up-bar'], load: 'body',
    cues: ['Dead hang, shoulders engaged', 'Draw knees up towards the chest', 'Tilt the pelvis up at the top'],
    mistake: 'Swinging the body to get the knees up instead of starting each rep from a still hang.',
    tennis: 'An easier step towards the full leg raise, training the abs that drive your trunk forward in the serve.',
    view: 'side',
    start: 'Hanging from a pull-up bar with arms straight, body vertical, legs straight down.',
    end: 'Still hanging, knees bent and drawn up above hip height towards the chest, pelvis tilted up.'
  },

  'reverse-crunch': {
    name: 'Reverse crunch',
    pattern: 'core', kind: 'isolation', equipment: [], load: 'body',
    cues: ['Lie flat, knees bent to 90°', 'Curl hips off the floor', 'Lower slowly without swinging the legs'],
    mistake: 'Swinging the legs back with momentum instead of curling the pelvis up with the abs.',
    tennis: 'Trains the same pelvis-curling ab action as the leg raise with no equipment, building the trunk flexion used in your serve.',
    view: 'side',
    start: 'Lying on the back on the floor, arms flat by the sides, hips and knees bent to 90° with the shins parallel to the floor.',
    end: 'Same position, pelvis curled up so the hips lift off the floor, knees drawn towards the chest, shoulders still down.'
  },

  /* ---------- Session C: Single Leg & Overhead ---------- */

  'bulgarian-split-squat': {
    name: 'Bulgarian split squat',
    pattern: 'lunge', kind: 'compound', equipment: ['dumbbells', 'bench'], load: 'each',
    cues: ['Back foot laces-down on the bench', 'Drop the back knee straight down', 'Drive up through the front foot'],
    mistake: 'Setting the front foot too close to the bench, so the heel lifts and the knee takes over.',
    tennis: 'Builds single-leg strength and balance, which matches how you push off and land on court, one leg at a time.',
    view: 'side',
    start: 'Split stance standing tall, front foot flat about a stride ahead of a flat bench, rear foot laces-down on the bench, dumbbells hanging at the sides.',
    end: 'Front knee bent to about 90° with the thigh near parallel, rear knee lowered towards the floor, torso upright with a slight forward lean.'
  },

  'reverse-lunge': {
    name: 'Reverse lunge',
    pattern: 'lunge', kind: 'compound', equipment: ['dumbbells'], load: 'each',
    cues: ['Step back into a long stride', 'Lower back knee to just above floor', 'Push through the front foot to return'],
    mistake: 'Taking a short step back, so the front knee shoots forward and the heel lifts.',
    tennis: 'Single-leg strength with less knee stress than forward lunges, matching how you push off one leg on court.',
    view: 'side',
    start: 'Standing tall, feet hip-width, a dumbbell in each hand hanging at the sides.',
    end: 'Long split stance after stepping back, front knee bent to about 90° over the ankle, back knee just above the floor, torso upright.'
  },

  'step-up': {
    name: 'Step-up',
    pattern: 'lunge', kind: 'compound', equipment: ['dumbbells', 'box'], load: 'each',
    cues: ['Box at knee height or lower', 'Whole foot on the box', 'Drive up through the top leg only'],
    mistake: 'Pushing off the bottom foot to bounce up, so the working leg does half the job.',
    tennis: 'Builds single-leg drive from a bent knee, the push you use out of a low stance on court.',
    view: 'side',
    start: 'Standing facing a knee-height box, one foot flat on top with the knee bent about 90°, other foot on the floor, dumbbells at the sides.',
    end: 'Standing tall on top of the box on the working leg, hip and knee straight, other foot lifted level beside it.'
  },

  'pull-up': {
    name: 'Pull-ups',
    pattern: 'pull', kind: 'compound', equipment: ['pull-up-bar'], load: 'body',
    cues: ['Start from a dead hang', 'Pull elbows down towards the hips', 'Chin over the bar, then lower slowly'],
    mistake: 'Kicking and swinging to get the chin over, then dropping fast instead of lowering under control.',
    tennis: 'Builds lat and upper-back strength relative to your bodyweight, which helps power the serve and smash.',
    view: 'front',
    start: 'Dead hang from the bar, arms fully straight overhead, hands just wider than the shoulders, palms facing away, legs straight below.',
    end: 'Elbows bent and pulled down to the sides of the ribs, chin above the bar, body vertical, legs still below.'
  },

  'band-assisted-pull-up': {
    name: 'Band-assisted pull-up',
    pattern: 'pull', kind: 'compound', equipment: ['pull-up-bar', 'resistance-band'], load: 'body',
    cues: ['Loop a long band over the bar', 'One foot or knee in the loop', 'Chin over the bar, lower slowly'],
    mistake: 'Letting the band catapult you out of the bottom instead of pulling from a dead hang.',
    tennis: 'Lets you train the full pull-up range now, building the lats that help power your serve.',
    view: 'front',
    start: 'Hanging from the bar with arms fully straight, a band looped over the bar running down under one knee, other leg straight, body vertical.',
    end: 'Elbows pulled down to the ribs, chin above the bar, band slackened, body vertical with the knee still in the band.'
  },

  'overhead-press': {
    name: 'Overhead press',
    pattern: 'push', kind: 'compound', equipment: ['barbell', 'squat-rack'], load: 'total',
    cues: ['Bar on the front shoulders, grip shoulder-width', 'Squeeze glutes, ribs down', 'Press straight up, head through at top'],
    mistake: 'Leaning back to press, turning it into a standing incline press that loads the lower back.',
    tennis: 'Standing overhead strength through a fully braced body, which supports a strong, healthy serving shoulder.',
    view: 'side',
    start: 'Standing tall, feet hip-width, bar resting on the front of the shoulders, hands just outside shoulder-width, elbows slightly in front of the bar.',
    end: 'Same stance, arms locked out overhead, bar directly above the middle of the feet, head pushed slightly forward under the bar.'
  },

  'standing-db-press': {
    name: 'Standing dumbbell press',
    pattern: 'push', kind: 'compound', equipment: ['dumbbells'], load: 'each',
    cues: ['Dumbbells at shoulders, palms facing in', 'Brace the trunk, glutes tight', 'Press up without leaning back'],
    mistake: 'Leaning back as the set gets hard, shifting the load from the shoulders to the lower back.',
    tennis: 'Each arm presses on its own while standing, building overhead strength and the trunk control your serve needs.',
    view: 'front',
    start: 'Standing tall, feet hip-width, a dumbbell in each hand at shoulder height, elbows bent below the hands, palms facing in.',
    end: 'Same stance, both arms straight overhead with the dumbbells above the shoulders, torso upright.'
  },

  'single-arm-db-row': {
    name: 'Single-arm dumbbell row',
    pattern: 'pull', kind: 'compound', equipment: ['dumbbells', 'bench'], load: 'each',
    cues: ['One knee and hand on bench', 'Back flat, parallel to the floor', 'Pull the dumbbell towards your hip'],
    mistake: 'Twisting the torso open to heave the weight up instead of rowing with a still back.',
    tennis: 'Trains each side of the upper back alone, building the shoulder-blade control a healthy serving shoulder relies on.',
    view: 'side',
    start: 'One knee and the same-side hand on a flat bench, other foot on the floor, back flat and parallel to the floor, working arm hanging straight down holding the dumbbell.',
    end: 'Same position, working elbow bent and pulled up past the torso, dumbbell beside the hip, back still flat.'
  },

  't-bar-row': {
    name: 'T-bar row',
    pattern: 'pull', kind: 'compound', equipment: ['t-bar'], load: 'total',
    cues: ['Hinge to about 45°, back flat', 'Pull the handle to the lower chest', 'Lower under control, no bouncing'],
    mistake: 'Standing more upright with each rep and jerking the weight up with the legs and lower back.',
    tennis: 'Heavy rowing for upper-back strength, balancing the pressing in the week and supporting a healthy serving shoulder.',
    view: 'side',
    start: 'Standing astride the T-bar, knees bent, hips hinged so the torso is about 45° to the floor with a flat back, arms straight holding the handle.',
    end: 'Same hinge, elbows bent and pulled back past the torso, handle at the lower chest, back still flat.'
  },

  'chest-supported-db-row': {
    name: 'Chest-supported dumbbell row',
    pattern: 'pull', kind: 'compound', equipment: ['dumbbells', 'adjustable-bench'], load: 'each',
    cues: ['Chest on bench set at 30°', 'Arms hang straight, shoulders relaxed down', 'Pull elbows back past the ribs'],
    mistake: 'Lifting the chest off the pad to cheat the last reps, which defeats the point of the support.',
    tennis: 'Strict upper-back work with the lower back supported, building the shoulder-blade control your serving shoulder relies on.',
    view: 'side',
    start: 'Lying face down on a bench inclined 30°, chest on the pad, feet on the floor, arms hanging straight down holding a dumbbell in each hand.',
    end: 'Same position, elbows bent and pulled back past the ribs, dumbbells beside the lower chest, chest still on the pad.'
  },

  'single-arm-cable-row': {
    name: 'Single-arm cable row',
    pattern: 'pull', kind: 'compound', equipment: ['cable'], load: 'stack',
    cues: ['Pulley at chest height, one handle', 'Staggered stance, brace the trunk', 'Pull the elbow back past the ribs'],
    mistake: 'Twisting the torso to finish the pull instead of letting the shoulder blade move back.',
    tennis: 'One-arm rowing while the trunk resists rotation, training the back and anti-rotation control your strokes rely on.',
    view: 'side',
    start: 'Standing in a staggered stance facing a pulley at chest height, torso upright, working arm extended forward holding the handle.',
    end: 'Same stance, working elbow bent and pulled back past the ribs, hand beside the lower chest, torso still square.'
  },

  'db-curl': {
    name: 'Dumbbell curl',
    pattern: 'arms', kind: 'isolation', equipment: ['dumbbells'], load: 'each',
    cues: ['Elbows pinned at your sides', 'Turn palms up as you curl', 'Lower all the way, slowly'],
    mistake: 'Swinging the torso and letting the elbows drift forward so the shoulders lift the weight.',
    tennis: 'Mainly for arm size; the biceps also help brake the elbow as your arm straightens through the serve.',
    view: 'side',
    start: 'Standing tall, arms straight at the sides holding a dumbbell in each hand, palms facing in, elbows by the ribs.',
    end: 'Elbows still by the ribs, forearms curled up so the dumbbells reach the front of the shoulders, palms facing up.'
  },

  'ez-bar-curl': {
    name: 'EZ-bar curl',
    pattern: 'arms', kind: 'isolation', equipment: ['ez-bar'], load: 'total',
    cues: ['Hold the angled grips, shoulder-width', 'Elbows still, curl to the chest', 'Lower to straight arms, no swing'],
    mistake: 'Rocking the hips forward and leaning back to start each rep, so the biceps miss the bottom range.',
    tennis: 'Lets you load both biceps heavier; the biceps help brake the elbow as your arm straightens through the serve.',
    view: 'side',
    start: 'Standing tall, arms straight down holding the EZ bar on its angled grips in front of the thighs, elbows by the ribs.',
    end: 'Elbows still by the ribs, forearms curled up so the bar reaches the upper chest.'
  },

  'hammer-curl': {
    name: 'Hammer curl',
    pattern: 'arms', kind: 'isolation', equipment: ['dumbbells'], load: 'each',
    cues: ['Palms face each other throughout', 'Elbows pinned at your sides', 'Curl to the shoulder, lower slowly'],
    mistake: 'Heaving with the back and shoulders on the last reps instead of keeping the elbows still.',
    tennis: 'Trains the brachialis and forearm as well as the biceps, all of which help brake the elbow in the serve.',
    view: 'side',
    start: 'Standing tall, arms straight at the sides holding a dumbbell in each hand, palms facing in, elbows by the ribs.',
    end: 'Elbows still by the ribs, forearms curled up with the palms still facing in, dumbbells at the front of the shoulders.'
  },

  'preacher-curl': {
    name: 'Single-arm preacher curl',
    pattern: 'arms', kind: 'isolation', equipment: ['dumbbells', 'adjustable-bench'], load: 'each',
    cues: ['Drape arm over incline bench back pad', 'Armpit snug against the top edge', 'Lower until almost straight, curl slowly'],
    mistake: 'Dropping fast into the bottom and bouncing out, where the stretched biceps is most exposed to strain.',
    tennis: 'Strict biceps work with no way to cheat; the biceps help brake the elbow as your arm straightens through the serve.',
    view: 'side',
    start: 'Standing behind an incline bench set steep, upper arm resting down the back pad with the armpit on the top edge, elbow nearly straight holding a dumbbell.',
    end: 'Upper arm still flat on the pad, elbow bent so the dumbbell is curled up towards the shoulder, forearm near vertical.'
  },

  'triceps-rope-pulldown': {
    name: 'Triceps rope pulldown',
    pattern: 'arms', kind: 'isolation', equipment: ['cable', 'rope'], load: 'stack',
    cues: ['Pulley high, elbows pinned to sides', 'Push down to straight arms', 'Spread the rope apart at the bottom'],
    mistake: 'Letting the elbows drift forward so the lats and shoulders help push the weight down.',
    tennis: 'The triceps straighten your elbow as the arm accelerates into the serve and smash.',
    view: 'side',
    start: 'Standing tall facing a high pulley, elbows bent to about 90° and tucked at the sides, hands holding the rope at chest height.',
    end: 'Elbows still at the sides, arms straight down, rope ends spread apart beside the thighs.'
  },

  'triceps-flat-pulldown': {
    name: 'Triceps flat-bar pulldown',
    pattern: 'arms', kind: 'isolation', equipment: ['cable'], load: 'stack',
    cues: ['Straight bar, overhand grip, shoulder-width', 'Elbows pinned to your sides', 'Press to straight arms, return to 90°'],
    mistake: 'Leaning over the bar and pushing with bodyweight, so the shoulders take the load off the triceps.',
    tennis: 'Lets you load the triceps heavier than the rope, building the elbow extension that accelerates your serve.',
    view: 'side',
    start: 'Standing tall facing a high pulley, elbows bent to about 90° and tucked at the sides, hands on a straight bar at chest height.',
    end: 'Elbows still at the sides, arms straight down, bar in front of the thighs.'
  },

  'skull-crusher': {
    name: 'Dumbbell skull crusher',
    pattern: 'arms', kind: 'isolation', equipment: ['dumbbells', 'bench'], load: 'each',
    cues: ['Lie flat, dumbbells above the shoulders', 'Palms in, upper arms stay still', 'Lower beside the ears, press back up'],
    mistake: 'Letting the upper arms swing back and forth, turning it into a pullover that unloads the triceps.',
    tennis: 'Trains the long head of the triceps in a lengthened position, adding to the elbow extension that drives your serve.',
    view: 'side',
    start: 'Lying flat on a bench, feet on the floor, arms straight above the shoulders holding a dumbbell in each hand, palms facing each other.',
    end: 'Upper arms still angled up over the shoulders, elbows bent to 90° or more, dumbbells lowered beside the ears.'
  },

  'suitcase-carry': {
    name: 'Suitcase carry',
    pattern: 'carry', kind: 'compound', equipment: ['dumbbells'], load: 'each',
    cues: ['One heavy dumbbell, one side only', 'Keep both shoulders level', 'Stand tall, no leaning either way'],
    mistake: 'Leaning away from the dumbbell to counterbalance it, which takes away the work the carry is for.',
    tennis: 'Trains the trunk to resist side-bending under a one-sided load, the stability you need when changing direction.',
    view: 'front',
    start: 'Standing tall, feet hip-width, one arm straight at the side holding a heavy dumbbell, other arm free, shoulders level.',
    end: 'Mid-stride walking forward, torso still vertical and shoulders level, dumbbell hanging at the side, no lean.'
  },

  'kettlebell-suitcase-carry': {
    name: 'Kettlebell suitcase carry',
    pattern: 'carry', kind: 'compound', equipment: ['kettlebells'], load: 'each',
    cues: ['One heavy kettlebell, one side only', 'Keep both shoulders level', 'Walk slowly, ribs stacked over hips'],
    mistake: 'Letting the loaded shoulder drop and the torso bend towards the kettlebell.',
    tennis: 'The same one-sided trunk challenge as the dumbbell version, building the side stability you use when changing direction.',
    view: 'front',
    start: 'Standing tall, feet hip-width, one arm straight at the side holding a heavy kettlebell, shoulders level.',
    end: 'Mid-stride walking forward, torso vertical, shoulders level, kettlebell hanging at the side.'
  },

  'waiters-walk': {
    name: "Waiter's walk",
    pattern: 'carry', kind: 'compound', equipment: ['dumbbells'], load: 'each',
    cues: ['One dumbbell locked out overhead', 'Biceps by the ear, wrist stacked', 'Walk slowly, ribs down, no leaning'],
    mistake: 'Letting the arm drift forward and the lower back arch to keep the weight up.',
    tennis: 'Trains the shoulder blade to stay stable with the arm overhead, the position your serving shoulder works in.',
    view: 'front',
    start: 'Standing tall, feet hip-width, one arm locked straight overhead holding a dumbbell, biceps beside the ear, other arm at the side.',
    end: 'Mid-stride walking forward, arm still vertical overhead, torso upright with no lean.'
  },

  /* ---------- Mobility M1: Hips & Legs ----------
     pattern and kind 'mobility': no rest timer, no weight, done on the floor at home. */

  'hip-90-90': {
    name: '90/90 hip switch',
    pattern: 'mobility', kind: 'mobility', equipment: [], load: 'none',
    cues: ['Sit tall, both knees bent to 90°', 'Swing both knees to the other side, hands off the floor if you can', 'Pause and lean over the front shin'],
    mistake: 'Collapsing back onto the hands, which takes the hips out of the movement.',
    tennis: 'Trains the hip rotation you load into on an open-stance forehand.',
    view: 'side',
    start: 'Seated on the floor, torso upright, front leg bent 90° in front of the body, back leg bent 90° behind, hands lightly on the floor beside the hips.',
    end: 'Both knees swung over to the other side, torso still upright, leaning slightly over the new front shin.'
  },
  'worlds-greatest-stretch': {
    name: 'World’s greatest stretch',
    pattern: 'mobility', kind: 'mobility', equipment: [], load: 'none',
    cues: ['Long lunge, back knee off the floor', 'Elbow down to the inside of the front foot', 'Turn and reach the same arm to the ceiling'],
    mistake: 'Letting the back knee sag and the hips drop, so the front of the back hip never stretches.',
    tennis: 'Opens the hip flexors, groin and upper back together, the lunge-and-turn shape of a wide forehand.',
    view: 'side',
    start: 'Deep lunge, front foot flat, back leg long with the knee just off the floor, both hands on the floor inside the front foot.',
    end: 'Same lunge, torso turned open towards the front leg, the inside arm reaching straight up to the ceiling, eyes on the hand.'
  },
  'couch-stretch': {
    name: 'Couch stretch',
    pattern: 'mobility', kind: 'mobility', equipment: [], load: 'none',
    cues: ['Back knee in the corner of wall and floor, shin up the wall or sofa', 'Squeeze the glute of the back leg', 'Come upright only as far as the ribs stay down'],
    mistake: 'Arching the lower back to get upright, which stretches nothing.',
    tennis: 'Lengthens the quads and hip flexors that tighten from split-steps and a day at the desk.',
    view: 'side',
    start: 'Kneeling lunge facing away from a wall, back knee on the floor against it, back shin vertical up the wall, front foot flat, hands on the front knee, torso leaning forward.',
    end: 'Same position with the torso upright, glute squeezed, hips pushed gently forward.'
  },
  'cossack-squat': {
    name: 'Cossack squat',
    pattern: 'mobility', kind: 'mobility', equipment: [], load: 'none',
    cues: ['Wide stance, toes turned slightly out', 'Sit down over one leg, the other straight with its toes up', 'Keep the heel of the bent leg down'],
    mistake: 'Folding forward at the waist instead of sitting the hips down.',
    tennis: 'Range and strength through the groin for wide, low reaches to the side.',
    view: 'front',
    start: 'Standing in a very wide stance, feet about twice shoulder-width, toes slightly out, hands together at the chest.',
    end: 'Hips sat down over one deeply bent leg, the other leg straight to the side with the toes pointing up, chest upright, hands at the chest.'
  },
  'deep-squat-hold': {
    name: 'Deep squat hold',
    pattern: 'mobility', kind: 'mobility', equipment: [], load: 'none',
    cues: ['Feet shoulder-width, toes out', 'Sink the hips below the knees, heels down', 'Elbows press the knees out, chest up'],
    mistake: 'Letting the heels lift. Hold a door frame, or stand the heels on a folded towel, until they stay down.',
    tennis: 'Owning the bottom of a squat makes low volleys and pick-ups easy on the hips and back.',
    view: 'side',
    start: 'Standing tall, feet shoulder-width, toes turned out, hands together at the chest.',
    end: 'Full deep squat, hips below the knees, heels flat, torso upright, elbows pressing the knees apart, hands together.'
  },
  'ankle-rocks': {
    name: 'Half-kneeling ankle rock',
    pattern: 'mobility', kind: 'mobility', equipment: [], load: 'none',
    cues: ['Half-kneeling, front foot a hand-length from the wall', 'Drive the front knee forward past the toes', 'The heel stays on the floor'],
    mistake: 'Letting the heel lift or the arch roll in to fake the range.',
    tennis: 'Ankle range for a lower first step and less strain on the knees and Achilles.',
    view: 'side',
    start: 'Half-kneeling, back knee on the floor, front foot flat with the shin vertical, hands resting on the front knee.',
    end: 'Same position with the front knee driven forward well past the toes, heel still flat on the floor, torso upright.'
  },
  'supine-hamstring-stretch': {
    name: 'Lying hamstring stretch',
    pattern: 'mobility', kind: 'mobility', equipment: [], load: 'none',
    cues: ['On your back, a towel or band round one foot', 'Raise the straight leg until you feel the back of the thigh', 'Keep the other leg flat on the floor'],
    mistake: 'Bending the knee and lifting the hip to get the leg higher.',
    tennis: 'Hamstring length to reach low balls, and an easier hinge for the lower back in the serve.',
    view: 'side',
    start: 'Lying on the back, both legs straight on the floor, a towel looped round one foot and held in both hands.',
    end: 'Same position with the towelled leg raised straight up towards vertical, the other leg flat on the floor.'
  },
  'pigeon-stretch': {
    name: 'Pigeon stretch',
    pattern: 'mobility', kind: 'mobility', equipment: [], load: 'none',
    cues: ['Front shin across the body, back leg long behind', 'Square the hips to the floor', 'Walk the hands forward and breathe into the outside of the hip'],
    mistake: 'Rolling onto the outside of the front hip, so the stretch disappears.',
    tennis: 'Releases the deep glute that drives every push-off and tightens from court movement.',
    view: 'side',
    start: 'Front leg folded in front with the shin across the body, back leg straight behind on the floor, torso upright on straight arms.',
    end: 'Same legs with the torso folded forward over the front shin, forearms on the floor.'
  },

  /* ---------- Mobility M2: Back & Shoulders ---------- */

  'cat-cow': {
    name: 'Cat-cow',
    pattern: 'mobility', kind: 'mobility', equipment: [], load: 'none',
    cues: ['Hands under the shoulders, knees under the hips', 'Round the whole back up, chin to chest', 'Then let the belly drop and lift the chest, slowly'],
    mistake: 'Rushing it, so only the neck and lower back move.',
    tennis: 'Gets every part of the spine moving before a day of turning and serving.',
    view: 'side',
    start: 'On all fours, hands under shoulders, knees under hips, back rounded up towards the ceiling, head dropped.',
    end: 'Same position with the back arched down, belly towards the floor, chest and head lifted.'
  },
  'thread-the-needle': {
    name: 'Thread the needle',
    pattern: 'mobility', kind: 'mobility', equipment: [], load: 'none',
    cues: ['On all fours, reach one arm to the ceiling', 'Then thread it under the other arm along the floor', 'Rest the shoulder and ear down, hips stay over the knees'],
    mistake: 'Letting the hips swing sideways, which turns the lower back instead of the upper back.',
    tennis: 'Upper-back rotation for the shoulder turn in groundstrokes and the serve.',
    view: 'side',
    start: 'On all fours, one arm reaching straight up to the ceiling, chest turned open.',
    end: 'Same knees, the reaching arm threaded under the body along the floor, that shoulder and the side of the head resting down.'
  },
  'open-book': {
    name: 'Open book',
    pattern: 'mobility', kind: 'mobility', equipment: [], load: 'none',
    cues: ['Lie on your side, knees bent to 90° and stacked', 'Sweep the top arm open to the other side', 'Eyes follow the hand, knees stay together'],
    mistake: 'Letting the top knee lift off the bottom one, so the hips turn and the upper back does nothing.',
    tennis: 'Upper-back rotation and an open chest: the coil and release behind every groundstroke.',
    view: 'side',
    start: 'Lying on one side, hips and knees bent to 90°, arms straight out in front together at shoulder height.',
    end: 'Same legs, the top arm swept open across to the other side, chest facing the ceiling.'
  },
  'child-pose-side-reach': {
    name: 'Child’s pose side reach',
    pattern: 'mobility', kind: 'mobility', equipment: [], load: 'none',
    cues: ['Sit back on your heels, arms long in front', 'Walk both hands to one side', 'Sink the hips back and breathe into the ribs'],
    mistake: 'Lifting the hips off the heels, which loses the stretch along the side.',
    tennis: 'Lengthens the lats and side body that the serve and smash load hardest.',
    view: 'side',
    start: 'Kneeling, sitting back on the heels, torso folded forward, arms reaching long on the floor in front.',
    end: 'Same fold, hips further back, arms walked over to one side, head between the arms.'
  },
  'sphinx': {
    name: 'Sphinx',
    pattern: 'mobility', kind: 'mobility', equipment: [], load: 'none',
    cues: ['Face down on your forearms, elbows under the shoulders', 'Let the hips and belly sink into the floor', 'Long neck, shoulders away from the ears'],
    mistake: 'Pushing up onto straight arms, so the lower back pinches.',
    tennis: 'Gentle extension for a lower back that sits bent all day and turns all evening.',
    view: 'side',
    start: 'Lying face down, legs long, forehead resting on stacked hands.',
    end: 'Chest lifted onto the forearms, elbows under the shoulders, hips and legs still on the floor, head level.'
  },
  'wall-slide': {
    name: 'Wall slide',
    pattern: 'mobility', kind: 'mobility', equipment: [], load: 'none',
    cues: ['Back, head and forearms against the wall', 'Slide the arms up without losing contact', 'Ribs down, lower back stays near the wall'],
    mistake: 'Arching the lower back off the wall to get the arms higher.',
    tennis: 'Shoulder-blade control for a clean, safe overhead position in the serve.',
    view: 'front',
    start: 'Standing with the back against a wall, arms in a goalpost: upper arms out at shoulder height, elbows bent 90°, forearms and backs of the hands on the wall.',
    end: 'Same stance, arms slid up the wall into a high V, elbows nearly straight, forearms still touching the wall.'
  },
  'sleeper-stretch': {
    name: 'Sleeper stretch',
    pattern: 'mobility', kind: 'mobility', equipment: [], load: 'none',
    cues: ['Lie on your serving side, upper arm out at shoulder height, elbow at 90°', 'With the other hand, ease the forearm towards the floor', 'Stop at a mild stretch, never pain at the front of the shoulder'],
    mistake: 'Rolling back off the shoulder or forcing the range. It should be a mild stretch at the back of the shoulder.',
    tennis: 'Restores the inward rotation the serving shoulder loses over a season.',
    view: 'side',
    start: 'Lying on one side, knees bent, the bottom arm straight out in front at shoulder height with the elbow bent 90° and the forearm pointing up.',
    end: 'Same position with the forearm eased down towards the floor in front, the top hand pressing it gently.'
  },
  'supine-twist': {
    name: 'Lying twist',
    pattern: 'mobility', kind: 'mobility', equipment: [], load: 'none',
    cues: ['On your back, arms out in a T', 'Lower both bent knees to one side', 'Keep both shoulders on the floor and breathe out'],
    mistake: 'Letting the opposite shoulder peel off the floor.',
    tennis: 'Unwinds the lower back and hips after a day of one-sided rotation.',
    view: 'side',
    start: 'Lying on the back, knees bent with feet flat, arms out to the sides.',
    end: 'Same position with both knees lowered together to one side towards the floor, shoulders still flat.'
  }
};

/* Programme move -> approved swaps, best match first. */
export const ALTS = {
  // Session A
  'leg-press': ['goblet-squat', 'back-squat'],
  'incline-db-press': ['incline-smith-press', 'machine-chest-press', 'feet-elevated-push-up'],
  'lat-pulldown': ['assisted-pull-up', 'single-arm-cable-pulldown', 'pull-up'],
  'db-shoulder-press': ['machine-shoulder-press', 'overhead-press', 'half-kneeling-db-press'],
  'lateral-raise': ['cable-lateral-raise', 'machine-lateral-raise'],
  'pallof-press': ['band-pallof-press', 'plank-shoulder-tap'],
  'farmers-carry': ['kettlebell-farmers-carry', 'trap-bar-carry'],
  // Session B
  'romanian-deadlift': ['db-romanian-deadlift', 'cable-pull-through', 'back-extension'],
  'seated-cable-row': ['single-arm-db-row', 't-bar-row', 'chest-supported-db-row'],
  'flat-db-press': ['barbell-bench-press', 'machine-chest-press', 'push-up'],
  'leg-curl': ['stability-ball-leg-curl', 'slider-leg-curl'],
  'face-pull': ['band-face-pull', 'reverse-db-fly', 'reverse-pec-deck'],
  'cable-woodchop': ['band-woodchop', 'rotational-ball-slam'],
  'hanging-leg-raise': ['captains-chair-leg-raise', 'hanging-knee-raise', 'reverse-crunch'],
  // Session C
  'bulgarian-split-squat': ['leg-press', 'reverse-lunge', 'step-up'],
  'pull-up': ['assisted-pull-up', 'band-assisted-pull-up', 'lat-pulldown'],
  'overhead-press': ['standing-db-press', 'machine-shoulder-press', 'db-shoulder-press'],
  'single-arm-db-row': ['single-arm-cable-row', 't-bar-row', 'seated-cable-row'],
  'db-curl': ['ez-bar-curl', 'preacher-curl', 'hammer-curl'],
  'triceps-rope-pulldown': ['triceps-flat-pulldown', 'skull-crusher'],
  'suitcase-carry': ['kettlebell-suitcase-carry', 'waiters-walk']
};
