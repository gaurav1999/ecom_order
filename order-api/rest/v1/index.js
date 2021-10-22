'use-strict';
import {sendRes, sendError} from '../handler';

const router = require('express').Router();

router.get('/health', (req, res) => {
  setImmediate(async () => {
    return sendRes(res, 'Good', {'data': 'working fine'});
  });
});

module.exports = router;
