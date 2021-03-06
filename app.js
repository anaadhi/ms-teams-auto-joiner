const {Builder, By, Key, until} = require('selenium-webdriver');
const schedule = require('node-schedule');

const user = require('./config.json');
const length = user.timings.length;

(async function example() {
    let driver = await new Builder().setChromeOptions('profile.default_content_setting_values.media_stream_mic: 1').forBrowser('chrome').build();


        await driver.get('https://teams.microsoft.com/');

        await driver.wait(until.elementLocated(By.name('loginfmt')), 5000).sendKeys(user.email + Key.ENTER)
        await sleep(1000)
        await driver.wait(until.elementLocated(By.name('passwd')), 5000).sendKeys(user.password + Key.ENTER)  
        await sleep(500)
        await driver.wait(until.elementLocated(By.id('idBtn_Back')), 5000).click()
        await sleep(500)
        await driver.wait(until.elementLocated(By.className('use-app-lnk')), 10000).click()
        await driver.wait(until.elementLocated(By.id('app-bar-ef56c0de-36fc-4ef8-b417-3d82ba9d073c')), 12000).click()
        await sleep(10000)
        await driver.wait(until.elementLocated(By.name('Work week')), 5000).click()
        await sleep(3000)
        await driver.wait(until.elementLocated(By.name('Day')), 12000).click()
        i = 0;
        job()
      function job(){
        schedule.scheduleJob({hour: user.timings[i].hour, minute: user.timings[i].minute},async () => {
          console.log('Job runs every day at 5:30AM');

          // join meeting
          await driver.wait(until.elementLocated(By.className('node_modules--msteams-bridges-components-calendar-event-card-dist-es-src-renderers-event-card-renderer-event-card-renderer__joinButton--1AeXc node_modules--msteams-bridges-components-calendar-event-card-dist-es-src-renderers-event-card-renderer-event-card-renderer__activeCall--25Ch-')), 10000).click()
          await driver.wait(until.elementLocated(By.className('join-btn ts-btn inset-border ts-btn-primary')), 10000).click()

          await sleep(1000)

          // open participants
          await driver.wait(until.elementLocated(By.id('roster-button')), 12000).click()

          // while number of people in meeting is more than n
          x = user.max;
          while (x > user.min){
            // get number of hands raised
                try{
                  y = await driver.wait(until.elementLocated(By.className('badge badge-over-icon')), 12000).getText()
                  y = Number(y)
                  console.log(y + " hands raised")
                }catch(e){console.log("no such element")}
                
                await sleep(5000)
              
                console.log(x + " participants")
              
                // get number of people in meeting
                x = await driver.wait(until.elementLocated(By.xpath('\/\/*[@id="page-content-wrapper"]/div[1]/div/calling-screen/div/div[2]/    meeting-panel-components/calling-roster/div/div[2]/div/div[1]/accordion/div/accordion-section[2]/div/calling-roster-section/div/div[1]/   button/span[3]')), 12000).getText()
                x = Number(x.replace(/\D/g,''));
          }

          // leave meeting 
            console.log("leave")
			      await driver.wait(until.elementLocated(By.id('app-bar-ef56c0de-36fc-4ef8-b417-3d82ba9d073c')), 12000).click()
			      await sleep(2000)
            await driver.wait(until.elementLocated(By.id('hangup-button')), 12000).click()

            // change i and restart function
            i += 1
            if (i<length){
                job()
            }
        });
      }
})();

function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  } 