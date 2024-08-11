import { roles } from "../../middleware/auth.js";


export const permissions = {
    create:[roles.User],
    getOrdersCounts:[roles.Admin],
    getAll:[roles.Admin],
    update:[roles.Admin],
    getDetails:[roles.Admin],
    getuserorders:[roles.Admin],
}