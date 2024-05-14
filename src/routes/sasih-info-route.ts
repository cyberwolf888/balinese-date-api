import createResponse from "../util/response";
import {getCurrent, getFullMonth} from "../controllers/sasih-info-controller";

const routes = async (fastify: any, options: any) => {
    const currentDateTime = new Date();
    const currentMonth = currentDateTime.getMonth();
    const currentYear = currentDateTime.getFullYear();

    fastify.get('/', async (request: any, reply: any) => {
        const data = await getCurrent(currentDateTime);
        return createResponse(data, 200, "Data berhasil ditemukan");
    });

    fastify.get('/:bulan', async (request: any, reply: any) => {
        //check if bulan is a number
        const bulan = parseInt(request.params.bulan);
        if (isNaN(bulan)) {
            return { error: "Bulan harus berupa angka" };
        }
        if (bulan < 1 || bulan > 12) {
            return { error: "Bulan harus berada di antara 1 dan 12" };
        }
        //create date object with current year and bulan and date is 1
        const date = new Date(currentYear, bulan - 1, 1);
        console.log(date.toISOString());
        // console.log(currentYear, bulan, date.getMonth());
        const data = await getFullMonth(date);
        return createResponse(data, 200, "Data berhasil ditemukan");
    });


}

export default routes;