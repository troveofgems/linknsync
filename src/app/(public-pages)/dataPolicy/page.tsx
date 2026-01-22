function DataPolicyPage() {
    return (
        <section>
            <h1 className={"flex flex-wrap gap-2 sm:gap-x-6 items-center justify-center text-4xl font-bold leading-none tracking-wide sm:text-6xl"}>
                Data Policy
            </h1>
            <h2 className={"flex flex-wrap gap-2 sm:gap-x-6 items-center justify-center text-3xl font-bold leading-none tracking-wide sm:text-4xl mt-10"}>
                Purpose & Scope
            </h2>
            <p className={"mt-3 text-lg tracking-wide leading-8 max-w-2xl mx-auto text-muted-foreground"}>
                This policy defines how Link N&#39; Sync collects, processes, stores, and disposes of data related to
                its vacation‑rental platform. It applies to all employees, contractors, and third‑party vendors handling
                data in the United States and Mexico.
            </p>
            <ul className={"mt-3 text-lg tracking-wide leading-8 max-w-2xl mx-auto text-muted-foreground"}>
                <li className={"ml-4 my-2"}>
                    Covers User Data, Organization Data, Property Data, PMS Data, and ICAL Data.
                </li>
                <li className={"ml-4 my-2"}>
                    Applies to production, staging, and development environments.
                </li>
            </ul>
            <h2 className={"flex flex-wrap gap-2 sm:gap-x-6 items-center justify-center text-3xl font-bold leading-none tracking-wide sm:text-4xl mt-10"}>
                Data Classification & Encryption
            </h2>
            <p className={"mt-3 text-lg tracking-wide leading-8 max-w-2xl mx-auto text-muted-foreground"}>
                Data is classified as Sensitive PII when it includes personal identifiers such as name, email, or phone
                number. All Sensitive PII is encrypted at rest using industry‑standard AES‑256 encryption.

                Non‑PII data (e.g., public property URLs) is stored without encryption but is still subject to access
                controls.
            </p>
            <ul className={"mt-3 text-lg tracking-wide leading-8 max-w-2xl mx-auto text-muted-foreground"}>
                <li className={"ml-4 my-2"}>
                    User Data (Full Name, Email, Phone, Role) – Encrypted
                </li>
                <li className={"ml-4 my-2"}>
                    Organization Data (Org Name, COID) – Encrypted
                </li>
                <li className={"ml-4 my-2"}>
                    Property Data (address fields, photos, ICAL details) – Encrypted
                </li>
                <li className={"ml-4 my-2"}>
                    ICAL Data – Encrypted when stored; exported only via secure channels
                </li>
            </ul>
            <h2 className={"flex flex-wrap gap-2 sm:gap-x-6 items-center justify-center text-3xl font-bold leading-none tracking-wide sm:text-4xl mt-10"}>
                Access Control & Ownership
            </h2>
            <p className={"mt-3 text-lg tracking-wide leading-8 max-w-2xl mx-auto text-muted-foreground"}>
                Access to data is granted on a least‑privilege basis. Ownership of data resides with the business
                function that created it.
            </p>
            <h2 className={"flex flex-wrap gap-2 sm:gap-x-6 items-center justify-center text-3xl font-bold leading-none tracking-wide sm:text-4xl mt-10"}>
                Third-Party Management
            </h2>
            <p className={"mt-3 text-lg tracking-wide leading-8 max-w-2xl mx-auto text-muted-foreground"}>
                Link N&#39; Sync relies on several external services.
            </p>
            <ul className={"mt-3 text-lg tracking-wide leading-8 max-w-2xl mx-auto text-muted-foreground"}>
                <li className={"ml-4 my-2"}>
                    ImitateEmail – Email transmission only, no storage of PII.
                </li>
                <li className={"ml-4 my-2"}>
                    ImageBB – Stores only image binaries; URLs are not PII.
                </li>
                <li className={"ml-4 my-2"}>
                    ClerkJS – Handles authentication.
                </li>
                <li className={"ml-4 my-2"}>
                    Supabase (PostgreSQL) – Primary data store; encrypted at rest.
                </li>
                <li className={"ml-4 my-2"}>
                    Vercel – Hosts the web UI; no data persistence.
                </li>
            </ul>
            <h2 className={"flex flex-wrap gap-2 sm:gap-x-6 items-center justify-center text-3xl font-bold leading-none tracking-wide sm:text-4xl mt-10"}>
                Retention, Log Management & Disposal
            </h2>
            <p className={"mt-3 text-lg tracking-wide leading-8 max-w-2xl mx-auto text-muted-foreground"}>
                Operational logs are retained for 7 days and then securely deleted. Data that is no longer required for
                business or legal purposes is purged in accordance with the retention schedule.
            </p>
            <h2 className={"flex flex-wrap gap-2 sm:gap-x-6 items-center justify-center text-3xl font-bold leading-none tracking-wide sm:text-4xl mt-10"}>
                Enforcement & Training
            </h2>
            <p className={"mt-3 text-lg tracking-wide leading-8 max-w-2xl mx-auto text-muted-foreground"}>
                Compliance with this policy is mandatory. Violations may result in disciplinary action up to
                termination of services. Ongoing training ensures all stakeholders understand their responsibilities.
            </p>
        </section>
    );
}

export default DataPolicyPage;