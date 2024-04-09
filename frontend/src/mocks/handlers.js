import { rest } from "msw"


// baseURL value from axiosDefaults
const baseURL = '/api'


// used to store mock request handlers.
export const handlers = [
    // auto-importing rest object
    // defining a mock response for a get req for user details
    // callback func accepts 3 arguments, request, response and context
    rest.get(`${baseURL}/dj-rest-auth/user/`, (req, res, ctx) => {
        // we'll return a JSON response
        return res(
            ctx.json({
            pk: 3,
            username: "test11",
            email: "",
            first_name: "",
            last_name: "",
            profile_id: 3,
            profile_image: "https://res.cloudinary.com/darbzwl6q/image/upload/v1/media/images/birdie_i2eieu"
        })
    )
    }),
    rest.post(`${baseURL}/dj-rest-auth/logout/`, (req, res, ctx) => {
        // upon logout, response status will be 200
        return res(ctx.status(200))
      }),
];
    
console.log(handlers)
