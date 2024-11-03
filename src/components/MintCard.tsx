"use client";

import { useState } from 'react';
import { Button, Flex, Text, Progress, Box } from "@radix-ui/themes";

interface MintCardProps {
    totalMinted: number;
    maxSupply: number;
    price: number;
    onMint: () => Promise<void>;
}

export default function MintCard({ totalMinted, maxSupply, price, onMint }: MintCardProps) {
    const [isMinting, setIsMinting] = useState(false);

    const handleMint = async () => {
        setIsMinting(true);
        await onMint();
        setIsMinting(false);
    };

    const progress = (totalMinted / maxSupply) * 100;

    return (
        <Flex
            direction="column"
            align="center"
            justify="between"
            width="100%"
            style={{
                background: "var(--gray-a2)",
                borderRadius: "8px",
                padding: "16px",
                minWidth: "320px",
                maxWidth: "400px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            }}
        >
            {/* Mint Progress */}
            <Box width="100%" mb="3">
                <Progress value={progress} max={100} size="3" color="blue" variant="surface" />
                <Text size="2" color="gray" mt="2">
                    Minted: {totalMinted} / {maxSupply}
                </Text>
            </Box>

            {/* Price Information */}
            <Text size="3" color="gray" mb="4">
                Price: {price} $SWOOP
            </Text>

            {/* Mint Button */}
            <Button onClick={handleMint} disabled={isMinting} variant="solid" color="blue">
                {isMinting ? "Minting..." : "Mint NFT"}
            </Button>
        </Flex>
    );
}
