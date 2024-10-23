import Head from 'next/head';
import QRCodeGenerator from '../components/QRCodeGenerator';
import '../style.css';

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Google Maps QR Code Generator</title>
      </Head>
      <main>
        
        <h1>Generate QR Code from Google Maps Link</h1>
        <QRCodeGenerator />
      </main>
    </div>
  );
}
