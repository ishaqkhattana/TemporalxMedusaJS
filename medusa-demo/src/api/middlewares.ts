import type { MiddlewaresConfig } from "@medusajs/medusa"
import type {
    MedusaNextFunction,
    MedusaRequest,
    MedusaResponse,
} from "@medusajs/medusa"
import { User } from "src/models/user"
import { UserService } from "@medusajs/medusa"
import authenticate from "@medusajs/medusa/dist/api/middlewares/authenticate"
import cors from "cors"
import { defineAbilitiesForUser } from "src/abilities"

const registerLoggedInUserMiddleware = async (
    req: MedusaRequest,
    res: MedusaResponse,
    next: MedusaNextFunction
) => {
    const user1 = {
        role: "admin"
    }
    authenticate()(req, res, async () => {
        console.log("ishaqi")
        let loggedInUser: User | null = null
        let abilities = null
        if (req.user && req.user.userId) {
            const userService =
                req.scope.resolve("userService") as UserService
            loggedInUser = await userService.retrieve(req.user.userId)
        }
        // console.log(abilities)
        req.scope.register({
            loggedInUser: {
                resolve: () => loggedInUser,
            },
            ability: {
                resolve: () => defineAbilitiesForUser(loggedInUser),
            },
        })

        next()
    })
}

const adminCors = { // FIXME: This should be pulled from medusa config
    origin: "http://localhost:7000,http://localhost:7001".split(","),
    credentials: true,
}

export const config: MiddlewaresConfig = {
    routes: [
        {
            matcher: /\/admin\/[^(auth)].*/,
            middlewares: [cors(adminCors), registerLoggedInUserMiddleware],
        },
    ],

}