const express = require('express');
const axios = require('axios');
const cors = require('cors');
const router = express.Router() ;
 
     // Proxy API Endpoint to JDoodle
     router.post('/execute', async (req, res) => {
     
        const { code, language ,stdin} = req.body;
        console.log(stdin) ;
        const result = stdin.map(s => s.replace(/\n/g, ' ')).join(' ');
        try {
            const response = await axios.post('https://api.jdoodle.com/v1/execute', {
                script: code,
                stdin: result,
                language: language,
                versionIndex: '5', // Select the version index as needed
                clientId: 'c8748c725528490e1195c4d47b2d5747', // Replace with your JDoodle client ID
                clientSecret: 'a4ca964244206bc1abd16bbcb15a4d2b251caa3a234b4580b894e32e10a22e9a', // Replace with your JDoodle client secret
            });
    
            res.json(response.data);
            console.log(response.data) ;
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.response?.data?.message || 'An error occurred' });
        }
    });
    

module.exports = router ;






// 