import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import darumaContract from '../ethereum/daruma';
import web3 from '../ethereum/web3';

import { FullLogo } from '../components/FullLogo';
import { Logo } from '../components/Logo';
import toast, { Toaster } from 'react-hot-toast';

export default function Home({ totalSupply, maxSupply }) {
  const [quantityForMint, setQuantityForMint] = useState(1);
  const [loading, setLoading] = useState(false);

  async function handleMint() {
    setLoading(true);
    const accounts = await web3.eth.getAccounts();
    const mintCost = 0.01 * quantityForMint;

    const res = darumaContract.methods.mint(quantityForMint).send({
      from: accounts[0],
      value: web3.utils.toWei(mintCost.toString(), 'ether')
    });

    try {
      await toast.promise(res, {
        duration: 3000,
        loading: 'Waiting on transaction...',
        success: '🎉 Mint successful! Good Luck 🍀',
        error: 'Something went wrong! Try again. 🙁'
      });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='w-full min-h-screen overflow-hidden bg-image scroll-smooth'>
      <Toaster position='bottom-right' />
      <Head>
        <title>Daruma Good Luck</title>
        <meta
          name='description'
          content='Daruma Good Luck - Bringing Luck to the Ethereum Community'
        />
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/apple-touch-icon.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/favicon-16x16.png'
        />
        <link rel='manifest' href='/site.webmanifest' />
        <link rel='mask-icon' href='/safari-pinned-tab.svg' color='#5bbad5' />
        <meta name='msapplication-TileColor' content='#2d89ef' />
        <meta name='theme-color' content='#ffffff'></meta>
      </Head>

      <main className='flex flex-col items-center justify-center w-full p-4 pb-10 mx-auto bg-theme-white max-w-7xl'>
        <nav className='flex items-center justify-between w-full p-4 mx-auto max-w-7xl'>
          <Link href='/'>
            <a>
              <Logo width={48} height={48} />
            </a>
          </Link>
          <ul className='flex items-center gap-2 text-base text-3xl font-samurai text-theme-black'>
            <li>
              <a href='#about'>ABOUT</a>
            </li>
            <li>
              <a href='#mint'>MINT</a>
            </li>
            <li>
              <a
                href='https://testnets.opensea.io/collection/daruma-good-luck'
                rel='noopener noreferrer'
                target='_blank'
              >
                OPENSEA
              </a>
            </li>
          </ul>
        </nav>
        <FullLogo width={350} height={250} />
        {/* <img
          src='/preview-wide.png'
          className='w-full max-h-[400px] object-cover opacity-70'
          alt='All 300 NFTs available for minting'
        /> */}
        <section className='flex items-center justify-between w-full mt-8'>
          <div
            id='about'
            className='flex flex-col items-center justify-center w-full '
          >
            <img
              src='/preview.gif'
              className='w-[100px] h-[100px]'
              alt='An animation showing the NFTs'
              style={{
                clipPath: 'circle(50%)'
              }}
            />
            <h2 className='text-6xl font-samurai text-theme-black'>ABOUT</h2>
            <p className='max-w-prose'>
              Daruma Good Luck is a project that aims to bring luck to the
              Ethereum community. This a test project running in the Rinkeby
              Test Network.
            </p>
          </div>
        </section>
        <section className='flex flex-col items-center justify-between w-full mt-8'>
          <div
            id='mint'
            className='flex flex-col items-center justify-center w-full '
          >
            <h2 className='text-6xl font-samurai text-theme-black'>MINT</h2>
            <p className='max-w-prose'>
              Get your own Daruma Good Luck token by minting it on the Rinkeby
              Test Network.
            </p>
          </div>
          <div className='flex items-center justify-center gap-6 mt-4'>
            <p className='p-2 text-center rounded-lg max-w-prose bg-theme-black text-theme-white'>
              <strong>VALUE:</strong>
              <br />
              0.01 ETH per NFT
              <br />
              <strong>MAX PER TRANSACTION:</strong>
              <br />
              5<br />
            </p>
            <div className='flex items-center gap-4 p-4 border-2 rounded-lg text-theme-black border-theme-black'>
              <div className='flex flex-col items-center'>
                <span>Total Supply</span>
                <span className='text-4xl font-bold'>{totalSupply}</span>
              </div>
              <div className='flex flex-col items-center'>
                <span>Max Supply</span>
                <span className='text-4xl font-bold'>{maxSupply}</span>
              </div>
            </div>
          </div>

          <div className='flex items-end justify-center w-full gap-6 my-6'>
            <div className='flex flex-col items-center gap-2 text-theme-black'>
              <label className='text-2xl font-bold'>Quantity</label>
              <input
                value={quantityForMint}
                onChange={(e) => setQuantityForMint(e.target.value)}
                type='number'
                max={5}
                min={1}
                className='w-24 p-4 text-2xl border-2 rounded-lg border-theme-black text-theme-black'
              />
            </div>
            <button
              className='p-4 text-5xl font-bold transition-all rounded-lg bg-theme-black text-theme-white hover:brightness-125 disabled:opacity-50'
              onClick={handleMint}
              disabled={loading}
            >
              MINT
            </button>
          </div>
        </section>
      </main>

      <footer className='flex items-center justify-center w-full h-[64px] bg-theme-black text-theme-white'>
        <img
          src='/logo-white.png'
          alt='Daruma Good Luck Logo in white'
          className='w-[24px]'
        />
      </footer>
    </div>
  );
}

export async function getServerSideProps(context) {
  const totalSupply = await darumaContract.methods.totalSupply().call();
  const maxSupply = await darumaContract.methods.maxSupply().call();

  return {
    props: {
      totalSupply,
      maxSupply
    }
  };
}
