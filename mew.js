const { ethers } = require("ethers");

const provider = new ethers.providers.WebSocketProvider("ws://127.0.0.1:8546");

const routerAddress = "0x10ED43C718714eb63d5aA57B78B54704E256024E";
const pcsAbi = new ethers.utils.Interface(require("./abi.json"));

async function mempool(){
    provider.on("pending", async(txHash)=>{
        const tx = await provider.getTransaction(txHash);
        try{
            const data = tx.data
            console.log(tx.gasLimit)
            if (tx.to == routerAddress){
                const re1 = new RegExp("^0xf305d719");
                // const re2 = new RegExp("^0xe8e33700");
                if (re1.test(data)){
                    const decode = pcsAbi.parseTransaction({
                        data: tx.data,
                        value: tx.value,
                      });
                    console.log(txHash);
                    console.log(decode.args[0]);
                }
            }
        }
        catch (e){
        }

    })
}
mempool()
