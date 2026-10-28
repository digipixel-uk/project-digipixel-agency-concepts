/**
 * Playwright smoke test for DigiPixel agency previews.
 * Usage: PLAYWRIGHT_MODULE=/path/to/playwright node tests/smoke.cjs
 * Optional: BASE_URL=https://.../project-digipixel-agency-concepts/
 * No graphical desktop access: Chrome runs in headless mode.
 */
const path = require('node:path');
const {pathToFileURL} = require('node:url');
const fs = require('node:fs');
const assert = require('node:assert/strict');
const {chromium} = require(process.env.PLAYWRIGHT_MODULE || 'playwright');

const root = path.resolve(__dirname,'..');
const remote = (process.env.BASE_URL || '').replace(/\/+$/,'') + '/';
const siteURL = slug => process.env.BASE_URL ? remote + slug + '/' : pathToFileURL(path.join(root,'docs',slug,'index.html')).href;

(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_BIN || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
 let failures=0;
 const shots=path.join(root,'tests','screenshots');fs.mkdirSync(shots,{recursive:true});
 for(const slug of ['bold','editorial','interactive']) {
  for(const width of [1440,1024,768,390,320]){
   const page=await browser.newPage({viewport:{width,height:920},deviceScaleFactor:1});
   const errors=[];page.on('pageerror',e=>errors.push(e.message));
   await page.goto(siteURL(slug),{waitUntil:'load'});
   await page.evaluate(()=>{document.querySelectorAll('img').forEach(i=>i.loading='eager')});
   await page.evaluate(()=>document.fonts.ready);
   await page.waitForFunction(()=>[...document.images].every(i=>i.complete&&i.naturalWidth>0),null,{timeout:15000});
   const data=await page.evaluate(()=>({
    doc:document.documentElement.scrollWidth,view:innerWidth,
    brokenAnchors:[...document.querySelectorAll('a[href^="#"]')].filter(a=>!document.querySelector(a.getAttribute('href'))).map(a=>a.getAttribute('href')),
    h1:document.querySelectorAll('h1').length
   }));
   const ok = !errors.length&&data.doc<=width+1&&!data.brokenAnchors.length&&data.h1===1;
   if(!ok){console.error('FAIL',slug,width,{errors,...data});failures++;}
   if([1440,390].includes(width))await page.screenshot({path:path.join(shots,slug+'-'+width+'.png'),animations:'disabled'});
   if(width===390){
    const toggle=page.locator('.menu-toggle');await toggle.click();
    assert.equal(await toggle.getAttribute('aria-expanded'),'true',slug+' mobile menu');
    await toggle.click();
    if(slug==='interactive'){
     await page.locator('.ui-choice[data-type="lifestyle"]').click();
     assert.equal(await page.locator('#preview-brand').innerText(),'sunday studio.');
     assert.equal(await page.locator('#form-type').inputValue(),'lifestyle');
    }
    const form=page.locator('#demo-form');
    await form.locator('input[name="name"]').fill('Demo QA');
    await form.locator('input[name="email"]').fill('demo@example.com');
    const dropdown=form.locator('select');
    if(slug!=='interactive')await dropdown.selectOption({index:1});
    await form.locator('textarea').fill('Demonstration only');
    await form.locator('button[type="submit"]').click();
    const result=await form.locator('[role="status"]').innerText();
    if(!/not sent|not send|did not send|not transmitted|no data was sent|not sent or stored|has not sent/i.test(result)){console.error('FAIL form',slug,result);failures++;}
   }
   console.log('CHECK',slug,width,ok?'PASS':'ISSUE');
   await page.close();
  }
 }
 const page=await browser.newPage();
 await page.goto(process.env.BASE_URL?remote:pathToFileURL(path.join(root,'docs','index.html')).href,{waitUntil:'domcontentloaded'});
 for(const slug of ['bold','editorial','interactive']) {
  const card=page.locator('a.card[href="./'+slug+'/"]');
  if(await card.count()!==1){console.error('FAIL comparison card',slug);failures++;}
 }
 await page.close();await browser.close();
 console.log('TOTAL FAILURES',failures);process.exit(failures?1:0);
})().catch(err=>{console.error(err);process.exit(1)});
