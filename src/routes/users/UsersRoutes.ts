import BaseRouteConfig from "../BaseRouteConfig";
import express from "express";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export default class UsersRoutes extends BaseRouteConfig {
    constructor(app: express.Application) {
        super(app, "UsersRoutes");
    }

    override configureRoutes(): express.Application {
        this.app.route("/users/:userId")
            .all((req, res, next) => {
                next();
            })
            .get(async (req, res) => {
                const data = await prisma.user.findUnique({
                    where: {
                        id: Number.parseInt(req.params["userId"])
                    }
                })

                data != null ? res.status(200).json(data) : res.sendStatus(404);
            })
            .delete(async (req, res) => {
                await prisma.user.delete({
                    where: {
                        id: Number.parseInt(req.params["userId"])
                    }
                })

                res.sendStatus(204);
            });
        
        this.app.route("/users")
            .post(async (req, res) => {
                const data = await prisma.user.create({
                    data: req.body
                })

                res.status(201).json(data);
            });

        return this.app;
    }
}