// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Entry point of the Backend Express application
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

import app from "@/app.js";


// Port the server listens on. Defaults to 3000 if not set in .env.
const PORT = process.env.PORT ?? 3000;

// Start the Express app so that it listens on the port configured in `.env`.
app.listen(PORT, () => {
    console.log(`Express Server running on port ${PORT}`)
});

