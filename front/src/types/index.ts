import { Telegram } from "@twa-dev/types"

export { };

declare global {
    interface Window {
        Telegram: Telegram;
    }

    namespace NodeJS {
        interface ProcessEnv {
            [key: string]: string | undefined;
            APP_NAME: string;
            // add more environment variables and their types here
        }
    }
}
