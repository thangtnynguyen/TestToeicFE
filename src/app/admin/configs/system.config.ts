import { enviroment } from 'src/enviroments/enviroment';

const systemConfig = {
    baseUrl : enviroment.host.baseUrl ?? "",
    baseFileSystemUrl: enviroment.host.baseFileSystemUrl ?? "",
};

export default systemConfig;
