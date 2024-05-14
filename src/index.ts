import Fastify from 'fastify';
import sasihInfoRoute from "./routes/sasih-info-route";

const fastify = Fastify({
    logger: true
});

/**
 * Define the routes
 */

fastify.get('/', async (request, reply) => {
    return "API is running!";
});

fastify.register(sasihInfoRoute, { prefix: '/sasih-info' })


/**
 * Run the server!
 */
const start = async () => {
    try {
        await fastify.listen({ port: 3000 })
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}

start();