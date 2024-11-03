"use client";

import { ConnectButton } from '@mysten/dapp-kit';

export default function Navbar() {
    return (
        <nav className="flex">
            <a href="/">
                <img src="/logo.jpg" alt="Logo" width={50} height={50} className="rounded-full" />
            </a>
            <ConnectButton />
        </nav>
    );
}
