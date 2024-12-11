import { program } from "commander";
import { clearCache, startProxyServer } from "./component/proxy";

// Define the "start" command for the caching proxy server
program
  .command("caching-proxy")
  .description("Start the caching proxy server")
  .option("--port <number>", "Port to run the server on", "3000")
  .option("--origin <url>", "Origin server URL", "http://example.com")
  .action(async (options) => {
    const { port, origin } = options;
    await startProxyServer(port, origin);
  });

// Define the "clear-cache" command
program
  .command("clear-cache")
  .description("Clear the Redis cache")
  .action(async () => {
    await clearCache();
  });

program.parse(process.argv);
