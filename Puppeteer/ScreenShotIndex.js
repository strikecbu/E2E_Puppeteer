const puppeteer = require('puppeteer');
const fs = require('fs');
(async () => {
    const productionMode = true;
    const browser = await puppeteer.launch({headless:false});
    const page = await browser.newPage();
	await page.goto('http://localhost:8085/extfunc05/page/index');
    await page.setViewport({width:1024, height:1080});
    let now = new Date(),
        year = now.getFullYear(),
        month = now.getMonth() + 1,
        date = now.getDate(),
        hh = now.getHours(),
        mm = now.getMinutes(),
        format = "" + year + month + date + hh + mm;
    let imageBaseFolder = './ImageShot/' + format + '/';
    try {
        if (!fs.existsSync(imageBaseFolder)) {
            fs.mkdirSync(imageBaseFolder);
        }
    } catch (e) {
        imageBaseFolder = './ImageShot/';
    }
    console.log("imageBaseFolder: " + imageBaseFolder);
	// const documentSize = await page.evaluate(() => {
    //     console.log("clientHeight : " + document.body.clientHeight);
	// 	return {
	// 		width: document.documentElement.clientWidth,
	// 		height : document.body.clientHeight,
	// 	}
    // });
    await page.evaluate(() => {
        $('#ino').val('');
        $('#bod').val('');
        return Promise.resolve();
    });
    await page.type("#ino", "M123456789");
    await page.type("#bod", "19800101");
    if(productionMode) 
        await page.screenshot({path: imageBaseFolder + "index_load.png", fullPage: true});
    await page.click("#sendbtn");
    
    // =============== 1stOtp ===============
    try{
        console.log("loading 1stOtp...");
        await page.waitForNavigation({waitUntil: 'load'})
    } catch(e){
        console.log("waitting to long...");
        if(productionMode) 
            await page.screenshot({path:imageBaseFolder + "index_login_fail.png", fullPage: true});
    }
    if(productionMode) 
        await page.screenshot({path:imageBaseFolder + "1stOtp.png", fullPage: true});

    // ===== data setting ===== 
    await page.click("#RadioGroup4_0"); //點同意

    await page.type("#OTP", "111111"); //填入OTP
    // ===== data setting end ===== 

    if(productionMode) 
            await page.screenshot({path:imageBaseFolder + "1stOtp_fill_data.png", fullPage: true});
    
    await page.click("#sendbtn");

    // =============== chooseCard ===============
    try{
        console.log("loading chooseCard...");
        await page.waitForNavigation({waitUntil: 'load'})
    } catch(e){
        console.log("waitting to long...");
        if(productionMode) 
            await page.screenshot({path:imageBaseFolder + "1stOtp_fail.png", fullPage: true});
    }

	await browser.close();
})();