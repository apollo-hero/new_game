const { validationResult } = require('express-validator'); 
const ResponseData = require('../utils/ResponseData'); 
const { Op, fn, col, literal, Model} = require('sequelize'); 
const Models = require('../models'); 
 
const request = require('request'); 
 
const axios = require('axios'); 

const stripe = require('stripe')('sk_test_51P1NhQP8bC8pI0cCopNmUPCGVEkEIjPY5JZj5eI6hwEWCeGx8eDvRKSDCmpEQjQugfqoj9X1vMik9E9yZFdwYwZy00p9gBZMnm');
 
const jwt = require('jsonwebtoken'); 
const { JWT_SECRET_KEY } = require("../config/server.config"); 
const url = require('url'); 
 
const items = require("../_mock/Items"); 
 
const PayPalService = require("../services/IpnService"); 
 
const ControlModel = Models.control; 
 
const DonateModel = Models.donate_log; 
 
const ShopLogModel =Models.shop_log; 
 
const WheelLogModel = Models.wheel_log; 
 
const ActiveLogModel = Models.active_log; 
 
const UserModel = Models.user; 
 
const CoinModel = Models.coin; 
 
const CategoryModel = Models.category; 
 
const ShopItemModel = Models.shop_item; 
 
const MailModel = Models.mail; 
 
const LinkModel = Models.link; 
 
const WheelItemModel = Models.wheel_item; 
 
const PaymentWebModel = Models.payment_web; 
 
const EventModel = Models.event; 
 
const updateSetting = async (req, res) => { 
    const validResult = validationResult(req); 
 
    if (!validResult.isEmpty) { 
        return ResponseData.warning(res, validResult.array()[0].msg); 
    } 
 
    try { 
        const user = req.user; 
        if (user == null) { 
            return ResponseData.error(res, 'Not registered token & user',); 
        } 
 
        const control = await ControlModel.findByPk(1); 
        if( !control ) { 
            const control = new ControlModel(); 
            control.name = req.body.site_name; 
            control.x86_download = req.body.x86_download_link; 
            control.x64_download = req.body.x64_download_link; 
            control.domain = req.body.site_domain; 
            control.status = req.body.site_status; 
            control.store_status = req.body.store_status; 
            control.captcha_key = req.body.site_captcha; 
            control.roulette_price = req.body.site_roulette_price; 
            control.coin_discount = req.body.site_coin_discount; 
            control.coin_bonus = req.body.site_coin_bonus; 
            control.coin_status = req.body.coin_status; 
            control.discord_link = req.body.site_discord_link; 
            control.ragezone_link = req.body.site_ragezone_link; 
            control.elitepvpers_link = req.body.site_elite_link; 
            control.inforge_link = req.body.site_inforge_link; 
            control.roulette_status = req.body.wheel_status; 
            control.register_status = req.body.register_status; 
            control.login_status = req.body.login_status; 
            control.jackpot_status = req.body.jackpot_status; 
     
            await control.save(); 
        } else { 
            control.name = req.body.site_name; 
            control.domain = req.body.site_domain; 
            control.status = req.body.site_status; 
            control.store_status = req.body.store_status; 
            control.captcha_key = req.body.site_captcha; 
            control.roulette_price = req.body.site_roulette_price; 
            control.coin_discount = req.body.site_coin_discount; 
            control.coin_bonus = req.body.site_coin_bonus; 
            control.coin_status = req.body.coin_status; 
            control.roulette_status = req.body.wheel_status; 
            control.register_status = req.body.register_status; 
            control.login_status = req.body.login_status; 
            control.jackpot_status = req.body.jackpot_status; 
     
            await control.save(); 
        } 
 
        const link = await LinkModel.findByPk(1); 
        if(!link){ 
            const link = new LinkModel(); 
            link.x64_download = req.body.x64_download_link; 
            link.x86_download = req.body.x86_download_link; 
            link.discord = req.body.site_discord_link; 
            link.inforge = req.body.site_inforge_link; 
            link.ragezone = req.body.site_ragezone_link; 
            link.elite = req.body.site_elite_link; 
 
            await link.save(); 
        } else { 
            link.x64_download = req.body.x64_download_link; 
            link.x86_download = req.body.x86_download_link; 
            link.discord = req.body.site_discord_link; 
            link.inforge = req.body.site_inforge_link; 
            link.ragezone = req.body.site_ragezone_link; 
            link.elite = req.body.site_elite_link; 
 
            await link.save(); 
        } 
         
        ResponseData.ok(res, "Game was changed"); 
    } 
    catch (err) { 
        console.log(err); 
        return ResponseData.error(res, "", err); 
    } 
} 
 
const getLogs = async (req, res) => {
    try {
        const user = req.user;
        let donate_log = [], shop_log = [], wheel_log = [], active_log = [];
        if(user.Authority == 30000){
            donate_log = await PaymentWebModel.findAll({ 
                where: { PayerID: req.user.Id}, 
                include: [{
                    model: UserModel,
                    attributes: ['Authority','Name'],
                }],
                order: [
                    ['Date', 'DESC'],
                ]
            }); 
            shop_log = await ShopLogModel.findAll({ 
                where: { user_id: req.user.Id}, 
                include: [{
                    model: UserModel,
                    attributes: ['Authority','Name'],
                }],
                order: [
                    ['date', 'DESC'],
                ],
            }); 
            wheel_log = await WheelLogModel.findAll({ 
                where: { user_id: req.user.Id}, 
                include: [{
                    model: UserModel,
                    attributes: ['Authority','Name'],
                }],
                order: [
                    ['date', 'DESC'],
                ],
            }); 
            active_log = await ActiveLogModel.findAll({ 
                where: { user_id: req.user.Id}, 
                include: [{
                    model: UserModel,
                    attributes: ['Authority','Name'],
                }],
                order: [
                    ['date', 'DESC'],
                ]
            }); 
        } else {
            donate_log = await PaymentWebModel.findAll({ 
                where: { PayerID: req.user.Id}, 
                include: [{
                    model: UserModel,
                    attributes: ['Authority','Name'],
                    where: {
                        Authority: {
                        [Op.not]: 30000
                        }
                    }
                }],
                order: [
                    ['Date', 'DESC'],
                ],
            }); 
            shop_log = await ShopLogModel.findAll({ 
                where: { user_id: req.user.Id}, 
                include: [{
                    model: UserModel,
                    attributes: ['Authority','Name'],
                    where: {
                        Authority: {
                        [Op.not]: 30000
                        }
                    }
                }],
                order: [
                    ['date', 'DESC'],
                ],
            }); 
            wheel_log = await WheelLogModel.findAll({ 
                where: { user_id: req.user.Id}, 
                include: [{
                    model: UserModel,
                    attributes: ['Authority','Name'],
                    where: {
                        Authority: {
                        [Op.not]: 30000
                        }
                    }
                }],
                order: [
                    ['date', 'DESC'],
                ]
        }); 
            active_log = await ActiveLogModel.findAll({ 
                where: { user_id: req.user.Id}, 
                include: [{
                    model: UserModel,
                    attributes: ['Authority','Name'],
                    where: {
                        Authority: {
                        [Op.not]: 30000
                        }
                    }
                }],
                order: [
                    ['date', 'DESC'],
                ],
            }); 
        }
        
         
        ResponseData.ok(res, "Game logs", { donate_log: donate_log, shop_log: shop_log, wheel_log: wheel_log, active_log: active_log}); 
    } catch (err) { 
        console.log(err); 
        return ResponseData.error(res, "", err); 
    }
} 
 
const getCoins = async (req, res) => { 
    const coins = await CoinModel.findAll(); 
     
    ResponseData.ok(res, "Game Coins", { coins: coins}); 
} 
 
const getCategories = async (req, res) => { 
    const categories = await CategoryModel.findAll({ where: { visibility: 1 }}); 
 
    ResponseData.ok(res, "Game Categories", { categories: categories}); 
} 
 
const getShopItems = async (req, res) => { 
    try {
        const shop_items = await ShopItemModel.findAll({
             include: [CategoryModel],
             order: [
                ['n_number', 'ASC'],
            ],
            }); 
 
        const updatedShopItems = shop_items.map(item => { 
            const filteredDatas = items.filter(t => t.id === item.vnum);
            if(filteredDatas.length > 0){
                return { price: item.price, category: item.category, vnum: item.vnum, amount: item.amount, categoryId: item.categoryId, name: filteredDatas[0].name.uk, desc: filteredDatas[0].desc.uk, itemType: filteredDatas[0].itemType, itemSubType: filteredDatas[0].itemSubType, iconId: filteredDatas[0].iconId }; 
            } else {
                return null;
            }
        }); 

        const data = updatedShopItems.filter((t)=> t != null);
     
        ResponseData.ok(res, "Game Shop Items", { shop_items: data }); 
    } catch (err) { 
        console.log(err); 
        return ResponseData.error(res, "", err); 
    }
    
} 
 
const buyItem = async (req, res) => { 
    try {
        const user = await UserModel.findOne({ 
            where: { Id: req.user.Id }, 
        }); 
     
        if( user.Coins < req.body.totalPrice ){ 
            ResponseData.ok(res, "Your balance is not enough!"); 
        } 
     
        const orderData = req.body.orderData; 
     
        for( const order of orderData ){ 
            const itemId = order.itemId; 
            const quantity = order.quantity; 
            const character = order.character; 
     
            const item = items.filter(t => t.id == itemId)[0];  
             
            const shop_item = await ShopItemModel.findOne({ where: { vnum: itemId }}); 
     
            let newItem = false; 
     
            let acum; 
      
            if( item.itemType == 1 ){ 
                acum = 1; 
                newItem = true; 
            } else { 
                acum = quantity; 
            } 
     
            let vnum = shop_item.vnum; 
            let price = shop_item.price; 
            let amount = shop_item.amount; 
            let total_price = price * quantity; 
     
            await sendItem(vnum, amount * acum, character, user); 
     
            user.Coins -= total_price; 
            await user.save();  
     
            ResponseData.ok(res, "Thanks for your purchase!"); 
        } 
    } catch (err) { 
        console.log(err); 
        return ResponseData.error(res, "", err); 
    }
} 
 
const sendItem = async (vnum, amount, character, user) => { 
    try {
        const shop_item = await ShopItemModel.findOne({ where: {vnum: vnum}}); 
 
        const item = items.filter(t => t.id == vnum)[0]; 
     
        let send_amount = amount; 
     
        const description = "Bought from Shop: VNum:" + vnum + "x" + send_amount + "-" + item.iconId;  
     
        const shop_log = await ShopLogModel.create({ 
            user_id: user.Id, 
            description: description 
        }); 
     
        // send post request to game server 
     
        const url = `http://51.195.60.138:24000/player/gift/id/${character}`;
     
        const data = { 
            "senderName": "Mall", 
            "giftsType": 1, 
            "gifts": [ 
                { 
                    "itemVnum": vnum, 
                    "amount": send_amount, 
                    // "upgrade": shop_item.upgrade ? shop_item.upgrade: 0, 
                    // "rare": shop_item.rare ? shop_item.rare: 0,  
                    "type": item.itemType 
                } 
            ] 
          }; 

        axios.post(url, data, {
                headers: {
                        'Content-Type': 'application/json',
                        'X-API-Key': 'pI1v3m7eQrAk8Z7'
                }
        })
        .then(response => {
                console.log('Response:', response.data);
        })
        .catch(error => {
                console.error('Error:', error);
        });
    } catch (err) { 
        console.log(err); 
        return ResponseData.error(res, "", err); 
    } 
} 
 
const getWheelItems = async (req, res) => { 
    try {
        let jackpots, common, reward, target; 
        const double_jackpot = req.body.doubleJackpot; 
        const jackpot = req.body.jackpot; 
     
        const user = await UserModel.findOne({ 
            where: { Id: req.user.Id }, 
        }); 
     
        // good that we have a variable for that wheel/roulette price kappa 
        if( user.Coins < 500 ) { 
            ResponseData.warning(res, "Not enough Coins"); 
        } else { 
            if( double_jackpot ){ 
                jackpots = await WheelItemModel.findAll({ order: literal('RANDOM()'), limit: 2, where: { rare: 0} });
                
                const target_jackpot = await WheelItemModel.findOne({ where: { rare: 0, id: jackpot } });  

                jackpots[0] = target_jackpot;
     
                jackpots = await convertDate(jackpots); 
         
                common = await WheelItemModel.findAll({ order: literal('RANDOM()'), limit: 9, where: { rare: 2} }); 
     
                common = await convertDate(common); 

            } else { 
                jackpots = await WheelItemModel.findAll({ where: { rare: 0, id: jackpot } }); 

                jackpots = await convertDate(jackpots);  

                common = await WheelItemModel.findAll({ order: literal('RANDOM()'), limit: 10, where: { rare: 2} }); 
                
                common = await convertDate(common); 
            } 
         
            let rares = await WheelItemModel.findAll({ order: literal('RANDOM()'), limit: 4, where: { rare: 1} });    

            rares = await convertDate(rares); 

            let rare_pity = await WheelItemModel.findAll({ order: literal('RANDOM()'), limit: 1, where: { rare: 3} });

            rare_pity = await convertDate(rare_pity);
         
            const values = ['jackpot', 'rare', 'common', 'rare_pity']; 
         
            const weights = [1, 10, 86, 3]; 
         
            const weight_value = await weightedRandom(values, weights); 
         
            if( weight_value == 'jackpot' ) { 
                if( double_jackpot ) { 
                    reward = jackpots[0]; 
                } else { 
                    reward = jackpots[0]; 
                } 
            } else if( weight_value == 'rare' ) { 
                reward = rares[Math.floor(Math.random() * 4)] 
            } else if( weight_value == 'rare_pity' ) { 
                reward = rare_pity[0] 
            } else { 
                if( double_jackpot ) { 
                    reward = common[Math.floor(Math.random() * 9)] 
                } else { 
                    reward = common[Math.floor(Math.random() * 10)] 
                } 
            } 
         
            let vnum = reward.vnum;
            let item = await WheelItemModel.findOne({ where: { vnum: vnum }}); 
         
            let amount = item.amount; 
            let char_id = Number(req.body.character); 
     
	    // when get the rare_pity, the count set 0 
            if(reward.rare == 3){ 
               // UserModel.update({Rare_Pity: 0}, {where: { 
               //     Id: req.user.Id 
               // }}) 
															user.Rare_Pity = 0;
            } 
            // when 0~9 the rare pity did not get, at 10 times, get the rare pity and then count = 0 
            else if (user.Rare_Pity == 9) { 
                reward = rare_pity[0]; 
                vnum = reward.vnum; 
                amount = reward.amount; 
                //UserModel.update({Rare_Pity: 0}, {where: { 
                //    Id: req.user.Id 
                //}})
																user.Rare_Pity = 0;
                 
            } else { //  else count +1 
               // UserModel.update({Rare_Pity: user.Rare_Pity + 1}, {where: { 
               //     Id: req.user.Id 
                //}}) 
																user.Rare_Pity += 1;
            } 

            // when get the jackpot, the count set 0 
            if(reward.id == jackpot){ 
               // UserModel.update({reward: 0}, {where: { 
               //     Id: req.user.Id 
               // }}) 
															user.reward = 0;
            } 
            // when 0~29 the jackpot did not get, at 30 times, get the jackpot and then count = 0 
            else if (user.reward == 29) { 
                reward = jackpots[0]; 
                vnum = reward.vnum; 
                amount = reward.amount; 
                //UserModel.update({reward: 0}, {where: { 
                //    Id: req.user.Id 
                //}}) 
																user.reward = 0;
                 
            } else { //  else count +1 
                UserModel.update({reward: user.reward + 1}, {where: { 
                    Id: req.user.Id 
                }}) 
																user.reward += 1;
            } 
         
            let data = []; 
         
            for( let rare of rares ) { 
                data.push(rare); 
            } 
         
            for( let c of common ) { 
                data.push(c); 
            } 

	        for( let p of rare_pity ) { 
                data.push(p); 
            } 
         
            data.sort(() => Math.random() - 0.5); 
         
            if( double_jackpot ) { 
                // Add $jackpots[0] to the beginning of $data 
                data.unshift(jackpots[0]); 
         
                // Swap the values at index 7 of $data and $jackpots[1] 
                const temp = data[8]; 
                data[8] = jackpots[1]; 
         
                // Add temp to the end of $data 
                data.push(temp); 
            } else { 
                data.unshift(jackpots[0]); 
            } 
         
            for (let index = 0; index < data.length; index++) { 
                if( data[index] == reward ) { 
                    target = index; 
                    break;
                } 
                 
            } 
     
            await sendWheelItem(vnum, amount, char_id, user); 
     
            user.Coins -= 500; 
     
            await user.save();  
         
            ResponseData.ok(res, "Game Wheel Items", { wheel_items: data, target: target, reward: reward, count: user.reward }); 
        } 
    } catch (err) { 
        console.log(err); 
        return ResponseData.error(res, "", err); 
    } 
} 
 
const weightedRandom = async (values, weights) => { 
    const count = values.length; 
    let n = 0; 
    const num = Math.floor(Math.random() * weights.reduce((a, b) => a + b, 0)); 
 
    for (let i = 0; i < count; i++) { 
        n += weights[i]; 
        if (n >= num) { 
            return values[i]; 
        } 
    } 
    return values[count - 1]; // Fallback in case weights do not sum to a value greater than 0 
} 
 
const convertDate = async ( data ) => {
    try {
        const updatedItems = data.map(item => { 
            const filteredDatas = items.filter(t => t.id === item.vnum);
            if(filteredDatas.length > 0){
                return { id: item.id, rare: item.rare, price: item.price, vnum: item.vnum, amount: item.amount, name: filteredDatas[0].name.uk, desc: filteredDatas[0].desc.uk, itemType: filteredDatas[0].itemType, itemSubType: filteredDatas[0].itemSubType, iconId: filteredDatas[0].iconId }; 
            } else {
                return null;
            }
        }); 
     
        return updatedItems.filter((t)=>t != null); 
    } catch (err) { 
        console.log(err);
    } 
} 
 
const getData = async (req, res) => { 
    // const links = await LinkModel.findByPk(1); 
    // const control = await ControlModel.findByPk(1); 
    const links = await LinkModel.findOne({
        order: [['id', 'ASC']]
    });
    const control = await ControlModel.findOne({
        order: [['id', 'ASC']]
    });
 
    ResponseData.ok(res, "Game Data", { discord: links?.discord, elite: links?.elite, inforge: links?.inforge, ragezone: links?.ragezone, name: control.name, captcha_key: control.captcha_key }); 
} 
 
const getJackpots = async (req, res) => { 
    jackpots = await WheelItemModel.findAll({ where: { rare: 0 } });        
    jackpots = await convertDate(jackpots);  
 
    ResponseData.ok(res, "Game Jackpots Items", { jackpots: jackpots, count: req.user.reward }); 
} 
 
const sendWheelItem = async (vnum, amount, character, user) => { 
    try {
        const shop_item = await WheelItemModel.findOne({ where: {vnum: vnum}}); 
 
        const item = items.filter(t => t.id == vnum)[0]; 
    
        let send_amount = amount; 
    
        const description = "Bought from Wheel: VNum:" + vnum + "x" + send_amount + "-" + item.iconId; 
    
        const shop_log = await WheelLogModel.create({ 
            user_id: user.Id, 
            description: description 
        }); 
    
        const url = 'http://51.195.60.138:24000/player/gift/id/' + character; 
    
        const data = { 
            "senderName": "Mall", 
            "giftsType": 1, 
            "gifts": [ 
                { 
                    "itemVnum": vnum, 
                    "amount": send_amount, 
                    // "upgrade": shop_item.upgrade ? shop_item.upgrade: 0, 
                    // "rare": shop_item.rare ? shop_item.rare: 0,  
                    "type": item.itemType 
                } 
            ] 
        }; 
    
        const config = { 
            headers: { 
            "Content-Type": "application/json", 
            }, 
        }; 
    
        axios.defaults.headers.common = { 
        "X-API-Key": "pI1v3m7eQrAk8Z7", 
        }; 
    
        axios.post(url, data, config) 
        .then(response => { 
            console.log(response.data); 
        }) 
        .catch(error => { 
            console.log(error); 
        }); 
    } catch(e) { 
        console.error(e);  
    } 

} 
 
const ipnVerify = async (req, res) => { 
    // Send 200 status back to PayPal 
	//res.status(200).send(req.body.item_name); 
        //res.end(); 
 
    const body = req.body || {}; 
 
    const site_data = await ControlModel.findByPk(1); 
 
    // Validate IPN message with PayPal 
    try { 
      //const isValidated = await verifyPaypalIPN(body); 
 
        const myPost = req.body; 
        let reqString = 'cmd=_notify-validate'; 
        for (const [key, value] of Object.entries(myPost)) { 
            reqString += `&${key}=${encodeURIComponent(value)}`; 
        } 
 
        // res.status(200).send(reqString); 
    	// res.end(); 
 
        reqString = reqString.replace(/%20/g, '+'); 
        reqString = reqString.replace(/%2B/g, '+'); 
 
        //reqString = "cmd=_notify-validate&discount=0.00&insurance_amount=0.00&payer_id=G8WLQMFP8D5CQ&ipn_track_id=f137655b1e0b5&charset=UTF-8&payment_gross=&shipping_discount=0.00&verify_sign=A6D3Z9NfZjNR1Cqeb7GXPwyb4MyAATjgWMx-pIExh7faFCyLfNU5CTKb&item_name=Server+donation&txn_type=web_accept&receiver_id=MUF2JRW9S85XN&payment_fee=&mc_currency=EUR&transaction_subject=&shipping_method=Default&custom=&protection_eligibility=Eligible&payer_status=verified&first_name=Soledad&mc_gross=1.00&payment_date=18%3A51%3A21+Mar+14%2C+2024+PDT&payment_status=Completed&quantity=1&business=obliviumgn%40gmail.com&item_number=1&last_name=Espinosa&txn_id=2J4037252K274335R&mc_fee=0.40&resend=true&payment_type=instant&notify_version=3.9&payer_email=s.espinosa86%40icloud.com&receiver_email=obliviumgn%40gmail.com&residence_country=CL"; 
 
        // Make a POST request to PayPal to validate IPN 
        const { data: verificationResult } = await axios.post('https://ipnpb.paypal.com/cgi-bin/webscr', reqString, { 
            headers: { 
                'Content-Type': 'application/x-www-form-urlencoded', 
            }, 
        }); 
 
 
      if (verificationResult != "VERIFIED" ) { 
        console.error('Error validating IPN message.'); 
	    res.status(200).send(verificationResult); 
    	res.end(); 
 
        return; 
      } 
 
	    res.status(200).send('Verified IPN message'); 
        res.end(); 
       
      // IPN Message is validated! 
       
      const item_name = body.item_name; 
      const item_number = body.item_number; 
      const payment_status = body.payment_status; 
      const payment_amount = body.mc_gross; 
      const payment_currency = body.mc_currency; 
      const txn_id = body.txn_id; 
      const receiver_email = body.receiver_email; 
      const payer_email = body.payer_email; 
      const real_curr = payment_currency.substring(0, 8); 
      const custom = body.custom; 

      if( receiver_email != "obliviumgn@gmail.com" ) { 
        return; 
      } 
 
      if( real_curr != "EUR" ) { 
        const paymentWeb = await PaymentWebModel.create({ 
            TransactionID: txn_id, 
            PayerEmail: payer_email, 
            PayerID: custom, 
            Description: "FAILED", 
            Amount: payment_amount, 
            Currency: real_curr 
        }); 
 
        return; 
      }  
 
      if( isNaN(item_number) ) { 
        return; 
      } 
 
      const coins_info = await CoinModel.findOne({ where: { CoinId : item_number}}); 
      if( coins_info !== null) { 
 
        const newCoins = bonus( coins_info.Coins, coins_info.BonusCoins, site_data.coin_bonus ); 
 
        const payment_process = await PaymentWebModel.create({ 
            TransactionID: txn_id, 
            PayerEmail: payer_email, 
            PayerID: custom, 
            Description: item_name, 
            Amount: parseInt(payment_amount), 
            Currency: real_curr 
        }); 
 
        const disAmount = discount(coins_info.Price, site_data.coin_discount); 
 
        if( disAmount != payment_amount ) { 
            return; 
        } 
 
        const user = await UserModel.findOne({ 
            where: { Id: custom }, 
        }); 
 
        const update = await user.update({ Coins: user.Coins + newCoins }); 
 
      }  
 
    } catch(e) { 
      console.error(e);  
    } 
} 
 
const bonus = (amount, default_bonus, percent) => { 
    if( percent > 0 ) { 
        return Math.round(amount + default_bonus + (amount * percent / 100)); 
    } else { 
        return amount + default_bonus; 
    } 
} 
 
const discount = (price, percent) => { 
    if( percent > 0 ) { 
        return price - (price * percent)/100; 
    } else { 
        return price; 
    } 
} 
 
const wheelItems = async (req, res) => { 
    try {
        const items = await WheelItemModel.findAll({
            order: [
                ['n_number', 'ASC'],
            ],
        }); 
        const wheel_items = await convertDate(items); 
        ResponseData.ok(res, "Game Wheel Items", { items: wheel_items }); 
    } catch (err) { 
        console.log(err); 
        return ResponseData.error(res, "", err); 
    } 
} 

const donate = async (req, res) => {
    const amount = req.body.amount;
    const coinId = req.body.coinId;
    const user_id = req.body.customer_id;
    const session = await stripe.checkout.sessions.create({
        // payment_method_types: ['card','bancontact','ideal','eps'],
        line_items: [{
            price_data: {
              currency: 'eur',
              product_data: {
                name: 'Sever Donation',
                description: coinId
              },
              unit_amount: amount * 100,
            },
            quantity: 1,
          }],
        metadata: {
            customer_id: user_id,
            coinId: coinId
        },
        mode: 'payment',
        success_url: `http://localhost:3000/donate?success=success`,
        cancel_url: `http://localhost:3000/donate?success=cancel`,
      });
     
    ResponseData.ok(res, "OK", { url: session.url }); 
}

const webhook = async (req, res) => {

    const endpointSecret = 'whsec_b703ee814b13ef94e2297f1113e41d6ae93b326fee02c4d17968b5c924b204bf';

    const sig = req.headers['stripe-signature'];

    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);

        // Handle the checkout.session.completed event
        if (event.type === 'checkout.session.completed') {
            // Retrieve the session. If you require line items in the response, you may include them by expanding line_items.
            const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
            event.data.object.id,
            {
                expand: ['line_items'],
            }
            );
            const lineItems = sessionWithLineItems.line_items;

            // Fulfill the purchase...
            // console.log('=====================================',sessionWithLineItems, lineItems);

            const check = await PaymentWebModel.findOne({where: {TransactionID: sessionWithLineItems.id}});

            if(check) {
                return;
            }

            const site_data = await ControlModel.findByPk(1); 

            const item_number = sessionWithLineItems.metadata.coinId;

            const coins_info = await CoinModel.findOne({ where: { CoinId : item_number}}); 
            if( coins_info !== null) { 
        
                const newCoins = bonus( coins_info.Coins, coins_info.BonusCoins, site_data.coin_bonus ); 
        
                const payment_process = await PaymentWebModel.create({ 
                    TransactionID: sessionWithLineItems.id, 
                    PayerEmail: sessionWithLineItems.customer_details.email, 
                    PayerID: sessionWithLineItems.metadata.customer_id, 
                    Description: 'sever donation', 
                    Amount: parseInt(sessionWithLineItems.amount_total/100), 
                    Currency: sessionWithLineItems.currency 
                }); 
        
                const disAmount = discount(coins_info.Price, site_data.coin_discount); 
        
                if( disAmount != sessionWithLineItems.amount_total/100 ) { 
                    return; 
                } 
        
                const user = await UserModel.findOne({ 
                    where: { Id: sessionWithLineItems.metadata.customer_id }, 
                }); 
        
                const update = await user.update({ Coins: user.Coins + newCoins }); 
        
            } 
        }

        ResponseData.ok(res, "OK"); 
    }
    catch (err) {
        console.log('errr', err);
        return ResponseData.error(res, "", err); 
    }
}
 
// const getEvents = async (req, res) => { 
//     const events = await EventModel.findAll(); 
     
//     ResponseData.ok(res, "Game Coins", { events: events}); 
// } 
 
// const addEvent = async (req, res) => { 
//     const title = req.body.title; 
//     const start_date = req.body.start_date; 
//     const end_date = req.body.end_date; 
 
//     if(end_date){ 
//         const event = await EventModel.create({ 
//             title: title, 
//             start: start_date, 
//             end:end_date 
//         }); 
//     } else { 
//         const event = await EventModel.create({ 
//             title: title, 
//             start: start_date, 
//         }); 
//     } 
 
//     const events = await EventModel.findAll(); 
 
//     ResponseData.ok(res, "add successfully!", { events: events}); 
// } 
 
// const removeEvent = async (req, res) => { 
//     const id = req.body.id; 
 
//     const events = await EventModel.destroy({ 
//         where: {id: id} 
//     }); 
 
//     ResponseData.ok(res, "Remove successfully!", { events: events}); 
// } 
 
module.exports = { 
    updateSetting, 
    getLogs, 
    getCoins, 
    getCategories, 
    getShopItems, 
    buyItem, 
    getWheelItems, 
    getData, 
    getJackpots, 
    ipnVerify, 
    wheelItems, 
    donate,
    webhook,
    // getEvents, 
    // addEvent, 
    // removeEvent 
}