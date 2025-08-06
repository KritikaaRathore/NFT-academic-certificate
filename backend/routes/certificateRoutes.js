const express = require('express');
const router = express.Router();
const { web3, contract } = require('../config/web3Config');

const ownerAddress = '0xYourOwnerAddress'; // Ganache owner
const privateKey = '0xYourPrivateKey'; // Use env vars in production

// Issue certificate
router.post('/issue-certificate', async (req, res) => {
    const { studentAddress, studentName, courseName, issueDate, grade } = req.body;
    const tokenURI = `data:application/json,${encodeURIComponent(JSON.stringify({
        studentName, courseName, issueDate, grade
    }))}`;

    try {
        const tx = contract.methods.issueCertificate(studentAddress, tokenURI);
        const gas = await tx.estimateGas({ from: ownerAddress });
        const data = tx.encodeABI();
        const nonce = await web3.eth.getTransactionCount(ownerAddress);

        const signedTx = await web3.eth.accounts.signTransaction(
            {
                to: contract.options.address,
                data,
                gas,
                nonce,
                chainId: await web3.eth.getChainId()
            },
            privateKey
        );

        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
        res.json({
            success: true,
            tokenId: receipt.events.Transfer.returnValues.tokenId,
            transactionHash: receipt.transactionHash,
            gasUsed: receipt.gasUsed
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// Add other routes (verify, view, student-certs) if needed
module.exports = router;
