import * as dotenv from 'dotenv'

export const getEnv = () => {
    dotenv.config({
        override: true,
        path: `helper/.env.${process.env.ENV}`
    })

}