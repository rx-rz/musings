import Fastify, {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
} from "fastify";
import fastifyMongo from "@fastify/mongodb";
const fastify = Fastify({
  logger: {
    transport: {
      //not to be used in production
      target: "pino-pretty",
    },
  },
});

fastify.decorate("signJwt", () => {
  return "signed JWT";
});

fastify.decorate("verifyJWT", () => {
  return "verified JWT";
});

// async function dbConnector(fastify: FastifyInstance) {
//   fastify.register(fastifyMongo, {
//     url: "mongodb://0.0.0.0:27017/fastify",
//   });
//   fastify.log.info("Connected to database!");
// }

// fastify.register(dbConnector);

fastify.get("/", async (request, response) => {
  return {
    message: "Hello World",
  };
});

declare module "fastify" {
  export interface FastifyRequest {
    user: {
      name: string;
    };
  }
  export interface FastifyInstance {
    signJwt: () => string;
    verifyJWT: () => string;
  }
}
fastify.decorateRequest("user", null);

fastify.addHook(
  "preHandler",
  async (request: FastifyRequest, reply: FastifyReply) => {
    request.user = {
      name: "Bob Jones",
    };
    //if you dont wanna use async, just put done() under here.
  }
);

// it being async is important, remember
async function userRoutes(fastify: FastifyInstance) {
  fastify.get("/", {
    handler: async (
      request: FastifyRequest<{
        Body: {
          name: string;
          age: number;
        };
      }>,
      reply: FastifyReply
    ) => {
      const body = request.body;
      const jwt = fastify.signJwt();
      const verified = fastify.verifyJWT();
      console.log({ body });
      return reply.code(201).send(request.user);
    },
  });
  fastify.log.info("User routes registered!");
}

fastify.register(userRoutes, { prefix: "/api/users" });

async function main() {
  await fastify.listen({
    port: 3001,
    host: "localhost",
  });
}



// [("SIGINT", "SIGTERM")].forEach((signal) => {
//   process.on(signal, async () => {
//     await fastify.close();
//     process.exit(0);
//   });
// });

main();
