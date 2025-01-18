//@ts-nocheck
document.addEventListener('nav-ext-transform', transform, {once: true})

/** @param {Event & { detail: { data?: {question: string; answer: string;}[] } }} ev */
function transform(ev) {
  const result = JSON.parse(ev.detail);

  if(!Array.isArray(result)) return;

  /**@type {{question: string; answer: string;}[]} data*/
  const data = [];

  for(const item of result)
  {
    data.push({question: window.TeXZilla.filterString(item.question), answer: window.TeXZilla.filterString(item.answer)})
  }

  document.dispatchEvent(new CustomEvent('nav-ext-data', {detail: JSON.stringify(data)}))
}