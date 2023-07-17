import { logger } from "./utils/logger";
import { buildServer } from "./utils/server";
import dotnenv from "dotenv"
console.log("Hello World");

async function gracefulShutDown({app}:{app:Awaited <ReturnType<typeof buildServer>>}){
    await app.close();
    process.exit(0);


}

async function main(){
    const PORT = process.env.PORT ? Number(process.env.PORT) : 8000
    const app = await buildServer()

    app.listen({port: PORT}, () => {
        logger.info(`Server is running on port ${PORT}`); 
        //
      
    })
    const signals = ["SIGINT","SIGTERM"]
    for (const signal of signals){
        process.on(signal,() => {
            console.log("Received signal", signal);
            gracefulShutDown({app})})
    
}
} 

main()