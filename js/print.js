/* Printing to PDF: the dark screens get their own light document, built from whatever tab is open. */
import { h, $, t, tr, fmt, fmt1, mealName, allMeals, daySlots, totals, ex, exName, SESSIONS, WEEK, dayName, dateShort, weekNo } from './core.js';
import { weights } from './store.js';
import { qty, ingText, mealSteps, mealTip } from './meal.js';
import { moveEx, repsText, restFor } from './train.js';
import { SUPPLEMENTS, PLAN } from './data/program.js';

function mealBlock(m) {
  return h('article.pm', null, h('h3', null, mealName(m), h('span', { text: m.p + ' g protein · ' + fmt(m.k) + ' kcal' + (m.c != null ? ' · ' + m.c + ' g carbs · ' + m.f + ' g fat' : '') })),
    h('div.pcols', null,
      h('ul', null, ...(m.ing || []).map((i, n) => h('li', null, h('b', { text: qty(i) }), ' ', ingText(m, i, n), i.for ? ' (' + t('for the {x}', { x: t(i.for) }) + ')' : ''))),
      h('ol', null, ...mealSteps(m).map(s => h('li', { text: s })))),
    mealTip(m) ? h('p', { text: mealTip(m) }) : null);
}
function build(view) {
  const p = $('print'); p.innerHTML = '';
  p.append(h('header', null, h('b', { text: 'The Cut' }), h('span', { text: t('Week {n}', { n: weekNo() }) + ' · ' + new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) })));
  if (view === 'train') {
    p.append(h('h1', { text: t('The sessions') }), h('p', { text: t('All sets 3 × 8–15 with two reps in reserve. 90 s rest on compounds, 60 s on isolation.') }));
    Object.values(SESSIONS).forEach(s => {
      p.append(h('section', null, h('h2', { text: t('Session {s}', { s: s.id }) + ': ' + tr('sessions', s.id, 'title', s.title) + ' — ' + dayName(s.day) }), h('p', { text: tr('sessions', s.id, 'note', s.note) }),
        h('table', null, h('thead', null, h('tr', null, ...['', t('Exercise'), t('Sets'), t('Rest'), t('Cues')].map(x => h('th', { text: x })))),
          h('tbody', null, ...s.moves.map((m, i) => { const e = moveEx(s, i); return h('tr', null, h('td', { text: String(i + 1) }), h('td', null, h('b', { text: exName(e) }), m.hint ? h('div', { text: t(m.hint) }) : null), h('td', { text: repsText(m) }), h('td', { text: restFor(e) + ' s' }), h('td', { text: tr('exercises', e.id, 'cues', e.cues || []).join('. ') + '.' })); })))));
    });
    p.append(h('h2', { text: t('The week') }), h('ul', null, ...WEEK.map((w, i) => h('li', { text: dayName(i) + ': ' + (w.rest ? t('Full rest') : [w.gym ? t('Session {s}', { s: w.gym }) : null, w.tennis ? t('Tennis') : null].filter(Boolean).join(', ')) }))));
  } else if (view === 'eat') {
    p.append(h('h1', { text: t('The meal bank') }));
    ['breakfast', 'lunch', 'dinner', 'snack'].forEach(c => { const l = allMeals().filter(m => m.cat === c); if (l.length) { p.append(h('h2', { text: t({ breakfast: 'Breakfast', lunch: 'Lunch', dinner: 'Dinner', snack: 'Snacks' }[c]) })); l.forEach(m => p.append(mealBlock(m))); } });
    p.append(h('h2', { text: t('Supplements') }), h('ul', null, ...SUPPLEMENTS.take.map(x => h('li', null, h('b', { text: tr('supp', x.id, 'name', x.name) }), ' — ' + tr('supp', x.id, 'dose', x.dose) + '. ' + tr('supp', x.id, 'text', x.text)))), h('p', { text: t('Skip: BCAAs, glutamine, fat burners, testosterone boosters.') }));
  } else if (view === 'progress') {
    p.append(h('h1', { text: t('Progress') }));
    const ws = weights.all();
    p.append(h('h2', { text: t('Weigh-ins') }), ws.length ? h('table', null, h('tbody', null, ...ws.map(w => h('tr', null, h('td', { text: dateShort(w.d) }), h('td', { text: fmt1(w.kg) + ' kg' }))))) : h('p', { text: t('No weigh-ins yet.') }));
    p.append(h('h2', { text: t('The plan') }), h('p', { text: tr('plan', 'objective', 'v', PLAN.objective) }), h('ul', null, ...PLAN.numbers.map((n, i) => h('li', { text: n.v + ' ' + t(n.u) + ' — ' + tr('plan', 'n' + i, 'l', n.l) + '. ' + tr('plan', 'n' + i, 'n', n.n) }))), h('p', { text: tr('plan', 'hierarchy', 'v', PLAN.hierarchy) }));
  } else {
    const tt = totals();
    p.append(h('h1', { text: dayName(new Date().getDay()) }), h('p', { text: t('Protein {p} of 140 g. {k} kcal left of 2,200.', { p: tt.p, k: fmt(tt.left) }) }));
    p.append(h('table', null, h('tbody', null, ...daySlots().map(s => h('tr', null, h('td', { text: s.time }), h('td', null, h('b', { text: mealName(s.mealObj) }), h('div', { text: t(s.note) })), h('td', { text: s.mealObj.p + ' g · ' + fmt(s.mealObj.k) + ' kcal' }), h('td', { text: s.eaten ? t('Eaten') : '' }))))));
    daySlots().filter(s => !s.optional).forEach(s => p.append(mealBlock(s.mealObj)));
  }
}
export function initPrint(getView) {
  window.addEventListener('beforeprint', () => build(getView()));
}
