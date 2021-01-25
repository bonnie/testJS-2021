import { rest } from 'msw';

export const handlers = [
    rest.get("http://localhost:3030/flavors", (req, res, ctx) => {
        return res(
            ctx.json(
                [{
                    "name": "Vanilla",
                    "imagePath": "/images/vanilla.png"
                },
                {
                    "name": "Chocolate",
                    "imagePath": "/images/chocolate.png"
                },]
            )
        )
    }),
]