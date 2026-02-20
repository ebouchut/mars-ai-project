// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Entry point of the Backend Express application
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

import { config } from "dotenv";
import app from "@/app.js";

const PORT = process.env.PORT ?? 3000;

// Start the Express app so that it listens on the port configured in `.env`.
app.listen(PORT, () => {
    console.log(`Express Server running on port ${PORT}`)
});

