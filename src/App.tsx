import { useCurrentAccount } from "@mysten/dapp-kit";
import { Box, Container, Flex, Heading } from "@radix-ui/themes";
import MintPage from "./components/MintPage";
import Navbar from "./components/Navbar";

function App() {
  const currentAccount = useCurrentAccount();

  return (
    <div className="bg-custom">
      <Navbar />
      <Flex
        position="sticky"
        px="4"
        py="2"
        justify="between"
        style={{
          borderBottom: "1px solid var(--gray-a2)",
        }}
      >
        <Box>
          <Heading>Mint dApp</Heading>
        </Box>
      </Flex>
      <Container>
        <Container
          mt="5"
          pt="2"
          px="4"
          style={{ background: "var(--gray-a2)", minHeight: 500, minWidth: 800 }}
        >
          {currentAccount ? (
            <MintPage />
          ) : (
            <Heading>Please connect your wallet</Heading>
          )}
        </Container>
      </Container>
    </div>
  );
}

export default App;