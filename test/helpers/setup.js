const { deployments } = require('hardhat');

exports.advanceBlocks = async (blocks) => {
    for (let i = 0; i < blocks; i++) {
        await network.provider.request({
            method: 'evm_mine'
        });
    }
};

exports.increaseTime = async (time) => {
    await network.provider.request({
        method: 'evm_increaseTime',
        params: [time]
    });
    await network.provider.request({
        method: 'evm_mine'
    });
};

exports.setupTestCanonical = deployments.createFixture(
    async ({ deployments, getNamedAccounts, ethers }) => {
        await deployments.fixture('canonical');
        const {
            deployer,
            user,
            stakingPool,
            treasury,
            insurancePool
        } = await getNamedAccounts();
        const YAX = await deployments.get('YAX');
        const yax = await ethers.getContractAt('MockERC20', YAX.address, user);
        const DAI = await deployments.get('DAI');
        const dai = await ethers.getContractAt('MockERC20', DAI.address, user);
        const USDC = await deployments.get('USDC');
        const usdc = await ethers.getContractAt('MockERC20', USDC.address, user);
        const USDT = await deployments.get('USDT');
        const usdt = await ethers.getContractAt('MockERC20', USDT.address, user);
        const T3CRV = await deployments.get('T3CRV');
        const t3crv = await ethers.getContractAt('MockERC20', T3CRV.address, user);
        const WETH = await deployments.get('WETH');
        const weth = await ethers.getContractAt('MockERC20', WETH.address, user);
        const Router = await deployments.get('MockUniswapRouter');
        const router = await ethers.getContractAt(
            'MockUniswapRouter',
            Router.address,
            deployer
        );
        const Manager = await deployments.get('Manager');
        const manager = await ethers.getContractAt('Manager', Manager.address, deployer);
        const Controller = await deployments.get('CanonicalController');
        const controller = await ethers.getContractAt(
            'CanonicalController',
            Controller.address,
            deployer
        );
        const StableVault = await deployments.get('CanonicalVaultStables');
        const stableVault = await ethers.getContractAt(
            'CanonicalVault',
            StableVault.address,
            user
        );

        await dai.faucet(ethers.utils.parseEther('100000000'));
        await usdc.faucet('1000000000');
        await usdt.faucet('1000000000');
        await t3crv.faucet(ethers.utils.parseEther('1000'));
        await dai.approve(StableVault.address, ethers.utils.parseEther('1000'), {
            from: user
        });
        await usdc.approve(StableVault.address, ethers.utils.parseEther('1000'), {
            from: user
        });
        await usdt.approve(StableVault.address, ethers.utils.parseEther('1000'), {
            from: user
        });
        await t3crv.approve(StableVault.address, ethers.utils.parseEther('1000'), {
            from: user
        });
        await stableVault.approve(StableVault.address, ethers.utils.parseEther('1000'), {
            from: user
        });

        return {
            deployer,
            stakingPool,
            treasury,
            insurancePool,
            user,
            yax,
            dai,
            usdc,
            usdt,
            t3crv,
            weth,
            stableVault,
            manager,
            controller,
            router
        };
    }
);

exports.setupTestMetavault = deployments.createFixture(
    async ({ deployments, getNamedAccounts, ethers }) => {
        await deployments.fixture('metavault');
        const {
            deployer,
            user,
            stakingPool,
            treasury,
            insurancePool
        } = await getNamedAccounts();
        const YAX = await deployments.get('YAX');
        const yax = await ethers.getContractAt('MockERC20', YAX.address, user);
        const DAI = await deployments.get('DAI');
        const dai = await ethers.getContractAt('MockERC20', DAI.address, user);
        const USDC = await deployments.get('USDC');
        const usdc = await ethers.getContractAt('MockERC20', USDC.address, user);
        const USDT = await deployments.get('USDT');
        const usdt = await ethers.getContractAt('MockERC20', USDT.address, user);
        const T3CRV = await deployments.get('T3CRV');
        const t3crv = await ethers.getContractAt('MockERC20', T3CRV.address, user);
        const WETH = await deployments.get('WETH');
        const weth = await ethers.getContractAt('MockERC20', WETH.address, user);
        const Router = await deployments.get('MockUniswapRouter');
        const router = await ethers.getContractAt(
            'MockUniswapRouter',
            Router.address,
            deployer
        );
        const Vault = await deployments.get('yAxisMetaVault');
        const vault = await ethers.getContractAt('yAxisMetaVault', Vault.address, user);
        const Manager = await deployments.get('yAxisMetaVaultManager');
        const vaultManager = await ethers.getContractAt(
            'yAxisMetaVaultManager',
            Manager.address,
            deployer
        );
        const Controller = await deployments.get('StrategyControllerV2');
        const controller = await ethers.getContractAt(
            'StrategyControllerV2',
            Controller.address,
            deployer
        );
        const Converter = await deployments.get('StableSwap3PoolConverter');
        const converter = await ethers.getContractAt(
            'StableSwap3PoolConverter',
            Converter.address,
            deployer
        );
        const Harvester = await deployments.get('yAxisMetaVaultHarvester');
        const harvester = await ethers.getContractAt(
            'yAxisMetaVaultHarvester',
            Harvester.address,
            deployer
        );

        await dai.faucet(ethers.utils.parseEther('1000'));
        await usdc.faucet('1000000000');
        await usdt.faucet('1000000000');
        await t3crv.faucet(ethers.utils.parseEther('1000'));
        await dai.approve(Vault.address, ethers.utils.parseEther('1000'), { from: user });
        await usdc.approve(Vault.address, ethers.utils.parseEther('1000'), { from: user });
        await usdt.approve(Vault.address, ethers.utils.parseEther('1000'), { from: user });
        await t3crv.approve(Vault.address, ethers.utils.parseEther('1000'), { from: user });
        await vault.approve(Vault.address, ethers.utils.parseEther('1000'), { from: user });

        return {
            deployer,
            stakingPool,
            treasury,
            insurancePool,
            user,
            yax,
            dai,
            usdc,
            usdt,
            t3crv,
            weth,
            vault,
            vaultManager,
            harvester,
            controller,
            converter,
            router
        };
    }
);
