const express = require('express');
const router = express.Router();
const GameController = require('../../controllers/GameController');
const CacheMiddleware = require('../../middleware/CacheMiddleware');
const auth = require('../../middleware/AuthMiddleware');

router.post(
    "/setting",
    auth,
    GameController.updateSetting
)

router.get(
    "/getLogs",
    auth,
    GameController.getLogs
)

router.get(
    '/getCoins',
    auth,
    GameController.getCoins
)

router.get(
    '/getCategories',
    auth,
    GameController.getCategories
)

router.get(
    '/getShopItems',
    auth,
    GameController.getShopItems
)

router.post(
    '/buyItem',
    auth,
    GameController.buyItem
)

router.post(
    '/getWheelItems',
    auth,
    GameController.getWheelItems
)

router.get(
    '/getData',
    GameController.getData
)

router.get(
    '/getJackpots',
    auth,
    GameController.getJackpots
)

router.post(
    '/ipn',
    GameController.ipnVerify
)

router.get(
    '/getItems',
    GameController.wheelItems
)

router.post(
    '/donate',
    auth,
    GameController.donate
)

router.get(
    '/changeLogs',
    GameController.getChangeLogs
)

router.get(
    '/getLogDetail/:id',
    GameController.getLogDetail
)

router.post(
    '/thumbUp',
    auth,
    GameController.thumbUp
)

router.post(
    '/hot',
    auth,
    GameController.hot
)

router.post(
    '/crypto_ipn',
    GameController.crypto_ipn
)

// router.post(
//     '/webhook',
//     GameController.webhook
// )

// router.get(
//     '/events',
//     auth,
//     GameController.getEvents
// )

// router.post(
//     '/addEvent',
//     auth,
//     GameController.addEvent
// )

// router.post(
//     '/removeEvent',
//     auth,
//     GameController.removeEvent
// )

module.exports = router;    