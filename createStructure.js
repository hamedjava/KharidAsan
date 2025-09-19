import { promises as fs } from 'fs';
import path from 'path';

const basePath = path.resolve('./src');

const structure = {
    modules: {
        product: {
            domain: { entities: null, repositories: null, services: null },
            application: { usecases: null, dto: null },
            infrastructure: { database: null, external: null },
            interfaces: { controllers: null, routes: null, middlewares: null },
        },
        user: {
            domain: { entities: null, repositories: null, services: null },
            application: { usecases: null, dto: null },
            infrastructure: { database: null, external: null },
            interfaces: { controllers: null, routes: null, middlewares: null },
        },
        order: {
            domain: { entities: null, repositories: null, services: null },
            application: { usecases: null, dto: null },
            infrastructure: { database: null, external: null },
            interfaces: { controllers: null, routes: null, middlewares: null },
        },
        chat: {
            domain: { entities: null, repositories: null, services: null },
            application: { usecases: null, dto: null },
            infrastructure: { database: null, external: null },
            interfaces: { controllers: null, routes: null, middlewares: null },
        },
    },
    shared: {
        errors: null,
        utils: null,
        validation: null,
        constants: null,
    },
    config: null,
    infra: {
        database: null,
        email: null,
        sms: null,
        paymentGateway: null,
    },
    tests: {
        product: null,
        user: null,
        shared: null,
    },
};

async function createFolders(base, obj) {
    for (const [key, value] of Object.entries(obj)) {
        const folderPath = path.join(base, key);
        await fs.mkdir(folderPath, { recursive: true });
        if (value && typeof value === 'object') {
            await createFolders(folderPath, value);
        }
    }
}

(async () => {
    try {
        await createFolders(basePath, structure);
        console.log("ساختار فولدر پروژه با موفقیت ساخته شد.");
    } catch (err) {
        console.error("خطا در ساختار فولدر: ", err);
    }
})();
