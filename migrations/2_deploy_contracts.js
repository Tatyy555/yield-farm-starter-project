// どのコントラクトとやり取りをするか宣言。
const TokenFarm = artifacts.require(`TokenFarm`)
const DappToken = artifacts.require(`DappToken`)
const DaiToken = artifacts.require(`DaiToken`)

module.exports = async function(deployer, newtwork, accounts) {

    // 偽の Dai トークンをデプロイする。
    await deployer.deploy(DaiToken)
    // ディプロイされた結果を取得する。
    const daiToken = await DaiToken.deployed()

    // Dapp トークンをデプロイする。
    await deployer.deploy(DappToken)
    // ディプロイされた結果を取得する。
    const dappToken = await DappToken.deployed()

    // dappToken と daiToken のアドレスを引数に、Token Farm をデプロイする
    await deployer.deploy(TokenFarm, dappToken.address, daiToken.address)
    // ディプロイされた結果を取得する。
    const tokenFarm = await TokenFarm.deployed()

    //100万Dappデプロイする
    await dappToken.transfer(tokenFarm.address, '1000000000000000000000000')

    //100Daiデプロイする、なお、accounts[1]は第三者(投資家)用。:
    await daiToken.transfer(accounts[1], '100000000000000000000')
}