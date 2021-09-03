import React, {useState} from 'react';
import './ReceiveAssets.scss';
import arrowBack from '../../images/arrowBack.png';
import copybtn from '../../images/copybtn.svg';
import {useHistory} from "react-router-dom";
import BlockItem from "../AmountBlock/AmountBlock";
import {useSelector} from "react-redux";
import TokenChanger from "../TokenChanger/TokenChanger";
import ShowBalance from "../AmountBlock/ShowBalance";
import MainBlock from "../MainBlock/MainBlock";
import {setAddressForSend} from "../../store/actions/walletSeed";
import QRCode  from'qrcode.react';



function copyToClipboard(textToCopy) {
    // navigator clipboard api needs a secure context (https)
    if (navigator.clipboard && window.isSecureContext) {
        // navigator clipboard api method'
        return navigator.clipboard.writeText(textToCopy);
    } else {
        // text area method
        let textArea = document.createElement("textarea");
        textArea.value = textToCopy;
        // make the textarea out of viewport
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        return new Promise((res, rej) => {
            // here the magic happens
            document.execCommand('copy') ? res() : rej();
            textArea.remove();
        });
    }
}
function ReceiveAssets() {
    const currentTokenForReceive = useSelector(state => state.walletSeedReducer.currentTokenForReceive);

    const tokenForReceiveSetted = useSelector(state => state.walletSeedReducer.tokenForReceiveSetted);
    function handleCutAddress(address) {
//todo add validation
        let spliced = address.slice(0, 7)
        let splicedpart2 = address.slice(59)
        let view = spliced + "..." + splicedpart2;
        console.log("addressTo", address)
return view
    }
    const history = useHistory();
    function handleBack() {
        history.push("/wallet")
    }

    async function handleCopy(){
        copyToClipboard(currentTokenForReceive.walletAddress)
            .then(() => console.log('text copied !'))
            .catch(() => console.log('error'));
        // await navigator.clipboard.writeText(currentTokenForReceive.walletAddress ? currentTokenForReceive.walletAddress : "")

    }
    return (

        <div className="container">
        <MainBlock
            smallTitle={false}
            content={
                <div>
                    <div className="head_wrapper">
                        {/*//TODO*/}
                        <button className="arrow_back" onClick={() => handleBack(false)}>
                            <img src={arrowBack} alt={"arrow"}/>
                        </button>
                        <div className="left_block">
                            Receive asset
                        </div>

                    </div>
                    <BlockItem
                        leftTitle={"Balance:"}
                        currentToken={currentTokenForReceive}
                        rightTopBlock={
                            <div className="send_balance">
                                Asset
                            </div>
                        }
                        rightBottomBlock={
                            <TokenChanger
                                enableMax={<div style={{"width": "52px"}}/>}
                            />
                        }
                        leftBlockBottom={
                            <div className="receive_balance_block">
                                <ShowBalance
                                    classWrapper={"receive_balance2"}
                                    balance={currentTokenForReceive.balance}
                                    showBal={tokenForReceiveSetted}
                                />
                            </div>}
                    />

                    <BlockItem
                        leftTitle={"Your address for this asset"}
                        currentToken={currentTokenForReceive}
                        rightTopBlock={
                            null
                        }
                        rightBottomBlock={
                            <div className="copybtn_wrapper">
                                <button className="arrow_back" onClick={() => handleCopy()}>
                                    <img src={copybtn} alt={"arrow"}/>
                                </button>
                            </div>
                        }
                        leftBlockBottom={
                            <div className="receive_balance_block">
                                <div className="receive_balance">
                                    {tokenForReceiveSetted ? handleCutAddress(currentTokenForReceive.walletAddress) : "0:..."}
                            </div>
                            </div>}
                    />


                    {
                        tokenForReceiveSetted &&
                        <>
                            <div style={{marginTop: "40px", display:"flex", alignItems: "center", justifyContent: "center"}}>
                                <div style={{display:"flex", alignItems: "center", justifyContent: "center",flexDirection: "column"}}>
                                    <div>Give this QR-code to Sender</div>
                                    <QRCode style={{marginTop:"20px"}} size={200} value={currentTokenForReceive.walletAddress || "0:65823528df743defb0a19f231b428de8c59440f8523475869dfdc0e71351010f"} />
                                </div>

                            </div>

                        </>
                    }
                </div>
            }
        />
            </div>




    )
}

export default ReceiveAssets;
