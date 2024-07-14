"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const fastify = (0, fastify_1.default)({
    logger: {
        transport: {
            //not to be used in production
            target: "pino-pretty"
        }
    }
});
async function main() {
    await fastify.listen({
        port: 3000,
        host: "0.0.0.0"
    });
}
main();
