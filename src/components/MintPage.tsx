import { useState, useEffect } from 'react';
import { useSignAndExecuteTransaction } from '@mysten/dapp-kit';
import { Transaction } from '@mysten/sui/transactions';
import { Box, Flex, Dialog, Button } from '@radix-ui/themes';
import MintCard from './MintCard';
import confetti from 'canvas-confetti';

export default function MintPage() {
    const [totalMinted, setTotalMinted] = useState<number | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const maxSupply = 1000;
    const price = 0.5;
    const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction();

    const packageId = '0x7115cab59a8364a97024416fb5ebf24eb522e6ef80e51358fe56e47dffe87e06';
    const moduleId = 'nft_module';
    const functionId = 'mint_nft';

    const handleMint = async (retryCount = 3) => {
        const tx = new Transaction();
        tx.moveCall({
            target: `${packageId}::${moduleId}::${functionId}`,
            arguments: [],
        });

        try {
            await signAndExecuteTransaction(
                {
                    transaction: tx,
                    chain: 'sui:testnet',
                },
                {
                    onSuccess: (result) => {
                        console.log('Transaction exécutée avec succès', result);
                        setTotalMinted((prev) => (prev ?? 0) + 1);
                        confetti(); // Lancer les confettis
                        setIsModalOpen(true); // Ouvrir la modal de confirmation
                    },
                    onError: async (error: any) => {
                        if (error?.status === 429 && retryCount > 0) {
                            console.warn('Rate limited, retrying...');
                            setTimeout(() => handleMint(retryCount - 1), 2000);
                        } else {
                            console.error('Erreur lors du mint :', error);
                        }
                    },
                }
            );
        } catch (error) {
            console.error("Erreur lors du mint :", error);
        }
    };

    useEffect(() => {
        setTotalMinted(200);
    }, []);

    return (
        <Flex direction={{ initial: 'column', md: 'row' }} align="center" gap="6" p="6">
            <Box width="33%" height="auto" overflow="hidden" className="rounded-xs">
                <img src="/nft-preview.png" alt="NFT Preview" />
            </Box>
            <MintCard
                totalMinted={totalMinted ?? 0}
                maxSupply={maxSupply}
                price={price}
                onMint={handleMint}
            />

            {/* Modal de confirmation après le mint */}
            <Dialog.Root open={isModalOpen} onOpenChange={setIsModalOpen}>
                <Dialog.Trigger>
                    {/* Utilisation d'un trigger uniquement pour la structure, sans bouton caché */}
                    <span />
                </Dialog.Trigger>

                <Dialog.Content maxWidth="400px">
                    <Dialog.Title>Mint successful !</Dialog.Title>
                    <Dialog.Description>
                        GG Mfer, you just mint one!!
                    </Dialog.Description>
                    <Flex justify="center" mt="4">
                        <img src="/nft-preview.png" alt="NFT Minted" width="200" height="200" />
                    </Flex>
                    <Flex justify="end" mt="4">
                        <Dialog.Close>
                            <Button variant="soft" onClick={() => setIsModalOpen(false)}>
                                Fermer
                            </Button>
                        </Dialog.Close>
                    </Flex>
                </Dialog.Content>
            </Dialog.Root>
        </Flex>
    );
}
